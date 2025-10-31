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
      {/* Black blurred background (lowest layer) */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[6px] z-0 animate-fadeIn"></div>

      {/* Flying coins above the blur */}
      <img
        src="/images/coins_flying.png"
        alt="Flying Coins"
        className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none z-10 animate-slowFloat"
      />

      {/* Centered win popup card with animation */}
      <div
        className="relative w-[420px] h-[400px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center rounded-xl shadow-lg drop-shadow-[0_0_30px_#FFD85A] z-20 animate-popupIn"
        style={{
          backgroundImage: "url('/images/win_background.png')",
          backgroundSize: "40%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center justify-center h-full text-center relative z-10">
          <h2
            className="text-[#FFDD00] text-4xl font-bungee leading-tight mb-3 mt-[60px]"
            style={{
              textShadow: `
                0 0 5px #714023,
                2px 2px 5px #714023,
                -2px -2px 5px #714023,
                -2px 2px 5px #714023,
                2px -2px 5px #714023
              `,
            }}
          >
            YOU WIN!
          </h2>

         
          
        </div>
      </div>
    </div>
  );
};

export default WinPopup;
