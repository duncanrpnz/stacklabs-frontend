import { NextResponse } from "next/server";
import { generateQuestions, LIMITS } from "../../../lib/estimate";
import { guardAi } from "../../../lib/rate-limit";

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY is not set");
    return NextResponse.json({ error: "Estimator is not configured" }, { status: 500 });
  }

  const limited = await guardAi(req);
  if (limited) return limited;

  let project: string;
  let budget: string;
  let honeypot: string;
  try {
    const body = await req.json();
    project = String(body.project ?? "").trim();
    budget = String(body.budget ?? "").trim();
    honeypot = String(body.website ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot - a real user never fills the hidden "website" field.
  if (honeypot) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  if (!project) {
    return NextResponse.json({ error: "Please describe your project" }, { status: 400 });
  }
  if (project.length > LIMITS.project || budget.length > LIMITS.budget) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 });
  }

  try {
    const { questions } = await generateQuestions(project, budget);
    return NextResponse.json({ questions });
  } catch (err) {
    console.error("generateQuestions failed:", err);
    return NextResponse.json({ error: "Could not generate questions" }, { status: 502 });
  }
}
