import { useEffect, useState, useRef } from "react";
import axios from "axios";

// 🧠 Define your game state type
interface Player {
  id: string;
  name: string;
  profileImage?: string;
  amount: number;
}

interface Winner {
  id: string;
  name: string;
  profileImage?: string;
}

interface GameState {
  phase: "betting" | "spinning" | "finished" | "round_ending";
  totalPot: number;
  timeLeft: number;
  roundNumber: number;
  players: Player[];
  winner?: Winner | null;
  rotation?: number;
}

interface UseContinuousGameReturn {
  gameState: GameState | null;
  loading: boolean;
  error: string | null;
  joinGame: (playerName: string, betAmount: number) => Promise<{ success: boolean; error?: string }>;
  addBotsToGame: (bots: any[]) => Promise<void>;
  userId: string | null;
  playerName: string | null;
  gameSessionUuid: string | null;
}

/**
 * 🎮 useContinuousGame
 * Custom hook to handle continuous betting game logic (socket or polling based)
 */
export function useContinuousGame(): UseContinuousGameReturn {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState<string | null>("Player_" + Math.floor(Math.random() * 1000));
  const [gameSessionUuid, setGameSessionUuid] = useState<string | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ⚙️ Fetch or simulate game state
  const fetchGameState = async () => {
    try {
      // Example backend endpoint
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL || ""}/api/gameState`
      );

      if (response.data?.status && response.data?.gameState) {
        setGameState(response.data.gameState);
        setError(null);
      } else {
        // fallback to mock data if backend not ready
        setGameState(mockGameState());
      }
    } catch (err) {
      console.warn("⚠️ Backend not available — using mock state");
      setGameState(mockGameState());
    } finally {
      setLoading(false);
    }
  };

  // 🧍 Join Game
  const joinGame = async (playerName: string, betAmount: number) => {
    try {
      // Example backend join call
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL || ""}/api/joinGame`,
        { name: playerName, amount: betAmount }
      );

      if (response.data?.success) {
        await fetchGameState();
        return { success: true };
      }
      return { success: false, error: response.data?.message || "Join failed" };
    } catch (err) {
      console.error("Join game error", err);
      return { success: false, error: "Network error joining game" };
    }
  };

  // 🤖 Add bots dynamically (optional)
  const addBotsToGame = async (bots: any[]) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL || ""}/api/addBots`,
        { bots }
      );
      await fetchGameState();
    } catch (err) {
      console.error("Add bots failed", err);
    }
  };

  // 🌀 Poll game state every few seconds
  useEffect(() => {
    fetchGameState();
    intervalRef.current = setInterval(fetchGameState, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // 🪃 Helper mock game data (used if backend not responding)
  const mockGameState = (): GameState => {
    const mockPlayers: Player[] = [
      { id: "1", name: "Andrew Derek", amount: 40, profileImage: "/avatars/player1.png" },
      { id: "2", name: "Enjella Melon", amount: 16, profileImage: "/avatars/player2.png" },
      { id: "3", name: "David Yomen", amount: 6, profileImage: "/avatars/player3.png" },
    ];

    const randomWinner = mockPlayers[Math.floor(Math.random() * mockPlayers.length)];

    return {
      phase: ["betting", "spinning", "finished"][Math.floor(Math.random() * 3)] as GameState["phase"],
      totalPot: 62,
      timeLeft: Math.floor(Math.random() * 60),
      roundNumber: Math.floor(Math.random() * 1000),
      players: mockPlayers,
      winner: randomWinner,
      rotation: Math.floor(Math.random() * 360),
    };
  };

  return {
    gameState,
    loading,
    error,
    joinGame,
    addBotsToGame,
    userId,
    playerName,
    gameSessionUuid,
  };
}
