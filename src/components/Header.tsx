"use client";

import React, { useState, useEffect } from "react";
import StarLogo from "./StarLogo";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { SERVICES_LIST, FOOTER_INDUSTRIES, COMPANY_PROFILE_PDF } from "@/data/siteData";

interface HeaderProps {
  onQuoteClick: () => void;
}

interface NavItem {
  name: string;
  href: string;
  children?: { name: string; href: string; external?: boolean }[];
}

const NAV: NavItem[] = [
  { name: "Home", href: "#hero" },
  { name: "About Us", href: "#about" },
  {
    name: "Services",
    href: "#services",
    children: SERVICES_LIST.map((s) => ({ name: s.title, href: "#services" })),
  },
  {
    name: "Industries",
    href: "#projects",
    children: FOOTER_INDUSTRIES.map((i) => ({ name: i, href: "#projects" })),
  },
  {
    name: "Projects",
    href: "#projects",
    children: [
      { name: "GRD University", href: "#projects" },
      { name: "Planet Fashion", href: "#projects" },
      { name: "Other Projects", href: "#projects" },
    ],
  },
  { name: "Capabilities", href: "#capabilities" },
  { name: "Quality & Process", href: "#process" },
  {
    name: "Resources",
    href: "#credentials",
    children: [
      { name: "Company Profile (PDF)", href: COMPANY_PROFILE_PDF, external: true },
      { name: "Vendor Credentials", href: "#credentials" },
      { name: "Client Testimonials", href: "#testimonials" },
    ],
  },
  { name: "Contact", href: "#contact" },
];

export default function Header({ onQuoteClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name?: string) => {
    if (!href.startsWith("#")) return; // let real links (PDF) behave normally
    e.preventDefault();
    setMobileMenuOpen(false);
    if (name) setActive(name);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#07182B]/95 backdrop-blur-md shadow-xl py-2.5 border-b border-white/10" : "bg-[#07182B]/70 backdrop-blur-sm py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <a href="#hero" onClick={(e) => go(e, "#hero", "Home")} className="flex items-center shrink-0">
            <StarLogo />
          </a>

          {/* Desktop navigation */}
          <nav className="hidden xl:flex items-center gap-6" aria-label="Main">
            {NAV.map((link) => (
              <div key={link.name} className="relative group">
                <a
                  href={link.href}
                  onClick={(e) => go(e, link.href, link.name)}
                  className={`relative flex items-center gap-1 py-2 text-[13px] font-semibold transition-colors ${
                    active === link.name ? "text-white" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.name}
                  {link.children && <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />}
                  {active === link.name && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#D7FF00] rounded-full" />
                  )}
                </a>
                {link.children && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all">
                    <div className="min-w-[230px] rounded-xl bg-[#0D1F34] border border-white/10 shadow-2xl p-2">
                      {link.children.map((c) => (
                        <a
                          key={c.name}
                          href={c.href}
                          target={c.external ? "_blank" : undefined}
                          rel={c.external ? "noopener noreferrer" : undefined}
                          onClick={(e) => go(e, c.href, link.name)}
                          className="block px-3 py-2 rounded-lg text-[13px] font-medium text-slate-200 hover:bg-white/5 hover:text-[#D7FF00]"
                        >
                          {c.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onQuoteClick}
              className="hidden sm:flex px-5 py-2.5 rounded-lg font-bold text-[13px] text-[#07182B] bg-[#D7FF00] hover:bg-[#cbf500] active:scale-95 transition-all shadow-md shadow-[#D7FF00]/20 items-center gap-2 group cursor-pointer"
            >
              <span>Request a Quotation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-[#10243B] text-slate-200 hover:text-white border border-white/10"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#07182B] border-b border-white/10 px-4 pt-4 pb-6 mt-3 shadow-2xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {NAV.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => go(e, link.href, link.name)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-200 hover:text-white hover:bg-[#10243B] transition"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onQuoteClick();
              }}
              className="mt-3 w-full py-3 rounded-xl font-bold text-sm text-[#07182B] bg-[#D7FF00] flex items-center justify-center gap-2"
            >
              <span>Request a Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
