import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "How Much Does Custom Software Cost in NZ?",
  description:
    "An honest guide to custom software and app development costs in New Zealand: typical price ranges, what actually drives the cost, and how to keep it down.",
  alternates: { canonical: "/how-much-does-software-cost" },
};

// Review these bands before publishing — they set price expectations for enquiries.
const tiers = [
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

const drivers = [
  {
    title: "How many kinds of user it has",
    body: "An app for one type of user is one app. Add customers, staff and admins, each with their own screens and permissions, and you're building several connected apps.",
  },
  {
    title: "Integrations",
    body: "Every external system you connect to — Xero, a payment provider, a legacy database — adds work, and the messiness of the other system matters more than your own.",
  },
  {
    title: "Accounts, payments and permissions",
    body: "Login, billing and role-based access are largely solved problems with modern tooling, but they still add scope. A tool without accounts is dramatically cheaper than one with them.",
  },
  {
    title: "Real-time, offline and sync",
    body: "\"It should update live\" and \"it should work without internet\" sound like small asks. They're two of the biggest cost multipliers in software.",
  },
  {
    title: "How settled the idea is",
    body: "A clear, decided scope is cheap to build. A scope that changes weekly is expensive no matter who builds it. This is the driver you have the most control over.",
  },
  {
    title: "Platforms and publishing",
    body: "Web only is the cheapest start. Native mobile apps and app-store publishing add real work — often deferrable until the idea is proven.",
  },
];

const faqs = [
  {
    q: "How much does it cost to build an app in New Zealand?",
    a: "As a rough guide: a focused prototype typically lands between $8k and $30k NZD, a complete product with several features between $30k and $90k, and complex multi-part systems upwards of $90k. The honest answer is that it depends almost entirely on scope — which is why we scope before we quote.",
  },
  {
    q: "Why won't developers give a fixed price up front?",
    a: "A fixed price on a vague scope is a guess with a margin baked in — you either overpay for the padding or the project fights over every change. A short scoping exercise first means the number you get is grounded in the actual work.",
  },
  {
    q: "What's the cheapest way to get a software idea off the ground?",
    a: "Build the smallest thing that can test the idea with real users: one platform, managed infrastructure, and no features that aren't needed for the test. Skip accounts, native apps and integrations until the idea has earned them. That's what our rapid prototyping engagements are.",
  },
  {
    q: "Is it cheaper to use a no-code tool instead?",
    a: "Often, yes — and we'll tell you when it is. No-code is a great way to test a workflow. Custom software earns its cost when you hit the walls: integrations no-code can't reach, performance, ownership of your data, or a product you intend to sell.",
  },
  {
    q: "What happens to the code if we stop working together?",
    a: "It's yours. You own the code and the infrastructure accounts from day one, so you can take it to another developer or an in-house team at any point.",
  },
];

export default function CostGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <section className="content-page">
          <div className="container content-inner">
            <div className="content-intro">
              <p className="hero-location">A straight answer, as far as one exists</p>
              <h1>How much does custom software cost in NZ?</h1>
              <p className="content-lead">
                Most studios won&apos;t publish numbers. We&apos;d rather give you an honest
                range and explain what moves it, so you can work out whether your idea and
                your budget are in the same room before anyone gets on a call.
              </p>
            </div>

            <div className="content-prose">
              <section>
                <h2>The short answer</h2>
                <p>
                  For a small, senior New Zealand studio like ours, most projects land in one
                  of three bands. These are honest ballparks, not quotes — every project is
                  different, and the drivers below explain why.
                </p>
              </section>
            </div>

            <div className="cost-tiers">
              {tiers.map((tier) => (
                <div className="cost-tier" key={tier.name}>
                  <div className="cost-tier-head">
                    <h3>{tier.name}</h3>
                    <span className="cost-tier-range">{tier.range}</span>
                  </div>
                  <p className="cost-tier-scope">{tier.scope}</p>
                  <p className="cost-tier-timeline">{tier.timeline}</p>
                  <p className="cost-tier-example">{tier.example}</p>
                </div>
              ))}
            </div>

            <div className="content-prose">
              <section>
                <h2>What actually drives the cost</h2>
                <p>
                  Two ideas that sound the same size in a sentence can be five times apart in
                  cost. These are the things that move the number most, roughly in order.
                </p>
              </section>
            </div>

            <div className="driver-list">
              {drivers.map((d) => (
                <div className="driver" key={d.title}>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </div>
              ))}
            </div>

            <div className="content-prose">
              <section>
                <h2>How to keep the cost down</h2>
                <p>
                  The biggest saving isn&apos;t negotiating the rate — it&apos;s cutting scope
                  before the build starts. Start web-only even if you want an app eventually.
                  Skip login until you have users worth logging in. Use managed services
                  instead of custom infrastructure. Build one workflow well instead of six
                  workflows badly.
                </p>
                <p>
                  This is exactly what our{" "}
                  <Link href="/services/rapid-prototyping">rapid prototyping</Link> engagements
                  are for: the smallest build that can test the idea, so the bigger spend only
                  happens once the idea has earned it. If the prototype proves out,{" "}
                  <Link href="/services/prototype-to-production">taking it to production</Link>{" "}
                  is a decision you make with evidence, not hope.
                </p>
              </section>
              <section>
                <h2>When you shouldn&apos;t build custom software</h2>
                <p>
                  Sometimes the right answer is a spreadsheet, an off-the-shelf product, or a
                  no-code tool — and it&apos;s cheaper for everyone if that&apos;s said early.
                  If your workflow is standard, your volumes are small, and you don&apos;t need
                  to own the product, custom software is probably premature. We&apos;ll tell
                  you if that&apos;s what we see.
                </p>
              </section>
            </div>

            <section className="faq" aria-label="Frequently asked questions">
              <h2>Common questions</h2>
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </section>

            <div className="content-cta">
              <h2>Want a number for your actual idea?</h2>
              <p>
                Describe your project and get a rough sense of size and timeline in about
                three minutes — no call, no obligation.
              </p>
              <Link href="/estimate" className="btn btn-primary">
                Get a rough estimate
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
