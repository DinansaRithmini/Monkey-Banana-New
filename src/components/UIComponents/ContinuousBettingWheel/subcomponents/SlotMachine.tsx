"use client";
import { useState, useEffect } from "react";
import SlotMachineReel from "./subcomponents/SlotMachineReel";
import type { GameState, Winner } from "../../../lib/types";
// --- Count-up animation hook ---
function useCountUp(targetValue: number, duration = 800) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let startValue = current;
    let startTime: number | null = null;
    const difference = targetValue - startValue;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCurrent(Math.floor(startValue + difference * progress));

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [targetValue]);

  return current;
}

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
  walletBalance: number | null;
  onAddBet: () => void;
  onQuickBet: (amount: number) => void;
  timeLeft: number;
  gameState: GameState | null;
  playerName: string | null;
  hasJoined: boolean;
}

const SlotMachine: React.FC<SlotMachineProps> = ({
  players,
  currentWinnerId,
  isSpinning,
  walletBalance,
  onAddBet,
  onQuickBet,
  timeLeft,
  gameState,
  playerName,
  hasJoined,
}) => {
  // Select current player (winner or fallback)
  const currentPlayer =
    players.find((p) => p.id === currentWinnerId) || players[0];

  // Track when spinning should start
  const [shouldSpin, setShouldSpin] = useState(false);
  const [previousTimeLeft, setPreviousTimeLeft] = useState(timeLeft);
  const [showAllWinners, setShowAllWinners] = useState(false);

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const getPhaseMessage = () => {
    if (!gameState) return "";

    switch (gameState.phase) {
      case "betting":
        return `Place your wager!`;
      case "spinning":
        return `Spinning the wheel...`;
      case "finished":
        return `We have a winner!`;
      case "round_ending":
        return `No wager was placed`;
      default:
        return "";
    }
  };

  // Trigger spinning when timer hits 0
  useEffect(() => {
    if (previousTimeLeft > 0 && timeLeft === 0 && !shouldSpin) {
      setShouldSpin(true);
    }

    // Reset spin state when new round starts (timer resets)
    if (timeLeft > previousTimeLeft) {
      setShouldSpin(false);
    }

    setPreviousTimeLeft(timeLeft);
  }, [timeLeft, previousTimeLeft, shouldSpin]);

  // Also handle spinning state from gameState
  useEffect(() => {
    if (gameState?.phase === "spinning") {
      setShouldSpin(true);
    } else if (
      gameState?.phase === "betting" ||
      gameState?.phase === "finished"
    ) {
      setShouldSpin(false);
    }
  }, [gameState?.phase]);

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const formatNumber = (amount: number) =>
    new Intl.NumberFormat("en-IN", { minimumFractionDigits: 0 }).format(amount);

  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [winnerPage, setWinnerPage] = useState(0);
  const winnersPerPage = 3;
  const startIndex = winnerPage * winnersPerPage;
  const visibleWinners = winners.slice(startIndex, startIndex + winnersPerPage);
  useEffect(() => {
    setWinnerPage(0);
  }, [winners.length]);

  // paging for active players (to match Past Players scroll behavior)
  const [activePage, setActivePage] = useState(0);
  const activePlayersPerPage = 3;
  useEffect(() => {
    setActivePage(0);
  }, [gameState?.players.length]);

  useEffect(() => {
    fetchWinners();
    // Refresh winners every 30 seconds
    const interval = setInterval(fetchWinners, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchWinners = async () => {
    try {
      const response = await fetch("/api/winners");
      const data = await response.json();

      if (data.success) {
        setWinners(data.winners);
        setError(null);
      } else {
        setError("Failed to load winners");
      }
    } catch (err) {
      setError("Failed to load winners");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto p-4">
      {/* Slot machine container */}
      <div className="relative flex flex-col items-center">
        {/* === Total Coin Balance (Above Slot Machine) === */}
        <div className="flex items-center justify-center gap-2 mb-6 mt-2">
          {/* 🪙 Coin Circle */}
          <div className="mt-[0px]">
            <img
              src="/images/gameon_chip.png"
              alt="coin"
              className="w-8 h-8 md:w-9 md:h-9 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            />
          </div>

          {/* 💰 Balance Amount */}
          <span
            className="text-[30px] font-bungee text-white leading-none drop-shadow-[4px_4px_0_#4E2A0B] mt-[0px]"
            style={{
              WebkitTextStroke: "2px #432311",
            }}
          >
            {walletBalance?.toFixed(2) ?? "0.00"}
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
            className="drop-shadow-lg select-none pointer-events-none max-w-[90%] h-auto z-10 mt-[1px]"
          />

          <SlotMachineReel
            players={players}
            isSpinning={shouldSpin || isSpinning}
            winnerId={currentWinnerId}
          />
        </div>

        {/* 🎯 Dynamic Phase Message */}
        <h2
          key={gameState?.phase + (hasJoined ? "-joined" : "")}
          className="text-lg sm:text-xl md:text-2xl font-semibold text-white mt-6 text-center transition-opacity duration-700 ease-in-out opacity-100"
        >
          {(() => {
            if (!playerName)
              return "Welcome player! Enter your name to start playing.";

            const name = capitalizeFirstLetter(playerName);
            const phase = gameState?.phase;

            // --- Betting Phase ---
            if (phase === "betting") {
              return hasJoined
                ? `Your wager has been placed, good luck! `
                : `Hey ${name}, Place your wager! `;
            }

            // --- Spinning Phase ---
            if (phase === "spinning") {
              return `The wheel is spinning... `;
            }

            // --- Finished Phase ---
            if (phase === "finished") {
              const isWinner = gameState?.winner?.id === currentWinnerId;
              const playerInRound = gameState?.players.some(
                (p) => p.id === currentWinnerId
              );

              if (isWinner) {
                return `🎉 Congratulations ${name}, You won this round! `;
              } else if (hasJoined || playerInRound) {
                return `Better luck next time, ${name}! `;
              } else {
                return `Hey ${name}, join the next round! `;
              }
            }

            // --- Round Ending ---
            if (phase === "round_ending") {
              return `Round ending — get ready for the next one! `;
            }

            // --- Default ---
            return `Hey ${name}, Welcome to Monkey Banana `;
          })()}
        </h2>

        {/* === Action Buttons (Below Slot Machine) === */}
        {gameState?.phase === "betting" && !hasJoined && (
          <div className="flex justify-center items-center mt-6">
            {/* Dark Brown Button - Quick Bet 1 */}
            <button
              onClick={() => onQuickBet(1)}
              className="relative w-[200px] h-[60px] squishy z-10"
            >
              <img
                src="/images/dark_brown_button.png"
                alt="Dark Brown Button"
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
              />
              <span className="relative z-10 flex items-center justify-center gap-1 h-full text-[#FFFFFF] font-bungee text-2xl">
                <img
                  src="/images/gameon_chip.png"
                  alt="coin"
                  className="w-5 h-5 md:w-6 md:h-6 object-contain"
                />
                + 1
              </span>
            </button>

            {/* Light Brown Button - Add Bet */}
            <button
              onClick={onAddBet}
              className="relative w-[200px] h-[60px] squishy -ml-[50px] z-0"
            >
              <img
                src="/images/light_brown_button.png"
                alt="Light Brown Button"
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
              />
              <span className="relative z-10 flex items-center justify-center h-full text-[#FFFFFF] font-bungee text-2xl">
                ADD
              </span>
            </button>
          </div>
        )}

        {/* === Time Holder (Below Buttons) === */}
        <div className="flex justify-center items-center">
          <div className="relative w-[320px] h-[190px]">
            {/* Background image */}
            <img
              src="/images/time_holder.png"
              alt="Time Holder"
              className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
            />
            {/* 🕒 Text Overlay (Inside white area) */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center text-center z-20 translate-x-[40px] transition-all duration-300`}
            >
              <span
                className={`font-bungee text-sm tracking-wide leading-none mb-1 mt-3 transition-colors duration-300 text-[#A35B1B]`}
              >
                PRICE POOL
              </span>

              <div className="flex items-center justify-center gap-2">
                <img
                  src="https://storage.googleapis.com/image-bucket-new/Gameon/brown_goken.png"
                  alt="coin"
                  className="w-8 h-8 md:w-7 md:h-7 object-contain"
                />
                {/* use the count-up animation */}
                {(() => {
                  const animatedPot = useCountUp(
                    gameState?.totalPot ?? 0,
                    1000
                  );
                  return (
                    <span className="font-bungee text-3xl leading-none text-[#4E2A0B] transition-all duration-300">
                      {animatedPot.toLocaleString("en-IN")}
                    </span>
                  );
                })()}
              </div>
            </div>
            {/* === Active Players Section === */}
            {gameState && gameState.players.length > 0 ? (
              <>
                {/* 🟤 Active Players */}
                <div className="relative w-full flex justify-center mt-80 mb-48">
                  <div className="relative w-screen -mx-15 h-auto">
                    <img
                      src="/images/active_players_background.png"
                      alt="Active Players Background"
                      className="absolute left-1/2 top-0 -translate-x-1/2 w-[100vw] md:w-[135vw] h-auto object-contain select-none pointer-events-none scale-100"
                      style={{
                        minHeight: "520px",
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center mt-[30px] px-4 z-10">
                      <div className="px-5 py-7 transition-all duration-500">
                        <span
                          className="font-bungee text-white text-2xl md:text-2xl drop-shadow-[2px_2px_0_#4E2A0B]"
                          style={{
                            WebkitTextStroke: "3px #432311",
                          }}
                        >
                          ACTIVE PLAYERS
                        </span>
                      </div>
                      {/* Container with paging for active players (matches Past Players) */}
                    <div className="w-full relative justify-center mt-[20px] transition-all duration-500">
                        <div
                          className="flex flex-col items-center gap-3 overflow-hidden transition-all duration-700 ease-in-out"
                          style={{
                            maxHeight: "270px",
                          }}
                        >
                          <div
                            className="flex flex-col items-center gap-3 transition-transform duration-700 ease-in-out"
                            style={{
                              transform: `translateY(-${activePage * 270}px)`,
                            }}
                          >
                            {gameState.players.map((player, index) => (
                              <div
                                key={index}
                                className="flex items-center w-[360px] h-[80px] bg-[#341D1A] rounded-xl px-3 gap-3 flex-shrink-0 border-2 border-[#B26A42] shadow-[inset_0_-9px_0_#B26A42,0_6px_0_rgba(0,0,0,0.1)]"
                              >
                                <img
                                  src={player.profileImage}
                                  alt={player.name}
                                  className="w-[45px] h-[45px] rounded-[6px] object-cover border-2 border-[#FFD85A]"
                                />
                                <div className="flex flex-col flex-grow">
                                  <span className="font-bungee text-white text-sm leading-tight">
                                    {player.name.toUpperCase()}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <img
                                      src="/images/gameon_chip.png"
                                      alt="coin"
                                      className="w-4 h-4 object-contain"
                                    />
                                    <span className="text-[#FFD85A] font-bungee text-base">
                                      {player.amount.toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* ▼ Scroll Down Button for Active Players */}
                        {gameState.players.length > activePlayersPerPage && (
                          <button
                            onClick={() =>
                              setActivePage((prev) =>
                                prev + 1 >=
                                Math.ceil(
                                  gameState.players.length /
                                    activePlayersPerPage
                                )
                                  ? 0
                                  : prev + 1
                              )
                            }
                            className="mt-3 mx-auto flex items-center justify-center transition-transform duration-300 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={3}
                              stroke="#341D1A"
                              className={`w-6 h-6 transition-all duration-500 hover:translate-y-1 ${activePage + 1 >= Math.ceil(gameState.players.length / activePlayersPerPage)
                                  ? 'rotate-180'
                                  : ''
                                }`}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* === Past Winners Section BELOW Active Players === */}
                <div className="relative w-full flex justify-center mt-[520px]">
                  <div className="relative w-screen -mx-15 h-auto">
                    <img
                      src="/images/past_player_background.png"
                      alt="Past Winners Background"
                      className="absolute left-1/2 top-0 -translate-x-1/2 w-[100vw] md:w-[135vw] h-auto object-contain"
                      style={{ minHeight: "50px" }}
                    />
                    <div className="relative flex flex-col items-center mt-[30px] px-4 z-10">
                      <div className="px-5 py-4 mb-6 ">
                        <span
                          className="font-bungee text-white text-2xl md:text-2xl drop-shadow-[2px_2px_0_#4E2A0B]"
                          style={{ WebkitTextStroke: "3px #432311" }}
                        >
                          PAST PLAYERS
                        </span>
                      </div>

                      {winners.length === 0 ? (
                        <div className="text-center text-white/60 py-4">
                          No winners yet. Be the first!
                        </div>
                      ) : (
                        <>
                          <div
                            className="flex flex-col items-center gap-3 overflow-hidden transition-all duration-700 ease-in-out"
                            style={{
                              maxHeight: "285px",
                            }}
                          >
                            <div
                               className="flex flex-col items-center gap-3 transition-transform duration-700 ease-in-out"
                              style={{
                                transform: `translateY(-${winnerPage * 270}px)`,
                              }}
                            >
                              {winners.map((winner, index) => (
                                <div
                                  key={index}
                                  className="relative flex items-center w-[360px] h-[80px] bg-[#341D1A] rounded-xl px-3 gap-3 flex-shrink-0 border-2 border-[#B26A42] shadow-[inset_0_-9px_0_#B26A42,0_6px_0_rgba(0,0,0,0.1)]"
                                >
                                  <img
                                    src={winner.profileImage}
                                    alt={winner.playerName}
                                    className="absolute left-[5px] top-[2px] w-[55px] h-[55px] rounded-[6px] object-cover border-0"
                                  />
                                  <div className="flex flex-col flex-grow ml-[70px]">
                                    <span className="font-bungee text-white text-sm leading-tight truncate">
                                      {winner.playerName.toUpperCase()}
                                    </span>
                                    <div className="flex items-center gap-1">
                                      <img
                                        src="/images/gameon_chip.png"
                                        alt="coin"
                                        className="w-4 h-4 object-contain"
                                      />
                                      <span className="text-[#FFD85A] font-bungee text-base">
                                        {winner.wonAmount.toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* ▼ Scroll Down Button */}
                          {winners.length > 3 && (
                            <button
                              onClick={() =>
                                setWinnerPage((prev) =>
                                  prev + 1 >= Math.ceil(winners.length / 3)
                                    ? 0
                                    : prev + 1
                                )
                              }
                              className="mt-3 flex items-center justify-center transition-transform duration-300 hover:scale-110"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={3}
                                stroke="#341D1A"
                                className={`w-6 h-6 transition-all duration-500 hover:translate-y-1 ${winnerPage + 1 >= Math.ceil(winners.length / 3)
                                    ? 'rotate-180'
                                    : ''
                                  }`}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                          ) }
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 👇 If no active players, show Past Winners immediately after timer */}
                <div className="relative w-full flex justify-center mt-80 transition-all duration-500">
                  <div className="relative w-screen -mx-15 h-auto">
                    <img
                      src="/images/past_player_background.png"
                      alt="Past Winners Background"
                      className="absolute left-1/2 top-0 -translate-x-1/2 w-[100vw] md:w-[135vw] h-auto object-contain select-none pointer-events-none scale-100"
                      style={{ minHeight: "50px" }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center mt-[30px] px-4 z-10">
                      <div className="px-5 py-4 mb-6 -mt-[10px] transition-all duration-500">
                        <span
                          className="font-bungee text-white text-2xl md:text-2xl drop-shadow-[2px_2px_0_#4E2A0B]"
                          style={{ WebkitTextStroke: "3px #432311" }}
                        >
                          PAST PLAYERS
                        </span>
                      </div>
                      {winners.length === 0 ? (
                        <div className="text-center text-white/60 py-4">
                          No winners yet. Be the first!
                        </div>
                      ) : (
                        <>
                          {/* Container with limited height (3.5 cards visible) */}
                          <div className="w-full flex justify-center mt-[5px] transition-all duration-500">
                            <div
                              className="flex flex-col items-center gap-3 overflow-hidden transition-all duration-700 ease-in-out"
                              style={{
                                maxHeight: "285px", // roughly fits 3.5 cards
                              }}
                            >
                              <div
                                className="flex flex-col items-center gap-3 transition-transform duration-700 ease-in-out"
                                style={{
                                  transform: `translateY(-${
                                    winnerPage * 270
                                  }px)`, // slide up each "page"
                                }}
                              >
                                {winners.map((winner, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center w-[360px] h-[80px] bg-[#341D1A] rounded-xl px-3 gap-3 flex-shrink-0 border-2 border-[#B26A42] shadow-[inset_0_-9px_0_#B26A42,0_6px_0_rgba(0,0,0,0.1)]"
                                  >
                                    <img
                                      src={winner.profileImage}
                                      alt={winner.playerName}
                                      className="w-[45px] h-[45px] rounded-[6px] object-cover border-2 border-[#FFD85A]"
                                    />
                                    <div className="flex flex-col flex-grow">
                                      <span className="font-bungee text-white text-sm leading-tight truncate">
                                        {winner.playerName.toUpperCase()}
                                      </span>
                                      <div className="flex items-center gap-1">
                                        <img
                                          src="/images/gameon_chip.png"
                                          alt="coin"
                                          className="w-4 h-4 object-contain"
                                        />
                                        <span className="text-[#FFD85A] font-bungee text-base">
                                          {winner.wonAmount.toFixed(2)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* ▼ Scroll Down Button */}
                          {winners.length > 3 && (
                            <button
                              onClick={() =>
                                setWinnerPage((prev) =>
                                  prev + 1 >= Math.ceil(winners.length / 3)
                                    ? 0
                                    : prev + 1
                                )
                              }
                              className="mt-3 flex items-center justify-center transition-transform duration-300 hover:scale-110"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={3}
                                stroke="#341D1A"
                                className={`w-6 h-6 transition-all duration-500 hover:translate-y-1 ${winnerPage + 1 >= Math.ceil(winners.length / 3)
                                    ? 'rotate-180'
                                    : ''
                                  }`}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;
