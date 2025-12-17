import { ReactNode } from "react";
import { gql } from '@apollo/client';
import { getServerApollo } from "@/lib/apollo-server";
import { notFound } from 'next/navigation';
import CapabillityHero from "@/components/capability/hero";
import { Icon } from "@iconify/react";
import CapabilityPain from "@/components/capability/pain";
import Insights from "@/components/insights";
import CapabilityCases from "@/components/capability/cases";
import CapabilityService from "@/components/capability/services";
import { Metadata, ResolvingMetadata } from "next/types";
import Partner from "@/components/partner";
import CapabilityOutcome from "@/components/capability/outcome";

type Props = {
  params: Promise<{ slug: string }>
}

const QUERY = gql`
query Capabilities($filters: CapabilityFiltersInput) {
  capabilities(filters: $filters) {
    name
    slug
    subtitle
    HeroDesc
    partners {
      name
      logo {
        url
      }
      press_release {
        title
        slug
      }
    }
    services {
      name
      slug
    }
    featuredPartnership {
      name
      desc
      news
      logo {
        url
      }
    }
    painpoints {
      desc
      title
      icon
    }
    painSectionDesc
    painSectionSubTitle
    painSectionTitle
    offeringSectionDesc
    offeringSectionSubTitle
    offeringSectionTitle
    outcomes {
      desc
      title
      icon
    }
    outcomeSectionDesc
    outcomeSectionSubTitle
    outcomeSectionTitle
    offerings {
      title
      desc
      icon
    }
    insights {
      Title
      slug
      FeaturedImage {
        url
      }
      isFeatured
    }
    casestudiesSectionDesc
    casestudiesSectionSubTitle
    casestudiesSectionTitle
    serviceSectionTitle
    serviceSectionSubTitle
    serviceSectionDesc
    case_studies {
      title
      slug
    }
  }
}
`

// generateStaticParams: return array of { slug } objects (what Next expects)
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const q = gql`
  query Capabilities {
    capabilities {
      slug
    }
  }
  `
  const client = getServerApollo();
  const { data } = await client.query({ query: q });

  // @ts-expect-error if GraphQL types are loose
  return data.capabilities.map((c: { slug: string }) => ({ slug: c.slug }));
}

// generateMetadata: accept params synchronously (do not await props.params)
// note: inline param typing prevents mismatch with Next's checker
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
  const currentCap = data.capabilities?.[0];
  if (!currentCap) {
    return { title: 'Rokad', description: '' };
  }

  return {
    title: currentCap.name,
    description: currentCap.subtitle,
  }
}
// Page component: destructure params inline and don't await them
export default async function CapabilityPage(
  props: Props
): Promise<ReactNode> {
  // Await the params here
  const params = await props.params;
  const { slug } = params;
  const client = getServerApollo();
  const { data } = await client.query({
    query: QUERY,
    variables: {
      filters: { slug: { eq: slug } }
    }
  });

  // @ts-expect-error type err
  const currentCap = data.capabilities?.[0];

  if (!currentCap) {
    return notFound();
  }

  return (<>
    <CapabillityHero {...currentCap} />
    <CapabilityPain {...currentCap} />
    <CapabilityService slug={slug} {...currentCap} />
    <section className="pb-40">
      <div className="max-w-5xl mx-auto mb-10 max-sm:px-5">
        <span className="border-2 rounded-full font-medium py-1 max-sm:text-sm px-3">
          Rokad&apos;s Deliverables
        </span>
        <h2 className="text-4xl md:text-8xl mt-4 font-semibold">{currentCap.offeringSectionTitle}</h2>
        <div className="grid mt-10 md:mt-20 md:grid-cols-2 gap-5">
          <div>
            <h3 className="text-2xl opacity-75">{currentCap.offeringSectionSubTitle}</h3>
          </div>
          <div>
            <p className="max-w-lg opacity-75">
              {currentCap.offeringSectionDesc}
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl divide-dashed border rounded border-dashed bg-white mx-auto mt-20 grid md:grid-cols-3 divide-x divide-y *:nth-[3]:border-r-0 *:md:nth-[4]:border-b-0 *:md:nth-[5]:border-b-0">
        {currentCap.offerings?.map((offering: {
          title: string, desc: string, icon: string
        }) => <div key={offering.title} className="w-full p-5 h-64 flex flex-col">
            <div className="size-14 flex bg-orange-50 rounded-2xl">
              <Icon icon={offering.icon} className="size-8 text-orange-500 m-auto" />
            </div>
            <h3 className="text-l font-medium mt-auto">
              {offering.title}
            </h3>
            <p className="text-sm text-neutral-500">
              {offering.desc}
            </p>
          </div>)}
      </div>
    </section>
    <CapabilityOutcome {...currentCap} className="mb-40" />
    <CapabilityCases {...currentCap} />
    <Partner {...currentCap} />
    <Insights {...currentCap} />
  </>);
}
