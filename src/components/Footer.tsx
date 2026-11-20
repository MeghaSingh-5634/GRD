"use client";

import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import StarLogo from "./StarLogo";
import { LinkedInIcon, InstagramIcon, YouTubeIcon } from "./ui";
import { SITE_CONFIG, SERVICES_LIST, FOOTER_INDUSTRIES, SOCIAL_LINKS } from "@/data/siteData";

interface FooterProps {
  onOpenPrivacyPolicy: () => void;
  onOpenTerms: () => void;
}

const QUICK_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About Us", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Capabilities", href: "#capabilities" },
];

const SOCIALS = [
  { name: "LinkedIn", href: SOCIAL_LINKS.linkedin, Icon: LinkedInIcon },
  { name: "Instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { name: "YouTube", href: SOCIAL_LINKS.youtube, Icon: YouTubeIcon },
].filter((s) => s.href);

export default function Footer({ onOpenPrivacyPolicy, onOpenTerms }: FooterProps) {
  const year = new Date().getFullYear();

  const heading = "text-sm font-bold text-white mb-3";
  const link = "text-[13px] text-slate-300 hover:text-[#D7FF00] transition-colors";

  return (
    <footer className="bg-[#07182B] text-slate-300 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr_1.3fr] gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <StarLogo />
            <p className="mt-3 text-[13px] leading-relaxed max-w-xs">
              Corporate signage, printing, fabrication and installation solutions for institutions, retail and commercial
              spaces.
            </p>
          </div>

          <div>
            <h3 className={heading}>Quick Links</h3>
            <ul className="space-y-1.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className={link}>{l.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={heading}>Our Services</h3>
            <ul className="space-y-1.5">
              {SERVICES_LIST.map((s) => (
                <li key={s.id}>
                  <a href="#services" className={link}>{s.serviceOption}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={heading}>Industries</h3>
            <ul className="space-y-1.5">
              {FOOTER_INDUSTRIES.map((i) => (
                <li key={i}>
                  <a href="#projects" className={link}>{i}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className={heading}>Contact Us</h3>
            <ul className="space-y-2.5 text-[13px]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-white shrink-0" />
                <a href={SITE_CONFIG.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={link}>
                  Dehradun, Uttarakhand
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className={link}>{SITE_CONFIG.displayPhone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className={link}>{SITE_CONFIG.email}</a>
              </li>
            </ul>
            {SOCIALS.length > 0 && (
              <div className="flex gap-3 mt-4">
                {SOCIALS.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="w-8 h-8 rounded-md border border-white/20 flex items-center justify-center text-white hover:text-[#07182B] hover:bg-[#D7FF00] transition"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-20 md:pb-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <span>© {year} Star Printers &amp; Signage. All Rights Reserved.</span>
          <div className="flex items-center gap-3">
            <button onClick={onOpenPrivacyPolicy} className="hover:text-white cursor-pointer">Privacy Policy</button>
            <span className="text-white/30">|</span>
            <button onClick={onOpenTerms} className="hover:text-white cursor-pointer">Terms &amp; Conditions</button>
            <span className="text-white/30">|</span>
            <a href="/sitemap.xml" className="hover:text-white">Sitemap</a>
            <span className="text-white/30">|</span>
            <a href="/admin" className="hover:text-[#D7FF00]">Admin</a>
          </div>
          <span className="text-sm font-bold text-white">
            Building Brands. <span className="text-[#D7FF00]">Together.</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
