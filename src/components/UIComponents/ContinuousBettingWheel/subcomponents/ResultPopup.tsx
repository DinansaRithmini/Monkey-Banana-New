"use client";
import React from "react";
//import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";

interface ResultPopupProps {
  show: boolean;
  isWinner: boolean;
  onClose: () => void;
}

const ResultPopup: React.FC<ResultPopupProps> = ({ show, isWinner, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div
        className="bg-white rounded-2xl p-6 text-center max-w-xs w-[90vw] shadow-[0_6px_32px_rgba(0,0,0,0.25)] relative overflow-hidden"
      >
        {/* Banana gradient arc */}
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-full h-60 z-0 overflow-hidden pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              background: "linear-gradient(90deg, #FFD85A, #F7A531)",
              borderBottomLeftRadius: "100% 60%",
              borderBottomRightRadius: "100% 60%",
            }}
          ></div>
        </div>

        {/* Confetti when winning */}
        {/* {isWinner && (
          <div className="absolute inset-0 pointer-events-none">
            <Confetti recycle={false} />
          </div>
        )} */}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center pt-6">
          {/* Result image */}
          <img
            src={isWinner ? "/images/You Won.png" : "/images/You Lose.png"}
            alt={isWinner ? "You Won" : "You Lose"}
            className="h-14 w-auto mb-3"
          />

          {/* Star / Medal */}
          <img
            src={isWinner ? "/images/Gold_Star.png" : "/images/silver star.png"}
            alt={isWinner ? "Gold Star" : "Silver Star"}
            className="h-20 w-20 mx-auto object-contain mb-3"
          />

          {/* Message */}
          <p className="text-gray-700 font-medium text-sm mb-6 px-3 text-center">
            {isWinner
              ? "🎉 Your prize has been added to your wallet!"
              : "Didn’t win this time? Next round could be yours — keep playing!"}
          </p>

          {/* Continue Button */}
          <Button
            onClick={onClose}
            className="bg-gradient-to-b from-[#FFD85A] to-[#F7A531] text-[#4E2A0B] font-extrabold px-8 py-2 rounded-full hover:brightness-105"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultPopup;
