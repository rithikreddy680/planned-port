'use client';

export function CvButton() {
  return (
    <a
      href="/resume.pdf"
      className="font-architect fixed bottom-4 right-4 z-50 inline-flex h-8 items-center justify-center rounded-sm border border-border/70 bg-background/80 px-3 text-[0.7rem] text-muted-foreground backdrop-blur-md"
      aria-label="Download CV"
    >
      CV
    </a>
  );
}

