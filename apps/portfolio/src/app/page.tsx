import { AboutSection } from "@/components/about.section";
import { ContactSection } from "@/components/contact.section";
import { HeroSection } from "@/components/hero.section";

export default function Home() {
  return (
    <main className="container xl:px-28">
      <HeroSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
