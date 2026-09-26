import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCaseStudy } from "@/lib/work";

type Principle = { title: string; body: string; caseSlug: string; glyph: React.ReactNode };

const bar = (w: string, cls: string) => <span className={`block h-2 rounded-full ${cls}`} style={{ width: w }} />;

const principles: Principle[] = [
  {
    title: "A KPI is a definition before it's a number",
    body: "“Spending rate” can mean three different things in three meetings. I pin down the numerator, denominator and time window in DAX first, so every visual — and every stakeholder — agrees.",
    caseSlug: "loyalty-rewards-analytics",
    glyph: (
      <span className="flex flex-col items-center font-mono text-xs leading-tight text-accent-strong">
        <span>spent</span>
        <span className="my-1 h-px w-12 bg-current" />
        <span>earned</span>
      </span>
    ),
  },
  {
    title: "Segment before you average",
    body: "An average across all members hides the story. Splitting earners from spenders, tiers from tiers, channels from channels is usually where the real question starts.",
    caseSlug: "restaurant-group-loyalty",
    glyph: (
      <span className="flex w-20 flex-col gap-1.5">
        {bar("100%", "bg-line-strong")}
        {bar("62%", "bg-accent/70")}
        {bar("28%", "bg-gold")}
      </span>
    ),
  },
  {
    title: "Points are a liability, not just a metric",
    body: "In loyalty programmes, unspent points are value owed to customers. Balance, redemption and breakage belong on the same page as engagement.",
    caseSlug: "restaurant-group-loyalty",
    glyph: (
      <svg viewBox="0 0 60 34" className="w-16" aria-hidden>
        <path d="M5 30 A25 25 0 0 1 55 30" fill="none" stroke="var(--line-strong)" strokeWidth="6" strokeLinecap="round" />
        <path d="M5 30 A25 25 0 0 1 44 12" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Compare like with like",
    body: "A total without a baseline says little. Same period last year, before vs after a relaunch, day for day on a shared calendar — the comparison is the insight.",
    caseSlug: "call-center-yoy",
    glyph: (
      <svg viewBox="0 0 64 30" className="w-16" aria-hidden>
        <polyline points="2,24 14,18 26,21 38,12 50,15 62,6" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        <polyline points="2,26 14,23 26,25 38,19 50,22 62,16" fill="none" stroke="var(--line-strong)" strokeWidth="2" strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    title: "Privacy is part of the design",
    body: "Names, phone numbers and IDs are masked at load time, not hidden in a visual. Reports stay drill-able without exposing the people behind the rows.",
    caseSlug: "raffle-campaign-monitoring",
    glyph: <span className="font-mono text-sm tracking-wider text-accent-strong">01XXXXXXXXX</span>,
  },
  {
    title: "Design for the reader's language",
    body: "A team that works in Arabic should get a report that reads right-to-left end to end — navigation, KPI order, axes and tables — not a translated left-to-right layout.",
    caseSlug: "arabic-truck-sales",
    glyph: (
      <span className="font-arabic text-lg text-accent-strong" lang="ar" dir="rtl">
        ← تحليل
      </span>
    ),
  },
];

export function Thinking() {
  return (
    <section aria-labelledby="thinking-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="04"
          label="How I think about data"
          title={<span id="thinking-title">Charts are the last step. These come first.</span>}
          lead="A few principles that shape every report I build — each one visible in the case studies above."
        />
        <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => {
            const c = getCaseStudy(p.caseSlug);
            return (
              <li key={p.title} className="group bg-bg">
                <Reveal delay={(i % 3) * 0.06} className="flex h-full flex-col p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="label-mono tabular text-muted">0{i + 1}</span>
                    <span className="flex h-10 items-center transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden>
                      {p.glyph}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-balance">{p.title}</h3>
                  <p className="mt-3 text-pretty text-muted">{p.body}</p>
                  {c ? (
                    <Link href={`/work/${c.slug}`} className="mt-auto pt-6 text-sm font-medium text-accent-strong hover:underline">
                      Seen in: {c.title} →
                    </Link>
                  ) : null}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
