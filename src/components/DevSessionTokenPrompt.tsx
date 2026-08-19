"use client";

/**
 * LOCAL DEV ONLY — pastes a platform sessionToken into the running game.
 *
 * Outside the platform iframe there is no parent frame to send
 * GAMEON_LAUNCH_TICKET, so sessionTokenPromise never resolves and every bet
 * bails out. This prompt stands in for that handshake.
 *
 * It also collects `uuid` and `gameSessionUuid`, because a token alone is not
 * enough: useContinuousGame reads both from the URL and drops into guest mode
 * without them, which sends any bet to the login redirect instead of the wheel.
 *
 * Nothing here is a security hole — the token must still be one the platform
 * minted, and every backend route validates it exactly as in production. The
 * whole component compiles out of production builds.
 */

import { useEffect, useState } from "react";
import { devSetSessionToken } from "../utils/session";

const STORE_KEY = "devSessionToken";
const IS_DEV = process.env.NODE_ENV !== "production";

/** sessionStorage, not localStorage: tokens are short-lived, and a stale one
 *  surviving for days produces confusing 400s days later. Per-tab still
 *  survives reloads, which is what matters while iterating. */
function readStored(): string {
  try {
    return sessionStorage.getItem(STORE_KEY) || "";
  } catch {
    return "";
  }
}

export default function DevSessionTokenPrompt() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState("");
  /** The token actually handed to the game this page load. Swapping it needs a
   *  reload — sessionTokenPromise only ever resolves once. */
  const [appliedToken, setAppliedToken] = useState("");
  const [uuid, setUuid] = useState("");
  const [gameSessionUuid, setGameSessionUuid] = useState("");

  useEffect(() => {
    if (!IS_DEV) return;

    const params = new URLSearchParams(window.location.search);
    const urlUuid = params.get("uuid") || params.get("userId") || "";
    const urlSession = params.get("gameSessionUuid") || params.get("room") || "";
    setUuid(urlUuid);
    setGameSessionUuid(urlSession);

    const stored = readStored();
    setToken(stored);

    // A token kept from before the reload is applied silently — re-pasting it
    // on every refresh would make this unusable.
    if (stored && urlUuid && urlSession) {
      devSetSessionToken(stored);
      setAppliedToken(stored);
      setReady(true);
    } else {
      setOpen(true);
    }
  }, []);

  if (!IS_DEV) return null;

  const apply = () => {
    const t = token.trim();
    if (!t) return;

    try {
      sessionStorage.setItem(STORE_KEY, t);
    } catch {
      /* private browsing — the token still applies for this page view */
    }

    // uuid/gameSessionUuid are read from the URL on mount and never re-read, so
    // changing them means a reload. The token survives it via sessionStorage.
    const params = new URLSearchParams(window.location.search);
    const needsReload =
      uuid.trim() !== (params.get("uuid") || params.get("userId") || "") ||
      gameSessionUuid.trim() !== (params.get("gameSessionUuid") || params.get("room") || "");

    if (needsReload) {
      params.delete("userId");
      params.delete("room");
      params.set("uuid", uuid.trim());
      params.set("gameSessionUuid", gameSessionUuid.trim());
      window.location.search = params.toString();
      return;
    }

    // Swapping tokens mid-session: the promise already resolved and cannot
    // resolve again, and hooks are holding the old value in state. Only a fresh
    // load can hand the game a different token — the new one is already stored,
    // so it gets picked up on the way back up.
    if (appliedToken && appliedToken !== t) {
      window.location.reload();
      return;
    }

    devSetSessionToken(t);
    setAppliedToken(t);
    setReady(true);
    setOpen(false);
  };

  const clear = () => {
    try {
      sessionStorage.removeItem(STORE_KEY);
    } catch {
      /* nothing to clear */
    }
    // devSetSessionToken resolves a promise, which cannot be undone — only a
    // fresh page load can hand the game a different token.
    window.location.reload();
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{ ...S.chip, background: ready ? "#14532d" : "#7f1d1d" }}
        title={ready ? "Session token applied" : "No session token — betting is blocked"}
      >
        {ready ? "● dev token" : "● no token"}
      </button>
    );
  }

  const complete = token.trim() && uuid.trim() && gameSessionUuid.trim();
  const willReload = !!appliedToken && appliedToken !== token.trim();

  return (
    <div style={S.backdrop}>
      <div style={S.modal}>
        <h2 style={S.title}>Local dev — attach session token</h2>
        <p style={S.sub}>
          No platform iframe here, so no launch ticket arrives. Paste a sessionToken from a
          real launch to unblock betting. Dev builds only.
        </p>

        <label style={S.label}>sessionToken</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="paste the token here"
          rows={3}
          style={{ ...S.input, resize: "vertical", fontFamily: "ui-monospace, monospace" }}
        />

        <label style={S.label}>uuid</label>
        <input
          value={uuid}
          onChange={(e) => setUuid(e.target.value)}
          placeholder="player uuid"
          style={S.input}
        />

        <label style={S.label}>gameSessionUuid</label>
        <input
          value={gameSessionUuid}
          onChange={(e) => setGameSessionUuid(e.target.value)}
          placeholder="game session uuid"
          style={S.input}
        />

        {!complete && (
          <p style={S.warn}>
            All three are required — uuid and gameSessionUuid are what keep the game out of
            guest mode, where bets redirect to login.
          </p>
        )}

        <div style={S.row}>
          <button onClick={apply} disabled={!complete} style={{ ...S.btn, opacity: complete ? 1 : 0.45 }}>
            {willReload ? "Apply & reload" : "Apply"}
          </button>
          <button onClick={clear} style={{ ...S.btn, ...S.btnGhost }}>
            Clear
          </button>
          <button onClick={() => setOpen(false)} style={{ ...S.btn, ...S.btnGhost }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  backdrop: {
    position: "fixed",
    inset: 0,
    zIndex: 2147483647,
    background: "rgba(0,0,0,.72)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modal: {
    width: "100%",
    maxWidth: 440,
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#171b24",
    border: "1px solid #2c3444",
    borderRadius: 10,
    padding: 20,
    color: "#e6e9ef",
    font: "14px/1.5 ui-sans-serif, system-ui, sans-serif",
    boxShadow: "0 18px 50px rgba(0,0,0,.5)",
  },
  title: { margin: "0 0 6px", fontSize: 16, fontWeight: 600 },
  sub: { margin: "0 0 14px", fontSize: 12.5, color: "#8d97a8" },
  label: {
    display: "block",
    margin: "12px 0 4px",
    fontSize: 10.5,
    letterSpacing: ".6px",
    textTransform: "uppercase",
    color: "#8d97a8",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "8px 10px",
    borderRadius: 6,
    background: "#0d1017",
    border: "1px solid #2c3444",
    color: "#e6e9ef",
    fontSize: 13,
  },
  warn: {
    margin: "14px 0 0",
    padding: "8px 10px",
    borderRadius: 6,
    background: "#1e1a0d",
    border: "1px solid #453a17",
    color: "#d9c98f",
    fontSize: 11.5,
  },
  row: { display: "flex", gap: 8, marginTop: 18 },
  btn: {
    flex: 1,
    padding: "9px 10px",
    borderRadius: 6,
    border: 0,
    background: "#ffc53d",
    color: "#1a1200",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  btnGhost: { background: "transparent", border: "1px solid #2c3444", color: "#8d97a8", fontWeight: 500 },
  chip: {
    position: "fixed",
    right: 10,
    bottom: 10,
    zIndex: 2147483647,
    padding: "5px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,.18)",
    color: "#fff",
    font: "600 11px ui-sans-serif, system-ui, sans-serif",
    cursor: "pointer",
  },
};
