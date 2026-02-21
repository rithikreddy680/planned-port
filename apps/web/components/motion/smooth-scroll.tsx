'use client';

import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

export function SmoothScroll({ children }: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let lenisInstance: InstanceType<typeof import("@studio-freight/lenis")> | null = null;
    let frame: number | null = null;
    let cancelled = false;

    void import("@studio-freight/lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenisInstance = new Lenis({
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
      });

      (window as unknown as { lenis?: typeof lenisInstance }).lenis = lenisInstance;

      const raf = (time: number) => {
        lenisInstance?.raf(time);
        frame = requestAnimationFrame(raf);
      };

      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      if (frame !== null) cancelAnimationFrame(frame);
      if (lenisInstance) {
        lenisInstance.destroy();
        delete (window as unknown as { lenis?: unknown }).lenis;
      }
    };
  }, []);

  return <>{children}</>;
}

