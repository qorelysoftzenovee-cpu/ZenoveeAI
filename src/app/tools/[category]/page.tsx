import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { toolsConfig } from "@/utils/toolsConfig";

// Map slug → display category name
const SLUG_TO_CATEGORY: Record<string, string> = {
  "developer-tech-utilities":    "Developer & Tech Utilities",
  "media-design-productivity":   "Media, Design & Productivity",
  "growth-marketing-seo":        "Growth Marketing & SEO Suite",
  "calculators-mathematics":     "Calculators & Mathematics",
  "network-server-utilities":    "Network & Server Utilities",
  "financial-investment":        "Financial & Investment Engines",
};

const CATEGORY_META: Record<string, { icon: string; color: string; hero: string; keywords: string[] }> = {
  "Developer & Tech Utilities": {
    icon: "⚙️", color: "blue",
    hero: "Professional developer utilities that run 100% in your browser.",
    keywords: ["developer tools", "code formatter", "json formatter", "regex tester", "jwt decoder", "base64", "api testing"],
  },
  "Media, Design & Productivity": {
    icon: "🎨", color: "purple",
    hero: "Image, design, and productivity tools — compress, convert, and create without leaving your browser.",
    keywords: ["image compressor", "svg editor", "color picker", "photo editor", "design tool", "media converter"],
  },
  "Growth Marketing & SEO Suite": {
    icon: "📈", color: "green",
    hero: "Data-driven marketing and SEO tools to grow your traffic and conversions.",
    keywords: ["seo tool", "keyword research", "hashtag generator", "meta tag generator", "content marketing", "utm builder"],
  },
  "Calculators & Mathematics": {
    icon: "🔢", color: "orange",
    hero: "Scientific calculators, unit converters, and math tools — all in your browser.",
    keywords: ["online calculator", "scientific calculator", "unit converter", "math tool", "percentage calculator"],
  },
  "Network & Server Utilities": {
    icon: "🌐", color: "teal",
    hero: "Network diagnostics, DNS lookup, and server utility tools for webmasters and DevOps.",
    keywords: ["dns lookup", "ip address tool", "http header checker", "cors checker", "ping tool", "network utility"],
  },
  "Financial & Investment Engines": {
    icon: "💰", color: "emerald",
    hero: "Financial calculators and investment tools to plan smarter.",
    keywords: ["financial calculator", "investment calculator", "roi calculator", "crypto calculator", "savings planner"],
  },
};

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SLUG_TO_CATEGORY).map((slug) => ({ category: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const catName = SLUG_TO_CATEGORY[slug];
  if (!catName) return { title: "Category Not Found" };

  const meta = CATEGORY_META[catName];
  const tools = toolsConfig.filter((t) => t.category === catName);

  return {
    title: `${catName} — ${tools.length} Free Online Tools`,
    description: `${meta.hero} Browse ${tools.length} free ${catName.toLowerCase()} tools on Zenovee — no signup required.`,
    keywords: [...meta.keywords, "free online tool", "zenovee", "no signup", catName.toLowerCase()],
    alternates: { canonical: `https://zenovee.in/tools/${slug}` },
    openGraph: {
      title: `${catName} Tools — Free Online | Zenovee`,
      description: `${tools.length} free ${catName.toLowerCase()} tools. ${meta.hero}`,
      url: `https://zenovee.in/tools/${slug}`,
      type: "website",
      siteName: "Zenovee",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${catName} — Zenovee` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${catName} — ${tools.length} Free Tools | Zenovee`,
      description: `${meta.hero} Free, no signup.`,
      images: ["/og-image.png"],
    },
  };
}

const COLOR_STYLES: Record<string, Record<string, string>> = {
  blue:    { badge:"bg-blue-100 text-blue-700",    ring:"ring-blue-200",    heading:"text-blue-700",    btn:"bg-blue-600 hover:bg-blue-700" },
  purple:  { badge:"bg-purple-100 text-purple-700",ring:"ring-purple-200",  heading:"text-purple-700",  btn:"bg-purple-600 hover:bg-purple-700" },
  green:   { badge:"bg-green-100 text-green-700",  ring:"ring-green-200",   heading:"text-green-700",   btn:"bg-green-600 hover:bg-green-700" },
  orange:  { badge:"bg-orange-100 text-orange-700",ring:"ring-orange-200",  heading:"text-orange-700",  btn:"bg-orange-600 hover:bg-orange-700" },
  teal:    { badge:"bg-teal-100 text-teal-700",    ring:"ring-teal-200",    heading:"text-teal-700",    btn:"bg-teal-600 hover:bg-teal-700" },
  emerald: { badge:"bg-emerald-100 text-emerald-700",ring:"ring-emerald-200",heading:"text-emerald-700",btn:"bg-emerald-600 hover:bg-emerald-700" },
};

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const catName = SLUG_TO_CATEGORY[slug];
  if (!catName) notFound();

  const meta = CATEGORY_META[catName];
  const tools = toolsConfig.filter((t) => t.category === catName);
  const colors = COLOR_STYLES[meta.color] ?? COLOR_STYLES.blue;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${catName} Free Online Tools`,
    description: meta.hero,
    url: `https://zenovee.in/tools/${slug}`,
    provider: { "@type": "Organization", name: "Zenovee", url: "https://zenovee.in" },
    hasPart: tools.map((t) => ({
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
        <section className="pt-28 pb-14 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6">
            <nav className="text-sm text-slate-500 mb-5" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2">
                <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                <li>/</li>
                <li><Link href="/tools" className="hover:text-blue-600">Tools</Link></li>
                <li>/</li>
                <li className="text-slate-700 font-medium">{catName}</li>
              </ol>
            </nav>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5 ${colors.badge}`}>
              <span>{meta.icon}</span> {catName}
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Free {catName}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mb-6 leading-relaxed">{meta.hero}</p>
            <div className="flex items-center gap-4">
              <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ring-1 ${colors.badge} ${colors.ring}`}>
                {tools.length} tools available
              </span>
              <Link href="/tools" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                ← View all categories
              </Link>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="max-w-5xl mx-auto px-6 py-14 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={`/dashboard/tools/${tool.id}`}
                className="group flex flex-col p-5 rounded-2xl border border-slate-200 bg-white
                  hover:border-blue-300 hover:shadow-lg transition-all duration-200"
              >
                <h2 className="font-bold text-slate-800 text-sm mb-2 group-hover:text-blue-600 transition-colors">
                  {tool.title}
                </h2>
                <p className="text-slate-500 text-xs leading-relaxed flex-1 line-clamp-3">
                  {tool.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    Free
                  </span>
                  <span className="text-xs text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                    Use now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className="bg-slate-50 border-t border-slate-200 py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-5">
              {[
                {
                  q: `Are these ${catName.toLowerCase()} tools really free?`,
                  a: `Yes — every tool in Zenovee's ${catName} suite is completely free. No hidden fees, no premium tier, no signup required.`,
                },
                {
                  q: "Is my data safe when using these tools?",
                  a: "All Zenovee tools run 100% in your browser using client-side JavaScript. Your data never leaves your device and is never sent to any server.",
                },
                {
                  q: `How many ${catName.toLowerCase()} tools are available?`,
                  a: `Zenovee currently offers ${tools.length} free ${catName.toLowerCase()} tools, with more added regularly.`,
                },
                {
                  q: "Do I need to create an account?",
                  a: "No account needed. Simply visit any tool page and start using it immediately.",
                },
              ].map(({ q, a }) => (
                <details
                  key={q}
                  className="bg-white border border-slate-200 rounded-xl p-5 group cursor-pointer"
                >
                  <summary className="font-semibold text-slate-800 text-sm list-none flex items-center justify-between">
                    {q}
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-slate-600 text-sm leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
