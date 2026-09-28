import type { Estimate, InternalEstimate, QA } from "./estimate";

export interface AdminLead {
  /** Our id for the lead, so a retried send isn't stored twice. */
  externalId: string;
  source: "estimator" | "contact";
  name: string;
  email: string;
  project?: string;
  budget?: string;
  answers?: QA[];
  estimate?: Estimate | null;
  internalEstimate?: InternalEstimate | null;
}

/**
 * Sends a lead to the admin app (admin.stacklabs.co.nz/api/leads), which
 * stores it and emails a short "new lead" notice linking to it.
 *
 * Returns false when ADMIN_LEADS_URL / ADMIN_LEADS_SECRET aren't set or the
 * send fails, so the caller can fall back to emailing the full details. It
 * tries twice - the admin app ignores a lead it already has, so a retry after
 * a timeout can't create a duplicate. Never throws.
 */
export async function sendLeadToAdmin(lead: AdminLead): Promise<boolean> {
  const url = process.env.ADMIN_LEADS_URL;
  const secret = process.env.ADMIN_LEADS_SECRET;
  if (!url || !secret) return false;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${secret}` },
        body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) return true;
      console.error(`sendLeadToAdmin: ${res.status} ${await res.text().catch(() => "")}`);
      // A rejected lead (bad secret, invalid data) won't succeed on a retry.
      if (res.status >= 400 && res.status < 500) return false;
    } catch (err) {
      console.error(`sendLeadToAdmin attempt ${attempt} failed:`, err);
    }
  }
  return false;
}
