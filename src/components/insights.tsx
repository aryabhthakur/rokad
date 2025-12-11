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
            <div className="max-w-5xl mx-auto mb-10">
                <span className="border-2 rounded-full font-medium py-1 px-3">
                    The Purview
                </span>
                <h2 className="text-8xl mt-4 font-semibold">Industry Insights</h2>
                <div className="grid mt-20 grid-cols-2 gap-5">
                    <div>
                        <h3 className="opacity-75 text-2xl">Frameworks and foresight for leaders building the next decade of India</h3>
                        <Button className="mt-5 pl-5!" asChild>
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
            <div className="max-w-5xl mx-auto space-y-5 divide-y mt-20">
                <div>
                    Featured
                </div>
                {insights?.map((insight) => <div key={insight.slug} className="space-y-3 flex gap-4">
                    <Image width={128} height={320} alt={insight.Title} className="rounded" src={process.env.NEXT_CMS_URL + insight.FeaturedImage.url} />
                    <Link href={"/insight/" + insight.slug} className="font-medium w-full hover:text-orange-600 group flex text-2xl">
                        <span className="flex-1">
                            {insight.Title}
                        </span>
                        <span className="size-12 group-hover:bg-white duration-300 flex ml-auto rounded-full">
                            <ArrowUpRight size={36} strokeWidth={1} className="m-auto delay-75 duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                    </Link>
                </div>)}
            </div>
        </section>
    </>);
}

export default Insights;