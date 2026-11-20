"use client";

import React from "react";

interface ClientStripProps {
  onSelectClient?: (clientId: string) => void;
}

export default function ClientStrip({ onSelectClient }: ClientStripProps) {
  const logoItems = [
    {
      id: "grd",
      name: "GRD University",
      component: (
        <div className="flex items-center gap-2.5 px-4 group/item cursor-pointer">
          <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 group-hover/item:scale-105 transition-transform">
            <path d="M14 0L28 4V18C28 26 14 34 14 34C14 34 0 26 0 18V4L14 0Z" fill="#8B1E1E" />
            <path d="M14 3L25 6V17C25 24 14 30.5 14 30.5C14 30.5 3 24 3 17V6L14 3Z" stroke="#EAB308" strokeWidth="1.5" />
            <path d="M14 8L16 14H22L17 18L19 24L14 20L9 24L11 18L6 14H12L14 8Z" fill="#EAB308" />
          </svg>
          <div className="flex flex-col text-left whitespace-nowrap">
            <span className="text-xs font-black tracking-tight text-[#07182B]">GRD</span>
            <span className="text-[10px] font-bold tracking-wider text-slate-700">UNIVERSITY</span>
          </div>
        </div>
      ),
    },
    {
      id: "planet-fashion",
      name: "Planet Fashion",
      component: (
        <div className="flex items-center gap-2 px-4 group/item cursor-pointer">
          <div className="w-6 h-7 flex items-center justify-center font-serif text-lg font-black italic text-[#07182B] border-r-2 border-[#07182B] pr-1 shrink-0 group-hover/item:scale-105 transition-transform">
            P
          </div>
          <div className="flex flex-col text-left leading-tight whitespace-nowrap">
            <span className="text-xs font-black tracking-wider text-[#07182B]">PLANET</span>
            <span className="text-[9px] font-bold tracking-[0.18em] text-slate-800">FASHION</span>
          </div>
        </div>
      ),
    },
    {
      id: "decathlon",
      name: "Decathlon",
      component: (
        <div className="px-4 whitespace-nowrap group/item cursor-pointer">
          <span className="text-base font-black tracking-tight text-[#0082C3] group-hover/item:brightness-110 transition" style={{ fontFamily: "Arial, sans-serif" }}>
            DECATHLON
          </span>
        </div>
      ),
    },
    {
      id: "tata-hitachi",
      name: "Tata Hitachi",
      component: (
        <div className="flex flex-col text-center px-4 leading-tight whitespace-nowrap group/item cursor-pointer">
          <span className="text-[11px] font-extrabold tracking-[0.25em] text-[#07182B]">TATA</span>
          <span className="text-sm font-black tracking-tight text-[#07182B]">HITACHI</span>
        </div>
      ),
    },
    {
      id: "reliance",
      name: "Reliance Industries",
      component: (
        <div className="flex items-center gap-2.5 px-4 whitespace-nowrap group/item cursor-pointer">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 group-hover/item:scale-105 transition-transform">
            <circle cx="12" cy="12" r="10" stroke="#C59B27" strokeWidth="2" />
            <circle cx="12" cy="12" r="6" fill="#C59B27" />
            <path d="M12 2V22M2 12H22" stroke="#C59B27" strokeWidth="1.5" />
          </svg>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-xs font-serif font-black tracking-tight text-[#07182B]">Reliance</span>
            <span className="text-[8px] font-medium tracking-wide text-slate-600">Industries Limited</span>
          </div>
        </div>
      ),
    },
    {
      id: "many-more",
      name: "Many More",
      component: (
        <div className="px-4 whitespace-nowrap">
          <span className="text-xs font-bold text-slate-700">&amp; Many More</span>
        </div>
      ),
    },
  ];

  const handleClick = (id: string) => {
    if (onSelectClient) onSelectClient(id);
  };

  return (
    <section className="bg-white py-5 border-b border-slate-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="shrink-0 lg:pr-6">
            <span className="text-sm font-extrabold text-[#0B1E36] block leading-tight">Trusted Clients &amp;</span>
            <span className="text-sm font-extrabold text-[#0B1E36] block leading-tight">Project Experience</span>
          </div>

          <div className="flex-1 flex items-center overflow-x-auto no-scrollbar lg:overflow-visible">
            {logoItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`flex-1 min-w-max flex items-center justify-center py-1 ${
                  idx > 0 ? "border-l border-slate-200" : ""
                }`}
              >
                {item.component}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
