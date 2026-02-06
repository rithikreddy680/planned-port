'use client';

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("rr-theme");
    if (stored === "light" || stored === "dark") {
      applyTheme(stored);
      setTheme(stored);
      return;
    }
    // default to dark / Digital Noir
    applyTheme("dark");
    setTheme("dark");
  }, []);

  const applyTheme = (mode: Theme) => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    window.localStorage.setItem("rr-theme", next);
  };

  const label = theme === "dark" ? "NOIR" : "LIGHT";

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed right-4 top-4 z-50 flex h-8 items-center rounded-sm border border-border/70 bg-background/80 px-3 text-[0.65rem] font-medium tracking-[0.18em] text-muted-foreground backdrop-blur-md"
      aria-label="Toggle theme"
    >
      {label}
    </button>
  );
}

