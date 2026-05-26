import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/winners/top`)
    const data = await response.json()

    if (data.success) {
      return NextResponse.json({ success: true, winner: data.winner })
    } else {
      return NextResponse.json({ success: false, error: "Failed to fetch top winner" }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch top winner" }, { status: 500 })
  }
}
