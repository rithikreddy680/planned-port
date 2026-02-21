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
      className={`relative flex min-h-[320px] flex-col gap-6 rounded-3xl border border-black/10 p-6 text-black md:min-h-[360px] md:p-7 ${toneClass}`}
    >
      <div className="flex items-center justify-center text-black">
        <Icon size={iconSize} strokeWidth={1.5} aria-hidden />
      </div>
      <h3 className="min-h-[3.5rem] text-center text-xl font-semibold leading-tight tracking-tight">
        {title}
      </h3>
      <div className="h-px w-full bg-black/20" aria-hidden />
      <p className="text-sm leading-relaxed text-black/80">
        {copy}
      </p>
    </motion.article>
  );
}
