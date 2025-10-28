import { type NextRequest, NextResponse } from "next/server"
import { persistentGameManager } from "../../../lib/persistent-game-manager"

export async function POST() {
  try {
    const game = await persistentGameManager.createGame()
    return NextResponse.json({ success: true, game })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create game" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const gameId = searchParams.get("gameId")


    if (!gameId) {
      return NextResponse.json({ success: false, error: "Game ID required" }, { status: 400 })
    }

    // Debug: List all available games
    const allGames = await persistentGameManager.getAllGames()

    const game = await persistentGameManager.getGame(gameId)
    if (!game) {
      return NextResponse.json({ success: false, error: "Game not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, game })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to get game" }, { status: 500 })
  }
}
