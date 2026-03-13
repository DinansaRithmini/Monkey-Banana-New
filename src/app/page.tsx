"use client";

import React from "react";
import ContinuousBettingWheel from "../components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel";

export default function HomePage() {
  const appVersion = "v0.1.0";

  return (
    <main className="relative min-h-screen lg:h-screen lg:overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF5C3] via-[#FFD85A] to-[#F7A531]">
      <ContinuousBettingWheel />
      <div className="absolute bottom-3 right-4 z-50 text-xs font-semibold text-[#FFF5C3] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        {appVersion}
      </div>
    </main>
  );
}
