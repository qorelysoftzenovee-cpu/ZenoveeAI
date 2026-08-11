import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { toolsConfig } from "@/utils/toolsConfig";

export const metadata: Metadata = {
  title: "200+ Free Online Tools — Developer, SEO, Design & More",
  description:
    "Browse Zenovee's complete collection of 200+ free browser-native tools. JSON formatters, image compressors, SEO analyzers, financial calculators, and more — all free, no signup.",
  keywords: [
    "free online tools",
    "developer tools",
    "seo tools",
    "image tools",
    "calculator",
    "marketing tools",
    "json formatter",
    "base64 encoder",
    "color picker",
    "tools directory",
    "zenovee tools",
  ],
  alternates: { canonical: "https://zenovee.in/tools" },
  openGraph: {
    title: "200+ Free Online Tools — Zenovee",
    description:
      "Browse all 200+ free browser tools: developer utilities, SEO suite, image tools, calculators and more.",
    url: "https://zenovee.in/tools",
    type: "website",
    siteName: "Zenovee",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Zenovee Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "200+ Free Online Tools — Zenovee",
    description: "Browse all 200+ free tools. No signup, runs in browser.",
    images: ["/og-image.png"],
  },
};

// Category config
const CATEGORY_META: Record<string, { icon: string; color: string; slug: string }> = {
  "Developer & Tech Utilities":    { icon: "⚙️", color: "blue",   slug: "developer-tech-utilities" },
  "Media, Design & Productivity":  { icon: "🎨", color: "purple", slug: "media-design-productivity" },
  "Growth Marketing & SEO Suite":  { icon: "📈", color: "green",  slug: "growth-marketing-seo" },
  "Calculators & Mathematics":     { icon: "🔢", color: "orange", slug: "calculators-mathematics" },
  "Network & Server Utilities":    { icon: "🌐", color: "teal",   slug: "network-server-utilities" },
  "Financial & Investment Engines":{ icon: "💰", color: "emerald",slug: "financial-investment" },
};

const COLOR_CLASSES: Record<string, { badge: string; border: string; heading: string; link: string }> = {
  blue:    { badge: "bg-blue-100 text-blue-700",    border: "border-blue-200",   heading: "text-blue-700",    link: "hover:text-blue-600" },
  purple:  { badge: "bg-purple-100 text-purple-700",border: "border-purple-200", heading: "text-purple-700",  link: "hover:text-purple-600" },
  green:   { badge: "bg-green-100 text-green-700",  border: "border-green-200",  heading: "text-green-700",   link: "hover:text-green-600" },
  orange:  { badge: "bg-orange-100 text-orange-700",border: "border-orange-200", heading: "text-orange-700",  link: "hover:text-orange-600" },
  teal:    { badge: "bg-teal-100 text-teal-700",    border: "border-teal-200",   heading: "text-teal-700",    link: "hover:text-teal-600" },
  emerald: { badge: "bg-emerald-100 text-emerald-700",border:"border-emerald-200",heading:"text-emerald-700", link: "hover:text-emerald-600" },
};

export default function ToolsDirectoryPage() {
  const grouped = toolsConfig.reduce<Record<string, typeof toolsConfig>>((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {});

  const totalTools = toolsConfig.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Zenovee Free Online Tools Directory",
    description: `Browse ${totalTools}+ free browser-native tools for developers, designers, and marketers.`,
    url: "https://zenovee.in/tools",
    provider: { "@type": "Organization", name: "Zenovee", url: "https://zenovee.in" },
    hasPart: toolsConfig.map((t) => ({
      "@type": "SoftwareApplication",
      name: t.title,
      description: t.description,
      url: `https://zenovee.in/dashboard/tools/${t.id}`,
      applicationCategory: "UtilitiesApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen flex flex-col bg-white">
        <Navbar />

        {/* Hero */}
        <section className="pt-28 pb-16 bg-gradient-to-b from-blue-50 to-white border-b border-blue-100">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <span>🛠️</span> Free Tools Directory
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-5 tracking-tight leading-tight">
              {totalTools}+ Free Online Tools
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Every tool runs 100% in your browser — no signup, no data collection, no limits.
              From JSON formatters to crypto calculators.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {Object.entries(CATEGORY_META).map(([cat, meta]) => (
                <Link
                  key={cat}
                  href={`#${meta.slug}`}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border font-medium transition-all
                    ${COLOR_CLASSES[meta.color].badge} ${COLOR_CLASSES[meta.color].border}
                    hover:shadow-sm hover:scale-105`}
                >
                  <span>{meta.icon}</span> {cat}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Tools by Category */}
        <section className="max-w-6xl mx-auto px-6 py-16 w-full">
          {Object.entries(grouped).map(([category, tools]) => {
            const meta = CATEGORY_META[category] ?? { icon: "🔧", color: "blue", slug: category };
            const colors = COLOR_CLASSES[meta.color] ?? COLOR_CLASSES.blue;
            return (
              <div key={category} id={meta.slug} className="mb-16 scroll-mt-24">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200">
                  <span className="text-2xl">{meta.icon}</span>
                  <h2 className={`text-2xl font-bold ${colors.heading}`}>{category}</h2>
                  <span className={`ml-auto text-sm font-semibold px-3 py-1 rounded-full ${colors.badge}`}>
                    {tools.length} tools
                  </span>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/dashboard/tools/${tool.id}`}
                      className={`group flex flex-col p-4 rounded-xl border border-slate-200 bg-white
                        hover:border-blue-300 hover:shadow-md transition-all duration-200`}
                    >
                      <h3 className={`font-semibold text-slate-800 text-sm mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-2`}>
                        {tool.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 flex-1">
                        {tool.description}
                      </p>
                      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:gap-2 transition-all">
                        Use free <span>→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Bottom CTA */}
        <section className="bg-blue-600 py-14 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-black text-white mb-4">
              All {totalTools} tools. Always free.
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              No account. No watermarks. No limits. Just open a tool and start working.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3.5 rounded-full hover:bg-blue-50 transition-all hover:shadow-lg"
            >
              Open the Dashboard →
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
