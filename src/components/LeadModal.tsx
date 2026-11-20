"use client";

import React, { useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import LeadForm from "./LeadForm";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  onOpenPrivacyPolicy: () => void;
}

export default function LeadModal({
  isOpen,
  onClose,
  preselectedService,
  onOpenPrivacyPolicy,
}: LeadModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#07182B] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-[#10243B] hover:bg-[#D7FF00] text-slate-300 hover:text-[#07182B] border border-white/10 transition-all cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lead Form Component */}
        <LeadForm
          preselectedService={preselectedService}
          onOpenPrivacyPolicy={onOpenPrivacyPolicy}
        />
      </div>
    </div>
  );
}
