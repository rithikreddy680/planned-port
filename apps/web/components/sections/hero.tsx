"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const HEADLINE_WORDS = ["BUILDING", "SCALABLE", "LOGIC"];

type HeroSectionProps = {
  scrollY?: number;
};

export function HeroSection({ scrollY = 0 }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxOffset = scrollY * 0.2;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 420, damping: 18 });
  const springY = useSpring(my, { stiffness: 420, damping: 18 });

  const handleMagnetic = (e: React.MouseEvent<HTMLDivElement>) => {
    const btn = document.querySelector("[data-magnetic-btn]");
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const magnetRadius = 705;
    if (distance < magnetRadius) {
      const strength = (magnetRadius - distance) / magnetRadius;
      const pull = Math.min(1.15 * strength, 1);
      mx.set(dx * pull);
      my.set(dy * pull);
    } else {
      mx.set(0);
      my.set(0);
    }
  };

  const resetMagnetic = () => {
    mx.set(0);
    my.set(0);
  };

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      (window as unknown as { lenis?: { scrollTo: (t: string, o: { offset: number; duration: number }) => void } }).lenis?.scrollTo?.("#projects", { offset: 0, duration: 1.2 });
      if (!(window as unknown as { lenis?: unknown }).lenis) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* Typographic poster: stacked headline (parallax 1.2x) */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col justify-center pl-[8vw] will-change-transform"
        style={{ transform: `translate3d(0, ${-parallaxOffset}px, 0)` }}
        aria-hidden
      >
        {HEADLINE_WORDS.map((word) => (
          <span
            key={word}
            className="font-black uppercase leading-[0.8] text-foreground/90"
            style={{
              fontFamily: "var(--font-geist-sans), var(--font-aeonik), sans-serif",
              fontSize: "12vw"
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Identity overlay – z-10 */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-10 md:px-12 lg:px-20">
        {/* Header: name + title – left-aligned text, block on the right */}
        <header
          className="ml-auto max-w-xl text-left"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-[2.5rem]">
            RITHIK REDDY
          </h1>
          <p className="mt-2 text-base font-bold tracking-tight text-zinc-200 md:mt-3 md:text-lg">
            Software and Computer Science Engineer
          </p>
          <div className="mt-4 h-px w-12 bg-white/20" />
        </header>

        {/* View Work – small, dimmed, bounces across header */}
        <div
          className="absolute inset-0 flex items-end justify-end pb-8 pr-4 pt-20 md:pb-10 md:pr-6"
          onMouseMove={handleMagnetic}
          onMouseLeave={resetMagnetic}
        >
          <div className="animate-float">
            <motion.button
              data-magnetic-btn
              style={{ x: springX, y: springY }}
              onClick={scrollToProjects}
              className="group relative flex aspect-square h-[100px] w-[100px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/90 bg-white/90 text-black shadow-[0_0_24px_rgba(255,255,255,0.2)] transition-all duration-200 hover:border-black hover:bg-black hover:text-white hover:shadow-[0_0_32px_rgba(255,255,255,0.25)] md:h-[120px] md:w-[120px]"
              whileHover={{ scale: 1.1 }}
            >
              <span
                className="font-architect text-[0.55rem] font-bold tracking-[0.18em] group-hover:animate-spin-slow md:text-[0.65rem]"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                VIEW WORK
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
