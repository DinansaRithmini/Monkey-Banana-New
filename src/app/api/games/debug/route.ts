import { NextResponse } from "next/server"
import { persistentGameManager } from "../../../../lib/persistent-game-manager"

export async function GET() {
  try {
    const allGames = await persistentGameManager.getAllGames()
    return NextResponse.json({
      success: true,
      totalGames: allGames.length,
      games: allGames.map((game) => ({
        id: game.id,
        players: game.players.length,
        phase: game.phase,
        totalPot: game.totalPot,
        createdAt: new Date(game.createdAt).toISOString(),
        timeLeft: game.timeLeft,
      })),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to get debug info" }, { status: 500 })
  }
}
