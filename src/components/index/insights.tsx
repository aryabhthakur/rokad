import { cn } from "@/lib/utils";
import { FunctionComponent } from "react";
import { Button } from "../ui/button";
import { ArrowUpRight, BadgeInfo, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface InsightsProps {
    className?: string
    insights: {
        Title: string
        slug: string
        FeaturedImage: {
            url: string
        }
    }[]
}

const Insights: FunctionComponent<InsightsProps> = ({ className, insights }) => {
    return (<section className={cn("bg-white border-y border-dashed border-neutral-300", className)}>
        <div className="max-w-6xl border-x pt-40 border-dashed border-neutral-300 mx-auto">
            <div className="max-w-5xl mx-auto mb-10 max-sm:px-5">
                <span className="border-2 rounded-full font-medium py-1 max-sm:text-sm px-3">
                    The Purview
                </span>
                <h2 className="text-4xl md:text-8xl mt-4 font-semibold"><span className="font-thin italic">The</span> Insights</h2>
                <div className="grid mt-20 md:grid-cols-2 gap-5">
                    <div>
                        <h3 className="opacity-75 text-xl md:text-2xl">Frameworks and foresight for leaders building the next decade of India</h3>
                        <Button className="mt-5 pl-5!" asChild>
                            <Link href={"/insights"}>
                                View more <ArrowUpRight />
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
            <div className="mt-20">
                <div className="border-y border-dashed border-neutral-300 px-10 font-medium py-4">
                    Latest Insights, fresh from the <i>Tawa</i>.
                </div>
                <div className="divide-y divide-dashed divide-neutral-300">
                    {insights?.map((insight) => <div key={insight.slug} className="flex gap-4 px-10 py-5">
                        <Image width={128} height={320} alt={insight.Title} className="rounded max-sm:hidden" src={insight.FeaturedImage.url} />
                        <Link href={"/insight/" + insight.slug} className="font-medium w-full hover:text-orange-600 group flex text-lg md:text-2xl">
                            <span className="flex-1">
                                {insight.Title}
                            </span>
                            <span className="size-12 group-hover:bg-white duration-300 flex ml-auto rounded-full">
                                <ArrowUpRight size={36} strokeWidth={1} className="m-auto delay-75 duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </span>
                        </Link>
                    </div>)}
                </div>
                <div className="border-t border-dashed border-neutral-300 p-2">
                    <div className="grid md:grid-cols-2 gap-10 p-5 md:p-20 bg-neutral-100 rounded">
                        <div>
                            <Info size={46} strokeWidth={1.5} />
                            <h3 className="text-2xl md:text-4xl font-medium mb-2 mt-5">
                                We publish weekly.
                            </h3>
                            <p className="opacity-75 leading-6 max-w-2xl">
                                Industry Insights, Global & National Data Reports, Rokad Updates and more, get it delivered to your email or check out our Insight Page feed.
                            </p>
                        </div>
                        <div className="flex max-sm:flex-col max-sm:w-full mt-5 gap-2 md:gap-4">
                            <Button asChild className="pl-5! md:w-fit w-full">
                                <Link href={"/insights"}>
                                    Insights <ArrowUpRight />
                                </Link>
                            </Button>
                            <Button asChild className="pl-5! bg-orange-600 hover:bg-orange-500 md:w-fit w-full">
                                <Link href={"https://tally.so/r/VLjpKy"}>
                                    Newsletters <ArrowUpRight />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>);
}

export default Insights;