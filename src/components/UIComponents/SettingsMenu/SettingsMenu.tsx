"use client";

import { useEffect, useRef, useState } from "react";
import { LANGS, useI18n, useT, type Lang } from "../../../i18n";
import { CURRENCIES, useCurrency, type Currency } from "../../../currency";

/**
 * Single floating button — top-right, where the game's old standalone
 * "How to play" button used to live. It now covers all three: language,
 * currency, and how-to-play, so there's one entry point instead of two.
 */
export function SettingsMenu() {
  const { lang, setLang } = useI18n();
  const t = useT();
  const activeLang = LANGS.find((l) => l.code === lang) ?? LANGS[0];
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Dismiss the popover on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Dismiss the how-to-play modal on Escape (outside click is handled by its
  // own backdrop's onClick).
  useEffect(() => {
    if (!showHowToPlay) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowHowToPlay(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showHowToPlay]);

  const chooseLang = (code: Lang) => {
    setLang(code);
    setOpen(false);
  };
  const chooseCurrency = (code: Currency) => {
    setCurrency(code);
    setOpen(false);
  };

  return (
    // Below `lg` the platform overlays its own 36px fullscreen button in this
    // same top-right corner and lands on top of ours, so we drop underneath it.
    // From `lg` up there is room for both side by side — left untouched.
    <div className="fixed top-14 right-4 z-50 lg:top-2" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        // Matches the platform's own overlay buttons (e.g. its fullscreen
        // control) so this one reads as a sibling of theirs rather than a
        // game-skinned intruder.
        className="w-9 rounded-xl flex flex-col items-center justify-center gap-0.5 py-1.5 cursor-pointer transition-all duration-200 bg-white/80 backdrop-blur-md border border-slate-200/60 text-slate-600 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-white hover:text-slate-900 hover:scale-110 hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
        aria-label="Settings"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        <span className="text-[9px] font-bold leading-none" lang={activeLang.code}>
          {activeLang.short}
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-10 w-52 bg-[#FFF5C3] border-2 border-[#4E2A0B] rounded-xl shadow-2xl p-2 text-[#4E2A0B]"
        >
          <div className="text-xs font-bold uppercase tracking-wide px-2 pt-1 pb-1 opacity-70">Language</div>
          <div className="flex flex-col gap-1">
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                role="menuitemradio"
                aria-checked={l.code === lang}
                onClick={() => chooseLang(l.code)}
                lang={l.code}
                className={`w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg text-sm hover:bg-[#F7A531]/30 ${
                  l.code === lang ? "bg-[#F7A531]/40 font-bold" : ""
                }`}
              >
                <span className="w-4 shrink-0">{l.code === lang ? "✓" : ""}</span>
                {l.label}
              </button>
            ))}
          </div>

          <div className="h-px bg-[#4E2A0B]/20 my-1.5" role="separator" />

          <div className="text-xs font-bold uppercase tracking-wide px-2 pt-1 pb-1 opacity-70">Currency</div>
          <div className="flex flex-col gap-1">
            {CURRENCIES.map((c) => (
              <button
                key={c.code}
                type="button"
                role="menuitemradio"
                aria-checked={c.code === currency}
                onClick={() => chooseCurrency(c.code)}
                className={`w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg text-sm hover:bg-[#F7A531]/30 ${
                  c.code === currency ? "bg-[#F7A531]/40 font-bold" : ""
                }`}
              >
                <span className="w-4 shrink-0">{c.code === currency ? "✓" : ""}</span>
                {c.label}
                <span className="ml-auto opacity-70">
                  {c.code === "usd" ? (
                    <img src="/images/gameon_chip.png" alt="chip" className="w-4 h-4 object-contain" />
                  ) : (
                    c.short
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className="h-px bg-[#4E2A0B]/20 my-1.5" role="separator" />

          <button
            type="button"
            role="menuitem"
            aria-label={t("howToPlay.ariaLabel")}
            onClick={() => {
              setShowHowToPlay(true);
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg text-sm hover:bg-[#F7A531]/30"
          >
            <span className="w-4 shrink-0">?</span>
            {t("howToPlay.title")}
          </button>
        </div>
      )}

      {showHowToPlay && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowHowToPlay(false)}
        >
          <div
            className="bg-[#FFF5C3] border-4 border-[#4E2A0B] rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bungee text-2xl text-[#4E2A0B]">{t("howToPlay.title")}</h2>
              <button
                onClick={() => setShowHowToPlay(false)}
                className="text-[#4E2A0B] hover:text-[#6B3A1A] text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="space-y-4 text-[#4E2A0B]">
              <div>
                <h3 className="font-bold text-lg mb-2">{t("howToPlay.overviewHeading")}</h3>
                <p className="text-sm leading-relaxed">{t("howToPlay.overviewBody")}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">{t("howToPlay.stepsHeading")}</h3>
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  <li>{t("howToPlay.step1")}</li>
                  <li>{t("howToPlay.step2")}</li>
                  <li>{t("howToPlay.step3")}</li>
                  <li>{t("howToPlay.step4")}</li>
                  <li>{t("howToPlay.step5")}</li>
                </ol>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">{t("howToPlay.winningHeading")}</h3>
                <p className="text-sm leading-relaxed">{t("howToPlay.winningBody")}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">{t("howToPlay.timerHeading")}</h3>
                <p className="text-sm leading-relaxed">{t("howToPlay.timerBody")}</p>
              </div>

              <div className="bg-[#F7A531]/20 p-3 rounded-lg">
                <p className="text-xs font-semibold">{t("howToPlay.tip")}</p>
              </div>
            </div>

            <button
              onClick={() => setShowHowToPlay(false)}
              className="mt-6 w-full bg-[#4E2A0B] hover:bg-[#6B3A1A] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {t("common.gotIt")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
