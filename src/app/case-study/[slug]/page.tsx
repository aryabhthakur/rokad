import { Button } from "@/components/ui/button";
import { getServerApollo } from "@/lib/apollo-server";
import { gql } from "@apollo/client";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";
import Markdown from "react-markdown";
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import { Separator } from "@/components/ui/separator";
import { Metadata, ResolvingMetadata } from "next/types";
import Link from "next/link";

type Props = {
    params: Promise<{ slug: string }>
}

const QUERY = gql`query CaseStudies($filters: CaseStudyFiltersInput) {
  caseStudies(filters: $filters) {
    title
    content
    client
    subtitle
    isConfidential
    createdAt
  }
}`


// generateStaticParams: return array of { slug } objects (what Next expects)
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
    const q = gql`
  query CaseStudies {
    caseStudies {
      slug
    }
  }
  `
    const client = getServerApollo();
    const { data } = await client.query({ query: q });

    // @ts-expect-error if GraphQL types are loose
    return data.caseStudies.map((c: { slug: string }) => ({ slug: c.slug }));
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
    const currentCap = data.caseStudies?.[0];
    if (!currentCap) {
        return { title: 'Rokad', description: '' };
    }

    return {
        title: currentCap.title,
        description: currentCap.subtitle,
    }
}

export default async function CSPage(props: Props): Promise<ReactNode> {
    // Await the params here
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
    const currentCase = data.caseStudies[0]

    if (!currentCase) {
        return notFound()
    }
    const formattedDate = new Date(currentCase.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short', // "Nov"
        day: 'numeric'  // "26"
    });

    return (<>
        <section className="pt-30 pb-40">
            <div className="mt-2 mb-4 pt-10 max-w-3xl mx-auto">
                <span className="border-2 rounded-full font-medium py-1 px-3">
                    Case Study
                </span>
                <h2 className="text-5xl mt-4 font-bold">
                    {currentCase.title}
                </h2>
                <h3 className="text-lg mt-2 text-neutral-500 font-medium">
                    {currentCase.subtitle}
                </h3>
                <Separator className="max-w-10 mt-4 min-h-0.5" />
                <p className="text-sm text-neutral-500 mt-2 font-medium">
                    Published on {formattedDate}
                </p>
            </div>
            <Separator className="data-[orientation=horizontal]:h-1 mt-10" />
            <div className="max-w-3xl mx-auto mt-10 border-b pb-10 prose prose-img:rounded-lg prose-img:border-2 prose-img:border-white prose-img:bg-white prose-img:p-5 prose-neutral">
                <Markdown remarkPlugins={[remarkGfm]}>
                    {currentCase.content}
                </Markdown>
                {currentCase.isConfidential && <p className="italic text-sm"> *We take our clients&apos; confidentiality seriously. While we &apos;ve changed their names, the results are real.</p>}
            </div>
            <div className="max-w-3xl mx-auto bg-white rounded-xl p-5 mt-10">
                <div className="grid grid-cols-2">
                    <div>
                        <h3 className="text-3xl font-medium">
                            We publish weekly
                        </h3>
                        <h5 className="mt-1 text-neutral-500">
                            Only what&apos;s relevant
                        </h5>
                        <Button className="mt-8 pl-5! bg-orange-600 hover:bg-orange-700">
                            <Link href={"https://tally.so/r/VLjpKy"}>
                                Subscribe now <ArrowUpRight />
                            </Link>
                        </Button>
                    </div>
                    <p className="mt-2">Subscribe to our newsletter and get weekly industry insights and more,  directly delivered to your inbox.</p>
                </div>
            </div>
        </section>
    </>);
}