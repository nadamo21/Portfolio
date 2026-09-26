import { ArrowDownRight, MapPin } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon, TikTokIcon } from "@/components/ui/icons";
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
            Product Analyst at Loynova · tech content creator · open to freelance
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

        <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[23rem] lg:max-w-[26rem]">
          <div className="relative">
          {/* Orbit ring with data points, slowly rotating behind the portrait. */}
          <div className="pointer-events-none absolute -inset-5 sm:-inset-7" aria-hidden>
            <svg viewBox="0 0 200 200" className="size-full animate-[spin_60s_linear_infinite] motion-reduce:animate-none">
              <circle cx="100" cy="100" r="98" fill="none" stroke="var(--line-strong)" strokeWidth="0.6" strokeDasharray="2 4" />
              <circle cx="100" cy="2" r="2.6" fill="var(--accent)" />
              <circle cx="185" cy="149" r="2" fill="var(--gold)" />
              <circle cx="15" cy="149" r="1.6" fill="var(--accent)" opacity=".6" />
            </svg>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-full bg-[#0c1330] shadow-card ring-1 ring-line">
            <Image
              src="/images/nada.jpg"
              alt="Portrait of Nada Mohamed, data analyst"
              fill
              priority
              sizes="(min-width: 1024px) 416px, (min-width: 640px) 368px, 320px"
              className="scale-[1.04] object-cover"
            />
          </div>
          </div>

          <div className="card absolute -bottom-4 -left-10 hidden w-[12.5rem] p-4 sm:block">
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

          <div className="card absolute top-2 -left-10 hidden items-center gap-3 px-4 py-3 sm:flex">
            <span className="flex size-9 items-center justify-center rounded-full bg-gold-soft font-display text-sm font-bold text-gold">
              K
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Kaggle Expert</p>
              <p className="text-xs text-muted">Data science notebooks</p>
            </div>
          </div>

          <div className="card absolute -right-8 bottom-10 hidden px-4 py-3 sm:block">
            <p className="text-sm font-semibold">Tech content creator</p>
            <div className="mt-2 flex gap-2">
              <a
                href={site.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nada on Instagram (opens in a new tab)"
                className="flex size-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent-strong"
              >
                <InstagramIcon size={15} />
              </a>
              <a
                href={site.links.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nada on TikTok (opens in a new tab)"
                className="flex size-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent-strong"
              >
                <TikTokIcon size={15} />
              </a>
            </div>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-2 text-sm sm:hidden" aria-label="Highlights">
            <li className="rounded-full border border-line bg-surface px-3 py-1.5 font-medium">95+ dashboards</li>
            <li className="rounded-full border border-line bg-surface px-3 py-1.5 font-medium">Kaggle Expert</li>
            <li className="flex items-center gap-2 rounded-full border border-line bg-surface py-1 pr-1.5 pl-3 font-medium">
              Tech content creator
              <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)" className="flex size-7 items-center justify-center rounded-full bg-surface-2 text-muted">
                <InstagramIcon size={14} />
              </a>
              <a href={site.links.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok (opens in a new tab)" className="flex size-7 items-center justify-center rounded-full bg-surface-2 text-muted">
                <TikTokIcon size={14} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
