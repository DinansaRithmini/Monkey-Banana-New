import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/winners/recent/10`)
    const data = await response.json()

    if (data.success) {
      return NextResponse.json({ success: true, winners: data.winners })
    } else {
      return NextResponse.json({ success: false, error: "Failed to fetch winners" }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch winners" }, { status: 500 })
  }
}
