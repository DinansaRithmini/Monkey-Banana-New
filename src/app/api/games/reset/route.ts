import { type NextRequest, NextResponse } from "next/server"
import { persistentGameManager } from "../../../../lib/persistent-game-manager"

export async function POST(request: NextRequest) {
  try {
    const { gameId } = await request.json()

    if (!gameId) {
      return NextResponse.json({ success: false, error: "Game ID required" }, { status: 400 })
    }

    const newGame = await persistentGameManager.resetGame(gameId)
    return NextResponse.json({ success: true, game: newGame })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to reset game" }, { status: 500 })
  }
}
