"use client";

import { Clock, MapPin, PawPrint, Phone } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { Cta } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { Curve } from "@/components/ui/Waves";
import { site } from "@/config/site";
import { mapsHref, whatsappHref } from "@/lib/whatsapp";

export function Contact() {
  return (
    <section id="contato" className="relative bg-brand-bright text-white">
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-14 w-full -translate-y-[calc(100%-1px)] text-brand-bright md:h-16"
        aria-hidden
      >
        <path fill="currentColor" d="M0,90 C420,8 1020,8 1440,90 L1440,90 L0,90 Z" />
      </svg>

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_1fr_0.85fr_0.85fr_auto] lg:py-16">
        <Reveal direction="left" className="flex items-center gap-4">
          <PawPrint className="size-14 shrink-0" aria-hidden />
          <h2 className="font-display text-3xl leading-[1.05] font-black sm:text-4xl">
            Vamos cuidar do
            <br />
            seu melhor amigo?
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <a href={mapsHref()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-sun">
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/50">
              <MapPin className="size-5" aria-hidden />
            </span>
            <span className="text-sm leading-snug font-semibold sm:text-base">
              {site.address.street}
              <br />
              {site.address.city}
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.12}>
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-sun">
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/50">
              <Phone className="size-5" aria-hidden />
            </span>
            <span className="text-sm leading-snug font-semibold sm:text-base">
              WhatsApp
              <br />
              {site.phoneDisplay}
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.16} className="flex items-center gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/50">
            <Clock className="size-5" aria-hidden />
          </span>
          <p className="text-sm leading-snug font-semibold sm:text-base">
            {site.hours.days}
            <br />
            {site.hours.time}
          </p>
        </Reveal>

        <Reveal delay={0.2} direction="right">
          <Cta href={whatsappHref()} external showWhatsApp>
            Fale Conosco
          </Cta>
        </Reveal>
      </div>

      <Reveal delay={0.12} direction="up" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <ContactForm />
      </Reveal>

      <div className="text-navy">
        <Curve />
      </div>
    </section>
  );
}
