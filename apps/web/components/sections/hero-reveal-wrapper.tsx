"use client";

import { useEffect, useRef, useState } from "react";
import { HeroSection } from "./hero";

const WHEEL_SPEED = 1.2; // header lift per wheel delta
const TOP_LOCK_EPS = 2; // px tolerance to avoid jitter at top

declare global {
  interface Window {
    lenis?: {
      scroll: number;
      scrollTo: (
        target: number,
        options?: { duration?: number; onComplete?: () => void }
      ) => void;
      stop?: () => void;
      start?: () => void;
    };
  }
}

export function HeroRevealWrapper() {
  const [vh, setVh] = useState(1000);
  const [headerLift, setHeaderLift] = useState(0); // 0..vh, only used when at scroll 0
  const [coverActive, setCoverActive] = useState(true);
  const vhRef = useRef(vh);
  const headerLiftRef = useRef(headerLift);
  const coverActiveRef = useRef(coverActive);
  vhRef.current = vh;
  headerLiftRef.current = headerLift;
  coverActiveRef.current = coverActive;

  useEffect(() => {
    const setVhPx = () => setVh(window.innerHeight);
    setVhPx();
    window.addEventListener("resize", setVhPx);

    return () => {
      window.removeEventListener("resize", setVhPx);
    };
  }, []);

  // At scroll 0: capture wheel so the page doesn't scroll; only move the header (separate from usual scroll)
  useEffect(() => {
    const atTop = () => {
      const y = window.lenis != null ? window.lenis.scroll : window.scrollY;
      return y <= TOP_LOCK_EPS;
    };

    const onWheel = (e: WheelEvent) => {
      if (!coverActiveRef.current) return;
      if (!atTop()) return;
      const currentVh = vhRef.current;
      let next = headerLiftRef.current + e.deltaY * WHEEL_SPEED;
      if (next >= currentVh) {
        setHeaderLift(currentVh);
        e.preventDefault();
        setCoverActive(false);
        return;
      }
      if (next <= 0) next = 0;
      setHeaderLift(next);
      e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Lock page scroll while cover is active
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (coverActive) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      window.lenis?.stop?.();
    } else {
      html.style.overflow = "auto";
      body.style.overflow = "auto";
      window.lenis?.start?.();
    }
    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      window.lenis?.start?.();
    };
  }, [coverActive]);

  // Header cover: lifted by wheel input, then snaps out and unlocks page scroll
  const translateY = coverActive ? -headerLift : -vh;
  const heroScrollY = coverActive ? headerLift : 0;

  return (
    <>
      <div
        className="fixed left-0 top-0 z-20 h-screen w-full bg-background will-change-transform"
        style={{
          transform: `translate3d(0, ${translateY}px, 0)`,
          pointerEvents: coverActive ? "auto" : "none"
        }}
        aria-hidden={!coverActive}
      >
        <HeroSection scrollY={heroScrollY} />
      </div>
    </>
  );
}
