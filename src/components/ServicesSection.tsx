"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Building2,
  MapPin,
  ShoppingBag,
  Printer,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { SERVICES_LIST, ServiceCard } from "@/data/siteData";
import { SectionLabel } from "./ui";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeModal, setActiveModal] = useState<ServiceCard | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "building":
        return <Building2 className="w-5 h-5 text-white" />;
      case "map-pin":
        return <MapPin className="w-5 h-5 text-white" />;
      case "shopping-bag":
        return <ShoppingBag className="w-5 h-5 text-white" />;
      case "printer":
        return <Printer className="w-5 h-5 text-white" />;
      case "wrench":
        return <Wrench className="w-5 h-5 text-white" />;
      default:
        return <Building2 className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="services" className="bg-[#F3F5F8] py-10 lg:py-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Sub-badge and View All link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            {/* Green Sub-badge */}
            <SectionLabel>Our Services</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E36] tracking-tight">
              Complete Signage &amp; Printing Solutions
            </h2>
          </div>

          <button
            onClick={() => onSelectService("Corporate Signage")}
            className="text-xs sm:text-sm font-bold text-[#0B1E36] hover:text-[#16A34A] transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SERVICES_LIST.map((service) => (
            <button
              type="button"
              key={service.id}
              onClick={() => setActiveModal(service)}
              className="group relative rounded-lg overflow-hidden aspect-[4/3] lg:aspect-[3/2.4] bg-[#0B1E36] text-left shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07182B] via-[#07182B]/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-3.5 flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <span className="block mb-1.5 text-white">{getIcon(service.iconName)}</span>
                  <h3 className="text-[15px] font-bold text-white leading-snug group-hover:text-[#D7FF00] transition-colors">
                    {service.title}
                  </h3>
                </div>
                <span className="w-7 h-7 rounded-full border-2 border-[#D7FF00] text-[#D7FF00] group-hover:bg-[#D7FF00] group-hover:text-[#07182B] flex items-center justify-center shrink-0 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Service Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#0B1E36] border border-white/15 rounded-2xl p-6 shadow-2xl text-white">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D7FF00] block mb-1">
                  OUR CAPABILITIES
                </span>
                <h3 className="text-2xl font-extrabold">{activeModal.title}</h3>
                <p className="text-xs font-medium text-slate-400 mt-0.5">{activeModal.subtitle}</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {activeModal.description}
            </p>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const s = activeModal.serviceOption;
                  setActiveModal(null);
                  onSelectService(s);
                }}
                className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#07182B] bg-[#D7FF00] hover:bg-[#cbf500] transition"
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
