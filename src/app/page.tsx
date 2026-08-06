"use client";

import React from "react";
import ContinuousBettingWheel from "../components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel";
import { SettingsMenu } from "../components/UIComponents/SettingsMenu/SettingsMenu";
import { I18nProvider } from "../i18n";
import { CurrencyProvider } from "../currency";

export default function HomePage() {
  const appVersion = "v0.1.1";

  return (
    <I18nProvider>
      <CurrencyProvider>
        <main className="relative min-h-screen lg:h-screen lg:overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF5C3] via-[#FFD85A] to-[#F7A531]">
          <SettingsMenu />
          <ContinuousBettingWheel />
          <div className="absolute bottom-3 right-4 z-50 text-xs font-semibold text-[#FFF5C3] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {appVersion}
          </div>
        </main>
      </CurrencyProvider>
    </I18nProvider>
  );
}
