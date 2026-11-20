"use client";

import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ExternalLink,
  Building,
  Navigation,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/siteData";

export default function ContactSection() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappPrefilledMessage
  )}`;

  return (
    <section id="contact" className="relative py-20 lg:py-24 bg-[#0A1D33] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Contact Details & Office Location */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10243B] border border-white/10 text-xs font-semibold text-[#D7FF00] uppercase tracking-wider mb-3">
                <Navigation className="w-3.5 h-3.5" />
                <span>Headquarters & Production Hub</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Get in Touch with Our Project Desk
              </h2>
              <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether you need a full campus signage overhaul, retail multi-store rollout, or custom architectural fabrication, we are ready to assist.
              </p>
            </div>

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="p-5 rounded-2xl bg-[#0D1F34] border border-white/10 hover:border-[#D7FF00]/50 transition-all flex items-start gap-4 group"
              >
                <div className="p-3 rounded-xl bg-[#07182B] text-[#D7FF00] group-hover:bg-[#D7FF00] group-hover:text-[#07182B] transition-colors shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Call Direct
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-[#D7FF00] transition-colors">
                    {SITE_CONFIG.displayPhone}
                  </span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#0D1F34] border border-white/10 hover:border-[#27DC75]/50 transition-all flex items-start gap-4 group"
              >
                <div className="p-3 rounded-xl bg-[#07182B] text-[#27DC75] group-hover:bg-[#27DC75] group-hover:text-[#07182B] transition-colors shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#27DC75] block mb-0.5">
                    WhatsApp Chat
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-[#27DC75] transition-colors">
                    Instant Messaging
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="p-5 rounded-2xl bg-[#0D1F34] border border-white/10 hover:border-[#D7FF00]/50 transition-all flex items-start gap-4 group"
              >
                <div className="p-3 rounded-xl bg-[#07182B] text-[#D7FF00] group-hover:bg-[#D7FF00] group-hover:text-[#07182B] transition-colors shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Official Email
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-[#D7FF00] transition-colors break-all">
                    {SITE_CONFIG.email}
                  </span>
                </div>
              </a>

              {/* Working Hours */}
              <div className="p-5 rounded-2xl bg-[#0D1F34] border border-white/10 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#07182B] text-slate-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Working Schedule
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    {SITE_CONFIG.workingHours}
                  </span>
                </div>
              </div>
            </div>

            {/* Physical Facility Address */}
            <div className="p-5 rounded-2xl bg-[#10243B]/60 border border-white/10 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#07182B] text-[#D7FF00] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Works & Corporate Office
                </span>
                <p className="text-sm text-slate-200 leading-relaxed mb-3">
                  {SITE_CONFIG.officeAddress}
                </p>
                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D7FF00] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual Panel */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#0D1F34] shadow-2xl p-2">
              <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden bg-[#07182B] flex flex-col items-center justify-center p-6 text-center">
                {/* Styled Map Illustration / Embed placeholder */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(rgba(215,255,0,0.3) 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="relative z-10 flex flex-col items-center max-w-sm">
                  <div className="w-16 h-16 rounded-2xl bg-[#D7FF00] text-[#07182B] flex items-center justify-center mb-4 shadow-xl shadow-[#D7FF00]/20">
                    <Building className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Star Printers & Signage Works
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    Visitors and project management delegations are welcome at our fabrication plant for live material sample inspections.
                  </p>
                  <a
                    href={SITE_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D7FF00] hover:bg-[#cbf500] text-[#07182B] font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#D7FF00]/20"
                  >
                    <span>Get Driving Directions</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
