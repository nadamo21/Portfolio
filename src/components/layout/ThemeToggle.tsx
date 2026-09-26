"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

export function ThemeToggle() {
  // Server snapshot is null so the icon only renders once the real theme is known.
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {
          /* storage unavailable — the choice just won't persist */
        }
      }}
      className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent-strong"
      aria-label={theme ? `Switch to ${next} theme` : "Toggle theme"}
    >
      {theme === "dark" ? <Sun size={17} aria-hidden /> : theme === "light" ? <Moon size={17} aria-hidden /> : null}
    </button>
  );
}
