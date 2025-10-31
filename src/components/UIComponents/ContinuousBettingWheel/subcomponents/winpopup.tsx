"use client";
import React from "react";

interface WinPopupProps {
  show: boolean;
  amount: number;
  onClose: () => void;
}

const WinPopup: React.FC<WinPopupProps> = ({ show, amount, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
      onClick={onClose}
    >
      {/* 🖤 Black blurred background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[6px] z-0"></div>

      {/* 🌟 Sunburst rays background */}
      <div
        className="absolute w-[900px] h-[900px] rounded-full z-10 opacity-90 animate-pulseBeams"
        style={{
          background:
            "repeating-conic-gradient(rgba(255, 239, 163, 0.35) 0deg 10deg, transparent 10deg 20deg)",
          maskImage:
            "radial-gradient(circle at center, black 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 60%, transparent 100%)",
          filter: "blur(0px)",
          transform: "scale(1.3) translateY(80px)", // keep or fine-tune
          backgroundPosition: "center -90px", // 👈 moves beam origin lower
        }}
      ></div>

      {/* 🟡 Win popup card */}
      <div
        className="relative w-[420px] h-[400px] flex flex-col items-center justify-center rounded-xl shadow-lg drop-shadow-[0_0_30px_#FFD85A] z-20 animate-popupIn"
        style={{
          backgroundImage: "url('/images/win_background.png')",
          backgroundSize: "80%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ✨ YOU WIN Text */}
        <div className="flex flex-col items-center justify-center h-full text-center relative z-20">
          <h2
            className="text-[#FFDD00] text-7xl font-bungee leading-tight mb-4 mt-[50px] tracking-[-5px]"
            style={{
              WebkitTextStroke: "5px #714023",
              WebkitTextFillColor: "#FFDD00",
            }}
          >
            YOU WIN
          </h2>
        </div>
      </div>

      {/* 🪙 Flying coins layer (topmost) */}
      <img
        src="/images/coins_flying.png"
        alt="Flying Coins"
        className="absolute inset-0 w-[900%] h-[120%] object-contain opacity-90 pointer-events-none z-30 animate-slowFloat"
        style={{
          transform: "scale(1.6)",
        }}
      />
    </div>
  );
};

export default WinPopup;
