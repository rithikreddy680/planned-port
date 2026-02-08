'use client';

export function SkillsSection() {
  // Physics / Matter.js integration will be added here – for now, static layout hinting at the canvas.
  return (
    <section className="relative min-h-[80vh] px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3 text-center">
          <p className="font-architect text-[0.7rem] text-muted-foreground">THE ARSENAL</p>
          <h2 className="font-display text-2xl leading-none tracking-tight md:text-3xl">
            Tools and languages I reach for when systems get complex.
          </h2>
        </header>

        <div className="relative mx-auto mt-6 h-[380px] max-w-4xl border border-border/60 bg-card/60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,250,250,0.04),transparent_55%)]" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 text-center text-muted-foreground">
            <p className="font-architect text-[0.7rem] text-muted-foreground/80">
              INTERACTIVE PHYSICS CANVAS · COMING SOON
            </p>
            <p className="font-narrator max-w-xl text-sm leading-relaxed md:text-base">
              This space will become a small physics playground where icons for
              Python, Java, C++, TypeScript, React, Next.js, NestJS, PostgreSQL,
              Prisma, Docker, AWS and Git collide and settle – a visual index of
              the tools I&apos;m comfortable orchestrating together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

