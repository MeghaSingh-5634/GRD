import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CAPABILITY_CARDS } from "@/data/siteData";
import { SectionLabel } from "./ui";

interface CapabilitiesSectionProps {
  onExplore: () => void;
}

export default function CapabilitiesSection({ onExplore }: CapabilitiesSectionProps) {
  return (
    <section id="capabilities" className="bg-[#0B1E36] py-10 text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-center">
          <div>
            <SectionLabel dark>Our Capabilities</SectionLabel>
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight mb-3">
              Built to Execute. <br className="hidden lg:block" />
              In-House &amp; On-Site.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-5">
              Production, fabrication and installation capabilities to handle institutional and commercial projects.
            </p>
            <button
              onClick={onExplore}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-[13px] text-[#07182B] bg-[#D7FF00] hover:bg-[#cbf500] active:scale-95 transition-all cursor-pointer"
            >
              Explore Our Capabilities
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CAPABILITY_CARDS.map((card) => (
              <div
                key={card.title}
                className="group relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/10] rounded-lg overflow-hidden border-2 border-white/25"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 30vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07182B] via-[#07182B]/30 to-transparent" />
                <h3 className="absolute left-4 bottom-3 right-4 text-base font-bold">{card.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
