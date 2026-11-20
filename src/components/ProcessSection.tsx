"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import { PROCESS_STEPS_5 } from "@/data/siteData";

export default function ProcessSection() {
  return (
    <section id="process" className="bg-white py-14 lg:py-18 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Heading */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16A34A] mb-1.5">
              <span className="w-4 h-0.5 bg-[#16A34A] rounded-full" />
              <span>OUR PROCESS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E36] tracking-tight leading-tight">
              A Clear Process. <br />
              A Seamless Experience.
            </h2>
          </div>

          {/* Middle 5-Step Connected Timeline */}
          <div className="lg:col-span-6 relative">
            {/* Connecting horizontal line */}
            <div className="hidden sm:block absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-2 relative z-10">
              {PROCESS_STEPS_5.map((step) => (
                <div key={step.number} className="flex flex-col items-center text-center group">
                  {/* Numbered Circle */}
                  <div className="w-8 h-8 rounded-full bg-[#07182B] text-white group-hover:bg-[#16A34A] text-xs font-black flex items-center justify-center shadow-md transition-colors mb-2">
                    {step.number}
                  </div>
                  {/* Step Title */}
                  <span className="text-[11px] font-bold text-[#0B1E36] leading-tight max-w-[100px]">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Dark Navy "Quality Assured" Card */}
          <div className="lg:col-span-3 flex justify-start lg:justify-end">
            <div className="w-full sm:w-auto p-4 sm:p-5 rounded-2xl bg-[#0B1E36] text-white flex items-center gap-3.5 shadow-xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#27DC75]">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-white leading-tight">
                  Quality Assured
                </span>
                <span className="text-[11px] text-slate-300 font-medium mt-0.5 leading-snug">
                  Premium materials, precise execution.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
