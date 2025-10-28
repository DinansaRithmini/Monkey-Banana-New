import { type NextRequest, NextResponse } from "next/server"
import { persistentGameManager } from "../../../../lib/persistent-game-manager"

export async function POST(request: NextRequest) {
  try {
    const { gameId, name, amount } = await request.json()

    if (!gameId || !name || !amount || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Game ID, name, and valid amount are required",
        },
        { status: 400 },
      )
    }

    const result = await persistentGameManager.addPlayer(gameId, name, amount)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      game: result.game,
      playerId: result.playerId,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to join game" }, { status: 500 })
  }
}
