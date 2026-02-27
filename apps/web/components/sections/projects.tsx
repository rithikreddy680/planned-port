"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { projects } from "@/lib/content";
import type { Project as ProjectType } from "@/lib/types";

const CARDS_PER_PAGE = 4;
const CARD_BASE =
  "rounded-xl border border-border/50 backdrop-blur-md dark:border-white/[0.08]";

/* ─── Simple collapsed card ─── */
function ProjectCard({
  project,
  onClick: onCardClick,
}: {
  project: ProjectType;
  onClick: (cardRect: DOMRect) => void;
}) {
  return (
    <motion.article
      className={`relative flex flex-col justify-end cursor-pointer ${CARD_BASE} bg-card/70 p-6 dark:bg-card/50 md:p-8`}
      style={{
        boxShadow:
          "0 0 0 1px hsl(var(--border)/0.35), 0 4px 16px -4px rgba(0,0,0,0.2), 0 2px 8px -2px rgba(0,0,0,0.1)",
      }}
      onClick={(e) => onCardClick(e.currentTarget.getBoundingClientRect())}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "tween", duration: 0.2 }}
    >
      <h2 className="font-display text-xl leading-none tracking-tight md:text-2xl">
        {project.title}
      </h2>
      <p className="font-architect mt-2 text-[0.65rem] uppercase tracking-wider text-muted-foreground">
        {project.year} · {project.subtitle}
      </p>
    </motion.article>
  );
}

/* ─── Flip overlay: animates size + position (no scale) ─── */
function FlipOverlay({
  project,
  cardTop,
  cardLeft,
  cardWidth,
  cardHeight,
  gridWidth,
  gridHeight,
  onClose,
}: {
  project: ProjectType;
  cardTop: number;
  cardLeft: number;
  cardWidth: number;
  cardHeight: number;
  gridWidth: number;
  gridHeight: number;
  onClose: () => void;
}) {
  const cardState = {
    top: cardTop,
    left: cardLeft,
    width: cardWidth,
    height: cardHeight,
  };

  return (
    <div
      className="absolute inset-0 z-50"
      style={{ perspective: 1400 }}
    >
      <motion.div
        className="absolute"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "50% 50%",
        }}
        initial={{ ...cardState, rotateY: 0, opacity: 1 }}
        animate={{
          top: 0,
          left: 0,
          width: gridWidth,
          height: gridHeight,
          rotateY: 180,
          opacity: 1,
        }}
        exit={{
          ...cardState,
          rotateY: 360,
          opacity: 1,
          transition: {
            type: "spring",
            damping: 26,
            stiffness: 90,
            mass: 1.2,
          },
        }}
        transition={{
          type: "spring",
          damping: 26,
          stiffness: 90,
          mass: 1.2,
        }}
      >
        {/* Front face – identical to collapsed card */}
        <div
          className={`absolute inset-0 flex flex-col justify-end ${CARD_BASE} bg-card/70 p-6 dark:bg-card/50 md:p-8`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            boxShadow:
              "0 0 0 1px hsl(var(--border)/0.35), 0 4px 16px -4px rgba(0,0,0,0.2), 0 2px 8px -2px rgba(0,0,0,0.1)",
          }}
        >
          <h2 className="font-display text-xl leading-none tracking-tight md:text-2xl">
            {project.title}
          </h2>
          <p className="font-architect mt-2 text-[0.65rem] uppercase tracking-wider text-muted-foreground">
            {project.year} · {project.subtitle}
          </p>
        </div>

        {/* Back face – fully solid, expanded content + close X */}
        <div
          className="absolute inset-0 flex flex-col overflow-y-auto rounded-xl border border-border/60 bg-background p-8 dark:border-white/[0.1] dark:bg-background md:p-10"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow:
              "0 0 0 1px hsl(var(--border)/0.3), 0 25px 60px -12px rgba(0,0,0,0.3), 0 12px 28px -8px rgba(0,0,0,0.2)",
          }}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/20 bg-foreground/[0.04] text-muted-foreground transition-colors hover:bg-foreground/[0.08] hover:text-foreground"
          >
            <X size={18} strokeWidth={2} />
          </button>
          <p className="font-architect mb-2 text-[0.65rem] uppercase tracking-wider text-muted-foreground">
            {project.year} · {project.subtitle.toUpperCase()}
          </p>
          <h3 className="font-display mb-5 text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
            {project.title}
          </h3>
          <p className="font-narrator mb-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.description}
          </p>
          {project.detail && (
            <p className="font-narrator mb-5 text-sm italic leading-relaxed text-muted-foreground/90 md:text-base">
              {project.detail}
            </p>
          )}
          <div className="mb-5 flex flex-wrap gap-2">
            {project.techStack.map((tag) => (
              <span
                key={tag}
                className="font-architect rounded-lg border border-foreground/20 bg-foreground/[0.04] px-2.5 py-1 text-[0.65rem] uppercase tracking-wider text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="font-architect mt-auto inline-flex w-fit items-center gap-2 border-b border-foreground/50 text-[0.65rem] uppercase tracking-wider text-foreground hover:border-foreground"
            >
              VIEW GITHUB
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Projects section ─── */
export function ProjectsSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<{
    project: ProjectType;
    cardTop: number;
    cardLeft: number;
    cardWidth: number;
    cardHeight: number;
    gridWidth: number;
    gridHeight: number;
  } | null>(null);
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(projects.length / CARDS_PER_PAGE);
  const startIdx = page * CARDS_PER_PAGE;
  const visibleProjects = projects.slice(startIdx, startIdx + CARDS_PER_PAGE);

  const handleClick = (project: ProjectType, cardRect: DOMRect) => {
    const grid = gridRef.current;
    if (!grid) return;
    const gr = grid.getBoundingClientRect();

    setHoveredProject({
      project,
      cardTop: cardRect.top - gr.top,
      cardLeft: cardRect.left - gr.left,
      cardWidth: cardRect.width,
      cardHeight: cardRect.height,
      gridWidth: gr.width,
      gridHeight: gr.height,
    });
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <p className="font-architect text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
            SELECTED PROJECTS
          </p>
          <p className="font-narrator mt-1 text-sm text-muted-foreground md:text-base">
            Click to expand
          </p>
        </header>

        <div className="flex items-center gap-4 md:gap-6">
          {totalPages > 1 && (
            <button
              type="button"
              onClick={() => {
                setPage((p) => Math.max(0, p - 1));
                setHoveredProject(null);
              }}
              disabled={page === 0}
              className="flex h-12 w-12 shrink-0 items-center justify-center self-center rounded-xl border border-foreground/25 bg-foreground/[0.03] text-foreground/70 transition-colors hover:bg-foreground/[0.08] hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              aria-label="Previous page"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          <div
            ref={gridRef}
            className="relative grid min-h-[480px] flex-1 grid-cols-2 grid-rows-2 gap-6 md:min-h-[560px] md:gap-8"
          >
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={(rect) => handleClick(project, rect)}
              />
            ))}

            <AnimatePresence>
              {hoveredProject && (
                <FlipOverlay
                  key={hoveredProject.project.id}
                  project={hoveredProject.project}
                  cardTop={hoveredProject.cardTop}
                  cardLeft={hoveredProject.cardLeft}
                  cardWidth={hoveredProject.cardWidth}
                  cardHeight={hoveredProject.cardHeight}
                  gridWidth={hoveredProject.gridWidth}
                  gridHeight={hoveredProject.gridHeight}
                  onClose={() => setHoveredProject(null)}
                />
              )}
            </AnimatePresence>
          </div>

          {totalPages > 1 && (
            <button
              type="button"
              onClick={() => {
                setPage((p) => Math.min(totalPages - 1, p + 1));
                setHoveredProject(null);
              }}
              disabled={page >= totalPages - 1}
              className="flex h-12 w-12 shrink-0 items-center justify-center self-center rounded-xl border border-foreground/25 bg-foreground/[0.03] text-foreground/70 transition-colors hover:bg-foreground/[0.08] hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              aria-label="Next page"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        {totalPages > 1 && (
          <p className="font-architect mt-4 text-center text-[0.65rem] uppercase tracking-wider text-muted-foreground">
            {page + 1} / {totalPages}
          </p>
        )}
      </div>
    </section>
  );
}
