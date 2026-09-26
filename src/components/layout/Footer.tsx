import Link from "next/link";
import { site } from "@/lib/site";

const social = [
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "Upwork", href: site.links.upwork },
  { label: "Khamsat", href: site.links.khamsat },
  { label: "Instagram", href: site.links.instagram },
  { label: "TikTok", href: site.links.tiktok },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display font-semibold text-ink">
            {site.fullName} · {site.role}
          </p>
          <p className="mt-1 max-w-md">
            Every dashboard on this site is a design recreation with dummy data — layouts mirror real deliverables,
            client data never appears.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {social.map((s) => (
            <li key={s.label}>
              <Link href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="container-x pb-8 text-xs text-muted/80">© {new Date().getFullYear()} {site.fullName}</p>
    </footer>
  );
}
