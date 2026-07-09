// Published price bands - single source of truth. Shown on the public cost
// guide AND fed to the internal pricing prompt in estimate.ts, so a change
// here updates both. Review these roughly yearly.

export interface PriceTier {
  name: "Small" | "Medium" | "Large";
  scope: string;
  timeline: string;
  range: string;
  example: string;
}

export const priceTiers: PriceTier[] = [
  {
    name: "Small",
    scope: "A focused prototype or a single, well-defined feature",
    timeline: "2–5 weeks",
    range: "$8k – $30k NZD",
    example:
      "A working prototype of a booking tool, a customer portal MVP, or one substantial feature added to an existing system.",
  },
  {
    name: "Medium",
    scope: "A complete product or app with several features and a few integrations",
    timeline: "6–12 weeks",
    range: "$30k – $90k NZD",
    example:
      "A customer-facing web app with accounts, payments and an admin area, or a mobile app connected to your existing systems.",
  },
  {
    name: "Large",
    scope: "A complex, multi-part system with multiple integrations or scale requirements",
    timeline: "3+ months",
    range: "$90k+ NZD",
    example:
      "A platform with several user types, real-time features, third-party integrations, or serious compliance requirements.",
  },
];

export function priceBandsForPrompt(): string {
  return priceTiers
    .map((t) => `- ${t.name} (${t.scope.toLowerCase()}, typically ${t.timeline}): ${t.range}`)
    .join("\n");
}
