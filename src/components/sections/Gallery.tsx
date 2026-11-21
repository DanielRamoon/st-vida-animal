"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gallery } from "@/config/site";
import { cn } from "@/lib/cn";

export function Gallery() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-gallery-item]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const index = Number(visible?.target.getAttribute("data-index"));
        if (!Number.isNaN(index)) setActive(index);
      },
      { threshold: 0.65 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (open === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") setOpen((index) => (index === null ? index : (index + 1) % gallery.length));
      if (event.key === "ArrowLeft") {
        setOpen((index) => (index === null ? index : (index - 1 + gallery.length) % gallery.length));
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function show(index: number) {
    document.getElementById(`foto-${index}`)?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    setActive(index);
  }

  const current = open === null ? null : gallery[open];

  return (
    <section id="galeria" className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        title="Momentos Especiais"
        subtitle="Confira alguns dos nossos atendimentos e clientes felizes!"
      />

      <ul className="mx-auto mt-10 flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
        {gallery.map((photo, index) => (
          <li
            key={photo.src}
            id={`foto-${index}`}
            data-gallery-item
            data-index={index}
            className="w-[84%] shrink-0 snap-center sm:w-[46%] lg:w-auto"
          >
            <Reveal delay={index * 0.08} direction={index % 2 === 0 ? "up" : "scale"}>
              <button
                type="button"
                onClick={() => setOpen(index)}
                className="group block w-full overflow-hidden rounded-[1.4rem] shadow-[0_12px_28px_rgba(23,32,51,0.08)]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 22vw, 80vw"
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="sr-only">Ampliar: {photo.alt}</span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-center gap-2" aria-label="Fotos da galeria">
        {gallery.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            aria-label={`Mostrar foto ${index + 1}`}
            aria-current={active === index ? "true" : undefined}
            onClick={() => show(index)}
            className={cn("h-2.5 rounded-full transition-all", active === index ? "w-6 bg-brand" : "w-2.5 bg-brand/25")}
          />
        ))}
      </div>

      {current ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white text-navy"
            aria-label="Fechar imagem"
            onClick={() => setOpen(null)}
          >
            <X />
          </button>
          <button
            type="button"
            className="absolute left-3 grid size-11 place-items-center rounded-full bg-white text-navy sm:left-6"
            aria-label="Imagem anterior"
            onClick={(event) => {
              event.stopPropagation();
              setOpen((index) => (index === null ? index : (index - 1 + gallery.length) % gallery.length));
            }}
          >
            <ChevronLeft />
          </button>
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            className="max-h-[82vh] w-auto max-w-[88vw] rounded-2xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="absolute right-3 grid size-11 place-items-center rounded-full bg-white text-navy sm:right-6"
            aria-label="Próxima imagem"
            onClick={(event) => {
              event.stopPropagation();
              setOpen((index) => (index === null ? index : (index + 1) % gallery.length));
            }}
          >
            <ChevronRight />
          </button>
        </div>
      ) : null}
    </section>
  );
}
