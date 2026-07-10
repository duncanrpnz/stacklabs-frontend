import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { caseStudies } from "../lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Recent StackLabs projects: real software built for real New Zealand businesses — what was asked for, what we built, and how it turned out.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <Header />
      <main>
        <section className="content-page">
          <div className="container content-inner">
            <div className="content-intro">
              <p className="hero-location">Work</p>
              <h1>Things we&apos;ve built</h1>
              <p className="content-lead">
                Real projects, told straight: what was asked for, what we built,
                what it cost the client in trade-offs, and how it turned out.
              </p>
            </div>

            <div className="work-list">
              {caseStudies.map((c, i) => (
                <Link href={`/work/${c.slug}`} className="work-card" key={c.slug}>
                  <div className="work-card-top">
                    <span className="work-card-index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="work-card-category">{c.category}</span>
                  </div>
                  <h2>{c.name}</h2>
                  <p className="work-card-headline">{c.headline}</p>
                  <p className="work-card-blurb">{c.card}</p>
                  <ul className="tech-chips" aria-label="Key technologies">
                    {c.tech.slice(0, 5).map((t) => (
                      <li className="tech-chip" key={t}>
                        {t}
                      </li>
                    ))}
                    {c.tech.length > 5 && (
                      <li className="tech-chip tech-chip-more">
                        +{c.tech.length - 5}
                      </li>
                    )}
                  </ul>
                  <span className="work-card-more">Read the case study →</span>
                </Link>
              ))}
            </div>

            <div className="content-cta">
              <h2>Got something like this in mind?</h2>
              <p>
                Describe your project and get a rough sense of size and timeline in
                about three minutes — no call, no obligation.
              </p>
              <Link href="/estimate" className="btn btn-primary">
                Start a project
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
