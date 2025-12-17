import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { Button } from "./ui/button";

interface InsightsProps {
    className?: string
    insights: {
        Title: string, slug: string, createdAt: string, FeaturedImage: {
            url: string
        }
    }[]
}

const Insights: FunctionComponent<InsightsProps> = ({ className, insights }) => {
    return (<>
        <section className={cn("pb-20", className)}>
            <div className="max-w-5xl mx-auto mb-10 max-sm:px-5">
                <span className="border-2 max-sm:text-sm rounded-full font-medium py-1 px-3">
                    The Purview
                </span>
                <h2 className="text-4xl md:text-8xl mt-4 font-semibold">Industry Insights</h2>
                <div className="grid mt-10 md:mt-20 md:grid-cols-2 gap-5">
                    <div>
                        <h3 className="opacity-75 text-2xl">Frameworks and foresight for leaders building the next decade of India</h3>
                        <Button className="mt-5 pl-5! max-sm:hidden" asChild>
                            <Link href={"/insights"}>
                                Read more <ArrowUpRight />
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <p className="opacity-75 max-w-lg">
                            Our insights track the most important forces shaping growth — consumer behavior, digital infrastructure, retail operations, and brand economics. Each perspective converts noise into clarity, helping leaders make sharper decisions with speed and conviction.
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto mt-20 max-sm:px-5">
                <div className="mb-5">
                    <span className="border-2 max-sm:text-sm rounded-full text-sm font-medium py-1 px-3">
                        Featured Insights
                    </span>
                </div>
                <div className="divide-y">
                    {insights?.map((insight) => <div key={insight.slug} className="flex py-2">
                        <Image width={128} height={320} alt={insight.Title} className="rounded max-sm:hidden" src={insight.FeaturedImage.url} />
                        <Link href={"/insight/" + insight.slug} className="font-medium w-full hover:text-orange-600 group flex text-lg md:text-2xl">
                            <span className="flex-1">
                                {insight.Title}
                            </span>
                            <span className="size-12 group-hover:bg-white duration-300 flex ml-auto rounded-full">
                                <ArrowUpRight strokeWidth={1} className="m-auto delay-75 md:size-9 size-5 duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </span>
                        </Link>
                    </div>)}
                </div>
            </div>
        </section>
    </>);
}

export default Insights;