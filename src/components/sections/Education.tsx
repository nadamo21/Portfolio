import { Award, BadgeCheck, ExternalLink, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { credentials, education, recognition } from "@/lib/profile";
import { site } from "@/lib/site";

export function Education() {
  const highlights = credentials.filter((c) => c.highlight);
  const others = credentials.filter((c) => !c.highlight);

  return (
    <section aria-labelledby="education-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="07"
          label="Education & certifications"
          title={<span id="education-title">Computer science, statistics, and the credentials since.</span>}
        />

        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="card relative overflow-hidden p-6 sm:p-8">
            <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
            <div className="relative">
              <span className="flex size-11 items-center justify-center rounded-xl bg-ink text-bg">
                <GraduationCap size={20} aria-hidden />
              </span>
              <p className="label-mono mt-6 text-muted">{education.period}</p>
              <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">{education.degree}</h3>
              <p className="mt-1 text-lg text-muted">{education.school}</p>
              <p className="mt-6 border-l-2 border-accent/50 pl-4 text-pretty text-muted">{education.project}</p>
            </div>
          </Reveal>

          <div className="grid gap-5">
            {highlights.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.08} className="card flex gap-4 p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-gold">
                  <BadgeCheck size={20} aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{c.name}</h3>
                  <p className="text-sm font-medium text-accent-strong">{c.issuer}</p>
                  {c.note ? <p className="mt-1.5 text-sm text-muted">{c.note}</p> : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <Reveal className="card p-6 sm:p-8">
            <h3 className="label-mono text-muted">Further training</h3>
            <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {others.map((c) => (
                <li key={c.name} className="border-t border-line pt-4">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-muted">{c.issuer}</p>
                </li>
              ))}
            </ul>
            <Link
              href={site.links.certificates}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong hover:underline"
            >
              View certificates
              <ExternalLink size={14} aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={0.08} className="card p-6 sm:p-8">
            <h3 className="label-mono text-muted">Recognition</h3>
            <ul className="mt-5 space-y-4">
              {recognition.map((r) => (
                <li key={r} className="flex gap-3">
                  <Award size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
