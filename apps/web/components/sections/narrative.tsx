'use client';

import { experiences } from "@/lib/content";

export function NarrativeSection() {
  return (
    <section
      id="experience"
      className="relative min-h-screen px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)]">
        {/* Sticky timeline */}
        <aside className="relative">
          <div className="sticky top-28 space-y-8">
            <p className="mono-label text-muted-foreground">NARRATIVE</p>
            <div className="h-px w-16 bg-gradient-to-r from-foreground/60 to-transparent" />

            <div className="space-y-6 text-xs text-muted-foreground">
              {experiences.map((exp, index) => (
                <div
                  key={exp.company}
                  className={`space-y-2 ${
                    index === 0 ? "opacity-100" : index === 1 ? "opacity-75" : "opacity-50"
                  }`}
                >
                  <p className="mono-label text-foreground">
                    {exp.period.split("–")[0].trim().split(" ").pop()}
                  </p>
                  <p>
                    {exp.company} · {exp.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <article
              key={exp.company}
              className={`border px-6 py-6 md:px-8 md:py-8 text-sm md:text-base ${
                index === 0
                  ? "border-border/60 bg-card/60"
                  : index === 1
                  ? "border-border/40 bg-card/50"
                  : "border-border/30 bg-card/40"
              }`}
            >
              <p
                className={`mono-label mb-3 ${
                  index === 0 ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {exp.company.toUpperCase()} · {exp.role.toUpperCase()} ·{" "}
                {exp.period.toUpperCase()}
              </p>
              <h2 className="mb-3 text-xl md:text-2xl font-semibold tracking-tightest">
                {index === 0
                  ? "Enterprise workflow automation for migration professionals."
                  : index === 1
                  ? "Leading teams from concept to shipped products."
                  : "A foundation in software, systems and applied mathematics."}
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                {exp.achievements.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[6px] h-[2px] w-4 bg-muted-foreground/50" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

