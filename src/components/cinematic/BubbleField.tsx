"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const bubbles = [
  { left: "12%", delay: "0s", size: "0.55rem", duration: "4.2s" },
  { left: "28%", delay: "0.6s", size: "0.7rem", duration: "5s" },
  { left: "46%", delay: "1.1s", size: "0.45rem", duration: "3.8s" },
  { left: "62%", delay: "0.3s", size: "0.85rem", duration: "4.6s" },
  { left: "78%", delay: "1.4s", size: "0.5rem", duration: "5.2s" },
  { left: "88%", delay: "0.9s", size: "0.65rem", duration: "4s" },
];

export function BubbleField() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.6rem]" aria-hidden>
      {bubbles.map((bubble) => (
        <span
          key={`${bubble.left}-${bubble.delay}`}
          className="bubble absolute bottom-[-10%] rounded-full border border-white/70 bg-white/35 shadow-[inset_0_0_8px_rgba(255,255,255,0.7)]"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animationDelay: bubble.delay,
            animationDuration: bubble.duration,
          }}
        />
      ))}
    </div>
  );
}
