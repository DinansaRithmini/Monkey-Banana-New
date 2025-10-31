"use client";
import React from "react";

interface JackpotPopupProps {
  show: boolean;
  amount: number;
  onClose: () => void;
}

const JackpotPopup: React.FC<JackpotPopupProps> = ({ show, amount, onClose }) => {
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
          transform: "scale(1.3) translateY(80px)",
          backgroundPosition: "center -90px",
        }}
      ></div>

      {/* 🪙 Flying coins layer (below text, above beams) */}
      <img
        src="/images/coin_flying_01.png"
        alt="Flying Coins"
        className="absolute inset-0 w-[900%] h-[107%] object-contain opacity-90 pointer-events-none z-15 animate-slowFloat"
        style={{
          transform: "scale(1.6)",
        }}
      />

      {/* 💎 Jackpot popup card */}
      <div
        className="relative w-[420px] h-[400px] flex flex-col items-center justify-center rounded-xl shadow-lg drop-shadow-[0_0_40px_#FFD85A] z-20 animate-popupIn"
        style={{
          backgroundImage: "url('/images/jackpot_background.png')",
          backgroundSize: "80%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center justify-center h-full text-center relative z-20">
          {/* ✨ JACKPOT Text */}
          <h2
            className="text-[#FFDD00] text-6xl font-bungee leading-tight mb-2 mt-[40px] tracking-[-5px] relative z-20"
            style={{
              WebkitTextStroke: "6px #3B221A",
              WebkitTextFillColor: "#FFDD00",
            }}
          >
            JACKPOT
          </h2>

          {/* 💰 Jackpot Amount with Coin Icon */}
          <div className="flex items-center justify-center gap-3 mt-2 relative z-20">
             <img
              src="https://storage.googleapis.com/image-bucket-new/Gameon/brown_goken.png"
              alt="Coin Icon"
              className="w-[45px] h-[45px] object-contain"
            />
            <p
              className="font-bungee text-4xl"
              style={{
                color: "#FFFFFF",
                WebkitTextStroke: "2px #3B221A",
                letterSpacing: "-2px",
              }}
            >
              {amount}
            </p>
           
            <p
              className="font-bungee text-4xl"
              style={{
                color: "#FFFFFF",
                WebkitTextStroke: "2px #3B221A",
                letterSpacing: "-2px",
              }}
            >
              
            </p>
          </div>
        </div>

        {/* 🏆 Jackpot Winner Image (below text) */}
        <img
          src="/images/jackpot_winner.png"
          alt="Jackpot Winner"
          className="absolute top-[230px] w-[360px] h-auto object-contain z-10"
        />
      </div>
    </div>
  );
};

export default JackpotPopup;
