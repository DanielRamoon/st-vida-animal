"use client";

import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

type RunningPetsProps = {
  className?: string;
  tone?: "cream" | "white";
};

export function RunningPets({ className, tone = "cream" }: RunningPetsProps) {
  const reduced = usePrefersReducedMotion();
  const dim = tone === "cream" ? "opacity-70" : "opacity-65";

  if (reduced) {
    return (
      <div className={cn("pointer-events-none absolute inset-x-0 bottom-8", className)} aria-hidden>
        <Image
          src="/images/dog-run.png"
          alt=""
          width={720}
          height={405}
          className={cn("ml-[8%] h-14 w-auto drop-shadow-lg sm:h-16", dim)}
        />
      </div>
    );
  }

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className={cn("pet-run absolute bottom-[16%] left-[-28%] flex items-end gap-8", dim)}>
        <Image
          src="/images/dog-run.png"
          alt=""
          width={720}
          height={405}
          className="pet-hop h-14 w-auto drop-shadow-[0_12px_18px_rgba(20,37,68,0.22)] sm:h-[4.5rem]"
        />
        <Image
          src="/images/cat-run.png"
          alt=""
          width={720}
          height={405}
          className="pet-hop-delay h-11 w-auto drop-shadow-[0_10px_16px_rgba(20,37,68,0.2)] sm:h-14"
        />
      </div>

      <div className={cn("pet-run-slow absolute bottom-[6%] left-[-34%]", dim)}>
        <Image
          src="/images/dog-run.png"
          alt=""
          width={720}
          height={405}
          className="pet-hop-alt h-11 w-auto scale-x-[-1] drop-shadow-md sm:h-14"
        />
      </div>

      <div className={cn("pet-dash absolute bottom-[28%] left-[-26%] hidden sm:block", dim)}>
        <Image
          src="/images/cat-run.png"
          alt=""
          width={720}
          height={405}
          className="h-10 w-auto opacity-80 drop-shadow-md sm:h-12"
        />
      </div>

      <div className={cn("pet-float absolute top-[12%] right-[8%] hidden md:block", dim)}>
        <Image
          src="/images/galeria-laco.jpg"
          alt=""
          width={180}
          height={180}
          className="size-16 rounded-full object-cover shadow-[0_12px_24px_rgba(169,0,8,0.18)] ring-2 ring-white/80 sm:size-20"
        />
      </div>
      <div className={cn("pet-float-delay absolute top-[38%] right-[4%] hidden lg:block", dim)}>
        <Image
          src="/images/galeria-descanso.jpg"
          alt=""
          width={180}
          height={180}
          className="size-14 rounded-full object-cover shadow-[0_12px_24px_rgba(20,37,68,0.16)] ring-2 ring-white/80"
        />
      </div>
    </div>
  );
}
