import { Star } from "lucide-react";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/lib/work";

const items = [
  { value: stats.industries, suffix: "+", label: "Industries, from loyalty to logistics" },
];

export function ProofStrip() {
  return (
    <section aria-label="Highlights" className="border-y border-line">
      <div className="mx-auto grid max-w-[76rem] grid-cols-2 gap-px bg-line min-[76rem]:border-x min-[76rem]:border-line">
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
        <div className="bg-bg px-5 py-8 sm:px-8 sm:py-10">
          <Reveal delay={0.12}>
            <p className="flex h-[clamp(2.1rem,5vw,3rem)] items-center gap-1 text-gold" aria-label="Five-star client reviews">
              {Array.from({ length: 5 }, (_, k) => (
                <Star key={k} className="size-[clamp(1.6rem,3.6vw,2.2rem)]" fill="currentColor" aria-hidden />
              ))}
            </p>
            <p className="mt-3 max-w-[14rem] text-sm text-muted">Five-star client reviews on Khamsat</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
