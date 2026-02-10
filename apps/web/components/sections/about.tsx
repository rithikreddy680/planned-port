"use client";

import { useEffect, useRef, useState } from "react";
import { BrainCircuit, Cpu, Microscope, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const ICON_SIZE = 30;
const LINE1_TEXT = "AN ENGINEER BY PROFESSION";
const LINE2_TEXT = "A REVERSE ENGINEER BY NATURE";
const GLITCH_DELAY_MS = 200;
const GLITCH_DURATION_MS = 800;
const GLITCH_INTERVAL_MS = 40;
const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*@?!";

const introVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
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
  const [line2Text, setLine2Text] = useState(LINE2_TEXT);
  const [phase, setPhase] = useState<"idle" | "glitch" | "revealed">("idle");
  const [showContent, setShowContent] = useState(false);
  const hasRunRef = useRef(false);

  useEffect(() => {
    let intervalId: number | null = null;
    let glitchTimeout: number | null = null;
    let delayTimeout: number | null = null;
    const startGlitch = () => {
      if (hasRunRef.current) return;
      hasRunRef.current = true;
      setPhase("glitch");
      const startTime = performance.now();
      intervalId = window.setInterval(() => {
        const progress = Math.min((performance.now() - startTime) / GLITCH_DURATION_MS, 1);
        const scrambled = LINE2_TEXT.split("").map((char) => {
          if (char === " ") return " ";
          if (Math.random() < progress) return char;
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        });
        setLine2Text(scrambled.join(""));
      }, GLITCH_INTERVAL_MS);
      glitchTimeout = window.setTimeout(() => {
        if (intervalId) window.clearInterval(intervalId);
        setLine2Text(LINE2_TEXT);
        setPhase("revealed");
        setShowContent(true);
      }, GLITCH_DURATION_MS);
    };
    const onCoverOpened = () => {
      delayTimeout = window.setTimeout(startGlitch, GLITCH_DELAY_MS);
    };
    window.addEventListener("cover:opened", onCoverOpened);
    return () => {
      window.removeEventListener("cover:opened", onCoverOpened);
      if (intervalId) window.clearInterval(intervalId);
      if (glitchTimeout) window.clearTimeout(glitchTimeout);
      if (delayTimeout) window.clearTimeout(delayTimeout);
    };
  }, []);

  return (
    <section
      id="about"
      className="relative h-screen bg-background px-6 py-16 md:px-12 lg:px-20"
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
        <div className="mt-8 w-full max-w-6xl text-left">
          <h2 className="whitespace-nowrap text-[clamp(2rem,5vw,4.35rem)] font-semibold leading-[0.95] text-foreground">
            {LINE1_TEXT}
          </h2>
          <h3
            className={`mt-2 inline-block whitespace-nowrap text-[clamp(2rem,5vw,4.35rem)] font-semibold leading-[0.95] ${
              phase === "revealed" ? "text-transparent" : "text-foreground"
            }`}
            style={{
              WebkitTextStroke: phase === "revealed" ? "1px rgba(250,250,250,0.95)" : "0px transparent",
              textShadow:
                phase === "glitch"
                  ? "1px 0 0 rgba(255,0,80,0.8), -1px 0 0 rgba(0,200,255,0.8)"
                  : "none",
              fontFamily:
                phase === "revealed"
                  ? "var(--font-geist-mono), monospace"
                  : "var(--font-geist-sans), system-ui, sans-serif",
              minWidth: `${LINE2_TEXT.length}ch`
            }}
          >
            {line2Text}
          </h3>
        </div>

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
          {/* Beam track */}
          <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-white/10" />
          {/* Beam head removed */}
          {QUALITIES.map(({ title, copy, Icon, tone }) => (
            <QualityNode key={title} title={title} copy={copy} Icon={Icon} tone={tone} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
