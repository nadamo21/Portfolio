"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// A quiet trend line behind the hero: draws itself in, then drifts with scroll.
const points = [
  [0, 300], [90, 280], [180, 292], [270, 240], [360, 256], [450, 205], [540, 222],
  [630, 170], [720, 186], [810, 132], [900, 150], [990, 98], [1080, 112], [1170, 64], [1260, 72],
] as const;

const d = points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
const area = `${d} L1260 360 L0 360 Z`;

export function HeroChart() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 60]);

  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 1260 360"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[55%] w-full opacity-70 md:block"
      style={{ y }}
    >
      <defs>
        <linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill="url(#hero-area)"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.9 }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="var(--accent)"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
      />
    </motion.svg>
  );
}
