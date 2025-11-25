// hooks/useContinuousGame.ts
"use client"

import { useState, useEffect, useCallback } from "react"
import type { GameState } from "../lib/types"
import { socketManager } from "../lib/socket"

// Define bot types
interface Bot {
  id: string;
  name: string;
  profileImage: string;
  isBot: boolean;
}

const BOTS: Bot[] = [
  // { id: "bot-1", name: "Cavernus", profileImage: "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png", isBot: true },
  // { id: "bot-2", name: "Volcano", profileImage: "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png", isBot: true },
  // { id: "bot-3", name: "Pixel", profileImage: "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png", isBot: true },
  // { id: "bot-4", name: "Gravity", profileImage: "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png", isBot: true },
  // { id: "bot-5", name: "Ember", profileImage: "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png", isBot: true },
];

const BOT_BET_AMOUNTS = [1, 5];
const CONTINUOUS_GAME_ID = "continuous-betting-game";

export function useContinuousGame() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [playerName, setPlayerName] = useState<string | null>(null)
  const [gameSessionUuid, setGameSessionUuid] = useState<string | null>(null)
  const [avatarImagePath, setAvatarImagePath] = useState<string | null>(null)
  const [rawGameState, setRawGameState] = useState<GameState | null>(null)
  const [lastBotCheckTime, setLastBotCheckTime] = useState<number>(0)
  const [addedBots, setAddedBots] = useState<string[]>([])
  const [clientTimeLeft, setClientTimeLeft] = useState<number>(60)

  // Get userId from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const uuidFromUrl = params.get("uuid") || params.get("userId")
    const sessionUuidFromUrl = params.get("gameSessionUuid") || params.get("room")

    // userId
    if (uuidFromUrl) {
      setUserId(uuidFromUrl)
    } else {
      const sessionId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      setUserId(sessionId)
    }

    // gameSessionUuid
    if (sessionUuidFromUrl) {
      setGameSessionUuid(sessionUuidFromUrl)
    }
  }, [])

  useEffect(() => {
    if (!userId || !gameSessionUuid) return

    const fetchPlayerDetails = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/getPlayerDetails?uuid=${userId}`
        const res = await fetch(url)

        if (!res.ok) throw new Error("Network response was not ok")

        const { player, gameSessionUuid } = await res.json()

        if (player) {
          setPlayerName(player.name ?? "")
          const profileImg =
            player.profileImage || "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png"
          setAvatarImagePath(profileImg)
        }
      } catch (e) {
        setAvatarImagePath("https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png")
      }
    }

    fetchPlayerDetails()
  }, [userId, gameSessionUuid])

  // New effect to handle merging avatar and client timer whenever rawGameState or avatar changes
  useEffect(() => {
    if (!rawGameState) {
      setGameState(null)
      return
    }

    if (!avatarImagePath || !userId) {
      // If no avatar yet, just use raw state with client timer
      setGameState({
        ...rawGameState,
        timeLeft: rawGameState.phase === "betting" ? clientTimeLeft : rawGameState.timeLeft
      })
      return
    }

    const merged = {
      ...rawGameState,
      players: rawGameState.players.map((p) => (p.id === userId ? { ...p, profileImage: avatarImagePath } : p)),
      // Only override timeLeft during betting phase with client-calculated value
      timeLeft: rawGameState.phase === "betting" ? clientTimeLeft : rawGameState.timeLeft
    }

    setGameState(merged)
  }, [rawGameState, avatarImagePath, userId, clientTimeLeft])

  // Client-side countdown timer - calculates time locally based on bettingStartTime
  useEffect(() => {
    if (!rawGameState) {
      setClientTimeLeft(60)
      return
    }

    // If not in betting phase, use server's timeLeft or default
    if (rawGameState.phase !== "betting") {
      setClientTimeLeft(rawGameState.timeLeft || 0)
      return
    }

    // If no bettingStartTime, fallback to server's timeLeft
    if (!rawGameState.bettingStartTime) {
      setClientTimeLeft(rawGameState.timeLeft || 60)
      return
    }

    const timerDuration = process.env.NEXT_PUBLIC_TIMER_DURATION 
      ? parseInt(process.env.NEXT_PUBLIC_TIMER_DURATION) 
      : 60

    // Calculate initial time left
    const calculateTimeLeft = () => {
      const bettingStart = rawGameState.bettingStartTime
      if (!bettingStart) {
        return rawGameState.timeLeft || timerDuration
      }

      const startTime = typeof bettingStart === 'number' 
        ? bettingStart 
        : new Date(bettingStart).getTime()
      
      if (isNaN(startTime)) {
        return rawGameState.timeLeft || timerDuration
      }
      
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      return Math.max(0, timerDuration - elapsed)
    }

    // Update immediately
    const initialTimeLeft = calculateTimeLeft()
    setClientTimeLeft(initialTimeLeft)
    
    console.log(`⏱️ Timer started for round ${rawGameState.roundNumber}: ${initialTimeLeft}s remaining`)

    // Then update every second
    const interval = setInterval(() => {
      const timeLeft = calculateTimeLeft()
      setClientTimeLeft(timeLeft)
      
      if (timeLeft <= 0) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [rawGameState?.phase, rawGameState?.bettingStartTime, rawGameState?.roundNumber])

  // Set up WebSocket connection and listeners
  useEffect(() => {
    // Initial fetch on mount
    const initializeGame = async () => {
      try {
        const response = await fetch("/api/continuous-game")
        const data = await response.json()

        if (data.success) {
          setRawGameState(data.game)
          setError(null)
        } else {
          setError(data.error)
        }
      } catch (err) {
        setError("Failed to fetch game state")
      } finally {
        setLoading(false)
      }
    }

    initializeGame()

    // Connect to socket
    const socket = socketManager.connect()
    console.log("🔌 WebSocket connected for continuous game")
    
    // Join the continuous game room
    socketManager.joinGame(CONTINUOUS_GAME_ID)
    console.log("🎮 Joined game room:", CONTINUOUS_GAME_ID)

    // Listen for game state updates
    socketManager.onGameUpdated((game: GameState) => {
      console.log("📡 WebSocket update:", { 
        round: game.roundNumber, 
        phase: game.phase, 
        players: game.players.length,
        bettingStartTime: game.bettingStartTime 
      })
      setRawGameState(game)
      setError(null)
      setLoading(false)
    })

    // Cleanup on unmount
    return () => {
      console.log("🔌 WebSocket disconnected")
      socketManager.disconnect()
    }
  }, []) // Empty dependency array - only run once on mount

  const addSingleBot = async () => {
    if (!gameState) return;

    // Count real players (excluding bots)
    const realPlayers = gameState.players.filter(player =>
      !player.id.startsWith('bot-') && !addedBots.includes(player.id)
    );

    // Only add bots if there are less than 5 real players
    if (realPlayers.length >= 5) return;

    const availableBots = BOTS.filter(bot => !addedBots.includes(bot.id));
    if (availableBots.length === 0) return;

    const randomBot = availableBots[Math.floor(Math.random() * availableBots.length)];
    const randomAmount = BOT_BET_AMOUNTS[Math.floor(Math.random() * BOT_BET_AMOUNTS.length)];

    const newAddedBots = [...addedBots, randomBot.id];
    setAddedBots(newAddedBots);

    await addBotsToGame([{
      name: randomBot.name,
      amount: randomAmount,
      id: randomBot.id,
      profileImage: randomBot.profileImage
    }]);
  };

  const addBotsToGame = useCallback(async (bots: { name: string; amount: number; id: string; profileImage: string }[]) => {
    try {
      const response = await fetch("/api/continuous-game/add-bots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bots,
        }),
      })

      const data = await response.json()
      return data
    } catch (err) {
      return { success: false, error: "Failed to add bots" }
    }
  }, [])

  const joinGame = useCallback(
    async (name: string, amount: number) => {
      if (!userId) {
        return { success: false, error: "User ID not available" }
      }

      try {
        const response = await fetch("/api/continuous-game/join", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            amount,
            userId,
            profileImage: avatarImagePath || "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png",
          }),
        })

        const data = await response.json()

        if (data.success) {
          return { success: true, playerId: data.playerId }
        } else {
          return { success: false, error: data.error }
        }
      } catch (err) {
        return { success: false, error: "Failed to join game" }
      }
    },
    [userId, avatarImagePath],
  )

  return {
    gameState,
    loading,
    error,
    joinGame,
    addBotsToGame,
    userId,
    playerName,
    gameSessionUuid,
    avatarImagePath,
  }
}