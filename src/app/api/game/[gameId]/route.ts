import { type NextRequest, NextResponse } from "next/server"
import { gameStore } from "../../../../lib/game-store"

export async function GET(request: NextRequest, { params }: { params: { gameId: string } }) {
  try {
    const game = gameStore.getGame(params.gameId)
    if (!game) {
      return NextResponse.json({ success: false, error: "Game not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, game })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to get game" }, { status: 500 })
  }
}
