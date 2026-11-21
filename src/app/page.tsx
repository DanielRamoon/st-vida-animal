import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Tips } from "@/components/sections/Tips";
import { HomeShell } from "@/components/splash/HomeShell";

export default function Home() {
  return (
    <HomeShell>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-sun focus:px-4 focus:py-2 focus:font-display focus:font-bold focus:text-navy"
      >
        Ir para o conteúdo
      </a>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Tips />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </HomeShell>
  );
}
