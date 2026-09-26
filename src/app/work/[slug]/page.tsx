import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { DashboardFrame } from "@/components/work/DashboardFrame";
import { dashboardHtml } from "@/lib/dashboard-html";
import { site } from "@/lib/site";
import { caseStudies, domains, getCaseStudy, getDashboard } from "@/lib/work";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: `${c.teaser} A ${domains[c.domain].toLowerCase()} case study by ${site.name}, ${site.role}.`,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: { type: "article", url: `/work/${c.slug}`, title: `${c.title} — ${site.name}`, description: c.teaser },
  };
}

function Block({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-4 border-t border-line py-10 md:grid-cols-[14rem_1fr] md:gap-10">
      <h2 className="label-mono flex items-center gap-3 text-accent-strong">
        <span className="tabular">{index}</span>
        {title}
      </h2>
      <div className="text-lg text-pretty">{children}</div>
    </Reveal>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const idx = caseStudies.indexOf(c);
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const pages = c.dashboards.map((id) => ({ meta: getDashboard(id)!, html: dashboardHtml(id) }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: c.title,
    description: c.teaser,
    url: `${site.url}/work/${c.slug}`,
    author: { "@type": "Person", name: site.name, jobTitle: site.role },
    keywords: c.tools.join(", "),
  };

  return (
    <main id="main" className="pt-28 sm:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <article>
        <header className="container-x">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
            <ArrowLeft size={16} aria-hidden /> All work
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <p className="label-mono text-accent-strong">
                Case study · {domains[c.domain]}
              </p>
              <h1 className="mt-4 text-[clamp(2.3rem,6vw,4.25rem)] font-semibold text-balance">{c.title}</h1>
              <p className="mt-5 max-w-2xl text-lg text-pretty text-muted sm:text-xl">{c.teaser}</p>
            </div>
            <dl className="card grid grid-cols-2 gap-5 p-6 text-sm">
              <div>
                <dt className="label-mono text-muted">Format</dt>
                <dd className="mt-1 font-medium">{c.kicker.split(" · ")[0]}</dd>
              </div>
              <div>
                <dt className="label-mono text-muted">Pages shown</dt>
                <dd className="mt-1 font-medium tabular">{pages.length}</dd>
              </div>
              <div className="col-span-2">
                <dt className="label-mono text-muted">Tools</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {c.tools.map((t) => (
                    <Chip key={t} tone="accent">
                      {t}
                    </Chip>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <Reveal className="container-x mt-14">
          <figure className="rounded-3xl border border-line bg-surface-2 p-2.5 sm:p-5">
            <DashboardFrame html={pages[0].html} label={`${pages[0].meta.title} — dashboard recreation with dummy data`} className="rounded-xl" />
            <figcaption className="px-2 pt-4 text-sm text-muted">
              {pages[0].meta.title}. Recreated with dummy data — every name, ID and figure is a placeholder.
            </figcaption>
          </figure>
        </Reveal>

        <div className="container-x mt-16 max-w-5xl">
          <Block index="01" title="The problem">
            <p>{c.problem}</p>
          </Block>
          <Block index="02" title="Approach">
            <Bullets items={c.approach} />
          </Block>
          <Block index="03" title="Analysis">
            <ul className="flex flex-wrap gap-2">
              {c.analysis.map((a) => (
                <li key={a} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-base">
                  {a}
                </li>
              ))}
            </ul>
          </Block>
          <Block index="04" title="What it answers">
            <ol className="space-y-4">
              {c.questions.map((q, i) => (
                <li key={q} className="flex gap-4">
                  <span className="font-mono text-sm leading-8 text-accent-strong tabular">Q{i + 1}</span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </Block>
          <Block index="05" title="Outcome">
            <p>{c.outcome}</p>
            <p className="mt-4 text-sm text-muted">
              Outcomes describe what the report enables. Client results are confidential and not published here.
            </p>
          </Block>
        </div>

        {pages.length > 1 ? (
          <section aria-labelledby="pages-title" className="container-x mt-10">
            <h2 id="pages-title" className="label-mono mb-6 text-muted">
              Every page in this report
            </h2>
            <div className="grid gap-8">
              {pages.slice(1).map((p) => (
                <Reveal key={p.meta.id}>
                  <figure className="rounded-3xl border border-line bg-surface-2 p-2.5 sm:p-5">
                    <DashboardFrame html={p.html} label={`${p.meta.title} — dashboard recreation with dummy data`} className="rounded-xl" />
                    <figcaption className="grid gap-2 px-2 pt-4 md:grid-cols-[1fr_2fr] md:gap-8">
                      <span className="font-display text-lg font-semibold">{p.meta.title}</span>
                      <span className="text-sm text-muted">{p.meta.summary}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}
      </article>

      <section className="container-x mt-24 mb-24">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card flex flex-col justify-between gap-6 p-6 sm:p-8">
            <div>
              <p className="label-mono text-muted">Have data like this?</p>
              <p className="mt-3 font-display text-2xl font-semibold">Let&apos;s build the report your team needs.</p>
            </div>
            <WhatsAppButton label="Discuss a project" message={`Hi Nada, I saw your "${c.title}" case study and would like to discuss a similar project.`} />
          </div>
          <Link href={`/work/${next.slug}`} className="card group flex flex-col justify-between gap-6 p-6 transition-colors hover:border-accent/50 sm:p-8">
            <p className="label-mono text-muted">Next case study</p>
            <p className="font-display text-2xl font-semibold group-hover:text-accent-strong">{next.title}</p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-strong">
              Read next <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
