import { getServerApollo } from "@/lib/apollo-server";
import { gql } from "@apollo/client";
import { ReactNode } from "react";
import Markdown from "react-markdown";
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from "next/types";

type Props = {
    params: Promise<{ slug: string }>
}
const QUERY = gql`query LegalPage($filters: LegalFiltersInput) {
  legals(filters: $filters) {
    Content
    name
    slug
    updatedAt
    ReachOutEmail
  }
}`

// generateStaticParams: return array of { slug } objects (what Next expects)
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
    const q = gql`
  query Query {
    legals {
      slug
    }
  }
  `
    const client = getServerApollo();
    const { data } = await client.query({ query: q });

    // @ts-expect-error if GraphQL types are loose
    return data.legals.map((c: { slug: string }) => ({ slug: c.slug }));
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
    const currentCap = data.legals?.[0];
    if (!currentCap) {
        return { title: 'Rokad', description: '' };
    }
    return {
        title: currentCap.name,
        description: currentCap.subtitle,
    }
}


export default async function LegalPage(props: Props): Promise<ReactNode> {
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
    const currentLegal = data.legals[0]

    if (!currentLegal) {
        return notFound()
    }

    const formattedDate = new Date(currentLegal.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short', // "Nov"
        day: 'numeric'  // "26"
    });

    return (<>
        <section className="pt-30 pb-40">
            <div className="max-w-4xl pt-10 rounded mx-auto">
                <div className="mt-2 mb-4 max-w-3xl mx-auto max-sm:px-5">
                    <span className="border-2 rounded-full font-medium py-1 px-3">
                        Legal
                    </span>
                    <h2 className="md:text-3xl text-2xl font-semibold mt-4 md:font-bold">
                        {currentLegal.name}
                    </h2>
                    <p className="text-sm text-neutral-500 mt-2 font-medium">
                        Last updated on {formattedDate}
                    </p>
                </div>
            </div>
            <div className="max-w-3xl max-sm:px-5 mx-auto mt-10 pb-10 prose prose-img:rounded-lg prose-img:border-2 prose-img:border-white prose-img:bg-white prose-img:p-5 prose-neutral">
                <Markdown>
                    {currentLegal.Content}
                </Markdown>
            </div>
        </section>
    </>);
}