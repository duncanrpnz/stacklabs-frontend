import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { services, getService } from "../../lib/services";

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
    url: `https://stacklabs.co.nz/services/${service.slug}`,
    serviceType: service.title,
    areaServed: "New Zealand",
    provider: {
      "@type": "LocalBusiness",
      name: "StackLabs Ltd",
      url: "https://stacklabs.co.nz",
    },
  };

  const others = services.filter((s) => s.slug !== service.slug);

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
