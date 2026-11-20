"use client";

import React, { useEffect } from "react";
import { X, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteData";

interface LegalModalProps {
  isOpen: boolean;
  type: "privacy" | "terms";
  onClose: () => void;
}

export default function LegalModal({ isOpen, type, onClose }: LegalModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0D1F34] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto text-slate-300">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2 text-white">
            <ShieldCheck className="w-5 h-5 text-[#D7FF00]" />
            <h3 className="text-xl font-bold">
              {type === "privacy" ? "Corporate Privacy Policy" : "Terms of Service & Engineering Agreements"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#10243B] text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
          {type === "privacy" ? (
            <>
              <p>
                At <strong>{SITE_CONFIG.companyName}</strong>, we treat commercial, institutional, and proprietary client specifications with absolute confidentiality.
              </p>
              <h4 className="text-white font-bold text-base mt-4">1. Information Collection</h4>
              <p>
                We collect business contact information (including names, enterprise email addresses, corporate phone numbers, site locations, and architectural plans/drawings) submitted exclusively for the purpose of drafting Bill of Quantities (BOQ), commercial estimates, and technical feasibility reports.
              </p>
              <h4 className="text-white font-bold text-base mt-4">2. Non-Disclosure & Intellectual Property</h4>
              <p>
                All engineering drawings, CAD files, structural layouts, and site specifications uploaded through our platform remain the exclusive intellectual property of the submitting organization. We never sell, rent, or lease corporate partner data.
              </p>
              <h4 className="text-white font-bold text-base mt-4">3. Data Security & Storage</h4>
              <p>
                Transmitted enquiry records are processed across encrypted channels. Project files are strictly accessible only to designated project estimators, structural engineers, and operations managers.
              </p>
              <h4 className="text-white font-bold text-base mt-4">4. Direct Inquiries</h4>
              <p>
                For questions regarding data confidentiality or to execute a formal Non-Disclosure Agreement (NDA) prior to file sharing, please email{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#D7FF00] underline">
                  {SITE_CONFIG.email}
                </a>.
              </p>
            </>
          ) : (
            <>
              <p>
                These Terms govern corporate quotation requests, site survey bookings, and turnkey fabrication agreements with <strong>{SITE_CONFIG.companyName}</strong>.
              </p>
              <h4 className="text-white font-bold text-base mt-4">1. Quotations & Validity</h4>
              <p>
                Commercial estimates and BOQ pricing remain valid for 30 calendar days from the date of issuance due to fluctuating raw material indices (such as aluminum, acrylic, stainless steel, and LED modules).
              </p>
              <h4 className="text-white font-bold text-base mt-4">2. Site Surveys & Structural Approvals</h4>
              <p>
                Final manufacturing commences only after physical laser dimension verification and written client sign-off on artwork proofs, Pantone color swatches, and structural mounting details.
              </p>
              <h4 className="text-white font-bold text-base mt-4">3. Electrical & Warranty Coverage</h4>
              <p>
                All illuminated LED systems carry manufacturer-backed replacement warranties ranging from 2 to 5 years, contingent upon specified power supply specifications and electrical surge suppression.
              </p>
            </>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#D7FF00] text-[#07182B] font-bold text-xs uppercase tracking-wider hover:bg-[#cbf500] transition"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
