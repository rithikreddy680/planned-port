import { DM_Sans } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

/**
 * Aeonik-style structure: one geometric sans used in three "voices".
 */
export const aeonik = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-aeonik",
  display: "swap",
});

/** Hero headline + footer: Geist Sans */
export const geistSans = GeistSans;

/** Hero name + footer watermark: Geist Mono */
export const geistMono = GeistMono;
