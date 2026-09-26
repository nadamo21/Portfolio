"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DEFAULT_WHATSAPP_MESSAGE, nav, site, whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/icons";
import { ThemeToggle } from "./ThemeToggle";

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const els = nav.map((n) => document.getElementById(n.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
          else setActive((cur) => (cur === e.target.id ? null : cur));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);
  return enabled ? active : null;
}

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="container-x flex h-16 items-center gap-4">
        <Link href="/" className="mr-auto flex items-center gap-2.5 rounded-full" onClick={() => setOpen(false)}>
          <Image
            src="/images/nada.jpg"
            alt=""
            width={34}
            height={34}
            className="size-[34px] rounded-full object-cover object-[50%_28%] ring-2 ring-gold/70"
            priority
          />
          <span className="font-display text-[0.95rem] font-semibold tracking-tight">
            {site.name}
            <span className="ml-2 hidden text-muted sm:inline">· {site.role}</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <Link
                href={`/#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active === item.id ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
                {active === item.id ? (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-accent" aria-hidden />
                ) : null}
              </Link>
            </li>
          ))}
        </ul>

        <ThemeToggle />
        <Link
          href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-bg transition-colors hover:bg-accent-strong sm:inline-flex dark:hover:bg-accent"
        >
          <WhatsAppIcon size={16} />
          Let&apos;s talk
        </Link>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-line lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line lg:hidden">
        <ul className="container-x grid gap-1 py-4">
          {nav.map((item, i) => (
            <li key={item.id}>
              <Link
                href={`/#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 rounded-xl px-2 py-3 font-display text-2xl font-semibold"
              >
                <span className="label-mono text-accent-strong">0{i + 1}</span>
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <Link
              href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#168a4a] font-medium text-white"
            >
              <WhatsAppIcon size={18} /> Chat on WhatsApp
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
