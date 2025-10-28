"use client";

import React from "react";
import ContinuousBettingWheel from "../components/UIComponents/ContinuousBettingWheel/ContinuousBettingWheel";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF5C3] via-[#FFD85A] to-[#F7A531]">
      <ContinuousBettingWheel />
    </main>
  );
}
