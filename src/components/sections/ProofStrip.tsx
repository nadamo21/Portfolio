import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/lib/work";

const items = [
  { value: stats.delivered, suffix: "+", label: "Dashboards delivered to clients" },
  { value: stats.industries, suffix: "+", label: "Industries, from loyalty to logistics" },
  { value: stats.samples, suffix: "", label: "Report pages recreated on this site" },
  { value: 6, suffix: "", label: "Five-star client reviews shown below" },
];

export function ProofStrip() {
  return (
    <section aria-label="Key numbers" className="border-y border-line">
      <div className="mx-auto grid max-w-[76rem] grid-cols-2 gap-px bg-line lg:grid-cols-4 min-[76rem]:border-x min-[76rem]:border-line">
        {items.map((item, i) => (
          <div key={item.label} className="bg-bg px-5 py-8 sm:px-8 sm:py-10">
            <Reveal delay={i * 0.06}>
              <p className="font-display text-[clamp(2.1rem,5vw,3rem)] leading-none font-semibold">
                <Counter value={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-3 max-w-[14rem] text-sm text-muted">{item.label}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
