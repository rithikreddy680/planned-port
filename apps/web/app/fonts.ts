import { Inter_Tight as InterTight, JetBrains_Mono as JetBrainsMono } from "next/font/google";

export const sans = InterTight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const mono = JetBrainsMono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

