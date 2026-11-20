export interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  iconName: "building" | "map-pin" | "shopping-bag" | "printer" | "wrench";
  /** Matching option in the enquiry form's "Service Required" dropdown */
  serviceOption: string;
}

export interface FeaturedProject {
  id: string;
  clientName: string;
  category: string;
  image: string;
  location?: string;
}

export interface ProjectSlide {
  id: string;
  title: string;
  category: string;
  location: string;
  year?: string;
  materials?: string;
  description: string;
  image: string;
  tags?: string[];
  isVerified?: boolean;
}

export interface ClientProfile {
  id: string;
  name: string;
  logoText: string;
  industry: string;
  featuredProjectTitle: string;
  description: string;
  projects: ProjectSlide[];
  isVerified: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  tag: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  solutions: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const SITE_CONFIG = {
  companyName: "STAR PRINTERS & SIGNAGE",
  phone: "+91 94111 42835",
  displayPhone: "+91 94111 42835",
  whatsappNumber: "919411142835",
  whatsappPrefilledMessage:
    "Hello Star Printers & Signage, I would like to discuss a corporate signage / printing project enquiry.",
  email: "info@starprinters.in",
  officeAddress: "Dehradun, Uttarakhand, India",
  googleMapsUrl: "https://maps.google.com/?q=Star+Printers+Dehradun+Uttarakhand",
  workingHours: "Monday – Saturday: 9:00 AM – 7:30 PM",
};

export interface HeroCarouselSlide {
  id: string;
  image: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

export const HERO_CAROUSEL_IMAGES: HeroCarouselSlide[] = [
  {
    id: "grd-campus",
    image: "/images/hero-slide-clean.jpg",
    alt: "GRD University Campus Architectural Facade Signage",
    title: "GRD University",
    subtitle: "Institutional Campus Execution",
  },
  {
    id: "planet-fashion",
    image: "/images/project-planet-fashion.jpg",
    alt: "Planet Fashion Flagship Retail Facade Branding",
    title: "Planet Fashion",
    subtitle: "Retail Branding & 3D Letters",
  },
  {
    id: "deloitte-hq",
    image: "/images/project-deloitte.jpg",
    alt: "Deloitte Corporate Headquarters Facade Signage",
    title: "Deloitte Corporate",
    subtitle: "High-Rise Glass Elevation",
  },
  {
    id: "max-healthcare",
    image: "/images/project-max-healthcare.jpg",
    alt: "Max Healthcare Hospital Campus Wayfinding",
    title: "Max Healthcare",
    subtitle: "Hospital Wayfinding Signage",
  },
];

export const HERO_CONFIG = {
  headline: "We Build Signage That Builds Brands.",
  subtext:
    "Corporate signage, printing, fabrication and execution for institutions, retail and commercial spaces.",
  primaryCtaText: "Explore Our Projects →",
  secondaryCtaText: "Get a Corporate Quote",
  scrollText: "Scroll to explore ↓",
  buildingImage: "/images/hero-slide-clean.jpg",
  slides: HERO_CAROUSEL_IMAGES,
};

export const CLIENT_STRIP_LOGOS = [
  {
    id: "grd",
    type: "grd",
    name: "GRD UNIVERSITY",
    category: "Education",
  },
  {
    id: "planet-fashion",
    type: "planet-fashion",
    name: "PLANET FASHION",
    category: "Fashion Retail",
  },
  {
    id: "decathlon",
    type: "decathlon",
    name: "DECATHLON",
    category: "Sports Retail",
  },
  {
    id: "tata-hitachi",
    type: "tata-hitachi",
    name: "TATA HITACHI",
    category: "Heavy Industrial",
  },
  {
    id: "reliance",
    type: "reliance",
    name: "Reliance Industries Limited",
    category: "Conglomerate",
  },
];

export const SERVICES_LIST: ServiceCard[] = [
  {
    id: "corporate-signage",
    title: "Corporate & Architectural Signage",
    subtitle: "Architectural Exterior & Interior Identity",
    description: "ACP elevation, 3D illuminated letters, facade branding, and sky-sign engineering for corporate headquarters.",
    image: "/images/service-corporate.jpg",
    iconName: "building",
    serviceOption: "Corporate Signage",
  },
  {
    id: "institutional-wayfinding",
    title: "Institutional & Wayfinding",
    subtitle: "University & Hospital Wayfinding",
    description: "Pedestrian & vehicular directional totems, entrance monuments, campus zoning slates, and regulatory safety boards.",
    image: "/images/service-wayfinding.jpg",
    iconName: "map-pin",
    serviceOption: "Institutional Signage",
  },
  {
    id: "retail-branding",
    title: "Retail Branding & Store Signage",
    subtitle: "Storefronts & Showroom Environments",
    description: "High-impact retail fascias, illuminated storefront logos, in-store displays, and nationwide retail rollout coordination.",
    image: "/images/service-retail.jpg",
    iconName: "shopping-bag",
    serviceOption: "Retail Branding",
  },
  {
    id: "large-format-printing",
    title: "Large-Format Printing",
    subtitle: "High-Resolution UV & Eco-Solvent",
    description: "Seamless vinyl & flex printing, direct UV flatbed on rigid substrates, backlit fabric prints, and wall wraps.",
    image: "/images/service-printing.jpg",
    iconName: "printer",
    serviceOption: "Large-Format Printing",
  },
  {
    id: "fabrication-installation",
    title: "Fabrication & Installation",
    subtitle: "Turnkey In-House Precision Engineering",
    description: "Precision CNC routing, fiber laser cutting, structural steel welding, and certified high-altitude rigging.",
    image: "/images/service-fabrication.jpg",
    iconName: "wrench",
    serviceOption: "Fabrication & Installation",
  },
];

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "grd-univ",
    clientName: "GRD University",
    category: "Institutional Signage",
    image: "/images/hero-grd-building.jpg",
    location: "Main University Campus",
  },
  {
    id: "planet-fashion",
    clientName: "Planet Fashion",
    category: "Retail Branding",
    image: "/images/project-planet-fashion.jpg",
    location: "High Street Retail Flagship",
  },
  {
    id: "max-healthcare",
    clientName: "Max Healthcare",
    category: "Wayfinding Signage",
    image: "/images/project-max-healthcare.jpg",
    location: "Super-Specialty Hospital Complex",
  },
  {
    id: "deloitte",
    clientName: "Deloitte.",
    category: "Corporate Branding",
    image: "/images/project-deloitte.jpg",
    location: "Corporate Tech Park",
  },
];

export const METRICS_DATA = [
  {
    value: "200+",
    label: "Projects Completed",
    icon: "trophy",
  },
  {
    value: "100+",
    label: "Corporate Clients",
    icon: "handshake",
    highlightWord: "Corporate",
  },
  {
    value: "10+",
    label: "Cities Served",
    icon: "map-pin",
  },
  {
    value: "99%",
    label: "Client Satisfaction",
    icon: "shield-check",
  },
];

export const PROCESS_STEPS_5 = [
  {
    number: "1",
    title: "Site Survey & Requirements",
    description: "Physical laser measurement, structural inspection, and client requirement gathering.",
  },
  {
    number: "2",
    title: "Design & Quotation",
    description: "Detailed BOQ preparation, substrate recommendations, and commercial estimates.",
  },
  {
    number: "3",
    title: "Approval & Production",
    description: "3D CAD proofs, material sample approvals, CNC fabrication, and 48-hr electrical testing.",
  },
  {
    number: "4",
    title: "Installation",
    description: "Certified field rigging, structural anchoring, and electrical commissioning.",
  },
  {
    number: "5",
    title: "Handover & Support",
    description: "Final quality sign-off, warranty certification, and after-sales support.",
  },
];

export const TESTIMONIAL_DATA = {
  quote:
    "“Star Printers & Signage delivered our campus signage with exceptional quality and on time. Highly recommended!”",
  author: "Dr. R.K. Sharma",
  designation: "Registrar, GRD University",
  avatar: "/images/avatar-dr-sharma.jpg",
};

// Compatible exports for other modular views
export const CLIENT_LOGOS = [
  { id: "grd", name: "GRD University", category: "Education", logoText: "GRD", clientId: "grd-university", verified: true },
  { id: "planet-fashion", name: "Planet Fashion", category: "Retail", logoText: "PLANET FASHION", clientId: "planet-fashion", verified: true },
  { id: "decathlon", name: "Decathlon", category: "Sports Retail", logoText: "DECATHLON", clientId: "grd-university", verified: true },
  { id: "tata-hitachi", name: "Tata Hitachi", category: "Industrial", logoText: "TATA HITACHI", clientId: "planet-fashion", verified: true },
  { id: "reliance", name: "Reliance Industries", category: "Conglomerate", logoText: "RELIANCE", clientId: "grd-university", verified: true },
];

export const CLIENT_DATA: ClientProfile[] = [
  {
    id: "grd-university",
    name: "GRD University",
    logoText: "GRD",
    industry: "Education & Campus Institutions",
    featuredProjectTitle: "Comprehensive Campus Wayfinding & Exterior Monolith Signage",
    description: "Institutional branding architecture including exterior entrance pylons, campus wayfinding, and LED building headers.",
    isVerified: true,
    projects: [
      {
        id: "grd-p1",
        title: "Campus Entrance Monument & Illuminated Monolith Signage",
        category: "Institutional Signage",
        location: "Main University Campus",
        year: "2024",
        materials: "Heavy-gauge ACP cladding, 304 SS, Samsung IP67 LEDs",
        description: "Fabrication and structural installation of architectural entrance monolith.",
        image: "/images/hero-grd-building.jpg",
        tags: ["Entrance Monolith", "LED Channel Letters", "Campus Branding"],
        isVerified: true,
      },
    ],
  },
  {
    id: "planet-fashion",
    name: "Planet Fashion",
    logoText: "PF",
    industry: "Fashion Retail",
    featuredProjectTitle: "Flagship Retail Storefront LED Signage",
    description: "High-impact retail transformation spanning exterior front-lit and halo-lit signage.",
    isVerified: true,
    projects: [
      {
        id: "pf-p1",
        title: "Flagship Storefront 3D Face-Lit & Halo LED Signage",
        category: "Retail Branding",
        location: "High Street Retail Promenade",
        year: "2024",
        materials: "Aluminum returns, cast acrylic faces, Osram high-CRI LEDs",
        description: "Precision-crafted channel letters delivering 6500K balanced illumination.",
        image: "/images/project-planet-fashion.jpg",
        tags: ["Storefront Signage", "Dual Illumination", "Retail Execution"],
        isVerified: true,
      },
    ],
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "corporate-signage",
    title: "Corporate Signage",
    subtitle: "Architectural Exterior & Interior Identity",
    description: "Premium building identification, illuminated channel lettering, and ACP facade cladding.",
    image: "/images/service-corporate.jpg",
    tag: "Exterior & Architectural",
    features: ["ACP Elevation & Cladding", "Backlit & Front-lit 3D LED Letters", "Sky Signage"],
  },
  {
    id: "institutional-wayfinding",
    title: "Institutional & Wayfinding",
    subtitle: "Campuses, Hospitals & Large-Scale Facilities",
    description: "Strategic directional planning and wayfinding networks.",
    image: "/images/service-wayfinding.jpg",
    tag: "Campus & Public Flow",
    features: ["Monument & Pylon Entrance Signage", "Modular Extruded Directional Totems"],
  },
  {
    id: "retail-branding",
    title: "Retail Branding",
    subtitle: "Showrooms & Storefronts",
    description: "Complete store fit-outs, facade elevations, and experiential graphic displays.",
    image: "/images/service-retail.jpg",
    tag: "Commercial & Retail",
    features: ["Storefront Fascias", "Illuminated Lettering", "SEG Lightboxes"],
  },
  {
    id: "large-format-printing",
    title: "Large-Format Printing",
    subtitle: "High-Resolution UV & Eco-Solvent",
    description: "Industrial printing capacity outputting millions of square feet.",
    image: "/images/service-printing.jpg",
    tag: "Industrial Print Capacity",
    features: ["Seamless Flex Banners", "Direct UV Flatbed Printing", "Vehicle Wraps"],
  },
  {
    id: "fabrication-installation",
    title: "Fabrication & Installation",
    subtitle: "Heavy Steel Structures & Expert Rigging",
    description: "CNC precision routing, fiber laser cutting, and certified site installation teams.",
    image: "/images/service-fabrication.jpg",
    tag: "Turnkey Execution",
    features: ["Steel Sub-Frame Fabrication", "CNC Routing & Laser Cutting", "Crane Rigging Teams"],
  },
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: "education",
    title: "Education & Universities",
    description: "Campus signage, entrance monuments, navigational wayfinding.",
    image: "/images/hero-grd-building.jpg",
    solutions: ["Campus Pylons", "Directional Slates", "Auditorium Branding"],
  },
  {
    id: "retail",
    title: "Retail Chains & Showrooms",
    description: "Storefront fascias, backlit lettering, promotional window displays.",
    image: "/images/project-planet-fashion.jpg",
    solutions: ["Storefront Fascias", "Illuminated Lettering", "SEG Lightboxes"],
  },
];

export const CAPABILITIES_PILLARS = [
  {
    title: "Industrial Printing Infrastructure",
    badge: "In-House Technology",
    description: "Flatbed UV and industrial roll-to-roll eco-solvent systems.",
    image: "/images/service-printing.jpg",
    specs: ["10-Foot Seamless Width", "1440 DPI Resolution", "UV-Cured Direct-to-Substrate"],
  },
  {
    title: "Fabrication & Metal Facilities",
    badge: "In-House & Partner Coordinated",
    description: "Laser cutting, CNC routing, and steel welding.",
    image: "/images/service-fabrication.jpg",
    specs: ["Fiber Laser 3kW Table", "Heavy-Duty CNC Routers", "Automated Channel Bending"],
  },
  {
    title: "Installation & High-Altitude Execution",
    badge: "Certified Field Operations",
    description: "Certified rigging technicians, scaffolding experts, and licensed electricians.",
    image: "/images/service-corporate.jpg",
    specs: ["OSHA Trained Field Riggers", "Hydraulic Boom Lifts", "Structural Safety Calculations"],
  },
];

export const CAPABILITIES_GRID = [
  { icon: "Cpu", title: "Machinery & Precision Tech", description: "CNC routers, fiber laser cutting, UV flatbed printers." },
  { icon: "Users", title: "Skilled Artisan Workforce", description: "Experienced metal fabricators and acrylic craftsmen." },
  { icon: "Layers", title: "Versatile Material Expertise", description: "ACP, SS-304/316, solid brass, acrylic, polycarbonate." },
  { icon: "ShieldCheck", title: "Strict Multi-Tier QC Protocol", description: "48-hour continuous LED burn-in testing." },
  { icon: "Wrench", title: "Safe Turnkey Site Installation", description: "Civil footings, anchor testing, high-altitude rigging." },
  { icon: "Truck", title: "Logistics & Fleet Coordination", description: "Secure custom crating and dedicated vehicle fleets." },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { number: "01", title: "Site Survey & Requirements", description: "Structural survey and measurements.", deliverables: ["Site inspection report"] },
  { number: "02", title: "Planning & Quotation", description: "Detailed BOQ preparation.", deliverables: ["Technical BOQ"] },
  { number: "03", title: "Design Approval & Samples", description: "3D CAD mockups and material swatches.", deliverables: ["3D mockups", "Pantone proofing"] },
  { number: "04", title: "Production & QC Testing", description: "CNC fabrication and 48-hr electrical burn-in testing.", deliverables: ["Precision manufacturing"] },
  { number: "05", title: "Installation & Handover", description: "Professional field rigging and electrical commissioning.", deliverables: ["On-site installation", "Warranty certification"] },
];

export const BUSINESS_METRICS = [
  { label: "Projects Completed", value: "200+", verified: true, detail: "Across India" },
  { label: "Corporate Clients", value: "100+", verified: true, detail: "Long-term relationships" },
  { label: "Cities Served", value: "10+", verified: true, detail: "Regional footprint" },
  { label: "Client Satisfaction", value: "99%", verified: true, detail: "Quality verified" },
];

export const TESTIMONIALS_CONFIG = {
  showTestimonials: true,
  items: [
    {
      id: "t1",
      quote: "Star Printers & Signage delivered our campus signage with exceptional quality and on time. Highly recommended!",
      author: "Dr. R.K. Sharma",
      organization: "GRD University",
      verified: true,
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Homepage redesign content                                           */
/* ------------------------------------------------------------------ */

/** Company profile PDF. Drop the file into /public with this name. */
export const COMPANY_PROFILE_PDF = "/star-company-profile.pdf";

/** Social profile URLs. Leave empty to hide an icon. */
export const SOCIAL_LINKS = {
  linkedin: "",
  instagram: "",
  youtube: "",
};

export const AT_A_GLANCE = [
  { icon: "calendar", label: "Years of Execution Experience" },
  { icon: "layers", label: "Multi-Sector Project Exposure" },
  { icon: "handshake", label: "Corporate & Institutional Clients" },
  { icon: "map-pin", label: "Regional Project Execution" },
  { icon: "users", label: "Experienced Execution Team" },
] as const;

export interface ShowcaseSlide {
  image: string;
  client: string;
  title: string;
  description: string;
  industry: string;
  location: string;
}

export interface ShowcaseTab {
  id: string;
  label: string;
  logo: "grd" | "planet-fashion" | "other";
  slides: ShowcaseSlide[];
}

const GRD_INFO = {
  client: "GRD University",
  title: "Institutional Signage & Campus Branding",
  description:
    "A comprehensive signage and branding project covering campus identity, building signage, wayfinding and informational systems across the university premises.",
  industry: "Educational Institution",
  location: "Dehradun, Uttarakhand",
};

const PLANET_FASHION_INFO = {
  client: "Planet Fashion",
  title: "Flagship Storefront & Retail Branding",
  description:
    "High-impact retail facade with illuminated 3D face-lit and halo-lit letters, storefront fascia and in-store branding for a flagship outlet.",
  industry: "Fashion Retail",
  location: "High Street Retail Flagship",
};

export const SHOWCASE_TABS: ShowcaseTab[] = [
  {
    id: "grd",
    label: "GRD University",
    logo: "grd",
    slides: [
      { image: "/images/hero-slide-clean.jpg", ...GRD_INFO },
      { image: "/images/grd-university.jpg", ...GRD_INFO },
      { image: "/images/project-grd.jpg", ...GRD_INFO },
    ],
  },
  {
    id: "planet-fashion",
    label: "Planet Fashion",
    logo: "planet-fashion",
    slides: [
      { image: "/images/planet-fashion.jpg", ...PLANET_FASHION_INFO },
      { image: "/images/project-planet-fashion.jpg", ...PLANET_FASHION_INFO },
      { image: "/images/service-retail.jpg", ...PLANET_FASHION_INFO },
    ],
  },
  // "Other Projects" slides are built from the CMS project list at runtime.
];

export const WHY_CHOOSE = [
  { icon: "target", title: "End-to-End Execution", note: "Design to Installation" },
  { icon: "layers", title: "Customized Solutions", note: "Site-specific & Scalable" },
  { icon: "shield", title: "Quality Assurance", note: "Materials, Finish & Durability" },
  { icon: "users", title: "Experienced Execution Team", note: "Skilled & Site-ready" },
  { icon: "handshake", title: "Single Point of Contact", note: "Smooth Coordination" },
  { icon: "headset", title: "Post-Installation Support", note: "Service & Maintenance" },
] as const;

export const CAPABILITY_CARDS = [
  { title: "Printing Infrastructure", image: "/images/raw-printing.jpg" },
  { title: "Fabrication & Production", image: "/images/raw-fabrication.jpg" },
  { title: "Installation & Site Execution", image: "/images/hero-grd-building.jpg" },
];

export const PROCESS_STEPS_7 = [
  "Requirement Discussion",
  "Site Survey & Measurement",
  "Quotation & BOQ",
  "Design Approval & Samples",
  "Production & Fabrication",
  "Quality Handover",
  "After-Sales Support",
];

export const HOME_TESTIMONIALS = [
  {
    quote:
      "Star Printers & Signage delivered our campus signage with exceptional quality, professional coordination and on-time execution. A reliable and proactive partner.",
    organization: "GRD University",
    logo: "grd" as const,
  },
];

export const FOUNDER = {
  name: "Mr. Rajesh Sharma",
  role: "Founder, Star Printers & Signage",
  quote:
    "Our focus has always been on building long-term relationships through quality, commitment and dependable project execution.",
  /** Set to e.g. "/images/founder.jpg" once a photo is added; initials are shown until then. */
  photo: "",
};

export const CREDENTIALS = [
  { icon: "receipt", label: "GST Registered" },
  { icon: "landmark", label: "Business Registration" },
  { icon: "factory", label: "Udyam (MSME)" },
  { icon: "badge", label: "Corporate Vendor Compliant" },
  { icon: "clipboard", label: "Project Documentation" },
] as const;

export const INDUSTRY_OPTIONS = [
  "Education & Institutions",
  "Retail & Fashion",
  "Healthcare",
  "Corporate & IT",
  "Real Estate",
  "Hospitality & Hotels",
  "Other",
];

export const FOOTER_INDUSTRIES = [
  "Education & Institutions",
  "Retail & Fashion",
  "Healthcare",
  "Real Estate",
  "Hospitality & Hotels",
];
