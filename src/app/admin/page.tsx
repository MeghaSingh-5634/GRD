"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Edit2,
  Upload,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Building,
  Save,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { getSafeImageUrl } from "@/utils/imageUtils";

interface ProjectItem {
  id: string;
  clientName: string;
  category: string;
  image: string;
  location?: string;
  description?: string;
}

interface HeroSlideItem {
  id: string;
  image: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

interface ClientLogoItem {
  id: string;
  name: string;
  category: string;
  logoType?: string;
}

export default function AdminCMSPage() {
  const [activeTab, setActiveTab] = useState<"projects" | "hero" | "clients">("projects");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // CMS State
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlideItem[]>([]);
  const [clientLogos, setClientLogos] = useState<ClientLogoItem[]>([]);

  // Modal / Form States
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isAddingHeroSlide, setIsAddingHeroSlide] = useState(false);

  // New Project Form
  const [newProject, setNewProject] = useState({
    clientName: "",
    category: "Institutional Signage",
    image: "",
    location: "",
    description: "",
  });

  // New Hero Slide Form
  const [newHeroSlide, setNewHeroSlide] = useState({
    title: "",
    subtitle: "",
    image: "",
    alt: "",
  });

  // Uploading state
  const [uploading, setUploading] = useState(false);

  // Load CMS Data on mount
  useEffect(() => {
    fetchCmsData();
  }, []);

  const fetchCmsData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cms");
      const json = await res.json();
      if (json.success && json.data) {
        setProjects(json.data.projects || []);
        setHeroSlides(json.data.heroSlides || []);
        setClientLogos(json.data.clientLogos || []);
      }
    } catch (err) {
      console.error("Failed to load CMS data:", err);
      setMessage({ type: "error", text: "Failed to connect to CMS storage." });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAll = async (
    customProjects = projects,
    customHeroSlides = heroSlides,
    customLogos = clientLogos
  ) => {
    setSaving(true);
    setMessage(null);
    try {
      const payload = {
        projects: customProjects,
        heroSlides: customHeroSlides,
        clientLogos: customLogos,
      };

      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setMessage({ type: "success", text: "All gallery updates saved and published live!" });
      } else {
        setMessage({ type: "error", text: json.error || "Save failed." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: "Network error saving CMS changes." });
    } finally {
      setSaving(false);
    }
  };

  // Image Upload handler
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "project" | "hero"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.url) {
        if (target === "project") {
          setNewProject((prev) => ({ ...prev, image: data.url }));
        } else {
          setNewHeroSlide((prev) => ({ ...prev, image: data.url }));
        }
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Error uploading file to server.");
    } finally {
      setUploading(false);
    }
  };

  // Add Project
  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.clientName || !newProject.image) {
      alert("Please provide at least a Client Name and Image URL.");
      return;
    }

    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      clientName: newProject.clientName,
      category: newProject.category,
      image: getSafeImageUrl(newProject.image, "/images/hero-grd-building.jpg"),
      location: newProject.location || "Site Project",
      description: newProject.description,
    };

    const updated = [newItem, ...projects];
    setProjects(updated);
    setIsAddingProject(false);
    setNewProject({
      clientName: "",
      category: "Institutional Signage",
      image: "",
      location: "",
      description: "",
    });
    handleSaveAll(updated, heroSlides, clientLogos);
  };

  // Delete Project
  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to remove this project from the gallery?")) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      handleSaveAll(updated, heroSlides, clientLogos);
    }
  };

  // Add Hero Slide
  const handleAddHeroSlideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHeroSlide.image) {
      alert("Please provide an image for the hero slide.");
      return;
    }

    const newSlide: HeroSlideItem = {
      id: `hero-${Date.now()}`,
      image: getSafeImageUrl(newHeroSlide.image, "/images/hero-slide-clean.jpg"),
      alt: newHeroSlide.alt || newHeroSlide.title || "Hero Slide",
      title: newHeroSlide.title || "Featured Project",
      subtitle: newHeroSlide.subtitle || "Signage Execution",
    };

    const updated = [...heroSlides, newSlide];
    setHeroSlides(updated);
    setIsAddingHeroSlide(false);
    setNewHeroSlide({ title: "", subtitle: "", image: "", alt: "" });
    handleSaveAll(projects, updated, clientLogos);
  };

  // Delete Hero Slide
  const handleDeleteHeroSlide = (id: string) => {
    if (confirm("Remove this hero slide?")) {
      const updated = heroSlides.filter((s) => s.id !== id);
      setHeroSlides(updated);
      handleSaveAll(projects, updated, clientLogos);
    }
  };

  return (
    <div className="min-h-screen bg-[#07182B] text-slate-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="border-b border-white/10 bg-[#0A1D33] py-4 px-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition flex items-center gap-2 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Live Website</span>
            </Link>
            <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />
            <div>
              <h1 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>Gallery Content Management System</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#D7FF00] text-[#07182B]">
                  Live CMS
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSaveAll()}
              disabled={saving}
              className="px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider text-[#07182B] bg-[#D7FF00] hover:bg-[#cbf500] active:scale-95 transition-all shadow-md shadow-[#D7FF00]/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save &amp; Publish Live</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Status Alert Banner */}
        {message && (
          <div
            className={`p-4 rounded-xl mb-6 text-xs sm:text-sm font-semibold flex items-center gap-3 ${
              message.type === "success"
                ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                : "bg-red-500/15 border border-red-500/30 text-red-300"
            }`}
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{message.text}</span>
          </div>
        )}

        {/* CMS Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-[#D7FF00] text-[#07182B] shadow-md shadow-[#D7FF00]/20"
                : "bg-[#10243B] text-slate-300 hover:text-white hover:bg-[#152B44]"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Project Gallery ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("hero")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "hero"
                ? "bg-[#D7FF00] text-[#07182B] shadow-md shadow-[#D7FF00]/20"
                : "bg-[#10243B] text-slate-300 hover:text-white hover:bg-[#152B44]"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Hero Fade Carousel ({heroSlides.length})</span>
          </button>
        </div>

        {/* TAB 1: PROJECTS GALLERY */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0A1D33] p-6 rounded-2xl border border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Featured Project Gallery</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Add, update, or remove portfolio case studies displayed on the homepage.
                </p>
              </div>
              <button
                onClick={() => setIsAddingProject(!isAddingProject)}
                className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#10243B] hover:bg-[#152B44] text-white border border-white/15 flex items-center gap-2 self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#D7FF00]" />
                <span>{isAddingProject ? "Cancel" : "Add New Project"}</span>
              </button>
            </div>

            {/* Add New Project Modal / Drawer */}
            {isAddingProject && (
              <form
                onSubmit={handleAddProjectSubmit}
                className="bg-[#0D1F34] border border-[#D7FF00]/40 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl animate-in fade-in"
              >
                <h3 className="text-base font-extrabold text-[#D7FF00] uppercase tracking-wider">
                  New Project Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Client / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. GRD University"
                      value={newProject.clientName}
                      onChange={(e) => setNewProject({ ...newProject, clientName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#07182B] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D7FF00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Category Tag *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Institutional Signage"
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#07182B] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D7FF00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Image URL or Upload from Computer *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. /images/hero-grd-building.jpg"
                      value={newProject.image}
                      onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#07182B] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D7FF00] mb-2"
                    />

                    {/* Direct File Upload */}
                    <div className="relative border border-dashed border-white/20 rounded-xl p-3 text-center bg-[#07182B]/60 hover:border-[#D7FF00] transition cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "project")}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
                        <Upload className="w-4 h-4 text-[#D7FF00]" />
                        <span>{uploading ? "Uploading..." : "Click to Upload Photo from Device"}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Project Location (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Main University Campus"
                      value={newProject.location}
                      onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#07182B] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D7FF00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Project Description (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of fabrication and execution solutions delivered..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#07182B] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D7FF00]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAddingProject(false)}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-[#07182B] bg-[#D7FF00] hover:bg-[#cbf500] shadow-md shadow-[#D7FF00]/20 cursor-pointer"
                  >
                    Save &amp; Add to Gallery
                  </button>
                </div>
              </form>
            )}

            {/* Current Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#0A1D33] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group shadow-lg"
                >
                  <div className="relative aspect-[4/3] w-full bg-slate-900">
                    <Image
                      src={getSafeImageUrl(proj.image, "/images/hero-grd-building.jpg")}
                      alt={proj.clientName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white backdrop-blur-md transition shadow-md cursor-pointer"
                        title="Delete project from gallery"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D7FF00] block mb-1">
                        {proj.category}
                      </span>
                      <h4 className="text-base font-extrabold text-white leading-tight">
                        {proj.clientName}
                      </h4>
                      {proj.location && (
                        <p className="text-xs text-slate-400 mt-1">{proj.location}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: HERO FADE CAROUSEL */}
        {activeTab === "hero" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0A1D33] p-6 rounded-2xl border border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Hero Fade Carousel Slides</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage the full-bleed cross-fading imagery in the top hero section.
                </p>
              </div>
              <button
                onClick={() => setIsAddingHeroSlide(!isAddingHeroSlide)}
                className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#10243B] hover:bg-[#152B44] text-white border border-white/15 flex items-center gap-2 self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#D7FF00]" />
                <span>{isAddingHeroSlide ? "Cancel" : "Add Slide"}</span>
              </button>
            </div>

            {/* Add New Hero Slide Form */}
            {isAddingHeroSlide && (
              <form
                onSubmit={handleAddHeroSlideSubmit}
                className="bg-[#0D1F34] border border-[#D7FF00]/40 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl animate-in fade-in"
              >
                <h3 className="text-base font-extrabold text-[#D7FF00] uppercase tracking-wider">
                  New Hero Slide
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Title / Client Tag (e.g. GRD University Campus)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Prestige Tech Park"
                      value={newHeroSlide.title}
                      onChange={(e) => setNewHeroSlide({ ...newHeroSlide, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#07182B] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D7FF00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Subtitle Tag (e.g. Architectural Facade Signage)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3D LED Letters"
                      value={newHeroSlide.subtitle}
                      onChange={(e) => setNewHeroSlide({ ...newHeroSlide, subtitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#07182B] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D7FF00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Image Path or Upload from Device *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. /images/hero-slide-clean.jpg"
                    value={newHeroSlide.image}
                    onChange={(e) => setNewHeroSlide({ ...newHeroSlide, image: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#07182B] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D7FF00] mb-2"
                  />

                  {/* Direct File Upload */}
                  <div className="relative border border-dashed border-white/20 rounded-xl p-3 text-center bg-[#07182B]/60 hover:border-[#D7FF00] transition cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "hero")}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
                      <Upload className="w-4 h-4 text-[#D7FF00]" />
                      <span>{uploading ? "Uploading..." : "Click to Upload Photo from Device"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAddingHeroSlide(false)}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-[#07182B] bg-[#D7FF00] hover:bg-[#cbf500] shadow-md shadow-[#D7FF00]/20 cursor-pointer"
                  >
                    Add Slide
                  </button>
                </div>
              </form>
            )}

            {/* Hero Slides List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {heroSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="bg-[#0A1D33] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg"
                >
                  <div className="relative aspect-[16/10] w-full bg-slate-900">
                    <Image
                      src={getSafeImageUrl(slide.image, "/images/hero-slide-clean.jpg")}
                      alt={slide.alt || slide.title || "Slide"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#07182B]/80 text-[11px] font-mono text-[#D7FF00]">
                      Slide 0{idx + 1}
                    </div>
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => handleDeleteHeroSlide(slide.id)}
                        className="p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white backdrop-blur-md transition shadow-md cursor-pointer"
                        title="Delete hero slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-sm font-bold text-white">{slide.title || "Untitled Slide"}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{slide.subtitle || "No subtitle"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
