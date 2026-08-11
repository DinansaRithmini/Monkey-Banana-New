"use client";

/**
 * Platform launch-ticket handshake.
 *
 * The listener is attached at *module load* — before React mounts — because the
 * platform fires GAMEON_LAUNCH_TICKET once, unprompted, as soon as this iframe
 * loads. A listener registered inside a component's useEffect only runs after
 * the bundle has downloaded, parsed and hydrated, and can lose that race,
 * leaving sessionTokenPromise unresolved forever.
 *
 * The resulting sessionToken is what /api/createUserGame and
 * /api/continuous-game/join authenticate with. The `uuid` URL param is fine for
 * cosmetics (avatar, name) but is never trusted for money or for a seat on the
 * wheel — a player can edit it freely.
 */

let resolveSessionToken: (token: string) => void;

/** Resolves once the platform's launch ticket has been exchanged. Never resolves for guests. */
export const sessionTokenPromise: Promise<string> = new Promise((resolve) => {
  resolveSessionToken = resolve;
});

/** The language and currency the platform wants this launch rendered in, exactly
 *  as they arrived (lowercased); either is null when the message omitted it. */
export interface PlatformPrefs {
  language: string | null;
  currency: string | null;
}

let latestPrefs: PlatformPrefs | null = null;
const prefsListeners = new Set<(p: PlatformPrefs) => void>();

/**
 * Subscribes to the platform's launch preferences. Fires immediately if a launch
 * message already arrived (the listener below is attached at module load, so it
 * usually has), and again for every later message.
 *
 * The platform is the authority on every launch: whatever it sends wins over the
 * player's in-game settings-menu choice, so leaving the game and coming back
 * always restores the account's own language and currency. A callback rather
 * than a promise because the platform may post more than once per launch, and
 * the last word has to be the one that sticks.
 */
export function onPlatformPrefs(cb: (p: PlatformPrefs) => void): () => void {
  prefsListeners.add(cb);
  if (latestPrefs) cb(latestPrefs);
  return () => {
    prefsListeners.delete(cb);
  };
}

/** True only when the platform injected BOTH a player id and a gameSessionUuid. */
export function hasPlatformSession(): boolean {
  if (typeof window === "undefined") return false;
  const p = new URLSearchParams(window.location.search);
  return !!(p.get("uuid") || p.get("userId")) && !!(p.get("gameSessionUuid") || p.get("room"));
}

/**
 * Exchanges the launch ticket for a sessionToken through our own express
 * backend (server/server.js). We never call the GameON backend directly.
 */
export async function exchangeLaunchTicket(launchTicket: string): Promise<string> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/exchange-launch-ticket`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ launchTicket }),
    }
  );

  const body = await res.json().catch(() => ({}));

  if (!res.ok || !body.success || !body.sessionToken) {
    throw new Error(body.message || "Failed to exchange launch ticket");
  }

  return body.sessionToken as string;
}

if (typeof window !== "undefined" && hasPlatformSession()) {
  window.addEventListener("message", (e: MessageEvent) => {
    if (e.source !== window.parent) return;

    const data = e.data;
    if (!data || data.type !== "GAMEON_LAUNCH_TICKET") return;

    // Handled before the ticket check so a message carrying only a language or
    // currency still applies.
    const language = typeof data.language === "string" ? data.language.toLowerCase() : null;
    const currency = typeof data.currency === "string" ? data.currency.toLowerCase() : null;
    if (language || currency) {
      latestPrefs = { language, currency };
      for (const cb of prefsListeners) cb(latestPrefs);
    }

    if (typeof data.ticket !== "string") return;

    exchangeLaunchTicket(data.ticket)
      .then(resolveSessionToken)
      .catch((err) => console.warn("Launch ticket exchange failed:", err?.message));
  });

  // Signals readiness for whenever the platform adopts a wait-for-ready
  // handshake instead of firing the ticket unconditionally on load.
  window.parent.postMessage({ type: "GAMEON_GAME_READY" }, "*");
}
