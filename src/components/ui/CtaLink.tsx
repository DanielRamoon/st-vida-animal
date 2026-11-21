import { ChevronRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { cn } from "@/lib/cn";

const variants = {
  yellow:
    "bg-sun text-navy shadow-[0_8px_18px_rgba(255,196,0,0.35)] hover:brightness-105",
  red: "bg-brand text-white shadow-[0_10px_22px_rgba(169,0,8,0.28)] hover:bg-brand-bright",
  white: "bg-white text-brand shadow-[0_8px_18px_rgba(20,37,68,0.12)] hover:bg-cream",
} as const;

type Variant = keyof typeof variants;

type CtaProps = {
  children: React.ReactNode;
  variant?: Variant;
  showWhatsApp?: boolean;
  showChevron?: boolean;
  className?: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaExpanded?: boolean;
};

export function Cta({
  children,
  variant = "yellow",
  showWhatsApp = false,
  showChevron = false,
  className,
  href,
  external = false,
  onClick,
  type = "button",
  ariaExpanded,
}: CtaProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-center font-display text-sm font-extrabold transition duration-200 hover:-translate-y-0.5 active:translate-y-0 sm:text-base",
    variants[variant],
    className,
  );

  const content = (
    <>
      {showWhatsApp ? (
        <WhatsAppIcon className={cn("size-5", variant === "yellow" && "text-[#1FA855]")} />
      ) : null}
      <span>{children}</span>
      {showChevron ? <ChevronRight className="size-4" aria-hidden /> : null}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-expanded={ariaExpanded}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-expanded={ariaExpanded}>
      {content}
    </button>
  );
}
