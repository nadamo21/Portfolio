import { ArrowDownRight, MapPin } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { site } from "@/lib/site";
import { HeroChart } from "./HeroChart";
import { HeroTitle } from "./HeroTitle";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 md:pb-24 lg:pt-36">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <HeroChart />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 py-1.5 pr-3.5 pl-2 text-xs font-medium text-muted backdrop-blur sm:text-sm">
            <span className="relative flex size-2.5" aria-hidden>
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60 motion-reduce:animate-none" />
              <span className="relative size-2.5 rounded-full bg-emerald-500" />
            </span>
            Product Analyst at Loynova · open to freelance projects
          </p>

          <HeroTitle />

          <p className="mt-7 max-w-xl text-base text-pretty text-muted sm:text-lg">
            I turn raw transaction data into the reports teams run on — cleaning and modelling it with Power Query and
            SQL, defining the KPIs in DAX, and designing Power BI dashboards people actually open. Most of my work sits
            in loyalty &amp; rewards, retail and operations. Next on my path: automation and machine learning.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#work" size="lg" magnetic>
              View my work
              <ArrowDownRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden />
            </ButtonLink>
            <WhatsAppButton size="lg" magnetic />
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted" aria-label="At a glance">
            <li className="inline-flex items-center gap-1.5">
              <MapPin size={15} className="text-accent" aria-hidden /> {site.location}
            </li>
            <li>Arabic &amp; English</li>
            <li className="font-mono text-xs leading-6 tracking-wide">Power BI · SQL · DAX · Python</li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line shadow-card">
            <Image
              src="/images/nada.jpg"
              alt="Nada Mohamed, data analyst, working on her laptop outdoors"
              fill
              priority
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 384px, 88vw"
              className="object-cover object-[50%_35%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" aria-hidden />
          </div>

          <div className="card absolute -bottom-6 -left-3 w-[13.5rem] p-4 sm:-left-8">
            <p className="label-mono text-muted">Dashboards delivered</p>
            <p className="mt-1 font-display text-3xl font-semibold">
              95<span className="text-accent">+</span>
            </p>
            <svg viewBox="0 0 120 28" className="mt-2 h-7 w-full" aria-hidden>
              {[8, 12, 10, 16, 14, 19, 17, 23, 21, 26].map((h, i) => (
                <rect key={i} x={i * 12} y={28 - h} width="8" height={h} rx="1.5" className="fill-accent" opacity={0.35 + i * 0.065} />
              ))}
            </svg>
          </div>

          <div className="card absolute -top-4 -right-2 flex items-center gap-3 px-4 py-3 sm:-right-6">
            <span className="flex size-9 items-center justify-center rounded-full bg-gold-soft font-display text-sm font-bold text-gold">
              K
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Kaggle Expert</p>
              <p className="text-xs text-muted">Data science notebooks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
