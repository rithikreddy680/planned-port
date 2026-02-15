"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "@/lib/content";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const KNOWBAL_HEADLINE = "CRM Optimization & Automation";
const KNOWBAL_METRICS = "Reduced manual admin overhead via automated email triggers.";
const KNOWBAL_TECH = ["Smart Document Checklists", "Applicant Eligibility Checker"];

const ARC_R = 130;
const ARC_START = 55;
const ARC_END = 125;
const CENTER_X = 260;
const CENTER_Y = ARC_R;
const ITEM_W = 280;
const ITEM_H = 80;
const ITEM_GAP = 72;
const LEFT_X = 8;
const TOP_OFFSET = 90;

function polar(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: ARC_R + r * Math.cos(rad), y: ARC_R + r * Math.sin(rad) };
}

const SCROLL_COOLDOWN_MS = 960;
const SCROLL_THRESHOLD = 200;

export function NarrativeSection() {
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
      className="relative flex min-h-screen w-full flex-col justify-center overflow-x-hidden bg-background px-4 py-20 md:px-8 lg:px-12 xl:px-16 2xl:px-24"
      aria-label="Experience"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <h2 className="relative z-10 mb-12 font-architect text-[0.7rem] uppercase tracking-[0.35em] text-muted-foreground">
        Experience
      </h2>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-stretch justify-center gap-8 overflow-visible lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
        {/* Left: Vertical tumbler – all 3 visible, scroll or click to select */}
        <aside className="flex min-w-0 flex-1 items-center justify-center overflow-visible lg:min-w-[460px] lg:flex-[1] lg:justify-start">
          <div
            ref={containerRef}
            tabIndex={0}
            role="listbox"
            aria-label="Experience selector – scroll or click to select"
            aria-activedescendant={`tumbler-item-${activeIndex}`}
            className="relative flex cursor-default flex-col items-stretch outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2"
            onKeyDown={onKeyDown}
          >
            {/* Track – 3 items; selected scrolls to center, others scroll in vertical column (left) */}
            <div
              className="relative overflow-visible"
              style={{
                width: ITEM_W + (CENTER_X - ITEM_W / 2) + 40,
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
                    const s = polar(ARC_START, r);
                    const e = polar(ARC_END, r);
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
                    className="absolute flex items-center gap-3 rounded-xl border border-foreground/25 px-4 py-4 text-left transition-colors"
                    style={{
                      height: ITEM_H,
                      width: ITEM_W,
                    }}
                    animate={{
                      left,
                      top,
                      opacity: isActive ? 1 : 0.65,
                      backgroundColor: isActive
                        ? "hsl(var(--foreground) / 0.12)"
                        : "hsl(var(--foreground) / 0.03)",
                      boxShadow: isActive
                        ? "0 0 20px -6px hsl(var(--foreground)/0.15)"
                        : "none",
                    }}
                    transition={{
                      type: "tween",
                      ease: [0.25, 0.46, 0.45, 0.94],
                      duration: 0.42,
                    }}
                    onClick={() => goToIndex(index)}
                    whileHover={{
                      backgroundColor: isActive
                        ? "hsl(var(--foreground) / 0.16)"
                        : "hsl(var(--foreground) / 0.06)",
                      opacity: isActive ? 1 : 0.85,
                    }}
                  >
                    <span
                      className={`w-1 shrink-0 self-stretch rounded-full ${
                        isActive ? "bg-foreground" : "opacity-0"
                      }`}
                      aria-hidden
                    />
                    <span
                      className={`min-w-0 flex-1 overflow-visible whitespace-nowrap font-architect text-[0.68rem] uppercase leading-snug tracking-wider ${
                        isActive ? "font-semibold text-foreground" : "text-foreground/80"
                      }`}
                    >
                      {exp.role}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            <p className="mt-3 font-architect text-[0.55rem] uppercase tracking-widest text-muted-foreground/50">
              Scroll or click to select
            </p>
          </div>
        </aside>

        {/* Connector */}
        <div className="hidden flex-shrink-0 items-center lg:flex" style={{ width: 24 }}>
          <div
            className="h-20 w-px shrink-0 bg-gradient-to-b from-transparent via-foreground/20 to-transparent"
            aria-hidden
          />
        </div>

        {/* Right: Terminal card */}
        <div className="flex min-h-[360px] min-w-0 flex-1 flex-col justify-center lg:min-h-[420px] lg:flex-[3]">
          <motion.article
            key={activeIndex}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="relative overflow-hidden rounded-xl border border-border/50 bg-card/60 px-8 py-9 backdrop-blur-sm md:px-10 md:py-11 dark:border-white/[0.06] dark:bg-card/40"
            style={{
              boxShadow:
                "0 0 0 1px hsl(var(--border)/0.3), 0 2px 16px -2px rgba(0,0,0,0.06)",
            }}
          >
            <p className="font-architect mb-1.5 text-[0.62rem] uppercase tracking-wider text-muted-foreground">
              {activeExp.role.toUpperCase()} · {activeExp.period}
            </p>
            <h3 className="font-display mb-4 min-h-[1.75rem] text-lg font-semibold leading-tight tracking-tight md:text-xl">
              {headerScramble !== null ? headerScramble : activeExp.company.toUpperCase()}
            </h3>

            <div className="font-narrator space-y-2.5 text-sm leading-relaxed text-muted-foreground md:text-base">
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

            <p className="font-architect mt-6 border-t border-border/40 pt-4 text-[0.52rem] uppercase tracking-[0.2em] text-muted-foreground/55">
              // CONNECTION: SECURE
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
