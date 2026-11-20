"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  Calendar,
  Layers,
  ShieldCheck,
  Building,
  CheckCircle2,
  Tag,
  Sparkles,
} from "lucide-react";
import { CLIENT_DATA, ClientProfile, ProjectSlide } from "@/data/siteData";

interface ClientProjectTabsProps {
  selectedClientId: string;
  onSelectClient: (id: string) => void;
  onOpenLightbox: (imageUrl: string, title: string, caption: string) => void;
  onEnquireProject: (projectTitle: string) => void;
}

export default function ClientProjectTabs({
  selectedClientId,
  onSelectClient,
  onOpenLightbox,
  onEnquireProject,
}: ClientProjectTabsProps) {
  const tabsScrollRef = useRef<HTMLDivElement>(null);

  // Active client
  const activeClient: ClientProfile =
    CLIENT_DATA.find((c) => c.id === selectedClientId) || CLIENT_DATA[0];

  // Active slide index within the active client's projects
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Reset slide index when client changes
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [selectedClientId]);

  const activeProjects: ProjectSlide[] = activeClient.projects;
  const currentProject: ProjectSlide = activeProjects[currentSlideIndex] || activeProjects[0];

  // Slideshow navigation
  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % activeProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + activeProjects.length) % activeProjects.length);
  };

  // Autoplay functionality (pauses on hover)
  useEffect(() => {
    if (!isAutoPlaying || activeProjects.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlideIndex, activeProjects.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProjects.length]);

  return (
    <section id="projects" className="relative py-20 lg:py-28 bg-[#07182B] text-white overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#10243B] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#D7FF00]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10243B] border border-white/10 text-xs font-semibold text-[#D7FF00] uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Case Studies & Site Deployments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Our Work Speaks for Itself.
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
            Real projects. Real execution. Professional branding solutions for commercial and institutional environments.
          </p>
        </div>

        {/* Client Selection Tabs */}
        <div className="mb-10">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <span className="text-xs uppercase tracking-widest font-bold text-slate-400">
              Select Client Portfolio:
            </span>
            <span className="text-xs text-[#D7FF00] font-mono">
              {CLIENT_DATA.length} Verified Enterprise Clients Available
            </span>
          </div>

          <div
            ref={tabsScrollRef}
            className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2"
          >
            {CLIENT_DATA.map((client) => {
              const isActive = client.id === selectedClientId;
              return (
                <button
                  key={client.id}
                  onClick={() => onSelectClient(client.id)}
                  className={`relative flex items-center gap-3 px-6 py-4 rounded-xl border transition-all text-left shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-[#10243B] border-[#D7FF00] shadow-lg shadow-[#D7FF00]/10"
                      : "bg-[#0D1F34]/80 border-white/10 hover:border-white/20 hover:bg-[#10243B]/60"
                  }`}
                >
                  {/* Monogram Badge */}
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-xs transition-colors shrink-0 ${
                      isActive
                        ? "bg-[#D7FF00] text-[#07182B]"
                        : "bg-[#07182B] text-slate-300 border border-white/10"
                    }`}
                  >
                    {client.logoText.slice(0, 2)}
                  </div>

                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-bold tracking-tight ${
                        isActive ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {client.name}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {client.industry}
                    </span>
                  </div>

                  {/* Active Lime Indicator Bar */}
                  {isActive && (
                    <span className="absolute -bottom-[1px] left-4 right-4 h-0.5 bg-[#D7FF00] rounded-full shadow-sm" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Client Banner Brief */}
        <div className="bg-[#10243B]/60 border border-white/10 rounded-2xl p-4 sm:p-6 mb-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#07182B] bg-[#D7FF00] px-2 py-0.5 rounded">
                  CLIENT
                </span>
                <span className="text-white font-bold text-lg">{activeClient.name}</span>
                <span className="text-xs text-slate-400">• {activeClient.industry}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {activeClient.description}
              </p>
            </div>
            <button
              onClick={() => onEnquireProject(`Project Portfolio for ${activeClient.name}`)}
              className="px-5 py-2.5 rounded-xl bg-[#07182B] hover:bg-[#D7FF00] text-slate-200 hover:text-[#07182B] font-bold text-xs uppercase tracking-wider border border-white/10 hover:border-[#D7FF00] transition-all self-start md:self-center shrink-0"
            >
              Enquire For Similar Project →
            </button>
          </div>
        </div>

        {/* Main Gallery Slideshow Container */}
        <div
          className="relative bg-[#0D1F34] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Col: High-Res Project Image Viewer */}
            <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] bg-black">
              {currentProject && (
                <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[540px]">
                  <Image
                    src={currentProject.image}
                    alt={currentProject.title}
                    fill
                    className="object-cover transition-all duration-500"
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  {/* Subtle edge vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F34] via-transparent to-black/30 opacity-70" />

                  {/* Top Bar with Slide Counter & Lightbox Expand Button */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <div className="px-3.5 py-1.5 rounded-full bg-[#07182B]/85 backdrop-blur-md border border-white/15 text-xs font-mono font-bold text-white flex items-center gap-2">
                      <span className="text-[#D7FF00]">
                        0{currentSlideIndex + 1}
                      </span>
                      <span className="text-slate-500">/</span>
                      <span className="text-slate-400">
                        0{activeProjects.length}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        onOpenLightbox(
                          currentProject.image,
                          currentProject.title,
                          currentProject.description
                        )
                      }
                      className="p-2.5 rounded-full bg-[#07182B]/85 hover:bg-[#D7FF00] text-white hover:text-[#07182B] backdrop-blur-md border border-white/15 transition-all shadow-lg group"
                      title="View Full Screen Lightbox"
                    >
                      <Maximize2 className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </button>
                  </div>

                  {/* Previous / Next Floating Arrows Over Image */}
                  <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <button
                      onClick={prevSlide}
                      className="pointer-events-auto p-3 rounded-full bg-[#07182B]/80 hover:bg-[#D7FF00] text-white hover:text-[#07182B] border border-white/15 shadow-xl transition-all"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="pointer-events-auto p-3 rounded-full bg-[#07182B]/80 hover:bg-[#D7FF00] text-white hover:text-[#07182B] border border-white/15 shadow-xl transition-all"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Editorial Project Specification & Narrative */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-[#0D1F34] to-[#10243B]">
              <div>
                {/* Category & Verified Badge */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#D7FF00]/15 text-[#D7FF00] text-xs font-bold uppercase tracking-wider border border-[#D7FF00]/30">
                    {currentProject?.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold flex items-center gap-1 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Installation</span>
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
                  {currentProject?.title}
                </h3>

                {/* Location & Year Pills */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#D7FF00]" />
                    <span>{currentProject?.location}</span>
                  </div>
                  {currentProject?.year && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>Executed: {currentProject?.year}</span>
                    </div>
                  )}
                </div>

                {/* Narrative Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {currentProject?.description}
                </p>

                {/* Technical Materials / BOQ Specifications */}
                {currentProject?.materials && (
                  <div className="bg-[#07182B]/60 rounded-xl p-4 border border-white/10 mb-6">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D7FF00] mb-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Engineered Substrates & Hardware</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-normal">
                      {currentProject?.materials}
                    </p>
                  </div>
                )}

                {/* Tag Pills */}
                {currentProject?.tags && (
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {currentProject.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-medium text-slate-300 border border-white/10"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Thumbnail Strip & Navigation Controls */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                    Project Gallery Slides:
                  </span>
                  {/* Dot Indicators */}
                  <div className="flex items-center gap-1.5">
                    {activeProjects.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentSlideIndex
                            ? "w-6 bg-[#D7FF00]"
                            : "w-2 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Micro Thumbnails */}
                <div className="grid grid-cols-3 gap-2">
                  {activeProjects.map((proj, idx) => {
                    const isSelected = idx === currentSlideIndex;
                    return (
                      <button
                        key={proj.id}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition-all ${
                          isSelected
                            ? "border-[#D7FF00] ring-2 ring-[#D7FF00]/40"
                            : "border-white/10 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          fill
                          className="object-cover"
                          sizes="150px"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
