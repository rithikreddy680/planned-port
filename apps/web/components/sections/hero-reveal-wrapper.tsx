"use client";

import { useEffect, useRef, useState } from "react";
import { HeroSection } from "./hero";

const WHEEL_SPEED = 1.2; // header lift per wheel delta
const TOP_LOCK_EPS = 2; // px tolerance to avoid jitter at top
const OVERSCROLL_THRESHOLD = 180; // px of "pull past top" required to reactivate cover
const COVER_OFF_DURATION = 999; // ms for click-to-open animation
const AUTO_SNAP_THRESHOLD = 0.33; // 33% open triggers snap-off
const AUTO_SNAP_IDLE_MS = 140; // ms after wheel stop to decide snap

function easePower3Out(t: number): number {
  return 1 - (1 - t) * (1 - t) * (1 - t);
}

function notifyCoverOpened() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("cover:opened"));
}

function notifyCoverClosed() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("cover:closed"));
}

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
  const overscrollRef = useRef(0);
  const overscrollAttemptsRef = useRef(0);
  const isCoverAnimatingRef = useRef(false);
  const snapIdleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  vhRef.current = vh;
  headerLiftRef.current = headerLift;
  coverActiveRef.current = coverActive;

  const startCoverOffAnimation = (startOverride?: number) => {
    if (!coverActiveRef.current || isCoverAnimatingRef.current) return;
    isCoverAnimatingRef.current = true;
    const start = startOverride ?? headerLiftRef.current;
    const target = vhRef.current;
    const startT = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - startT) / COVER_OFF_DURATION, 1);
      const eased = easePower3Out(t);
      const next = start + (target - start) * eased;
      setHeaderLift(next);
      if (t < 1) requestAnimationFrame(animate);
      else {
        setHeaderLift(target);
        setCoverActive(false);
        isCoverAnimatingRef.current = false;
        notifyCoverOpened();
      }
    };
    requestAnimationFrame(animate);
  };

  const startCoverOnAnimation = (startOverride?: number) => {
    if (!coverActiveRef.current || isCoverAnimatingRef.current) return;
    isCoverAnimatingRef.current = true;
    const start = startOverride ?? headerLiftRef.current;
    const target = 0;
    const startT = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - startT) / COVER_OFF_DURATION, 1);
      const eased = easePower3Out(t);
      const next = start + (target - start) * eased;
      setHeaderLift(next);
      if (t < 1) requestAnimationFrame(animate);
      else {
        setHeaderLift(target);
        isCoverAnimatingRef.current = false;
      }
    };
    requestAnimationFrame(animate);
  };

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
      if (!atTop()) return;
      // If cover is inactive, only reactivate on "overscroll up"
      if (!coverActiveRef.current) {
        if (e.deltaY < 0) {
          overscrollRef.current += Math.abs(e.deltaY);
          e.preventDefault();
          if (overscrollRef.current >= OVERSCROLL_THRESHOLD) {
            overscrollRef.current = 0;
            overscrollAttemptsRef.current += 1;
            if (overscrollAttemptsRef.current >= 2) {
              overscrollAttemptsRef.current = 0;
              window.scrollTo(0, 0);
              setHeaderLift(0);
              setCoverActive(true);
              notifyCoverClosed();
            }
          }
        } else {
          overscrollRef.current = 0;
          overscrollAttemptsRef.current = 0;
        }
        return;
      }
      if (isCoverAnimatingRef.current) return;
      overscrollRef.current = 0;
      overscrollAttemptsRef.current = 0;
      if (snapIdleRef.current) clearTimeout(snapIdleRef.current);
      const currentVh = vhRef.current;
      let next = headerLiftRef.current + e.deltaY * WHEEL_SPEED;
      const snapAt = currentVh * AUTO_SNAP_THRESHOLD;
      if (e.deltaY > 0 && next >= snapAt) {
        next = Math.min(next, currentVh);
        setHeaderLift(next);
        e.preventDefault();
        startCoverOffAnimation(next);
        return;
      }
      if (next <= 0) next = 0;
      setHeaderLift(next);
      const shouldSnapBack = next < currentVh * AUTO_SNAP_THRESHOLD;
      snapIdleRef.current = setTimeout(() => {
        if (shouldSnapBack) startCoverOnAnimation(next);
      }, AUTO_SNAP_IDLE_MS);
      e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (snapIdleRef.current) clearTimeout(snapIdleRef.current);
    };
  }, []);

  // Touch support for mobile/tablet: drag to open cover
  useEffect(() => {
    const atTop = () => {
      const y = window.lenis != null ? window.lenis.scroll : window.scrollY;
      return y <= TOP_LOCK_EPS;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!coverActiveRef.current) return;
      if (!atTop()) return;
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!coverActiveRef.current) return;
      if (!atTop()) return;
      if (isCoverAnimatingRef.current) return;
      const currentVh = vhRef.current;
      const currentY = e.touches[0]?.clientY ?? 0;
      if (touchStartYRef.current == null) touchStartYRef.current = currentY;
      const deltaY = touchStartYRef.current - currentY;
      if (Math.abs(deltaY) < 0.5) return;
      let next = headerLiftRef.current + deltaY * 0.9;
      const snapAt = currentVh * AUTO_SNAP_THRESHOLD;
      if (deltaY > 0 && next >= snapAt) {
        next = Math.min(next, currentVh);
        setHeaderLift(next);
        e.preventDefault();
        startCoverOffAnimation(next);
        touchStartYRef.current = currentY;
        return;
      }
      if (next <= 0) next = 0;
      setHeaderLift(next);
      if (snapIdleRef.current) clearTimeout(snapIdleRef.current);
      const shouldSnapBack = next < currentVh * AUTO_SNAP_THRESHOLD;
      snapIdleRef.current = setTimeout(() => {
        if (shouldSnapBack) startCoverOnAnimation(next);
      }, AUTO_SNAP_IDLE_MS);
      touchStartYRef.current = currentY;
      e.preventDefault();
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
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
  const handleViewWork = () => {
    startCoverOffAnimation();
  };

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
        {/* Distinct cover layer: tint + edge + depth */}
        <div className="pointer-events-none absolute inset-0 bg-black/25" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_-2px_0_rgba(255,255,255,0.15)]" />
        <HeroSection scrollY={heroScrollY} onViewWork={handleViewWork} />
      </div>
    </>
  );
}
