// Single source of truth for insights posts. Used by the /insights index,
// the /insights/[slug] pages, and the sitemap - edit copy here, not in the pages.
//
// Paragraph strings support minimal inline links: [text](/path). Internal
// paths render as <Link>, absolute URLs as plain anchors.

export interface InsightCard {
  title: string;
  body: string;
}

export interface InsightSection {
  heading: string;
  paragraphs: string[];
  /** Renders a driver-style card grid after the paragraphs. */
  cards?: InsightCard[];
  /** Renders the published price bands from pricing.ts after the paragraphs. */
  showPriceTiers?: boolean;
}

export interface InsightFaq {
  q: string;
  a: string;
}

export interface InsightPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Short topic label shown on cards and the post breadcrumb. */
  category: string;
  /** ISO date, e.g. "2026-07-14". */
  published: string;
  /** Card blurb on the /insights index. */
  card: string;
  lead: string;
  sections: InsightSection[];
  faqs?: InsightFaq[];
}

export const insightPosts: InsightPost[] = [
  {
    slug: "how-to-scope-a-software-project",
    title: "How to scope a software project (so the quote you get means something)",
    metaTitle: "How to Scope a Software Project — A Practical Guide",
    metaDescription:
      "Why quotes for the same software idea come back five times apart, the questions a real scope answers, and how to write a one-page brief that gets you numbers you can trust.",
    category: "Scoping & cost",
    published: "2026-07-14",
    card: "Get three quotes for the \"same\" idea and they can come back five times apart. It's almost never the rate - it's what each developer reckons you meant. Here's how to scope so the numbers actually mean something.",
    lead: "Ask three developers to quote the same one-sentence idea and you'll get three numbers that look like they're for three different projects. They are. Each one built a different product in their head and priced that. Scoping is how you make sure everyone - you included - is pricing the same thing.",
    sections: [
      {
        heading: "Why quotes for the \"same\" project are five times apart",
        paragraphs: [
          "\"A booking app for my business\" sounds like a project, but it's really just a starting point. Does it take payments? Do staff get their own login? Does it talk to your calendar? Does it need to work on a phone in a paddock with no reception? Every developer answers those questions differently in their head, and those answers move the price a lot more than anyone's hourly rate does.",
          "So a wide spread of quotes usually doesn't mean someone's having you on. It means the scope was vague enough that everyone quoted a different product. Getting more quotes won't fix that - tightening the scope will.",
        ],
      },
      {
        heading: "The questions a scope actually answers",
        paragraphs: [
          "A useful scope isn't a technical document, and it doesn't need a single line of jargon. It answers a handful of plain-English questions - roughly these, in order of how much they move the price.",
        ],
        cards: [
          {
            title: "Who uses it?",
            body: "One kind of user is one app. Customers plus staff plus admins, each with their own screens and permissions, is really several apps joined together. Write down every type of person who logs in.",
          },
          {
            title: "What's the one core workflow?",
            body: "Describe the single most important journey from start to finish - \"a customer books a time, pays a deposit, and we both get a text.\" Everything else can wait until this bit works.",
          },
          {
            title: "What does it connect to?",
            body: "Xero, Stripe, your existing database, a supplier's system. Every integration adds work, and the older and messier the other system, the more it adds. List the lot, even the obvious ones.",
          },
          {
            title: "What's day one vs. later?",
            body: "The cheapest feature is the one you put off. Split the list into \"can't launch without it\" and \"once it's proven\". Be hard on this - most first versions ship with half of what was first imagined, and nobody misses the rest.",
          },
          {
            title: "What does done look like?",
            body: "\"Done\" might be ten staff using it every day, a hundred paying customers, or one good investor demo. Knowing the finish line changes how much polish and scale the build actually needs.",
          },
          {
            title: "What would you cut first?",
            body: "If the budget only stretched to 70% of the list, what goes? Decide now and a mid-project crisis turns into a five-minute chat.",
          },
        ],
      },
      {
        heading: "Where scope lands in dollars",
        paragraphs: [
          "Once those questions have answers, most projects sort themselves into one of three bands. These are the same honest ballparks we publish in our full guide to [what custom software costs in NZ](/how-much-does-software-cost) - the scope is what tells you which band you're in, and which end of it.",
        ],
        showPriceTiers: true,
      },
      {
        heading: "How to write a one-page scope brief",
        paragraphs: [
          "You don't need a consultant or a 40-page requirements document. One page, written by you, gets you most of the way there. Ours would look like this: a couple of sentences on the problem and who has it. Every type of user. The core workflow written out as ten-odd plain steps. Every system it has to talk to. A \"not doing yet\" list - which matters as much as the feature list. And a budget band you'd actually be comfortable with.",
          "Sharing the budget feels like showing your hand. In practice it does the opposite of what people worry about: instead of a price inflated to your number, you get told straight whether your idea and your budget are anywhere near each other - and if they're not, what to cut so they are. The expensive outcome isn't paying 10% too much. It's three weeks of calls with the wrong-sized studio.",
        ],
      },
      {
        heading: "Red flags in the quotes that come back",
        paragraphs: [
          "The biggest one is a confident fixed price against a vague scope. That number is a guess with padding baked in - you'll either pay for the padding or spend the project arguing about every change. Close behind: a quote that turns up without a single question asked. If nobody asked who the users are or what it connects to, nobody knows what they're pricing.",
          "The quote you want comes back with questions, says what's excluded as clearly as what's included, and is happy to say \"we won't know this part until we've scoped it properly\". That's not dodging - it's the only honest way to put an early number on software.",
        ],
      },
    ],
    faqs: [
      {
        q: "How detailed should my scope be before I talk to developers?",
        a: "One page is plenty: the problem, every type of user, the core workflow in plain steps, the systems it connects to, a \"not doing yet\" list, and a budget band. A good studio will help you sharpen it from there - the point is that everyone quotes the same product, not that you spec every button.",
      },
      {
        q: "Should I pay for a scoping exercise?",
        a: "For anything beyond a small build, usually yes. A short paid scoping exercise - a week or two - turns a guess into a grounded number and a build plan you own, and you can take both to any developer. As insurance goes, it's cheap.",
      },
      {
        q: "What if I can't answer the technical questions?",
        a: "You're not meant to. Your job is the business answers: who uses it, what the workflow is, what it has to connect to, what done looks like. Turning those into technical decisions is the developer's job - be wary of anyone who makes the gap feel like your problem.",
      },
      {
        q: "Will telling developers my budget mean I get charged exactly that?",
        a: "With the wrong outfit, maybe - but the wrong outfit will overcharge you with or without the number. With an honest studio, the budget shapes the scope conversation: it decides what makes version one and what waits. Keeping it to yourself just pushes that conversation back a few weeks.",
      },
    ],
  },
];

export function getInsightPost(slug: string): InsightPost | undefined {
  return insightPosts.find((p) => p.slug === slug);
}

export function formatInsightDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
