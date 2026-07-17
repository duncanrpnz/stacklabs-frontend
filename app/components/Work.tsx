import Link from "next/link";
import Reveal from "./Reveal";
import { caseStudies } from "../lib/work";

export default function Work() {
  return (
    <section className="work-section" id="work">
      <div className="container">
        <h2 className="section-title">Recent work</h2>
        <div className="work-list">
          {caseStudies.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60}>
              <Link href={`/work/${c.slug}`} className="work-card">
                <div className="work-card-top">
                  <span className="work-card-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="work-card-category">{c.category}</span>
                </div>
                <h3>{c.name}</h3>
                <p className="work-card-headline">{c.headline}</p>
                <p className="work-card-blurb">{c.card}</p>
                {c.metrics && (
                  <ul className="work-metrics" aria-label="Results">
                    {c.metrics.map((m) => (
                      <li key={m.label}>
                        <span className="work-metric-value">{m.value}</span>
                        <span className="work-metric-label">{m.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <span className="work-card-more">Read the case study →</span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Link href="/work" className="work-section-more">
          See all work →
        </Link>
      </div>
    </section>
  );
}
