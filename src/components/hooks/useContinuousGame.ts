// hooks/useContinuousGame.ts
"use client"

import { useState, useEffect, useCallback } from "react"
import type { GameState } from "../lib/types"

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

  const fetchGameState = useCallback(async () => {
    try {
      const response = await fetch("/api/continuous-game")
      const data = await response.json()

      if (data.success) {
        setRawGameState(data.game)
        setError(null)

        // Check if we need to add bots
        if (data.game && data.game.phase === "betting") {
          const now = Date.now();
          // Only check every 5 seconds to avoid too frequent checks
          if (now - lastBotCheckTime > 5000) {
            setLastBotCheckTime(now);

            // Count real players (excluding bots)
            const realPlayers = data.game.players.filter((player: { id: string; }) =>
              !player.id.startsWith('bot-') && !addedBots.includes(player.id)
            );

            // Only add bots if there are less than 5 real players
            if (realPlayers.length < 5) {
              // Add bots at random intervals (not all at once)
              const shouldAddBot = Math.random() < 0.3; // 30% chance to add a bot each check

              if (shouldAddBot) {
                const botsNeeded = 5 - realPlayers.length;
                if (botsNeeded > 0) {
                  addSingleBot();
                }
              }
            }
          }
        }
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to fetch game state")
    } finally {
      setLoading(false)
    }
  }, [lastBotCheckTime, addedBots])

  // New effect to handle merging whenever avatar or raw state changes
  useEffect(() => {
    if (!rawGameState || !avatarImagePath || !userId) {
      if (rawGameState) setGameState(rawGameState)
      return
    }

    const merged = {
      ...rawGameState,
      players: rawGameState.players.map((p) => (p.id === userId ? { ...p, profileImage: avatarImagePath } : p)),
    }

    setGameState(merged)
  }, [rawGameState, avatarImagePath, userId])

  // Poll for updates every second
  useEffect(() => {
    fetchGameState()
    const interval = setInterval(fetchGameState, 1000)
    return () => clearInterval(interval)
  }, [fetchGameState])

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
    refetch: fetchGameState,
    userId,
    playerName,
    gameSessionUuid,
    avatarImagePath,
  }
}