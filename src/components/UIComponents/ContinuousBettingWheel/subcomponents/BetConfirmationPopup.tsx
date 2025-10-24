"use client";
import React from "react";
import { Button } from "@/components/ui/button";

interface BetConfirmationPopupProps {
  show: boolean;
  amount: number | null;
  isPlacing: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const BetConfirmationPopup: React.FC<BetConfirmationPopupProps> = ({
  show,
  amount,
  isPlacing,
  onConfirm,
  onCancel,
}) => {
  if (!show || amount === null) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div
        className="bg-white rounded-2xl p-6 text-center max-w-sm w-[90vw] shadow-[0_6px_32px_rgba(0,0,0,0.25)] relative overflow-hidden"
      >
        {/* Top banana arc background */}
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

        {/* Main Content */}
        <div className="relative z-10">
          {/* Coin Icon */}
          <img
            src="/images/Coin.png"
            alt="Coin"
            className="w-16 h-16 mx-auto mb-3"
          />

          {/* Heading */}
          <h3 className="text-[#4E2A0B] font-extrabold text-xl mb-2">
            Confirm Wager
          </h3>

          <p className="text-sm text-gray-700 mb-4">
            Are you sure you want to place a wager of
          </p>

          {/* Amount */}
          <div className="flex justify-center items-center mb-4">
            <img
              src="/images/Coin.png"
              alt="coin"
              className="inline-block w-6 h-6 mr-2"
            />
            <span className="text-2xl font-extrabold text-[#8B5A2B]">
              {amount.toLocaleString()}
            </span>
          </div>

          <p className="text-xs text-gray-500 mb-6">
            This amount will be deducted from your wallet balance
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-[#4E2A0B] hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isPlacing}
              className="flex-1 bg-gradient-to-b from-[#FFD85A] to-[#F7A531] text-[#4E2A0B] font-extrabold hover:brightness-105"
            >
              {isPlacing ? "Placing..." : "Confirm"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetConfirmationPopup;
