"use client";
import React from "react";
import SlotMachineReel from "./subcomponents/SlotMachineReel";
interface Player {
  id: string;
  name: string;
  amount: number;
  isWinner?: boolean;
}

interface SlotMachineProps {
  players: Player[];
  currentWinnerId?: string | null;
  isSpinning: boolean;
}

const SlotMachine: React.FC<SlotMachineProps> = ({
  players,
  currentWinnerId,
  isSpinning,
}) => {
  // Select current player (winner or fallback)
  const currentPlayer =
    players.find((p) => p.id === currentWinnerId) || players[0];

  return (
    <div className="relative w-full max-w-3xl mx-auto p-4">
      {/* Slot machine container */}
      <div className="relative flex flex-col items-center">
        {/* === Total Coin Balance (Above Slot Machine) === */}
        <div className="flex items-center justify-center gap-2 mb-3 mt-2">
          {/* 🪙 Coin Circle */}
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#F7A531] flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.3)] mt-[40px]">
            <img
              src="/images/gameon_chip.png"
              alt="coin"
              className="w-5 h-5 md:w-6 md:h-6 object-contain"
            />
          </div>

          {/* 💰 Balance Amount */}
          <span className="text-[30px] md:text-[0px] leading-none font-bungee text-white drop-shadow-[4px_4px_0_#4E2A0B] mt-[20px]">
            474.34
          </span>
        </div>

        {/* === Slot machine wrapper === */}
        <div className="relative flex justify-center items-center mb-1">
          {/* 🌟 Shine background effect (code-based) */}
          <div
            className="absolute inset-0 z-0 opacity-80 animate-rotate-slow"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255, 216, 90, 0.35) 0%, rgba(247, 165, 49, 0.15) 40%, rgba(78, 42, 11, 0) 70%)",
            }}
          ></div>

          {/* 🎰 Slot machine image */}
          <img
            src="/images/slot_machine.gif"
            alt="Slot Machine"
            className="relative drop-shadow-lg select-none pointer-events-none max-w-[538px] h-auto z-10 mt-[1px]"
          />

         <SlotMachineReel players={players} isSpinning={isSpinning} />

          
        </div>

        {/* === Action Buttons (Below Slot Machine) === */}
        <div className="flex justify-center items-center gap-6 mt-6">
          {/* Dark Brown Button */}
          <button className="relative w-[185px] h-[50px] active:scale-95 transition-transform">
            <img
              src="/images/dark_brown_button.png"
              alt="Dark Brown Button"
              className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
            />
            <span className="relative z-10 flex items-center justify-center gap-1 h-full text-[#FFD85A] font-bungee text-lg">
              <img
                src="/images/gameon_chip.png"
                alt="coin"
                className="w-5 h-5 md:w-6 md:h-6 object-contain"
              />
              + 1
            </span>
          </button>

          {/* Light Brown Button */}
          <button className="relative w-[185px] h-[50px] active:scale-95 transition-transform">
            <img
              src="/images/light_brown_button.png"
              alt="Light Brown Button"
              className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
            />
            <span className="relative z-10 flex items-center justify-center h-full text-[#FFFFFF] font-bungee text-lg">
              ADD
            </span>
          </button>
        </div>

        {/* === Time Holder (Below Buttons) === */}
        <div className="flex justify-center items-center mt-2">
          <div className="relative w-[320px] h-[190px]">
            {/* Background image */}
            <img
              src="/images/time_holder.png"
              alt="Time Holder"
              className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
            />

            {/* 🕒 Text Overlay (Inside white area) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 translate-x-[40px]">
              <span className="text-[#A35B1B] font-bungee text-sm tracking-wide leading-none mb-1">
                TIME REMAINING
              </span>
              <span className="text-[#4E2A0B] font-bungee text-3xl leading-none">
                59:00
              </span>
            </div>
            {/* === Past Winners Section === */}
            <div className="relative w-full flex justify-center mt-60">
              {/* 🟤 Background */}
              <div className="relative w-screen -mx-15 h-auto">
                <img
                  src="/images/past_player_background.png" // reuse or change to a new image
                  alt="Past Winners Background"
                  className="absolute left-1/2 top-0 -translate-x-1/2 w-[140vw] md:w-[135vw] h-auto object-contain select-none pointer-events-none scale-110"
                  style={{
                    minHeight: "520px",
                  }}
                />

                {/* === Content Overlay === */}
                <div className="absolute inset-0 flex flex-col items-center mt-[30px] px-4 z-10">
                  {/* 🏷️ Header */}
                  <div className="px-5 py-8 mb-10">
                    <span className="font-bungee text-white text-lg md:text-xl drop-shadow-[2px_2px_0_#4E2A0B]">
                      PAST WINNERS
                    </span>
                  </div>

                  {/* 👑 Winner Cards */}
                  <div className="w-full flex flex-col items-center gap-3">
                    {[
                      {
                        name: "ALEX COOPER",
                        amount: 120.0,
                        avatar: "/images/profile.png",
                      },
                      {
                        name: "MARIA GREEN",
                        amount: 95.0,
                        avatar: "/images/profile.png",
                      },
                      {
                        name: "JOHN DOE",
                        amount: 80.0,
                        avatar: "/images/profile.png",
                      },
                    ].map((winner, index) => (
                      <div
                        key={index}
                        className="flex items-center w-[280px] h-[60px] bg-[#4E2A0B] rounded-xl shadow-md px-3 gap-3"
                      >
                        <img
                          src={winner.avatar}
                          alt={winner.name}
                          className="w-[45px] h-[45px] rounded-full object-cover border-2 border-[#FFD85A]"
                        />
                        <div className="flex flex-col flex-grow">
                          <span className="font-bungee text-white text-sm leading-tight">
                            {winner.name.toUpperCase()}
                          </span>
                          <div className="flex items-center gap-1">
                            <img
                              src="/images/gameon_chip.png"
                              alt="coin"
                              className="w-4 h-4 object-contain"
                            />
                            <span className="text-[#FFD85A] font-bungee text-base">
                              {winner.amount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* === Past Winners Section === */}
                  <div className="relative w-full flex justify-center mt-60">
                    {/* 🟤 Background */}
                    <div className="relative w-screen -mx-15 h-auto">
                      <img
                        src="/images/past_player_background.png" // reuse or change to a new image
                        alt="Past Winners Background"
                        className="absolute left-1/2 top-0 -translate-x-1/2 w-[140vw] md:w-[135vw] h-auto object-contain select-none pointer-events-none scale-110"
                        style={{
                          minHeight: "520px",
                        }}
                      />

                      {/* === Content Overlay === */}
                      <div className="absolute inset-0 flex flex-col items-center mt-[30px] px-4 z-10">
                        {/* 🏷️ Header */}
                        <div className="px-5 py-8 mb-10">
                          <span className="font-bungee text-white text-lg md:text-xl drop-shadow-[2px_2px_0_#4E2A0B]">
                            PAST WINNERS
                          </span>
                        </div>

                        {/* 👑 Winner Cards */}
                        <div className="w-full flex flex-col items-center gap-3">
                          {[
                            {
                              name: "ALEX COOPER",
                              amount: 120.0,
                              avatar: "/images/profile.png",
                            },
                            {
                              name: "MARIA GREEN",
                              amount: 95.0,
                              avatar: "/images/profile.png",
                            },
                            {
                              name: "JOHN DOE",
                              amount: 80.0,
                              avatar: "/images/profile.png",
                            },
                          ].map((winner, index) => (
                            <div
                              key={index}
                              className="flex items-center w-[280px] h-[60px] bg-[#4E2A0B] rounded-xl shadow-md px-3 gap-3"
                            >
                              <img
                                src={winner.avatar}
                                alt={winner.name}
                                className="w-[45px] h-[45px] rounded-full object-cover border-2 border-[#FFD85A]"
                              />
                              <div className="flex flex-col flex-grow">
                                <span className="font-bungee text-white text-sm leading-tight">
                                  {winner.name.toUpperCase()}
                                </span>
                                <div className="flex items-center gap-1">
                                  <img
                                    src="/images/gameon_chip.png"
                                    alt="coin"
                                    className="w-4 h-4 object-contain"
                                  />
                                  <span className="text-[#FFD85A] font-bungee text-base">
                                    {winner.amount.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;
