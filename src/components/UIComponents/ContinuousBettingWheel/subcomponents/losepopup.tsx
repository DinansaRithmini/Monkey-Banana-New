"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface LosePageProps {
  amount: number;
  show: boolean;
  onClose: () => void;
}

const LosePage: React.FC<LosePageProps> = ({
  amount,
  show,
  onClose,
}) => {
  const router = useRouter();

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
      onClick={onClose}
    >
      {/* 🔹 Black blurred background overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[6px] z-0"></div>

      {/* 🔹 Pure CSS glow background (no image) */}
      <div
        className="absolute rounded-full blur-[120px] opacity-70 z-10"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, #FFD85A 0%, #FFBB13 40%, transparent 70%)",
          filter: "blur(100px)",
        }}
      ></div>

      {/* 🔹 Lose background (above the glow) */}
      <img
        src="/images/Lose_background.png"
        alt="Lose Background"
        className="absolute w-[250px] h-[250px] object-contain pointer-events-none z-20"
        style={{
          transform: "translateY(40px)",
        }}
      />

      {/* 🔹 Popup content */}
      <div
        className="relative w-[420px] h-[400px] flex flex-col items-center justify-center text-center z-30 animate-popupIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-6xl font-bungee leading-tight mb-3 mt-[60px]">
          <span
            style={{
              color: "#FFC434",
              textShadow: `
                3px 3px 8px #714023,
                -3px -3px 8px #714023,
                -3px 3px 8px #714023,
                3px -3px 8px #714023,
                0 0 8px #714023,
                0 0 20px #FFC434,
                0 0 40px #FFC434
              `,
            }}
          >
            YOU
          </span>{" "}
          <span
            style={{
              color: "#A96229",
              textShadow: `
                3px 3px 8px #714023,
                -3px -3px 8px #714023,
                -3px 3px 8px #714023,
                3px -3px 8px #714023,
                0 0 8px #714023,
                0 0 20px #FFC434,
                0 0 40px #FFC434
              `,
            }}
          >
            LOSE!
          </span>
        </h2>
      </div>
    </div>
  );
};

export default LosePage;
