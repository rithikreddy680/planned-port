'use client';

import { projects } from "@/lib/content";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative min-h-screen px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-baseline justify-between">
          <p className="mono-label text-muted-foreground">SELECTED PROJECTS</p>
          <p className="text-xs text-muted-foreground">
            A small catalogue of systems work.
          </p>
        </header>

        <div className="relative space-y-6">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="relative rounded-md border border-border/60 bg-card/70 px-6 py-6 md:px-8 md:py-8 overflow-hidden"
              style={{
                transform: `translateY(${index * 12}px)`
              }}
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex-1 space-y-3">
                  <p className="mono-label text-muted-foreground">
                    {project.title.toUpperCase()} · {project.subtitle.toUpperCase()}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tightest">
                    {project.title} — {project.subtitle}
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-3">
                    {project.techStack.map((tag) => (
                      <span
                        key={tag}
                        className="mono-label rounded-sm border border-border/60 bg-background/40 px-2 py-1 text-[0.6rem] text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.githubUrl && (
                    <div className="pt-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mono-label inline-flex items-center gap-2 border-b border-transparent text-[0.7rem] text-muted-foreground transition-colors hover:border-muted-foreground hover:text-foreground"
                      >
                        VIEW GITHUB
                      </a>
                    </div>
                  )}
                </div>

                <div className="relative h-40 w-full overflow-hidden rounded-sm border border-border/40 bg-background/60 md:h-56 md:w-80">
                  <div className="absolute inset-0 flex items-center justify-center text-xs tracking-wide text-muted-foreground/70">
                    <span className="mono-label">
                      INTERFACE PREVIEW · LAZY-LOADED MEDIA HERE
                    </span>
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

