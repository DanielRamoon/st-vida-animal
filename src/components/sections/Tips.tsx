"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { tips } from "@/config/site";

export function Tips() {
  return (
    <section id="dicas" className="bg-cream px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading title="Dicas de cuidado" subtitle="Pequenos hábitos que deixam a rotina do pet mais leve." />
      <ol className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-3">
        {tips.map((tip, index) => (
          <li key={tip.title} className="h-full">
            <Reveal
              delay={index * 0.1}
              direction={index % 2 === 0 ? "up" : "scale"}
              className="h-full rounded-[1.6rem] bg-white p-6 shadow-[0_12px_30px_rgba(23,32,51,0.06)]"
            >
              <span className="font-display text-4xl font-black text-sun">0{index + 1}</span>
              <h3 className="mt-3 font-display text-xl font-extrabold text-ink">{tip.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{tip.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
