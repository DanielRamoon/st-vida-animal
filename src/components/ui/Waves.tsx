import { cn } from "@/lib/cn";

type WaveProps = {
  className?: string;
};

export function Curve({ className }: WaveProps) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={cn("block h-20 w-full md:h-28", className)}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0,52 C260,116 520,8 780,60 C1040,112 1240,24 1440,68 L1440,120 L0,120 Z"
      />
    </svg>
  );
}
