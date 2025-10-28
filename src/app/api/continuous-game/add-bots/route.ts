// app/api/continuous-game/add-bots/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { serverGameManager } from '../../../../components/lib/server-game-manager';

export async function POST(request: NextRequest) {
  try {
    const { bots } = await request.json();

    if (!bots || !Array.isArray(bots)) {
      return NextResponse.json(
        { success: false, error: "Invalid bots data" },
        { status: 400 }
      );
    }

    const result = await serverGameManager.addBots(bots);

    if (result.success) {
      const game = await serverGameManager.getGame();
      return NextResponse.json({
        success: true,
        game
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to add bots" },
      { status: 500 }
    );
  }
}