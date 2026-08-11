import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://zenovee.in"),
  title: {
    default: "Zenovee — 200+ Free Online Tools for Developers & Marketers",
    template: "%s | Zenovee — Free Online Tools",
  },
  description:
    "200+ free browser-native tools for developers, designers, and marketers. JSON formatter, image compressor, SEO tools, calculators & more — zero signup, runs 100% in your browser.",
  keywords: [
    "free online tools",
    "developer tools",
    "marketing tools",
    "JSON formatter",
    "image compressor",
    "SEO tools",
    "calculator",
    "Base64 encoder",
    "password generator",
    "color picker",
    "regex tester",
    "client-side utilities",
    "privacy-first tools",
    "zenovee",
  ],
  authors: [{ name: "Zenovee", url: "https://zenovee.in" }],
  creator: "Zenovee",
  publisher: "Zenovee",
  alternates: {
    canonical: "https://zenovee.in",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zenovee.in",
    title: "Zenovee — 200+ Free Online Tools for Developers & Marketers",
    description:
      "200+ free tools that run 100% in your browser. JSON formatter, image tools, SEO suite, calculators. No signup, no data collection.",
    siteName: "Zenovee",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zenovee — Free Online Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zenovee",
    creator: "@zenovee",
    title: "Zenovee — 200+ Free Browser-Native Tools",
    description:
      "200+ free tools for developers & marketers. Zero data collection, zero signup.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full font-sans antialiased bg-white text-slate-900 selection:bg-blue-500/20 selection:text-blue-900 grain-overlay">
        {children}

        {/* Cloudflare Analytics */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon='{"token": "zenovee-free-suite-analytics"}'
        />
      </body>
    </html>
  );
}
