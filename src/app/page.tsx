import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Direction } from "@/components/sections/Direction";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { PowerBI } from "@/components/sections/PowerBI";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { Reviews } from "@/components/sections/Reviews";
import { Skills } from "@/components/sections/Skills";
import { Thinking } from "@/components/sections/Thinking";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <ProofStrip />
      <About />
      <Work />
      <PowerBI />
      <Thinking />
      <Experience />
      <Skills />
      <Education />
      <Direction />
      <Reviews />
      <Contact />
    </main>
  );
}
