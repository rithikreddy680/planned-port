import { HeroSection } from "@/components/sections/hero";
import { NarrativeSection } from "@/components/sections/narrative";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <main className="relative">
      <HeroSection />
      <NarrativeSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
