import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import * as z from "zod/v4";
import { priceBandsForPrompt } from "./pricing";

// Lazily constructed so an unset ANTHROPIC_API_KEY never throws at import/build time.
// The routes guard on the env var before calling in.
let _client: Anthropic | null = null;
function anthropic(): Anthropic {
  if (!_client) _client = new Anthropic();
  return _client;
}

const MODEL = "claude-opus-4-8";

// The model occasionally double-escapes non-ASCII characters in structured output, so a JSON string
// that should hold "3–5 weeks" arrives as the literal text "3–5 weeks". Decode any such stray
// escapes in every string field before the value reaches a page or an email.
function decodeStrayEscapes<T>(value: T): T {
  if (typeof value === "string") {
    return value.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex: string) =>
      String.fromCharCode(parseInt(hex, 16)),
    ) as T;
  }
  if (Array.isArray(value)) {
    return value.map(decodeStrayEscapes) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, decodeStrayEscapes(v)]),
    ) as T;
  }
  return value;
}

// Input caps - this is a public endpoint, so keep payloads sane.
export const LIMITS = {
  project: 4000,
  budget: 200,
  answer: 2000,
} as const;

// Shared studio identity and voice.
const STUDIO_VOICE = `You work for StackLabs, a small software development studio in Cambridge, New
Zealand. StackLabs works with founders and growing teams to build real software. Services: Rapid
Prototyping, Prototype to Production, Product Strategy, and Technical Leadership.

Voice: direct, plain-English, no fluff, no hype. Honest about trade-offs. New Zealand spelling.`;

// Everything produced under this prompt is shown to the visitor, so it speaks to them directly.
const PUBLIC_SYSTEM = `${STUDIO_VOICE}

You are the project intake assistant. Everything you write here is shown directly to the visitor who
filled in the form - the person whose project this is. Address them directly as "you" and "your".
Never refer to them in the third person ("the prospect", "the client", "the user"). Never invent
specific dollar figures or quote prices.`;

// How we describe scope to visitors. The model maps a project onto one of these.
const SIZE_TIERS = `Size tiers:
- Small: a focused prototype or a single, well-defined feature. Typically ~2-5 weeks.
- Medium: a complete product or app with several features and a few integrations. Typically ~6-12 weeks.
- Large: a complex, multi-part system with multiple integrations or scale requirements. Typically 3+ months.`;

// How StackLabs actually delivers. Shared by the public estimate and the internal pricing prompt so
// both size the same project the same way - if only one prompt has this, their tiers drift apart.
const DELIVERY_CALIBRATION = `How StackLabs delivers (assume this when sizing):
- ONE senior developer using modern, managed tooling (e.g. Expo / React Native for cross-platform
  mobile, a managed backend like Supabase or Firebase). Do not over-count boilerplate - auth,
  storage, and deployment are largely solved by these tools.
- For single-user, personal, or "just to test" builds, do NOT assume login/account systems,
  multi-device sync, or App Store / Play Store publishing unless they actually asked for it. Assume
  the leanest viable delivery.
- Calibration anchor: a simple single-user, online-only mobile app (e.g. a personal notes app, plain
  CRUD, no extras) is about one week of work (~40 hours). Sanity-check your sizing against that - if
  you land far above it for a similarly simple brief, reconsider.`;

// ---------- Step 1: clarifying questions (shown to the visitor) ----------

const QuestionsSchema = z.object({
  questions: z
    .array(
      z.object({
        question: z.string(),
        hint: z.string(),
      }),
    )
    .describe("Exactly 4 clarifying questions."),
});

export type Questions = z.infer<typeof QuestionsSchema>;

export async function generateQuestions(project: string, budget: string): Promise<Questions> {
  const message = await anthropic().messages.parse({
    model: MODEL,
    max_tokens: 2000,
    thinking: { type: "adaptive" },
    system: PUBLIC_SYSTEM,
    output_config: { format: zodOutputFormat(QuestionsSchema) },
    messages: [
      {
        role: "user",
        content: `Someone has started a project enquiry on the StackLabs site.

Their project description:
"""
${project}
"""

Budget they gave: ${budget || "Not provided"}

Write EXACTLY 4 concise clarifying questions, addressed directly to them ("you"), that would help you
scope this work and give a rough size estimate. Make them specific to their project, not generic. Keep
them easy for a non-technical founder to answer. For each question include a short "hint" (one sentence,
also addressed to them) on why it matters or what kind of answer helps.`,
      },
    ],
  });

  if (!message.parsed_output) {
    throw new Error("Model did not return parseable questions");
  }
  return decodeStrayEscapes(message.parsed_output);
}

// ---------- Step 2: summary + estimate (shown to the visitor) ----------

const EstimateSchema = z.object({
  summary: z
    .string()
    .describe(
      'A plain-English summary written directly to the reader using "you" (e.g. "You\'re looking to build…"), 2–4 sentences.',
    ),
  sizeTier: z.enum(["Small", "Medium", "Large"]),
  timeline: z
    .string()
    .describe('A rough timeline range, e.g. "6-10 weeks". Use a plain hyphen in ranges, not an en dash.'),
  keyConsiderations: z
    .array(z.string())
    .describe("3 short bullets on the main things that will drive scope or risk."),
  assumptions: z
    .array(z.string())
    .describe("2–3 assumptions made to produce this estimate."),
  recommendedNextStep: z
    .string()
    .describe("One sentence on the suggested next step with StackLabs, addressed to the reader."),
});

export type Estimate = z.infer<typeof EstimateSchema>;

export interface QA {
  question: string;
  answer: string;
}

function qaBlock(answers: QA[]): string {
  return answers
    .map((qa, i) => `Q${i + 1}: ${qa.question}\nA${i + 1}: ${qa.answer || "(no answer)"}`)
    .join("\n\n");
}

export async function generateEstimate(
  project: string,
  budget: string,
  answers: QA[],
): Promise<Estimate> {
  const message = await anthropic().messages.parse({
    model: MODEL,
    max_tokens: 2000,
    thinking: { type: "adaptive" },
    system: `${PUBLIC_SYSTEM}\n\n${SIZE_TIERS}\n\n${DELIVERY_CALIBRATION}`,
    output_config: { format: zodOutputFormat(EstimateSchema) },
    messages: [
      {
        role: "user",
        content: `Produce a rough scoping estimate from this enquiry.

Their project description:
"""
${project}
"""

Budget they gave: ${budget || "Not provided"}

Their answers to your clarifying questions:
${qaBlock(answers)}

Summarise what they want to build, written directly to them ("You're looking to build…"), then map it
to a size tier and a rough timeline range. This is an early, rough estimate to set expectations before
a real conversation - base it on what they told you and state your assumptions. Do NOT give dollar
figures.`,
      },
    ],
  });

  if (!message.parsed_output) {
    throw new Error("Model did not return a parseable estimate");
  }
  return decodeStrayEscapes(message.parsed_output);
}

// ---------- Internal: price to charge (SERVER-ONLY - never returned to the browser) ----------
// This is generated server-side in the lead route and placed only into the email to StackLabs.
// It must never appear in any HTTP response to the client.

const InternalEstimateSchema = z.object({
  priceRangeNzd: z
    .string()
    .describe('Suggested price to charge the client for the base scope, in NZD, e.g. "$5,000 - $7,500".'),
  effort: z.string().describe('Rough build effort, e.g. "~40 hours (about 1 week)" or "3-4 weeks".'),
  rationale: z.string().describe("2–4 sentences on what is driving the number."),
  risks: z.array(z.string()).describe("2–3 things that could push the price up or add risk."),
  confidence: z.enum(["Low", "Medium", "High"]),
});

export type InternalEstimate = z.infer<typeof InternalEstimateSchema>;

export async function generateInternalEstimate(
  project: string,
  budget: string,
  answers: QA[],
  publicEstimate: Estimate,
): Promise<InternalEstimate> {
  const hourlyRate = process.env.STACKLABS_HOURLY_RATE_NZD;
  const rateBasis = hourlyRate
    ? `Price = your estimated effort in hours × a blended rate of NZD $${hourlyRate}/hour. Assume ~40 working hours per week.`
    : `Base the price on your estimated effort and typical rates for a small, senior New Zealand software studio.`;

  const message = await anthropic().messages.parse({
    model: MODEL,
    max_tokens: 2000,
    thinking: { type: "adaptive" },
    system: `${STUDIO_VOICE}

You are pricing a build internally for StackLabs. This is for StackLabs' eyes only - the client will
NEVER see it - so be candid, realistic, and commercial.

${DELIVERY_CALIBRATION}

How to price:
- ${rateBasis}
- Price ONLY the base scope as described. Add modest padding for project management and a round of
  revisions, but do NOT inflate the headline for worst-case scope creep or things they didn't ask for.
- Put scope creep, app-store onboarding, and future-proofing in "risks" as potential upside - never
  bake them into the base price.

${SIZE_TIERS}

Published price bands - these are public on stacklabs.co.nz, so the client may well have read them:
${priceBandsForPrompt()}

Consistency with what the client was told: the automated estimate already shown to the client is
included in the enquiry below. Check your price against the published band for THAT tier. If your
effort or price implies a different tier than the client saw, or falls outside the band for it, give
the honest number anyway - but flag the mismatch as the FIRST thing in your rationale so StackLabs
can address it when they reply.`,
    output_config: { format: zodOutputFormat(InternalEstimateSchema) },
    messages: [
      {
        role: "user",
        content: `Work out a rough price StackLabs could charge to build this.

Project description:
"""
${project}
"""

Budget the client gave: ${budget || "Not provided"}

Their answers to the clarifying questions:
${qaBlock(answers)}

The automated estimate the client has already been shown: ${publicEstimate.sizeTier} - ${publicEstimate.timeline}.

Give a realistic NZD price range to charge for the base scope, the build effort it implies, what is
driving the number, and the main risks that could move it (as upside, kept out of the headline).
Factor in their stated budget where relevant, but base the price on the actual work - say so if their
budget looks unrealistic for what they want.`,
      },
    ],
  });

  if (!message.parsed_output) {
    throw new Error("Model did not return a parseable internal estimate");
  }
  return decodeStrayEscapes(message.parsed_output);
}
