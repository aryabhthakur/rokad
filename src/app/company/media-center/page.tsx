import { Button } from "@/components/ui/button";
import { getServerApollo } from "@/lib/apollo-server";
import { cn } from "@/lib/utils";
import { gql } from "@apollo/client";
import { Rss } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

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
export const metadata: Metadata = {
    title: 'The Media Center',
    description: "Get updates about what's new with Rokad, what directions are moving and more.",
}

async function MediaCenter() {
    const client = getServerApollo();
    const { data } = await client.query({
        query: QUERY,
    })
    // @ts-expect-error type err
    const allInsights = data.mediaCenters

    const returnDate = (v: string) => new Date(v).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short', // "Nov"
        day: 'numeric'  // "26"
    });

    return (<>
        <section className="pt-50 md:pt-60 pb-40">
            <div className="max-w-5xl mx-auto mb-10 max-sm:px-5">
                <span className="border-2 rounded-full font-medium py-1 max-sm:text-sm px-3">
                    Rokad&apos;s Press Releases
                </span>
                <h2 className="text-4xl md:text-8xl mt-4 font-semibold">Media Center</h2>
                <div className="grid md:mt-20 mt-10 md:grid-cols-2 gap-5">
                    <div>
                        <h3 className="opacity-75 text-lg md:text-2xl">Frameworks and foresight for leaders building the next decade of India</h3>
                        <Button className="mt-5" asChild>
                            <Link href={"/rss"}>
                                <Rss /> Rokad&apos;s RSS
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <p className="opacity-75 max-w-lg">
                            Our presss track the most important forces shaping growth — consumer behavior, digital infrastructure, retail operations, and brand economics. Each perspective converts noise into clarity, helping leaders make sharper decisions with speed and conviction.
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto divide-y mt-10 md:mt-20 max-sm:px-5">
                {allInsights?.map((press: {
                    title: string, slug: string, public_on: string, FeaturedImage: {
                        url: string
                    }
                }) => <Link key={press.slug} href={"/press/" + press.slug} className={cn("font-medium hover:text-orange-600 group flex flex-col text-lg md:text-2xl py-3 w-full")}>
                        <span className="text-sm uppercase opacity-50 flex items-center">
                            PUBLISHED ON {returnDate(press.public_on)}
                        </span>
                        <h3 className="mt-1">
                            {press.title}
                        </h3>
                    </Link>)}
            </div>
        </section>
    </>);
}

export default MediaCenter;