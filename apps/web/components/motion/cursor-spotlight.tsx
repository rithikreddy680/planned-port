'use client';

import { useEffect } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";

export function CursorSpotlight() {
  const { x, y } = useMousePosition();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--pointer-x", `${x}px`);
    root.style.setProperty("--pointer-y", `${y}px`);
  }, [x, y]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(600px_circle_at_var(--pointer-x,_50%)_var(--pointer-y,_50%),rgba(255,255,255,0.06),transparent_40%)] mix-blend-screen"
      aria-hidden="true"
    />
  );
}

