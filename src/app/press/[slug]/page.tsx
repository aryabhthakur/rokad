import { getServerApollo } from "@/lib/apollo-server";
import { gql } from "@apollo/client";
import Image from "next/image";
import { ReactNode } from "react";
import Markdown from "react-markdown";
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from "next/types";

type Props = {
    params: Promise<{ slug: string }>
}
const QUERY = gql`query MediaCenters($filters: MediaCenterFiltersInput) {
  mediaCenters(filters: $filters) {
    title
    slug
    content
    public_on
    FeaturedImage {
      url
    }
  }
}`

// generateStaticParams: return array of { slug } objects (what Next expects)
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
    const q = gql`
  query Query {
    mediaCenters {
      slug
    }
  }
  `
    const client = getServerApollo();
    const { data } = await client.query({ query: q });

    // @ts-expect-error if GraphQL types are loose
    return data.mediaCenters.map((c: { slug: string }) => ({ slug: c.slug }));
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
    const currentCap = data.mediaCenters?.[0];
    if (!currentCap) {
        return { title: 'Rokad', description: '' };
    }

    return {
        title: currentCap.name,
        description: currentCap.subtitle,
    }
}


export default async function PressPage(props: Props): Promise<ReactNode> {
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
    const currentPress = data.mediaCenters[0]

    if (!currentPress) {
        return notFound()
    }
    const formattedDate = new Date(currentPress.public_on).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short', // "Nov"
        day: 'numeric'  // "26"
    });

    return (<>
        <section className="pt-30 pb-40">
            <div className="max-w-4xl pt-10 rounded mx-auto">
                <div className="mt-2 mb-4 max-w-3xl mx-auto max-sm:px-5">
                    <span className="border-2 rounded-full font-medium py-1 px-3">
                        Press
                    </span>
                    <h2 className="md:text-3xl text-2xl font-semibold mt-4 md:font-bold">
                        {currentPress.title}
                    </h2>
                    <p className="text-sm text-neutral-500 mt-2 font-medium">
                        Published on {formattedDate}
                    </p>
                </div>
                <div className="bg-white p-1 md:p-2 rounded-lg">
                    <Image src={currentPress.FeaturedImage.url} width={900} height={512} alt={currentPress.title} className="rounded-lg" unoptimized />
                </div>
            </div>
            <div className="max-w-3xl max-sm:px-5 mx-auto mt-10 border-b pb-10 prose prose-img:rounded-lg prose-img:border-2 prose-img:border-white prose-img:bg-white prose-img:p-5 prose-neutral">
                <Markdown>
                    {currentPress.content}
                </Markdown>
            </div>
        </section>
    </>);
}