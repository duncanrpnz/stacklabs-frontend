import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function emailHtml(name: string, email: string, project: string) {
  const escaped = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New enquiry from ${escaped(name)}</title>
</head>
<body style="margin:0;padding:0;background:#262c3d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#262c3d;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;">
              <span style="font-size:20px;font-weight:700;letter-spacing:-0.5px;color:#e8eaf0;">
                <span style="color:#5B7FF0;">Stack</span>Labs
              </span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#323a52;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:36px;">

              <!-- Title -->
              <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#5B7FF0;">New enquiry</p>
              <h1 style="margin:0 0 32px;font-size:22px;font-weight:700;color:#e8eaf0;letter-spacing:-0.4px;">${escaped(name)}</h1>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:0 0 28px;" />

              <!-- Email field -->
              <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#8892a4;">Email</p>
              <p style="margin:0 0 24px;font-size:15px;color:#e8eaf0;">
                <a href="mailto:${escaped(email)}" style="color:#5B7FF0;text-decoration:none;">${escaped(email)}</a>
              </p>

              <!-- Project field -->
              <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#8892a4;">What they're building</p>
              <p style="margin:0;font-size:15px;line-height:1.6;color:#e8eaf0;">${project ? escaped(project) : '<span style="color:#8892a4;">Not provided</span>'}</p>

              <!-- Reply CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                <tr>
                  <td style="background:#4a6ae8;border-radius:8px;">
                    <a href="mailto:${escaped(email)}" style="display:inline-block;padding:12px 24px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:-0.1px;">Reply to ${escaped(name)}</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;">
              <p style="margin:0;font-size:12px;color:#8892a4;">
                Sent from the contact form at
                <a href="https://stacklabs.co.nz" style="color:#8892a4;">stacklabs.co.nz</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
  const { name, email, project } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "StackLabs <noreply@stacklabs.co.nz>",
    to: "hello@stacklabs.co.nz",
    replyTo: email,
    subject: `New enquiry from ${name}`,
    html: emailHtml(name, email, project ?? ""),
    text: `New enquiry from ${name}\n\nEmail: ${email}\n\nWhat they're building:\n${project || "Not provided"}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
