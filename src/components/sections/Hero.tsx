"use client";

import dynamic from "next/dynamic";
import { PawPrint } from "lucide-react";
import { FloatingPetPanels } from "@/components/cinematic/FloatingPetPanels";
import { RunningPets } from "@/components/cinematic/RunningPets";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { Cta } from "@/components/ui/CtaLink";
import { Curve } from "@/components/ui/Waves";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappHref } from "@/lib/whatsapp";

const HeroScene = dynamic(
  () => import("@/components/cinematic/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false },
);

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-cream">
      <HeroScene />
      <FloatingPetPanels />
      <RunningPets tone="cream" className="z-[2]" />

      <PawPrint className="float-slow absolute top-6 left-[7%] z-[2] hidden size-16 -rotate-12 text-brand/10 lg:block" aria-hidden />
      <PawPrint className="float-slow absolute top-8 right-[8%] z-[2] size-12 rotate-12 text-brand/10 sm:size-16" aria-hidden />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 px-4 pt-4 pb-8 sm:px-6 sm:pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pt-2 lg:pb-4">
        <Reveal direction="left">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/70 px-3 py-1 font-display text-[11px] font-bold tracking-[0.16em] text-brand uppercase backdrop-blur-sm">
            Experiência pet cinematográfica
          </p>
          <h1 className="font-display text-[2.45rem] leading-[1.02] font-black tracking-tight sm:text-5xl lg:text-[3.5rem]">
            <span className="block text-brand">Amor, carinho</span>
            <span className="block text-brand">e cuidado em</span>
            <span className="block text-sun">cada detalhe!</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink sm:text-lg">
            Tudo o que seu pet precisa para viver mais feliz e saudável.
          </p>
          <Cta href={whatsappHref()} external variant="red" showWhatsApp showChevron className="mt-7">
            Agendar Atendimento
          </Cta>
        </Reveal>
        <Reveal direction="right" delay={0.12}>
          <HeroVisual />
        </Reveal>
      </div>

      <div className="relative z-10 bg-cream text-brand-bright">
        <Curve />
      </div>
    </section>
  );
}
