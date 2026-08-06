"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { platformLanguagePromise } from "../utils/session";
import { en, type Dict, type Key } from "./en";
import { si } from "./si";
import { ta } from "./ta";

/** Each language is listed in its own script — a player who can't read the
 *  current UI still has to be able to find their own language in the menu. */
export const LANGS = [
  { code: "en", label: "English", short: "EN" },
  { code: "si", label: "සිංහල", short: "සිං" },
  { code: "ta", label: "தமிழ்", short: "தமி" },
] as const;

export type Lang = (typeof LANGS)[number]["code"];

const DICTS: Record<Lang, Dict> = { en, si, ta };
const STORAGE_KEY = "monkeybanana_lang";

const isLang = (v: unknown): v is Lang => LANGS.some((l) => l.code === v);

/** True when the URL carries a usable `?lang=`. Such an explicit request wins
 *  over the platform's launch-ticket language — otherwise there'd be no way to
 *  preview a language from inside the real embed. */
function hasLangParam(): boolean {
  return isLang(new URLSearchParams(window.location.search).get("lang"));
}

/** `?lang=` → localStorage → browser language → English. */
function detectLang(): Lang {
  // The URL param wins deliberately: the game runs in a cross-origin iframe on
  // the platform, where localStorage can be partitioned away entirely. The host
  // passing ?lang= alongside uuid/gameSessionUuid is the reliable channel.
  const param = new URLSearchParams(window.location.search).get("lang");
  if (isLang(param)) return param;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* storage blocked in a partitioned iframe — fall through */
  }
  const nav = navigator.language?.slice(0, 2).toLowerCase();
  return isLang(nav) ? nav : "en";
}

export type TVars = Record<string, string | number>;
export type TFn = (key: Key, vars?: TVars) => string;

const interpolate = (s: string, vars?: TVars) =>
  vars ? s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m)) : s;

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: TFn;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Detected on mount, not in useState's initializer — this component can
  // render on the server (Next.js), where `window`/`localStorage` don't exist.
  useEffect(() => {
    setLangState(detectLang());
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* non-fatal: the choice just won't survive a reload */
    }
  }, []);

  // Drives CSS rules that turn off Latin-only uppercasing/letter-spacing for
  // Sinhala and Tamil.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // The platform sends the player's account language on the launch ticket. It
  // arrives asynchronously — and possibly before React mounted, which is why
  // utils/session.ts listens at module load and hands it over as a promise.
  useEffect(() => {
    if (hasLangParam()) return;
    platformLanguagePromise.then((l) => {
      if (isLang(l)) setLang(l);
    });
  }, [setLang]);

  const value = useMemo<I18nValue>(() => {
    const dict = DICTS[lang];
    // Fall back to English rather than rendering a bare key if a translation is
    // ever empty — a half-English screen beats "bet.confirmTitle" on a button.
    const t: TFn = (key, vars) => interpolate(dict[key] || en[key], vars);
    return { lang, setLang, t };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

/** Shorthand for the common case of only needing `t`. */
export const useT = (): TFn => useI18n().t;
