import Capabilities from "@/components/index/capabilities";
import Hero from "@/components/index/hero";
import Industries from "@/components/index/industries";
import Insights from "@/components/index/insights";
import PAN from "@/components/index/pan";
import Platform from "@/components/index/platform";
import Solutions from "@/components/index/solutions";
import { getServerApollo } from "@/lib/apollo-server";
import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

const QUERY = gql`
query Home {
  home {
    HeroTitle
    HeroDesc
    HeroSubTitle
    industries {
      name
      slug
      subtitle
    }
    media_centers {
      title
      slug
      public_on
      FeaturedImage {
        url
      }
    }
    case_studies {
      title
      slug
      client
    }
    insights {
      Title
      slug
      FeaturedImage {
        url
      }
    }
    capabilities {
      name
      slug
      subtitle
    }
    solutions {
      name
      slug
      features {
        desc
        icon
        title
      }
    }
    partners {
      name
      desc
      logo {
        url
      }
    }
  }
}
        `

export default async function Home() {
  const client = getServerApollo();
  const { data } = await client.query({
    query: QUERY,
  })
  // @ts-expect-error type err
  const homeData = data.home

  const returnDate = (v: string) => new Date(v).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short', // "Nov"
    day: 'numeric'  // "26"
  });
  return (
    <>
      <Hero {...homeData} />
      <Platform />
      <Capabilities {...homeData} />
      <PAN />
      <Solutions {...homeData} />
      <Industries {...homeData} />
      <Insights {...homeData} />
      <section id="press">
        <div className="max-w-6xl mx-auto border-x border-dashed border-neutral-300 py-20">
          <div className="max-w-5xl mx-auto mb-10">
            <span className="border-2 rounded-full font-medium py-1 px-3">
              Press Releases
            </span>
            <h2 className="text-8xl mt-4 font-semibold"><i className="font-thin">In the</i> News</h2>
          </div>
          <div className="divide-y divide-dashed divide-neutral-300 max-w-5xl mx-auto border border-dashed border-neutral-300 bg-white rounded">
            {homeData.media_centers.map((press: { title: string, public_on: string, slug: string, FeaturedImage: { url: string } }) => <Link key={press.slug} href={"/press/" + press.slug} className={"font-medium hover:text-orange-600 group flex flex-col text-xl p-5 w-full"}>
              <span className="text-xs uppercase opacity-50 flex items-center">
                PUBLISHED ON {returnDate(press.public_on)}
              </span>
              <h3 className="mt-1">
                {press.title}
              </h3>
            </Link>)}
          </div>
          <div className="max-w-5xl mx-auto mt-5 text-neutral-500">
            To know more, visit <Link href={"/company/media-center"} className="text-black hover:text-orange-600 font-medium">Rokad&apos;s Media Center</Link>
          </div>
        </div>
      </section>
    </>
  );
}
