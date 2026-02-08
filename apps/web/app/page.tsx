import { HeroRevealWrapper } from "@/components/sections/hero-reveal-wrapper";
import { NarrativeSection } from "@/components/sections/narrative";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <main className="relative">
      <HeroRevealWrapper />
      <NarrativeSection />
      <div className="relative bg-background">
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </main>
  );
}
