"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "@/lib/content";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const KNOWBAL_HEADLINE = "CRM Optimization & Automation";
const KNOWBAL_METRICS = "Reduced manual admin overhead via automated email triggers.";
const KNOWBAL_TECH = ["Smart Document Checklists", "Applicant Eligibility Checker"];

const ARC_R_BASE = 130;
const ARC_START = 55;
const ARC_END = 125;
const CENTER_X_BASE = 260;
const ITEM_W_BASE = 280;
const ITEM_H_BASE = 80;
const ITEM_GAP_BASE = 72;
const LEFT_X_BASE = 8;
const TOP_OFFSET_BASE = 90;

function polar(arcR: number, angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: arcR + r * Math.cos(rad), y: arcR + r * Math.sin(rad) };
}

function useTumblerScale() {
  const [width, setWidth] = useState(1024);
  useEffect(() => {
    const onResize = () => setWidth(typeof window !== "undefined" ? window.innerWidth : 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return useMemo(() => {
    if (width >= 640) return 1;
    return Math.max(0.42, Math.min(1, width / 420));
  }, [width]);
}

function useIsMobile() {
  const [width, setWidth] = useState(1024);
  useEffect(() => {
    const onResize = () => setWidth(typeof window !== "undefined" ? window.innerWidth : 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width < 640;
}

const SCROLL_COOLDOWN_MS = 960;
const SCROLL_THRESHOLD = 200;

/* Mobile: horizontal arc strip – active card elevated, swipe/tap to switch */
function MobileExperienceSelector({
  experiences,
  activeIndex,
  onSelect,
  embedded = false,
}: {
  experiences: typeof import("@/lib/content").experiences;
  activeIndex: number;
  onSelect: (i: number) => void;
  embedded?: boolean;
}) {
  const touchStartRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0]!.clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0]!.clientX - touchStartRef.current;
    if (Math.abs(dx) > 50) {
      onSelect((activeIndex + (dx > 0 ? -1 : 1) + experiences.length) % experiences.length);
    }
  };

  return (
    <div
      className="w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Subtle arc curve – visual bridge to desktop arc tumbler */}
      {!embedded && (
        <div className="relative mx-auto mb-3 flex justify-center">
          <svg
            className="pointer-events-none absolute -top-1 h-6 w-full opacity-[0.08]"
            viewBox="0 0 200 24"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M 0 20 Q 100 0 200 20"
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      )}

      {/* Horizontal strip – active card elevated (arc apex) */}
      <div className="relative flex items-end justify-center gap-2 sm:gap-2.5">
        {experiences.map((exp, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.button
              key={exp.company}
              type="button"
              role="option"
              aria-selected={isActive}
              onClick={() => onSelect(index)}
              className={`relative flex min-h-[52px] min-w-0 flex-1 flex-col items-center justify-center rounded-2xl border-2 backdrop-blur-xl transition-colors touch-manipulation active:scale-[0.98] ${
                isActive
                  ? "z-10 border-foreground/60 bg-card/95 shadow-[0_0_0_2px_hsl(var(--foreground)/0.15),0_12px_32px_-8px_rgba(0,0,0,0.35),0_4px_16px_-4px_rgba(0,0,0,0.2)]"
                  : "z-0 border-foreground/25 bg-card/60"
              }`}
              initial={false}
              animate={{
                y: isActive ? -8 : 0,
                scale: isActive ? 1.03 : 0.94,
                opacity: isActive ? 1 : 0.8,
              }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              whileTap={{ scale: isActive ? 0.98 : 0.92 }}
            >
              {/* Index badge */}
              <span
                className={`absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 font-architect text-[0.5rem] uppercase tracking-widest ${
                  isActive ? "bg-foreground/15 text-foreground/95" : "text-foreground/40"
                }`}
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={`block w-full truncate px-3 py-2 text-center font-architect text-[clamp(0.58rem,2.4vw,0.68rem)] uppercase leading-snug tracking-wider ${
                  isActive ? "font-semibold text-foreground" : "text-foreground/85"
                }`}
              >
                {exp.role}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Progress indicator + swipe hint */}
      {/* Progress dots – always show when embedded, full hint when standalone */}
      <div className={`flex items-center justify-center gap-2 ${embedded ? "mt-2" : "mt-3 flex-col gap-2"}`}>
        <div className="flex items-center gap-1.5">
          {experiences.map((_, i) => (
            <motion.span
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex ? "h-2 w-5 bg-foreground/75" : "h-1.5 w-1.5 bg-foreground/25"
              }`}
              animate={i === activeIndex ? { scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 0.35 }}
            />
          ))}
        </div>
        {!embedded && (
          <p className="font-architect text-[clamp(0.5rem,2vw,0.58rem)] uppercase tracking-[0.25em] text-foreground/60">
            Swipe or tap · {activeIndex + 1}/{experiences.length}
          </p>
        )}
      </div>
    </div>
  );
}

/* Shared terminal content for mobile unified card */
function MobileTerminalContent({
  activeExp,
  headerScramble,
  streamedLines,
  streamComplete,
}: {
  activeExp: (typeof experiences)[number];
  headerScramble: string | null;
  streamedLines: string[];
  streamComplete: boolean;
}) {
  return (
    <div className="relative z-10">
      {/* Role + period badge */}
      <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="font-architect rounded-md bg-foreground/[0.06] px-2 py-0.5 text-[clamp(0.52rem,1.8vw,0.6rem)] uppercase tracking-wider text-muted-foreground">
          {activeExp.role.toUpperCase()}
        </span>
        <span className="font-architect text-[clamp(0.5rem,1.6vw,0.58rem)] uppercase tracking-widest text-muted-foreground/80">
          ·
        </span>
        <span className="font-architect text-[clamp(0.5rem,1.6vw,0.58rem)] uppercase tracking-wider text-muted-foreground/90">
          {activeExp.period}
        </span>
      </div>
      <h3 className="font-display mb-3 min-h-[1.75rem] break-words text-[clamp(1rem,3.2vw,1.35rem)] font-semibold leading-tight tracking-tight">
        {headerScramble !== null ? headerScramble : activeExp.company.toUpperCase()}
      </h3>
      <div className="font-narrator space-y-2.5 break-words text-[clamp(0.8rem,2.4vw,1rem)] leading-[1.6] text-muted-foreground">
        {streamedLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.03 }}
            className="flex gap-2.5"
          >
            <span className="mt-2 h-px w-5 shrink-0 bg-foreground/50" />
            <span>{line}</span>
          </motion.div>
        ))}
        {!streamComplete && (
          <span className="inline-block h-4 w-2.5 animate-pulse rounded-sm bg-foreground/70" aria-hidden />
        )}
      </div>
      <p className="font-architect mt-5 border-t border-border/50 pt-4 text-[clamp(0.48rem,1.6vw,0.54rem)] uppercase tracking-[0.22em] text-muted-foreground/60">
        // CONNECTION: SECURE
      </p>
    </div>
  );
}

export function NarrativeSection() {
  const isMobile = useIsMobile();
  const scale = useTumblerScale();
  const ARC_R = Math.round(ARC_R_BASE * scale);
  const CENTER_X = Math.round(CENTER_X_BASE * scale);
  const CENTER_Y = ARC_R;
  const ITEM_W = Math.round(ITEM_W_BASE * scale);
  const ITEM_H = Math.round(ITEM_H_BASE * scale);
  const ITEM_GAP = Math.round(ITEM_GAP_BASE * scale);
  const LEFT_X = Math.round(LEFT_X_BASE * scale);
  const TOP_OFFSET = Math.round(TOP_OFFSET_BASE * scale);

  const [activeIndex, setActiveIndex] = useState(0);
  const [headerScramble, setHeaderScramble] = useState<string | null>(null);
  const [streamedLines, setStreamedLines] = useState<string[]>([]);
  const [streamComplete, setStreamComplete] = useState(true);

  const n = experiences.length;
  const activeExp = experiences[activeIndex];

  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const setActive = useCallback((delta: number) => {
    const next = (activeIndexRef.current + delta + n) % n;
    if (next === activeIndexRef.current) return;
    setHeaderScramble("");
    setStreamedLines([]);
    setStreamComplete(false);
    setActiveIndex(next);
  }, [n]);

  const goToIndex = useCallback((index: number) => {
    if (activeIndexRef.current === index) return;
    setHeaderScramble("");
    setStreamedLines([]);
    setStreamComplete(false);
    setActiveIndex(index);
  }, []);

  const scrollCooldownRef = useRef(false);
  const scrollAccumRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (scrollCooldownRef.current) return;
      scrollAccumRef.current += e.deltaY;
      if (Math.abs(scrollAccumRef.current) < SCROLL_THRESHOLD) return;
      const delta = scrollAccumRef.current > 0 ? 1 : -1;
      scrollAccumRef.current = 0;
      scrollCooldownRef.current = true;
      setTimeout(() => { scrollCooldownRef.current = false; }, SCROLL_COOLDOWN_MS);
      setActive(delta);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [setActive]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") setActive(1);
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") setActive(-1);
    },
    [setActive]
  );

  useEffect(() => {
    setHeaderScramble("");
    const target = experiences[activeIndex].company.toUpperCase();
    const steps = 12;
    let frame = 0;
    const iv = setInterval(() => {
      frame++;
      if (frame >= steps) {
        setHeaderScramble(null);
        clearInterval(iv);
        return;
      }
      const s = target
        .split("")
        .map((c) =>
          c === " " ? " " : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        )
        .join("");
      setHeaderScramble(s);
    }, 40);
    return () => clearInterval(iv);
  }, [activeIndex]);

  useEffect(() => {
    const items =
      activeIndex === 0
        ? [KNOWBAL_HEADLINE, KNOWBAL_METRICS, ...KNOWBAL_TECH]
        : activeIndex === 1
          ? ["Led software team · Mentored developers", ...(experiences[1]?.achievements ?? [])]
          : ["Academic mentoring · Student support", ...(experiences[2]?.achievements ?? [])];
    setStreamedLines([]);
    setStreamComplete(false);
    let idx = 0;
    const iv = setInterval(() => {
      if (idx < items.length) {
        setStreamedLines((prev) => [...prev, items[idx]!]);
        idx++;
      } else {
        setStreamComplete(true);
        clearInterval(iv);
      }
    }, 160);
    return () => clearInterval(iv);
  }, [activeIndex]);

  return (
    <section
      id="experience"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-x-hidden px-4 py-12 sm:py-16 md:px-8 md:py-20 lg:px-12 lg:py-20 xl:px-16 2xl:px-24"
      aria-label="Experience"
    >
      <h2 className="relative z-10 mb-6 sm:mb-10 md:mb-12 font-architect text-[clamp(0.6rem,1.8vw,0.7rem)] uppercase tracking-[0.35em] text-foreground/90">
        Experience
      </h2>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-stretch justify-center gap-6 overflow-visible sm:gap-8 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
        {/* Desktop: Left tumbler | Right terminal. Mobile: unified card with embedded selector */}
        {isMobile ? (
          /* Mobile: single unified card – selector strip + terminal content */
          <div className="flex w-full max-w-[min(100%,520px)] flex-col mx-auto">
            <motion.article
              className="relative overflow-hidden rounded-2xl border-2 border-border/60 bg-card/80 backdrop-blur-xl dark:border-white/[0.1] dark:bg-card/60"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                boxShadow:
                  "0 0 0 1px hsl(var(--border)/0.5), 0 8px 32px -8px rgba(0,0,0,0.3), 0 4px 16px -4px rgba(0,0,0,0.2)",
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,255,255,0.06),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,255,255,0.03),transparent)]" />
              <div className="relative border-b border-border/50 px-4 pt-4 pb-3">
                <MobileExperienceSelector
                  experiences={experiences}
                  activeIndex={activeIndex}
                  onSelect={goToIndex}
                  embedded
                />
              </div>
              <div className="relative max-h-[min(55vh,400px)] overflow-y-auto overscroll-contain px-4 py-5">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(0,0,0,0.08),transparent_50%)]" />
                <MobileTerminalContent
                  activeExp={activeExp}
                  headerScramble={headerScramble}
                  streamedLines={streamedLines}
                  streamComplete={streamComplete}
                />
              </div>
            </motion.article>
          </div>
        ) : (
        <>
        {/* Desktop: Left arc tumbler */}
        <aside className="flex min-w-0 flex-1 items-center justify-center overflow-visible lg:min-w-[460px] lg:flex-[1] lg:justify-start">
          <div
            ref={containerRef}
            tabIndex={0}
            role="listbox"
            aria-label="Experience selector – scroll or click to select"
            aria-activedescendant={`tumbler-item-${activeIndex}`}
            className="relative flex cursor-default flex-col items-stretch outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2"
            onKeyDown={onKeyDown}
          >
            {/* Track – 3 items; selected scrolls to center, others scroll in vertical column (left) */}
            <div
              className="relative overflow-visible"
            style={{
              width: "min(100%, " + (ITEM_W + (CENTER_X - ITEM_W / 2) + 40) + "px)",
              minHeight: ITEM_H * 3 + ITEM_GAP * 2 + 160,
            }}
            >
              {/* Arc guide – subtle, aligned with center */}
              <svg
                className="pointer-events-none absolute left-0 opacity-[0.12]"
                viewBox={`0 0 ${ARC_R * 2} ${ARC_R * 2}`}
                style={{
                  width: ARC_R * 2,
                  height: ARC_R * 2,
                  top: TOP_OFFSET,
                }}
              >
                <path
                  d={(() => {
                    const r = ARC_R - 2;
                    const s = polar(ARC_R, ARC_START, r);
                    const e = polar(ARC_R, ARC_END, r);
                    return `M ${s.x} ${s.y} A ${r} ${r} 0 0 1 ${e.x} ${e.y}`;
                  })()}
                  fill="none"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
              </svg>
              {experiences.map((exp, index) => {
                const isActive = index === activeIndex;
                let left = CENTER_X - ITEM_W / 2;
                let top = TOP_OFFSET + CENTER_Y - ITEM_H / 2;
                if (!isActive) {
                  left = LEFT_X;
                  const prevIndex = (activeIndex - 1 + n) % n; // circular: previous goes above
                  const nextIndex = (activeIndex + 1) % n; // circular: next goes below
                  if (index === prevIndex) {
                    top =
                      TOP_OFFSET +
                      CENTER_Y -
                      ITEM_H / 2 -
                      ITEM_GAP -
                      ITEM_H;
                  } else {
                    top =
                      TOP_OFFSET +
                      CENTER_Y +
                      ITEM_H / 2 +
                      ITEM_GAP;
                  }
                }
                return (
                  <motion.button
                    key={exp.company}
                    id={`tumbler-item-${index}`}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className="absolute flex items-center gap-3 rounded-xl border backdrop-blur-md px-4 py-4 text-left transition-colors"
                    style={{
                      height: ITEM_H,
                      width: ITEM_W,
                    }}
                    animate={{
                      left,
                      top,
                      opacity: 1,
                      backgroundColor: isActive
                        ? "hsl(var(--card) / 0.98)"
                        : "hsl(var(--card) / 0.75)",
                      borderColor: isActive
                        ? "hsl(var(--foreground) / 0.55)"
                        : "hsl(var(--foreground) / 0.35)",
                      boxShadow: isActive
                        ? "0 0 0 2px hsl(var(--foreground)/0.2), 0 8px 32px -4px rgba(0,0,0,0.6), 0 4px 16px -2px rgba(0,0,0,0.4)"
                        : "0 0 0 1px hsl(var(--foreground)/0.15), 0 4px 20px -2px rgba(0,0,0,0.55), 0 2px 10px -1px rgba(0,0,0,0.4)",
                    }}
                    transition={{
                      type: "tween",
                      ease: [0.25, 0.46, 0.45, 0.94] as const,
                      duration: 0.42,
                    }}
                    onClick={() => goToIndex(index)}
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: "hsl(var(--card) / 0.98)",
                      borderColor: "hsl(var(--foreground) / 0.5)",
                    }}
                  >
                    <span
                      className={`w-1 shrink-0 self-stretch rounded-full ${
                        isActive ? "bg-foreground" : "opacity-0"
                      }`}
                      aria-hidden
                    />
                    <span
                      className={`min-w-0 flex-1 overflow-hidden truncate font-architect text-[0.6rem] uppercase leading-snug tracking-wider sm:text-[0.68rem] ${
                        isActive ? "font-semibold text-foreground" : "text-foreground/95"
                      }`}
                    >
                      {exp.role}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            <p className="mt-3 font-architect text-[clamp(0.52rem,1.8vw,0.6rem)] uppercase tracking-widest text-foreground/80">
              Scroll or click to select
            </p>
          </div>
        </aside>

        {/* Connector */}
        <div className="hidden flex-shrink-0 items-center lg:flex" style={{ width: 24 }}>
          <div
            className="h-20 w-px shrink-0 bg-gradient-to-b from-transparent via-foreground/40 to-transparent"
            aria-hidden
          />
        </div>

        {/* Right: Terminal card */}
        <div className="flex min-h-[min(360px,70vh)] min-w-0 flex-1 flex-col justify-center lg:min-h-[420px] lg:flex-[3]">
          <motion.article
            key={activeIndex}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="relative min-w-0 overflow-hidden rounded-xl border border-border/50 bg-card/70 px-4 py-5 backdrop-blur-md dark:border-white/[0.08] dark:bg-card/50 sm:px-6 sm:py-7 md:px-10 md:py-11"
            style={{
              boxShadow:
                "0 0 0 1px hsl(var(--border)/0.4), 0 4px 24px -4px rgba(0,0,0,0.25), 0 2px 12px -2px rgba(0,0,0,0.15)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.04),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(0,0,0,0.1),transparent_50%)]" />
            <div className="relative z-10">
            <p className="font-architect mb-1.5 text-[clamp(0.55rem,1.6vw,0.62rem)] uppercase tracking-wider text-muted-foreground">
              {activeExp.role.toUpperCase()} · {activeExp.period}
            </p>
            <h3 className="font-display mb-2 min-h-[1.5rem] break-words text-[clamp(0.95rem,2.8vw,1.25rem)] font-semibold leading-tight tracking-tight sm:mb-3 sm:min-h-[1.75rem] md:mb-4 md:text-xl">
              {headerScramble !== null ? headerScramble : activeExp.company.toUpperCase()}
            </h3>

            <div className="font-narrator space-y-2 sm:space-y-2.5 break-words text-[clamp(0.7rem,2vw,1rem)] leading-relaxed text-muted-foreground sm:text-sm md:text-base">
              {streamedLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-2"
                >
                  <span className="mt-1.5 h-px w-4 shrink-0 bg-foreground/40" />
                  <span>{line}</span>
                </motion.div>
              ))}
              {!streamComplete && (
                <span
                  className="inline-block h-4 w-2 animate-pulse bg-foreground/80"
                  aria-hidden
                />
              )}
            </div>

            <p className="font-architect mt-4 sm:mt-6 border-t border-border/40 pt-3 sm:pt-4 text-[clamp(0.45rem,1.4vw,0.52rem)] uppercase tracking-[0.2em] text-muted-foreground/55">
              // CONNECTION: SECURE
            </p>
            </div>
          </motion.article>
        </div>
        </>
        )}
      </div>
    </section>
  );
}
