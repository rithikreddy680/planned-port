import type { Metadata } from "next";
import "./globals.css";
import { aeonik, geistSans, geistMono } from "./fonts";
import { CursorSpotlight } from "@/components/motion/cursor-spotlight";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const metadata: Metadata = {
  title: "Rithik Reddy | Full Stack Software Engineer",
  description:
    "Portfolio of Rithik Reddy, a Software Engineering student at Monash University specialising in scalable logic, Next.js and SAP S/4HANA."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${aeonik.variable} ${geistSans?.variable ?? ""} ${geistMono?.variable ?? ""}`.trim()}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SmoothScroll>
          <div className="relative min-h-screen overflow-hidden">
            {/* Soft top gradient */}
            <div className="pointer-events-none fixed inset-0 -z-40 bg-[radial-gradient(circle_at_top,_rgba(250,250,250,0.06),transparent_60%)]" />

            {/* Film grain overlay */}
            <div className="pointer-events-none fixed inset-0 -z-30 mix-blend-overlay opacity-[0.06] bg-[url('/noise.svg')]" />

            {/* Searchlight cursor */}
            <CursorSpotlight />
            <ThemeToggle />

            <div className="relative z-10">
              {children}
            </div>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
