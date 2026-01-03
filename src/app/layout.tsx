import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import HeaderServerWithFetch from "@/components/customs/HeaderServerWithApollo";
import Footer from "@/components/customs/footer";
import { CommandPalette } from "@/components/CommandPalette";
import { getServerApollo } from "@/lib/apollo-server";
import { gql } from "@apollo/client";
import CookieBanner from "@/components/CookieBanner";
import AnalyticsLoader from "@/components/AnalyticsLoader";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    template: '%s | Rokad',
    default: 'Rokad',
  },
  description: 'Rokad is a market accessibility, GTM strategy, and digital transformation firm helping brands scale across India through strategy, execution, and technology.',
}

type Industry = {
  name: string;
  slug: string;
};

type Capability = {
  name: string;
  slug: string;
};

type Insight = {
  Title: string;
  slug: string;
};

type CaseStudy = {
  title: string;
  slug: string;
};

type InputData = {
  industries?: Industry[];
  capabilities?: Capability[];
  insights?: Insight[];
  caseStudies?: CaseStudy[];
};


export type SearchData = {
  title: string;
  slug: string;
  type?: "industry" | "capability" | "insight" | "case-study";
};

/**
 * @typedef {Object} searchData
 * @property {string} title
 * @property {string} slug
 * @property {string} [type]
 */

export function buildSearchData(input: InputData): SearchData[] {
  if (!input) return [];

  const {
    industries = [],
    capabilities = [],
    insights = [],
    caseStudies = []
  } = input;

  return [
    ...industries.map<SearchData>(item => ({
      title: item.name,
      slug: item.slug,
      type: "industry"
    })),

    ...capabilities.map<SearchData>(item => ({
      title: item.name,
      slug: item.slug,
      type: "capability"
    })),

    ...insights.map<SearchData>(item => ({
      title: item.Title,
      slug: item.slug,
      type: "insight"
    })),

    ...caseStudies.map<SearchData>(item => ({
      title: item.title,
      slug: item.slug,
      type: "case-study"
    }))
  ];
}

async function searchAbleItems(): Promise<SearchData[]> {
  const QUERY = gql`
  query Searchables {
  industries {
    name
    slug
  }
  capabilities {
    name
    slug
  }
  insights {
    Title
    slug
  }
  caseStudies {
    title
    slug
  }
}
  `
  const client = getServerApollo();
  const { data } = await client.query({
    query: QUERY,
  })

  // @ts-expect-error type err
  return buildSearchData(data)
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchData = await searchAbleItems()
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://rokad.co/#organization",
    "name": "Rokad Retail Ventures Pvt. Ltd.",
    "alternateName": "Rokad",
    "url": "https://rokad.co",
    "logo": "https://rokad.co/logo.png",
    "image": "https://rokad.co/og-image.png",
    "description": "Rokad is a market accessibility, GTM strategy, and digital transformation firm helping brands scale across India through strategy, execution, and technology.",
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "sameAs": [
      "https://www.linkedin.com/company/rokadhq",
      "https://clutch.co/profile/rokad",
      "https://www.goodfirms.co/company/rokad",
      "https://www.crunchbase.com/organization/rokad"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "sales@rokad.co",
        "availableLanguage": ["English"]
      },
      {
        "@type": "ContactPoint",
        "contactType": "support",
        "email": "contact@rokad.co",
        "availableLanguage": ["English"]
      }
    ]
  }
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://rokad.co/#website",
    "url": "https://rokad.co",
    "name": "Rokad",
    "publisher": {
      "@id": "https://rokad.co/#organization"
    },
    "inLanguage": "en-IN"
  }
  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": "https://rokad.co/#site-navigation",
    "name": [
      "Home",
      "Market Accessibility",
      "Customer Strategy",
      "GTM Strategy",
      "Digital Transformation",
      "BOM Procurement",
      "Retail Industry",
      "Technology Industry",
      "Consumer Goods Industry",
      "Industrial Goods Industry",
      "Insights",
      "About",
      "Media Center",
      "Careers",
      "Brand Assets",
      "Contact"
    ],
    "url": [
      "https://rokad.co/",
      "https://rokad.co/capability/market-accessibility",
      "https://rokad.co/capability/customer-strategy",
      "https://rokad.co/capability/gtm-strategy",
      "https://rokad.co/capability/digital-transformation",
      "https://rokad.co/capability/bom-procurement",
      "https://rokad.co/industry/retail",
      "https://rokad.co/industry/technology",
      "https://rokad.co/industry/consumer-goods",
      "https://rokad.co/industry/industrial-goods",
      "https://rokad.co/insights",
      "https://rokad.co/company",
      "https://rokad.co/company/media-center",
      "https://rokad.co/company/careers",
      "https://rokad.co/company/brand-assets",
      "https://rokad.co/contact-us",
    ]
  };
  const globalFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://rokad.co/#about-faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does Rokad do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rokad is a market accessibility, GTM strategy, and digital transformation firm that helps brands enter, scale, and optimize their presence across Indian markets through strategy, execution, and technology."
        }
      },
      {
        "@type": "Question",
        "name": "Who does Rokad work with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rokad works with consumer brands, manufacturers, startups, and enterprises across retail, consumer products, technology, and industrial sectors."
        }
      },
      {
        "@type": "Question",
        "name": "Is Rokad a consulting company or a service provider?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rokad operates as a hybrid strategy and execution partner, offering consulting-led frameworks backed by hands-on implementation and technology enablement."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Rokad based?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rokad operates in India with regional offices in Ranchi and Hyderabad, serving clients across globe."
        }
      },
      {
        "@type": "Question",
        "name": "How can businesses engage with Rokad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Businesses can engage with Rokad through strategic consulting engagements, execution-based projects, or long-term partnerships depending on their growth objectives."
        }
      }
    ]
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalFaqSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-100`}
      >
        <Providers>
          <HeaderServerWithFetch />
          {/* <Header /> */}
          <AnalyticsLoader />
          <CookieBanner />
          <main className="bg-neutral-100">
            {children}
          </main>
          <CommandPalette data={searchData} />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
