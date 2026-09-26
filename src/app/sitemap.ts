import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { caseStudies } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((c) => ({
      url: `${site.url}/work/${c.slug}`,
      changeFrequency: "yearly" as const,
      priority: c.featured ? 0.8 : 0.6,
    })),
  ];
}
