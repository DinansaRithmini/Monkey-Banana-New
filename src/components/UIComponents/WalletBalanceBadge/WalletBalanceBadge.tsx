import React from "react";

interface WalletBalanceBadgeProps {
  /** Total coin balance (default 0). */
  balance?: number;
}

/**
 * 🍌 WalletBalanceBadge
 * Displays the player's wallet balance with a shiny coin and a plus button.
 */
const WalletBalanceBadge: React.FC<WalletBalanceBadgeProps> = ({ balance = 0 }) => {
  const formattedBalance = balance.toLocaleString("en-US");

  return (
    <div className="inline-flex items-center select-none">
      {/* Coin with plus icon */}
      <div className="relative -mr-4 flex-shrink-0">
        <img
          src="/images/Coin.png"
          alt="coin"
          className="w-14 sm:w-16 md:w-20 drop-shadow-[0_2px_0px_rgba(0,0,0,0.25)]"
        />
        <span className="absolute bottom-3 right-3 translate-x-1/2 translate-y-1/2">
          <img
            src="/images/Plus.png"
            alt="plus"
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
          />
        </span>
      </div>

      {/* Balance pill */}
      <div
        className="
          bg-gradient-to-b from-[#FFD85A] via-[#F7A531] to-[#E89E00]
          rounded-lg border-2 sm:border-4 border-white
          px-4 sm:px-6 py-1.5 sm:py-2
          shadow-[0_3px_0_rgba(0,0,0,0.45)]
          flex items-center
        "
      >
        <span
          className="
            text-white font-extrabold drop-shadow-[0_2px_0_rgba(0,0,0,0.35)]
            text-base sm:text-lg md:text-2xl
          "
        >
          {formattedBalance}
        </span>
      </div>
    </div>
  );
};

export default WalletBalanceBadge;
