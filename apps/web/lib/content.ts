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
    role: "Academic Mentor",
    period: "2022 – Present",
    achievements: [
      "Guided students through algorithms, distributed systems and applied mathematics.",
      "Supported academic progress and helped translate theory into practical understanding."
    ]
  }
];

export const projects: Project[] = [
  {
    id: "skilltree",
    title: "Skilltree",
    subtitle: "Social Platform",
    year: "2024",
    techStack: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    description:
      "Architected a scalable social platform for visualising \"Skill Forests\" – directed graphs of how people grow. Gamification & logic: ranked events, XP calculation.",
    detail: "Skill Forests schema, relational modelling for prerequisites and progression paths.",
    githubUrl: "https://github.com/yourusername/skilltree",
    mediaSrc: "/media/skilltree-preview.mp4"
  },
  {
    id: "santorini",
    title: "Santorini Engine",
    subtitle: "Game Dev",
    year: "2023",
    techStack: ["Java", "Swing", "Design Patterns"],
    description:
      "Java Swing engine for Santorini board game. God Power system overriding core movement rules via Factory and Visitor patterns.",
    detail: "Turn constraint system, rule composition.",
    githubUrl: "https://github.com/yourusername/santorini-engine",
    mediaSrc: "/media/santorini-preview.mp4"
  },
  {
    id: "knowbal",
    title: "KnowbalOne CRM",
    subtitle: "Enterprise App",
    year: "2025",
    techStack: ["CRM", "Automation", "Integrations"],
    description:
      "Workflow automation, eligibility checker. Document checklists and automation rails for casework and stakeholders.",
    mediaSrc: "/media/knowbal-preview.mp4"
  },
  {
    id: "studyknowbal",
    title: "StudyKnowbal",
    subtitle: "LMS Platform",
    year: "2024",
    techStack: ["LMS", "E-learning", "Web"],
    description:
      "E-learning hierarchies and student portal for structured learning paths.",
    mediaSrc: "/media/studyknowbal-preview.mp4"
  },
  {
    id: "medicine-shop",
    title: "Medicine Shop Software",
    subtitle: "C++ System",
    year: "2023",
    techStack: ["C++", "UML", "OOP"],
    description:
      "Inventory tracking and management system. UML architecture and object-oriented design.",
    mediaSrc: "/media/medicine-shop-preview.mp4"
  },
  {
    id: "school-attendance",
    title: "School Attendance System",
    subtitle: "Web App",
    year: "2023",
    techStack: ["PHP", "SQL", "RBAC"],
    description:
      "Role-Based Access Control (RBAC), attendance records and reporting.",
    mediaSrc: "/media/school-attendance-preview.mp4"
  }
];

export const arsenalSlides: { title: string; description: string }[] = [
  {
    title: "AI & LLM Integration",
    description:
      "Exploring practical applications of large language models, RAG systems, and AI-augmented developer workflows."
  },
  {
    title: "Distributed Systems",
    description:
      "Building scalable, resilient architectures – event sourcing, CQRS, and cloud-native patterns."
  },
  {
    title: "Developer Experience",
    description:
      "Investing in tooling, DX, and documentation so teams can ship faster with less friction."
  },
  {
    title: "Open Source",
    description:
      "Contributing to projects I use daily and giving back to the communities that shape my craft."
  },
  {
    title: "Enterprise Integration",
    description:
      "Deepening expertise in SAP S/4HANA, ERP integrations, and business-critical systems."
  }
];

