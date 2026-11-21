"use client";

import { useEffect, useRef, useState } from "react";
import { SoftBackdrop } from "@/components/cinematic/SoftBackdrop";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ServicesVideo() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !desktop || reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio > 0.28;
        setActive(visible);
        if (visible) setShouldLoad(true);
      },
      { threshold: [0.2, 0.35, 0.5] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [desktop, reduced]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced || !desktop) return;

    if (active) {
      const play = video.play();
      if (play) play.catch(() => undefined);
    } else {
      video.pause();
    }
  }, [active, reduced, desktop]);

  if (reduced || !desktop) {
    return (
      <div ref={sectionRef} className="pointer-events-none absolute inset-0" aria-hidden>
        <SoftBackdrop />
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        src={shouldLoad ? "/videos/dog-ball-run.mp4" : undefined}
        muted
        playsInline
        loop
        preload="none"
      />
      <div className="absolute inset-0 bg-white/78 backdrop-blur-[1.5px]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.2)_45%,rgba(255,255,255,0.7)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(255,196,0,0.12),transparent_35%)]" />
    </div>
  );
}
