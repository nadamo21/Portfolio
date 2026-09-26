import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "src/content/dashboards");
const cache = new Map<string, string>();

/**
 * Returns the static markup for one dashboard recreation. The files are
 * first-party content checked into the repo (never user input), read at build time.
 */
export function dashboardHtml(id: string) {
  if (!/^\d{2}$/.test(id)) throw new Error(`Invalid dashboard id: ${id}`);
  let html = cache.get(id);
  if (!html) {
    html = readFileSync(path.join(dir, `${id}.html`), "utf8");
    cache.set(id, html);
  }
  return html;
}
