import { getServerApollo } from "@/lib/apollo-server";
import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Markdown from "react-markdown";
import { notFound } from 'next/navigation';
import { Dot } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next/types";

type Props = {
    params: Promise<{ slug: string }>
}

const QUERY = gql`query Insights($filters: InsightFiltersInput) {
  insights(filters: $filters) {
    Title
    slug
    createdAt
    Content
    industry {
      name
      slug
    }
    FeaturedImage {
      url
    }
    InsightSource {
      name
      url
    }
  }
}`

// generateStaticParams: return array of { slug } objects (what Next expects)
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
    const q = gql`
  query Query {
    insights {
      slug
    }
  }
  `
    const client = getServerApollo();
    const { data } = await client.query({ query: q });

    // @ts-expect-error if GraphQL types are loose
    return data.insights.map((c: { slug: string }) => ({ slug: c.slug }));
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
    const currentCap = data.insights?.[0];
    if (!currentCap) {
        return { title: 'Rokad', description: '' };
    }

    return {
        title: currentCap.Title,
        description: currentCap.subtitle,
    }
}


export default async function InsightPage(props: Props): Promise<ReactNode> {
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
    const currentInsight = data.insights[0]

    if (!currentInsight) {
        return notFound()
    }
    const formattedDate = new Date(currentInsight.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short', // "Nov"
        day: 'numeric'  // "26"
    });

    return (<>
        <section>
            <div className="max-w-3xl py-28 border-x border-neutral-300 border-dashed rounded mx-auto">
                <div className="border-y text-sm text-neutral-500 flex items-center gap-2 border-neutral-300 border-dashed p-4">
                    Insight <Dot /> Published on {formattedDate}
                </div>
                <h2 className="md:text-3xl p-4 md:font-bold text-xl font-semibold">
                    {currentInsight.Title}
                </h2>
                <div className="p-2 border-y border-neutral-300 border-dashed">
                    <Image src={currentInsight.FeaturedImage.url} width={900} height={512} alt={currentInsight.Title} className="rounded" />
                </div>
                <div className="max-w-2xl max-sm:px-5 mx-auto mt-10 border-b pb-10 prose prose-img:rounded-lg prose-img:border-2 prose-img:border-white prose-img:bg-white prose-img:p-5 prose-neutral prose-hr:border-neutral-300 prose-hr:border-dashed">
                    <Markdown>
                        {currentInsight.Content}
                    </Markdown>
                    <p>
                        References: <span className="flex flex-wrap gap-2">
                            {currentInsight.InsightSource.map((source: { name: string, url: string }) => <Link href={source.url} target="_blank" className="hover:text-orange-600 duration-200 border text-sm px-1.5 py-0.5 rounded" key={source.url}>{source.name}</Link>)}
                        </span>
                    </p>
                </div>
            </div>
        </section>
    </>);
}