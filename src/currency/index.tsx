"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { platformLanguagePromise } from "../utils/session";
import { FALLBACK_LKR_PER_USD, fetchLkrPerUsd, readCachedRate } from "./rate";

/**
 * Display currency. This is a RENDER-LAYER concern only — every amount in
 * state, in localStorage and on the wire (wallet balance, wager, pot, winner
 * payouts) stays in the platform's native unit (USD); `fmt()` is the only
 * place a USD figure becomes rupees. See Money.tsx.
 */
export const CURRENCIES = [
  { code: "usd", short: "$" },
  { code: "lkr", short: "Rs" },
] as const;

export type Currency = (typeof CURRENCIES)[number]["code"];

const STORAGE_KEY = "monkeybanana_currency";

const isCurrency = (v: unknown): v is Currency => CURRENCIES.some((c) => c.code === v);

/** Which currency a player launching in a given language should start on.
 *  Sinhala implies a Sri Lankan player, so rupees; English and Tamil default to
 *  the platform's own unit. Either way the settings menu can override it. */
export const currencyForLanguage = (lang: string): Currency => (lang === "si" ? "lkr" : "usd");

/** An explicit `?currency=` beats the platform's launch-ticket language, so a
 *  currency can still be previewed from inside the real embed. */
function hasCurrencyParam(): boolean {
  return isCurrency(new URLSearchParams(window.location.search).get("currency"));
}

/** `?currency=` → localStorage → usd. */
function detectCurrency(): Currency {
  // The URL param wins for the same reason it does in i18n: the game runs in a
  // cross-origin iframe where localStorage can be partitioned away, so a
  // host-supplied param is the only channel we can rely on.
  const param = new URLSearchParams(window.location.search).get("currency");
  if (isCurrency(param)) return param;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isCurrency(stored)) return stored;
  } catch {
    /* storage blocked in a partitioned iframe — fall through */
  }
  return "usd";
}

interface CurrencyValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  /** LKR per USD. */
  rate: number;
  /** Formats a USD amount as display text in the active currency. */
  fmt: (amount: number, opts?: { grouped?: boolean; unitless?: boolean }) => string;
}

const CurrencyContext = createContext<CurrencyValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("usd");
  // Cache first so the very first paint is already correct in LKR mode.
  const [rate, setRate] = useState<number>(() => readCachedRate() ?? FALLBACK_LKR_PER_USD);

  // Detected on mount, not in useState's initializer — this component can
  // render on the server (Next.js), where `window`/`localStorage` don't exist.
  useEffect(() => {
    setCurrencyState(detectCurrency());
  }, []);

  useEffect(() => {
    let alive = true;
    fetchLkrPerUsd().then((r) => {
      if (alive && r !== null) setRate(r);
    });
    return () => {
      alive = false;
    };
  }, []);

  // Drives the `html[data-currency]` CSS rules — rupee figures are much wider
  // than dollar figures, so a few controls need tighter type in LKR.
  useEffect(() => {
    document.documentElement.dataset.currency = currency;
  }, [currency]);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* non-fatal: the choice just won't survive a reload */
    }
  }, []);

  // The platform's launch ticket carries the player's account language, which
  // also picks their starting currency (si → LKR). Resolves only when that
  // language is new to us — see utils/session.ts.
  //
  // Goes through `setCurrency`, not the raw state setter, so the choice is
  // persisted: the next launch repeats the same language, which resolves null,
  // and without a stored value the player would silently drop back to usd.
  useEffect(() => {
    if (hasCurrencyParam()) return;
    platformLanguagePromise.then((l) => {
      if (l) setCurrency(currencyForLanguage(l));
    });
  }, [setCurrency]);

  const value = useMemo<CurrencyValue>(() => {
    const fmt: CurrencyValue["fmt"] = (amount, opts) => {
      if (currency === "lkr") {
        // Whole rupees — at ~332 LKR/USD, cents are noise.
        const n = Math.round(amount * rate).toLocaleString("en-US");
        return opts?.unitless ? n : `Rs ${n}`;
      }
      // No prefix — every USD call site already renders its own coin icon
      // next to this number, same as the original hardcoded `.toFixed(2)`.
      return opts?.grouped
        ? amount.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })
        : amount.toFixed(2);
    };
    return { currency, setCurrency, rate, fmt };
  }, [currency, rate, setCurrency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside <CurrencyProvider>");
  return ctx;
}

/** Shorthand for the common case of only needing the formatter. */
export const useMoney = (): CurrencyValue["fmt"] => useCurrency().fmt;
