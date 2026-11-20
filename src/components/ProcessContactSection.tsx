"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowRightCircle,
  ReceiptText,
  Landmark,
  Factory,
  BadgeCheck,
  ClipboardList,
  Quote,
} from "lucide-react";
import {
  PROCESS_STEPS_7,
  HOME_TESTIMONIALS,
  FOUNDER,
  CREDENTIALS,
  SITE_CONFIG,
} from "@/data/siteData";
import { GrdLogo, SectionLabel } from "./ui";
import EnquiryCard from "./EnquiryCard";

const CRED_ICONS = {
  receipt: ReceiptText,
  landmark: Landmark,
  factory: Factory,
  badge: BadgeCheck,
  clipboard: ClipboardList,
};

interface Props {
  onOpenPrivacyPolicy: () => void;
}

export default function ProcessContactSection({ onOpenPrivacyPolicy }: Props) {
  const [tIndex, setTIndex] = useState(0);
  const testimonial = HOME_TESTIMONIALS[tIndex];
  const initials = FOUNDER.name
    .replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  const vendorMail = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent("Vendor Documents Request")}`;

  return (
    <section className="bg-[#F3F5F8] py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Left column */}
          <div className="space-y-6 min-w-0">
            {/* Process */}
            <div id="process" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center">
              <div>
                <SectionLabel>Our Process</SectionLabel>
                <h2 className="text-2xl font-extrabold text-[#0B1E36] tracking-tight leading-[1.15]">
                  A Clear Process. A Seamless Experience.
                </h2>
              </div>
              <ol className="grid grid-cols-4 sm:grid-cols-7 gap-y-5">
                {PROCESS_STEPS_7.map((step, i) => (
                  <li key={step} className="relative flex flex-col items-center text-center">
                    {i < PROCESS_STEPS_7.length - 1 && (
                      <span
                        className="hidden sm:block absolute top-[15px] left-[calc(50%+18px)] right-[calc(-50%+18px)] border-t-2 border-dashed border-slate-300"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10 w-8 h-8 rounded-full bg-[#D7FF00] border-2 border-[#0B1E36] text-[#0B1E36] text-[11px] font-black flex items-center justify-center">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-2 px-1 text-[11px] font-semibold text-[#0B1E36] leading-tight">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Testimonial + Founder */}
            <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div id="testimonials" className="p-6 scroll-mt-24 md:border-r border-slate-200">
                <SectionLabel>Client Testimonials</SectionLabel>
                <div className="flex gap-3 mt-3">
                  <span className="w-11 h-11 shrink-0 rounded-md bg-[#0B1E36] text-[#D7FF00] flex items-center justify-center">
                    <Quote className="w-5 h-5 fill-current" />
                  </span>
                  <blockquote className="text-[15px] text-[#0B1E36] leading-relaxed">“{testimonial.quote}”</blockquote>
                </div>
                <div className="mt-4 pl-14 flex items-center justify-between">
                  <GrdLogo />
                  <div className="flex items-center gap-2">
                    {HOME_TESTIMONIALS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setTIndex(i)}
                        aria-label={`Show testimonial ${i + 1}`}
                        className={`w-2.5 h-2.5 rounded-full cursor-pointer ${i === tIndex ? "bg-[#9BCB00]" : "bg-slate-300"}`}
                      />
                    ))}
                    <button
                      onClick={() => setTIndex((i) => (i + 1) % HOME_TESTIMONIALS.length)}
                      aria-label="Next testimonial"
                      className="text-[#0B1E36] hover:text-[#16A34A] cursor-pointer"
                    >
                      <ArrowRightCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <SectionLabel>From the Founder</SectionLabel>
                <div className="flex gap-4 mt-3 items-start">
                  <div className="relative w-24 h-28 sm:w-28 sm:h-32 shrink-0 rounded-lg overflow-hidden bg-[#0B1E36]">
                    {FOUNDER.photo ? (
                      <Image src={FOUNDER.photo} alt={FOUNDER.name} fill className="object-cover" sizes="112px" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-3xl font-black text-[#D7FF00]">
                        {initials}
                      </span>
                    )}
                  </div>
                  <div>
                    <blockquote className="text-[15px] text-[#0B1E36] leading-relaxed">“{FOUNDER.quote}”</blockquote>
                    <p className="mt-3 text-sm font-extrabold text-[#0B1E36]">{FOUNDER.name}</p>
                    <p className="text-xs text-slate-500">{FOUNDER.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Credentials */}
            <div id="credentials" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-[150px_1fr_auto] gap-4 items-center">
              <div>
                <SectionLabel>Corporate Credentials</SectionLabel>
                <h2 className="text-sm font-extrabold uppercase text-[#0B1E36] tracking-wide">&amp; Vendor Readiness</h2>
              </div>
              <ul className="grid grid-cols-3 sm:grid-cols-5">
                {CREDENTIALS.map((c, i) => {
                  const Icon = CRED_ICONS[c.icon];
                  return (
                    <li
                      key={c.label}
                      className={`min-w-0 flex flex-col items-center text-center gap-1.5 px-1 py-1 ${i > 0 ? "sm:border-l border-slate-300" : ""}`}
                    >
                      <Icon className="w-6 h-6 text-[#0B1E36]" strokeWidth={1.6} />
                      <span className="text-[10px] font-bold text-[#0B1E36] leading-tight">{c.label}</span>
                    </li>
                  );
                })}
              </ul>
              <a
                href={vendorMail}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#0B1E36] hover:bg-[#152B44] text-white text-[12px] font-bold transition whitespace-nowrap"
              >
                Request Vendor Documents
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right column: enquiry form */}
          <div>
            <EnquiryCard onOpenPrivacyPolicy={onOpenPrivacyPolicy} />
          </div>
        </div>
      </div>
    </section>
  );
}
