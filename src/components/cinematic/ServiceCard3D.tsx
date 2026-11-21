"use client";

import { useRef, useState } from "react";
import { BubbleField } from "@/components/cinematic/BubbleField";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

type ServiceCard3DProps = {
  title: string;
  description: string;
  accent: "brand" | "sun";
  effect: "bath" | "pulse" | "orbit" | "glow";
  icon: React.ReactNode;
};

export function ServiceCard3D({ title, description, accent, effect, icon }: ServiceCard3DProps) {
  const reduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 40 });

  function onMove(event: React.PointerEvent<HTMLElement>) {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setTilt({
      x: (py - 0.5) * -16,
      y: (px - 0.5) * 18,
      glowX: px * 100,
      glowY: py * 100,
    });
  }

  function onLeave() {
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 40 });
  }

  return (
    <article
      ref={cardRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="service-card-3d relative h-full [transform-style:preserve-3d]"
      style={{
        transform: reduced
          ? undefined
          : `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
      }}
    >
      <div
        className={cn(
          "relative flex h-full flex-col items-center overflow-hidden rounded-[1.6rem] border border-white/80 bg-white/90 px-5 py-8 text-center shadow-[0_18px_40px_rgba(23,32,51,0.1)] backdrop-blur-sm transition-shadow duration-300",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-[1.6rem] before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] hover:before:opacity-100",
        )}
        style={{
          backgroundImage: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(255,196,0,0.22), transparent 42%), linear-gradient(160deg, rgba(255,255,255,0.96), rgba(255,249,242,0.92))`,
        }}
      >
        <div className="holo-shine pointer-events-none absolute inset-0" aria-hidden />

        {effect === "bath" ? <BubbleField /> : null}
        {effect === "pulse" ? <span className="pulse-ring absolute top-8 left-1/2 size-20 -translate-x-1/2 rounded-full" aria-hidden /> : null}
        {effect === "orbit" ? (
          <span className="orbit-ring absolute top-7 left-1/2 size-24 -translate-x-1/2" aria-hidden>
            <i />
            <i />
            <i />
          </span>
        ) : null}
        {effect === "glow" ? <span className="vet-glow absolute inset-x-8 top-6 h-24 rounded-full" aria-hidden /> : null}

        <span
          className={cn(
            "relative z-10 grid size-16 place-items-center rounded-full text-white shadow-[0_12px_24px_rgba(169,0,8,0.28),inset_0_-6px_0_rgba(0,0,0,0.08)] [transform:translateZ(28px)]",
            accent === "sun" ? "bg-sun text-navy" : "bg-brand",
          )}
        >
          {icon}
        </span>
        <h3 className="relative z-10 mt-5 font-display text-lg font-extrabold text-ink [transform:translateZ(20px)]">
          {title}
        </h3>
        <p className="relative z-10 mt-2 text-sm leading-relaxed text-muted [transform:translateZ(16px)]">
          {description}
        </p>

        {effect === "bath" ? (
          <p className="relative z-10 mt-4 font-display text-[11px] font-bold tracking-[0.18em] text-brand/70 uppercase">
            Espuma & carinho
          </p>
        ) : null}
      </div>
    </article>
  );
}
