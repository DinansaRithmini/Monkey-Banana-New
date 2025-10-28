import { type NextRequest, NextResponse } from "next/server"
import { gameStore } from "../../../../../lib/game-store"

export async function POST(request: NextRequest, { params }: { params: { gameId: string } }) {
  try {
    // Delete old game and create new one
    gameStore.deleteGame(params.gameId)
    const newGame = gameStore.createGame()

    return NextResponse.json({ success: true, game: newGame })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to reset game" }, { status: 500 })
  }
}
