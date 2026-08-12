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
  const backendUrl = process.env.GAMEON_BACKEND_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { success: false, error: "GAMEON_BACKEND_URL is not configured" },
      { status: 500 }
    );
  }

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
    // `rate` is the platform's own USD→LKR figure (buyingRate/sellingRate are
    // the spread around it and must not be used to price the game).
    const rate = body?.content?.rate;
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
