import { MetadataRoute } from "next";
import { toolsConfig } from "@/utils/toolsConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zenovee.in";
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // Category pages
  const categories = [...new Set(toolsConfig.map((t) => t.category))];
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/tools/${cat
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Tool pages — all 200
  const toolPages: MetadataRoute.Sitemap = toolsConfig.map((tool) => ({
    url: `${baseUrl}/dashboard/tools/${tool.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...toolPages];
}
