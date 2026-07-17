import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "./lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "StackLabs Ltd | Software & Website Development, Cambridge NZ",
    template: "%s | StackLabs",
  },
  description:
    "StackLabs is a small software development studio in Cambridge, New Zealand. We build websites for NZ businesses, and prototypes and production software for founders and growing teams.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "StackLabs Ltd | Software & Website Development, Cambridge NZ",
    description:
      "StackLabs is a small software development studio in Cambridge, New Zealand. We build websites for NZ businesses, and prototypes and production software for founders and growing teams.",
    url: SITE_URL,
    siteName: "StackLabs",
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StackLabs Ltd | Software & Website Development, Cambridge NZ",
    description:
      "StackLabs is a small software development studio in Cambridge, New Zealand. We build websites for NZ businesses, and prototypes and production software for founders and growing teams.",
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
    url: SITE_URL,
    email: "hello@stacklabs.co.nz",
    description:
      "Small software development studio in Cambridge, New Zealand. We build websites for NZ businesses, and prototypes and production software for founders and growing teams.",
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
        "Websites",
        "Rapid Prototyping",
        "Prototype to Production",
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
