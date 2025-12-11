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
import { Metadata } from "next/types";
import Partner from "@/components/partner";
import CapabilityOutcome from "@/components/capability/outcome";
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
type Props = { params: { slug: string } };

export async function generateMetadata(
  props: Props
): Promise<Metadata> {
  // read route params
  const { slug } = await props.params

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
  const currentCap = data.capabilities[0]
  return {
    title: currentCap.name,
    description: currentCap.subtitle,
  }
}

export default async function CapabilityPage(props: Props): Promise<ReactNode> {
  const { slug } = await props.params;
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
  const currentCap = data.capabilities[0]

  if (!currentCap) {
    return notFound()
  }

  return (<>
    <CapabillityHero {...currentCap} />
    <CapabilityPain {...currentCap} />
    <CapabilityService slug={slug} {...currentCap} />
    <section className="pb-40">
      <div className="max-w-5xl mx-auto mb-10">
        <span className="border-2 rounded-full font-medium py-1 px-3">
          Rokad&apos;s Deliverables
        </span>
        <h2 className="text-8xl mt-4 font-semibold">{currentCap.offeringSectionTitle}</h2>
        <div className="grid mt-20 grid-cols-2 gap-5">
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
      <div className="max-w-6xl divide-dashed border rounded border-dashed bg-white mx-auto mt-20 grid grid-cols-3 divide-x divide-y *:nth-[3]:border-r-0 *:nth-[4]:border-b-0 *:nth-[5]:border-b-0">
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