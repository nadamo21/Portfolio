import { ArrowUpRight, FileText, Mail } from "lucide-react";
import Link from "next/link";
import { InstagramIcon, LinkedInIcon, TikTokIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";

const channels = [
  { label: "LinkedIn", href: site.links.linkedin, icon: <LinkedInIcon size={16} /> },
  { label: "Upwork", href: site.links.upwork },
  { label: "Khamsat", href: site.links.khamsat },
  { label: "Instagram", href: site.links.instagram, icon: <InstagramIcon size={16} /> },
  { label: "TikTok", href: site.links.tiktok, icon: <TikTokIcon size={15} /> },
  { label: "Résumé (PDF)", href: site.links.resume, icon: <FileText size={16} aria-hidden /> },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="pt-24 pb-24 md:pt-32">
      <div className="container-x">
        <div className="card overflow-hidden">
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            <Reveal className="relative p-6 sm:p-10 lg:p-12">
              <div className="grid-bg absolute inset-0 opacity-70" aria-hidden />
              <div className="relative">
                <p className="label-mono mb-4 flex items-center gap-3 text-accent-strong">
                  <span className="tabular">10</span>
                  <span className="h-px w-8 bg-current opacity-50" aria-hidden />
                  Contact
                </p>
                <h2 id="contact-title" className="text-[clamp(2.2rem,5vw,3.5rem)] font-semibold text-balance">
                  Let&apos;s talk data.
                </h2>
                <p className="mt-5 max-w-md text-lg text-pretty text-muted">
                  A dashboard to build, a dataset to make sense of, or a role on your team — WhatsApp is the fastest way to
                  reach me.
                </p>

                <div className="mt-8 flex flex-col items-start gap-4">
                  <WhatsAppButton size="lg" label="Chat on WhatsApp" magnetic />
                  <p className="font-mono text-sm text-muted">{site.whatsapp.display}</p>
                  <Link href={`mailto:${site.email}`} className="inline-flex items-center gap-2 font-medium hover:text-accent-strong">
                    <Mail size={17} className="text-accent" aria-hidden />
                    {site.email}
                  </Link>
                </div>

                <ul className="mt-10 flex flex-wrap gap-2">
                  {channels.map((c) => (
                    <li key={c.label}>
                      <Link
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium transition-colors hover:border-accent hover:text-accent-strong"
                      >
                        {c.icon}
                        {c.label}
                        <ArrowUpRight size={14} className="opacity-60" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="border-t border-line bg-surface-2/60 p-6 sm:p-10 lg:border-t-0 lg:border-l lg:p-12">
              <h3 className="font-display text-xl font-semibold">Or send a message</h3>
              <p className="mt-1 mb-6 text-sm text-muted">Tell me about the data and the decision it should support.</p>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
