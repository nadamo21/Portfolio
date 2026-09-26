import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { roles } from "@/lib/profile";
import { ExperienceTimeline } from "./ExperienceTimeline";

export function Experience() {
  // Resolved at build time so server and client render the same "now".
  const d = new Date();
  const now = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="05"
          label="Experience"
          align="split"
          title={<span id="experience-title">Analytics by day, teaching along the way.</span>}
          lead="An in-house product analytics role, a freelance practice running in parallel, and the teaching roles that came before. Select a role to see what it involved."
        />
        <Reveal>
          <ExperienceTimeline roles={roles} now={now} />
        </Reveal>
      </div>
    </section>
  );
}
