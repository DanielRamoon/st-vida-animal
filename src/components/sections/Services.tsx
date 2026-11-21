"use client";

import { PawPrint, Scissors, Syringe } from "lucide-react";
import { BowlIcon } from "@/components/icons/BowlIcon";
import { ServiceCard3D } from "@/components/cinematic/ServiceCard3D";
import { ServicesVideo } from "@/components/sections/ServicesVideo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/config/site";

const icons = {
  scissors: Scissors,
  syringe: Syringe,
  bowl: BowlIcon,
  paw: PawPrint,
};

const effects = {
  scissors: "bath",
  syringe: "pulse",
  bowl: "orbit",
  paw: "glow",
} as const;

export function Services() {
  return (
    <section id="servicos" className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20">
      <ServicesVideo />

      <div className="relative z-10">
        <SectionHeading title="Nossos Serviços" subtitle="Cuidado completo para seu pet em um só lugar!" />

        <ul className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 xl:grid-cols-4" style={{ perspective: "1200px" }}>
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <li key={service.title} className="h-full">
                <Reveal
                  delay={index * 0.1}
                  direction={index % 2 === 0 ? "up" : "scale"}
                  className="h-full"
                >
                  <ServiceCard3D
                    title={service.title}
                    description={service.description}
                    accent={service.accent}
                    effect={effects[service.icon]}
                    icon={<Icon className="size-7" />}
                  />
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
