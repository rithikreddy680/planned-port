"use client";

import { useRef, useState } from "react";
import { experiences } from "@/lib/content";

const KNOWBAL_HEADLINE = "CRM Optimization & Automation";
const KNOWBAL_METRICS = "Reduced manual admin overhead via automated email triggers.";
const KNOWBAL_TECH = ["Smart Document Checklists", "Applicant Eligibility Checker"];

export function NarrativeSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    const el = cardsRef.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="experience"
      className="relative min-h-screen px-6 py-16 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        {/* Left: Controller – sticky list */}
        <aside className="relative">
          <div className="sticky top-28 space-y-1">
            <p className="font-architect mb-6 text-[0.7rem] text-muted-foreground">
              COMMAND CENTER
            </p>
            {experiences.map((exp, index) => {
              const year = exp.period.split("–")[0].trim().split(" ").pop();
              const isActive = activeIndex === index;
              return (
                <button
                  key={exp.company}
                  type="button"
                  onClick={() => scrollToCard(index)}
                  className={`flex w-full items-center gap-4 py-4 text-left transition-opacity ${
                    isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <span
                    className={`h-px flex-shrink-0 transition-all ${
                      isActive ? "w-12 bg-foreground shadow-[0_0_12px_rgba(250,250,250,0.5)]" : "w-8 bg-muted-foreground/50"
                    }`}
                  />
                  <span className="font-architect text-[0.7rem]">
                    {year}: {exp.company} · {exp.role}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right: Display – scrollable cards with snap */}
        <div className="max-h-[80vh] overflow-y-auto snap-y snap-mandatory scroll-smooth md:max-h-[70vh]">
          {experiences.map((exp, index) => (
            <article
              key={exp.company}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="snap-start border border-border/60 bg-card/80 min-h-[60vh] px-6 py-8 md:min-h-[55vh] md:px-8 md:py-10"
            >
              <p className="font-architect mb-3 text-[0.7rem] text-muted-foreground">
                {exp.company.toUpperCase()} · {exp.role.toUpperCase()} · {exp.period.toUpperCase()}
              </p>
              <h2 className="font-display mb-4 text-xl leading-none md:text-2xl tracking-tight">
                {index === 0
                  ? KNOWBAL_HEADLINE
                  : index === 1
                    ? "Led software team · Mentored developers"
                    : "Bachelor of Software Engineering (Honours), Monash University"}
              </h2>
              {index === 0 && (
                <>
                  <p className="font-narrator mb-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {KNOWBAL_METRICS}
                  </p>
                  <ul className="font-narrator space-y-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {KNOWBAL_TECH.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="h-px w-4 shrink-0 bg-muted-foreground/50 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {index !== 0 && (
                <ul className="font-narrator space-y-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {exp.achievements.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-px w-4 shrink-0 bg-muted-foreground/50" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
