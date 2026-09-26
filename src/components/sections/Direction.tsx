import { Reveal } from "@/components/ui/Reveal";

const stages = [
  {
    name: "Business Intelligence",
    status: "Where I work today",
    level: 1,
    evidence: ["95+ Power BI dashboards delivered", "DAX, Power Query & data modelling", "DEPI Microsoft Power BI Engineer"],
  },
  {
    name: "Advanced Analytics",
    status: "Building",
    level: 0.7,
    evidence: ["SQL & PostgreSQL", "Python — Pandas, NumPy, Seaborn", "A statistics degree behind the numbers"],
  },
  {
    name: "Automation",
    status: "Practising",
    level: 0.5,
    evidence: ["Power Automate", "Python data pipelines", "Repeatable Power Query transformations"],
  },
  {
    name: "AI & Data Science",
    status: "The direction",
    level: 0.3,
    evidence: [
      "Kaggle Expert — published notebooks",
      "Data Science internship, Prodigy InfoTech",
      "ML recommendation system in graduation project",
    ],
  },
];

export function Direction() {
  return (
    <section aria-labelledby="direction-title" className="relative overflow-hidden bg-[#0b1018] py-24 text-[#edf0f4] md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 20%, transparent 75%)",
        }}
        aria-hidden
      />
      <div className="container-x relative">
        <Reveal className="mb-14 max-w-3xl md:mb-20">
          <p className="label-mono mb-4 flex items-center gap-3 text-[#e3a94b]">
            <span className="tabular">08</span>
            <span className="h-px w-8 bg-current opacity-50" aria-hidden />
            Where I&apos;m heading
          </p>
          <h2 id="direction-title" className="text-[clamp(2rem,4.6vw,3.25rem)] font-semibold text-balance">
            From describing what happened to predicting what&apos;s next.
          </h2>
          <p className="mt-5 text-lg text-pretty opacity-70">
            Dashboards explain the past well. The next step is analysis that anticipates, pipelines that run themselves,
            and models that learn. I&apos;m not a data scientist yet — this is the path I&apos;m deliberately building,
            and the groundwork already exists.
          </p>
        </Reveal>

        <ol className="grid gap-px overflow-hidden rounded-[1.25rem] bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((s, i) => (
            <li key={s.name} className="bg-[#0b1018]">
              <Reveal delay={i * 0.1} className="flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="label-mono tabular opacity-60">0{i + 1}</span>
                  <span
                    className={`label-mono rounded-full px-2.5 py-1 text-[0.62rem] ${
                      i === 0 ? "bg-[#3fc1d6] text-[#0a0e14]" : "border border-white/20 opacity-80"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-semibold">{s.name}</h3>
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden>
                  <div
                    className="h-full origin-left rounded-full"
                    style={{
                      width: `${s.level * 100}%`,
                      background: i === 0 ? "#3fc1d6" : `linear-gradient(90deg, #3fc1d6, #e3a94b)`,
                    }}
                  />
                </div>
                <ul className="mt-6 space-y-2.5 text-sm opacity-75">
                  {s.evidence.map((e) => (
                    <li key={e} className="flex gap-2.5">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-current" aria-hidden />
                      {e}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
