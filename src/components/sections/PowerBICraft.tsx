"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type Step = {
  key: string;
  tool: string;
  title: string;
  body: string;
  points: string[];
  artifact: ReactNode;
};

function Code({ lang, children }: { lang: string; children: string }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-[#0d1117] text-[#d6dde8]">
      <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="label-mono text-[0.65rem] text-[#8b96a8]">{lang}</span>
        <span className="label-mono text-[0.65rem] text-[#8b96a8]">Illustrative</span>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[0.76rem] leading-relaxed sm:text-[0.8rem]">
        <code>{children}</code>
      </pre>
    </figure>
  );
}

function StarSchema() {
  const dims = [
    { x: 40, y: 34, label: "DimMember" },
    { x: 330, y: 34, label: "DimProduct" },
    { x: 40, y: 206, label: "DimDate" },
    { x: 330, y: 206, label: "DimPartner" },
  ];
  return (
    <figure className="rounded-xl border border-line bg-surface-2 p-3">
      <svg viewBox="0 0 470 260" className="h-auto w-full" role="img" aria-label="Star schema: two fact tables linked to member, product, date and partner dimensions">
        {dims.map((d) => (
          <g key={d.label}>
            <line x1={d.x + 50} y1={d.y + 18} x2={235} y2={130} stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="4 4" />
          </g>
        ))}
        {dims.map((d) => (
          <g key={`${d.label}-box`}>
            <rect x={d.x} y={d.y} width="100" height="36" rx="8" fill="var(--surface)" stroke="var(--line-strong)" />
            <text x={d.x + 50} y={d.y + 22} textAnchor="middle" fontSize="12" fill="var(--ink)" fontFamily="var(--font-jetbrains)">
              {d.label}
            </text>
          </g>
        ))}
        <rect x="160" y="96" width="150" height="68" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" />
        <text x="235" y="124" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="var(--accent-strong)" fontFamily="var(--font-jetbrains)">
          FactEarning
        </text>
        <text x="235" y="146" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="var(--accent-strong)" fontFamily="var(--font-jetbrains)">
          FactSpending
        </text>
      </svg>
      <figcaption className="px-1 pt-2 text-xs text-muted">
        Shared dimensions mean one slicer filters earning and spending together.
      </figcaption>
    </figure>
  );
}

function Wireframe() {
  return (
    <figure className="rounded-xl border border-line bg-surface-2 p-4">
      <div className="space-y-2.5" aria-hidden>
        <div className="flex items-center gap-2 rounded-md bg-accent px-3 py-2">
          <span className="size-3 rounded-full bg-white/90" />
          <span className="h-2 w-20 rounded bg-white/80" />
          <span className="ml-auto flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`h-3 w-10 rounded ${i === 1 ? "bg-transparent ring-1 ring-white/70" : "bg-white/85"}`} />
            ))}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-md border border-line bg-surface p-2">
              <span className="block h-3 w-10 rounded bg-accent/70" />
              <span className="mt-1.5 block h-1.5 w-14 rounded bg-line-strong" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[1.6fr_1fr] gap-2">
          <div className="flex h-24 items-end gap-1.5 rounded-md border border-line bg-surface p-2">
            {[40, 65, 50, 80, 60, 90, 72].map((h, i) => (
              <span key={i} className="flex-1 rounded-t bg-accent/60" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex items-center justify-center rounded-md border border-line bg-surface">
            <span className="size-14 rounded-full border-[7px] border-accent/70 border-r-gold" />
          </div>
        </div>
      </div>
      <figcaption className="pt-3 text-xs text-muted">
        Navigation → KPI band → trend and breakdown → detail table. Every page reads in the same order.
      </figcaption>
    </figure>
  );
}

const steps: Step[] = [
  {
    key: "extract",
    tool: "SQL",
    title: "Extract only what the question needs",
    body: "Reports get fast and trustworthy long before the first visual — by pulling clean, well-typed rows at the right grain.",
    points: ["Filter to the reporting window at the source", "Aggregate where detail isn't needed", "Keep keys consistent across tables"],
    artifact: (
      <Code lang="SQL">{`SELECT  t.trans_id,
        t.member_id,
        t.partner_id,
        t.product_id,
        t.points,
        CAST(t.created_at AS date) AS trans_date
FROM    earning_transactions AS t
WHERE   t.created_at >= DATEADD(day, -1, CAST(GETDATE() AS date))
  AND   t.created_at <  CAST(GETDATE() AS date);`}</Code>
    ),
  },
  {
    key: "shape",
    tool: "Power Query",
    title: "Shape and protect the data",
    body: "Cleaning, typing and reshaping happen in Power Query so the model receives tidy tables — and personal fields are masked before anyone sees a report.",
    points: ["Type columns and remove noise", "Unify sources (e.g. code-use vs manual awards)", "Mask personal fields at load time"],
    artifact: (
      <Code lang="Power Query · M">{`let
    Source  = Sql.Database(Server, Db),
    Members = Source{[Name = "members"]}[Data],
    Typed   = Table.TransformColumnTypes(Members,
                {{"joined_at", type date}, {"points", type number}}),
    Masked  = Table.TransformColumns(Typed,
                {{"contact_no", each Text.Start(_, 2) & "XXXXXXXXX", type text}})
in
    Masked`}</Code>
    ),
  },
  {
    key: "model",
    tool: "Data model",
    title: "Model it as a star",
    body: "Facts in the middle, shared dimensions around them. It's what lets a single Partner or Date slicer filter every page consistently.",
    points: ["Star schema with conformed dimensions", "One-to-many, single-direction relationships", "A proper date table for time intelligence"],
    artifact: <StarSchema />,
  },
  {
    key: "measure",
    tool: "DAX",
    title: "Define every KPI once",
    body: "A KPI is a definition before it's a number. Measures carry the business logic — rates, averages, comparisons — so every visual agrees.",
    points: ["Ratios with safe division", "Per-user and per-transaction averages", "Period-over-period comparisons"],
    artifact: (
      <Code lang="DAX">{`Spending Rate =
DIVIDE ( [Spent Value], [Earned Value] )

Avg Value per Scan =
DIVIDE ( [Earned Value], [Scanned Codes] )

Spent Value LY =
CALCULATE ( [Spent Value], SAMEPERIODLASTYEAR ( 'Date'[Date] ) )`}</Code>
    ),
  },
  {
    key: "design",
    tool: "Report design",
    title: "Design for the person reading it",
    body: "Pages are split by audience, not by data source. Navigation, KPI order and colour stay consistent — including fully right-to-left Arabic reports.",
    points: ["One page per audience and question", "KPI band first, detail last", "RTL layouts for Arabic-speaking teams"],
    artifact: <Wireframe />,
  },
];

export function PowerBICraft() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const baseId = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const step = steps[active];

  const onKey = (e: KeyboardEvent) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + steps.length) % steps.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,19rem)_1fr] lg:gap-12">
      <div role="tablist" aria-label="How a report gets built" aria-orientation="vertical" onKeyDown={onKey} className="relative flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {steps.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.key}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`group relative flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors lg:py-4 ${
                selected ? "border-accent/50 bg-surface shadow-card" : "border-transparent hover:bg-surface/70"
              }`}
            >
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-xs tabular transition-colors ${
                  selected ? "bg-accent text-bg" : "bg-surface-2 text-muted group-hover:text-ink"
                }`}
              >
                {i + 1}
              </span>
              <span>
                <span className={`block text-sm font-semibold whitespace-nowrap ${selected ? "text-ink" : "text-muted"}`}>{s.tool}</span>
                <span className="hidden text-xs text-muted lg:block">{s.title}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${active}`} className="card min-w-0 p-5 sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.key}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid gap-8 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)]"
          >
            <div>
              <p className="label-mono text-accent-strong">
                Step {active + 1} / {steps.length} · {step.tool}
              </p>
              <h3 className="mt-3 text-2xl font-semibold sm:text-[1.7rem]">{step.title}</h3>
              <p className="mt-4 text-pretty text-muted">{step.body}</p>
              <ul className="mt-6 space-y-2.5">
                {step.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0">{step.artifact}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
