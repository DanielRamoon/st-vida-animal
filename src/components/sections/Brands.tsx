"use client";

import { PawPrint } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brands } from "@/config/site";
import { cn } from "@/lib/cn";

function BrandTrack({ reverse = false }: { reverse?: boolean }) {
  const loop = [...brands, ...brands];

  return (
    <div className="brand-marquee overflow-hidden" aria-hidden>
      <ul
        className={cn(
          "brand-marquee-track flex w-max items-center gap-10 py-2 sm:gap-14",
          reverse && "brand-marquee-track-reverse",
        )}
      >
        {loop.map((brand, index) => (
          <li key={`${brand.name}-${index}`} className="flex items-center gap-10 sm:gap-14">
            <span
              className={cn(
                "font-display text-2xl font-black tracking-tight whitespace-nowrap sm:text-3xl lg:text-4xl",
                brand.tone === "brand" ? "text-brand" : "text-navy",
              )}
            >
              {brand.name}
            </span>
            <PawPrint className="size-4 shrink-0 text-sun sm:size-5" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Brands() {
  return (
    <section id="marcas" className="relative overflow-hidden bg-cream px-4 py-16 sm:px-6 sm:py-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/2 size-64 -translate-y-1/2 rounded-full bg-sun/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 size-72 rounded-full bg-brand/10 blur-3xl"
        aria-hidden
      />

      <div className="relative">
        <SectionHeading
          title="Marcas de rações"
          subtitle="Trabalhamos com linhas selecionadas para nutrição de qualidade no dia a dia do seu pet."
        />

        <ul className="sr-only">
          {brands.map((brand) => (
            <li key={brand.name}>{brand.name}</li>
          ))}
        </ul>

        <Reveal delay={0.1} direction="up" className="mx-auto mt-10 max-w-6xl">
          <div className="rounded-[2rem] border border-brand/10 bg-white/70 py-8 shadow-[0_18px_40px_rgba(20,37,68,0.06)] backdrop-blur-sm sm:py-10">
            <BrandTrack />
            <div className="my-5 h-px bg-gradient-to-r from-transparent via-brand/15 to-transparent" />
            <BrandTrack reverse />
          </div>
        </Reveal>

        <Reveal delay={0.18} className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            Golden, Nature e outras marcas de confiança — peça indicação no balcão ou pelo WhatsApp para a
            melhor opção do seu cão ou gato.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
