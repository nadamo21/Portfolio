import type { ReactNode } from "react";

const tones = {
  neutral: "border-line bg-surface-2 text-muted",
  accent: "border-transparent bg-accent-soft text-accent-strong",
  gold: "border-transparent bg-gold-soft text-gold",
} as const;

export function Chip({ children, tone = "neutral" }: { children: ReactNode; tone?: keyof typeof tones }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
