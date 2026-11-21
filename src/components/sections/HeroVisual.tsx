"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function HeroVisual() {
  const reduced = usePrefersReducedMotion();
  const reduceMotion = useReducedMotion();
  const offset = usePointerParallax(reduced ? 0 : 16);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const swing = isMobile && !reduceMotion;

  return (
    <div
      className="relative z-10 mx-auto w-full max-w-xl will-change-transform lg:max-w-none"
      style={{
        transform: `perspective(1200px) rotateY(${offset.x * 0.35}deg) rotateX(${-offset.y * 0.28}deg) translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: "transform 0.45s ease-out",
      }}
    >
      <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand/25 via-sun/20 to-transparent blur-xl" aria-hidden />
      <motion.div
        className="cine-frame relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]"
        style={{ transformOrigin: "50% 0%" }}
        initial={swing ? { rotate: 11 } : false}
        animate={
          swing
            ? { rotate: [11, -9, 6.5, -4, 2.2, -0.8, 0] }
            : { rotate: 0 }
        }
        transition={
          swing
            ? {
                duration: 3.6,
                ease: "easeInOut",
                times: [0, 0.18, 0.38, 0.56, 0.74, 0.9, 1],
              }
            : { duration: 0 }
        }
      >
        <Image
          src="/images/hero-pets.jpg"
          alt="Golden retriever e gato tigrado no balcão da Vida Animal"
          width={1280}
          height={720}
          priority
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="aspect-[4/3] h-auto w-full object-cover object-[center_30%] lg:-mb-16 lg:aspect-[5/4]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/25 via-transparent to-white/10 mix-blend-soft-light" />
        <div className="cine-scan pointer-events-none absolute inset-0" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#A90008]/35 to-transparent" />
      </motion.div>
    </div>
  );
}
