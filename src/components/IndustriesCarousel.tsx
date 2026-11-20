"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Building, ArrowRight, Check } from "lucide-react";
import { INDUSTRIES_DATA, IndustryItem } from "@/data/siteData";

interface IndustriesCarouselProps {
  onSelectIndustry: (industryTitle: string) => void;
}

export default function IndustriesCarousel({ onSelectIndustry }: IndustriesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth > 768 ? 380 : 300;
      const amount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section id="industries" className="relative py-20 lg:py-28 bg-[#0A1D33] text-white overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10243B] border border-white/10 text-xs font-semibold text-[#D7FF00] uppercase tracking-wider mb-3">
              <Building className="w-3.5 h-3.5" />
              <span>Sectors We Serve</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Solutions for Every Environment.
            </h2>
            <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
              Every industry demands distinct architectural standards, materials, and compliance. Explore our customized sector-specific solutions.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full border transition-all ${
                canScrollLeft
                  ? "bg-[#10243B] border-white/20 text-white hover:bg-[#152B44] hover:border-[#D7FF00]"
                  : "bg-white/5 border-white/5 text-slate-600 cursor-not-allowed"
              }`}
              aria-label="Previous industry"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`p-3 rounded-full border transition-all ${
                canScrollRight
                  ? "bg-[#10243B] border-white/20 text-white hover:bg-[#152B44] hover:border-[#D7FF00]"
                  : "bg-white/5 border-white/5 text-slate-600 cursor-not-allowed"
              }`}
              aria-label="Next industry"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 scroll-smooth"
        >
          {INDUSTRIES_DATA.map((industry) => (
            <div
              key={industry.id}
              className="snap-start shrink-0 w-[85vw] sm:w-[350px] lg:w-[380px] rounded-2xl bg-[#0D1F34] border border-white/10 hover:border-[#D7FF00]/50 transition-all duration-300 overflow-hidden flex flex-col group shadow-xl"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 85vw, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F34] via-[#0D1F34]/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#07182B]/90 backdrop-blur-md text-[10px] font-bold text-[#D7FF00] border border-[#D7FF00]/30 tracking-wider uppercase">
                    SECTOR
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#D7FF00] transition-colors mb-2">
                    {industry.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {industry.description}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    {industry.solutions.map((sol, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-[#27DC75] shrink-0" />
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectIndustry(industry.title)}
                  className="w-full py-2.5 rounded-xl bg-[#10243B] hover:bg-[#D7FF00] text-slate-200 hover:text-[#07182B] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-[#D7FF00]"
                >
                  <span>Request Sector Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
