"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Pulls its child slightly towards the pointer. Mouse only; off for reduced motion. */
export function Magnetic({ children, strength = 0.22 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const spring = { stiffness: 250, damping: 18, mass: 0.4 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      ref={ref}
      className="inline-flex"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
