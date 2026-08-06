"use client";
import React from "react";
import Lottie from "lottie-react";
import { useT } from "../../../../i18n";
import { Money } from "../../../../currency/Money";
import { useCurrency } from "../../../../currency";
import happyMonkeyAnimation from "../../../../../public/happy-monkey.json";

/**
 * The exported animation paints an opaque card behind the monkey: a white
 * 400×400 solid at the bottom of the stack (26), a light-grey circle over it
 * (25), and a second white solid (2) track-matted by (1) so it fills everything
 * *outside* that circle. Dropping those four leaves the monkey on transparency,
 * which is what the popup wants.
 *
 * "Background 5" (23) deliberately stays: it is a matte (`td: 1`), never drawn,
 * and the body layer is clipped to it — remove it and the body renders unclipped.
 */
const OPAQUE_BACKGROUND_LAYERS = [1, 2, 25, 26];
const happyMonkey = {
  ...happyMonkeyAnimation,
  layers: happyMonkeyAnimation.layers.filter(
    (layer) => !OPAQUE_BACKGROUND_LAYERS.includes(layer.ind)
  ),
};

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
            animationData={happyMonkey}
            loop
            autoplay
            className="w-[130px] h-[130px] -my-2 drop-shadow-[0_0_10px_#FFD85A]"
          />
          {/* Title — Sinhala and Tamil run much longer than the English string
              and spill out of the 420px card on phones, so they step down a
              size below `lg`. Bungee carries no Sinhala glyphs either, and the
              fallback face needs looser leading to keep its diacritics intact. */}
          <h2 className="text-[#A96229] text-sm lg:text-lg px-3 lg:px-2 font-bungee leading-snug lg:leading-tight mb-4 mt-[10px]">
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
            <p className="text-[#5E5E5E] font-medium text-[9px] lg:text-[11px] leading-snug lg:leading-tight text-center px-5 lg:px-10 mt-7">
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
