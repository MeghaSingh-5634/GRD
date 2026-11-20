"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Phone,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/siteData";

interface LeadFormProps {
  preselectedService?: string;
  onOpenPrivacyPolicy: () => void;
}

export default function LeadForm({
  preselectedService,
  onOpenPrivacyPolicy,
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    businessEmail: "",
    contactNumber: "",
    designation: "",
    projectLocation: "",
    serviceRequired: "Corporate Signage",
    projectBudget: "Not yet decided",
    projectDescription: "",
    website_source_hp: "", // Honeypot field for bot spam detection
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
    enquiryId?: string;
  } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        serviceRequired: preselectedService,
        projectDescription: prev.projectDescription || `Requirement for ${preselectedService}: `,
      }));
    }
  }, [preselectedService]);

  const serviceOptions = [
    "Corporate Signage",
    "Indoor & Outdoor Signage",
    "Institutional Signage",
    "Retail Branding",
    "Large-Format Printing",
    "Fabrication & Installation",
    "Complete Project",
    "Other",
  ];

  const budgetOptions = [
    "Not yet decided",
    "Below ₹1 lakh",
    "₹1 lakh – ₹5 lakh",
    "₹5 lakh – ₹15 lakh",
    "₹15 lakh – ₹50 lakh",
    "₹50 lakh+",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);

    if (file) {
      // Validate file size: 15MB limit
      if (file.size > 15 * 1024 * 1024) {
        setFileError("File size exceeds 15MB. Please upload a smaller document.");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) errors.fullName = "Full name is required.";
    if (!formData.companyName.trim()) errors.companyName = "Organization or company name is required.";
    if (!formData.businessEmail.trim()) {
      errors.businessEmail = "Business email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      errors.businessEmail = "Please enter a valid email address.";
    }
    if (!formData.contactNumber.trim()) {
      errors.contactNumber = "Phone number is required.";
    } else if (formData.contactNumber.replace(/[^0-9]/g, "").length < 9) {
      errors.contactNumber = "Please enter a valid phone number (min 9 digits).";
    }
    if (!formData.projectLocation.trim()) errors.projectLocation = "Project site location / city is required.";
    if (!formData.projectDescription.trim() || formData.projectDescription.length < 10) {
      errors.projectDescription = "Please provide project details (minimum 10 characters).";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("companyName", formData.companyName);
      data.append("businessEmail", formData.businessEmail);
      data.append("contactNumber", formData.contactNumber);
      data.append("designation", formData.designation);
      data.append("projectLocation", formData.projectLocation);
      data.append("serviceRequired", formData.serviceRequired);
      data.append("projectBudget", formData.projectBudget);
      data.append("projectDescription", formData.projectDescription);
      data.append("website_source_hp", formData.website_source_hp);

      if (selectedFile) {
        data.append("drawingFile", selectedFile);
      }

      const res = await fetch("/api/lead", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatusMessage({
          type: "success",
          text: result.message || "Your enquiry has been logged successfully.",
          enquiryId: result.enquiryId,
        });

        // Reset form
        setFormData({
          fullName: "",
          companyName: "",
          businessEmail: "",
          contactNumber: "",
          designation: "",
          projectLocation: "",
          serviceRequired: "Corporate Signage",
          projectBudget: "Not yet decided",
          projectDescription: "",
          website_source_hp: "",
        });
        setSelectedFile(null);
      } else {
        setStatusMessage({
          type: "error",
          text: result.error || "Failed to submit enquiry. Please check fields or reach out via WhatsApp.",
        });
      }
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: "Network error while connecting to server. Please contact us directly via WhatsApp or phone.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappDirectUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappPrefilledMessage
  )}`;

  return (
    <section id="lead-form" className="relative py-20 lg:py-28 bg-[#07182B] text-white overflow-hidden">
      {/* Background glow & accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#10243B] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#D7FF00]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading, Value Proposition & Quick Alternative CTAs */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10243B] border border-white/10 text-xs font-semibold text-[#D7FF00] uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Project Procurement</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Have a Project in Mind?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              Tell us about your signage, printing or branding requirements. Our corporate project engineering team will review your specifications and contact you within 24 business hours.
            </p>

            {/* Direct Instant Channels Card */}
            <div className="rounded-2xl bg-[#0D1F34] border border-white/10 p-6 space-y-4 mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Direct Channels for Fast BOQ & Site Surveys:
              </h3>

              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-[#27DC75]/10 hover:bg-[#27DC75]/20 border border-[#27DC75]/30 text-white transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#27DC75] text-[#07182B] flex items-center justify-center font-bold">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#27DC75] font-bold uppercase tracking-wider block">
                      Fastest Response
                    </span>
                    <span className="text-sm font-bold text-white">Chat on WhatsApp</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#27DC75] group-hover:translate-x-1 transition-transform">
                  Connect →
                </span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center justify-between p-4 rounded-xl bg-[#10243B] hover:bg-[#152B44] border border-white/10 text-white transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#D7FF00] text-[#07182B] flex items-center justify-center font-bold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium block">
                      Direct Project Desk
                    </span>
                    <span className="text-sm font-bold text-white">{SITE_CONFIG.displayPhone}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-300 group-hover:translate-x-1 transition-transform">
                  Call Now →
                </span>
              </a>
            </div>

            {/* Privacy & Confidentiality Guarantee */}
            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#D7FF00] shrink-0 mt-0.5" />
              <span>
                All blueprints, architectural drawings, and BOQs are held strictly confidential. Non-Disclosure Agreements (NDAs) signed upon request.
              </span>
            </div>
          </div>

          {/* Right Column: High-Conversion Lead Form */}
          <div className="lg:col-span-7 bg-[#0D1F34] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {statusMessage?.type === "success" ? (
              <div className="py-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#27DC75]/20 text-[#27DC75] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Enquiry Registered!</h3>
                <p className="text-slate-300 text-sm max-w-md mb-4">{statusMessage.text}</p>
                <div className="inline-block px-4 py-2 rounded-xl bg-[#07182B] border border-white/10 font-mono text-xs text-[#D7FF00] mb-6">
                  Reference ID: {statusMessage.enquiryId}
                </div>
                <button
                  onClick={() => setStatusMessage(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#10243B] hover:bg-[#152B44] text-xs font-bold uppercase tracking-wider text-white transition"
                >
                  Submit Another Project Requirement
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot field (hidden from real users) */}
                <input
                  type="text"
                  name="website_source_hp"
                  value={formData.website_source_hp}
                  onChange={handleInputChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {statusMessage?.type === "error" && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <span>{statusMessage.text}</span>
                  </div>
                )}

                {/* 2-Column Row 1: Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Full Name <span className="text-[#D7FF00]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Ramesh Krishnan"
                      className={`w-full px-4 py-3 rounded-xl bg-[#07182B] border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D7FF00] transition ${
                        fieldErrors.fullName ? "border-red-500" : "border-white/10"
                      }`}
                    />
                    {fieldErrors.fullName && (
                      <span className="text-[11px] text-red-400 mt-1 block">
                        {fieldErrors.fullName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Company / Organization <span className="text-[#D7FF00]">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="e.g. Prestige Tech Park / GRD Group"
                      className={`w-full px-4 py-3 rounded-xl bg-[#07182B] border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D7FF00] transition ${
                        fieldErrors.companyName ? "border-red-500" : "border-white/10"
                      }`}
                    />
                    {fieldErrors.companyName && (
                      <span className="text-[11px] text-red-400 mt-1 block">
                        {fieldErrors.companyName}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2-Column Row 2: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Business Email <span className="text-[#D7FF00]">*</span>
                    </label>
                    <input
                      type="email"
                      name="businessEmail"
                      value={formData.businessEmail}
                      onChange={handleInputChange}
                      placeholder="name@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-[#07182B] border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D7FF00] transition ${
                        fieldErrors.businessEmail ? "border-red-500" : "border-white/10"
                      }`}
                    />
                    {fieldErrors.businessEmail && (
                      <span className="text-[11px] text-red-400 mt-1 block">
                        {fieldErrors.businessEmail}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Contact Number <span className="text-[#D7FF00]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 rounded-xl bg-[#07182B] border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D7FF00] transition ${
                        fieldErrors.contactNumber ? "border-red-500" : "border-white/10"
                      }`}
                    />
                    {fieldErrors.contactNumber && (
                      <span className="text-[11px] text-red-400 mt-1 block">
                        {fieldErrors.contactNumber}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2-Column Row 3: Designation & Project Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Designation <span className="text-slate-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      placeholder="e.g. Project Head / Architect"
                      className="w-full px-4 py-3 rounded-xl bg-[#07182B] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D7FF00] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Project Site Location / City <span className="text-[#D7FF00]">*</span>
                    </label>
                    <input
                      type="text"
                      name="projectLocation"
                      value={formData.projectLocation}
                      onChange={handleInputChange}
                      placeholder="e.g. Coimbatore, Chennai, Bengaluru"
                      className={`w-full px-4 py-3 rounded-xl bg-[#07182B] border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D7FF00] transition ${
                        fieldErrors.projectLocation ? "border-red-500" : "border-white/10"
                      }`}
                    />
                    {fieldErrors.projectLocation && (
                      <span className="text-[11px] text-red-400 mt-1 block">
                        {fieldErrors.projectLocation}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2-Column Row 4: Service & Budget Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Service Required <span className="text-[#D7FF00]">*</span>
                    </label>
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#07182B] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D7FF00] transition cursor-pointer"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#07182B] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Approximate Project Budget <span className="text-slate-500">(Optional)</span>
                    </label>
                    <select
                      name="projectBudget"
                      value={formData.projectBudget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#07182B] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D7FF00] transition cursor-pointer"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#07182B] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 5: Project Description */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Project Description & Dimensions <span className="text-[#D7FF00]">*</span>
                  </label>
                  <textarea
                    rows={3}
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    placeholder="Provide details about size, indoor/outdoor requirement, timeline, or site specifications..."
                    className={`w-full px-4 py-3 rounded-xl bg-[#07182B] border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D7FF00] transition ${
                      fieldErrors.projectDescription ? "border-red-500" : "border-white/10"
                    }`}
                  />
                  {fieldErrors.projectDescription && (
                    <span className="text-[11px] text-red-400 mt-1 block">
                      {fieldErrors.projectDescription}
                    </span>
                  )}
                </div>

                {/* Row 6: File Upload */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Upload Drawings / BOQ / Reference Images <span className="text-slate-500">(Optional, Max 15MB)</span>
                  </label>
                  <div className="relative border-2 border-dashed border-white/15 hover:border-[#D7FF00]/50 rounded-xl p-4 text-center cursor-pointer transition bg-[#07182B]/60 group">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.dwg,.dxf,.ai,.cdr,.eps,.jpg,.jpeg,.png,.zip"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#D7FF00] transition-colors" />
                      {selectedFile ? (
                        <div className="flex items-center gap-2 text-xs font-bold text-[#D7FF00]">
                          <FileText className="w-4 h-4" />
                          <span>
                            {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                      ) : (
                        <>
                          <span className="text-xs font-medium text-slate-300">
                            Click or drag architectural plans, elevations, or BOQ files here
                          </span>
                          <span className="text-[10px] text-slate-500">
                            PDF, DWG, DXF, AI, ZIP, JPG, PNG up to 15MB
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  {fileError && (
                    <span className="text-[11px] text-red-400 mt-1 block">{fileError}</span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider text-[#07182B] bg-[#D7FF00] hover:bg-[#cbf500] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#D7FF00]/25 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#07182B] border-t-transparent rounded-full animate-spin" />
                        Validating & Submitting Enquiry...
                      </span>
                    ) : (
                      <>
                        <span>Submit Project Enquiry</span>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>

                {/* Privacy Notice */}
                <p className="text-[11px] text-slate-400 text-center">
                  By submitting this form, you agree to our{" "}
                  <button
                    type="button"
                    onClick={onOpenPrivacyPolicy}
                    className="text-[#D7FF00] hover:underline focus:outline-none"
                  >
                    Privacy Policy
                  </button>
                  . We respect your business privacy and never share contact details.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
