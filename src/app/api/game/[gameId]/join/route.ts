import { type NextRequest, NextResponse } from "next/server"
import { gameStore } from "../../../../../lib/game-store"
import { colors } from "../../../../../lib/game-types"
import type { Player } from "../../../../../lib/game-types"

export async function POST(request: NextRequest, { params }: { params: { gameId: string } }) {
  try {
    const { name, amount } = await request.json()

    if (!name || !amount || amount <= 0) {
      return NextResponse.json({ success: false, error: "Invalid name or amount" }, { status: 400 })
    }

    const game = gameStore.getGame(params.gameId)
    if (!game) {
      return NextResponse.json({ success: false, error: "Game not found" }, { status: 404 })
    }

    if (game.phase !== "waiting" && game.phase !== "betting") {
      return NextResponse.json({ success: false, error: "Cannot join game in current phase" }, { status: 400 })
    }

    const newPlayer: Player = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      amount: Number(amount),
      color: colors[game.players.length % colors.length],
      joinedAt: Date.now(),
    }

    const updatedGame = gameStore.addPlayer(params.gameId, newPlayer)
    if (!updatedGame) {
      return NextResponse.json({ success: false, error: "Failed to join game" }, { status: 500 })
    }

    return NextResponse.json({ success: true, game: updatedGame, playerId: newPlayer.id })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to join game" }, { status: 500 })
  }
}
