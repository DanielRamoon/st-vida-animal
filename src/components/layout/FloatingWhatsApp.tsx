import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { site } from "@/config/site";
import { whatsappHref } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp Vida Animal ${site.phoneDisplay}`}
      title={`WhatsApp ${site.phoneDisplay}`}
      className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-sun py-3 pr-4 pl-3 text-[#1FA855] shadow-[0_12px_28px_rgba(20,37,68,0.25)] transition hover:-translate-y-0.5 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7 shrink-0" />
      <span className="hidden font-display text-sm font-extrabold text-navy sm:inline">{site.phoneDisplay}</span>
    </a>
  );
}
