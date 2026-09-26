import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "stack" | "split";
};

/** Numbered section header: "02 — Selected work" eyebrow, H2 title and optional lead paragraph. */
export function SectionHeading({ index, label, title, lead, align = "stack" }: Props) {
  const split = align === "split";
  return (
    <Reveal
      className={
        split ? "mb-12 grid gap-5 md:mb-16 md:grid-cols-[1.15fr_1fr] md:items-end md:gap-12" : "mb-12 max-w-3xl md:mb-16"
      }
    >
      <div>
        <p className="label-mono mb-4 flex items-center gap-3 text-accent-strong">
          <span className="tabular">{index}</span>
          <span className="h-px w-8 bg-current opacity-50" aria-hidden />
          {label}
        </p>
        <h2 className="text-[clamp(2rem,4.6vw,3.25rem)] font-semibold text-balance">{title}</h2>
      </div>
      {lead ? <p className={`text-base text-pretty text-muted sm:text-lg ${split ? "" : "mt-5"}`}>{lead}</p> : null}
    </Reveal>
  );
}
