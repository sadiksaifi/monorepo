import { AboutSection } from "@/lib/components/about.section";
import { ContactSection } from "@/lib/components/contact.section";
import { HeroSection } from "@/lib/components/hero.section";
import { SkillsSection } from "@/lib/components/skills.section";
import { ProjectsSection } from "@/lib/components/projects.section";

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
