import { AboutSection } from "@/lib/components/about.section";
import { ContactSection } from "@/lib/components/contact.section";
import { HeroSection } from "@/lib/components/hero.section";

export default function Home() {
  return (
    <main className="container xl:px-28">
      <HeroSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
