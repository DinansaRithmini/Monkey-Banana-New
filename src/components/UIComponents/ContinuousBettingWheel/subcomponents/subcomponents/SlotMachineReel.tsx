"use client";
import React, { useEffect, useState } from "react";

interface Player {
  id: string;
  name: string;
  amount: number;
}

interface SlotMachineReelProps {
  players: Player[];
  isSpinning: boolean;
}

const SlotMachineReel: React.FC<SlotMachineReelProps> = ({ players, isSpinning }) => {
  const [displayPlayers, setDisplayPlayers] = useState(players);

  // Update display players when the players prop changes
  useEffect(() => {
    setDisplayPlayers(players);
  }, [players]);

  // 🔁 Rotate the list while spinning
  useEffect(() => {
    if (!isSpinning) return;
    const interval = setInterval(() => {
      setDisplayPlayers((prev) => {
        const rotated = [...prev];
        rotated.push(rotated.shift()!); // move first to last
        return rotated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSpinning]);

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center space-y-2 z-20 transition-all`}
    >
      {displayPlayers.length === 0 ? (
        // Show placeholder when no players
        <div className="text-center">
          <span className="font-bungee text-[#4E2A0B] text-lg opacity-50">
            WAITING FOR PLAYERS...
          </span>
        </div>
      ) : (
        displayPlayers.slice(0, 3).map((player, index) => {
          const isMiddle = index === 1;
          return (
            <div
              key={`${player.id}-${index}`}
              className={`relative transition-all duration-500 ${
                isMiddle ? "scale-110 z-20" : "opacity-40 blur-[2px]"
              }`}
            >
              {/* Tile background */}
              <img
                src="/images/tile.png"
                alt="Name Tile"
                className={`w-[200px] h-auto object-contain select-none pointer-events-none ml-[-3px] ${
                  isMiddle ? "brightness-110" : "brightness-90"
                }`}
              />

              {/* Player name */}
              <span
                className={`absolute inset-0 flex items-center justify-center font-bungee text-[18px] md:text-[22px] text-[#4E2A0B] ${
                  isMiddle ? "text-[#B26A42]" : "opacity-70"
                }`}
              >
                {player.name.toUpperCase()}
              </span>

              {/* Highlight arrows
              {isMiddle && (
                <>
                  <img
                    src="/images/arrow_left.png"
                    alt="Left Arrow"
                    className="absolute left-[-25px] top-1/2 -translate-y-1/2 w-[25px] h-auto"
                  />
                  <img
                    src="/images/arrow_right.png"
                    alt="Right Arrow"
                    className="absolute right-[-25px] top-1/2 -translate-y-1/2 w-[25px] h-auto"
                  />
                </>
              )} */}
            </div>
          );
        })
      )}
    </div>
  );
};

export default SlotMachineReel;
