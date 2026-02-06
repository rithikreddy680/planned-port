'use client';

export function ProjectsSection() {
  return (
    <section className="relative min-h-screen px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-baseline justify-between">
          <p className="mono-label text-muted-foreground">SELECTED PROJECTS</p>
          <p className="text-xs text-muted-foreground">
            A small catalogue of systems work.
          </p>
        </header>

        {/* Placeholder stacked cards – pinning + GSAP will refine this later */}
        <div className="relative space-y-6">
          {PROJECTS.map((project, index) => (
            <article
              key={project.title}
              className="relative rounded-md border border-border/60 bg-card/70 px-6 py-6 md:px-8 md:py-8 overflow-hidden"
              style={{
                transform: `translateY(${index * 12}px)`
              }}
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex-1 space-y-3">
                  <p className="mono-label text-muted-foreground">{project.badge}</p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tightest">
                    {project.title}
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.stack.map((tag) => (
                      <span
                        key={tag}
                        className="mono-label rounded-sm border border-border/60 bg-background/40 px-2 py-1 text-[0.6rem] text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative h-40 w-full overflow-hidden rounded-sm border border-border/40 bg-background/60 md:h-56 md:w-80">
                  <div className="absolute inset-0 flex items-center justify-center text-xs tracking-wide text-muted-foreground/70">
                    {/* Placeholder – will be replaced with video / GIF on hover */}
                    <span className="mono-label">INTERFACE PREVIEW · COMING SOON</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    badge: "SKILLTREE · SOCIAL SKILL-BUILDING PLATFORM",
    title: "Skilltree – Social Skill-Building Platform",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    description:
      "Architected a scalable platform for visualising \"Skill Forests\" – directed acyclic graphs that encode how people grow. Designed a relational schema to model prerequisites, dependencies and progression paths across thousands of skills."
  },
  {
    badge: "SANTORINI · GAME ENGINE",
    title: "Santorini – Real-Time Turn Constraint System",
    stack: ["Java", "Swing", "Design Patterns"],
    description:
      "Implemented a turn-based engine that models the Santorini board game with support for \"God Powers\" that override base rules via Factory and Visitor patterns, enabling complex rule composition without sacrificing clarity."
  },
  {
    badge: "KNOWBALONE · CRM AUTOMATION",
    title: "KnowbalOne – Enterprise Workflow Automation",
    stack: ["CRM", "Automation", "Integrations"],
    description:
      "Built document checklists, eligibility checkers and automation rails that keep casework in sync across stakeholders, reducing manual follow-up and surfacing risks before they become blockers."
  }
];

