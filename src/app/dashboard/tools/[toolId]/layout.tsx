import type { Metadata } from "next";
import React from "react";
import { toolsConfig } from "@/utils/toolsConfig";

interface Props {
  params: Promise<{ toolId: string }>;
  children: React.ReactNode;
}

// Category → keyword map for richer SEO
const categoryKeywords: Record<string, string[]> = {
  "Developer & Tech Utilities": [
    "developer tool", "code formatter", "json formatter", "regex tester",
    "base64 encoder", "jwt decoder", "api testing", "web developer",
  ],
  "Media, Design & Productivity": [
    "image tool", "image compressor", "svg editor", "color picker",
    "design tool", "productivity", "media converter", "photo editor",
  ],
  "Growth Marketing & SEO Suite": [
    "seo tool", "marketing tool", "hashtag generator", "keyword research",
    "content marketing", "social media", "meta tag generator", "seo optimizer",
  ],
  "Calculators & Mathematics": [
    "online calculator", "math calculator", "scientific calculator",
    "finance calculator", "unit converter", "percentage calculator",
  ],
  "Network & Server Utilities": [
    "network tool", "dns lookup", "ip address", "server utility",
    "web performance", "http header", "cors checker", "ping tool",
  ],
  "Financial & Investment Engines": [
    "financial calculator", "investment calculator", "roi calculator",
    "stock calculator", "crypto calculator", "savings calculator",
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { toolId } = await params;
  const tool = toolsConfig.find((t) => t.id === toolId);

  if (!tool) {
    return {
      title: "Tool Not Found",
      description: "The requested tool could not be found on Zenovee.",
    };
  }

  const catKw = categoryKeywords[tool.category] ?? [];
  const toolKeywords = [
    tool.title,
    `${tool.title} online`,
    `free ${tool.title.toLowerCase()}`,
    `${tool.title} tool`,
    tool.category,
    ...catKw,
    "free online tool",
    "zenovee",
    "no signup",
    "browser tool",
  ];

  const seoTitle = `${tool.title} — Free Online Tool`;
  const seoDesc = `${tool.description} Use ${tool.title} free online — no signup required, runs 100% in your browser. Part of Zenovee's ${tool.category} suite.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    description: tool.description,
    url: `https://zenovee.in/dashboard/tools/${tool.id}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (Browser)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: "Zenovee",
      url: "https://zenovee.in",
    },
  };

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: toolKeywords,
    alternates: {
      canonical: `https://zenovee.in/dashboard/tools/${tool.id}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `https://zenovee.in/dashboard/tools/${tool.id}`,
      type: "website",
      siteName: "Zenovee",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${tool.title} — Zenovee Free Tool`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: ["/og-image.png"],
    },
    other: {
      "application/ld+json": JSON.stringify(jsonLd),
    },
  };
}

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
