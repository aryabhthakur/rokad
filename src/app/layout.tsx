import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import HeaderServerWithFetch from "@/components/customs/HeaderServerWithApollo";
import Footer from "@/components/customs/footer";
import { CommandPalette } from "@/components/CommandPalette";
import { getServerApollo } from "@/lib/apollo-server";
import { gql } from "@apollo/client";

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

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-100`}
      >
        <Providers>
          <HeaderServerWithFetch />
          {/* <Header /> */}
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
