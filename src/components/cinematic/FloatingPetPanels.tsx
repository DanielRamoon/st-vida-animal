"use client";

import Image from "next/image";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const panels = [
  {
    src: "/images/galeria-banho.jpg",
    alt: "Pet no banho",
    className: "left-[4%] top-[18%] w-[7.5rem] -rotate-12 sm:w-36 lg:left-[2%] lg:top-[22%]",
    depth: 18,
  },
  {
    src: "/images/galeria-laco.jpg",
    alt: "Pet feliz",
    className: "right-[3%] top-[12%] w-[6.5rem] rotate-8 sm:w-32 lg:right-[1%] lg:top-[16%]",
    depth: 24,
  },
  {
    src: "/images/galeria-descanso.jpg",
    alt: "Gato descansando",
    className: "bottom-[22%] left-[8%] hidden w-28 -rotate-6 sm:block lg:bottom-[26%] lg:left-[6%]",
    depth: 14,
  },
] as const;

export function FloatingPetPanels() {
  const reduced = usePrefersReducedMotion();
  const offset = usePointerParallax(reduced ? 0 : 22);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] hidden perspective-[1200px] md:block" aria-hidden>
      {panels.map((panel) => (
        <div
          key={panel.src}
          className={`absolute overflow-hidden rounded-3xl border border-white/70 shadow-[0_18px_40px_rgba(20,37,68,0.18)] transition-transform duration-500 ease-out ${panel.className}`}
          style={{
            transform: `translate3d(${offset.x * (panel.depth / 20)}px, ${offset.y * (panel.depth / 24)}px, ${panel.depth}px) rotateY(${offset.x * 0.4}deg) rotateX(${-offset.y * 0.35}deg)`,
          }}
        >
          <Image
            src={panel.src}
            alt={panel.alt}
            width={360}
            height={270}
            className="aspect-[4/3] h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand/25 via-transparent to-sun/20 mix-blend-soft-light" />
        </div>
      ))}
    </div>
  );
}
