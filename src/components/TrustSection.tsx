"use client";

import React from "react";
import { ShieldCheck, Award, Zap, CheckCircle2, Building, Sparkles } from "lucide-react";
import { BUSINESS_METRICS, TESTIMONIALS_CONFIG } from "@/data/siteData";

export default function TrustSection() {
  const verifiedMetrics = BUSINESS_METRICS.filter((m) => m.verified);

  const engineeringAssurances = [
    {
      title: "Wind Load & Structural Safety",
      description: "Engineered sub-frames calculated for extreme weather and cyclone gusts up to 140 km/h.",
    },
    {
      title: "Genuine IP67 Weatherproof LEDs",
      description: "Samsung and Osram solid-state diodes with sealed potting preventing moisture or dust ingress.",
    },
    {
      title: "Marine-Grade 304/316 Stainless Steel",
      description: "Laser-cut architectural grade metals that resist coastal oxidation and chemical weathering.",
    },
    {
      title: "Electrical Surge & Fire Compliance",
      description: "Fire-retardant ACP backing and certified Meanwell industrial power supplies with surge suppression.",
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-[#07182B] text-white overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Metric Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {verifiedMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#0D1F34] border border-white/10 hover:border-[#D7FF00]/40 transition-all text-center flex flex-col justify-center items-center shadow-lg"
            >
              <div className="text-3xl sm:text-5xl font-black text-[#D7FF00] tracking-tight font-mono mb-2">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-1">
                {metric.label}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Rigor & Reliability Architecture */}
        <div className="bg-[#10243B]/60 border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-md">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D7FF00] px-3 py-1 rounded-full bg-[#D7FF00]/10 border border-[#D7FF00]/20 inline-block mb-3">
              Corporate Compliance Standards
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Zero Compromise on Material & Electrical Integrity
            </h3>
            <p className="mt-2 text-slate-300 text-sm">
              We design and construct signage to endure decades of direct sunlight, torrential monsoon rains, and continuous high-illumination duty cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringAssurances.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#07182B]/70 border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#10243B] flex items-center justify-center text-[#D7FF00] mb-3">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials - Rendered only when authentic approved testimonials are enabled */}
        {TESTIMONIALS_CONFIG.showTestimonials && (
          <div className="mt-16 pt-12 border-t border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              Client Commendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TESTIMONIALS_CONFIG.items.map((t) => (
                <div
                  key={t.id}
                  className="p-6 rounded-2xl bg-[#0D1F34] border border-white/10"
                >
                  <p className="text-slate-300 text-sm italic mb-4">"{t.quote}"</p>
                  <div className="text-xs font-bold text-white">{t.author}</div>
                  <div className="text-[11px] text-[#D7FF00]">{t.organization}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
