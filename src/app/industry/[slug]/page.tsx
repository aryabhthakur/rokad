import RIR from "@/components/industry/retail-industry-reason";
import { ReactNode } from "react";
import { gql } from '@apollo/client';
import { getServerApollo } from "@/lib/apollo-server";
import IndustryHero from "@/components/industry/hero";
import Hello from "@/components/index/hello";
import IndustryIssues from "@/components/industry/issues";
import IndustryStories from "@/components/industry/stories";
import IndustrySegments from "@/components/industry/segments";
import { notFound } from 'next/navigation';
import IndustryValues from "@/components/industry/values";
import IndustryUc from "@/components/industry/uc";
import Insights from "@/components/insights";
import { Metadata, ResolvingMetadata } from "next/types";

type Props = {
  params: Promise<{ slug: string }>
}

const QUERY = gql`
query Industries($filters: IndustryFiltersInput) {
  industries(filters: $filters) {
    name
    HeroDesc
    subtitle
    insights {
      FeaturedImage {
        url
      }
      Title
      slug
    }
    issues {
      id
     title
     indiaSpecificInsight 
     description
    }
    IssueSectionDesc
    IssueSectionSubTitle
    IssueSectionTitle
    segments {
      title
      howWeHelp
      img {
        url
      }
    }
    cases {
      title
      slug
      client
    }
    CasesSectionTitle
    CasesSectionSubTitle
    CaseSectionDesc
    counter {
      step
      title
      subtitle
      deliverables
      description
    }
    CounterSectionDesc
    CounterSectionSubTitle
    CounterSectionTitle
    values {
      desc
      title
      icon
    }
    valueSectionTitle
    valueSectionSubTitle
    valueSectionDesc
    valueSectionFooterNote
    trends {
        icon
      title
      desc
    }
    trendSectionTitle
    trendSectionSubTitle
    trendSectionDesc
    usecases {
      desc
      title
      icon
    }
    ucSectionDesc
    ucSectionTitle
    ucSectionSubTitle
    ucSectionFooterNote
  }
}
        `

// generateStaticParams: return array of { slug } objects (what Next expects)
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const q = gql`
  query Query {
    industries {
      slug
    }
  }
  `
  const client = getServerApollo();
  const { data } = await client.query({ query: q });

  // @ts-expect-error if GraphQL types are loose
  return data.industries.map((c: { slug: string }) => ({ slug: c.slug }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Await the params
  const { slug } = await params;

  const client = getServerApollo();
  const { data } = await client.query({
    query: QUERY,
    variables: {
      filters: { slug: { eq: slug } }
    }
  });

  // @ts-expect-error type err from GraphQL loose typing
  const currentCap = data.industries?.[0];
  if (!currentCap) {
    return { title: 'Rokad', description: '' };
  }

  return {
    title: currentCap.name,
    description: currentCap.subtitle,
  }
}


export default async function IndustryPage(props: Props): Promise<ReactNode> {
  const params = await props.params;
  const { slug } = params;
  const client = getServerApollo();
  const { data } = await client.query({
    query: QUERY,
    variables: {
      "filters": {
        "slug": {
          "eq": slug
        }
      }
    }
  })
  // @ts-expect-error type err
  const currentIndustry = data.industries[0]

  if (!currentIndustry) {
    return notFound()
  }

  return (<>
    <IndustryHero {...currentIndustry} />
    <IndustryIssues {...currentIndustry} />
    <IndustryValues {...currentIndustry} />
    <RIR {...currentIndustry} />
    <IndustryUc {...currentIndustry} />
    <IndustryStories {...currentIndustry} />
    <IndustrySegments {...currentIndustry} />
    <Insights {...currentIndustry} />
    <Hello />
  </>);
}