"use client";
import React from "react";
import Lottie from "lottie-react";
import { useT } from "../../../../i18n";
import { Money } from "../../../../currency/Money";
import { useCurrency } from "../../../../currency";
import happyMonkeyAnimation from "../../../../../public/happy-monkey.json";

interface BetConfirmationPopupProps {
  show: boolean;
  amount: number;
  onConfirm: () => void;
  onCancel: () => void;
  isPlacing: boolean;
}

const BetConfirmationPopup: React.FC<BetConfirmationPopupProps> = ({
  show,
  amount,
  onConfirm,
  onCancel,
  isPlacing,
}) => {
  const t = useT();
  const { currency } = useCurrency();
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
        show
          ? "opacity-100 pointer-events-auto bg-black/70 z-50"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onCancel}
    >
      {/* Popup Card */}
      <div
        className="relative w-[420px] h-[380px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center rounded-xl shadow-lg drop-shadow-[0_0_25px_#FFD85A] transition-transform duration-300 scale-100"
        style={{
          backgroundImage: "url('/images/Insufficient_balance_background.png')",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Popup Content */}
        <div className="flex flex-col items-center justify-center h-full text-center">
          {/* Happy Monkey Animation */}
          <Lottie
            animationData={happyMonkeyAnimation}
            loop
            autoplay
            className="w-[80px] h-[80px] my-2 drop-shadow-[0_0_10px_#FFD85A]"
          />
          {/* Title */}
          <h2 className="text-[#A96229] text-lg px-2 font-bungee leading-tight mb-4 mt-[10px]">
            {t("bet.confirmTitle")}
          </h2>

          {/* Description */}
          <div className="text-center mt-[20px]">
            <p className="text-[#5E5E5E] font-medium text-sm mb-3">
              {t("bet.confirmBody1")}
            </p>

            {/* Amount with Gameon Chip */}
            <div className="flex items-center justify-center space-x-2">
              {currency !== "lkr" && (
                <img
                  src="/images/gameon_chip.png"
                  alt="Gameon Chip"
                  className="w-[40px] h-[40px]"
                />
              )}
              <span className="font-bungee text-[#A96229] font-bold text-3xl">
                <Money amount={amount} />
              </span>
            </div>
            {/* Additional Text after Amount */}
            <p className="text-[#5E5E5E] font-medium text-[11px] leading-tight text-center px-10 mt-7">
              {t("bet.confirmBody2")}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-2 mt-[40px]">
            {/* Confirm Button */}
            <button
              onClick={onConfirm}
              disabled={isPlacing}
              className="relative w-[180px] h-[60px] active:scale-95 transition-transform"
            >
              <img
                src="/images/light_brown_button.png"
                alt="Confirm Button"
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
              />
              <span className="relative z-10 flex items-center justify-center h-full text-white font-bungee text-lg">
                {isPlacing ? t("common.placing") : t("common.confirm")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetConfirmationPopup;
