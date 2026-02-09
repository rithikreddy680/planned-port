import { HeroRevealWrapper } from "@/components/sections/hero-reveal-wrapper";
import { AboutSection } from "@/components/sections/about";
import { NarrativeSection } from "@/components/sections/narrative";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <main className="relative">
      <HeroRevealWrapper />
      <AboutSection />
      <NarrativeSection />
      <div className="relative bg-background">
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </main>
  );
}
