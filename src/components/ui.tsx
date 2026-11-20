import React from "react";

/** Small uppercase eyebrow label with a lime/green dash, used above section headings. */
export function SectionLabel({
  children,
  dark = false,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider mb-1.5 ${
        dark ? "text-[#D7FF00]" : "text-[#15803D]"
      } ${className}`}
    >
      <span className={`w-6 h-[3px] rounded-full ${dark ? "bg-[#D7FF00]" : "bg-[#C6EB00]"}`} />
      <span>{children}</span>
    </div>
  );
}

export function GrdShield({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 28 34" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M14 0L28 4V18C28 26 14 34 14 34C14 34 0 26 0 18V4L14 0Z" fill="#8B1E1E" />
      <path d="M14 3L25 6V17C25 24 14 30.5 14 30.5C14 30.5 3 24 3 17V6L14 3Z" stroke="#EAB308" strokeWidth="1.5" />
      <path d="M14 8L16 14H22L17 18L19 24L14 20L9 24L11 18L6 14H12L14 8Z" fill="#EAB308" />
    </svg>
  );
}

export function GrdLogo({ light = false, size = 28 }: { light?: boolean; size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <GrdShield size={size} />
      <div className="flex flex-col text-left leading-none">
        <span className={`text-base font-black tracking-tight ${light ? "text-white" : "text-[#07182B]"}`}>GRD</span>
        <span className={`text-[9px] font-bold tracking-wider ${light ? "text-slate-300" : "text-slate-700"}`}>
          UNIVERSITY
        </span>
      </div>
    </div>
  );
}

export function PlanetFashionMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex w-5 h-6 items-center justify-center font-serif text-base font-black italic border-r-2 border-current pr-0.5 ${className}`}
      aria-hidden="true"
    >
      P
    </span>
  );
}

/* ---------- Brand icons (lucide v1 ships without brand logos) ---------- */

type IconProps = { className?: string };

export function WhatsAppIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.45 9.43m8.04-17.47A11.3 11.3 0 0 0 12.04.7C5.77.7.67 5.8.67 12.06c0 2 .52 3.96 1.52 5.68L.57 23.7l6.09-1.6a11.33 11.33 0 0 0 5.38 1.37h.01c6.26 0 11.36-5.1 11.37-11.36 0-3.04-1.18-5.89-3.33-8.04" />
    </svg>
  );
}

export function LinkedInIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YouTubeIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
    </svg>
  );
}
