"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ClientStrip from "@/components/ClientStrip";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import AtAGlance from "@/components/AtAGlance";
import WhyChooseSection from "@/components/WhyChooseSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ProcessContactSection from "@/components/ProcessContactSection";
import Footer from "@/components/Footer";
import FloatingContactBar from "@/components/FloatingContactBar";
import LeadModal from "@/components/LeadModal";
import LightboxModal from "@/components/LightboxModal";
import LegalModal from "@/components/LegalModal";
import { FeaturedProject, HeroCarouselSlide } from "@/data/siteData";

export default function Home() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>("Corporate Signage");

  // CMS dynamic state
  const [cmsProjects, setCmsProjects] = useState<FeaturedProject[]>([]);
  const [cmsHeroSlides, setCmsHeroSlides] = useState<HeroCarouselSlide[]>([]);

  useEffect(() => {
    async function loadCms() {
      try {
        const res = await fetch("/api/cms");
        const json = await res.json();
        if (json.success && json.data) {
          if (json.data.projects && json.data.projects.length > 0) {
            setCmsProjects(json.data.projects);
          }
          if (json.data.heroSlides && json.data.heroSlides.length > 0) {
            setCmsHeroSlides(json.data.heroSlides);
          }
        }
      } catch (err) {
        console.error("Could not load dynamic CMS data:", err);
      }
    }
    loadCms();
  }, []);

  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    imageUrl: string;
    title: string;
    caption: string;
  }>({
    isOpen: false,
    imageUrl: "",
    title: "",
    caption: "",
  });

  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    type: "privacy" | "terms";
  }>({
    isOpen: false,
    type: "privacy",
  });

  const openQuoteModal = (serviceName?: string) => {
    if (serviceName) setPreselectedService(serviceName);
    setIsLeadModalOpen(true);
  };

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenLightbox = (imageUrl: string, title: string, caption: string) => {
    setLightbox({
      isOpen: true,
      imageUrl,
      title,
      caption,
    });
  };

  return (
    <main className="min-h-screen bg-[#07182B] text-slate-100 selection:bg-[#D7FF00] selection:text-[#07182B]">
      {/* Header & navigation */}
      <Header onQuoteClick={() => openQuoteModal()} />

      {/* Hero */}
      <HeroSection
        slides={cmsHeroSlides}
        onExploreProjects={scrollToProjects}
        onGetQuote={() => openQuoteModal()}
      />

      {/* Client logos */}
      <ClientStrip onSelectClient={scrollToProjects} />

      {/* Company at a glance */}
      <AtAGlance />

      {/* Services */}
      <ServicesSection onSelectService={(service) => openQuoteModal(service)} />

      {/* Featured projects showcase */}
      <ProjectsSection
        projects={cmsProjects}
        onViewAllProjects={() => openQuoteModal("Full Portfolio Review")}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* Why choose Star */}
      <WhyChooseSection />

      {/* Capabilities */}
      <CapabilitiesSection
        onExplore={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })}
      />

      {/* Process, testimonials, founder, credentials + enquiry form */}
      <ProcessContactSection onOpenPrivacyPolicy={() => setLegalModal({ isOpen: true, type: "privacy" })} />

      {/* Footer */}
      <Footer
        onOpenPrivacyPolicy={() => setLegalModal({ isOpen: true, type: "privacy" })}
        onOpenTerms={() => setLegalModal({ isOpen: true, type: "terms" })}
      />

      {/* Floating Contact Buttons (Desktop & Mobile) */}
      <FloatingContactBar onQuoteClick={() => openQuoteModal()} />

      {/* Lead Generation Quotation Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        preselectedService={preselectedService}
        onOpenPrivacyPolicy={() => {
          setIsLeadModalOpen(false);
          setLegalModal({ isOpen: true, type: "privacy" });
        }}
      />

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        imageUrl={lightbox.imageUrl}
        title={lightbox.title}
        caption={lightbox.caption}
      />

      {/* Legal Modal */}
      <LegalModal
        isOpen={legalModal.isOpen}
        type={legalModal.type}
        onClose={() => setLegalModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </main>
  );
}
