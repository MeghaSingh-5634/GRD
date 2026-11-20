"use client";

import React, { useState } from "react";
import Image from "next/image";
import StarLogo from "./StarLogo";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { SITE_CONFIG, TESTIMONIAL_DATA } from "@/data/siteData";

interface PreFooterStripProps {
  onQuoteClick: () => void;
}

export default function PreFooterStrip({ onQuoteClick }: PreFooterStripProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="bg-[#07182B] py-16 lg:py-20 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Col 1: Testimonials (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between pr-0 lg:pr-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#D7FF00] block mb-3">
                WHAT OUR CLIENTS SAY
              </span>
              <p className="text-sm sm:text-base text-slate-200 font-medium italic leading-relaxed mb-6">
                {TESTIMONIAL_DATA.quote}
              </p>

              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white/20 shrink-0">
                  <Image
                    src={TESTIMONIAL_DATA.avatar}
                    alt={TESTIMONIAL_DATA.author}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white leading-tight">
                    {TESTIMONIAL_DATA.author}
                  </span>
                  <span className="text-xs text-slate-400 font-medium mt-0.5">
                    {TESTIMONIAL_DATA.designation}
                  </span>
                </div>
              </div>
            </div>

            {/* Pagination / Arrow Controls */}
            <div className="flex items-center gap-2 mt-6">
              <button
                onClick={() => setActiveSlide(0)}
                className={`h-1 rounded-full transition-all ${
                  activeSlide === 0 ? "w-6 bg-[#D7FF00]" : "w-2 bg-white/30"
                }`}
                aria-label="Slide 1"
              />
              <button
                onClick={() => setActiveSlide(1)}
                className={`h-1 rounded-full transition-all ${
                  activeSlide === 1 ? "w-6 bg-[#D7FF00]" : "w-2 bg-white/30"
                }`}
                aria-label="Slide 2"
              />
              <button
                onClick={() => setActiveSlide((prev) => (prev === 0 ? 1 : 0))}
                className="w-5 h-5 rounded-full text-slate-400 hover:text-white flex items-center justify-center transition-colors ml-1 cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Col 2: Lead Generation CTA (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-center px-0 lg:px-8 border-t lg:border-t-0 lg:border-x border-white/10 pt-8 lg:pt-0">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Have a Project in Mind?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              Let&apos;s discuss your signage or branding requirement.
            </p>

            <div>
              <button
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-[#07182B] bg-[#D7FF00] hover:bg-[#cbf500] active:scale-95 transition-all shadow-lg shadow-[#D7FF00]/25 group cursor-pointer"
              >
                <span>Request a Corporate Quotation</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Col 3: Brand & Contact Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-center pl-0 lg:pl-6 border-t lg:border-t-0 border-white/10 pt-8 lg:pt-0 space-y-4">
            <StarLogo />

            <div className="space-y-2.5 text-xs text-slate-300 pt-2">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{SITE_CONFIG.displayPhone}</span>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </a>

              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{SITE_CONFIG.officeAddress}</span>
              </div>
            </div>

            {/* Social Icons (SVGs) */}
            <div className="flex items-center gap-2.5 pt-2">
              {/* LinkedIn */}
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42A2.5 2.5 0 0 0 2.42 7.19 26.33 26.33 0 0 0 2 12a26.33 26.33 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26.33 26.33 0 0 0 22 12a26.33 26.33 0 0 0-.42-4.81zM10 15V9l5.2 3-5.2 3z"/>
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
