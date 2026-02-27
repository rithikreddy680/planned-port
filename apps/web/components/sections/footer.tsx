'use client';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-foreground/15 bg-foreground/[0.02] px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-narrator text-[clamp(0.8rem,2.2vw,1rem)] text-foreground/80 sm:text-sm md:text-base">
            Designed &amp; engineered by Rithik Reddy
          </p>
          <p className="font-architect text-[clamp(0.55rem,1.6vw,0.65rem)] uppercase tracking-wider text-muted-foreground">
            Williams Landing, 3027 · Australia · {year}
          </p>
        </div>

        <nav
          className="flex items-center gap-4 sm:gap-6 md:gap-8"
          aria-label="Footer links"
        >
          <a
            href="https://www.linkedin.com/in/rithik-reddy"
            target="_blank"
            rel="noreferrer"
            className="font-architect text-[clamp(0.55rem,1.6vw,0.65rem)] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer"
            className="font-architect text-[clamp(0.55rem,1.6vw,0.65rem)] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>

      <p
        className="font-architect-narrow mx-auto mt-6 sm:mt-8 text-center text-[clamp(0.45rem,1.4vw,0.55rem)] uppercase tracking-[0.35em] text-muted-foreground/70"
        style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
      >
        Portfolio · Digital Noir
      </p>
    </footer>
  );
}
