"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink } from "lucide-react";

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  caption?: string;
}

export default function LightboxModal({
  isOpen,
  onClose,
  imageUrl,
  title,
  caption,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[101] p-3 rounded-full bg-[#10243B]/80 hover:bg-[#D7FF00] text-white hover:text-[#07182B] border border-white/20 transition-all shadow-xl cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative max-w-6xl w-full flex flex-col items-center">
        {/* High Resolution Image Container */}
        <div className="relative w-full h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
        </div>

        {/* Caption Bar */}
        <div className="mt-4 w-full bg-[#0D1F34]/90 border border-white/10 rounded-xl p-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <h4 className="text-white font-bold text-base">{title}</h4>
            {caption && <p className="text-slate-300 text-xs mt-0.5 line-clamp-2">{caption}</p>}
          </div>
          <span className="text-[11px] font-mono font-bold text-[#D7FF00] uppercase tracking-wider shrink-0">
            ★ Verified Architectural Asset
          </span>
        </div>
      </div>
    </div>
  );
}
