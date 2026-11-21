"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Cta } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/config/site";

export function About() {
  const [open, setOpen] = useState(false);

  return (
    <section id="sobre" className="bg-cream">
      <div className="grid lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-14 sm:px-8 lg:py-20">
          <Reveal direction="left" className="relative w-full max-w-md">
            <Image
              src="/images/about-pets.jpg"
              alt="Cachorro e gato juntos ao ar livre"
              width={1000}
              height={1000}
              sizes="(min-width: 1024px) 28rem, 100vw"
              className="aspect-square w-full rounded-full object-cover shadow-[0_22px_50px_rgba(20,37,68,0.18)] ring-8 ring-white"
            />
            <Heart className="absolute top-4 -right-1 size-12 fill-brand text-brand drop-shadow sm:top-8 sm:-right-2" aria-hidden />
          </Reveal>
        </div>

        <Reveal direction="right" className="bg-brand-bright px-6 py-12 text-white sm:px-10 lg:rounded-l-[6.5rem] lg:px-16 lg:py-20">
          <SectionHeading title={about.title} light />
          <p className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-white/95 sm:text-lg">
            {about.lead}
          </p>
          {open ? (
            <p className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-white/95">{about.more}</p>
          ) : null}
          <div className="mt-8 flex justify-center">
            <Cta variant="white" showChevron onClick={() => setOpen((value) => !value)} ariaExpanded={open}>
              {open ? "Ver menos" : "Conheça Mais"}
            </Cta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
