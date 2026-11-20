"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight, Layers, Sparkles } from "lucide-react";
import { SERVICES_DATA, ServiceItem } from "@/data/siteData";

interface ServicesCarouselProps {
  onSelectService: (serviceTitle: string) => void;
}

export default function ServicesCarousel({ onSelectService }: ServicesCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth > 768 ? 420 : 310;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="relative py-20 lg:py-28 bg-[#07182B] text-white overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#10243B] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Section Headers */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10243B] border border-white/10 text-xs font-semibold text-[#D7FF00] uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>End-to-End Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Complete Signage & Printing Solutions
            </h2>
            <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
              From concept to installation, we provide end-to-end branding solutions tailored to your business needs.
            </p>
          </div>

          {/* Navigation Arrows & Actions */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full border transition-all ${
                canScrollLeft
                  ? "bg-[#10243B] border-white/20 text-white hover:bg-[#152B44] hover:border-[#D7FF00]"
                  : "bg-white/5 border-white/5 text-slate-600 cursor-not-allowed"
              }`}
              aria-label="Previous service"
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
              aria-label="Next service"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Carousel Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              className="snap-start shrink-0 w-[85vw] sm:w-[380px] lg:w-[420px] rounded-2xl bg-[#0D1F34] border border-white/10 hover:border-[#D7FF00]/50 transition-all duration-300 overflow-hidden flex flex-col group shadow-xl"
            >
              {/* Card Image with Gradient */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 85vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F34] via-[#0D1F34]/60 to-transparent" />

                {/* Badge Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#07182B]/90 backdrop-blur-md text-[11px] font-bold text-[#D7FF00] border border-[#D7FF00]/30 tracking-wider uppercase">
                    {service.tag}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="text-slate-400 font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#07182B]/80">
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#D7FF00] transition-colors mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    {service.subtitle}
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#27DC75] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedServiceModal(service)}
                    className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition"
                  >
                    <span>Full Specifications</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#D7FF00]" />
                  </button>

                  <button
                    onClick={() => onSelectService(service.title)}
                    className="px-4 py-2 rounded-lg bg-[#10243B] hover:bg-[#D7FF00] text-white hover:text-[#07182B] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 border border-white/10 hover:border-[#D7FF00]"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0D1F34] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D7FF00] px-2.5 py-1 rounded bg-[#D7FF00]/10 border border-[#D7FF00]/30 inline-block mb-2">
                  {selectedServiceModal.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedServiceModal.title}
                </h3>
                <p className="text-sm font-semibold text-slate-400">
                  {selectedServiceModal.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="p-2 rounded-lg bg-[#10243B] text-slate-300 hover:text-white hover:bg-white/10 transition"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {selectedServiceModal.description}
            </p>

            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-3">
              Included Engineering & Deliverables
            </h4>
            <div className="space-y-2.5 mb-8">
              {selectedServiceModal.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300 bg-[#10243B]/60 p-3 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#27DC75] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const s = selectedServiceModal.title;
                  setSelectedServiceModal(null);
                  onSelectService(s);
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#07182B] bg-[#D7FF00] hover:bg-[#cbf500] shadow-md shadow-[#D7FF00]/25 transition"
              >
                Request Quotation For This Service →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
