import { getServerApollo } from "@/lib/apollo-server";
import { cn } from "@/lib/utils";
import { gql } from "@apollo/client";
import { ArrowUpRight, Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const QUERY = gql`query Insights {
  insights {
    Title
    slug
    createdAt
    isFeatured
    FeaturedImage {
      url
    }
  }
}`

async function insights() {
    const client = getServerApollo();
    const { data } = await client.query({
        query: QUERY,
    })
    // @ts-expect-error type err
    const allInsights = data.insights

    const returnDate = (v: string) => new Date(v).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short', // "Nov"
        day: 'numeric'  // "26"
    });

    return (<>
        <section className="pt-60 pb-40">
            <div className="max-w-5xl mx-auto mb-10">
                <span className="border-2 rounded-full font-medium py-1 px-3">
                    Rokad&apos;s Purview
                </span>
                <h2 className="text-8xl mt-4 font-semibold">Industry Insights</h2>
                <div className="grid mt-20 grid-cols-2 gap-5">
                    <div>
                        <h3 className="opacity-75 text-2xl">Frameworks and foresight for leaders building the next decade of India</h3>
                    </div>
                    <div>
                        <p className="opacity-75 max-w-lg">
                            Our insights track the most important forces shaping growth — consumer behavior, digital infrastructure, retail operations, and brand economics. Each perspective converts noise into clarity, helping leaders make sharper decisions with speed and conviction.
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto space-y-5 divide-y mt-20">
                {allInsights?.map((insight: {
                    Title: string, slug: string, isFeatured: boolean, createdAt: string, FeaturedImage: {
                        url: string
                    }
                }) => <div key={insight.slug} className={cn("flex gap-4 pb-4")}>
                        {insight.isFeatured ? <Image width={320} height={320} alt={insight.Title} className="rounded" src={insight.FeaturedImage.url} /> : <Image width={128} height={320} alt={insight.Title} className="rounded-xs" src={insight.FeaturedImage.url} />}
                        <Link href={"/insight/" + insight.slug} className={cn("font-medium hover:text-orange-600 group flex flex-col text-2xl")}>
                            {insight.isFeatured && <span className="text-sm uppercase flex items-center">
                                FEATURED <Dot /> PUBLISHED ON {returnDate(insight.createdAt)}
                            </span>}
                            <span className={cn("flex", insight.isFeatured && "mt-auto")}>
                                <span className="flex-1">
                                    {insight.Title}
                                </span>
                                <span className="size-12 group-hover:bg-white duration-300 flex rounded-full">
                                    <ArrowUpRight size={36} strokeWidth={1} className="m-auto delay-75 duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </span>
                            </span>
                        </Link>
                    </div>)}
            </div>
        </section>
    </>);
}

export default insights;