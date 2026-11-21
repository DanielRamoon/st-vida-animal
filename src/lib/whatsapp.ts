import { site } from "@/config/site";

export function whatsappHref(message: string = site.whatsappMessage) {
  const text = encodeURIComponent(message);
  const phone = site.whatsappPhone.replace(/\D/g, "");

  if (!phone) {
    return `https://wa.me/?text=${text}`;
  }

  return `https://wa.me/${phone}?text=${text}`;
}

export function mapsHref() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.query)}`;
}
