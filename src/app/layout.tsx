import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
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
    default: "Zenovee AI | The Ultimate AI Operating System",
    template: "%s | Zenovee AI",
  },
  description: "Premium B2B multi-tool operating system for marketing, legal, finance, sales, and technical execution.",
  keywords: ["AI Tools", "B2B SaaS", "Marketing AI", "Legal AI", "Finance AI"],
  authors: [{ name: "Zenovee" }],
  creator: "Zenovee AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zenovee.ai",
    title: "Zenovee AI | The Ultimate AI Operating System",
    description: "Premium B2B multi-tool operating system.",
    siteName: "Zenovee AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenovee AI | The Ultimate AI Operating System",
    description: "Premium B2B multi-tool operating system.",
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
      </body>
    </html>
  );
}
