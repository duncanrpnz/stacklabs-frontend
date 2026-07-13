import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { caseStudies, getCaseStudy } from "../../lib/work";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.metaTitle,
    description: study.metaDescription,
    alternates: { canonical: `/work/${study.slug}` },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const others = caseStudies.filter((c) => c.slug !== study.slug);

  return (
    <>
      <Header />
      <main>
        <section className="content-page">
          <div className="container content-inner">
            <div className="content-intro">
              <p className="hero-location">
                <Link href="/work" className="case-back">Work</Link>
                <span className="case-crumb-sep"> · </span>
                {study.category}
              </p>
              <h1>{study.headline}</h1>
              <p className="content-lead">{study.lead}</p>
              {study.liveUrl && (
                <a
                  className="case-live-link"
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit the live site
                  <span aria-hidden="true"> ↗</span>
                </a>
              )}
            </div>

            {study.metrics && study.metrics.length > 0 && (
              <div className="case-metrics">
                {study.metrics.map((m) => (
                  <div className="case-metric" key={m.label}>
                    <span className="case-metric-value">{m.value}</span>
                    <span className="case-metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="case-tech">
              <span className="case-tech-label">Built with</span>
              <ul className="tech-chips">
                {study.tech.map((t) => (
                  <li className="tech-chip" key={t}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="case-facts">
              {study.facts.map((f) => (
                <div className="case-fact" key={f.label}>
                  <span className="case-fact-label">{f.label}</span>
                  <span className="case-fact-value">{f.value}</span>
                </div>
              ))}
            </div>

            <div className="content-prose">
              {study.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </section>
              ))}
            </div>

            {study.images && study.images.length > 0 && (
              <div className="case-shots">
                <h2 className="section-title">Inside the platform</h2>
                {study.images.map((img) => (
                  <figure className="case-shot" key={img.src}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      loading="lazy"
                    />
                    <figcaption>{img.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}

            <div className="content-cta">
              <h2>Got something like this in mind?</h2>
              <p>
                Describe your project and get a rough sense of size and timeline in
                about three minutes. Or read our guide to{" "}
                <Link href="/how-much-does-software-cost">what custom software costs in NZ</Link>.
              </p>
              <Link href="/estimate" className="btn btn-primary">
                Start a project
              </Link>
            </div>

            {others.length > 0 && (
              <nav className="content-related" aria-label="More work">
                <h2 className="section-title">More work</h2>
                <ul>
                  {others.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/work/${c.slug}`}>
                        {c.name} — {c.headline}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
