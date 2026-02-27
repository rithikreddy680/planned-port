"use client";

import type { LucideIcon } from "lucide-react";
import { motion, type Variants } from "framer-motion";

type QualityCardProps = {
  title: string;
  copy: string;
  Icon: LucideIcon;
  toneClass: string;
  iconSize?: number;
  variants?: Variants;
};

export function QualityCard({
  title,
  copy,
  Icon,
  toneClass,
  iconSize = 30,
  variants
}: QualityCardProps) {
  return (
    <motion.article
      variants={variants}
      className={`relative flex min-h-[min(260px,40vh)] min-w-0 flex-col gap-3 overflow-hidden rounded-2xl sm:rounded-3xl border border-black/10 p-4 text-black sm:min-h-[300px] sm:gap-5 sm:p-5 md:min-h-[340px] md:gap-6 md:p-6 lg:p-7 ${toneClass}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "tween", duration: 0.2 }}
    >
      <div className="flex shrink-0 items-center justify-center text-black">
        <Icon size={iconSize} strokeWidth={1.5} aria-hidden />
      </div>
      <h3 className="min-h-[2.25rem] flex-1 break-words text-center text-[clamp(0.9rem,2.5vw,1.25rem)] font-semibold leading-tight tracking-tight sm:min-h-[2.75rem] md:min-h-[3.25rem] md:text-xl">
        {title}
      </h3>
      <div className="h-px w-full shrink-0 bg-black/20" aria-hidden />
      <p className="min-w-0 overflow-hidden break-words text-[clamp(0.7rem,2vw,0.875rem)] leading-relaxed text-black/80 sm:text-sm">
        {copy}
      </p>
    </motion.article>
  );
}
