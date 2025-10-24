"use client";
import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`
        bg-gradient-to-b from-[#FFF5C3] to-[#FFD85A]
        border-4 border-[#F7A531]
        rounded-2xl shadow-[0_4px_0_rgba(0,0,0,0.25)]
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`p-4 text-[#4E2A0B] font-bold ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
