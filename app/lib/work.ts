// Single source of truth for case studies. Used by the /work index,
// the /work/[slug] pages, and the sitemap - edit copy here, not in the pages.

export interface CaseStudyFact {
  label: string;
  value: string;
}

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyImage {
  src: string;
  alt: string;
  caption: string;
  /** Aspect ratio as width/height, used to reserve layout space. */
  width: number;
  height: number;
  /** "phone" renders as a narrow phone-framed shot instead of a browser window. */
  variant?: "phone";
}

export interface CaseStudyImageBlock {
  /** Zero-based index of the paragraph this block appears after. */
  afterParagraph: number;
  shot: CaseStudyImage;
}

export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
  imageBlocks?: CaseStudyImageBlock[];
}

export interface CaseStudy {
  slug: string;
  name: string;
  category: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  card: string;
  lead: string;
  liveUrl?: string;
  tech: string[];
  metrics?: CaseStudyMetric[];
  facts: CaseStudyFact[];
  sections: CaseStudySection[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "jp-electrics",
    name: "JP Electrics",
    category: "Website & local SEO",
    headline: "A modern, fast website built to grow a Waikato electrical business",
    metaTitle: "JP Electrics — Website & SEO Case Study",
    metaDescription:
      "How StackLabs built JP Electrics a modern, fast, SEO-optimised website and ran Google Ads — together driving 195K search impressions and over 200 leads across Hamilton and the Waikato.",
    card: "A fast, good-looking website for a Master Electrician, with SEO and Google Ads behind it. Together they brought in 195K organic impressions and over 200 leads.",
    lead: "JP Electrics are Master Electricians working around Hamilton and the wider Waikato. James wanted more work coming in, and he knew the website had a job to do: look the part, load quickly, and actually turn up when someone nearby googles for an electrician.",
    liveUrl: "https://www.jpelectrics.nz/",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Static export", "Vercel", "Schema.org", "Google Ads"],
    metrics: [
      { value: "200+", label: "leads via calls & contact form" },
      { value: "195K", label: "organic search impressions" },
      { value: "3×", label: "growth in monthly impressions" },
    ],
    facts: [
      { label: "Client", value: "JP Electrics Ltd, Hamilton" },
      { label: "Type", value: "Website, SEO & Google Ads" },
      { label: "Goal", value: "Grow the business — win more local work" },
      { label: "Hosting", value: "Fully static — fast and nearly free to run" },
    ],
    sections: [
      {
        heading: "The brief",
        paragraphs: [
          "James wanted to grow the business. For a trade like his, most new jobs start with a Google search: someone types in \"electrician near me\", looks at the first few results, and rings whoever seems most trustworthy. If your site is slow or dated, or it just doesn't show up, you never even get the call.",
          "So what he needed was fairly clear. A good-looking, fast website that shows up when people search, and does enough to make them pick up the phone.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "We built the site in Next.js and shipped it as static pages, so it loads almost instantly. That's good for anyone checking it on their phone, and Google likes fast sites too, so it helps with ranking.",
          "SEO wasn't an afterthought. Each type of work James does — residential, commercial, heat pumps, EV chargers, solar — got its own page, written around what people actually search for. We also added the behind-the-scenes structured data that tells Google what the business does, where it works, and when it's open, and kept it in sync with his Google Business Profile so the map listing and the site say the same thing.",
          "His business details all live in one place in the code, so keeping the site up to date is a quick edit rather than a rebuild.",
        ],
        imageBlocks: [
          {
            afterParagraph: 0,
            shot: {
              src: "/work/jp-electrics/home.webp",
              alt: "JP Electrics homepage hero with the headline 'Trusted Hamilton & Waikato Master Electricians', a free quote button, and a photo of the JP Electrics ute on site",
              caption:
                "The homepage: who they are, where they work, and a way to get a quote - all in the first screen.",
              width: 1840,
              height: 1100,
            },
          },
          {
            afterParagraph: 1,
            shot: {
              src: "/work/jp-electrics/gallery.webp",
              alt: "JP Electrics gallery page showing completed electrical work filtered by category - lighting design, bathrooms, heat pumps, solar and more",
              caption:
                "A filterable gallery of finished jobs. Nothing sells quality workmanship like photos of it.",
              width: 1840,
              height: 1300,
            },
          },
        ],
      },
      {
        heading: "Ads while the SEO caught up",
        paragraphs: [
          "Ranking well on Google is great, but it takes months to build. In the meantime you still want to show up the day someone needs an electrician, so we ran Google Ads as well. The ads put JP Electrics in front of people straight away while the organic rankings climbed.",
          "As those rankings grew, more of the traffic started coming in for free, and the ads had to do less of the work.",
        ],
      },
      {
        heading: "How it went",
        paragraphs: [
          "It worked. Over about six months the site went from a few hundred Google impressions a day to closer to a thousand — roughly triple — as the SEO kicked in, for around 195,000 impressions in total.",
          "More to the point, it brought in work. Between the ads and the search growth, JP Electrics got over 200 leads — phone calls and messages through the contact form from people looking to hire.",
        ],
        imageBlocks: [
          {
            afterParagraph: 1,
            shot: {
              src: "/work/jp-electrics/contact.webp",
              alt: "JP Electrics contact page with phone, email and address details alongside a simple contact form",
              caption:
                "The contact page - where a good chunk of those 200+ leads came through.",
              width: 1840,
              height: 1100,
            },
          },
        ],
      },
    ],
  },
  {
    slug: "infratrack",
    name: "InfraTrack",
    category: "Product platform",
    headline: "An inspection platform for physical infrastructure",
    metaTitle: "InfraTrack — Asset Inspection Platform Case Study",
    metaDescription:
      "How StackLabs built InfraTrack: a multi-organisation platform for inspecting physical infrastructure — QR-coded assets, configurable surveys with branching logic, and automatic reporting.",
    card: "A platform for inspecting physical assets out in the field: QR codes on the asset, digital surveys that branch, and reports that write themselves.",
    lead: "If you're responsible for inspecting a lot of physical kit spread across sites, it usually means clipboards, spreadsheets, and PDFs that are out of date the moment you save them. InfraTrack pulls all of that into one place: every asset on a map, a QR code stuck on the asset itself, and inspections that turn straight into reports.",
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Google Maps", "PDF generation", "Docker", "Sentry"],
    facts: [
      { label: "Type", value: "Product build — multi-tenant web platform" },
      { label: "Access", value: "Multiple organisations, role-based permissions" },
      { label: "Delivery", value: "Dockerised, with Sentry error monitoring" },
      { label: "In the field", value: "QR-coded assets, no-login inspection links" },
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "The people who look after physical infrastructure usually run their inspections on paper or in spreadsheets. The asset records sit in one place, the inspection history in another, and nothing really ties the thing in the field to its paperwork. So inspections slip through the cracks, follow-up jobs get forgotten, and putting a report together is a manual slog.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "At the heart of it is an asset register — every asset with its location, make, capacity, and inspection history, all shown on a map. Each asset gets a QR code. Scan it out in the field and the right inspection opens for the right asset, with no hunting around and no login to deal with. Inspectors get in through secure links that expire, so they don't need an account just to do their job.",
          "The inspections themselves are built in a drag-and-drop editor, and they branch: the answer to one question decides what gets asked next, so a failed check digs into the detail while a pass just moves on. Inspectors take photos on their phone as they go.",
          "Once an inspection's done, InfraTrack builds the report and emails it to whoever needs it. Anything that gets flagged turns into a follow-up job that's tracked until it's sorted, and the whole lot exports to Excel.",
        ],
        imageBlocks: [
          {
            afterParagraph: 0,
            shot: {
              src: "/work/infratrack/dashboard.webp",
              alt: "InfraTrack dashboard showing asset health totals, a satellite map with asset pins, an asset list, and a recent inspection activity feed",
              caption:
                "The dashboard: every asset on a map with its health at a glance, and inspections rolling in on the right.",
              width: 1838,
              height: 1092,
            },
          },
          {
            afterParagraph: 1,
            shot: {
              src: "/work/infratrack/survey-builder.webp",
              alt: "InfraTrack survey builder showing question nodes connected by branching logic between categories",
              caption:
                "The drag-and-drop survey builder. Answers decide what gets asked next - a failed check digs deeper, a pass moves on.",
              width: 1843,
              height: 1099,
            },
          },
          {
            afterParagraph: 1,
            shot: {
              src: "/work/infratrack/mobile-survey.webp",
              alt: "InfraTrack inspection survey on a phone showing a multiple-choice question with an add photo button",
              caption: "The same survey out in the field - one question at a time on a phone.",
              width: 579,
              height: 460,
              variant: "phone",
            },
          },
          {
            afterParagraph: 2,
            shot: {
              src: "/work/infratrack/asset-detail.webp",
              alt: "InfraTrack asset page for a timber water tank showing health status, inspection dates, remedial actions, documents, and asset details with a photo",
              caption:
                "An asset's page: health status, inspection dates, remedial actions and documents, all against the thing itself.",
              width: 1851,
              height: 1047,
            },
          },
        ],
      },
      {
        heading: "The tricky parts",
        paragraphs: [
          "A lot of the build was shaped by the fact that several organisations share the platform, each with their own assets, surveys, and users, walled off from each other. The public inspection links were the fiddly bit. They had to be dead simple for someone standing out in a paddock, but still secure, still expire, and still be easy to shut off.",
          "It's a good example of what actually taking something to production involves. Not just the features, but the error monitoring, a clean way to deploy it, and the boring-but-important data model that makes sure a QR code on a tank always opens the right survey.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
