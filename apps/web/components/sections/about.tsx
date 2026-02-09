"use client";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative h-screen bg-background px-6 md:px-12 lg:px-20"
    >
      <div className="mx-auto flex h-full max-w-6xl flex-col justify-center gap-10 lg:grid lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-architect text-[0.7rem] text-muted-foreground">
            ABOUT
          </p>
          <h2 className="font-display mt-4 text-3xl leading-none tracking-tight md:text-4xl">
            Building systems that stay sharp under pressure.
          </h2>
        </div>
        <div className="space-y-4">
          <p className="font-narrator text-sm leading-relaxed text-muted-foreground md:text-base">
            I design and ship full-stack products with a focus on scalable logic,
            clear data flow, and high-velocity iteration. The goal is always the
            same: elegant systems that are easy to maintain and hard to break.
          </p>
          <p className="font-narrator text-sm leading-relaxed text-muted-foreground md:text-base">
            Digital Noir is the visual layer — the engineering underneath is
            precise, tested, and built to evolve.
          </p>
        </div>
      </div>
    </section>
  );
}
