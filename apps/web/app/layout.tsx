import type { Metadata } from "next";
import "./globals.css";
import { sans, mono } from "./fonts";
import { CursorSpotlight } from "@/components/motion/cursor-spotlight";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

export const metadata: Metadata = {
  title: "Rithik Reddy | Portfolio",
  description: "Building Scalable Logic."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SmoothScroll>
          <div className="relative min-h-screen overflow-hidden">
            {/* Grid background */}
            <div className="pointer-events-none fixed inset-0 -z-40 bg-[radial-gradient(circle_at_top,_rgba(250,250,250,0.06),transparent_60%)]" />
            <div className="pointer-events-none fixed inset-0 -z-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:120px_120px]" />

            {/* Film grain overlay */}
            <div className="pointer-events-none fixed inset-0 -z-30 mix-blend-overlay opacity-[0.06] bg-[url('/noise.svg')]" />

            {/* Searchlight cursor */}
            <CursorSpotlight />

            <div className="relative z-10">
              {children}
            </div>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
