import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DashboardLibrary, type LibraryItem } from "@/components/work/DashboardLibrary";
import { dashboardHtml } from "@/lib/dashboard-html";
import { caseStudyForDashboard, dashboards, domains } from "@/lib/work";
import { PowerBICraft } from "./PowerBICraft";

const capabilities = [
  "Dashboard development",
  "Data modelling",
  "DAX measures",
  "Power Query",
  "KPI design",
  "Interactive reporting",
  "Arabic RTL reports",
];

export function PowerBI() {
  const items: LibraryItem[] = dashboards.map((d) => {
    const c = caseStudyForDashboard(d.id);
    return { ...d, html: dashboardHtml(d.id), caseSlug: c?.slug, caseTitle: c?.title };
  });

  return (
    <section id="power-bi" aria-labelledby="pbi-title" className="relative border-y border-line bg-surface/50 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="03"
          label="Power BI portfolio"
          align="split"
          title={<span id="pbi-title">What goes into a report before anyone sees a chart.</span>}
          lead="Power BI is where the work shows up, but most of it happens underneath — in the query, the model and the measure definitions. Here's the pipeline, step by step."
        />

        <Reveal>
          <ul className="mb-12 flex flex-wrap gap-2" aria-label="Power BI capabilities">
            {capabilities.map((c) => (
              <li key={c} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm">
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <PowerBICraft />
        </Reveal>

        <div className="mt-24">
          <Reveal className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label-mono text-accent-strong">The report library</p>
              <h3 className="mt-3 text-[clamp(1.6rem,3.2vw,2.3rem)] font-semibold">
                {dashboards.length} report pages from 95+ builds
              </h3>
            </div>
            <p className="max-w-md text-muted">
              Filter by domain, then open any page to see it full size. Every figure is dummy data.
            </p>
          </Reveal>
          <DashboardLibrary items={items} domainLabels={domains} />
        </div>
      </div>
    </section>
  );
}
