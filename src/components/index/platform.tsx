import { cn } from "@/lib/utils";
import { FunctionComponent } from "react";
import { Button } from "../ui/button";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface PlatformProps {
    className?: string
}

const Platform: FunctionComponent<PlatformProps> = ({ className }) => {
    return (<>
        <section className={cn("flex flex-col relative overflow-hidden", className)}>
            <div className="relative z-20 max-w-6xl pb-15 w-full mx-auto border-dashed border-x border-neutral-300">
                <div className="px-20 py-40 text-center">
                    <span className="border-2 w-fit h-fit text-sm rounded-full font-medium py-1 px-3">
                        Rokad&apos;s AI based Product Suite
                    </span>
                    <h3 className="text-8xl font-semibold mt-5"><i className="font-thin">The</i> AI Platform</h3>
                    <p className="mt-3 mb-6 max-w-xl mx-auto text-neutral-500">A real-time, AI-powered cloud platform that helps businesses understand the market, sell through omnichannel, manage payments, and more — combined with Rokad’s Managed Services to support every stage of the product lifecycle.</p>
                    <div className="flex gap-2 justify-center">
                        <Button className="pl-4!" asChild>
                            <Link href={"/platform"}>
                                Learn more <ArrowUpRight />
                            </Link>
                        </Button>
                        <Button className="pl-4!" asChild variant={"outline"}>
                            <Link href={"/contact-us"}>
                                Talk to an expert <ChevronRight />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="border-t border-dashed border-neutral-300">
                    <div className="text-black *:p-8 font-medium grid grid-cols-3 text-sm divide-x divide-dashed divide-neutral-300 *:border-b *:border-dashed *:border-neutral-300 *:flex  *:items-start *:bg-white space-y-1 *:h-96 *:flex-col">
                        <div>
                            <div className="size-16 bg-orange-100 flex rounded-2xl text-orange-600">
                                <Icon icon={"solar:chat-square-2-bold-duotone"} className="size-11 m-auto" />
                            </div>
                            <h4 className="mt-auto text-2xl">
                                Business Ops
                            </h4>
                            <p className="text-neutral-500">
                                Manage multi-channel orders, payments, supply-chain, inventory, communications & more.
                            </p>
                        </div>
                        <div>
                            <div className="size-16 bg-orange-100 flex rounded-2xl text-orange-600">
                                <Icon icon={"solar:incognito-bold-duotone"} className="size-11 m-auto" />
                            </div>
                            <span className="text-xs mt-auto border rounded-full px-3 py-1 flex gap-1 items-center">
                                <span className="size-1.5 rounded-full bg-green-500 block animate-pulse" />  Backed by Real-time Data
                            </span>
                            <h4 className="mt-2 text-2xl">
                                Market Intelligence
                            </h4>
                            <p className="text-neutral-500">
                                Know what sells — powered by real-time market data and AI-driven insights.
                            </p>
                        </div>
                        <div>
                            <div className="size-16 bg-orange-100 flex rounded-2xl text-orange-600">
                                <Icon icon={"solar:circle-bottom-up-bold-duotone"} className="size-11 m-auto" />
                            </div>
                            <h4 className="mt-auto text-2xl">
                                Marketing Ops
                            </h4>
                            <p className="text-neutral-500">
                                Turn abandoned carts into revenue, leads into customers, and interactions into trust — with AI-driven customer experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default Platform;