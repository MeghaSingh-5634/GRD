"use client";

import React, { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Lock, Paperclip, AlertCircle } from "lucide-react";
import { INDUSTRY_OPTIONS } from "@/data/siteData";

const SERVICE_OPTIONS = [
  "Corporate Signage",
  "Indoor & Outdoor Signage",
  "Institutional Signage",
  "Retail Branding",
  "Large-Format Printing",
  "Fabrication & Installation",
  "Complete Project",
  "Other",
];

const BUDGET_OPTIONS = [
  "Not yet decided",
  "Below ₹1 lakh",
  "₹1 lakh – ₹5 lakh",
  "₹5 lakh – ₹15 lakh",
  "₹15 lakh – ₹50 lakh",
  "₹50 lakh+",
];

const MAX_FILE_BYTES = 10 * 1024 * 1024;

const EMPTY = {
  fullName: "",
  companyName: "",
  businessEmail: "",
  contactNumber: "",
  industry: "",
  serviceRequired: "",
  projectLocation: "",
  projectBudget: "",
  projectDescription: "",
  website_source_hp: "",
};

type Field = keyof typeof EMPTY;

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-[11px] font-bold text-[#0B1E36] mb-1">
      {children}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );
}

function Err({ msg }: { msg?: string }) {
  return msg ? <p className="mt-0.5 text-[10px] font-medium text-red-500">{msg}</p> : null;
}

interface EnquiryCardProps {
  onOpenPrivacyPolicy: () => void;
}

export default function EnquiryCard({ onOpenPrivacyPolicy }: EnquiryCardProps) {
  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<Field | "file", string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; text: string; id?: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as Field]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const er: typeof errors = {};
    if (!form.fullName.trim()) er.fullName = "Required";
    if (!form.companyName.trim()) er.companyName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.businessEmail)) er.businessEmail = "Enter a valid email";
    if (form.contactNumber.replace(/[^0-9]/g, "").length < 9) er.contactNumber = "Enter a valid phone number";
    if (!form.industry) er.industry = "Required";
    if (!form.serviceRequired) er.serviceRequired = "Required";
    if (!form.projectLocation.trim()) er.projectLocation = "Required";
    if (form.projectDescription.trim().length < 10) er.projectDescription = "Please add a few details (min 10 characters)";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (f && f.size > MAX_FILE_BYTES) {
      setErrors((er) => ({ ...er, file: "File is larger than 10 MB" }));
      setFile(null);
      e.target.value = "";
      return;
    }
    setErrors((er) => ({ ...er, file: undefined }));
    setFile(f);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !validate()) return;
    setSubmitting(true);
    setResult(null);
    try {
      const data = new FormData();
      (Object.keys(form) as Field[]).forEach((k) => data.append(k, form[k]));
      if (file) data.append("drawingFile", file);
      const res = await fetch("/api/lead", { method: "POST", body: data });
      const json = await res.json();
      if (res.ok && json.success) {
        setResult({ ok: true, text: "Thank you! Our team will get in touch within 24 business hours.", id: json.enquiryId });
        setForm(EMPTY);
        setFile(null);
        if (fileRef.current) fileRef.current.value = "";
      } else {
        setResult({ ok: false, text: json.error || "Could not submit your enquiry. Please try again." });
      }
    } catch {
      setResult({ ok: false, text: "Network error. Please call or WhatsApp us directly." });
    } finally {
      setSubmitting(false);
    }
  };

  const input =
    "w-full h-9 px-2.5 rounded border bg-white text-[13px] text-[#0B1E36] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D7FF00] focus:border-[#0B1E36]";
  const border = (k: Field) => (errors[k] ? "border-red-400" : "border-slate-300");

  return (
    <div id="contact" className="rounded-xl overflow-hidden shadow-2xl border border-slate-200 bg-[#0B1E36] scroll-mt-24">
      <div className="px-5 pt-5 pb-4 text-white">
        <h2 className="text-2xl font-extrabold tracking-tight">Have a Project in Mind?</h2>
        <p className="text-[13px] text-slate-300 mt-1 leading-snug">
          Tell us about your requirement and our team will get in touch to discuss the best solution.
        </p>
      </div>

      <form onSubmit={submit} noValidate className="bg-white mx-2 mb-2 rounded-lg p-4 space-y-3">
        {/* Honeypot (hidden from people, catches bots) */}
        <input
          type="text"
          name="website_source_hp"
          value={form.website_source_hp}
          onChange={set}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="eq-name" required>Full Name</Label>
            <input id="eq-name" name="fullName" value={form.fullName} onChange={set} className={`${input} ${border("fullName")}`} autoComplete="name" />
            <Err msg={errors.fullName} />
          </div>
          <div>
            <Label htmlFor="eq-company" required>Company / Organization</Label>
            <input id="eq-company" name="companyName" value={form.companyName} onChange={set} className={`${input} ${border("companyName")}`} autoComplete="organization" />
            <Err msg={errors.companyName} />
          </div>
          <div>
            <Label htmlFor="eq-email" required>Business Email</Label>
            <input id="eq-email" type="email" name="businessEmail" value={form.businessEmail} onChange={set} className={`${input} ${border("businessEmail")}`} autoComplete="email" />
            <Err msg={errors.businessEmail} />
          </div>
          <div>
            <Label htmlFor="eq-phone" required>Phone Number</Label>
            <input id="eq-phone" type="tel" name="contactNumber" value={form.contactNumber} onChange={set} className={`${input} ${border("contactNumber")}`} autoComplete="tel" />
            <Err msg={errors.contactNumber} />
          </div>
          <div>
            <Label htmlFor="eq-industry" required>Industry</Label>
            <select id="eq-industry" name="industry" value={form.industry} onChange={set} className={`${input} ${border("industry")}`}>
              <option value="">Select Industry</option>
              {INDUSTRY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
            <Err msg={errors.industry} />
          </div>
          <div>
            <Label htmlFor="eq-service" required>Service Required</Label>
            <select id="eq-service" name="serviceRequired" value={form.serviceRequired} onChange={set} className={`${input} ${border("serviceRequired")}`}>
              <option value="">Select Service</option>
              {SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
            <Err msg={errors.serviceRequired} />
          </div>
          <div>
            <Label htmlFor="eq-location" required>Project Location</Label>
            <input id="eq-location" name="projectLocation" value={form.projectLocation} onChange={set} className={`${input} ${border("projectLocation")}`} />
            <Err msg={errors.projectLocation} />
          </div>
          <div>
            <Label htmlFor="eq-budget">Approx. Budget</Label>
            <select id="eq-budget" name="projectBudget" value={form.projectBudget} onChange={set} className={`${input} border-slate-300`}>
              <option value="">Select</option>
              {BUDGET_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="eq-desc" required>Project Description</Label>
          <textarea
            id="eq-desc"
            name="projectDescription"
            value={form.projectDescription}
            onChange={set}
            rows={3}
            placeholder="Share your requirement, scope, quantity or timeline..."
            className={`${input} h-auto py-2 resize-none ${border("projectDescription")}`}
          />
          <Err msg={errors.projectDescription} />
        </div>

        <div>
          <label
            htmlFor="eq-file"
            className="flex items-center gap-2.5 px-3 py-2 rounded border border-dashed border-slate-300 hover:border-[#0B1E36] cursor-pointer"
          >
            <Paperclip className="w-4 h-4 text-[#16A34A] shrink-0" />
            <span className="text-[11px] leading-tight text-[#0B1E36]">
              <span className="font-semibold block">{file ? file.name : "Upload Drawings / BOQ / Reference (Optional)"}</span>
              <span className="text-slate-500">PDF, JPG, PNG (Max 10 MB)</span>
            </span>
          </label>
          <input id="eq-file" ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={onFile} className="sr-only" />
          <Err msg={errors.file} />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-md bg-[#D7FF00] hover:bg-[#cbf500] disabled:opacity-60 text-[#07182B] text-sm font-extrabold transition cursor-pointer"
        >
          {submitting ? "Submitting…" : "Submit Project Enquiry"}
          {!submitting && <ArrowRight className="w-4 h-4" />}
        </button>

        {result && (
          <div
            role="status"
            className={`flex items-start gap-2 p-2.5 rounded text-xs ${result.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"}`}
          >
            {result.ok ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>
              {result.text}
              {result.id && <span className="block font-bold mt-0.5">Reference: {result.id}</span>}
            </span>
          </div>
        )}

        <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <Lock className="w-3 h-3" />
          Your information is secure with us. Read our
          <button type="button" onClick={onOpenPrivacyPolicy} className="font-semibold text-[#0B1E36] underline-offset-2 hover:underline cursor-pointer">
            Privacy Policy
          </button>
        </p>
      </form>
    </div>
  );
}
