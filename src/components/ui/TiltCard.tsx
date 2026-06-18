"use client";

import React, { useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxRotation?: number;
  scale?: number;
  glowColor?: string;
}

export function TiltCard({
  children,
  className = "",
  style: externalStyle,
  maxRotation = 8,
  scale = 1.02,
  glowColor = "rgba(20, 184, 166, 0.12)",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = ((yc - y) / yc) * maxRotation;
    const angleY = ((x - xc) / xc) * maxRotation;

    setStyle({
      transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      boxShadow: `0 25px 50px -12px ${glowColor}, 0 12px 24px -10px rgba(0, 0, 0, 0.05)`,
      zIndex: 10,
    });

    setGlowStyle({
      opacity: 1,
      left: `${x}px`,
      top: `${y}px`,
      transform: "translate(-50%, -50%)",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      boxShadow: "none",
      transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
    });

    setGlowStyle({
      opacity: 0,
      transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
        transformStyle: "preserve-3d",
        position: "relative",
        overflow: "hidden",
        ...externalStyle,
        ...style,
      }}
      className={className}
    >
      {/* Radial Hover Glow Background Effect */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: `radial-gradient(circle, ${glowColor.replace(/0.12\)/g, "0.2)") || "rgba(20, 184, 166, 0.25)"} 0%, transparent 70%)`,
          pointerEvents: "none",
          mixBlendMode: "screen",
          zIndex: 1,
          ...glowStyle,
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}
