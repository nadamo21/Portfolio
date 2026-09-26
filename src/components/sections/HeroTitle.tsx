"use client";

import { motion, useReducedMotion } from "motion/react";

const lines = [
  { text: "Nada Mohamed", className: "" },
  { text: "Data Analyst.", className: "text-accent-strong" },
];

/** H1 with a masked line-by-line reveal. Text is server-rendered and readable without JS. */
export function HeroTitle() {
  const reduce = useReducedMotion();
  return (
    <h1 id="hero-title" className="font-display text-[clamp(2.75rem,8.5vw,5.1rem)] leading-[0.95] font-semibold tracking-[-0.035em]">
      {lines.map((line, i) => (
        <span key={line.text} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${line.className}`}
            initial={reduce ? false : { y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
