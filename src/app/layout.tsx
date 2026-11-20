import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07182B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://starsignage.com"),
  title: "STAR PRINTERS & SIGNAGE | Corporate Signage, Printing & Fabrication Solutions",
  description:
    "We Build Signage That Builds Brands. Comprehensive corporate signage, ACP elevation, 3D LED channel letters, campus wayfinding, retail branding, and large-format printing for institutions, retail, and commercial spaces.",
  keywords: [
    "Corporate Signage",
    "Commercial Signage Fabricators",
    "Campus Wayfinding Signage",
    "Retail Storefront Branding",
    "3D LED Channel Letters",
    "ACP Signage Elevation",
    "Large-Format Flex & Vinyl Printing",
    "Star Printers and Signage",
    "Star Signage Coimbatore",
    "Architectural Signage India",
  ],
  authors: [{ name: "Star Printers & Signage" }],
  creator: "Star Printers & Signage",
  publisher: "Star Printers & Signage",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://starsignage.com",
    title: "STAR PRINTERS & SIGNAGE | Corporate Signage & Fabrication Solutions",
    description:
      "We Build Signage That Builds Brands. Turnkey signage, fabrication, and installation for universities, retail chains, and corporate enterprises.",
    siteName: "Star Printers & Signage",
    images: [
      {
        url: "/images/hero-signage.jpg",
        width: 1200,
        height: 630,
        alt: "Star Printers & Signage Corporate Headquarters Architectural Project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STAR PRINTERS & SIGNAGE | Corporate Signage & Fabrication",
    description: "Corporate signage, printing, fabrication and execution for institutions, retail and commercial spaces.",
    images: ["/images/hero-signage.jpg"],
  },
  alternates: {
    canonical: "https://starsignage.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "STAR PRINTERS & SIGNAGE",
    image: "https://starsignage.com/images/hero-signage.jpg",
    description:
      "Turnkey corporate signage, printing, fabrication and installation solutions for institutions, retail chains, and commercial enterprises.",
    telephone: "+91-9842212345",
    email: "projects@starsignage.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "42, Industrial Estate Road, Commercial Hub",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      postalCode: "641006",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "11.0168",
      longitude: "76.9558",
    },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:30",
      },
    ],
    serviceArea: {
      "@type": "AdministrativeArea",
      name: "India",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Signage & Printing Solutions",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Corporate Signage & LED Channel Letters",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Institutional Campus Wayfinding Signage",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Retail Storefront Branding & Lightboxes",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Industrial Large-Format UV & Eco-Solvent Printing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Structural Steel Fabrication & Site Rigging",
          },
        },
      ],
    },
  };

  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-[#07182B] text-slate-100 antialiased selection:bg-[#D7FF00] selection:text-[#07182B]">
        {children}
      </body>
    </html>
  );
}
