// Single source of truth for the four services. Used by the homepage cards,
// the /services/[slug] pages, and the sitemap - edit copy here, not in the pages.

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
  /** Slug of a case study in work.ts that shows this service in practice. */
  caseStudySlug?: string;
}

export const services: Service[] = [
  {
    slug: "websites",
    num: "01",
    title: "Websites",
    metaTitle: "Website Design & Development, Hamilton & Waikato",
    metaDescription:
      "StackLabs builds fast, good-looking websites for New Zealand businesses - built to show up on Google and turn visitors into phone calls. Based in Cambridge, Waikato.",
    card: "A fast, good-looking website that shows up when people search for what you do. Built to bring work in, not just to sit there looking tidy.",
    lead: "For most businesses the website is the first thing a customer sees, and the reason they either ring you or ring someone else. We build sites that load fast, look the part, and turn up on Google when someone nearby is looking for what you do.",
    timeline: "Typically 2–6 weeks",
    caseStudySlug: "jp-electrics",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "A website that does a job. For a lot of businesses - trades, clinics, consultants, anyone who gets work locally - that job is simple: show up when someone searches, look trustworthy enough that they get in touch, and make getting in touch easy.",
          "We build them as proper custom sites rather than a dragged-together template. That means they load fast, they work properly on a phone, and you're not paying a monthly fee to a page builder forever. Static hosting for a site like this costs close to nothing to run.",
        ],
      },
      {
        heading: "Showing up on Google",
        paragraphs: [
          "SEO isn't a bolt-on at the end, it's most of the reason the site exists. Each thing you do gets its own page, written around what people actually type into Google rather than what you'd call it internally. Behind the scenes we add the structured data that tells Google what your business does, where it works and when it's open, and keep it in sync with your Google Business Profile so the map listing and the site agree.",
          "Rankings take months to build, though. If you need the phone to ring sooner than that, Google Ads can cover the gap while the organic side catches up - that's what we did for JP Electrics, and it's usually the right call when you're starting from nothing.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "We start by working out who you're trying to reach and what they search for. Then we write the pages around that, build the site, and get it live. You see it as it comes together rather than at a big reveal at the end.",
          "Your business details live in one place in the code, so changing your hours or adding a service is a quick edit, not a rebuild. You own the site and everything in it.",
        ],
      },
    ],
    goodFit: [
      "Local businesses who get most of their work through Google searches",
      "Anyone stuck on a slow, dated site that never turns up in results",
      "Businesses paying monthly for a page builder they've outgrown",
    ],
    deliverables: [
      "A fast custom site you own outright, built to rank",
      "A page for each service, written around real search terms",
      "Structured data and Google Business Profile kept in sync",
    ],
  },
  {
    slug: "rapid-prototyping",
    num: "02",
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
          "We build it as real, working software - not a clickable mockup - so the feedback you get is feedback on the real thing. But we build it lean: one platform, managed infrastructure, and only the features needed to run the test.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "We start with a short scoping conversation to agree on what the prototype needs to prove. Then we build in weekly increments, with something you can click on from the first week or two. You see progress as it happens and can steer while the cost of changing direction is still low.",
          "At the end you own the code, and you have real evidence to decide what comes next - carry on to production, adjust the idea, or stop before spending more. All three are good outcomes.",
        ],
      },
      {
        heading: "Why prototype first",
        paragraphs: [
          "Most software projects that go wrong don't fail on the code - they fail because the wrong thing got built. A prototype is the cheapest insurance against that. It also makes any production build that follows cheaper and better scoped, because the guesswork is gone.",
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
    num: "03",
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
          "If we built your prototype, we already know where the shortcuts are - we take stock together and agree what needs hardening, what needs rebuilding, and what's fine as it is. If someone else built it (or it started life in a no-code tool), we begin with a short technical review so the plan is grounded in what's actually there.",
          "Then we work in the same weekly rhythm as a prototype build: visible progress, early conversations when scope needs to move, no surprises at the end.",
        ],
      },
      {
        heading: "What production-ready actually means",
        paragraphs: [
          "It's a spectrum, not a checkbox. A tool used by five staff has different needs to a customer-facing app with payments. We're explicit about which level you're paying for and why, so you're not funding resilience you don't need - or missing resilience you do.",
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
    caseStudySlug: "infratrack",
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
          "Plenty of businesses have developers - internal, contract or offshore - but nobody senior enough to make the calls that are expensive to get wrong: architecture, technology choices, hiring, and whether the work being delivered is actually good.",
          "We fill that gap as a fractional technical lead. You get senior judgement when decisions come up, without the cost of a full-time CTO you don't yet need.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "The shape depends on the team. For some it's reviewing pull requests and holding a weekly technical check-in. For others it's owning the architecture, running the delivery process, and sitting in on hiring interviews. We agree the scope up front and adjust it as the team grows.",
          "The goal is always to make ourselves less necessary over time - building the practices and, eventually, helping hire the people that let the team stand on its own.",
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
