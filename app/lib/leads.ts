import { redis } from "./redis";
import type { Estimate, InternalEstimate, QA } from "./estimate";

export interface LeadRecord {
  name: string;
  email: string;
  project: string;
  budget: string;
  answers: QA[];
  estimate: Estimate;
  internal: InternalEstimate | null;
}

/**
 * Durable backup of every captured lead, independent of email delivery.
 * Stored newest-first in the "leads" Redis list (browse it in the Upstash
 * console). No-ops and never throws when Redis isn't configured - the email
 * stays the primary channel; this is the safety net.
 */
export async function saveLead(lead: LeadRecord): Promise<void> {
  if (!redis) return;
  try {
    await redis.lpush("leads", JSON.stringify({ ...lead, at: new Date().toISOString() }));
    await redis.ltrim("leads", 0, 4999); // keep the most recent 5,000
  } catch (err) {
    console.error("saveLead failed:", err);
  }
}
