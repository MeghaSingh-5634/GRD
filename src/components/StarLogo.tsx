"use client";

import React from "react";

interface StarLogoProps {
  className?: string;
  isLight?: boolean;
}

export default function StarLogo({ className = "", isLight = false }: StarLogoProps) {
  return (
    <div className={`flex flex-col select-none ${className}`}>
      <div className="flex items-center tracking-tight">
        <span
          className={`font-black italic text-2xl sm:text-3xl tracking-tighter ${
            isLight ? "text-white" : "text-white"
          }`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          ST<span className="relative inline-block text-[#EF4444] font-black">A<span className="text-white">R</span></span>
        </span>
      </div>
      <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-300 -mt-1">
        PRINTERS &amp; SIGNAGE
      </span>
    </div>
  );
}
