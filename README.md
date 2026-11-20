# STAR PRINTERS & SIGNAGE — Corporate Website Platform

A production-ready corporate B2B web application engineered for **STAR PRINTERS & SIGNAGE**, positioning the brand as a turnkey corporate signage, fabrication, and large-format printing execution partner for universities, retail chains, IT parks, developers, and healthcare institutions.

---

## 🌟 Key Highlights & Architecture

- **Visual Brand Aesthetic**: Dark Navy (`#07182B`), Slate Blue (`#10243B`), Neon Lime (`#D7FF00`), and Emerald Green (`#27DC75`) accent system.
- **Typography**: Plus Jakarta Sans for crisp architectural and engineering legibility.
- **Continuous Client Logo Marquee**: Hardware-accelerated CSS marquee with infinite loop, hover-pause, and interactive click-to-client-tab navigation.
- **Interactive Client Projects Showcase**: Dynamic client tab system with live slideshow gallery, slide counter (`01 / 03`), prev/next controls, dot pagination, thumbnail strip, full-screen lightbox modal, and specifications breakdown.
- **Horizontal Carousels**: Smooth swipeable and arrow-navigated carousels for Services and Industries with specification inspection modals.
- **Lead Generation Engine**: Full-stack Next.js App Router API route (`/api/lead`) with field validation, honeypot spam protection, 15MB file upload limit, CRM webhook forwarding, and confirmation reference IDs.
- **Omnipresent Contact Bar**: Floating action buttons for desktop (WhatsApp prefilled message, Phone direct call, Email, Request Quote) and fixed bottom action bar for mobile.
- **SEO & Structured Data**: Built-in `LocalBusiness` JSON-LD schema, OpenGraph tags, Twitter cards, and canonical URL.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ (tested on v24.13.0)
- **npm**: v9+ (tested on 11.6.2)

### 2. Installation
```bash
# Clone or navigate to the repository directory
cd "star signage website"

# Install project dependencies
npm install
```

### 3. Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 4. Production Build
```bash
npm run build
npm run start
```

---

## 📁 Project Architecture & Components

```
star-signage-website/
├── public/
│   └── images/                       # High-resolution architectural project photography
│       ├── hero-signage.jpg          # Corporate building facade & 3D LED channel letters
│       ├── grd-university.jpg        # Campus entrance monument & wayfinding monolith
│       └── planet-fashion.jpg        # Flagship retail store illuminated facade
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── lead/
│   │   │       └── route.ts          # Server-side lead validation, file handling & webhook
│   │   ├── globals.css               # Design tokens, marquee keyframes, glassmorphism
│   │   ├── layout.tsx                # Plus Jakarta Sans, JSON-LD schema, OpenGraph meta
│   │   └── page.tsx                  # Master page integrating all 14 corporate sections
│   ├── components/
│   │   ├── Header.tsx                # Sticky navbar with transparent-to-solid blur & drawer
│   │   ├── HeroSection.tsx           # Split architectural hero with lime accent headline
│   │   ├── ClientLogoMarquee.tsx     # Infinite smooth marquee with click-to-filter tabs
│   │   ├── ServicesCarousel.tsx      # Horizontal carousel with specification modals
│   │   ├── ClientProjectTabs.tsx     # Centerpiece client tabs & interactive slideshow
│   │   ├── IndustriesCarousel.tsx    # Sector-specific solutions carousel
│   │   ├── CapabilitiesSection.tsx   # 3 infrastructure pillars & in-house vs partner disclosure
│   │   ├── ProcessTimeline.tsx       # 5-step engineering timeline & deliverables
│   │   ├── TrustSection.tsx          # Verified business metrics & engineering compliance
│   │   ├── LeadForm.tsx              # High-conversion quotation form with file upload
│   │   ├── ContactSection.tsx        # Physical coordinates, map links, and direct call desk
│   │   ├── FloatingContactBar.tsx    # Desktop floating pills & mobile fixed bottom bar
│   │   ├── LightboxModal.tsx         # Full-screen high-res project image viewer
│   │   ├── LegalModal.tsx            # Privacy policy & terms of service modal
│   │   └── Footer.tsx                # Dark navy corporate footer & quick links
│   └── data/
│       └── siteData.ts               # SINGLE SOURCE OF TRUTH for all data & content
├── .env.example                      # Environment variables template
└── next.config.ts                    # Next.js configuration & image domains
```

---

## 🛠️ How to Add / Edit Content

All content is centralized in a single configuration file: `src/data/siteData.ts`. You do not need to hunt across multiple component files to make updates.

### 1. Updating Business Phone, WhatsApp & Address
In `src/data/siteData.ts`, edit `SITE_CONFIG`:
```typescript
export const SITE_CONFIG = {
  companyName: "STAR PRINTERS & SIGNAGE",
  phone: "+91 98422 12345",
  displayPhone: "+91 98422 12345",
  whatsappNumber: "919842212345", // Country code + 10-digit number without plus or spaces
  whatsappPrefilledMessage: "Hello Star Printers & Signage, I have a corporate signage / printing project enquiry. Please contact me.",
  email: "projects@starsignage.com",
  officeAddress: "42, Industrial Estate Road, Commercial Hub, Coimbatore, Tamil Nadu 641006, India",
  googleMapsUrl: "https://maps.google.com/?q=Star+Printers+Signage",
};
```

### 2. Adding a New Client & Project Gallery
To add a new verified client (e.g., an IT Park or Hospital):
1. Place project photographs in `public/images/`.
2. In `src/data/siteData.ts`, add an entry to `CLIENT_DATA`:
```typescript
{
  id: "apollo-health",
  name: "Apollo Health City",
  logoText: "APOLLO",
  industry: "Super-Specialty Healthcare",
  featuredProjectTitle: "Hospital Wayfinding & High-Visibility Trauma Pylon",
  description: "Complete campus directional signage and illuminated rooftop branding.",
  isVerified: true,
  projects: [
    {
      id: "ah-p1",
      title: "Trauma Care Illuminated Monument Pylon",
      category: "Healthcare Wayfinding",
      location: "Main Medical Center",
      year: "2024",
      materials: "Heavy-gauge ACP, 3M Translucent Film, Samsung IP67 LEDs",
      description: "Structural emergency access signage engineered for 24/7 high-luminance legibility.",
      image: "/images/your-apollo-photo.jpg",
      tags: ["Healthcare", "Emergency Wayfinding", "LED Pylon"],
      isVerified: true,
    }
  ]
}
```
3. Add a matching entry in `CLIENT_LOGOS` in `src/data/siteData.ts` to display in the marquee:
```typescript
{
  id: "apollo-health",
  name: "Apollo Health City",
  category: "Healthcare",
  logoText: "APOLLO HEALTH",
  clientId: "apollo-health",
  verified: true,
}
```

### 3. Displaying Testimonials
In `src/data/siteData.ts`, toggle `showTestimonials: true` in `TESTIMONIALS_CONFIG` once authentic approved client quotes are acquired.

---

## 📡 Connecting Lead Form to CRM / Webhooks / Email

The lead form posts to `/api/lead` and supports instant webhook dispatching:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Set your webhook endpoint:
   ```env
   CRM_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/123456/abcdef/
   ```
   Whenever a prospective client submits an enquiry, the complete JSON payload (Full Name, Company, Business Email, Contact Number, Location, Service, Budget, Description, and File Name) is forwarded in real time to your CRM, Slack channel, or email automation workflow.

---

## 🛡️ License & Copyright

© 2026 **STAR PRINTERS & SIGNAGE**. All rights reserved.  
*"Building Brands. Together."*
