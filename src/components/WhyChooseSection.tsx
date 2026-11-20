import React from "react";
import { Target, Layers, ShieldCheck, UsersRound, Handshake, Headset } from "lucide-react";
import { WHY_CHOOSE } from "@/data/siteData";
import { SectionLabel } from "./ui";

const ICONS = {
  target: Target,
  layers: Layers,
  shield: ShieldCheck,
  users: UsersRound,
  handshake: Handshake,
  headset: Headset,
};

export default function WhyChooseSection() {
  return (
    <section id="why-star" className="bg-white py-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 items-center">
          <div>
            <SectionLabel>Why Choose Star</SectionLabel>
            <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#0B1E36] tracking-tight leading-[1.15]">
              More Than a Vendor. <br className="hidden lg:block" />A Project Partner.
            </h2>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {WHY_CHOOSE.map((item, i) => {
              const Icon = ICONS[item.icon];
              return (
                <li
                  key={item.title}
                  className={`flex flex-col items-center text-center gap-1.5 px-2 py-3 ${
                    i > 0 ? "lg:border-l border-slate-200" : ""
                  }`}
                >
                  <Icon className="w-8 h-8 text-[#16A34A] mb-1" strokeWidth={1.6} />
                  <span className="text-[13px] font-bold text-[#0B1E36] leading-tight">{item.title}</span>
                  <span className="text-[11px] text-slate-500">({item.note})</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
