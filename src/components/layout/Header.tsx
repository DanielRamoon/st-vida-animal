"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Cta } from "@/components/ui/CtaLink";
import { navItems, site } from "@/config/site";
import { cn } from "@/lib/cn";
import { whatsappHref } from "@/lib/whatsapp";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<string>(navItems[0].href);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.15, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function goTo(href: string) {
    setActive(href);
    setOpen(false);
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[60] bg-cream/95 backdrop-blur-md transition-shadow",
          scrolled && "shadow-[0_8px_24px_rgba(20,37,68,0.08)]",
        )}
      >
        <div className="mx-auto flex h-[5.25rem] max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#inicio" className="shrink-0" onClick={() => goTo("#inicio")}>
            <Image
              src="/images/logo.png"
              alt={site.name}
              width={980}
              height={403}
              priority
              className="h-14 w-auto sm:h-16 lg:h-[4.6rem]"
            />
          </a>

          <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Seções">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => goTo(item.href)}
                aria-current={active === item.href ? "true" : undefined}
                className={cn(
                  "font-display text-[15px] font-bold transition-colors hover:text-brand",
                  active === item.href ? "text-brand" : "text-ink",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Cta
              href={whatsappHref()}
              external
              showWhatsApp
              className="hidden px-4 py-2.5 text-sm sm:inline-flex"
            >
              Agende Agora
            </Cta>
            <button
              type="button"
              className="relative z-[80] grid size-11 place-items-center rounded-full text-navy lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      {mounted && open
        ? createPortal(
            <nav
              id="menu-mobile"
              className="fixed inset-x-0 top-[5.25rem] bottom-0 z-[70] flex flex-col gap-2 overflow-y-auto bg-cream px-6 py-6 lg:hidden"
              aria-label="Menu móvel"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => goTo(item.href)}
                  className={cn(
                    "rounded-2xl px-4 py-3 font-display text-lg font-extrabold",
                    active === item.href ? "bg-white text-brand" : "text-ink",
                  )}
                >
                  {item.label}
                </a>
              ))}
              <Cta href={whatsappHref()} external showWhatsApp className="mt-4">
                Agende Agora
              </Cta>
            </nav>,
            document.body,
          )
        : null}
    </>
  );
}
