import { cn } from "@/lib/utils";
import { FunctionComponent } from "react";
import { Button } from "../ui/button";
import { ChevronRight, CircleQuestionMark } from "lucide-react";
import Link from "next/link";

interface CapabilitiesProps {
    className?: string
    capabilities: {
        name: string
        slug: string
        subtitle: string
    }[]
}

const Capabilities: FunctionComponent<CapabilitiesProps> = ({ className, capabilities }) => {
    const data = {
        "sub-title": "Execution-Ready Capabilities for India’s Growth Ambitions",
        "overview": "Rokad’s capabilities go beyond advice—they’re activated infrastructures. Each one is built on real partnerships, field-tested playbooks, and modular design, so you can deploy exactly what you need, when you need it—across product, market, and scale.",
    };
    return (
        <section className={cn("text-white bg-linear-to-b from-rose-950 to-rose-800", className)}>
            <div className="max-w-6xl py-40 max-sm:pb-0 border-x border-dashed border-rose-800 border-t mx-auto">
                <div className="max-w-5xl mx-auto px-5">
                    <div className="grid md:grid-cols-2 gap-10">
                        <div>
                            <span className="border-2 w-fit text-sm rounded-full font-medium py-1 px-3">
                                Rokad&apos;s Capabilities
                            </span>
                            <h3 className="text-3xl md:text-5xl mt-5 font-semibold">
                                <i className="font-thin">The</i> Service Hub
                            </h3>
                        </div>
                        <div>
                            <h3 className="md:text-xl mb-2">
                                {data["sub-title"]}
                            </h3>
                            <p className="text-rose-300 max-sm:text-sm leading-6 max-w-2xl">
                                {data.overview}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid md:divide-x divide-y divide-dashed md:grid-cols-3 mt-40 divide-rose-800 border-t border-dashed border-rose-800 *:nth-[3]:border-r-0 *:nth-[4]:border-b-0 *:nth-[5]:border-b-0">
                    {capabilities.map((item, i) => <div key={i} className="flex flex-col h-80 p-8">
                        <h2 className="text-2xl font-medium mb-2">
                            {item.name}
                        </h2>
                        <p className="text-sm">
                            {item.subtitle}
                        </p>
                        <Button asChild className="bg-white/10 hover:bg-white/20 w-fit pl-5! mt-auto hover:text-white">
                            <Link href={"/capability/" + item.slug}>
                                Learn more <ChevronRight />
                            </Link>
                        </Button>
                    </div>)}
                    <div className="flex flex-col text-center h-80 p-15 bg-rose-800">
                        <CircleQuestionMark className="mx-auto mb-2" strokeWidth={1.5} size={46} />
                        <h2 className="text-2xl font-medium mb-2">
                            Need something else?
                        </h2>
                        <p className="text-sm">
                            Let&apos;s connect, we would love to tailor our solutions to your business needs.
                        </p>
                        <Button asChild className="bg-rose-950 hover:bg-white/20 w-fit pl-5! mt-8 mx-auto hover:text-white">
                            <Link href={"/contact-us"}>
                                Let&apos;s connect <ChevronRight />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Capabilities;