import { NextResponse } from "next/server";
import { generateEstimate, LIMITS, type QA } from "../../../lib/estimate";
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
  let answers: QA[];
  try {
    const body = await req.json();
    project = String(body.project ?? "").trim();
    budget = String(body.budget ?? "").trim();
    answers = Array.isArray(body.answers)
      ? body.answers.slice(0, 8).map((qa: { question?: unknown; answer?: unknown }) => ({
          question: String(qa.question ?? "").slice(0, LIMITS.answer),
          answer: String(qa.answer ?? "").slice(0, LIMITS.answer),
        }))
      : [];
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!project) {
    return NextResponse.json({ error: "Missing project description" }, { status: 400 });
  }
  if (project.length > LIMITS.project || budget.length > LIMITS.budget) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 });
  }

  try {
    const estimate = await generateEstimate(project, budget, answers);
    return NextResponse.json({ estimate });
  } catch (err) {
    console.error("generateEstimate failed:", err);
    return NextResponse.json({ error: "Could not generate estimate" }, { status: 502 });
  }
}
