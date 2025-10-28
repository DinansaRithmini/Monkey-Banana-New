import { type NextRequest, NextResponse } from "next/server"
import { serverGameManager } from '../../../../components/lib/server-game-manager';

export async function POST(request: NextRequest) {
  try {
    const { name, amount, userId, profileImage } = await request.json()

    if (!name || !amount || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Name and valid amount are required",
        },
        { status: 400 },
      )
    }


    const result = await serverGameManager.addPlayer(name, amount, userId, profileImage)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    const game = await serverGameManager.getGame()
    return NextResponse.json({
      success: true,
      game,
      playerId: result.playerId,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to join game" }, { status: 500 })
  }
}
