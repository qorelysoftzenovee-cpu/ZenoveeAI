import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "50+ Tools Standalone SPA | Zenovee Suite",
  description: "100% free client-side utility suite running locally in browser memory.",
};

export default function TemplatePage() {
  return (
    <iframe
      src="/template/index.html"
      className="w-full h-screen border-none"
      title="50+ Tools Standalone SPA"
    />
  );
}
