"use client";

import { PawPrint } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
};

export function SectionHeading({ title, subtitle, light = false, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("mx-auto max-w-3xl text-center", className)} direction="scale">
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <span className={cn("hidden h-px w-14 sm:block md:w-20", light ? "bg-white/45" : "bg-brand/25")} />
        <PawPrint className={cn("size-7 shrink-0", light ? "text-white" : "text-brand")} aria-hidden />
        <h2
          className={cn(
            "font-display text-3xl font-extrabold tracking-tight sm:text-4xl",
            light ? "text-white" : "text-brand",
          )}
        >
          {title}
        </h2>
        <span className={cn("h-px w-8 sm:w-14 md:w-20", light ? "bg-white/45" : "bg-brand/25")} />
        <PawPrint
          className={cn("hidden size-6 shrink-0 sm:block", light ? "text-white/35" : "text-brand/20")}
          aria-hidden
        />
      </div>
      {subtitle ? (
        <p className={cn("mt-3 text-base sm:text-lg", light ? "text-white/90" : "text-muted")}>{subtitle}</p>
      ) : null}
    </Reveal>
  );
}
