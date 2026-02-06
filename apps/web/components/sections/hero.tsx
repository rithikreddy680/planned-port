'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, useMotionValue, useSpring } from "framer-motion";

const HOOK_HEADLINE = "BUILDING SCALABLE LOGIC";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 300, damping: 25 });
  const springY = useSpring(my, { stiffness: 300, damping: 25 });

  // Character-by-character reveal
  useEffect(() => {
    if (!textRef.current) return;

    const letters = textRef.current.querySelectorAll<HTMLSpanElement>("[data-char]");

    gsap.set(letters, { y: "100%", opacity: 0 });

    gsap.to(letters, {
      y: "0%",
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.05
    });
  }, []);

  const handleMagnetic = (event: React.MouseEvent<HTMLDivElement>) => {
    const section = containerRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height - 80; // approx button position

    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    const magnetRadius = 140;
    if (distance < magnetRadius) {
      const strength = (magnetRadius - distance) / magnetRadius;
      mx.set(distanceX * 0.35 * strength);
      my.set(distanceY * 0.35 * strength);
    } else {
      mx.set(0);
      my.set(0);
    }
  };

  const resetMagnetic = () => {
    mx.set(0);
    my.set(0);
  };

  const handleViewWorkClick = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo('#projects', { offset: 0, duration: 1.2 });
      } else {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const splitHeadline = HOOK_HEADLINE.split("").map((char, index) => (
    <span
      key={`${char}-${index}`}
      data-char
      className="inline-block overflow-hidden align-bottom"
    >
      <span className="inline-block will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col justify-between px-6 py-8 md:px-12 lg:px-20"
    >
      <header className="flex items-start justify-between text-xs text-muted-foreground">
        <div className="mono-label">RITHIK REDDY</div>
        <div className="mono-label">FULL STACK ENGINEER</div>
      </header>

      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-5xl text-center space-y-6">
          <p className="mono-label text-muted-foreground">
            PORTFOLIO · DIGITAL NOIR · V2026
          </p>
          <div
            ref={textRef}
            className="mx-auto max-w-5xl text-balance text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold leading-tight tracking-tightest"
          >
            {splitHeadline}
          </div>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground">
            Student Software Engineer at Monash University, designing scalable systems
            and motion-driven interfaces that turn complex technical problems into
            clear, cinematic experiences.
          </p>
        </div>
      </div>

      <div
        className="flex justify-center pb-8 md:pb-10"
        onMouseMove={handleMagnetic}
        onMouseLeave={resetMagnetic}
      >
        <motion.button
          style={{ x: springX, y: springY }}
          className="relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-foreground/60 bg-transparent text-[0.6rem] font-medium uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:bg-foreground hover:text-background"
          onClick={handleViewWorkClick}
        >
          <span className="pointer-events-none">View Work</span>
        </motion.button>
      </div>
    </section>
  );
}

