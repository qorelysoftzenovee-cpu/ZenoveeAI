import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pro-Suite 50",
  description: "Premium B2B multi-tool operating system for marketing, legal, finance, sales, and technical execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0B0F19] text-slate-100">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#0B0F19] text-slate-100">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.16),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.12),transparent_20%),linear-gradient(180deg,#0B0F19_0%,#0B0F19_45%,#070A12_100%)]" />
          {children}
        </div>
      </body>
    </html>
  );
}
