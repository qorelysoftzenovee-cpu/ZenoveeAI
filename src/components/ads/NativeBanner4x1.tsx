"use client";
import { useEffect, useRef } from "react";

export default function NativeBanner4x1() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current || bannerRef.current.querySelector("script")) return;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "https://pl30657931.effectivecpmnetwork.com/ec4f1d4525593705b5fafec9007ac784/invoke.js";

    bannerRef.current.appendChild(script);
  }, []);

  return (
    <div className="flex justify-center w-full my-6 min-h-[100px]">
      <div ref={bannerRef} id="container-ec4f1d4525593705b5fafec9007ac784"></div>
    </div>
  );
}
