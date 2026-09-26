import { ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CasePreview } from "@/components/work/CasePreview";
import { caseStudies, domains, type CaseStudy } from "@/lib/work";

function CaseLink({ c, children }: { c: CaseStudy; children: React.ReactNode }) {
  // The title link stretches over the whole card, so the card is one click target
  // but screen readers hear a single, well-named link.
  return (
    <Link href={`/work/${c.slug}`} className="after:absolute after:inset-0 after:rounded-[1.25rem] focus-visible:outline-none">
      {children}
    </Link>
  );
}

function FeaturedLead({ c }: { c: CaseStudy }) {
  return (
    <article className="card group relative grid gap-8 p-4 transition-shadow focus-within:ring-2 focus-within:ring-accent hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,.25)] sm:p-6 lg:grid-cols-[1.35fr_1fr] lg:gap-10 lg:p-8">
      <CasePreview ids={c.dashboards} />
      <div className="flex flex-col px-1 pb-2 lg:py-2">
        <p className="label-mono text-accent-strong">
          Case study 01 · {domains[c.domain]}
        </p>
        <h3 className="mt-3 text-[clamp(1.6rem,3vw,2.2rem)] font-semibold">
          <CaseLink c={c}>{c.title}</CaseLink>
        </h3>
        <p className="mt-2 text-sm text-muted">{c.kicker}</p>
        <p className="mt-5 text-pretty">{c.teaser}</p>
        <div className="mt-6 space-y-2 border-l-2 border-accent/40 pl-4">
          <p className="label-mono text-muted">Questions it answers</p>
          {c.questions.slice(0, 3).map((q) => (
            <p key={q} className="text-sm text-muted">
              {q}
            </p>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {c.tools.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-accent-strong">
          Read the case study
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </article>
  );
}

function FeaturedCard({ c, n }: { c: CaseStudy; n: number }) {
  return (
    <article className="card group relative flex flex-col p-4 transition-shadow focus-within:ring-2 focus-within:ring-accent hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,.25)] sm:p-6">
      <CasePreview ids={c.dashboards} crop={0.58} pages={false} />
      <div className="flex flex-1 flex-col px-1 pt-6">
        <p className="label-mono text-accent-strong">
          Case study 0{n} · {domains[c.domain]}
        </p>
        <h3 className="mt-3 text-2xl font-semibold">
          <CaseLink c={c}>{c.title}</CaseLink>
        </h3>
        <p className="mt-3 text-pretty text-muted">{c.teaser}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {c.tools.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-accent-strong">
          Read the case study
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </article>
  );
}

export function Work() {
  const featured = caseStudies.filter((c) => c.featured);
  const more = caseStudies.filter((c) => !c.featured);
  const [lead, ...rest] = featured;

  return (
    <section id="work" aria-labelledby="work-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="02"
          label="Selected work"
          align="split"
          title={<span id="work-title">Case studies, not just screenshots.</span>}
          lead="Each project starts with a business question and ends with a report someone checks every day. Here's the problem, the approach, and what each report lets its users answer."
        />

        <Reveal>
          <FeaturedLead c={lead} />
        </Reveal>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08} className="flex">
              <FeaturedCard c={c} n={i + 2} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <h3 className="label-mono mb-4 text-muted">More case studies</h3>
          <ul className="divide-y divide-line border-y border-line">
            {more.map((c, i) => (
              <li key={c.slug}>
                <Link
                  href={`/work/${c.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 transition-colors hover:bg-surface/70 sm:gap-8 sm:px-3"
                >
                  <span className="label-mono tabular text-muted">0{i + featured.length + 1}</span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg font-semibold transition-colors group-hover:text-accent-strong sm:text-xl">
                      {c.title}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-muted">{c.kicker}</span>
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="hidden md:inline">
                      <Chip tone="accent">{domains[c.domain]}</Chip>
                    </span>
                    <ArrowUpRight size={20} className="text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-strong" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-10 flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold-soft p-5 text-sm">
          <Lock size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden />
          <p className="text-pretty text-muted">
            <span className="font-semibold text-ink">A note on confidentiality.</span> The dashboards here are faithful
            recreations of real deliverables with every name, ID, phone number, brand and figure replaced by dummy
            values. The layouts and the thinking are real — the data is not.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
