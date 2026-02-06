'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";

const HOOK_HEADLINE = "BUILDING SCALABLE LOGIC";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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

  // Magnetic button
  useEffect(() => {
    const button = buttonRef.current;
    const container = containerRef.current;
    if (!button || !container) return;

    const handleMove = (event: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const distanceX = event.clientX - (rect.left + rect.width / 2);
      const distanceY = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      const magnetRadius = 120;
      if (distance < magnetRadius) {
        const strength = (magnetRadius - distance) / magnetRadius;
        gsap.to(button, {
          x: distanceX * 0.4 * strength,
          y: distanceY * 0.4 * strength,
          duration: 0.2,
          ease: "power3.out"
        });
      } else {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power3.out"
        });
      }
    };

    const reset = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", reset);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", reset);
    };
  }, []);

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

      <div className="flex justify-center pb-8 md:pb-10">
        <button
          ref={buttonRef}
          className="relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-foreground/60 bg-transparent text-[0.6rem] font-medium uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:bg-foreground hover:text-background"
        >
          <span className="pointer-events-none">View Work</span>
        </button>
      </div>
    </section>
  );
}

