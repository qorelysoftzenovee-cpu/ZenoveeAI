"use client";
import { useEffect, useRef } from "react";

export default function Banner300x250() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current || bannerRef.current.hasChildNodes()) return;

    // We inject the script tags manually on mount to avoid Next.js hydration issues
    // and to safely execute Adsterra's document inline code.
    const conf = document.createElement("script");
    conf.type = "text/javascript";
    conf.innerHTML = `atOptions = {
      'key' : '5eb786c42b98afec565f01a087469d52',
      'format' : 'iframe',
      'height' : 250,
      'width' : 300,
      'params' : {}
    };`;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://www.highperformanceformat.com/5eb786c42b98afec565f01a087469d52/invoke.js";

    bannerRef.current.appendChild(conf);
    bannerRef.current.appendChild(script);
  }, []);

  return (
    <div className="flex justify-center w-full my-6 min-h-[250px]">
      <div ref={bannerRef} />
    </div>
  );
}
