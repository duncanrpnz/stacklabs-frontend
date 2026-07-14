import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { insightPosts, formatInsightDate } from "../lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Plain-English guides on scoping, costing and building custom software, from a senior New Zealand studio that publishes its numbers.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="content-page">
          <div className="container content-inner">
            <div className="content-intro">
              <p className="hero-location">Insights</p>
              <h1>Guides worth reading before you build</h1>
              <p className="content-lead">
                Plain-English writing on scoping, costing and building software —
                the advice we&apos;d give a mate, with real numbers where most
                studios go quiet.
              </p>
            </div>

            <div className="work-list">
              {insightPosts.map((p, i) => (
                <Link href={`/insights/${p.slug}`} className="work-card" key={p.slug}>
                  <div className="work-card-top">
                    <span className="work-card-index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="work-card-category">{p.category}</span>
                  </div>
                  <h2>{p.title}</h2>
                  <p className="work-card-blurb">{p.card}</p>
                  <span className="work-card-more">
                    Read the guide — {formatInsightDate(p.published)} →
                  </span>
                </Link>
              ))}
            </div>

            <div className="content-cta">
              <h2>Rather talk about your actual project?</h2>
              <p>
                Describe your project and get a rough sense of size and timeline in
                about three minutes — no call, no obligation.
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
