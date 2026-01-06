"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useWindowSize } from "@uidotdev/usehooks";
import { useContinuousGame } from "../../hooks/useContinuousGame";

import SlotMachine from "./subcomponents/SlotMachine";
import InsufficientPopup from "./subcomponents/InsufficientPopup";
import BetConfirmationPopup from "./subcomponents/BetConfirmationPopup";
import JackpotPopup from "./subcomponents/jackpot";
import WinPopup from "./subcomponents/winpopup";
import LosePopup from "./subcomponents/losepopup";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ContinuousBettingWheel: React.FC = () => {
  const {
    gameState,
    loading,
    error,
    joinGame,
    userId,
    playerName,
    gameSessionUuid,
  } = useContinuousGame();

  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [hasJoined, setHasJoined] = useState(false);
  const [pendingBet, setPendingBet] = useState<number | null>(null);
  const [showBetPopup, setShowBetPopup] = useState(false);
  const [showInsufficient, setShowInsufficient] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [showLosePopup, setShowLosePopup] = useState(false);
  const [showJackpotPopup, setShowJackpotPopup] = useState(false);
  const [previousPhase, setPreviousPhase] = useState<string | null>(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [showInfoPopup, setShowInfoPopup] = useState(false);


  useEffect(() => {
    const audio = new Audio("/images/background_sound.mp3");

    audio.loop = true;
    audio.volume = 0.4;

    // Try to autoplay — browsers may block until user interacts
    const playAudio = () => {
      audio.play().catch(() => {
        console.log("Autoplay blocked until user interacts.");
      });
    };

    // Start on first user interaction
    document.addEventListener("click", playAudio, { once: true });
    document.addEventListener("keydown", playAudio, { once: true });

    // Clean up on unmount
    return () => {
      audio.pause();
      document.removeEventListener("click", playAudio);
      document.removeEventListener("keydown", playAudio);
    };
  }, []);

  // Fetch wallet balance
  const fetchWalletBalance = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/getUserWalletBalance`,
        { params: { userUuid: userId } }
      );
      if (res.data.success) setWalletBalance(res.data.balance);
    } catch (e) {
      console.error("Failed to fetch wallet balance:", e);
    }
  };

  useEffect(() => {
    fetchWalletBalance();
  }, [userId]);

  // Handle Add Bet
  const handleQuickBet = (amount: number) => {
    if (!playerName?.trim()) return alert("Please enter your name first");
    if ((walletBalance ?? 0) < amount) return setShowInsufficient(true);
    setPendingBet(amount);
    setShowBetPopup(true);
  };

  const handleAddBet = () => {
    // Default bet amount to 1, or you can prompt user for custom amount
    const defaultBetAmount = 1;

    if (!playerName?.trim()) {
      alert("Please enter your name first");
      return;
    }

    if ((walletBalance ?? 0) < defaultBetAmount) {
      setShowInsufficient(true);
      return;
    }

    setPendingBet(defaultBetAmount);
    setShowBetPopup(true);
  };

  // Confirm Bet
  const confirmBet = async () => {
    if (!pendingBet) return;
    setShowBetPopup(false);

    try {
      const releaseResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/createUserGame`,
        {
          userUuid: userId,
          gameSessionUuid,
          sessionUuid: gameState?.roundNumber,
          amount: pendingBet,
          name: playerName,
        }
      );

      if (!releaseResponse.data?.status) {
        alert("Failed to place bet.");
        return;
      }

      const result = await joinGame((playerName ?? "").trim(), pendingBet);
      if (result.success) {
        setHasJoined(true);
        // Refresh wallet balance after successful bet
        await fetchWalletBalance();
      }
    } catch (err) {
      alert("Error joining game.");
    } finally {
      setPendingBet(null);
    }
  };

  useEffect(() => {
    if (gameState && gameState.roundNumber !== currentRound) {
      setHasJoined(false);
      setCurrentRound(gameState.roundNumber);

      // Check if user already joined this round
      if (userId && gameState.players.some((p) => p.id === userId)) {
        setHasJoined(true);
      }
    }
  }, [gameState, currentRound, userId]);

  useEffect(() => {
    // Detect phase transition from spinning to finished
    if (
      previousPhase === "spinning" &&
      gameState?.phase === "finished" &&
      userId
    ) {
      const isUserWinner = gameState.winner?.id === userId;
      const userParticipated = gameState.players.some((p) => p.id === userId);

      setIsWinner(isUserWinner);
      setShowResult(true);

      // Wait 2 seconds after spin stops to let user see who won
      setTimeout(() => {
        // Show appropriate popup based on user's status
        if (isUserWinner) {
          // User won - show jackpot popup only
          setShowJackpotPopup(true);
          setShowLosePopup(false);

          // Auto-close jackpot popup after 3 seconds
          setTimeout(() => {
            setShowJackpotPopup(false);
          }, 3000);
        } else if (userParticipated) {
          // User participated but didn't win - show lose popup only
          setShowJackpotPopup(false);
          setShowLosePopup(true);

          // Auto-close lose popup after 3 seconds
          setTimeout(() => {
            setShowLosePopup(false);
          }, 3000);
        } else {
          // User didn't participate - don't show any popup
          setShowJackpotPopup(false);
          setShowLosePopup(false);
        }
      }, 2000); // 2 second delay to show the winner

      // Auto-close result display after 8 seconds (2s delay + 3s popup + 3s buffer)
      setTimeout(() => {
        setShowResult(false);
      }, 8000);
    }

    // Update previous phase for next comparison
    if (gameState?.phase) {
      setPreviousPhase(gameState.phase);
    }
  }, [gameState?.phase, previousPhase, userId]);

  // Timer format
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-IN", { minimumFractionDigits: 0 }).format(num);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-200">
        <p className="font-bungee text-[#4E2A0B] text-xl">Loading game...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-100">
        <p className="text-red-600 font-bungee">{error}</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-100">
        <Card className="bg-[#FFF5C3] border-[#F7A531]">
          <CardContent className="text-center">
            <p className="text-red-500 font-bold">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-2">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );

  // Show the Result Popup (if winner)
  if (showResult && isWinner) {
    setTimeout(() => setShowResult(false), 6000); // Auto-close after 6 seconds
  }

  // Function to show the popup
  const handleShowPopup = () => {
    setShowPopup(true);
  };

  // Function to hide the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div
      className="relative w-full min-h-[1500px]"
      style={{
        backgroundColor: "#F4E3C2", // 👈 fallback color
        backgroundImage: "url('/images/background_image.png')",
        backgroundSize: "100% auto",
        backgroundPosition: "top center",
        backgroundRepeat: "repeat-y",
      }}
    >
      {/* Info Button - Top Right */}
      <button
        onClick={() => setShowInfoPopup(true)}
        className="fixed top-4 right-4 z-50 bg-[#4E2A0B] hover:bg-[#6B3A1A] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="How to play"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {/* ===== Scrollable Content ===== */}
      <div className="flex flex-col items-center justify-start pb-20">
        {/* Header */}
        <div className="relative w-full flex flex-col items-center justify-center pt-12 pb-4">
          <img
            src="/images/monkey_eyes.gif"
            alt="Monkey Eyes"
            className="swing w-[120px] h-auto md:w-[140px] absolute top-[20px] left-1/4 -translate-x-[50px] z-10"
          />
          <h1 className="font-bungee text-[#B26A42] text-4xl md:text-5xl tracking-tight leading-[0.8] text-center drop-shadow-[2px_2px_2px_#fff] mt-[10px]">
            MONKEY
            <br />
            BANANA
          </h1>
        </div>

        {/* Slot Machine */}
        <div className="mt-8">
          <SlotMachine
            players={gameState?.players || []}
            currentWinnerId={gameState?.winner?.id}
            isSpinning={gameState?.phase === "spinning"}
            walletBalance={walletBalance}
            onAddBet={handleAddBet}
            onQuickBet={handleQuickBet}
            timeLeft={gameState?.timeLeft ?? 0}
            gameState={gameState}
            playerName={playerName}
            hasJoined={hasJoined}
            userId={userId}
          />
        </div>

        {/* Timer */}
        <div>
          <span className="font-bungee text-3xl text-[#FFFFFF] drop-shadow-md">
            {formatTime(gameState?.timeLeft ?? 0)}
          </span>
        </div>
      </div>

      {/* ===== Fixed Popups ===== */}
      <InsufficientPopup
        show={showInsufficient}
        onClose={() => setShowInsufficient(false)}
      />
      <BetConfirmationPopup
        show={showBetPopup}
        amount={pendingBet ?? 0}
        onConfirm={confirmBet}
        onCancel={() => setShowBetPopup(false)}
        isPlacing={false}
      />
      <WinPopup
        show={showWinPopup}
        amount={gameState?.totalPot ?? 0}
        onClose={() => setShowWinPopup(false)}
      />
      <LosePopup
        show={showLosePopup}
        amount={gameState?.players.find((p) => p.id === userId)?.amount ?? 0}
        onClose={() => setShowLosePopup(false)}
      />
      <JackpotPopup
        show={showJackpotPopup}
        amount={gameState?.totalPot ?? 0}
        onClose={() => setShowJackpotPopup(false)}
      />

      {/* Game Instructions Popup */}
      {showInfoPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#FFF5C3] border-4 border-[#4E2A0B] rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bungee text-2xl text-[#4E2A0B]">How to Play</h2>
              <button
                onClick={() => setShowInfoPopup(false)}
                className="text-[#4E2A0B] hover:text-[#6B3A1A] text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="space-y-4 text-[#4E2A0B]">
              <div>
                <h3 className="font-bold text-lg mb-2">🎰 Game Overview</h3>
                <p className="text-sm leading-relaxed">
                  Monkey Banana is an exciting game where players compete for the jackpot! Place your wager and watch as the slot machine spins to determine the winner.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2">💰 How to Play</h3>
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  <li>Check your wallet balance at the top of the slot machine</li>
                  <li>Click "Add" to confirm your wager</li>
                  <li>Wait for other players to join the round</li>
                  <li>Watch the slot machine spin when the timer runs out</li>
                  <li>If you win, you take home the entire pot!</li>
                </ol>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">🏆 Winning</h3>
                <p className="text-sm leading-relaxed">
                  The slot machine randomly selects one player as the winner. The total pot is displayed and updates as more players join.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">⏱️ Timer</h3>
                <p className="text-sm leading-relaxed">
                  Each round has a countdown timer. Place your wagers before time runs out! A new round starts automatically after each spin.
                </p>
              </div>

              <div className="bg-[#F7A531]/20 p-3 rounded-lg">
                <p className="text-xs font-semibold">
                  💡 Tip: Keep an eye on the total pot and number of players to make strategic wagering decisions!
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowInfoPopup(false)}
              className="mt-6 w-full bg-[#4E2A0B] hover:bg-[#6B3A1A] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </div>
  );

};

export default ContinuousBettingWheel;
