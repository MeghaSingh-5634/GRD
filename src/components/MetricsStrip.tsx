"use client";

import React from "react";
import { Trophy, Handshake, MapPin, ShieldCheck } from "lucide-react";

export default function MetricsStrip() {
  return (
    <section className="bg-white py-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
          {/* Stat 1: 200+ Projects Completed */}
          <div className="flex items-center gap-3.5 sm:justify-center">
            <div className="text-slate-800">
              <Trophy className="w-7 h-7 stroke-[1.8]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-[#07182B] tracking-tight leading-none">
                200+
              </span>
              <span className="text-[11px] font-bold text-slate-600 mt-1">
                Projects Completed
              </span>
            </div>
          </div>

          {/* Stat 2: 100+ Corporate Clients */}
          <div className="flex items-center gap-3.5 sm:justify-center border-l-0 md:border-l border-slate-200 pl-0 md:pl-4">
            <div className="text-slate-800">
              <Handshake className="w-7 h-7 stroke-[1.8]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-[#07182B] tracking-tight leading-none">
                100+
              </span>
              <span className="text-[11px] font-bold text-slate-600 mt-1">
                <span className="relative inline-block">
                  Corporate
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#16A34A] rounded-full" />
                </span>{" "}
                Clients
              </span>
            </div>
          </div>

          {/* Stat 3: 10+ Cities Served */}
          <div className="flex items-center gap-3.5 sm:justify-center border-l-0 md:border-l border-slate-200 pl-0 md:pl-4">
            <div className="text-slate-800">
              <MapPin className="w-7 h-7 stroke-[1.8]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-[#07182B] tracking-tight leading-none">
                10+
              </span>
              <span className="text-[11px] font-bold text-slate-600 mt-1">
                Cities Served
              </span>
            </div>
          </div>

          {/* Stat 4: 99% Client Satisfaction */}
          <div className="flex items-center gap-3.5 sm:justify-center border-l-0 md:border-l border-slate-200 pl-0 md:pl-4">
            <div className="text-[#16A34A]">
              <ShieldCheck className="w-7 h-7 stroke-[1.8] fill-[#16A34A]/10" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-[#07182B] tracking-tight leading-none">
                99%
              </span>
              <span className="text-[11px] font-bold text-slate-600 mt-1">
                Client Satisfaction
              </span>
            </div>
          </div>

          {/* Callout 5: A Trusted Partner for Your Next Big Project */}
          <div className="col-span-2 md:col-span-1 flex flex-col justify-center border-l-0 md:border-l-2 border-slate-300 pl-0 md:pl-6 text-left">
            <span className="text-sm font-extrabold text-[#0B1E36] leading-tight">
              A Trusted Partner for
            </span>
            <span className="text-sm font-black text-[#16A34A] leading-tight">
              Your Next Big Project
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
