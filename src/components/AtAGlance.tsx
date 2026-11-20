import React from "react";
import { CalendarCheck, Layers, Handshake, MapPin, UsersRound } from "lucide-react";
import { AT_A_GLANCE } from "@/data/siteData";
import { SectionLabel } from "./ui";

const ICONS = {
  calendar: CalendarCheck,
  layers: Layers,
  handshake: Handshake,
  "map-pin": MapPin,
  users: UsersRound,
};

export default function AtAGlance() {
  return (
    <section id="about" className="bg-[#F3F5F8] py-8 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-0 items-center">
          <div className="lg:pr-6 lg:border-r border-slate-300">
            <SectionLabel>Company at a Glance</SectionLabel>
            <h2 className="text-2xl font-extrabold text-[#0B1E36] tracking-tight leading-[1.15]">
              A Trusted Partner for Corporate Branding &amp; Signage Execution.
            </h2>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {AT_A_GLANCE.map((item, i) => {
              const Icon = ICONS[item.icon];
              return (
                <li
                  key={item.label}
                  className={`flex flex-col items-center text-center gap-2.5 px-3 py-3 ${
                    i > 0 ? "lg:border-l border-slate-300" : ""
                  }`}
                >
                  <Icon className="w-8 h-8 text-[#0B1E36]" strokeWidth={1.6} />
                  <span className="text-[13px] font-bold text-[#0B1E36] leading-snug max-w-[150px]">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
