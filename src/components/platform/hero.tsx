'use client'

import { FunctionComponent, useState } from "react";
import { ArrowUpRight, ChevronDown, MousePointerClick, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { FlickeringGrid } from "../ui/flickering-grid";
import Image from "next/image";

interface HeroProps {
    className?: string
}

const Hero: FunctionComponent<HeroProps> = ({ className }) => {
    const [activeApp, setActiveApp] = useState<typeof apps[0] | null>(null)
    const apps = [{
        name: "O",
        window: "Orders",
    }, {
        name: "G",
        window: "GST",
    }, {
        name: "C",
        window: "Communication",
    }, {
        name: "S",
        window: "Supply chain",
    }, {
        name: "W",
        window: "Warehouses",
    }, {
        name: "I",
        window: "Industry",
    }, {
        name: "M",
        window: "Market",
    }, {
        name: "B",
        window: "Business",
    },]
    return (<section className={cn(className, "pt-30 md:pt-50")}>
        <div className="relative z-10 max-w-6xl max-sm:border-t-0 border border-dashed divide-x divide-dashed border-neutral-300 divide-neutral-300 grid md:grid-cols-2 mx-auto h-full">
            <div className="p-8 flex flex-col md:h-[640px]">
                <span className="border-2 rounded-full font-medium flex items-center text-sm w-fit py-1 px-3">
                    <span className="size-2 rounded-full animate-bounce mr-1 bg-blue-500"></span> Powered by Custom AI models
                </span>
                <h3 className="text-4xl md:text-7xl mt-5">Business <span className="py-1 md:py-2 px-2 md:px-4 bg-neutral-950 font-semibold text-white rounded-xl md:rounded-3xl">OS</span></h3>
                <h4 className="mt-8 md:mt-auto text-lg mb-2">
                    One platform powering execution, intelligence, and growth.
                </h4>
                <p className="text-sm mb-6 max-w-xl mx-auto text-neutral-500">A real-time, AI-powered cloud platform that helps businesses understand the market, sell through omnichannel, manage payments, and more — combined with Rokad’s Managed Services to support every stage of the product lifecycle.</p>
                <div className="flex gap-2">
                    <Button className="pl-4! bg-orange-600 hover:bg-orange-500" asChild>
                        <Link href={"https://tally.so/r/EkK6ql"} target="_blank">
                            Join the Waitlist <ArrowUpRight />
                        </Link>
                    </Button>
                    <Button className="pl-4!" variant={"outline"} asChild>
                        <Link href={"#modules"}>
                            Learn more <ChevronDown />
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="relative">
                <FlickeringGrid squareSize={1} className="absolute top-0 left-0" />
                <div className="relative h-full z-10 flex flex-col">
                    <div className="h-full p-6 md:p-12 *:bg-white *:relative *:border-2 *:rounded-lg *:min-h-64 *:size-full flex *:m-auto">
                        {activeApp === null ? <>
                            <div className="flex flex-col items-center justify-center md:gap-5">
                                <MousePointerClick className="size-7 md:size-14 text-neutral-300" />
                                <div className="md:text-3xl font-medium text-neutral-300">
                                    Select an App
                                </div>
                            </div>
                        </> : activeApp.name === "O" ? <>
                            <div>
                                <button onClick={() => setActiveApp(null)} className="absolute hover:text-red-500 right-2 top-2">
                                    <X className="size-4" />
                                </button>
                                <div className="py-1 text-sm text-neutral-500 px-3 border-b">
                                    Multi-channel Order Manager
                                </div>
                                <div className="p-5">
                                    <h2 className="font-medium text-neutral-500">
                                        Orders
                                    </h2>
                                    <div className="space-y-2">
                                        {["/amazon.png", "/flipkart.png", "/shopify.png", "/woocommerce.png"].map((item) => <div key={item} className="flex gap-2 h-12 rounded-2xl border px-5 items-center">
                                            <div className="h-4 w-12 md:w-24 bg-neutral-200 rounded-full" />
                                            <div className="h-4 w-12 md:w-24 bg-neutral-200 rounded-full" />
                                            <div className="h-4 w-12 md:w-24 bg-neutral-200 rounded-full" />
                                            <Image alt={item} width={64} height={96} src={item} className="ml-auto" />
                                        </div>)}
                                    </div>
                                </div>
                            </div>
                        </> : activeApp.name === "G" ? <>
                            <div>
                                <button onClick={() => setActiveApp(null)} className="absolute hover:text-red-500 right-2 top-2">
                                    <X className="size-4" />
                                </button>
                                <div className="py-1 text-sm text-neutral-500 px-3 border-b">
                                    Automated GST Filling
                                </div>
                                <div className="p-5">
                                    <h2 className="font-medium text-neutral-500">
                                        Invoices
                                    </h2>
                                    <div className="space-y-2">
                                        {Array.from({ length: 3 }).map((v, i) => <div key={i} className="flex gap-2 h-12 rounded-2xl border px-5 items-center">
                                            <div className="h-4 w-12 md:w-24 bg-neutral-200 rounded-full" />
                                            <div className="h-4 w-12 md:w-24 bg-neutral-200 rounded-full" />
                                            <div className="h-4 w-12 md:w-24 bg-neutral-200 rounded-full" />
                                        </div>)}
                                    </div>
                                    <Button size={"sm"} className="mt-2 bg-orange-600 opacity-50">
                                        File GST
                                    </Button>
                                </div>
                            </div>
                        </> : activeApp.name === "C" ? <>
                            <div>
                                <button onClick={() => setActiveApp(null)} className="absolute hover:text-red-500 right-2 top-2">
                                    <X className="size-4" />
                                </button>
                                <div className="py-1 text-sm text-neutral-500 px-3 border-b">
                                    Multi-channel Customer Communication
                                </div>
                                <div className="p-5">
                                    <h2 className="font-medium text-neutral-500">
                                        Messages
                                    </h2>
                                    <div className="space-y-2">
                                        {["Shopify", "Amazon", "Meesho", "Flipkart"].map((v, i) => <div key={i} className="flex gap-2 h-12 rounded-2xl border px-5 items-center">
                                            <div className="h-4 w-12 md:w-24 bg-neutral-200 rounded-full" />
                                            <div className="h-4 w-12 md:w-24 bg-neutral-200 rounded-full" />
                                            <div className="h-4 w-12 md:w-24 bg-neutral-200 rounded-full" />
                                            <div className="ml-auto text-sm text-neutral-500">
                                                {v}
                                            </div>
                                        </div>)}
                                    </div>
                                </div>
                            </div>
                        </> : <></>}
                    </div>
                    <div className="p-8 bg-neutral-100 mt-auto border-t border-dashed border-neutral-300 flex items-center flex-wrap gap-4 relative">
                        <span className="absolute bg-primary text-white rounded-full text-sm py-1.5 px-3 -top-5">
                            {activeApp == null ? <>Select an App</> : activeApp.window}
                        </span>
                        {apps.map((item) => <button data-active={activeApp?.name === item.name} onClick={() => setActiveApp(item)} className="size-14 cursor-pointer data-[active=true]:bg-white border-b-4 data-[active=true]:border-transparent flex hover:bg-border border rounded-xl" key={item.name}>
                            <span className="m-auto text-sm">
                                {item.name}
                            </span>
                        </button>)}
                        <span className="text-sm text-neutral-500">
                            more to come...
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>);
}

export default Hero;