import { NextResponse } from "next/server";

/**
 * USD→LKR exchange rate, proxied from the platform backend.
 *
 * Proxied rather than fetched straight from the browser because the backend's
 * CORS is an allowlist, not `*`: an origin it doesn't know gets no
 * `access-control-allow-origin` header at all, so the fetch fails silently and
 * every LKR amount on screen quietly falls back to the compiled-in rate. Going
 * through this route means server-to-server — no CORS involved — and it keeps
 * the backend host in the single server-only `GAMEON_BACKEND_URL`, which is
 * what makes the dev/prod swap one env change instead of two.
 *
 * Returns only the number the client needs, so a change in the upstream
 * envelope is contained here rather than in src/currency/rate.ts.
 */
export async function GET() {
  // Env first; the platform's older public host as an or-else, so a machine
  // whose env file never made it still gets a live rate.
  const backendUrl = process.env.GAMEON_BACKEND_URL || "https://backend-api.gameonworld.ai";

  try {
    const response = await fetch(
      `${backendUrl}/api/open/v1/exchange-rate/latest?currency=USD`,
      // The rate moves during the day and the client does its own 6h caching;
      // this hop must never serve a build-time value.
      { cache: "no-store" }
    );
    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Exchange-rate upstream returned an error" },
        { status: 502 }
      );
    }

    const body = await response.json();
    // `rate` is the platform's own USD→LKR figure. The or-else host above is an
    // older build that doesn't send it at all — only the buyingRate/sellingRate
    // spread — so fall back to buyingRate there, which is what this game read
    // before `rate` existed.
    const rate = body?.content?.rate ?? body?.content?.buyingRate;
    // A zero, negative or missing rate would zero or explode every amount on
    // screen — refuse it here so the client keeps its last known good value.
    if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) {
      return NextResponse.json(
        { success: false, error: "Exchange-rate upstream sent no usable rate" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, rate });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to reach the exchange-rate upstream" },
      { status: 502 }
    );
  }
}
