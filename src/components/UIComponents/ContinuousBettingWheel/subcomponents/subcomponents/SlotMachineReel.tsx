"use client";
import React, { useEffect, useState, useRef } from "react";

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
  const [spinSpeed, setSpinSpeed] = useState(150); // Mid-fast constant speed
  const spinIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Update display players when the players prop changes (but not while spinning)
  useEffect(() => {
    if (!isSpinning) {
      setDisplayPlayers(players);
    }
  }, [players, isSpinning]);

  // 🎰 Smooth continuous spinning animation
  useEffect(() => {
    if (!isSpinning) {
      // Clear any existing intervals
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
        spinIntervalRef.current = null;
      }
      setIsTransitioning(false);
      return;
    }

    // Start spinning at a consistent mid-fast speed
    let currentSpeed = 250; // Start a bit slower
    setSpinSpeed(currentSpeed);
    setIsTransitioning(true);

    // Quick acceleration to mid-fast speed (0.8 seconds)
    const accelerationInterval = setInterval(() => {
      currentSpeed = Math.max(120, currentSpeed - 30); // Reach 120ms (mid-fast)
      setSpinSpeed(currentSpeed);
    }, 80);

    setTimeout(() => {
      clearInterval(accelerationInterval);
      setSpinSpeed(120); // Lock at mid-fast speed
    }, 800);

    return () => {
      clearInterval(accelerationInterval);
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
      }
    };
  }, [isSpinning]);

  // Continuous rotation logic
  useEffect(() => {
    if (!isSpinning) return;

    if (spinIntervalRef.current) {
      clearInterval(spinIntervalRef.current);
    }

    spinIntervalRef.current = setInterval(() => {
      setDisplayPlayers((prev) => {
        if (prev.length === 0) return prev;
        const rotated = [...prev];
        rotated.push(rotated.shift()!); // Move first to last
        return rotated;
      });
      // Trigger animation re-render
      setAnimationKey(prev => prev + 1);
    }, spinSpeed);

    return () => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
      }
    };
  }, [isSpinning, spinSpeed]);
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center z-20 transition-all`}
      style={{
        gap: isSpinning ? '8px' : '8px', // Consistent spacing
      }}
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
              key={`${player.id}-${index}-${animationKey}`}
              className={`relative ${
                isSpinning ? 'animate-slot-slide' : 'transition-all duration-500'
              } ${
                isMiddle ? "scale-110 z-20" : "scale-85 opacity-50"
              }`}
              style={{
                transform: `scale(${isMiddle ? 1.1 : 0.85})`,
              }}
            >
              {/* Glow effect on center card during spinning */}
              {isSpinning && isMiddle && (
                <div className="absolute inset-0 bg-yellow-400/20 rounded-lg blur-lg"></div>
              )}

              {/* Tile background */}
              <img
                src="/images/tile.png"
                alt="Name Tile"
                className={`w-[200px] h-auto object-contain select-none pointer-events-none ml-[-3px] ${
                  isMiddle 
                    ? "brightness-110 drop-shadow-[0_0_20px_rgba(255,216,90,0.7)]" 
                    : "brightness-70"
                }`}
              />

              {/* Player name */}
              <span
                className={`absolute inset-0 flex items-center justify-center font-bungee text-[18px] md:text-[22px] ${
                  isMiddle 
                    ? "text-[#B26A42]" 
                    : "text-[#4E2A0B] opacity-40"
                }`}
              >
                {player.name.toUpperCase()}
              </span>

              {/* Winner celebration effect - only show when stopped */}
              {isMiddle && !isSpinning && (
                <>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                    <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent animate-shimmer"></div>
                  </div>
                  
                  {/* Winner sparkles */}
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                  <div className="absolute -top-2 -left-2 w-3 h-3 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                  <div className="absolute -bottom-2 left-1/2 w-3 h-3 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                </>
              )}
            </div>
          );
        })
      )}
      
      {/* Spinning indicator */}
      {isSpinning && (
        <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 pointer-events-none z-30">
          <div className="text-yellow-400 font-bungee text-xs tracking-widest opacity-80 animate-pulse drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
            ● SPINNING ●
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotMachineReel;
