"use client";

import { motion, useReducedMotion } from "motion/react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  once?: boolean;
  amount?: number;
};

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 40 },
  down: { y: -28 },
  left: { x: 48 },
  right: { x: -48 },
  scale: { scale: 0.92, y: 18 },
  fade: {},
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  amount = 0.22,
}: RevealProps) {
  const reduced = useReducedMotion();
  const offset = offsets[direction];

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: offset.x ?? 0,
        y: offset.y ?? 0,
        scale: offset.scale ?? 1,
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
