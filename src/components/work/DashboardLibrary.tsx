"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, Expand, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Dashboard, Domain } from "@/lib/work";
import { DashboardFrame } from "./DashboardFrame";

export type LibraryItem = Dashboard & { html: string; caseSlug?: string; caseTitle?: string };

type Props = { items: LibraryItem[]; domainLabels: Record<Domain, string> };

const PREVIEW_COUNT = 6;

export function DashboardLibrary({ items, domainLabels }: Props) {
  const [filter, setFilter] = useState<Domain | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();

  const visible = useMemo(() => (filter === "all" ? items : items.filter((d) => d.domain === filter)), [filter, items]);
  const counts = useMemo(() => {
    const c: Partial<Record<Domain, number>> = {};
    for (const d of items) c[d.domain] = (c[d.domain] ?? 0) + 1;
    return c;
  }, [items]);

  const open = (i: number) => {
    setOpenIndex(i);
    dialog.current?.showModal();
  };
  const close = useCallback(() => dialog.current?.close(), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => setOpenIndex(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    el.addEventListener("close", onClose);
    el.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("close", onClose);
      el.removeEventListener("keydown", onKey);
    };
  }, [step]);

  const collapsed = filter === "all" && !expanded && visible.length > PREVIEW_COUNT;
  const shown = collapsed ? visible.slice(0, PREVIEW_COUNT) : visible;
  const current = openIndex === null ? null : visible[openIndex];
  const filters: (Domain | "all")[] = ["all", ...(Object.keys(domainLabels) as Domain[]).filter((d) => counts[d])];

  return (
    <div>
      <div role="group" aria-label="Filter dashboards by domain" className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => {
          const on = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f)}
              className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
                on ? "border-ink bg-ink text-bg" : "border-line bg-surface text-muted hover:border-line-strong hover:text-ink"
              }`}
            >
              {f === "all" ? "All reports" : domainLabels[f]}
              <span className={`tabular text-xs ${on ? "opacity-70" : "opacity-60"}`}>{f === "all" ? items.length : counts[f]}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} dashboards
      </p>

      <motion.ul layout={!reduce} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((d, i) => (
            <motion.li
              key={d.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <button
                type="button"
                onClick={() => open(i)}
                className="group card flex h-full w-full flex-col overflow-hidden text-left transition-[box-shadow,border-color] hover:border-line-strong hover:shadow-[0_20px_48px_-24px_rgba(0,0,0,.3)]"
                aria-label={`Open ${d.title}`}
              >
                <div className="relative border-b border-line bg-surface-2 p-2.5" style={{ ["--c" as string]: d.color }}>
                  <div className="overflow-hidden rounded-md">
                    <DashboardFrame html={d.html} label="" cropRatio={0.6} className="transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <span className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand size={14} aria-hidden />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="label-mono flex items-center gap-2 text-[0.65rem] text-muted">
                    <span className="size-2 rounded-full" style={{ background: d.color }} aria-hidden />
                    {domainLabels[d.domain]}
                    {d.rtl ? <span className="rounded bg-surface-2 px-1.5 py-0.5">RTL</span> : null}
                  </p>
                  <h4 className="mt-2 font-display text-lg leading-snug font-semibold">{d.title}</h4>
                  <p className="mt-auto pt-3 font-mono text-xs text-muted">{d.tools.join(" · ")}</p>
                </div>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {collapsed ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong bg-surface px-6 text-sm font-medium transition-colors hover:border-accent hover:text-accent-strong"
          >
            Show all {visible.length} reports
            <ChevronDown size={16} aria-hidden />
          </button>
        </div>
      ) : null}

      <dialog
        ref={dialog}
        aria-labelledby="viewer-title"
        className="m-auto h-[100dvh] max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm sm:h-auto sm:max-h-[92dvh] sm:w-[min(72rem,94vw)] sm:rounded-3xl"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {current ? (
          <div className="flex h-full flex-col overflow-hidden bg-surface text-ink sm:max-h-[92dvh] sm:rounded-3xl">
            <div className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-6">
              <p className="label-mono tabular text-muted">
                {String(openIndex! + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}
              </p>
              <div className="ml-auto flex gap-2">
                <button type="button" onClick={() => step(-1)} className="flex size-10 items-center justify-center rounded-full border border-line hover:border-accent" aria-label="Previous dashboard">
                  <ArrowLeft size={17} aria-hidden />
                </button>
                <button type="button" onClick={() => step(1)} className="flex size-10 items-center justify-center rounded-full border border-line hover:border-accent" aria-label="Next dashboard">
                  <ArrowRight size={17} aria-hidden />
                </button>
                <button type="button" onClick={close} className="flex size-10 items-center justify-center rounded-full bg-ink text-bg" aria-label="Close viewer" autoFocus>
                  <X size={17} aria-hidden />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto overscroll-contain">
              <div className="bg-surface-2 p-3 sm:p-6">
                <DashboardFrame key={current.id} html={current.html} label={`${current.title} — dashboard recreation with dummy data`} />
              </div>
              <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[1.4fr_1fr]">
                <div>
                  <h3 id="viewer-title" className="text-2xl font-semibold">
                    {current.title}
                  </h3>
                  <p className="mt-3 text-pretty text-muted">{current.summary}</p>
                </div>
                <div className="space-y-4">
                  <p className="font-mono text-sm">{current.tools.join(" · ")}</p>
                  {current.caseSlug ? (
                    <Link href={`/work/${current.caseSlug}`} onClick={close} className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong hover:underline">
                      Part of: {current.caseTitle}
                      <ArrowUpRight size={15} aria-hidden />
                    </Link>
                  ) : null}
                  <p className="text-xs text-muted">Recreated with dummy data. Use ← → to browse.</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
