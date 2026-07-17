import type { MetadataRoute } from "next";
import { services } from "./lib/services";
import { caseStudies } from "./lib/work";
import { insightPosts } from "./lib/insights";
import { SITE_URL } from "./lib/site";

const BASE = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE}/estimate`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/how-much-does-software-cost`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...services.map((s) => ({
      url: `${BASE}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${BASE}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseStudies.map((c) => ({
      url: `${BASE}/work/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    {
      url: `${BASE}/insights`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...insightPosts.map((p) => ({
      url: `${BASE}/insights/${p.slug}`,
      lastModified: new Date(p.published),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
