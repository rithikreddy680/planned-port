"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

const ROLLING_WORDS = ["SCALABLE", "COGNITIVE", "RECURSIVE", "RESILIENT", "ADAPTIVE", "HEURISTIC"];
const ROLL_INTERVAL_MS = 1700;
const ROLL_WORD_HEIGHT_EM = 0.8;
const ROLL_ANIM_DURATION = 0.45;
const headlineContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
};
const headlineWord = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

type HeroSectionProps = {
  scrollY?: number;
  onViewWork?: () => void;
};

export function HeroSection({ scrollY = 0, onViewWork }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxOffset = scrollY * 0.2;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 420, damping: 18 });
  const springY = useSpring(my, { stiffness: 420, damping: 18 });
  const [rollingIndex, setRollingIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRollingIndex((prev) => (prev + 1) % ROLLING_WORDS.length);
    }, ROLL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

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
    if (onViewWork) {
      onViewWork();
      return;
    }
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
      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-col justify-center pl-[8vw] will-change-transform"
        style={{ y: -parallaxOffset }}
        variants={headlineContainer}
        initial="hidden"
        animate="show"
        aria-hidden
      >
        <motion.span
          variants={headlineWord}
          className="font-black uppercase leading-[0.8] text-foreground/90"
          style={{
            fontFamily: "var(--font-geist-sans), var(--font-aeonik), sans-serif",
            fontSize: "12vw"
          }}
        >
          BUILDING
        </motion.span>
        <motion.span
          variants={headlineWord}
          className="font-black uppercase leading-[0.8] text-foreground/90"
          style={{
            fontFamily: "var(--font-geist-sans), var(--font-aeonik), sans-serif",
            fontSize: "12vw"
          }}
        >
          <span
            className="relative inline-block overflow-hidden align-baseline min-w-[10ch] whitespace-nowrap"
            style={{ height: `${ROLL_WORD_HEIGHT_EM}em` }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLLING_WORDS[rollingIndex]}
                className="absolute left-0 top-0 block w-full whitespace-nowrap leading-[0.8]"
                style={{ height: `${ROLL_WORD_HEIGHT_EM}em` }}
                initial={{ y: `${ROLL_WORD_HEIGHT_EM}em`, opacity: 0 }}
                animate={{ y: "0em", opacity: 1 }}
                exit={{ y: `-${ROLL_WORD_HEIGHT_EM}em`, opacity: 0 }}
                transition={{ duration: ROLL_ANIM_DURATION, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
              >
                {ROLLING_WORDS[rollingIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.span>
        <motion.span
          variants={headlineWord}
          className="font-black uppercase leading-[0.8] text-foreground/90"
          style={{
            fontFamily: "var(--font-geist-sans), var(--font-aeonik), sans-serif",
            fontSize: "12vw"
          }}
        >
          LOGIC
        </motion.span>
      </motion.div>

      {/* Identity overlay – z-10 */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-10 md:px-12 lg:px-20">
        {/* Header: name + title – left-aligned text, block on the right */}
        <header
          className="relative ml-auto max-w-xl text-left"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          <span className="inline-flex items-start gap-1 text-foreground">
            <span
              className="inline-flex items-center rounded-full border border-foreground/80 px-[0.9rem] py-[0.35rem] text-[1.215rem] font-semibold tracking-tight sm:text-[1.395rem] md:text-[1.575rem]"
              style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
            >
              Rithik Reddy
            </span>
            <span className="text-[0.6em] leading-none">TM</span>
          </span>
        </header>

        {/* View Work – small, dimmed, bounces across header */}
        <div
          className="absolute inset-0 flex items-end justify-end pb-8 pr-6 pt-20 md:pb-10 md:pr-12 lg:pr-20"
          onMouseMove={handleMagnetic}
          onMouseLeave={resetMagnetic}
        >
          <div className="animate-float">
            <motion.button
              data-magnetic-btn
              style={{ x: springX, y: springY }}
              onClick={scrollToProjects}
              className="group relative flex aspect-square h-[clamp(140px,14vw,260px)] w-[clamp(140px,14vw,260px)] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-foreground/90 bg-foreground/90 text-black shadow-[0_0_24px_rgba(255,255,255,0.2)] transition-all duration-200 hover:bg-black hover:text-white hover:shadow-[0_0_60px_rgba(255,255,255,0.85)] focus:outline-none focus-visible:outline-none focus-visible:ring-0"
              whileHover={{ scale: 1.1 }}
            >
              <span
                className="normal-case text-[clamp(0.9rem,1.1vw,1.3rem)] font-semibold tracking-tight group-hover:animate-spin-slow"
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  textTransform: "none"
                }}
              >
                View Work
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
