"use client";

export function FooterBranding() {
  return (
    <footer
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 flex justify-center py-4 md:justify-end md:pr-8 md:py-6"
      aria-hidden
    >
      <p
        className="text-[0.7rem] text-zinc-600"
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          letterSpacing: "0.5em"
        }}
      >
        PORTFOLIO · DIGITAL NOIR · V2026
      </p>
    </footer>
  );
}
