import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { services, getService } from "../../lib/services";
import { getCaseStudy } from "../../lib/work";
import { SITE_URL, url } from "../../lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    url: url(`/services/${service.slug}`),
    serviceType: service.title,
    areaServed: "New Zealand",
    provider: {
      "@type": "LocalBusiness",
      name: "StackLabs Ltd",
      url: SITE_URL,
    },
  };

  const others = services.filter((s) => s.slug !== service.slug);
  const caseStudy = service.caseStudySlug
    ? getCaseStudy(service.caseStudySlug)
    : undefined;

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
              <p className="hero-location">Services</p>
              <h1>{service.title}</h1>
              <p className="content-lead">{service.lead}</p>
              <p className="content-timeline">{service.timeline}</p>
            </div>

            <div className="content-prose">
              {service.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </section>
              ))}
            </div>

            {caseStudy && (
              <div className="content-proof">
                <h2 className="section-title">What this looks like</h2>
                <Link href={`/work/${caseStudy.slug}`} className="work-card">
                  <div className="work-card-top">
                    <span className="work-card-category">{caseStudy.category}</span>
                  </div>
                  <h3>{caseStudy.name}</h3>
                  <p className="work-card-headline">{caseStudy.headline}</p>
                  <p className="work-card-blurb">{caseStudy.card}</p>
                  {caseStudy.metrics && (
                    <ul className="work-metrics" aria-label="Results">
                      {caseStudy.metrics.map((m) => (
                        <li key={m.label}>
                          <span className="work-metric-value">{m.value}</span>
                          <span className="work-metric-label">{m.label}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="work-card-more">Read the case study →</span>
                </Link>
              </div>
            )}

            <div className="content-asides">
              <div className="aside-block">
                <h3>Good fit</h3>
                <ul>
                  {service.goodFit.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="aside-block">
                <h3>What you get</h3>
                <ul>
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="content-cta">
              <h2>Wondering what this would look like for you?</h2>
              <p>
                Answer a few questions about your project and get a rough sense of size and
                timeline in about three minutes. Or read our guide to{" "}
                <Link href="/how-much-does-software-cost">what custom software costs in NZ</Link>.
              </p>
              <Link href="/estimate" className="btn btn-primary">
                Start a project
              </Link>
            </div>

            <nav className="content-related" aria-label="Other services">
              <h2 className="section-title">Other services</h2>
              <ul>
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`}>{s.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
