"use client";
import React from "react";

interface LosePopupProps {
  show: boolean;
  amount: number;
  isLoser: boolean;
  onClose: () => void;
}

const LosePopup: React.FC<LosePopupProps> = ({ show, amount,isLoser, onClose }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
        show ? "opacity-100 pointer-events-auto bg-black/70 z-50" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* Popup Card */}
      <div
        className="relative w-[420px] h-[380px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center rounded-xl shadow-lg drop-shadow-[0_0_25px_#FFD85A] transition-transform duration-300 scale-100"
        style={{
          backgroundImage: "url('/images/lose_background.png')", // Adjust the background for lose scenario
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background rays effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-400 via-red-500 to-transparent opacity-50"></div>

        {/* Popup Content */}
        <div className="flex flex-col items-center justify-center h-full text-center relative z-10">
          {/* Title */}
          <h2 className="text-[#FFDD00] text-5xl font-bungee font-bold mb-4">
            YOU LOSE
          </h2>

          {/* Amount lost */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img
              src="/images/gameon_chip.png"
              alt="Gameon Chip"
              className="w-[40px] h-[40px]"
            />
            <span className="text-[#FFDD00] font-bungee text-3xl font-bold">
              {amount} Coins
            </span>
          </div>

          {/* Coin Animation */}
          <div className="flex justify-center space-x-4">
            <img
              src="/images/gold_coin.png"
              alt="Gold Coin"
              className="w-[60px] h-[60px] animate-bounce"
            />
            <img
              src="/images/gold_coin.png"
              alt="Gold Coin"
              className="w-[60px] h-[60px] animate-bounce"
            />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-4 py-2 px-6 bg-[#FFDD00] text-white rounded-lg font-bungee text-lg hover:bg-yellow-300 transition-all"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default LosePopup;
