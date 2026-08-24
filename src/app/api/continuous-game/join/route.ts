import { type NextRequest, NextResponse } from "next/server"
import { serverGameManager } from '../../../../components/lib/server-game-manager';
import { resolveSessionToken, InvalidSessionTokenError } from '../../../../utils/serverSession';

export async function POST(request: NextRequest) {
  try {
    const { name, amount, sessionToken, profileImage, holdKey } = await request.json()

    if (!name || !amount || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Name and valid amount are required",
        },
        { status: 400 },
      )
    }

    if (!sessionToken) {
      return NextResponse.json({ success: false, error: "sessionToken is required" }, { status: 400 })
    }

    // sessionToken is the only trustworthy identity here — this route has no
    // signature check at all, so a client-supplied userId would let anyone take
    // a seat on the wheel (and so collect the pot) without holding any coins.
    const userId = await resolveSessionToken(sessionToken)

    const result = await serverGameManager.addPlayer(name, amount, userId, profileImage, holdKey)

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
    if (error instanceof InvalidSessionTokenError) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: "Failed to join game" }, { status: 500 })
  }
}
