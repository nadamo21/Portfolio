import { NextResponse } from "next/server";
import { isWpDirectConfigured, sendBrief, WpDirectError, type ContactBrief } from "@/lib/wpdirect";

const LIMITS = { name: 80, contact: 120, topic: 60, message: 2000 } as const;

// Best-effort per-instance throttle; swap for a shared store if abuse shows up.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function parseBrief(body: unknown): ContactBrief | string {
  if (!body || typeof body !== "object") return "Invalid request";
  const b = body as Record<string, unknown>;
  const brief = {} as ContactBrief;
  for (const key of Object.keys(LIMITS) as (keyof typeof LIMITS)[]) {
    const value = typeof b[key] === "string" ? (b[key] as string).trim() : "";
    if (!value) return `Missing ${key}`;
    if (value.length > LIMITS[key]) return `${key} is too long`;
    brief[key] = value;
  }
  return brief;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: bots fill every field.
  if (body && typeof body === "object" && (body as Record<string, unknown>).company) {
    return NextResponse.json({ ok: true });
  }

  const brief = parseBrief(body);
  if (typeof brief === "string") {
    return NextResponse.json({ ok: false, error: brief }, { status: 400 });
  }

  if (!isWpDirectConfigured()) {
    // Not an error: until credentials are added, the client hands off to WhatsApp.
    return NextResponse.json({ ok: false, fallback: "whatsapp" });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (throttled(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests — please try WhatsApp." }, { status: 429 });
  }

  try {
    await sendBrief(brief);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err instanceof WpDirectError ? err.message : err);
    return NextResponse.json({ ok: false, fallback: "whatsapp" }, { status: 502 });
  }
}
