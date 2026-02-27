'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { arsenalSlides } from '@/lib/content';

const SLIDE_INTERVAL_MS = 4200;
const SCROLL_COOLDOWN_MS = 560;
const SCROLL_THRESHOLD = 80;

const SLIDE_OFFSET = 120;

export function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const n = arsenalSlides.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollCooldownRef = useRef(false);
  const scrollAccumRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = useCallback(
    (delta: number) => {
      setDirection((delta > 0 ? 1 : -1) as 1 | -1);
      setActiveIndex((i) => (i + delta + n) % n);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setDirection(1);
          setActiveIndex((i) => (i + 1) % n);
        }, SLIDE_INTERVAL_MS);
      }
    },
    [n]
  );

  const goToIndex = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      const delta = (index - activeIndex + n) % n;
      const d = delta <= n / 2 ? 1 : -1;
      setDirection(d as 1 | -1);
      setActiveIndex(index);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setDirection(1);
          setActiveIndex((i) => (i + 1) % n);
        }, SLIDE_INTERVAL_MS);
      }
    },
    [activeIndex, n]
  );

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((i) => (i + 1) % n);
    }, SLIDE_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [n]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (scrollCooldownRef.current) return;
      scrollAccumRef.current += e.deltaX;
      if (Math.abs(scrollAccumRef.current) < SCROLL_THRESHOLD) return;
      const delta = scrollAccumRef.current > 0 ? 1 : -1;
      scrollAccumRef.current = 0;
      scrollCooldownRef.current = true;
      setTimeout(() => {
        scrollCooldownRef.current = false;
      }, SCROLL_COOLDOWN_MS);
      goToSlide(delta);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [goToSlide]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goToSlide(1);
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goToSlide(-1);
    },
    [goToSlide]
  );

  return (
    <section id="arsenal" className="relative min-h-[min(70vh,600px)] px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8 md:space-y-10">
        <header className="space-y-2 sm:space-y-3 text-center">
          <p className="font-architect text-[clamp(0.6rem,1.8vw,0.7rem)] text-muted-foreground">THE ARSENAL</p>
          <h2 className="font-display text-[clamp(1.25rem,4vw,1.875rem)] leading-none tracking-tight md:text-3xl">
            Future interests and goals.
          </h2>
        </header>

        <div
          ref={containerRef}
          tabIndex={0}
          role="region"
          aria-label="Arsenal slideshow – scroll or use arrow keys to change slides"
          className="relative mx-auto mt-4 h-[min(260px,50vh)] max-w-4xl cursor-default overflow-hidden rounded-xl border border-border/50 bg-card/70 outline-none backdrop-blur-md focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 dark:border-white/[0.08] dark:bg-card/50 sm:mt-6 sm:h-[320px] md:h-[360px] lg:h-[380px]"
          style={{
            boxShadow:
              '0 0 0 1px hsl(var(--border)/0.4), 0 4px 24px -4px rgba(0,0,0,0.25), 0 2px 12px -2px rgba(0,0,0,0.15)',
          }}
          onKeyDown={onKeyDown}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,250,250,0.04),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.2),transparent_55%)]" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-6 sm:py-10 md:px-12 md:py-12 lg:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: direction * SLIDE_OFFSET }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * SLIDE_OFFSET }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                <h3 className="font-display mb-2 break-words px-2 text-[clamp(1rem,3vw,1.5rem)] font-semibold tracking-tight sm:mb-3 md:mb-4 md:text-2xl lg:text-3xl">
                  {arsenalSlides[activeIndex]?.title}
                </h3>
                <p className="font-narrator max-w-xl break-words px-3 text-[clamp(0.7rem,2vw,1rem)] leading-relaxed text-muted-foreground sm:px-4 sm:text-sm md:text-base">
                  {arsenalSlides[activeIndex]?.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
            <p className="font-architect mr-1 hidden text-[clamp(0.45rem,1.4vw,0.52rem)] uppercase tracking-[0.2em] text-muted-foreground sm:block">
              Scroll to navigate
            </p>
            {arsenalSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-8 bg-foreground/90'
                    : 'w-2 bg-foreground/30 hover:bg-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

