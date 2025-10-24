"use client";
import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className = "",
  variant = "primary",
  ...props
}) => {
  const base =
    "font-extrabold rounded-full px-5 py-2 text-base transition-all active:scale-95 focus:outline-none";

  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-b from-[#FFD85A] to-[#F7A531] text-[#4E2A0B] shadow-[0_3px_0_rgba(0,0,0,0.3)] hover:brightness-105",
    secondary:
      "bg-[#FFF5D6] text-[#8B5A2B] border-2 border-[#F7A531] hover:bg-[#FFE082]",
    outline:
      "border-2 border-[#F7A531] text-[#F7A531] bg-transparent hover:bg-[#FFF5D6]",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${
        disabled ? disabledStyles : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
