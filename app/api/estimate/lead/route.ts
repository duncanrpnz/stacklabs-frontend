import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  LIMITS,
  generateInternalEstimate,
  type Estimate,
  type InternalEstimate,
  type QA,
} from "../../../lib/estimate";
import { guardLead, tryConsumeGlobalAi } from "../../../lib/rate-limit";
import { saveLead } from "../../../lib/leads";

const resend = new Resend(process.env.RESEND_API_KEY);

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

function field(label: string, value: string) {
  return `<p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#aeb8cc;">${esc(label)}</p>
  <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#f2f4f9;">${value}</p>`;
}

function list(items: string[]) {
  if (!items.length) return '<span style="color:#aeb8cc;">None</span>';
  return `<ul style="margin:0 0 24px;padding-left:18px;color:#f2f4f9;font-size:15px;line-height:1.6;">${items
    .map((i) => `<li style="margin-bottom:4px;">${esc(i)}</li>`)
    .join("")}</ul>`;
}

// Internal-only pricing block. This is emailed to StackLabs and never returned to the browser.
function internalBlock(internal: InternalEstimate | null) {
  if (!internal) {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
      <tr><td style="background:rgba(91,127,240,0.12);border:1px solid rgba(91,127,240,0.35);border-radius:10px;padding:18px 20px;">
        <p style="margin:0;font-size:13px;line-height:1.6;color:#cdd5e4;">Internal price estimate could not be generated for this enquiry - work it out manually.</p>
      </td></tr></table>`;
  }
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
    <tr><td style="background:rgba(91,127,240,0.12);border:1px solid rgba(91,127,240,0.35);border-radius:10px;padding:20px 22px;">
      <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8fa8f5;">Internal only · not shown to the client</p>
      <p style="margin:0 0 14px;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">${esc(internal.priceRangeNzd)}</p>
      <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#aeb8cc;">Effort · Confidence</p>
      <p style="margin:0 0 16px;font-size:14px;color:#f2f4f9;">${esc(internal.effort)} · ${esc(internal.confidence)} confidence</p>
      <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#aeb8cc;">Rationale</p>
      <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#f2f4f9;">${esc(internal.rationale)}</p>
      <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#aeb8cc;">Risks</p>
      ${list(internal.risks)}
    </td></tr></table>`;
}

function emailHtml(name: string, email: string, project: string, budget: string, answers: QA[], estimate: Estimate, internal: InternalEstimate | null) {
  const qa = answers
    .map(
      (a) =>
        `<p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#f2f4f9;">${esc(a.question)}</p>
         <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#cdd5e4;">${a.answer ? esc(a.answer) : '<span style="color:#aeb8cc;">(no answer)</span>'}</p>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Project enquiry from ${esc(name)}</title></head>
<body style="margin:0;padding:0;background:#262c3d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#262c3d;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
        <tr><td style="padding-bottom:32px;">
          <img src="https://stacklabs.co.nz/email/stacklabs-wordmark-dark.png" width="146" height="20" alt="StackLabs" style="display:block;border:0;" />
        </td></tr>
        <tr><td style="background:#323a52;border:1px solid rgba(255,255,255,0.14);border-radius:14px;padding:36px;">
          <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#5B7FF0;">Project enquiry · ${esc(estimate.sizeTier)} · ${esc(estimate.timeline)}</p>
          <h1 style="margin:0 0 32px;font-size:22px;font-weight:700;color:#f2f4f9;letter-spacing:-0.4px;">${esc(name)}</h1>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.14);margin:0 0 28px;" />
          ${internalBlock(internal)}
          ${field("Email", `<a href="mailto:${esc(email)}" style="color:#5B7FF0;text-decoration:none;">${esc(email)}</a>`)}
          ${field("Budget", budget ? esc(budget) : '<span style="color:#aeb8cc;">Not provided</span>')}
          ${field("Project description", esc(project))}

          <p style="margin:0 0 12px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#aeb8cc;">Clarifying answers</p>
          ${qa}

          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.14);margin:8px 0 28px;" />

          ${field("AI summary", esc(estimate.summary))}
          ${field("Estimated size", `${esc(estimate.sizeTier)} - ${esc(estimate.timeline)}`)}
          <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#aeb8cc;">Key considerations</p>
          ${list(estimate.keyConsiderations)}
          <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#aeb8cc;">Assumptions</p>
          ${list(estimate.assumptions)}

          <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:8px;">
            <tr><td style="background:#4a6ae8;border-radius:8px;">
              <a href="mailto:${esc(email)}" style="display:inline-block;padding:12px 24px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:-0.1px;">Reply to ${esc(name)}</a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding-top:24px;">
          <p style="margin:0;font-size:12px;color:#aeb8cc;">Sent from the project estimator at <a href="https://stacklabs.co.nz" style="color:#aeb8cc;">stacklabs.co.nz</a>. Size and timeline are AI-generated estimates.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// Confirmation sent to the visitor. Public info only - never the internal price.
function confirmationHtml(name: string, estimate: Estimate) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Thanks from StackLabs</title></head>
<body style="margin:0;padding:0;background:#262c3d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#262c3d;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
        <tr><td style="padding-bottom:32px;">
          <img src="https://stacklabs.co.nz/email/stacklabs-wordmark-dark.png" width="146" height="20" alt="StackLabs" style="display:block;border:0;" />
        </td></tr>
        <tr><td style="background:#323a52;border:1px solid rgba(255,255,255,0.14);border-radius:14px;padding:36px;">
          <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#f2f4f9;letter-spacing:-0.4px;">Thanks, ${esc(name)} - we've got it.</h1>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#cdd5e4;">We've received your project details and the rough estimate below. We'll be in touch soon to talk it through and take it further.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
            <tr><td style="background:rgba(91,127,240,0.12);border:1px solid rgba(91,127,240,0.30);border-radius:10px;padding:18px 20px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#aeb8cc;">Rough estimate</p>
              <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;">${esc(estimate.sizeTier)} · ${esc(estimate.timeline)}</p>
            </td></tr>
          </table>
          <p style="margin:0 0 24px;font-size:13px;line-height:1.6;color:#aeb8cc;">This is a rough, automated estimate to set expectations - not a quote. Real numbers come after a proper conversation.</p>
          <p style="margin:0;font-size:15px;line-height:1.7;color:#cdd5e4;">Anything to add in the meantime? Just reply to this email or reach us at <a href="mailto:hello@stacklabs.co.nz" style="color:#5B7FF0;text-decoration:none;">hello@stacklabs.co.nz</a>.</p>
        </td></tr>
        <tr><td style="padding-top:24px;">
          <p style="margin:0;font-size:12px;color:#aeb8cc;">StackLabs · Cambridge, New Zealand · <a href="https://stacklabs.co.nz" style="color:#aeb8cc;">stacklabs.co.nz</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function POST(req: Request) {
  const limited = await guardLead(req);
  if (limited) return limited;

  let name: string, email: string, project: string, budget: string, honeypot: string;
  let answers: QA[];
  let estimate: Estimate;
  try {
    const body = await req.json();
    name = String(body.name ?? "").trim();
    email = String(body.email ?? "").trim();
    project = String(body.project ?? "").trim().slice(0, LIMITS.project);
    budget = String(body.budget ?? "").trim().slice(0, LIMITS.budget);
    honeypot = String(body.website ?? "").trim();
    answers = Array.isArray(body.answers)
      ? body.answers.slice(0, 8).map((qa: { question?: unknown; answer?: unknown }) => ({
          question: String(qa.question ?? "").slice(0, LIMITS.answer),
          answer: String(qa.answer ?? "").slice(0, LIMITS.answer),
        }))
      : [];
    estimate = body.estimate as Estimate;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot - pretend success so bots don't learn they were caught. No email, no save.
  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  if (!name || !email || !estimate) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Generate the internal price server-side. Never returned to the client - only emailed.
  // If it fails (no key / API error), still capture the lead rather than losing it.
  let internal: InternalEstimate | null = null;
  if (process.env.ANTHROPIC_API_KEY && (await tryConsumeGlobalAi())) {
    try {
      internal = await generateInternalEstimate(project, budget, answers, estimate);
    } catch (err) {
      console.error("generateInternalEstimate failed:", err);
    }
  }

  // Persist before emailing so a lead is never lost if email delivery fails.
  await saveLead({ name, email, project, budget, answers, estimate, internal });

  const internalText = internal
    ? `INTERNAL - not shown to the client
Suggested price: ${internal.priceRangeNzd}
Effort: ${internal.effort} (${internal.confidence} confidence)
Rationale: ${internal.rationale}
Risks:
${internal.risks.map((r) => `- ${r}`).join("\n")}`
    : `INTERNAL - price estimate could not be generated; work it out manually.`;

  const text = `Project enquiry from ${name} (${email})
Budget: ${budget || "Not provided"}
Estimated size: ${estimate.sizeTier} - ${estimate.timeline}

${internalText}

Project:
${project}

Answers:
${answers.map((a) => `${a.question}\n${a.answer || "(no answer)"}`).join("\n\n")}

AI summary:
${estimate.summary}`;

  const { error } = await resend.emails.send({
    from: "StackLabs <noreply@stacklabs.co.nz>",
    to: "hello@stacklabs.co.nz",
    replyTo: email,
    subject: `Project enquiry from ${name} (${estimate.sizeTier})`,
    html: emailHtml(name, email, project, budget, answers, estimate, internal),
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  // Best-effort confirmation to the visitor - never block the lead on this.
  try {
    await resend.emails.send({
      from: "StackLabs <noreply@stacklabs.co.nz>",
      to: email,
      replyTo: "hello@stacklabs.co.nz",
      subject: "Thanks - we've got your project",
      html: confirmationHtml(name, estimate),
      text: `Thanks, ${name} - we've got your project details and the rough estimate (${estimate.sizeTier}, ${estimate.timeline}). We'll be in touch soon.\n\nThis is a rough estimate, not a quote. Reply any time or reach us at hello@stacklabs.co.nz.\n\nStackLabs · stacklabs.co.nz`,
    });
  } catch (err) {
    console.error("Confirmation email failed:", err);
  }

  return NextResponse.json({ success: true });
}
