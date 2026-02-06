'use client';

export function NarrativeSection() {
  return (
    <section className="relative min-h-screen px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)]">
        {/* Sticky timeline */}
        <aside className="relative">
          <div className="sticky top-28 space-y-8">
            <p className="mono-label text-muted-foreground">NARRATIVE</p>
            <div className="h-px w-16 bg-gradient-to-r from-foreground/60 to-transparent" />

            <div className="space-y-6 text-xs text-muted-foreground">
              <div className="space-y-2">
                <p className="mono-label text-foreground">2025</p>
                <p>Enterprise automation & CRM systems.</p>
              </div>
              <div className="space-y-2 opacity-60">
                <p className="mono-label">2023</p>
                <p>Technical leadership & team orchestration.</p>
              </div>
              <div className="space-y-2 opacity-40">
                <p className="mono-label">2022</p>
                <p>Foundations in software engineering & maths.</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Scrolling cards – static content for now, GSAP scroll effects to come */}
        <div className="space-y-10">
          <article className="border border-border/60 bg-card/60 px-6 py-6 md:px-8 md:py-8 text-sm md:text-base">
            <p className="mono-label mb-3 text-accent">
              KNOWBAL MIGRATION · SOFTWARE & IT ENGINEER · MAR 2025 – PRESENT
            </p>
            <h2 className="mb-3 text-xl md:text-2xl font-semibold tracking-tightest">
              Enterprise workflow automation for migration professionals.
            </h2>
            <p className="text-muted-foreground">
              Optimised KnowbalOne, a proprietary CRM, by integrating automated
              workflows and engineered document intelligence to cut manual
              administrative overhead. Designed systems that surface the right
              status, document and risk at the moment an agent needs it.
            </p>
          </article>

          <article className="border border-border/40 bg-card/50 px-6 py-6 md:px-8 md:py-8 text-sm md:text-base">
            <p className="mono-label mb-3 text-muted-foreground">
              ENIGMA · SOFTWARE DEVELOPMENT HEAD · JUL 2023 – JUN 2024
            </p>
            <h2 className="mb-3 text-xl md:text-2xl font-semibold tracking-tightest">
              Leading teams from concept to shipped products.
            </h2>
            <p className="text-muted-foreground">
              Led and managed a student engineering team, overseeing lifecycles
              from discovery to deployment. Balanced roadmap clarity, delivery
              discipline, and mentorship so that ideas made it out of Figma and
              into production.
            </p>
          </article>

          <article className="border border-border/30 bg-card/40 px-6 py-6 md:px-8 md:py-8 text-sm md:text-base">
            <p className="mono-label mb-3 text-muted-foreground">
              MONASH UNIVERSITY · BACHELOR OF SOFTWARE ENGINEERING (HONS) · 2022 – PRESENT
            </p>
            <h2 className="mb-3 text-xl md:text-2xl font-semibold tracking-tightest">
              A foundation in software, systems and applied mathematics.
            </h2>
            <p className="text-muted-foreground">
              Building depth in algorithms, distributed systems and applied
              mathematics while translating theory into real products – from
              game engines to social platforms – that behave predictably under
              real-world constraints.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

