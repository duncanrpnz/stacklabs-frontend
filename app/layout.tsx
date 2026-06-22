import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "StackLabs Ltd | Software Development, Cambridge NZ",
  description:
    "StackLabs is a small software development studio based in Cambridge, New Zealand. We build prototypes and production systems for founders and growing teams.",
  metadataBase: new URL("https://stacklabs.co.nz"),
  alternates: { canonical: "https://stacklabs.co.nz" },
  openGraph: {
    title: "StackLabs Ltd | Software Development, Cambridge NZ",
    description:
      "StackLabs is a small software development studio based in Cambridge, New Zealand. We build prototypes and production systems for founders and growing teams.",
    url: "https://stacklabs.co.nz",
    siteName: "StackLabs",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StackLabs Ltd | Software Development, Cambridge NZ",
    description:
      "StackLabs is a small software development studio based in Cambridge, New Zealand. We build prototypes and production systems for founders and growing teams.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: "StackLabs Ltd",
    url: "https://stacklabs.co.nz",
    email: "hello@stacklabs.co.nz",
    description:
      "Small software development studio in Cambridge, New Zealand. We build prototypes and production systems for founders and growing teams.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cambridge",
      addressRegion: "Waikato",
      addressCountry: "NZ",
    },
    areaServed: "New Zealand",
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Development Services",
      itemListElement: [
        "Rapid Prototyping",
        "Prototype to Production",
        "Product Strategy",
        "Technical Leadership",
      ],
    },
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
