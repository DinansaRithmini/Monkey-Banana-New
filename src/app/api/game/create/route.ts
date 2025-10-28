import { NextResponse } from "next/server"
import { gameStore } from "../../../../lib/game-store"

export async function POST() {
  try {
    const game = gameStore.createGame()
    return NextResponse.json({ success: true, game })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create game" }, { status: 500 })
  }
}
