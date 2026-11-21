"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ServicesVideo() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.28);
      },
      { threshold: [0.2, 0.35, 0.5] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;

    if (active) {
      const play = video.play();
      if (play) play.catch(() => undefined);
    } else {
      video.pause();
    }
  }, [active, reduced]);

  if (reduced) {
    return (
      <div
        ref={sectionRef}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,196,0,0.14),transparent_40%),radial-gradient(circle_at_20%_70%,rgba(169,0,8,0.08),transparent_42%)]"
        aria-hidden
      />
    );
  }

  return (
    <div ref={sectionRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        src="/videos/dog-ball-run.mp4"
        muted
        playsInline
        loop
        preload="metadata"
      />
      <div className="absolute inset-0 bg-white/78 backdrop-blur-[1.5px]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.2)_45%,rgba(255,255,255,0.7)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(255,196,0,0.12),transparent_35%)]" />
    </div>
  );
}
