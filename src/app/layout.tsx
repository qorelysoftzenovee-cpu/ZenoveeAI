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
  title: {
    default: "Zenovee — Premium Developer & Marketing Tool Suite",
    template: "%s | Zenovee",
  },
  description:
    "Experience the ultimate collection of 250+ ultra-fast, premium client-side tools for developers and marketers. Zero server calls, total privacy, absolutely free.",
  keywords: [
    "free online tools",
    "developer tools",
    "marketing tools",
    "client-side utilities",
    "WebP converter",
    "UTM builder",
    "JSON formatter",
    "image compressor",
    "Base64 encoder",
    "privacy-first tools",
  ],
  authors: [{ name: "Zenovee" }],
  creator: "Zenovee",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zenovee.ai",
    title: "Zenovee — Free Browser-Native Developer & Marketing Tools",
    description:
      "250+ free tools that run 100% in your browser. No signup, no data collection, no limits.",
    siteName: "Zenovee",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenovee — Free Browser-Native Tools",
    description:
      "250+ free client-side tools for developers and marketers. Zero data collection.",
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
