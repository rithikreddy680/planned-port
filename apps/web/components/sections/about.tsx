"use client";

import { useEffect, useRef, useState } from "react";
import { BrainCircuit, Cpu, Microscope, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const ICON_SIZE = 30;
const LINE1_TEXT = "AN ENGINEER BY PROFESSION";
const LINE2_INITIAL = "AN ENGINEER BY NATURE";
const LINE2_FINAL = "A REVERSE ENGINEER BY NATURE";
const POP_LINES_DELAY_MS = 120;
const POP_CONTENT_DELAY_MS = 700;
const GLITCH_AFTER_CONTENT_MS = 2300;
const GLITCH_DELAY_MS = 0;
const GLITCH_DURATION_MS = 1000;
const GLITCH_INTERVAL_MS = 40;
const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*@?!";
const SHAKE_INTERVAL_MS = 5000;
const SHAKE_DURATION_MS = 400;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const introVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
};

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35, ease: EASE } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } }
};

const lineBlockVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
};

const wordContainerLine1 = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1, ease: EASE } }
};

const wordContainerLine2 = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } }
};

const wordVariant = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }
};

const QUALITIES = [
  {
    title: "COGNITIVE VELOCITY",
    copy:
      "Rapid assimilation of new tech stacks and paradigms. I don't just learn; I absorb and implement. Capable of transitioning from concept to deployment in unfamiliar environments with minimal latency.",
    Icon: Cpu,
    tone: "bg-[#F5D86E]"
  },
  {
    title: "SYSTEMIC CURIOSITY",
    copy:
      "A compulsion to deconstruct the 'black box.' I analyze not just how code works, but why it was architected that way. Driven to uncover hidden logic, optimize bottlenecks, and understand the root cause of every anomaly.",
    Icon: Microscope,
    tone: "bg-[#F05A47]"
  },
  {
    title: "RELENTLESS OPTIMIZATION",
    copy:
      "Thriving under complexity and high-stakes constraints. Good code is a baseline; I aim for the theoretical limit of performance. I treat every project as a competition against inefficiency, pushing for leaner, faster, and more scalable solutions.",
    Icon: TrendingUp,
    tone: "bg-[#FF8FD1]"
  },
  {
    title: "ALGORITHMIC PRECISION",
    copy:
      "First-principles thinking applied to system architecture. I approach problems with mathematical rigor, ensuring that every function, class, and database schema is logically sound, deterministic, and built to scale without technical debt.",
    Icon: BrainCircuit,
    tone: "bg-[#8FD4FF]"
  }
];

function QualityNode({
  title,
  copy,
  Icon,
  tone
}: {
  title: string;
  copy: string;
  Icon: typeof Cpu;
  tone: string;
}) {
  return (
    <motion.article
      variants={cardVariants}
      className={`relative flex min-h-[320px] flex-col gap-6 rounded-3xl border border-black/10 p-6 text-black md:min-h-[360px] md:p-7 ${tone}`}
    >
      <div className="flex items-center justify-center text-black">
        <Icon size={ICON_SIZE} strokeWidth={1.5} aria-hidden />
      </div>
      <h3 className="min-h-[3.5rem] text-center text-xl font-semibold leading-tight tracking-tight">
        {title}
      </h3>
      <div className="h-px w-full bg-black/20" aria-hidden />
      <p className="text-sm leading-relaxed text-black/80">
        {copy}
      </p>
    </motion.article>
  );
}

export function AboutSection() {
  const [line2Text, setLine2Text] = useState(LINE2_INITIAL);
  const [phase, setPhase] = useState<"camouflage" | "glitch" | "revealed">("camouflage");
  const [showLines, setShowLines] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const glitchIntervalRef = useRef<number | null>(null);
  const glitchTimeoutRef = useRef<number | null>(null);
  const delayTimeoutRef = useRef<number | null>(null);
  const linesTimeoutRef = useRef<number | null>(null);
  const contentTimeoutRef = useRef<number | null>(null);
  const shakeIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const clearTimers = () => {
      if (glitchIntervalRef.current) window.clearInterval(glitchIntervalRef.current);
      if (glitchTimeoutRef.current) window.clearTimeout(glitchTimeoutRef.current);
      if (delayTimeoutRef.current) window.clearTimeout(delayTimeoutRef.current);
      if (linesTimeoutRef.current) window.clearTimeout(linesTimeoutRef.current);
      if (contentTimeoutRef.current) window.clearTimeout(contentTimeoutRef.current);
      if (shakeIntervalRef.current) window.clearInterval(shakeIntervalRef.current);
      glitchIntervalRef.current = null;
      glitchTimeoutRef.current = null;
      delayTimeoutRef.current = null;
      linesTimeoutRef.current = null;
      contentTimeoutRef.current = null;
      shakeIntervalRef.current = null;
    };

    const resetState = () => {
      setPhase("camouflage");
      setLine2Text(LINE2_INITIAL);
      setShowLines(false);
      setShowContent(false);
      setIsShaking(false);
    };

    const startGlitch = () => {
      clearTimers();
      setPhase("glitch");
      const startTime = performance.now();
      setLine2Text("A ENGINEER BY NATURE");
      glitchIntervalRef.current = window.setInterval(() => {
        const progress = Math.min((performance.now() - startTime) / GLITCH_DURATION_MS, 1);
        const revealCount = Math.floor(progress * LINE2_FINAL.length);
        const scrambled = LINE2_FINAL.split("").map((char, index) => {
          if (char === " ") return " ";
          if (index < revealCount) return char;
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        });
        setLine2Text(scrambled.join(""));
      }, GLITCH_INTERVAL_MS);
      glitchTimeoutRef.current = window.setTimeout(() => {
        if (glitchIntervalRef.current) window.clearInterval(glitchIntervalRef.current);
        setLine2Text(LINE2_FINAL);
        setPhase("revealed");
        setShowContent(true);
      }, GLITCH_DURATION_MS);
    };
    const onCoverOpened = () => {
      clearTimers();
      resetState();
      linesTimeoutRef.current = window.setTimeout(() => {
        setShowLines(true);
      }, POP_LINES_DELAY_MS);
      contentTimeoutRef.current = window.setTimeout(() => {
        setShowContent(true);
      }, POP_CONTENT_DELAY_MS);
      delayTimeoutRef.current = window.setTimeout(
        startGlitch,
        POP_CONTENT_DELAY_MS + GLITCH_AFTER_CONTENT_MS + GLITCH_DELAY_MS
      );
    };
    const onCoverClosed = () => {
      clearTimers();
      resetState();
    };
    window.addEventListener("cover:opened", onCoverOpened);
    window.addEventListener("cover:closed", onCoverClosed);
    return () => {
      window.removeEventListener("cover:opened", onCoverOpened);
      window.removeEventListener("cover:closed", onCoverClosed);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    if (phase !== "revealed") return;
    if (shakeIntervalRef.current) window.clearInterval(shakeIntervalRef.current);
    shakeIntervalRef.current = window.setInterval(() => {
      setIsShaking(true);
      window.setTimeout(() => setIsShaking(false), SHAKE_DURATION_MS);
    }, SHAKE_INTERVAL_MS);
    return () => {
      if (shakeIntervalRef.current) window.clearInterval(shakeIntervalRef.current);
      shakeIntervalRef.current = null;
    };
  }, [phase]);

  return (
    <section
      id="about"
      className="relative min-h-screen bg-background px-6 py-12 md:px-12 md:py-16 lg:px-20"
      style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
    >
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        {/* About Tag */}
        <div className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground md:text-lg">
          <span className="text-foreground">
            About me
            <motion.span
              className="inline-block align-baseline"
              style={{ fontSize: "1.2em", transform: "translateY(0.14em)" }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
              aria-hidden
            >
              !
            </motion.span>
          </span>
        </div>

        {/* Duality Statement */}
        <motion.div
          className="mt-8 w-full max-w-6xl text-left"
          variants={lineBlockVariants}
          initial="hidden"
          animate={showLines ? "show" : "hidden"}
        >
          <motion.h2
            className="text-[clamp(1.8rem,5.4vw,4.35rem)] font-semibold leading-[0.95] text-foreground md:whitespace-nowrap"
            variants={wordContainerLine1}
            initial="hidden"
            animate={showLines ? "show" : "hidden"}
          >
            {LINE1_TEXT.split(" ").map((word) => (
              <motion.span key={word} variants={wordVariant} className="inline-block">
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.h2>

          {phase === "camouflage" ? (
            <motion.h3
              className="mt-2 text-[clamp(1.8rem,5.4vw,4.35rem)] font-semibold leading-[0.95] text-foreground md:whitespace-nowrap"
              variants={wordContainerLine2}
              initial="hidden"
              animate={showLines ? "show" : "hidden"}
              style={{ maxWidth: "100%" }}
            >
              {LINE2_INITIAL.split(" ").map((word) => (
                <motion.span key={word} variants={wordVariant} className="inline-block">
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.h3>
          ) : (
            <motion.h3
              className={`mt-2 inline-block text-[clamp(1.8rem,5.4vw,4.35rem)] font-semibold leading-[0.95] md:whitespace-nowrap ${
                phase === "revealed"
                  ? "text-transparent"
                  : phase === "glitch"
                    ? "text-foreground/70"
                    : "text-foreground"
              }`}
              style={{
                WebkitTextStroke: phase === "revealed" ? "1px rgba(250,250,250,0.95)" : "0px transparent",
                fontFamily:
                  phase === "revealed" || phase === "glitch"
                    ? "var(--font-geist-mono), monospace"
                    : "var(--font-geist-sans), system-ui, sans-serif",
                maxWidth: "100%",
                minWidth: `${Math.max(LINE2_INITIAL.length, LINE2_FINAL.length)}ch`
              }}
            >
              {phase === "revealed" ? (
                <>
                  A{" "}
                  <motion.span
                    className="inline-block"
                    animate={
                      isShaking
                        ? { x: [0, 1, -1, 0], y: [0, -1, 1, 0] }
                        : { x: 0, y: 0 }
                    }
                    transition={isShaking ? { duration: 0.4, ease: "linear" } : { duration: 0.2 }}
                    style={{
                      textShadow: isShaking
                        ? "1px 0 0 rgba(255,0,80,0.8), -1px 0 0 rgba(0,200,255,0.8)"
                        : "none"
                    }}
                  >
                    REVERSE ENGINEER
                  </motion.span>{" "}
                  BY NATURE
                </>
              ) : (
                line2Text
              )}
            </motion.h3>
          )}
        </motion.div>

        <motion.p
          className="mt-10 w-full max-w-6xl text-base font-medium leading-relaxed text-foreground/80 md:text-lg"
          variants={introVariants}
          initial="hidden"
          animate={showContent ? "show" : "hidden"}
        >
          I don't just build software; I deconstruct logic. I trace every system
          back to its first principles, then reconstruct it with speed, precision,
          and intent. This is the underlying framework behind every line of code
          I write, and the filter I use to eliminate noise, surface signals, and
          ship systems that stay clean under scale.
        </motion.p>

        {/* Data Grid + Scanner Beam */}
        <motion.div
          className="relative mt-10 grid grid-cols-1 gap-6 md:grid-cols-4"
          variants={gridVariants}
          initial="hidden"
          animate={showContent ? "show" : "hidden"}
        >
          {/* Beam head removed */}
          {QUALITIES.map(({ title, copy, Icon, tone }) => (
            <QualityNode key={title} title={title} copy={copy} Icon={Icon} tone={tone} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
