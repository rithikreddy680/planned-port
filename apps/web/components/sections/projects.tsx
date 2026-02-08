"use client";

import { useState, useRef, useEffect } from "react";
import { projects } from "@/lib/content";
import type { Project as ProjectType } from "@/lib/types";

function ProjectCard({
  project,
  onOpen
}: {
  project: ProjectType;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [hovered]);

  return (
    <article
      className="group relative flex min-h-[200px] flex-col justify-end overflow-hidden border border-border/60 bg-card/70 p-6 transition-transform hover:scale-[1.02] md:min-h-[240px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      {/* Background video (muted), plays on hover */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20">
        <video
          ref={videoRef}
          src={project.mediaSrc}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
      <div className="relative">
        <h2 className="font-display text-xl leading-none tracking-tight md:text-2xl">
          {project.title}
        </h2>
        <p className="font-architect mt-1 text-[0.7rem] text-muted-foreground">
          {project.year}
        </p>
      </div>
    </article>
  );
}

function ProjectModal({
  project,
  onClose
}: {
  project: ProjectType;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border/60 bg-card p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id="modal-title" className="font-display text-2xl leading-none tracking-tight md:text-3xl">
              {project.title} — {project.subtitle}
            </h2>
            <p className="font-architect mt-2 text-[0.7rem] text-muted-foreground">
              {project.year}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-architect text-[0.7rem] text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            CLOSE
          </button>
        </div>
        <p className="font-narrator mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
          {project.description}
        </p>
        {project.detail && (
          <p className="font-narrator mb-6 text-sm italic leading-relaxed text-muted-foreground md:text-base">
            {project.detail}
          </p>
        )}
        <div className="mb-6 flex flex-wrap gap-2">
          {project.techStack.map((tag) => (
            <span
              key={tag}
              className="font-architect rounded-sm border border-border/60 bg-background/60 px-2 py-1 text-[0.7rem] text-muted-foreground"
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
            className="font-architect inline-flex items-center gap-2 border-b border-foreground/60 text-[0.7rem] text-foreground hover:border-foreground"
          >
            VIEW GITHUB
          </a>
        )}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [modalProject, setModalProject] = useState<ProjectType | null>(null);

  return (
    <section
      id="projects"
      className="relative min-h-screen px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <p className="font-architect text-[0.7rem] text-muted-foreground">
            SELECTED PROJECTS
          </p>
          <p className="font-narrator mt-1 text-sm text-muted-foreground md:text-base">
            3×2 grid · hover to preview · click for details
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => setModalProject(project)}
            />
          ))}
        </div>
      </div>

      {modalProject && (
        <ProjectModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
    </section>
  );
}
