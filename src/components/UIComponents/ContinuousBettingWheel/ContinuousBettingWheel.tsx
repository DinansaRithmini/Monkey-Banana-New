"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
//import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";
import { useContinuousGame } from "../../hooks/useContinuousGame";

import SlotMachine from "./subcomponents/SlotMachine";
//import ResultPopup from "./subcomponents/ResultPopup";
import InsufficientPopup from "./subcomponents/InsufficientPopup";
import BetConfirmationPopup from "./subcomponents/BetConfirmationPopup";
import { Button } from "@/components/ui/button";

import WinPopup from "./subcomponents/winpopup";
import LosePopup from "./subcomponents/losepopup";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

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

  const { width, height } = useWindowSize();

  const coinImgPath = "/images/dark_brown_button.png";
  const quickBetAmounts = [1, 5];

  // Fetch user wallet balance
  const fetchWalletBalance = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/getUserWalletBalance`,
        { params: { userUuid: userId } }
      );
      if (response.data.success) setWalletBalance(response.data.balance);
    } catch (err) {
      console.error("Failed to fetch wallet balance", err);
    }
  };

  useEffect(() => {
    fetchWalletBalance();
  }, [userId, gameState]);

  const handleQuickBet = (amount: number) => {
    if (!playerName?.trim()) return alert("Please enter your name first");
    if ((walletBalance ?? 0) < amount) return setShowInsufficient(true);
    setPendingBet(amount);
    setShowBetPopup(true);
  };

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
        }
      );

      if (!releaseResponse.data?.status) {
        alert("Failed to place bet.");
        return;
      }

      const result = await joinGame((playerName ?? "").trim(), pendingBet);
      if (result.success) setHasJoined(true);
    } catch (err) {
      alert("Error joining game.");
    } finally {
      setPendingBet(null);
    }
  };

  useEffect(() => {
    if (gameState?.phase === "finished" && userId) {
      const isUserWinner = gameState.winner?.id === userId;
      setIsWinner(isUserWinner);
      setShowResult(true);
      setTimeout(() => setShowResult(false), 6000);
    }
  }, [gameState?.phase]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-IN", { minimumFractionDigits: 0 }).format(num);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 flex items-center justify-center">
        <p className="text-[#4E2A0B] font-bold text-xl">Loading game...</p>
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
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed overflow-y-auto transition-opacity duration-700"
      style={{
        backgroundImage: "url('/images/background_image.png')",
        backgroundColor: "#FFD85A",
      }}
    >
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
        isWinner={false}
        amount={34}
        onClose={() => setShowWinPopup(false)}
      />
      <LosePopup
        show={showLosePopup}
        isLoser={false}
        amount={23}
        onClose={() => setShowLosePopup(false)}
      />
      {/* Header Section */}
      <div className="relative w-full flex justify-center items-start pt-8 pb-2">
        <div className="relative flex flex-col items-center text-center">
          {/* Monkey Eyes GIF */}
          <img
            src="/images/monkey_eyes.gif"
            alt="Monkey Eyes"
            className="absolute w-[115px] top-[-30px] md:top-[-30px] left-[-10%] -translate-x-1/2 rotate-[8deg] z-10"
          />

          {/* Text */}
          <span className="relative font-bungee text-[#B26A42] text-[36px] md:text-[80px] leading-[0.9] tracking-tight">
            MONKEY
          </span>
          <span className="relative font-bungee text-[#B26A42] text-[36px] md:text-[80px] leading-[0.9] tracking-tight mt-[-4px]">
            BANANA
          </span>
        </div>
      </div>
      {/* Temporary Button to Test the Insufficient Balance Popup */}
      <button
        onClick={handleShowPopup}
        className="absolute top-4 right-4 bg-[#F7A531] text-white font-semibold text-lg py-2 px-4 rounded-lg shadow-md hover:bg-[#FFD85A]"
      >
        Test Popup
      </button>
      //
      <button
        onClick={() => {
          setShowWinPopup(true); // Show Win Popup
          setShowLosePopup(false); // Hide Lose Popup
        }}
        className="bg-[#B26A42] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#D38B5F] transition-all"
      >
        Test Win Popup
      </button>
      <button
        onClick={() => {
          setShowWinPopup(false); // Hide Win Popup
          setShowLosePopup(true); // Show Lose Popup
        }}
        className="bg-[#FF0000] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#D38B5F] transition-all ml-4"
      >
        Test Lose Popup
      </button>
      {/* Insufficient Balance Popup */}
      <InsufficientPopup show={showPopup} onClose={handleClosePopup} />
      {/* Slot Machine */}
      <div className="mt-6">
        <SlotMachine
          players={gameState?.players || []}
          currentWinnerId={gameState?.winner?.id}
          isSpinning={gameState?.phase === "spinning"}
        />
      </div>
    </div>
  );
};

export default ContinuousBettingWheel;
