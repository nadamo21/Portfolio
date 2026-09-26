"use client";

import { useLayoutEffect, useRef, useState } from "react";

const DESIGN_WIDTH = 980;

type Props = {
  html: string;
  label: string;
  /** Optional crop: show only the top part of the dashboard, as a ratio of width (e.g. 0.62). */
  cropRatio?: number;
  className?: string;
};

/**
 * Renders a dashboard recreation at its 980px design width and scales it to the
 * container, so layouts stay intact on every screen instead of reflowing.
 * The markup is static first-party content from src/content/dashboards.
 */
export function DashboardFrame({ html, label, cropRatio, className = "" }: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ scale: number; height: number } | null>(null);

  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const measure = () => {
      const scale = o.clientWidth / DESIGN_WIDTH;
      setBox({ scale, height: i.offsetHeight * scale });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, []);

  const height = cropRatio ? undefined : box?.height;

  return (
    <div
      ref={outer}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        height,
        aspectRatio: cropRatio ? `1 / ${cropRatio}` : box ? undefined : "1 / 0.62",
      }}
    >
      <div
        ref={inner}
        aria-hidden
        className="dash-root pointer-events-none absolute top-0 left-0 origin-top-left select-none"
        style={{ transform: `scale(${box?.scale ?? 0.5})`, opacity: box ? 1 : 0, transition: "opacity .3s" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
