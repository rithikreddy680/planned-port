"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { projects } from "@/lib/content";
import type { Project as ProjectType } from "@/lib/types";

const SWIPE_VARIANTS = {
  enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0.2 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -120 : 120, opacity: 0.2 }),
};

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
      className={`relative flex min-w-0 flex-col justify-end overflow-hidden cursor-pointer ${CARD_BASE} bg-card/70 p-4 dark:bg-card/50 sm:p-5 sm:min-h-[140px] md:p-6 md:min-h-[160px] lg:p-7 lg:min-h-[180px]`}
      style={{
        boxShadow:
          "0 0 0 1px hsl(var(--border)/0.35), 0 4px 16px -4px rgba(0,0,0,0.2), 0 2px 8px -2px rgba(0,0,0,0.1)",
      }}
      onClick={(e) => onCardClick(e.currentTarget.getBoundingClientRect())}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "tween", duration: 0.2 }}
    >
      <h2 className="font-display break-words text-[clamp(1rem,3.2vw,1.5rem)] leading-[1.15] tracking-tight sm:text-xl md:text-2xl">
        {project.title}
      </h2>
      <p className="font-architect mt-1.5 truncate text-[clamp(0.5rem,1.8vw,0.65rem)] uppercase tracking-wider text-muted-foreground">
        {project.year} · {project.subtitle}
      </p>
    </motion.article>
  );
}

/* ─── Flip overlay: animates size + position (no scale) ─── */
function FlipOverlay({
  project,
  swipeDirection,
  cardTop,
  cardLeft,
  cardWidth,
  cardHeight,
  gridWidth,
  gridHeight,
  onClose,
}: {
  project: ProjectType;
  swipeDirection: number;
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
    <>
      {/* Backdrop: tap outside to close (mobile only) */}
      <div
        className="fixed inset-0 z-[50] pointer-events-auto sm:pointer-events-none"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[55]"
        style={{ perspective: 1400 }}
        onClick={(e) => e.stopPropagation()}
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
          className={`absolute inset-0 flex flex-col justify-end ${CARD_BASE} bg-card/70 p-4 dark:bg-card/50 sm:p-6 md:p-8`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            boxShadow:
              "0 0 0 1px hsl(var(--border)/0.35), 0 4px 16px -4px rgba(0,0,0,0.2), 0 2px 8px -2px rgba(0,0,0,0.1)",
          }}
        >
          <h2 className="font-display text-[clamp(1rem,3vw,1.5rem)] leading-none tracking-tight md:text-2xl">
            {project.title}
          </h2>
          <p className="font-architect mt-2 text-[clamp(0.55rem,1.6vw,0.65rem)] uppercase tracking-wider text-muted-foreground">
            {project.year} · {project.subtitle}
          </p>
        </div>

        {/* Back face – fully solid, expanded content + close X */}
        <div
          className="absolute inset-0 flex flex-col overflow-y-auto overflow-x-hidden rounded-xl border border-border/60 bg-background p-4 dark:border-white/[0.1] dark:bg-background sm:p-6 md:p-8 lg:p-10"
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
            className="absolute right-3 top-3 z-10 hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-foreground/20 bg-foreground/[0.06] text-muted-foreground transition-colors hover:bg-foreground/[0.08] hover:text-foreground active:scale-95 sm:right-4 sm:top-4 sm:flex sm:h-9 sm:w-9"
          >
            <X size={20} strokeWidth={2} className="sm:w-[18px] sm:h-[18px]" />
          </button>
          <AnimatePresence initial={false} mode="wait" custom={swipeDirection}>
            <motion.div
              key={project.id}
              custom={swipeDirection}
              variants={SWIPE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-1 min-w-0 flex-col"
            >
          <p className="font-architect mb-2 text-[clamp(0.55rem,1.6vw,0.65rem)] uppercase tracking-wider text-muted-foreground">
            {project.year} · {project.subtitle.toUpperCase()}
          </p>
          <h3 className="font-display mb-3 break-words text-[clamp(1.1rem,3.2vw,1.875rem)] font-semibold leading-tight tracking-tight sm:mb-4 md:mb-5 md:text-2xl lg:text-3xl">
            {project.title}
          </h3>
          <p className="font-narrator mb-3 break-words text-[clamp(0.8rem,2.2vw,1rem)] leading-relaxed text-muted-foreground sm:mb-4 md:mb-5 md:text-base">
            {project.description}
          </p>
          {project.detail && (
            <p className="font-narrator mb-4 text-[clamp(0.8rem,2.2vw,1rem)] italic leading-relaxed text-muted-foreground/90 sm:mb-5 md:text-base">
              {project.detail}
            </p>
          )}
          <div className="mb-5 flex flex-wrap gap-2">
            {project.techStack.map((tag) => (
              <span
                key={tag}
                className="font-architect rounded-lg border border-foreground/20 bg-foreground/[0.04] px-2 py-0.5 text-[clamp(0.55rem,1.5vw,0.65rem)] uppercase tracking-wider text-muted-foreground sm:px-2.5 sm:py-1"
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
              className="font-architect mt-auto inline-flex w-fit items-center gap-2 border-b border-foreground/50 text-[clamp(0.55rem,1.5vw,0.65rem)] uppercase tracking-wider text-foreground hover:border-foreground"
            >
              VIEW GITHUB
            </a>
          )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
    </>
  );
}

/* ─── Projects section ─── */
export function ProjectsSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<{
    project: ProjectType;
    swipeDirection: number;
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

  const goToAdjacentProject = useCallback((delta: number) => {
    if (!hoveredProject) return;
    const idx = projects.findIndex((p) => p.id === hoveredProject.project.id);
    if (idx < 0) return;
    const nextIdx = idx + delta;
    if (nextIdx < 0 || nextIdx >= projects.length) return;
    const nextProject = projects[nextIdx]!;
    const newPage = Math.floor(nextIdx / CARDS_PER_PAGE);
    setPage(newPage);
    setHoveredProject({
      ...hoveredProject,
      project: nextProject,
      swipeDirection: delta,
    });
  }, [hoveredProject]);

  const handleClick = (project: ProjectType, cardRect: DOMRect) => {
    const grid = gridRef.current;
    if (!grid) return;
    const gr = grid.getBoundingClientRect();

    setHoveredProject({
      project,
      swipeDirection: 0,
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
      className="relative min-h-screen min-h-[100dvh] px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-24 xl:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 sm:mb-8 md:mb-10">
          <p className="font-architect text-[clamp(0.6rem,1.8vw,0.7rem)] uppercase tracking-[0.2em] text-muted-foreground">
            SELECTED PROJECTS
          </p>
          <p className="font-narrator mt-1 text-[clamp(0.75rem,2vw,1rem)] text-muted-foreground">
            Click to expand
          </p>
        </header>

        <div className="flex items-center gap-4 md:gap-6">
          {(totalPages > 1 || hoveredProject) && projects.length > 1 && (
            <button
              type="button"
              onClick={() => {
                if (hoveredProject) {
                  goToAdjacentProject(-1);
                } else {
                  setPage((p) => Math.max(0, p - 1));
                }
              }}
              disabled={hoveredProject ? projects.findIndex((p) => p.id === hoveredProject.project.id) <= 0 : page === 0}
              className="flex h-12 w-12 shrink-0 items-center justify-center self-center rounded-xl border border-foreground/25 bg-foreground/[0.03] text-foreground/70 transition-colors hover:bg-foreground/[0.08] hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              aria-label={hoveredProject ? "Previous project" : "Previous page"}
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
            className={`relative min-h-[320px] flex-1 sm:min-h-[420px] md:min-h-[480px] lg:min-h-[520px] ${
              visibleProjects.length < CARDS_PER_PAGE
                ? "flex items-center justify-center"
                : "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:gap-6"
            }`}
          >
            {visibleProjects.length < CARDS_PER_PAGE ? (
              /* Partial page: same grid structure & card sizes as full page */
              <div
                className="grid w-full max-w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:gap-6"
              >
                {visibleProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={(rect) => handleClick(project, rect)}
                  />
                ))}
              </div>
            ) : (
              /* Full page: standard 4-slot grid */
              <>
                {Array.from({ length: CARDS_PER_PAGE }, (_, i) => {
                  const project = visibleProjects[i] ?? null;
                  return project ? (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onClick={(rect) => handleClick(project, rect)}
                    />
                  ) : (
                    <div
                      key={`placeholder-${i}`}
                      className="min-h-[120px] rounded-xl sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px]"
                      aria-hidden
                    />
                  );
                })}
              </>
            )}

            <AnimatePresence>
              {hoveredProject && (
                <FlipOverlay
                  key="project-overlay"
                  project={hoveredProject.project}
                  swipeDirection={hoveredProject.swipeDirection}
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

          {(totalPages > 1 || hoveredProject) && projects.length > 1 && (
            <button
              type="button"
              onClick={() => {
                if (hoveredProject) {
                  goToAdjacentProject(1);
                } else {
                  setPage((p) => Math.min(totalPages - 1, p + 1));
                }
              }}
              disabled={hoveredProject ? projects.findIndex((p) => p.id === hoveredProject.project.id) >= projects.length - 1 : page >= totalPages - 1}
              className="flex h-12 w-12 shrink-0 items-center justify-center self-center rounded-xl border border-foreground/25 bg-foreground/[0.03] text-foreground/70 transition-colors hover:bg-foreground/[0.08] hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              aria-label={hoveredProject ? "Next project" : "Next page"}
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
          <p className="font-architect mt-3 sm:mt-4 text-center text-[clamp(0.55rem,1.6vw,0.65rem)] uppercase tracking-wider text-muted-foreground">
            {page + 1} / {totalPages}
          </p>
        )}
      </div>
    </section>
  );
}
