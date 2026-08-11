import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/dashboard/tools/", "/tools/"],
        disallow: ["/dashboard/analytics", "/dashboard/history", "/api/"],
      },
    ],
    sitemap: "https://zenovee.in/sitemap.xml",
  };
}
