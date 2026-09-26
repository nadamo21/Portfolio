import { Briefcase, GraduationCap, Languages, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, languages } from "@/lib/profile";
import { site } from "@/lib/site";

const facts = [
  { icon: Briefcase, label: "Now", value: "Product Analyst, Loynova", sub: "Freelance on Khamsat & Upwork since Sep 2024" },
  { icon: GraduationCap, label: "Studied", value: education.degree, sub: `${education.school} · 2020–2024` },
  { icon: MapPin, label: "Based in", value: site.location, sub: "Working remotely with clients across the region" },
  {
    icon: Languages,
    label: "Languages",
    value: languages.map((l) => l.name).join(" · "),
    sub: languages.map((l) => l.level).join(" · "),
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="01"
          label="About"
          title={<span id="about-title">Data analyst first. Dashboard builder second.</span>}
        />
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal className="space-y-5 text-lg text-pretty text-muted">
            <p>
              <span className="text-ink">I&apos;m Nada</span> — a data analyst from Alexandria with a degree in Computer
              Science &amp; Statistics. I work the full pipeline: pulling data out with SQL, cleaning and shaping it in
              Power Query, building the model and the DAX measures, and designing a report layout stakeholders can read
              at a glance.
            </p>
            <p>
              Since August 2025 I&apos;ve been a <span className="text-ink">Product Analyst at Loynova</span>, a
              loyalty-technology company, building the Power BI reporting behind loyalty programmes — points earning,
              redemption behaviour, merchant performance and campaign results. Alongside that I run a freelance practice
              where I&apos;ve delivered <span className="text-ink">95+ dashboards across nine-plus industries</span>,
              many of them for repeat clients.
            </p>
            <p>
              Before analytics took over, I taught — coding at iSchool, robotics at Techno Future, and freelancing for
              aspiring analysts with EYouth. That habit of explaining things clearly carries straight into how I design
              reports.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="card divide-y divide-line">
              {facts.map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="flex gap-4 p-5 sm:p-6">
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                    <Icon size={18} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <dt className="label-mono text-muted">{label}</dt>
                    <dd className="mt-1 font-medium">{value}</dd>
                    <dd className="text-sm text-muted">{sub}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
