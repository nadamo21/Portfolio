import "server-only";

/**
 * WP Direct integration — server-side only.
 *
 * Credentials are read from environment variables and never reach the browser.
 * No WP Direct API documentation or credentials were available when this was built,
 * so the request shape is isolated in `buildPayload`: matching the real contract is
 * a one-function change. Until WPDIRECT_API_URL and WPDIRECT_API_KEY are set,
 * `isWpDirectConfigured()` is false and the contact form hands off to wa.me instead.
 */

export type ContactBrief = {
  name: string;
  contact: string;
  topic: string;
  message: string;
};

type WpDirectConfig = {
  endpoint: string;
  apiKey: string;
  authHeader: string;
  authScheme: string;
  recipient: string;
  instanceId?: string;
  timeoutMs: number;
};

function readConfig(): WpDirectConfig | null {
  const endpoint = process.env.WPDIRECT_API_URL?.trim();
  const apiKey = process.env.WPDIRECT_API_KEY?.trim();
  if (!endpoint || !apiKey) return null;

  return {
    endpoint,
    apiKey,
    authHeader: process.env.WPDIRECT_AUTH_HEADER?.trim() || "Authorization",
    authScheme: process.env.WPDIRECT_AUTH_SCHEME?.trim() ?? "Bearer",
    recipient: process.env.WPDIRECT_RECIPIENT?.trim() || "201028585760",
    instanceId: process.env.WPDIRECT_INSTANCE_ID?.trim() || undefined,
    timeoutMs: Number(process.env.WPDIRECT_TIMEOUT_MS) || 8000,
  };
}

export function isWpDirectConfigured() {
  return readConfig() !== null;
}

export function formatBrief(brief: ContactBrief) {
  return [
    "New enquiry from the portfolio",
    "",
    `Name: ${brief.name}`,
    `Reply to: ${brief.contact}`,
    `Topic: ${brief.topic}`,
    "",
    brief.message,
  ].join("\n");
}

/** Maps a brief onto the WP Direct request body. Adjust here once the API contract is known. */
function buildPayload(config: WpDirectConfig, brief: ContactBrief) {
  return {
    ...(config.instanceId ? { instance_id: config.instanceId } : {}),
    to: config.recipient,
    type: "text",
    message: formatBrief(brief),
  };
}

export class WpDirectError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "WpDirectError";
  }
}

export async function sendBrief(brief: ContactBrief) {
  const config = readConfig();
  if (!config) throw new WpDirectError("WP Direct is not configured");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const res = await fetch(config.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        [config.authHeader]: config.authScheme ? `${config.authScheme} ${config.apiKey}` : config.apiKey,
      },
      body: JSON.stringify(buildPayload(config, brief)),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) throw new WpDirectError(`WP Direct responded with ${res.status}`, res.status);
    return { ok: true as const };
  } catch (err) {
    if (err instanceof WpDirectError) throw err;
    const reason = err instanceof Error && err.name === "AbortError" ? "timed out" : "request failed";
    throw new WpDirectError(`WP Direct ${reason}`);
  } finally {
    clearTimeout(timer);
  }
}
