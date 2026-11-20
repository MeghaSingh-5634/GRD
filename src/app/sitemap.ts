import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://starsignage.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: BASE_URL, changeFrequency: "monthly", priority: 1 }];
}
