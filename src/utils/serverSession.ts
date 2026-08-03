/**
 * Resolves the platform's short-lived `sessionToken` (obtained by exchanging a
 * launch ticket handed to this game by the platform frontend) into the real,
 * platform-verified player uuid.
 *
 * This is the seam every money-moving route MUST call before trusting a
 * client-supplied identity field (userId) for anything — game logic, bet
 * records, or the wheel seat that decides who collects the pot.
 * verifyFrontendSignature only proves a request came from this frontend within
 * a time window; it does not sign the body, so a player can freely edit userId
 * in devtools. The sessionToken is the only value in the request that the
 * platform itself vouches for.
 *
 * SERVER ONLY — never import this from a client component. It is the Next.js
 * twin of server/utils/session.js, which does the same job for the express
 * backend's /api/createUserGame.
 */
import axios from "axios";

const getBackendUrl = () => process.env.GAMEON_BACKEND_URL || "";

export class InvalidSessionTokenError extends Error {
  constructor() {
    super("Invalid or expired session token");
    this.name = "InvalidSessionTokenError";
  }
}

/** Resolves a sessionToken to the uuid the platform minted it for. Throws InvalidSessionTokenError if missing/expired. */
export async function resolveSessionToken(sessionToken: string | undefined): Promise<string> {
  if (!sessionToken) throw new InvalidSessionTokenError();

  if (!getBackendUrl()) {
    // Local dev with no platform configured — mirrors the dev stub in
    // server/utils/session.js so the game loop stays exercisable offline.
    console.log("🧪 [dev] resolveSessionToken: no platform configured, echoing token as uuid");
    return sessionToken;
  }

  let res: any;
  try {
    res = await axios.post(`${getBackendUrl()}/api/sdk/v1/game-session/validate-session-token`, {
      sessionToken,
    });
  } catch {
    throw new InvalidSessionTokenError();
  }

  const uuid = res.data?.content?.uuid;
  if (!res.data?.status || !uuid) throw new InvalidSessionTokenError();
  return uuid;
}
