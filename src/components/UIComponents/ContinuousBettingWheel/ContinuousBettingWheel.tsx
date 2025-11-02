"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContinuousGame } from "../../hooks/useContinuousGame";

import SlotMachine from "./subcomponents/SlotMachine";
import InsufficientPopup from "./subcomponents/InsufficientPopup";
import BetConfirmationPopup from "./subcomponents/BetConfirmationPopup";
import JackpotPopup from "./subcomponents/jackpot";
import WinPopup from "./subcomponents/winpopup";
import LosePopup from "./subcomponents/losepopup";

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
  const [pendingBet, setPendingBet] = useState<number | null>(null);
  const [showBetPopup, setShowBetPopup] = useState(false);
  const [showInsufficient, setShowInsufficient] = useState(false);
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [showLosePopup, setShowLosePopup] = useState(false);
  const [showJackpotPopup, setShowJackpotPopup] = useState(false);

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
  const handleAddBet = () => {
    if (!playerName?.trim()) return alert("Enter your name first");
    if ((walletBalance ?? 0) < 1) return setShowInsufficient(true);
    setPendingBet(1);
    setShowBetPopup(true);
  };

  // Confirm Bet
  const confirmBet = async () => {
    if (!pendingBet) return;
    setShowBetPopup(false);
    try {
      await joinGame(playerName ?? "Player", pendingBet);
      await fetchWalletBalance();
    } catch {
      alert("Error joining game.");
    } finally {
      setPendingBet(null);
    }
  };

  // Timer format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

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

  return (
    <div
      className="relative w-full min-h-[1949px] overflow-y-auto bg-no-repeat bg-top bg-cover"
      style={{
        backgroundImage: "url('/images/background_image.png')",
        backgroundSize: "cover", // fills entire width & height
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* ===== Scrollable Content ===== */}
      <div className="flex flex-col items-center justify-start min-h-[1949px]">
        {/* Header */}
        <div className="relative w-full flex flex-col items-center justify-center pt-12 pb-4">
          {/* Monkey Head Image */}
          <img
            src="/images/monkey_eyes.gif"
            alt="Monkey Eyes"
            className="swing w-[120px] h-auto md:w-[140px] absolute top-[20px] left-1/4 -translate-x-[50px] z-10"
          />

          {/* Text */}
          <h1 className="font-bungee text-[#B26A42] text-4xl md:text-5xl tracking-tight leading-[0.8] text-center drop-shadow-[2px_2px_2px_#fff] mt-[10px]">
            MONKEY
            <br />
            BANANA
          </h1>
        </div>

        {/* Slot Machine */}
        <div className="mt-12">
          <SlotMachine
            players={gameState?.players || []}
            currentWinnerId={gameState?.winner?.id}
            isSpinning={gameState?.phase === "spinning"}
            walletBalance={walletBalance}
            onAddBet={handleAddBet}
            onQuickBet={() => {}}
            timeLeft={gameState?.timeLeft ?? 0}
            gameState={gameState}
          />
        </div>

        {/* Timer */}
        <div className="mt-10">
          <span className="font-bungee text-3xl text-[#FFFFFF] drop-shadow-md">
            {formatTime(gameState?.timeLeft ?? 0)}
          </span>
        </div>

        {/* Bottom Spacer (reaches end of image height) */}
        <div className="h-[400px]" />
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
    </div>
  );
};

export default ContinuousBettingWheel;
