import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Zenovee Suite | 50+ Free Client-Side Developer & Growth Utilities",
    template: "%s | Zenovee Suite",
  },
  description: "100% free client-side utility platform running high-volume calculations, image conversions, and text processing locally in your browser.",
  keywords: ["Free Tools", "Client Side Utilities", "WebP Converter", "UTM Builder", "TikTok Duration Estimator", "Base64 Encoder", "Developer Tools"],
  authors: [{ name: "Zenovee" }],
  creator: "Zenovee AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zenovee.ai",
    title: "Zenovee Suite | 50+ Free Client-Side Utilities",
    description: "100% free client-side utility platform hosted on Cloudflare Pages.",
    siteName: "Zenovee Suite",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenovee Suite | 50+ Free Client-Side Utilities",
    description: "100% free client-side utility platform.",
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
    <html lang="en" className={`${inter.variable} font-sans h-full antialiased`}>
      <body className="min-h-full">
        {children}

        {/* Lightweight Asynchronous Cloudflare / Privacy Analytics Script Hook */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon='{"token": "zenovee-free-suite-analytics"}'
        />
      </body>
    </html>
  );
}
