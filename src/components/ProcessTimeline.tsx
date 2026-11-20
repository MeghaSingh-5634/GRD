"use client";

import React from "react";
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { PROCESS_STEPS } from "@/data/siteData";

export default function ProcessTimeline() {
  return (
    <section id="process" className="relative py-20 lg:py-28 bg-[#0A1D33] text-white overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10243B] border border-white/10 text-xs font-semibold text-[#D7FF00] uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Execution Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            A Clear Process. A Seamless Experience.
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
            From initial structural surveys to crane rigging and electrical commissioning, our five-stage execution pipeline prevents costly site delays.
          </p>
        </div>

        {/* 5-Step Process Timeline Cards */}
        <div className="relative">
          {/* Horizontal Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-0.5 bg-gradient-to-r from-[#D7FF00]/20 via-[#D7FF00]/60 to-[#27DC75]/40 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="rounded-2xl bg-[#0D1F34] border border-white/10 hover:border-[#D7FF00]/50 p-6 flex flex-col justify-between transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                <div>
                  {/* Step Number Circle */}
                  <div className="w-12 h-12 rounded-xl bg-[#07182B] group-hover:bg-[#D7FF00] border border-white/15 group-hover:border-[#D7FF00] flex items-center justify-center font-mono font-black text-sm text-[#D7FF00] group-hover:text-[#07182B] transition-colors shadow-md mb-6">
                    {step.number}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#D7FF00] transition-colors mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="pt-4 border-t border-white/10 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Deliverables:
                  </span>
                  {step.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#27DC75] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
