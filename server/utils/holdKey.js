/**
 * The GameOn wallet hold key for one bet/top-up in Monkey Banana.
 *
 * Minted once when a player's coins are held (create-user-game-sessionv2)
 * and echoed back verbatim on CAPTURE / WIN — GameOn matches the hold on
 * this exact string. Same convention as the other games here (crash's
 * `crash-`, buruwa's `buru-`, coin-flip's `toss-`).
 *
 * Before this, every bet placed during one round — including a single
 * player's own top-ups ("outbid" raises) — shared one key: the round number.
 * A player who topped up their bet 3 times had 3 separate holds on the
 * platform all keyed identically, while settlement only ever fired one
 * CAPTURE/WIN for their merged total. A per-bet key removes that mismatch:
 * each hold is tracked (see Player.holds in models/ContinuousGame.js) and
 * settled individually.
 */
const { randomBytes } = require("crypto");

/** Mint a fresh hold key: `monkey-` + 26 hex chars, 33 in all. */
function newHoldKey() {
  return `monkey-${randomBytes(13).toString("hex")}`;
}

/**
 * The pre-migration key: bets placed before per-bet hold keys existed have
 * no entry in a player's `holds[]`, so their whole accumulated stake settles
 * under the round-number key it was actually held under. Needed only for
 * players already in an active round at deploy time — safe to drop once no
 * such round can still be active.
 */
function legacyHoldKey(roundNumber) {
  return String(roundNumber);
}

module.exports = { newHoldKey, legacyHoldKey };
