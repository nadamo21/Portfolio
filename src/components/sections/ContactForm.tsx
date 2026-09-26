"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/icons";

const topics = ["Power BI dashboard", "Data analysis", "Data cleaning & modelling", "Full-time role", "Something else"];

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "fallback"; href: string }
  | { state: "error"; message: string };

const field =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const handoff = whatsappUrl(
      `Hi Nada, I'm ${data.name}.\nTopic: ${data.topic}\n\n${data.message}\n\nReply to: ${data.contact}`,
    );

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; fallback?: string; error?: string };
      if (res.ok && json.ok) {
        setStatus({ state: "sent" });
        form.reset();
      } else if (json.fallback === "whatsapp") {
        // The API isn't connected yet (or is down): hand the same message to WhatsApp.
        setStatus({ state: "fallback", href: handoff });
        window.open(handoff, "_blank", "noopener,noreferrer");
      } else {
        setStatus({ state: "error", message: json.error ?? "Something went wrong. Please try WhatsApp instead." });
      }
    } catch {
      setStatus({ state: "fallback", href: handoff });
    }
  }

  if (status.state === "sent") {
    return (
      <div className="flex h-full flex-col items-center justify-center py-12 text-center" role="status">
        <CheckCircle2 size={40} className="text-accent" aria-hidden />
        <p className="mt-4 font-display text-2xl font-semibold">Message sent</p>
        <p className="mt-2 max-w-xs text-muted">Thanks — I&apos;ll get back to you soon.</p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="mt-6 text-sm font-medium text-accent-strong hover:underline">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">
          Your name
          <input name="name" required maxLength={80} autoComplete="name" className={field} placeholder="Full name" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Email or phone
          <input name="contact" required maxLength={120} autoComplete="email" className={field} placeholder="So I can reply" />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-medium">
        What&apos;s it about?
        <select name="topic" required defaultValue={topics[0]} className={field}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        Message
        <textarea
          name="message"
          required
          maxLength={2000}
          rows={5}
          className={`${field} resize-y`}
          placeholder="The data you have, the question you want answered, and any deadline."
        />
      </label>
      {/* Honeypot — hidden from people, tempting to bots. */}
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <button
        type="submit"
        disabled={status.state === "sending"}
        className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 font-medium text-bg transition-colors hover:bg-accent-strong disabled:opacity-60 dark:hover:bg-accent"
      >
        {status.state === "sending" ? <Loader2 size={18} className="animate-spin" aria-hidden /> : <Send size={17} aria-hidden />}
        {status.state === "sending" ? "Sending…" : "Send message"}
      </button>

      <div aria-live="polite" className="min-h-6 text-sm">
        {status.state === "fallback" ? (
          <p className="text-muted">
            Your message is ready in WhatsApp.{" "}
            <a href={status.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-[#168a4a] hover:underline">
              <WhatsAppIcon size={14} /> Open it here
            </a>{" "}
            if it didn&apos;t open automatically.
          </p>
        ) : status.state === "error" ? (
          <p className="text-red-600 dark:text-red-400">{status.message}</p>
        ) : null}
      </div>
    </form>
  );
}
