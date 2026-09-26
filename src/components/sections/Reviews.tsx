"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviews } from "@/lib/profile";
import { site } from "@/lib/site";

export function Reviews() {
  const [lang, setLang] = useState<"en" | "ar">("en");

  return (
    <section aria-labelledby="reviews-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="09"
          label="Client reviews"
          align="split"
          title={<span id="reviews-title">What clients say after the handover.</span>}
          lead={
            <>
              Five-star reviews from{" "}
              <a href={site.links.khamsat} target="_blank" rel="noopener noreferrer" className="text-accent-strong underline-offset-4 hover:underline">
                Khamsat
              </a>
              , originally written in Arabic.
            </>
          }
        />

        <div role="group" aria-label="Review language" className="mb-8 inline-flex rounded-full border border-line bg-surface p-1">
          {(
            [
              ["en", "English translation"],
              ["ar", "العربية · original"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={lang === key}
              onClick={() => setLang(key)}
              className={`h-9 rounded-full px-4 text-sm font-medium transition-colors ${
                lang === key ? "bg-ink text-bg" : "text-muted hover:text-ink"
              } ${key === "ar" ? "font-arabic" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>

        <ul className="columns-1 gap-5 md:columns-2 lg:columns-3">
          {reviews.map((r, i) => (
            <li key={`${r.name}-${i}`} className="mb-5 break-inside-avoid">
              <Reveal delay={(i % 3) * 0.06}>
                <figure className="card p-6">
                  <div className="flex gap-0.5 text-gold" aria-label="Rated 5 out of 5">
                    {Array.from({ length: 5 }, (_, k) => (
                      <Star key={k} size={15} fill="currentColor" aria-hidden />
                    ))}
                  </div>
                  {lang === "en" ? (
                    <blockquote className="mt-4 text-pretty">“{r.en}”</blockquote>
                  ) : (
                    <blockquote lang="ar" dir="rtl" className="mt-4 font-arabic leading-loose text-pretty">
                      {r.ar}
                    </blockquote>
                  )}
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                    <span
                      className="flex size-9 items-center justify-center rounded-full text-sm font-semibold text-white"
                      style={{ background: r.color }}
                      aria-hidden
                    >
                      {r.name[0]}
                    </span>
                    <span className="text-sm leading-tight">
                      <span className="block font-medium">{r.name}</span>
                      <span className="text-muted">Khamsat client{r.note ? ` · ${r.note}` : ""}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
