/**
 * Platform session tokens — the identity seam for money-moving routes.
 *
 * The platform hands this game a single-use `launchTicket` (postMessage'd into
 * the iframe). We exchange it once for a longer-lived `sessionToken`, and every
 * request that moves coins or claims a seat on the wheel sends that token
 * instead of a plain `userUuid`.
 *
 * Why: a client-supplied uuid is freely editable in devtools, and
 * verifyFrontendSignature only signs a timestamp — it does not sign the body,
 * so it cannot prove *who* sent the request. The sessionToken is the only value
 * in a request that the platform itself vouches for.
 */

const axios = require("axios");

const getBackendUrl = () => process.env.GAMEON_BACKEND_URL || "";

class InvalidSessionTokenError extends Error {
  constructor() {
    super("Invalid or expired session token");
    this.name = "InvalidSessionTokenError";
  }
}

/**
 * Resolves a sessionToken to the uuid the platform minted it for.
 * Throws InvalidSessionTokenError if it is missing, expired or unknown.
 */
async function resolveSessionToken(sessionToken) {
  if (!sessionToken) throw new InvalidSessionTokenError();

  if (!getBackendUrl()) {
    // Local dev with no platform configured — echo the token back as the uuid
    // so the game loop stays exercisable offline.
    console.log("🧪 [dev] resolveSessionToken: no platform configured, echoing token as uuid");
    return sessionToken;
  }

  let response;
  try {
    response = await axios.post(
      `${getBackendUrl()}/api/sdk/v1/game-session/validate-session-token`,
      { sessionToken }
    );
  } catch (err) {
    console.error("validate-session-token failed:", err?.response?.data || err.message);
    throw new InvalidSessionTokenError();
  }

  const uuid = response.data?.content?.uuid;
  if (!response.data?.status || !uuid) throw new InvalidSessionTokenError();
  return uuid;
}

/**
 * Exchanges a launch ticket for a sessionToken. Called ONCE per iframe load,
 * through the POST /api/exchange-launch-ticket relay — the frontend never
 * talks to the GameON backend directly. Returns null if the ticket is missing,
 * expired or already used.
 */
async function exchangeLaunchTicketWithPlatform(launchTicket) {
  if (!getBackendUrl()) {
    console.log("🧪 [dev] exchangeLaunchTicketWithPlatform: no platform configured, echoing ticket as sessionToken");
    return launchTicket;
  }

  let response;
  try {
    response = await axios.post(
      `${getBackendUrl()}/api/sdk/v1/game-session/exchange-launch-ticket`,
      { launchTicket }
    );
  } catch (err) {
    console.error("exchange-launch-ticket failed:", err?.response?.data || err.message);
    return null;
  }

  const sessionToken = response.data?.content?.sessionToken;
  return response.data?.status && sessionToken ? sessionToken : null;
}

module.exports = {
  InvalidSessionTokenError,
  resolveSessionToken,
  exchangeLaunchTicketWithPlatform,
};
