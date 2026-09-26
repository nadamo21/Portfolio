"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Role } from "@/lib/profile";

const AXIS_START = { y: 2024, m: 1 };

const toIndex = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return (y - AXIS_START.y) * 12 + (m - AXIS_START.m);
};

type Props = { roles: Role[]; now: string };

export function ExperienceTimeline({ roles, now }: Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const total = toIndex(now) + 1;
  const years = Array.from({ length: Number(now.slice(0, 4)) - AXIS_START.y + 1 }, (_, i) => AXIS_START.y + i);
  const role = roles[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
      <div className="card min-w-0 p-4 sm:p-6">
        <div className="relative">
          {/* Year gridlines */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {years.map((y) => {
              const left = (toIndex(`${y}-01`) / total) * 100;
              return (
                <div key={y} className="absolute top-0 bottom-0 border-l border-dashed border-line" style={{ left: `${left}%` }}>
                  <span className="label-mono absolute -top-0.5 left-1.5 text-[0.62rem] text-muted">{y}</span>
                </div>
              );
            })}
            <div className="absolute top-0 bottom-0 border-l border-accent/60" style={{ left: "100%" }}>
              <span className="label-mono absolute -top-0.5 right-1.5 text-[0.62rem] text-accent-strong">Now</span>
            </div>
          </div>

          <ul className="relative space-y-2 pt-7" aria-label="Roles over time">
            {roles.map((r, i) => {
              const start = r.start ? toIndex(r.start) : 0;
              const end = r.end ? toIndex(r.end) + 1 : total;
              const left = (start / total) * 100;
              const width = ((end - start) / total) * 100;
              const selected = i === active;
              const color = r.kind === "analytics" ? "var(--accent)" : "var(--gold)";
              return (
                <li key={r.title}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-pressed={selected}
                    className={`block w-full rounded-xl px-2 py-2 text-left transition-colors ${selected ? "bg-surface-2" : "hover:bg-surface-2/60"}`}
                  >
                    <span className="flex items-baseline justify-between gap-3 text-sm">
                      <span className={`truncate font-medium ${selected ? "text-ink" : "text-muted"}`}>
                        {r.title} <span className="font-normal text-muted">· {r.org}</span>
                      </span>
                      <span className="hidden shrink-0 font-mono text-[0.7rem] text-muted sm:inline">{r.period}</span>
                    </span>
                    <span className="relative mt-2 block h-2.5 rounded-full bg-line/60">
                      <motion.span
                        className="absolute top-0 h-full rounded-full"
                        style={{
                          left: `${left}%`,
                          width: `${width}%`,
                          background: r.start ? color : `linear-gradient(90deg, transparent, ${color} 45%)`,
                          opacity: selected ? 1 : 0.55,
                          transformOrigin: "left",
                        }}
                        initial={reduce ? false : { scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-5 flex flex-wrap gap-5 border-t border-line px-2 pt-4 text-xs text-muted">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-5 rounded-full bg-accent" aria-hidden /> Analytics & data
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-5 rounded-full bg-gold" aria-hidden /> Teaching & coaching
          </span>
          <span>Faded start = start date not listed</span>
        </div>
      </div>

      <div aria-live="polite" className="min-w-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={role.title}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="h-full"
          >
            <p className="label-mono text-accent-strong">{role.period}</p>
            <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{role.title}</h3>
            <p className="mt-1 text-lg text-muted">{role.org}</p>
            <ul className="mt-6 space-y-3">
              {role.points.map((p) => (
                <li key={p} className="flex gap-3 text-pretty">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {role.tags.map((t) => (
                <span key={t} className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-xs text-muted">
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
