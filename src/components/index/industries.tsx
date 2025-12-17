import { cn } from "@/lib/utils";
import { ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { Button } from "../ui/button";

interface IndustriesProps {
    className?: string
    industries: {
        name: string
        slug: string
        subtitle: string
    }[]
}

const Industries: FunctionComponent<IndustriesProps> = ({ className, industries }) => {
    return (<>
        <section className={cn("", className)}>
            <div className="max-w-6xl py-40 border-x border-dashed border-neutral-300 mx-auto">
                <div className="max-w-5xl mx-auto mb-10 max-sm:px-10">
                    <span className="border-2 max-sm:text-sm rounded-full font-medium py-1 px-3">
                        Who We Work With
                    </span>
                    <h2 className="text-4xl md:text-8xl mt-4 font-semibold">Industries We Enable</h2>
                </div>
                <div className="grid mt-20 divide-x divide-dashed *:p-10 *:md:p-20 border-t border-dashed border-neutral-300 divide-neutral-300 md:grid-cols-2 gap-5">
                    <div>
                        <h3 className="text-2xl opacity-75">
                            Where our capabilities create measurable commercial impact.
                        </h3>
                    </div>
                    <div className="opacity-75">
                        From retail and D2C to technology, hardware, and industrial supply chains, we enable organisations to access markets, modernize operations, improve profitability, and unlock new growth opportunities. Our work adapts to the unique rhythm of each industry, shaping solutions that are commercially grounded and execution-ready.
                    </div>
                </div>
                <div className="grid md:grid-cols-4 max-sm:divide-y md:divide-x divide-neutral-300 border-y border-dashed border-neutral-300 divide-dashed">
                    {industries.map((item, i) =>
                        <div key={i} className="h-64 bg-white p-5 flex flex-col">
                            <h3 className="font-medium text-xl">
                                {item.name}
                            </h3>
                            <p className="mt-1 text-sm text-neutral-500">
                                {item.subtitle}
                            </p>
                            <Button asChild size={"sm"} className="mt-auto w-fit">
                                <Link href={"/industry/" + item.slug}>
                                    Learn more <ChevronRight />
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
                <div className="p-5 flex items-start md:items-center justify-center gap-2 border-b border-neutral-300 text-neutral-500 text-sm border-dashed">
                    <Info className="max-sm:size-5" /> <span className="flex-1">
                        The industries listed here are for showcase purposes only. We work with a wide range of industries beyond those displayed.
                    </span>
                </div>
            </div>
        </section>
    </>);
}

export default Industries;