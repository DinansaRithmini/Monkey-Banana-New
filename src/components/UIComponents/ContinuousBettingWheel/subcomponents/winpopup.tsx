"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface WinPageProps {
  amount: number;
  show: boolean;
  isWinner: boolean;
  onClose: () => void;

}

const WinPage: React.FC<WinPageProps> = ({ amount,show,isWinner, onClose }) => {
  const router = useRouter();

  if (!show) return null;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/win_background.png')", // Win background image
        backgroundSize: "cover",
      }}
    >
      <div className="relative text-center z-10">
        {/* Win Message */}
        <h2 className="text-[#FFDD00] font-bungee text-5xl font-bold mb-4">
          YOU WIN!
        </h2>

        {/* Amount Won */}
        <div className="text-[#FFDD00] font-bungee text-3xl mb-4">
          <span className="font-bold">{amount}</span> Coins
        </div>

        {/* Celebratory Animation or Images */}
        <img
          src="/images/celebration.png"
          alt="Celebration"
          className="mx-auto mb-6 w-[150px] h-[150px]"
        />

        {/* Button to go back to Home or Any Action */}
        <Button
          onClick={onClose}
          className="bg-[#FFDD00] text-white font-bungee text-lg py-2 px-6 rounded-lg hover:bg-yellow-300 transition-all"
        >
          GO HOME
        </Button>
      </div>
    </div>
  );
};

export default WinPage;
