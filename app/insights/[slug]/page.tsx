import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { insightPosts, getInsightPost, formatInsightDate } from "../../lib/insights";
import { priceTiers } from "../../lib/pricing";
import { SITE_URL, url } from "../../lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return insightPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsightPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/insights/${post.slug}` },
  };
}

/** Renders minimal [text](/path) inline links inside a paragraph string. */
function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;
    const [, label, href] = match;
    return href.startsWith("/") ? (
      <Link href={href} key={i}>
        {label}
      </Link>
    ) : (
      <a href={href} key={i} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  });
}

export default async function InsightPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getInsightPost(slug);
  if (!post) notFound();

  const others = insightPosts.filter((p) => p.slug !== post.slug);

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.published,
      author: {
        "@type": "Organization",
        name: "StackLabs",
        url: SITE_URL,
      },
      mainEntityOfPage: url(`/insights/${post.slug}`),
    },
  ];
  if (post.faqs && post.faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

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
              <p className="hero-location">
                <Link href="/insights" className="case-back">Insights</Link>
                <span className="case-crumb-sep"> · </span>
                {post.category}
                <span className="case-crumb-sep"> · </span>
                {formatInsightDate(post.published)}
              </p>
              <h1>{post.title}</h1>
              <p className="content-lead">{post.lead}</p>
            </div>

            {post.sections.map((section) => (
              <div key={section.heading}>
                <div className="content-prose">
                  <section>
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{renderInline(p)}</p>
                    ))}
                  </section>
                </div>
                {section.cards && (
                  <div className="driver-list">
                    {section.cards.map((c) => (
                      <div className="driver" key={c.title}>
                        <h3>{c.title}</h3>
                        <p>{c.body}</p>
                      </div>
                    ))}
                  </div>
                )}
                {section.showPriceTiers && (
                  <div className="cost-tiers">
                    {priceTiers.map((tier) => (
                      <div className="cost-tier" key={tier.name}>
                        <div className="cost-tier-head">
                          <h3>{tier.name}</h3>
                          <span className="cost-tier-range">{tier.range}</span>
                        </div>
                        <p className="cost-tier-scope">{tier.scope}</p>
                        <p className="cost-tier-timeline">{tier.timeline}</p>
                        <p className="cost-tier-example">{tier.example}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {post.faqs && post.faqs.length > 0 && (
              <section className="faq" aria-label="Frequently asked questions">
                <h2>Common questions</h2>
                {post.faqs.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </section>
            )}

            <div className="content-cta">
              <h2>Want a number for your actual idea?</h2>
              <p>
                Describe your project and get a rough sense of size and timeline in
                about three minutes — no call, no obligation.
              </p>
              <Link href="/estimate" className="btn btn-primary">
                Get a rough estimate
              </Link>
            </div>

            {others.length > 0 && (
              <nav className="content-related" aria-label="More insights">
                <h2 className="section-title">More insights</h2>
                <ul>
                  {others.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/insights/${p.slug}`}>{p.title}</Link>
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
