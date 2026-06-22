import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

/**
 * Rate limiting with two backends:
 *  - Upstash Redis (when configured) — distributed and accurate across all
 *    serverless instances on Vercel. This is the real limiter in production.
 *  - In-memory fixed window (fallback) — for local dev with no Redis. Per-process
 *    and approximate, but means nothing hard-fails without Upstash.
 */

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const num = (v: string | undefined, fallback: number) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

// Tunable via env without a code change. Defaults are generous for a real user
// (a full estimate is ~3 AI calls) but block hammering.
export const LIMITS = {
  aiPerIpPerHour: num(process.env.RL_AI_PER_IP, 12),
  leadPerIpPerHour: num(process.env.RL_LEAD_PER_IP, 5),
  aiGlobalPerDay: num(process.env.RL_AI_PER_DAY, 300),
};

// ---------- Upstash limiters (only when Redis is configured) ----------

const aiPerIp = redis
  ? new Ratelimit({
      redis,
      prefix: "rl:ai-ip",
      limiter: Ratelimit.slidingWindow(LIMITS.aiPerIpPerHour, "1 h"),
      analytics: false,
    })
  : null;

const leadPerIp = redis
  ? new Ratelimit({
      redis,
      prefix: "rl:lead-ip",
      limiter: Ratelimit.slidingWindow(LIMITS.leadPerIpPerHour, "1 h"),
      analytics: false,
    })
  : null;

const aiGlobal = redis
  ? new Ratelimit({
      redis,
      prefix: "rl:ai-global",
      limiter: Ratelimit.slidingWindow(LIMITS.aiGlobalPerDay, "1 d"),
      analytics: false,
    })
  : null;

// ---------- In-memory fallback ----------

type Entry = { count: number; reset: number };
const store = new Map<string, Entry>();
let lastSweep = 0;
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [k, v] of store) if (v.reset <= now) store.delete(k);
}

interface Result {
  ok: boolean;
  retryAfterSec: number;
}

function memLimit(key: string, limit: number, windowMs: number): Result {
  const now = Date.now();
  sweep(now);
  const entry = store.get(key);
  if (!entry || entry.reset <= now) {
    store.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfterSec: Math.ceil(windowMs / 1000) };
  }
  entry.count++;
  return { ok: entry.count <= limit, retryAfterSec: Math.ceil((entry.reset - now) / 1000) };
}

async function check(
  rl: Ratelimit | null,
  id: string,
  memKey: string,
  limit: number,
  windowMs: number,
): Promise<Result> {
  if (rl) {
    const r = await rl.limit(id);
    return { ok: r.success, retryAfterSec: Math.max(0, Math.ceil((r.reset - Date.now()) / 1000)) };
  }
  return memLimit(memKey, limit, windowMs);
}

// ---------- Helpers ----------

/** Best-effort client IP from proxy headers. */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/** Standard 429 with a Retry-After header. */
export function tooMany(retryAfterSec: number, message: string) {
  return NextResponse.json(
    { error: message },
    { status: 429, headers: { "Retry-After": String(retryAfterSec) } },
  );
}

/**
 * Guard for the two Claude-calling routes: per-IP hourly limit (shared across
 * both AI steps) plus a global daily cap that hard-bounds total spend.
 * Returns a 429 response if blocked, or null if the request may proceed.
 */
export async function guardAi(req: Request): Promise<NextResponse | null> {
  const ip = clientIp(req);

  const perIp = await check(aiPerIp, ip, `ai:${ip}`, LIMITS.aiPerIpPerHour, HOUR);
  if (!perIp.ok) {
    return tooMany(perIp.retryAfterSec, "You've hit the limit for now — try again in a little while.");
  }

  const global = await check(aiGlobal, "global", "ai:global", LIMITS.aiGlobalPerDay, DAY);
  if (!global.ok) {
    return tooMany(global.retryAfterSec, "The estimator is busy right now. Please try again later or email us directly.");
  }

  return null;
}

/**
 * Consume one slot from the global daily AI budget (shared with guardAi).
 * Returns true if within budget — used to bound the lead route's internal
 * pricing call against the same cap as the visitor-facing AI steps.
 */
export async function tryConsumeGlobalAi(): Promise<boolean> {
  const r = await check(aiGlobal, "global", "ai:global", LIMITS.aiGlobalPerDay, DAY);
  return r.ok;
}

/** Guard for the lead-email route: per-IP hourly limit only. */
export async function guardLead(req: Request): Promise<NextResponse | null> {
  const ip = clientIp(req);
  const perIp = await check(leadPerIp, ip, `lead:${ip}`, LIMITS.leadPerIpPerHour, HOUR);
  if (!perIp.ok) {
    return tooMany(perIp.retryAfterSec, "Too many submissions — please try again shortly.");
  }
  return null;
}
