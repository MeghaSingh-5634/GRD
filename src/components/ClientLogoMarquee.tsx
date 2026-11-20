"use client";

import React from "react";
import { CLIENT_LOGOS } from "@/data/siteData";
import { ShieldCheck, ArrowRight } from "lucide-react";

interface ClientLogoMarqueeProps {
  onSelectClient: (clientId: string) => void;
}

export default function ClientLogoMarquee({ onSelectClient }: ClientLogoMarqueeProps) {
  // Filter verified clients as required by prompt
  const verifiedLogos = CLIENT_LOGOS.filter((item) => item.verified);

  // Duplicate the track to ensure infinite continuous loop without any visual jump
  const marqueeItems = [...verifiedLogos, ...verifiedLogos, ...verifiedLogos, ...verifiedLogos];

  const handleClick = (clientId: string) => {
    onSelectClient(clientId);
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-10 bg-[#0A1D33] border-y border-white/10 overflow-hidden">
      {/* Background accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D7FF00]" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-300">
              Selected Clients & Project Experience
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Click any client partner to view completed site execution gallery
          </span>
        </div>
      </div>

      {/* Marquee Container with Left & Right Gradient Shadows for seamless fade */}
      <div className="relative w-full overflow-hidden">
        {/* Left Fade Overlay */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#0A1D33] to-transparent z-10 pointer-events-none" />

        {/* Right Fade Overlay */}
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#0A1D33] to-transparent z-10 pointer-events-none" />

        {/* Continuous Animated Marquee Track */}
        <div className="animate-marquee flex items-center gap-6 sm:gap-10 py-2">
          {marqueeItems.map((item, index) => (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleClick(item.clientId)}
              className="group relative flex items-center gap-3.5 px-6 py-3.5 rounded-xl bg-[#10243B]/70 hover:bg-[#152B44] border border-white/10 hover:border-[#D7FF00]/50 transition-all duration-300 cursor-pointer shrink-0 focus:outline-none"
              title={`View ${item.name} completed project portfolio`}
            >
              {/* Client Insignia / Monogram Badge */}
              <div className="w-9 h-9 rounded-lg bg-[#07182B] border border-white/10 group-hover:border-[#D7FF00]/50 flex items-center justify-center text-xs font-black text-slate-300 group-hover:text-[#D7FF00] transition-colors shrink-0">
                {item.logoText.slice(0, 2)}
              </div>

              {/* Client Name & Category */}
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white transition-colors whitespace-nowrap">
                  {item.name}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  {item.category}
                </span>
              </div>

              {/* Subtle Jump Indicator Icon */}
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#D7FF00] group-hover:translate-x-1 transition-all ml-1 shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
