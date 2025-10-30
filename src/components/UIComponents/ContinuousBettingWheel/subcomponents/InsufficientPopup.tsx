"use client";
import React from "react";

interface InsufficientPopupProps {
  show: boolean;
  onClose: () => void;
}

const InsufficientPopup: React.FC<InsufficientPopupProps> = ({
  show,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 overflow-hidden"
      onClick={onClose}
    >
      {/* Centered popup card */}
      <div
        className="relative w-[420px] h-[380px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center rounded-xl shadow-lg drop-shadow-[0_0_25px_#FFD85A]"
        style={{
          backgroundImage: "url('/images/insufficient_balance_background.png')",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Popup content */}
        <div className="flex flex-col items-center justify-center h-full text-center">
          {/* Title */}
          <h2 className="text-[#A96229] text-2xl font-bungee leading-tight mb-2 mt-[80px]">
            INSUFFICIENT
            <br />
            BALANCE
          </h2>

          {/* Description */}
          <p className="text-[#5E5E5E] font-medium text-sm px-8 mb-3 mt-[20px]">
            Your Wallet doesn’t have <br />
            enough coins to place <br />
            this bet.
          </p>

          {/* Continue button */}
          <button
            onClick={onClose}
            className="relative w-[180px] h-[50px] active:scale-95 transition-transform mt-[50px]"
          >
            {/* Button background image */}
            <img
              src="/images/light_brown_button.png"
              alt="Light Brown Button"
              className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
            />

            {/* Button text */}
            <span className="relative z-10 flex items-center justify-center h-full text-white font-bungee text-lg">
              CONTINUE
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsufficientPopup;
