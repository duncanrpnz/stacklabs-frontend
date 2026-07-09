// Single source of truth for the four services. Used by the homepage cards,
// the /services/[slug] pages, and the sitemap — edit copy here, not in the pages.

export interface ServiceSection {
  heading: string;
  paragraphs: string[];
}

export interface Service {
  slug: string;
  num: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  card: string;
  lead: string;
  timeline: string;
  sections: ServiceSection[];
  goodFit: string[];
  deliverables: string[];
}

export const services: Service[] = [
  {
    slug: "rapid-prototyping",
    num: "01",
    title: "Rapid Prototyping",
    metaTitle: "Rapid Prototyping & MVP Development",
    metaDescription:
      "Working software in 4 to 8 weeks. StackLabs builds prototypes and MVPs for NZ founders so you can test an idea with real users before committing to a full build.",
    card: "We build working software quickly. Typically 4 to 8 weeks for a first version you can put in front of real users. The goal is to find out what works before committing to a full build.",
    lead: "Working software in front of real users in weeks, not months. The goal is to find out whether your idea holds up before you commit serious money to it.",
    timeline: "Typically 4–8 weeks",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "A prototype is the smallest version of your product that can answer the question you actually have: will people use this? Will they pay for it? Does the workflow make sense outside your head?",
          "We build it as real, working software — not a clickable mockup — so the feedback you get is feedback on the real thing. But we build it lean: one platform, managed infrastructure, and only the features needed to run the test.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "We start with a short scoping conversation to agree on what the prototype needs to prove. Then we build in weekly increments, with something you can click on from the first week or two. You see progress as it happens and can steer while the cost of changing direction is still low.",
          "At the end you own the code, and you have real evidence to decide what comes next — carry on to production, adjust the idea, or stop before spending more. All three are good outcomes.",
        ],
      },
      {
        heading: "Why prototype first",
        paragraphs: [
          "Most software projects that go wrong don't fail on the code — they fail because the wrong thing got built. A prototype is the cheapest insurance against that. It also makes any production build that follows cheaper and better scoped, because the guesswork is gone.",
        ],
      },
    ],
    goodFit: [
      "Founders validating a product idea before raising or investing further",
      "Businesses testing whether an internal tool is worth building properly",
      "Teams that need something demonstrable for customers or investors soon",
    ],
    deliverables: [
      "Working software your users can actually use",
      "Full ownership of the code and infrastructure",
      "A clear, honest recommendation on what to do next",
    ],
  },
  {
    slug: "prototype-to-production",
    num: "02",
    title: "Prototype to Production",
    metaTitle: "Prototype to Production Development",
    metaDescription:
      "StackLabs takes validated prototypes to production: proper architecture, test coverage and deployment pipelines, so your software can carry real users and real stakes.",
    card: "If the prototype proves out, we take it further. Proper architecture, test coverage, deployment pipelines. Everything required to run software people actually depend on.",
    lead: "A prototype proves the idea. Production is where people actually depend on it. We build the version that can carry real users, real data and real stakes.",
    timeline: "Typically 6–12 weeks",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Production software has different obligations to a prototype: it has to stay up, keep data safe, handle the awkward edge cases, and be maintainable by whoever works on it after us. This engagement is about meeting those obligations without gold-plating things that don't matter yet.",
          "That means proper architecture where it counts, automated tests around the behaviour that matters, deployment pipelines so releases are boring, and monitoring so problems surface before your users tell you about them.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "If we built your prototype, we already know where the shortcuts are — we take stock together and agree what needs hardening, what needs rebuilding, and what's fine as it is. If someone else built it (or it started life in a no-code tool), we begin with a short technical review so the plan is grounded in what's actually there.",
          "Then we work in the same weekly rhythm as a prototype build: visible progress, early conversations when scope needs to move, no surprises at the end.",
        ],
      },
      {
        heading: "What production-ready actually means",
        paragraphs: [
          "It's a spectrum, not a checkbox. A tool used by five staff has different needs to a customer-facing app with payments. We're explicit about which level you're paying for and why, so you're not funding resilience you don't need — or missing resilience you do.",
        ],
      },
    ],
    goodFit: [
      "Teams whose prototype or MVP proved out and now has real users arriving",
      "Businesses that have outgrown a no-code tool or an early codebase",
      "Products where downtime or data loss has started to actually cost money",
    ],
    deliverables: [
      "Production architecture, test coverage and deployment pipelines",
      "Monitoring and alerting appropriate to your stakes",
      "Documentation and a codebase another developer could pick up",
    ],
  },
  {
    slug: "product-strategy",
    num: "03",
    title: "Product Strategy",
    metaTitle: "Product Strategy for Software Teams",
    metaDescription:
      "StackLabs helps NZ founders and teams work out what to build next and why — so engineering effort goes into the work that actually moves the product forward.",
    card: "Sometimes the problem isn't the code, it's the roadmap. We help teams work out what to build next and why, so engineering effort goes toward work that actually matters.",
    lead: "Sometimes the problem isn't the code, it's the roadmap. We help you work out what to build next and why, so engineering effort goes into work that actually matters.",
    timeline: "From a one-off session to ongoing involvement",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Most teams don't have a shortage of ideas — they have a shortage of confidence about which idea to do first. Product strategy work is about turning a pile of possibilities into a sequenced plan with reasons attached.",
          "Because we build software ourselves, the advice stays honest about cost. A roadmap is only useful if each step on it is actually buildable in the time and budget you have.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "It usually starts with a working session: what you're trying to achieve commercially, what you've built so far, what's in the backlog, and what your users are actually doing. From there we help you cut the list, sequence it, and — just as important — write down what you're deliberately not doing and why.",
          "Some clients need one session to get unstuck. Others keep us involved as a sounding board, revisiting the plan as real usage data comes in.",
        ],
      },
    ],
    goodFit: [
      "Founders with more ideas than budget who need to sequence ruthlessly",
      "Teams where engineering is busy but the product isn't moving forward",
      "Businesses deciding between fixing what exists and building something new",
    ],
    deliverables: [
      "A sequenced roadmap with the reasoning written down",
      "Clear scope for the next build phase, ready to estimate",
      "An explicit list of what you're not doing, and why",
    ],
  },
  {
    slug: "technical-leadership",
    num: "04",
    title: "Technical Leadership",
    metaTitle: "Fractional CTO & Technical Leadership",
    metaDescription:
      "Senior technical leadership for NZ teams without a CTO: architecture decisions, code review and delivery oversight from StackLabs, Cambridge.",
    card: "For teams without a CTO or senior technical lead, we can step into that role: making architecture decisions, reviewing work, and keeping delivery on track.",
    lead: "For teams without a CTO or senior technical lead, we step into that role: making architecture decisions, reviewing work, and keeping delivery on track.",
    timeline: "Ongoing, typically a few hours to a few days per week",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Plenty of businesses have developers — internal, contract or offshore — but nobody senior enough to make the calls that are expensive to get wrong: architecture, technology choices, hiring, and whether the work being delivered is actually good.",
          "We fill that gap as a fractional technical lead. You get senior judgement when decisions come up, without the cost of a full-time CTO you don't yet need.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "The shape depends on the team. For some it's reviewing pull requests and holding a weekly technical check-in. For others it's owning the architecture, running the delivery process, and sitting in on hiring interviews. We agree the scope up front and adjust it as the team grows.",
          "The goal is always to make ourselves less necessary over time — building the practices and, eventually, helping hire the people that let the team stand on its own.",
        ],
      },
    ],
    goodFit: [
      "Businesses managing contractors or an offshore team without technical oversight",
      "Funded startups that need CTO-level judgement before a CTO-level hire",
      "Teams whose delivery has slowed and can't tell if it's the code or the process",
    ],
    deliverables: [
      "Architecture and technology decisions made and documented",
      "Regular review of work being delivered, with honest feedback",
      "A delivery process the team can eventually run without us",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
