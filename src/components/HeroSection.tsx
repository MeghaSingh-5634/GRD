"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Download, MapPin, Building2 } from "lucide-react";
import { HERO_CAROUSEL_IMAGES, HeroCarouselSlide, COMPANY_PROFILE_PDF } from "@/data/siteData";
import { getSafeImageUrl } from "@/utils/imageUtils";

interface HeroSectionProps {
  slides?: HeroCarouselSlide[];
  onExploreProjects: () => void;
  onGetQuote: () => void;
}

export default function HeroSection({
  slides: customSlides,
  onExploreProjects,
  onGetQuote,
}: HeroSectionProps) {
  const slides: HeroCarouselSlide[] =
    customSlides && customSlides.length > 0 ? customSlides : HERO_CAROUSEL_IMAGES;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Bounds check if slides change
  useEffect(() => {
    if (slides.length > 0 && currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides.length, currentSlide]);

  // Cross-fade autoplay interval (5 seconds)
  useEffect(() => {
    if (isHovered || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[580px] lg:min-h-[660px] flex items-center pt-24 pb-12 lg:pt-28 lg:pb-0 bg-[#07182B] overflow-hidden"
    >
      {/* Background Gradient / Ambient Dark Blue */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07182B] via-[#07182B] to-[#0A1A2E] z-0" />

      {/* Right Side: Fade Carousel (Full-height on desktop, positioned to right edge) */}
      <div
        className="lg:absolute lg:top-0 lg:bottom-0 lg:right-0 lg:w-[64%] w-full h-[360px] sm:h-[450px] lg:h-full z-0 overflow-hidden lg:hero-clip-diagonal"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Soft gradient shadow on left edge to blend seamlessly into solid navy */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#07182B] via-[#07182B]/60 to-transparent z-20 pointer-events-none" />

        {/* Carousel Slides with Cross-Fade */}
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={getSafeImageUrl(slide.image, "/images/hero-slide-clean.jpg")}
                alt={slide.alt || "Star Printers & Signage Hero Slide"}
                fill
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                className="object-cover object-center scale-100 hover:scale-[1.02] transition-transform duration-1000"
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
              {/* Subtle bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07182B]/80 via-transparent to-transparent lg:opacity-40" />
            </div>
          );
        })}

        {/* Carousel Floating Controls & Slide Tag (Bottom Right) */}
        <div className="absolute bottom-5 right-5 z-30 flex items-center gap-3">
          {/* Active Slide Info Pill */}
          {slides[currentSlide]?.title && (
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07182B]/80 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#D7FF00] animate-pulse" />
              <span>{slides[currentSlide].title}</span>
              {slides[currentSlide].subtitle && (
                <span className="text-slate-400 font-normal">
                  • {slides[currentSlide].subtitle}
                </span>
              )}
            </div>
          )}

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-1 bg-[#07182B]/80 backdrop-blur-md p-1 rounded-full border border-white/15 shadow-lg">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Previous Hero Image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-1 px-1">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentSlide
                      ? "w-4 bg-[#D7FF00]"
                      : "w-1.5 bg-white/40 hover:bg-white/80"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Next Hero Image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Left Side: Content & Headline (Stands over solid dark navy) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pointer-events-none">
        <div className="lg:w-[56%] pointer-events-auto flex flex-col justify-center py-6">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-white tracking-tight leading-[1.08] mb-6 drop-shadow-sm">
            We Build Signage <br />
            That <span className="text-[#D7FF00]">Builds Brands.</span>
          </h1>

          {/* Supporting Subtext */}
          <p className="text-slate-200 text-base sm:text-lg font-normal leading-relaxed max-w-lg mb-8 drop-shadow-sm">
            End-to-end corporate signage, printing, fabrication and installation solutions for institutions, retail chains and commercial spaces.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap xl:flex-nowrap items-stretch sm:items-center gap-3 mb-8">
            <button
              onClick={onExploreProjects}
              className="inline-flex items-center justify-center gap-2 px-4 xl:px-5 py-3 rounded-lg font-bold text-[13px] whitespace-nowrap text-[#07182B] bg-[#D7FF00] hover:bg-[#cbf500] active:scale-[0.98] transition-all shadow-lg shadow-[#D7FF00]/25 group cursor-pointer"
            >
              <span>Explore Our Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onGetQuote}
              className="inline-flex items-center justify-center gap-2 px-4 xl:px-5 py-3 rounded-lg font-semibold text-[13px] whitespace-nowrap text-white hover:bg-white/10 border border-white/50 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Request a Corporate Quote</span>
            </button>

            <a
              href={COMPANY_PROFILE_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 xl:px-5 py-3 rounded-lg font-semibold text-[13px] whitespace-nowrap text-white hover:bg-white/10 border border-white/50 active:scale-[0.98] transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Company Profile</span>
            </a>
          </div>

          {/* Location / coverage line */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-medium text-slate-200 lg:whitespace-nowrap">
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-white" />
              Based in Dehradun, Uttarakhand
            </span>
            <span className="hidden sm:block w-px h-4 bg-white/30" />
            <span className="inline-flex items-center gap-2">
              <Building2 className="w-4 h-4 text-white" />
              Serving Institutional &amp; Commercial Projects Across North India
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
