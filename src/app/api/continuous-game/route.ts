import { NextResponse } from "next/server"
import { serverGameManager } from '../../../components/lib/server-game-manager';

export async function GET() {
  try {
    const game = await serverGameManager.getGame()
    if (!game) {
      return NextResponse.json({ success: false, error: "Game not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, game })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to get game" }, { status: 500 })
  }
}
