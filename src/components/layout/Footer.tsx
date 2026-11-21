"use client";

import Image from "next/image";
import { PawPrint } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { Reveal } from "@/components/ui/Reveal";
import { navItems, site } from "@/config/site";

const socials = [
  { href: site.social.instagram, label: "Instagram", icon: InstagramIcon },
  { href: site.social.facebook, label: "Facebook", icon: FacebookIcon },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Reveal direction="up" className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_auto_1fr] lg:py-12">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <Image src="/images/logo.png" alt={site.name} width={980} height={403} className="h-16 w-auto" />
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-medium text-white/80 lg:justify-start">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-sun">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <p className="font-display text-sm font-bold sm:text-base">Siga-nos nas redes sociais</p>
          <div className="mt-3 flex items-center justify-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              const classes =
                "grid size-10 place-items-center rounded-full border border-white/25 text-white transition hover:border-sun hover:text-sun";

              if (!social.href) {
                return (
                  <span key={social.label} className={classes} aria-hidden>
                    <Icon className="size-5" />
                  </span>
                );
              }

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={classes}
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>
          <p className="mt-4 text-sm text-white/75">
            {site.address.street}
            <br />
            {site.address.city}
            <br />
            {site.phoneDisplay}
          </p>
        </div>

        <p className="flex items-center justify-center gap-2 text-center font-display text-2xl font-extrabold italic leading-tight sm:text-3xl lg:justify-end">
          Porque eles merecem o melhor!
          <PawPrint className="size-7 shrink-0" aria-hidden />
        </p>
      </Reveal>
      <p className="px-4 pb-6 text-center text-xs text-white/60">
        © 2026 {site.name}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
