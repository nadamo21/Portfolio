import { BarChart3, Code2, Database, FunctionSquare, Workflow, Braces } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/lib/profile";

const icons = [BarChart3, FunctionSquare, Database, Braces, Workflow, Code2];

export function Skills() {
  return (
    <section aria-labelledby="skills-title" className="border-y border-line bg-surface/50 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="06"
          label="Toolkit"
          align="split"
          title={<span id="skills-title">Grouped by the job they do.</span>}
          lead="Tools matter less than knowing which one a problem needs. Here they are by role in the pipeline, not as a wall of logos."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const Icon = icons[i];
            return (
              <li key={g.title}>
                <Reveal delay={(i % 3) * 0.06} className="card group h-full p-6 transition-colors hover:border-accent/40">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent-strong transition-transform group-hover:-rotate-6">
                      <Icon size={19} aria-hidden />
                    </span>
                    <h3 className="text-lg font-semibold">{g.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted">{g.blurb}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${g.title} skills`}>
                    {g.skills.map((s, j) => (
                      <li
                        key={s}
                        className={`rounded-full border px-3 py-1 text-sm ${
                          j === 0 ? "border-accent/40 bg-accent-soft font-medium text-accent-strong" : "border-line bg-surface-2"
                        }`}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
