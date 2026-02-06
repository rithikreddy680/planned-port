import type { Experience, Project } from "./types";

export const experiences: Experience[] = [
  {
    company: "Knowbal Migration",
    role: "Software and IT Engineer",
    period: "Mar 2025 – Present",
    achievements: [
      "Optimised proprietary CRM (KnowbalOne) with smart document checklists and eligibility checks.",
      "Engineered automation solutions with automated email triggers to cut manual administrative overhead."
    ]
  },
  {
    company: "Enigma",
    role: "Software Development Head",
    period: "July 2023 – June 2024",
    achievements: [
      "Led and managed the software development team, coordinating roadmaps and timely delivery.",
      "Mentored developers and enforced engineering practices from ideation through deployment."
    ]
  },
  {
    company: "Monash University",
    role: "Bachelor of Software Engineering (Honours)",
    period: "2022 – Present",
    achievements: [
      "Building foundations in algorithms, distributed systems and applied mathematics.",
      "Translating theory into engines and platforms that behave predictably under real-world constraints."
    ]
  }
];

export const projects: Project[] = [
  {
    id: "skilltree",
    title: "Skilltree",
    subtitle: "Social Skill-Building Platform",
    techStack: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    description:
      "Architected a scalable social platform for visualising \"Skill Forests\" – directed graphs of how people grow. Designed database schemas for gamification logic, ranked events and XP calculation.",
    githubUrl: "https://github.com/yourusername/skilltree",
    mediaSrc: "/media/skilltree-preview.mp4"
  },
  {
    id: "santorini",
    title: "Santorini",
    subtitle: "Real-Time Turn Constraint System",
    techStack: ["Java", "Swing", "Design Patterns"],
    description:
      "Implemented a Java Swing engine for the Santorini board game, with a God Power system that overrides base movement and build rules via Factory and Visitor design patterns.",
    githubUrl: "https://github.com/yourusername/santorini-engine",
    mediaSrc: "/media/santorini-preview.mp4"
  },
  {
    id: "knowbal",
    title: "KnowbalOne",
    subtitle: "Enterprise Workflow Automation",
    techStack: ["CRM", "Automation", "Integrations"],
    description:
      "Built document checklists, eligibility checkers and automation rails that keep casework in sync across stakeholders, surfacing risks before they become blockers.",
    mediaSrc: "/media/knowbal-preview.mp4"
  }
];

