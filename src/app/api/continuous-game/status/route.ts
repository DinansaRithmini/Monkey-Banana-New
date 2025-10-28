import { NextResponse } from "next/server"
import { serverGameManager } from '../../../../components/lib/server-game-manager';

export async function GET() {
  try {
    const status = serverGameManager.getInitializationStatus()
    const game = await serverGameManager.getGame()
    
    return NextResponse.json({ 
      success: true, 
      status,
      gameExists: game !== null,
      roundNumber: game?.roundNumber || null,
      phase: game?.phase || null,
      playersCount: game?.players?.length || 0
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: "Failed to get status",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}