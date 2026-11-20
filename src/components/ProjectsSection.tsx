"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Landmark, MapPin, Sparkles } from "lucide-react";
import { FEATURED_PROJECTS, FeaturedProject, SHOWCASE_TABS, ShowcaseTab } from "@/data/siteData";
import { getSafeImageUrl } from "@/utils/imageUtils";
import { GrdShield, PlanetFashionMark, SectionLabel } from "./ui";

interface ProjectsSectionProps {
  projects?: FeaturedProject[];
  onViewAllProjects: () => void;
  onOpenLightbox: (imageUrl: string, title: string, caption: string) => void;
}

const FEATURED_CLIENTS = ["grd university", "planet fashion"];

export default function ProjectsSection({ projects, onViewAllProjects, onOpenLightbox }: ProjectsSectionProps) {
  const cmsProjects = projects && projects.length > 0 ? projects : FEATURED_PROJECTS;

  // "Other Projects" tab is built from the CMS list (everything except the two featured clients).
  const tabs: ShowcaseTab[] = useMemo(() => {
    const others = cmsProjects
      .filter((p) => !FEATURED_CLIENTS.includes(p.clientName.trim().toLowerCase()))
      .map((p) => ({
        image: getSafeImageUrl(p.image, "/images/hero-grd-building.jpg"),
        client: p.clientName,
        title: p.category,
        description:
          (p as FeaturedProject & { description?: string }).description ||
          `${p.category} executed by Star Printers & Signage.`,
        industry: p.category,
        location: p.location || "India",
      }));
    return others.length > 0
      ? [...SHOWCASE_TABS, { id: "other", label: "Other Projects", logo: "other" as const, slides: others }]
      : SHOWCASE_TABS;
  }, [cmsProjects]);

  const [tabIndex, setTabIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const tab = tabs[Math.min(tabIndex, tabs.length - 1)];
  const slides = tab.slides;
  const slide = slides[Math.min(slideIndex, slides.length - 1)];

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(() => setSlideIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [paused, slides.length, tabIndex]);

  const prev = () => setSlideIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setSlideIndex((i) => (i + 1) % slides.length);

  const tabIcon = (logo: ShowcaseTab["logo"]) =>
    logo === "grd" ? <GrdShield size={16} /> : logo === "planet-fashion" ? <PlanetFashionMark /> : <Sparkles className="w-4 h-4" />;

  // Show up to 3 thumbnails, starting from the active slide.
  const thumbs = slides.length <= 3 ? slides.map((s, i) => ({ s, i })) : [0, 1, 2].map((o) => {
    const i = (slideIndex + o) % slides.length;
    return { s: slides[i], i };
  });

  return (
    <section id="projects" className="bg-[#0B1E36] py-12 lg:py-14 text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-6 items-start">
          {/* Left intro */}
          <div className="lg:pt-2">
            <SectionLabel dark>Featured Projects</SectionLabel>
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight mb-4">
              Our Work <br className="hidden lg:block" />
              Speaks for Itself.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Explore our key projects and see how we deliver impactful brand spaces.
            </p>
            <button
              onClick={onViewAllProjects}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-[13px] text-[#07182B] bg-[#D7FF00] hover:bg-[#cbf500] active:scale-95 transition-all cursor-pointer"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div>
            {/* Client tabs */}
            <div role="tablist" className="flex flex-wrap gap-2 mb-3">
              {tabs.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={i === tabIndex}
                  onClick={() => {
                    setTabIndex(i);
                    setSlideIndex(0);
                  }}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-bold border transition-colors cursor-pointer ${
                    i === tabIndex
                      ? "bg-[#D7FF00] text-[#07182B] border-[#D7FF00]"
                      : "bg-[#10243B] text-white border-white/15 hover:border-white/40"
                  }`}
                >
                  {tabIcon(t.logo)}
                  {t.label}
                </button>
              ))}
            </div>

            <div
              className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr_110px] gap-5 items-stretch"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Slideshow */}
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/15 bg-black">
                {slides.map((s, i) => (
                  <div
                    key={`${tab.id}-${i}`}
                    className={`absolute inset-0 transition-opacity duration-700 ${i === slideIndex ? "opacity-100" : "opacity-0"}`}
                  >
                    <Image
                      src={s.image}
                      alt={`${s.client} – ${s.title}`}
                      fill
                      className="object-cover cursor-zoom-in"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      onClick={() => onOpenLightbox(s.image, s.client, s.title)}
                    />
                  </div>
                ))}
                {slides.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 border-2 border-[#D7FF00] text-[#D7FF00] flex items-center justify-center hover:bg-[#D7FF00] hover:text-[#07182B] transition cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 border-2 border-white text-white flex items-center justify-center hover:bg-white hover:text-[#07182B] transition cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSlideIndex(i)}
                          aria-label={`Show image ${i + 1}`}
                          className={`w-2 h-2 rounded-full transition cursor-pointer ${i === slideIndex ? "bg-[#D7FF00]" : "bg-white/60"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Info panel */}
              <div className="flex flex-col justify-center">
                <span className="self-start px-2.5 py-1 rounded bg-[#D7FF00] text-[#07182B] text-[11px] font-bold mb-3">
                  {slide.client}
                </span>
                <h3 className="text-xl font-extrabold leading-snug mb-2">{slide.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">{slide.description}</p>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-200 mb-5">
                  <span className="inline-flex items-center gap-1.5">
                    <Landmark className="w-4 h-4" />
                    {slide.industry}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {slide.location}
                  </span>
                </div>
                <button
                  onClick={() => onOpenLightbox(slide.image, slide.client, slide.title)}
                  className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white text-[#07182B] text-[13px] font-bold hover:bg-[#D7FF00] transition cursor-pointer"
                >
                  View Project Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="hidden lg:flex flex-col gap-3">
                {thumbs.map(({ s, i }) => (
                  <button
                    key={`${tab.id}-thumb-${i}`}
                    onClick={() => setSlideIndex(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={`relative flex-1 min-h-[60px] rounded-md overflow-hidden border-2 transition cursor-pointer ${
                      i === slideIndex ? "border-[#D7FF00]" : "border-white/20 hover:border-white/60"
                    }`}
                  >
                    <Image src={s.image} alt="" fill className="object-cover" sizes="110px" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
