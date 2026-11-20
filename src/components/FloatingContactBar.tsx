"use client";

import React from "react";
import { Phone, Mail, ClipboardList, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteData";
import { WhatsAppIcon } from "./ui";

interface FloatingContactBarProps {
  onQuoteClick: () => void;
}

export default function FloatingContactBar({ onQuoteClick }: FloatingContactBarProps) {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappPrefilledMessage
  )}`;
  const tel = `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`;

  const circle =
    "group relative w-12 h-12 rounded-full bg-[#D7FF00] text-[#07182B] border-2 border-[#07182B]/10 shadow-lg shadow-black/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform cursor-pointer";
  const tip =
    "pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-[#07182B] px-2.5 py-1 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity";

  return (
    <>
      {/* Desktop: vertical stack on the right edge */}
      <div className="hidden md:flex fixed right-5 bottom-8 z-40 flex-col gap-3">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className={circle}>
          <WhatsAppIcon className="w-6 h-6" />
          <span className={tip}>WhatsApp</span>
        </a>
        <a href={tel} aria-label="Call us" className={circle}>
          <Phone className="w-5 h-5 fill-current" />
          <span className={tip}>{SITE_CONFIG.displayPhone}</span>
        </a>
        <a href={`mailto:${SITE_CONFIG.email}`} aria-label="Email us" className={circle}>
          <Mail className="w-5 h-5" />
          <span className={tip}>{SITE_CONFIG.email}</span>
        </a>
        <button onClick={onQuoteClick} aria-label="Request a quotation" className={circle}>
          <ClipboardList className="w-5 h-5" />
          <span className={tip}>Request a Quote</span>
        </button>
      </div>

      {/* Mobile: fixed bottom action bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07182B]/95 backdrop-blur-md border-t border-white/15 px-3 py-2.5 shadow-2xl flex items-center justify-between gap-2">
        <a
          href={tel}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#10243B] text-slate-200 font-bold text-xs border border-white/10 active:scale-95 transition"
        >
          <Phone className="w-3.5 h-3.5 text-[#D7FF00]" />
          <span>Call</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#27DC75] text-[#07182B] font-extrabold text-xs active:scale-95 transition"
        >
          <WhatsAppIcon className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
        <button
          onClick={onQuoteClick}
          className="flex-[1.4] flex items-center justify-center gap-1 py-2.5 rounded-xl bg-[#D7FF00] text-[#07182B] font-black text-xs uppercase tracking-wider active:scale-95 transition"
        >
          <span>Get Quote</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </>
  );
}
