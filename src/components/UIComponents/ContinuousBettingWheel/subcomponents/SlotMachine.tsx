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
  profileImage: string;
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
  userId: string | null;
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
  userId,
}) => {
  // Select current player (winner or fallback)
  const currentPlayer =
    players.find((p) => p.id === currentWinnerId) || players[0];

  // Track when spinning should start
  const [shouldSpin, setShouldSpin] = useState(false);
  const [previousTimeLeft, setPreviousTimeLeft] = useState(timeLeft);
  const [showAllWinners, setShowAllWinners] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const detectFullscreenLike = () => {
      const doc = document as Document & { webkitFullscreenElement?: Element | null };
      const isApiFullscreen = !!doc.fullscreenElement || !!doc.webkitFullscreenElement;

      const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const screenWidth = window.screen.availWidth || window.screen.width;
      const screenHeight = window.screen.availHeight || window.screen.height;

      const widthDelta = Math.abs(screenWidth - viewportWidth);
      const heightDelta = Math.abs(screenHeight - viewportHeight);
      const isViewportNearScreen = widthDelta <= 48 && heightDelta <= 140;

      const isDisplayModeFullscreen = window.matchMedia("(display-mode: fullscreen)").matches;

      setIsFullscreen(isApiFullscreen || isViewportNearScreen || isDisplayModeFullscreen);
    };

    detectFullscreenLike();

    document.addEventListener("fullscreenchange", detectFullscreenLike);
    document.addEventListener("webkitfullscreenchange", detectFullscreenLike as EventListener);
    window.addEventListener("resize", detectFullscreenLike);
    window.addEventListener("orientationchange", detectFullscreenLike);
    window.visualViewport?.addEventListener("resize", detectFullscreenLike);

    return () => {
      document.removeEventListener("fullscreenchange", detectFullscreenLike);
      document.removeEventListener("webkitfullscreenchange", detectFullscreenLike as EventListener);
      window.removeEventListener("resize", detectFullscreenLike);
      window.removeEventListener("orientationchange", detectFullscreenLike);
      window.visualViewport?.removeEventListener("resize", detectFullscreenLike);
    };
  }, []);

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
        return "Loading...";
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

  // Count-up for price pool (defined at component level to avoid Rules of Hooks issues)
  const animatedPot = useCountUp(gameState?.totalPot ?? 0, 1000);

  // Phase message
  const phaseMessage = (() => {
    if (!playerName)
      return "Welcome player! Enter your name to start playing.";

    const name = capitalizeFirstLetter(playerName);
    const phase = gameState?.phase;

    if (phase === "betting") {
      return hasJoined
        ? `Your wager has been placed, good luck! `
        : `Hey ${name}, Place your wager! `;
    }
    if (phase === "spinning") {
      return `The wheel is spinning... `;
    }
    if (phase === "finished") {
      const isWinner = gameState?.winner?.id === userId;
      const playerInRound = gameState?.players.some((p) => p.id === userId);
      if (isWinner) return `Congratulations ${name}, You won this round! `;
      else if (hasJoined || playerInRound) return `Better luck next time, ${name}! `;
      else return `Hey ${name}, join the next round! `;
    }
    if (phase === "round_ending") {
      return `Round ending — get ready for the next one! `;
    }
    return `Hey ${name}, Welcome to Monkey Banana `;
  })();

  // ───────────────────────────────────────────────────
  // Shared sub-blocks (reused in both mobile & desktop)
  // ───────────────────────────────────────────────────

  /** Price Pool + Timer card */
  const PricePoolBlock = ({ showTimer = true }: { showTimer?: boolean }) => (
    <div className="flex flex-col items-center gap-3">
      {/* Time Holder */}
      <div className="relative w-[260px] h-[155px] lg:w-[300px] lg:h-[178px]">
        <img
          src="/images/time_holder.png"
          alt="Time Holder"
          className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 translate-x-[35px] lg:translate-x-[40px]">
          <span className="font-bungee text-sm tracking-wide leading-none mb-1 mt-3 text-[#A35B1B]">
            PRICE POOL
          </span>
          <div className="flex items-center justify-center gap-2">
            <img
              src="https://storage.googleapis.com/image-bucket-new/Gameon/brown_goken.png"
              alt="coin"
              className="w-6 h-6 object-contain"
            />
            <span className="font-bungee text-2xl leading-none text-[#4E2A0B]">
              {animatedPot.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Timer — hidden in desktop (rendered separately below bet buttons) */}
      {showTimer && (
        <span className="font-bungee text-3xl text-[#FFFFFF] drop-shadow-md">
          {formatTime(timeLeft)}
        </span>
      )}
    </div>
  );

  /** Active Players panel */
  const ActivePlayersPanel = ({ compact = false }: { compact?: boolean }) => {
    if (!gameState || gameState.players.length === 0) return null;
    return (
      <div className="relative w-full">
        {/* Background stretches to fit content */}
        <img
          src="/images/active_players_background.png"
          alt="Active Players Background"
          className="absolute inset-0 w-full h-full object-fill select-none pointer-events-none"
        />
        {/* Content in normal flow — sets the height */}
        <div className="relative z-10 flex flex-col items-center pt-5 pb-5 px-4">
          <span
            className="font-bungee text-white text-xl drop-shadow-[2px_2px_0_#4E2A0B] mb-4"
            style={{ WebkitTextStroke: "2px #432311" }}
          >
            ACTIVE PLAYERS
          </span>

          {/* Scrollable cards window */}
          <div
            className="flex flex-col items-center gap-2 overflow-hidden w-full"
            style={{ maxHeight: compact ? "225px" : "280px" }}
          >
            <div
              className="flex flex-col items-center gap-2 w-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateY(-${activePage * (compact ? 225 : 280)}px)` }}
            >
              {gameState.players.map((player, index) => (
                <div
                  key={index}
                  className={`flex items-center w-full ${ compact ? "h-[65px]" : "h-[80px]"} bg-[#341D1A] rounded-xl px-3 gap-3 flex-shrink-0 border-2 border-[#B26A42] shadow-[inset_0_-9px_0_#B26A42,0_6px_0_rgba(0,0,0,0.1)]`}
                >
                  <img
                    src={player.profileImage}
                    alt={player.name}
                    className={`${compact ? "w-[38px] h-[38px]" : "w-[45px] h-[45px]"} rounded-[6px] object-cover border-2 border-[#FFD85A] flex-shrink-0`}
                  />
                  <div className="flex flex-col flex-grow min-w-0">
                    <span className={`font-bungee text-white ${compact ? "text-xs" : "text-sm"} leading-tight truncate`}>
                      {player.name.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-1">
                      <img src="/images/gameon_chip.png" alt="coin" className="w-4 h-4 object-contain flex-shrink-0" />
                      <span className={`text-[#FFD85A] font-bungee ${compact ? "text-sm" : "text-base"}`}>
                        {player.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {gameState.players.length > activePlayersPerPage && (
            <button
              onClick={() =>
                setActivePage((prev) =>
                  prev + 1 >= Math.ceil(gameState.players.length / activePlayersPerPage) ? 0 : prev + 1
                )
              }
              className="mt-3 flex items-center justify-center transition-transform duration-300 hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="#341D1A"
                className={`w-6 h-6 transition-all duration-500 hover:translate-y-1 ${
                  activePage + 1 >= Math.ceil(gameState.players.length / activePlayersPerPage) ? "rotate-180" : ""
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  };

  /** Past Winners panel */
  const PastWinnersPanel = ({ compact = false }: { compact?: boolean }) => (
    <div className="relative w-full">
      {/* Background stretches to fit content */}
      <img
        src="/images/past_player_background.png"
        alt="Past Winners Background"
        className="absolute inset-0 w-full h-full object-fill select-none pointer-events-none"
      />
      {/* Content in normal flow — sets the height */}
      <div className="relative z-10 flex flex-col items-center pt-5 pb-5 px-4">
        <span
          className="font-bungee text-white text-xl drop-shadow-[2px_2px_0_#4E2A0B] mb-4"
          style={{ WebkitTextStroke: "2px #432311" }}
        >
          PAST WINNERS
        </span>

        {winners.length === 0 ? (
          <div className="text-center text-white/60 py-4 text-sm">
            No winners yet. Be the first!
          </div>
        ) : (
          <>
            {/* Scrollable cards window */}
            <div
              className="flex flex-col items-center gap-2 overflow-hidden w-full"
              style={{ maxHeight: compact ? "225px" : "285px" }}
            >
              <div
                className="flex flex-col items-center gap-2 w-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateY(-${winnerPage * (compact ? 225 : 270)}px)` }}
              >
                {winners.map((winner, index) => (
                  <div
                    key={index}
                    className={`flex items-center w-full ${compact ? "h-[65px]" : "h-[80px]"} bg-[#341D1A] rounded-xl px-3 gap-3 flex-shrink-0 border-2 border-[#B26A42] shadow-[inset_0_-9px_0_#B26A42,0_6px_0_rgba(0,0,0,0.1)]`}
                  >
                    <img
                      src={winner.profileImage}
                      alt={winner.playerName}
                      className={`${compact ? "w-[38px] h-[38px]" : "w-[45px] h-[45px]"} rounded-[6px] object-cover border-2 border-[#FFD85A] flex-shrink-0`}
                    />
                    <div className="flex flex-col flex-grow min-w-0">
                      <span className={`font-bungee text-white ${compact ? "text-xs" : "text-sm"} leading-tight truncate`}>
                        {winner.playerName.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1">
                        <img src="/images/gameon_chip.png" alt="coin" className="w-4 h-4 object-contain flex-shrink-0" />
                        <span className={`text-[#FFD85A] font-bungee ${compact ? "text-sm" : "text-base"}`}>
                          {winner.wonAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {winners.length > 3 && (
              <button
                onClick={() =>
                  setWinnerPage((prev) =>
                    prev + 1 >= Math.ceil(winners.length / 3) ? 0 : prev + 1
                  )
                }
                className="mt-3 flex items-center justify-center transition-transform duration-300 hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="#341D1A"
                  className={`w-6 h-6 transition-all duration-500 hover:translate-y-1 ${
                    winnerPage + 1 >= Math.ceil(winners.length / 3) ? "rotate-180" : ""
                  }`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );

  // ───────────────────────────────────────────────────
  // DESKTOP LAYOUT (lg+) — one-page, no scroll
  // ───────────────────────────────────────────────────
  const DesktopLayout = () => (
    <div className="hidden lg:flex w-full h-screen overflow-hidden relative items-center px-8 gap-4">
      {/* ── Left Panel: Active Players ── */}
      <div className="w-[260px] shrink-0 flex flex-col justify-center items-center py-6">
        {gameState && gameState.players.length > 0 ? (
          <div className="w-full">
            <ActivePlayersPanel compact={true} />
          </div>
        ) : (
          <div className="relative w-full" style={{ height: "280px" }}>
            <img
              src="/images/active_players_background.png"
              alt="Active Players Background"
              className="absolute inset-0 w-full h-full object-fill select-none pointer-events-none"
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center pt-5 pb-5 px-4">
              <span
                className="font-bungee text-white text-xl drop-shadow-[2px_2px_0_#4E2A0B] mb-4"
                style={{ WebkitTextStroke: "2px #432311" }}
              >
                ACTIVE PLAYERS
              </span>
              <div className="flex flex-col items-center justify-center flex-1 gap-3">
                <span className="text-4xl">🐒</span>
                <p className="text-[#4E2A0B] font-bungee text-sm text-center opacity-70">
                  Waiting for<br />players...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Center: Header + Slot Machine ── */}
      <div className="relative flex-1 flex flex-col items-center overflow-visible px-2" style={{ paddingBottom: "6%", paddingTop: "4%" }}>

        {/* TOP + MIDDLE + Buttons grouped together */}
        <div className="flex flex-col items-center gap-3">

          {/* TOP GROUP: Title + Balance */}
          <div className="relative flex flex-col items-center gap-1">
            {/* Title row — monkey hangs from the top of the M */}
            <div style={{ position: 'relative', display: 'inline-block', paddingTop: '32px' }}>
              <img
                src="/images/monkey_eyes.gif"
                alt="Monkey Eyes"
                className="swing w-[36px] h-auto pointer-events-none z-10"
                style={{
                  position: 'absolute',
                  left: '-20px',
                }}
              />
              <h1 className="font-bungee text-[#B26A42] text-4xl tracking-tight leading-[0.9] text-center drop-shadow-[2px_2px_2px_#fff]" style={{ display: 'inline-block' }}>
                MONKEY<br />BANANA
              </h1>
            </div>
            {/* Balance row */}
            <div className="flex items-center justify-center gap-2 mt-1">
              <span
                className="text-[18px] font-bungee text-[#4E2A0B] leading-none drop-shadow-[2px_2px_0_#fff]"
              >
                BALANCE:
              </span>
              <img
                src="/images/gameon_chip.png"
                alt="coin"
                className="w-5 h-5 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
              />
              <span
                className="text-[18px] font-bungee text-[#4E2A0B] leading-none drop-shadow-[2px_2px_0_#fff]"
              >
                {walletBalance?.toFixed(2) ?? "0.00"}
              </span>
            </div>
          </div>

          {/* MIDDLE GROUP: Slot Machine */}
          <div className="flex flex-col items-center">
            <div className="relative flex justify-center items-center">
              <img
                src="/images/slot_machine.gif"
                alt="Slot Machine"
                className="drop-shadow-lg select-none pointer-events-none h-auto z-10"
                style={{ maxHeight: "240px", width: "auto" }}
              />
              <SlotMachineReel
                players={players}
                isSpinning={shouldSpin || isSpinning}
                winnerId={currentWinnerId}
              />
            </div>
            {/* Scaled PricePoolBlock — timer hidden here, shown at bottom */}
            <div
              style={{
                transform: "scale(0.65)",
                transformOrigin: "center top",
                marginTop: "-14px",
                marginBottom: isFullscreen ? "-8px" : "-40px",
              }}
            >
              <PricePoolBlock showTimer={false} />
            </div>
          </div>

          {/* Phase message + Bet Buttons — right below price pool */}
          <div
            className={`flex flex-col items-center gap-2 ${isFullscreen ? "" : "mt-6"}`}
            style={
              isFullscreen
                ? {
                    position: "absolute",
                    left: "50%",
                    bottom: "58px",
                    transform: "translateX(-50%)",
                    zIndex: 30,
                  }
                : undefined
            }
          >
            <h2
              key={gameState?.phase + (hasJoined ? "-joined" : "")}
              className="text-base font-bungee text-center transition-opacity duration-700 ease-in-out opacity-100 text-[#FFF5C3] drop-shadow-[0_3px_8px_rgba(0,0,0,0.85)]"
              style={{ WebkitTextStroke: "1px #2F1B0E" }}
            >
              {phaseMessage}
            </h2>
            {gameState?.phase === "betting" && !hasJoined && playerName && (
              <div className="flex justify-center items-center">
                <button
                  onClick={() => onQuickBet(1)}
                  className="relative w-[160px] h-[48px] squishy z-10"
                >
                  <img
                    src="/images/dark_brown_button.png"
                    alt="Dark Brown Button"
                    className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                  />
                  <span className="relative z-10 flex items-center justify-center gap-1 h-full text-[#FFFFFF] font-bungee text-xl">
                    <img src="/images/gameon_chip.png" alt="coin" className="w-5 h-5 object-contain" />
                    + 1
                  </span>
                </button>
                <button
                  onClick={onAddBet}
                  className="relative w-[160px] h-[48px] squishy -ml-[36px] z-0"
                >
                  <img
                    src="/images/light_brown_button.png"
                    alt="Light Brown Button"
                    className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                  />
                  <span className="relative z-10 flex items-center justify-center h-full text-[#FFFFFF] font-bungee text-xl">
                    ADD
                  </span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* TIMER — mt-auto pins it to the very bottom of the center column */}
        <div
          className="mt-auto flex justify-center"
          style={{
            ...(isFullscreen
              ? {
                  position: "absolute",
                  left: "50%",
                  bottom: "6px",
                  transform: "translateX(-50%)",
                  zIndex: 30,
                }
              : {
                  paddingTop: "60px",
                  paddingBottom: "0px",
                  transform: "translateY(0px)",
                }),
          }}
        >
          <span className="font-bungee text-3xl text-[#FFFFFF] drop-shadow-md">
            {formatTime(timeLeft)}
          </span>
        </div>

      </div>

      {/* ── Right Panel: Past Winners ── */}
      <div className="w-[260px] shrink-0 flex flex-col justify-center items-center py-6">
        <div className="w-full">
          <PastWinnersPanel compact={true} />
        </div>
      </div>
    </div>
  );


  // ───────────────────────────────────────────────────
  // MOBILE LAYOUT (< lg) — original stacked layout
  // ───────────────────────────────────────────────────
  const MobileLayout = () => (
    <div className="lg:hidden relative w-full max-w-3xl mx-auto p-4">
      <div className="relative flex flex-col items-center">
        {/* Wallet Balance */}
        <div className="flex items-center justify-center gap-2 mb-6 mt-2">
          <div className="mt-[0px]">
            <img
              src="/images/gameon_chip.png"
              alt="coin"
              className="w-8 h-8 md:w-9 md:h-9 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            />
          </div>
          <span
            className="text-[30px] font-bungee text-white leading-none drop-shadow-[4px_4px_0_#4E2A0B] mt-[0px]"
            style={{ WebkitTextStroke: "2px #432311" }}
          >
            {walletBalance?.toFixed(2) ?? "0.00"}
          </span>
        </div>

        {/* Slot machine wrapper */}
        <div className="relative flex justify-center items-center mb-1">
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

        {/* Phase message */}
        <h2
          key={gameState?.phase + (hasJoined ? "-joined" : "")}
          className="text-lg sm:text-xl md:text-2xl font-semibold text-white mt-6 text-center transition-opacity duration-700 ease-in-out opacity-100"
        >
          {phaseMessage}
        </h2>

        {/* Bet Buttons */}
        {gameState?.phase === "betting" && !hasJoined && playerName && (
          <div className="flex justify-center items-center mt-6">
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
                <img src="/images/gameon_chip.png" alt="coin" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                + 1
              </span>
            </button>
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

        {/* Time Holder */}
        <div className="flex justify-center items-center">
          <div className="relative w-[320px] h-[190px]">
            <img
              src="/images/time_holder.png"
              alt="Time Holder"
              className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 translate-x-[40px]">
              <span className="font-bungee text-sm tracking-wide leading-none mb-1 mt-3 text-[#A35B1B]">
                PRICE POOL
              </span>
              <div className="flex items-center justify-center gap-2">
                <img
                  src="https://storage.googleapis.com/image-bucket-new/Gameon/brown_goken.png"
                  alt="coin"
                  className="w-8 h-8 md:w-7 md:h-7 object-contain"
                />
                <span className="font-bungee text-3xl leading-none text-[#4E2A0B]">
                  {animatedPot.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Active Players (mobile) */}
            {gameState && gameState.players.length > 0 && (
              <div className="relative w-full flex justify-center mt-60 mb-48 bg-[#ffffff]">
                <div className="relative w-screen -mx-15 h-auto">
                  <img
                    src="/images/active_players_background.png"
                    alt="Active Players Background"
                    className="absolute left-1/2 top-0 -translate-x-1/2 w-[100vw] md:w-[135vw] h-auto object-contain select-none pointer-events-none scale-100"
                    style={{ minHeight: "520px" }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center mt-[30px] px-4 z-10">
                    <div className="px-5 py-7 transition-all duration-500">
                      <span
                        className="font-bungee text-white text-2xl md:text-2xl drop-shadow-[2px_2px_0_#4E2A0B]"
                        style={{ WebkitTextStroke: "3px #432311" }}
                      >
                        ACTIVE PLAYERS
                      </span>
                    </div>
                    <div className="w-full relative justify-center mt-[20px] transition-all duration-500">
                      <div
                        className="flex flex-col items-center gap-3 overflow-hidden transition-all duration-700 ease-in-out"
                        style={{ maxHeight: "270px" }}
                      >
                        <div
                          className="flex flex-col items-center gap-3 transition-transform duration-700 ease-in-out"
                          style={{ transform: `translateY(-${activePage * 270}px)` }}
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
                                  <img src="/images/gameon_chip.png" alt="coin" className="w-4 h-4 object-contain" />
                                  <span className="text-[#FFD85A] font-bungee text-base">
                                    {player.amount.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {gameState.players.length > activePlayersPerPage && (
                        <button
                          onClick={() =>
                            setActivePage((prev) =>
                              prev + 1 >= Math.ceil(gameState.players.length / activePlayersPerPage)
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
                            className={`w-6 h-6 transition-all duration-500 hover:translate-y-1 ${
                              activePage + 1 >= Math.ceil(gameState.players.length / activePlayersPerPage)
                                ? "rotate-180"
                                : ""
                            }`}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Past Winners (mobile) */}
            <div
              className={`relative w-full flex justify-center transition-all duration-500 ${
                gameState && gameState.players.length > 0 ? "mt-[520px]" : "mt-70"
              }`}
            >
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
                      PAST WINNERS
                    </span>
                  </div>
                  {winners.length === 0 ? (
                    <div className="text-center text-white/60 py-4">
                      No winners yet. Be the first!
                    </div>
                  ) : (
                    <>
                      <div className="w-full flex justify-center mt-[5px] transition-all duration-500">
                        <div
                          className="flex flex-col items-center gap-3 overflow-hidden transition-all duration-700 ease-in-out"
                          style={{ maxHeight: "285px" }}
                        >
                          <div
                            className="flex flex-col items-center gap-3 transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateY(-${winnerPage * 270}px)` }}
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
                                    <img src="/images/gameon_chip.png" alt="coin" className="w-4 h-4 object-contain" />
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
                      {winners.length > 3 && (
                        <button
                          onClick={() =>
                            setWinnerPage((prev) =>
                              prev + 1 >= Math.ceil(winners.length / 3) ? 0 : prev + 1
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
                            className={`w-6 h-6 transition-all duration-500 hover:translate-y-1 ${
                              winnerPage + 1 >= Math.ceil(winners.length / 3) ? "rotate-180" : ""
                            }`}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <DesktopLayout />
      <MobileLayout />
    </>
  );
};

export default SlotMachine;
