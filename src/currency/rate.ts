/**
 * USD→LKR exchange rate, straight from the platform's public endpoint.
 *
 * Three layers so a money amount is never blank, NaN or wildly wrong:
 *   1. FALLBACK_LKR_PER_USD — compiled in, covers a first-ever load with the
 *      endpoint unreachable.
 *   2. localStorage cache, read synchronously so LKR mode paints the right
 *      number on the first frame instead of flashing a stale one.
 *   3. one background fetch per mount, which refreshes both.
 *
 * Goes through our own /api/exchange-rate route, not the backend directly: the
 * backend's CORS is an allowlist, so a browser call from an origin it doesn't
 * know is blocked outright. The route also holds the backend host, which lives
 * in the server-only `GAMEON_BACKEND_URL` env var — see that route for why.
 */

const RATE_URL = "/api/exchange-rate";

/** Upstream moves this once a day (~10:00), so six hours is comfortable. */
const TTL_MS = 6 * 60 * 60 * 1000;
const STORAGE_KEY = "monkeybanana_fx_rate";

/** Last known good value at the time of writing, for a cold start with no network. */
export const FALLBACK_LKR_PER_USD = 350;

interface Cached {
  rate: number;
  at: number;
}

/** A bad rate would silently zero or explode every amount on screen. */
const isSaneRate = (v: unknown): v is number =>
  typeof v === "number" && Number.isFinite(v) && v > 0;

/** Cached rate if it's still fresh, else null. Synchronous — safe in a useState initialiser. */
export function readCachedRate(): number | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Cached;
    if (!isSaneRate(parsed?.rate)) return null;
    if (Date.now() - parsed.at > TTL_MS) return null;
    return parsed.rate;
  } catch {
    // Absent, malformed, or storage blocked in a partitioned iframe.
    return null;
  }
}

function writeCachedRate(rate: number): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ rate, at: Date.now() } satisfies Cached));
  } catch {
    /* non-fatal: we just re-fetch next load */
  }
}

/**
 * Fetches the live rate. Resolves null on any failure — a network error, a
 * non-2xx, or a response whose shape changed — so callers keep their current
 * value instead of rendering something wrong.
 */
export async function fetchLkrPerUsd(): Promise<number | null> {
  try {
    const r = await fetch(RATE_URL);
    if (!r.ok) return null;
    const body = await r.json();
    const rate = body?.rate;
    if (!isSaneRate(rate)) return null;
    writeCachedRate(rate);
    return rate;
  } catch {
    return null;
  }
}
