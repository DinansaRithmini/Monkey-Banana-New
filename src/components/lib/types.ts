export interface Player {
  isBot: any
  id: string
  name: string
  amount: number
  color: string
  joinedAt: number
  profileImage: string
}

export interface GameState {
  activePlayers: any
  id: string
  players: Player[]
  phase: "betting" | "spinning" | "finished" | "round_ending" | "waiting"
  timeLeft: number
  winner: Player | null
  rotation: number
  totalPot: number
  createdAt: number
  bettingStartTime?: number
  roundNumber: number
  isActive: boolean
}

export interface Winner {
  id: number
  winnerId: string
  roundNumber: number
  playerUuid: string
  playerName: string
  profileImage: string
  betAmount: number
  wonAmount: number
  totalPot: number
  gameSessionUuid: string
  winDate: string
  playerColor: string
  winPercentage: number
}

export const colors = [
  "#FF4500",
  "#FFA500",
  "#FFD700",
  "#FFFF00",
  "#ADFF2F",
  "#00FF00",
  "#00CED1",
  "#0000FF",
  "#4B0082",
  "#85C1E9",
  "#8A2BE2",
  "#EE82EE",
  "#90CAF9",
  "#FFCC80",
  "#CE93D8",
]
