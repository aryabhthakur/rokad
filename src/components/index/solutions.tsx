"use client"
import { cn } from "@/lib/utils";
import { FunctionComponent, useState } from "react";
import { ArrowUpRight, ChevronDown, CircleQuestionMarkIcon } from "lucide-react";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import Link from "next/link";

interface SolutionsProps {
    className?: string
    solutions: {
        name: string
        slug: string
        desc: string
        features: {
            desc: string
            icon: string
            title: string
        }[]
    }[]
}



const Solutions: FunctionComponent<SolutionsProps> = ({ className, solutions }) => {
    const [curent, setCurent] = useState<string | null>("Acquisition")
    const data = {
        "sub-title": "Strategic Excellence Across the Business Lifecycle.",
        "overview": "At Rokad we engineer end‑to‑end consulting that propels every stage of a product’s journey—from conception and procurement through market entry, customer acquisition, digital transformation, and the integration of modern technology. Our modular solutions are scalable, industry‑agnostic, and custom‑fitted to your unique business challenges.",
    }

    return (<div className={cn("px-5 bg-linear-to-b from-purple-950 to-purple-800 text-white", className)}>
        <div className="max-w-6xl border-x border-dashed border-purple-500 py-40 mx-auto">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 max-sm:px-5 gap-10">
                <div>
                    <h3 className="text-4xl md:text-6xl font-medium md:leading-18">
                        Solutions That Scale
                    </h3>
                </div>
                <div>
                    <h3 className="md:text-xl mb-2">
                        {data["sub-title"]}
                    </h3>
                    <p className="text-purple-300 leading-6 max-w-2xl max-sm:text-sm">
                        {data.overview}
                    </p>
                </div>
            </div>
        </div>
        <div className="max-w-6xl border-y border-dashed border-purple-500 mx-auto divide-y divide-dashed divide-purple-500">
            {solutions.map((item, i) => <div key={i} data-active={item.name === curent} className="border-x border-dashed border-purple-500 data-[active=true]:bg-purple-400/10 duration-300">
                <button onClick={() => setCurent(item.name)} className="grid text-left cursor-pointer grid-cols-2 p-8 hover:bg-purple-400/10 w-full">
                    <h4 className="text-lg md:text-4xl font-medium">
                        {item.name} <ChevronDown data-active={item.name === curent} className="inline data-[active=true]:-rotate-90 duration-500 size-5 md:size-9" />
                    </h4>
                    <p className="">
                        {item.desc}
                    </p>
                </button>
                <div data-active={item.name === curent} className="grid border-t border-dashed border-purple-500 md:grid-cols-3 h-0 mt-0 mb-0 opacity-0 data-[active=true]:opacity-100 duration-300 invisible data-[active=true]:visible data-[active=true]:h-auto max-sm:divide-y md:divide-x divide-purple-500 divide-dashed">
                    {item.features?.map((m, im) => <div className="p-10" key={im}>
                        <div className="size-10 md:size-14 bg-purple-950 flex rounded-lg mb-5">
                            <Icon icon={m.icon} className="m-auto size-5 md:size-7 text-purple-300" strokeWidth={1} />
                        </div>
                        <h4 className="md:text-lg">{m.title}</h4>
                        <p className="mt-2 max-sm:text-sm">
                            {m.desc}
                        </p>
                    </div>)}
                </div>
            </div>)}
        </div>
        <div className="max-w-6xl border-x border-dashed border-purple-500 p-2 mx-auto">
            <div className="grid md:grid-cols-2 gap-10 p-5 md:p-20 bg-purple-600 rounded">
                <div>
                    <CircleQuestionMarkIcon className="size-8 md:size-11" strokeWidth={1.5} />
                    <h3 className="md:text-2xl text-lg mb-2 mt-5">
                        Want something tailored to your business&apos;s requirements?
                    </h3>
                    <p className="opacity-75 leading-6 max-sm:text-sm max-w-2xl">
                        We at Rokad offer our customer personalized solution for their business needs.
                    </p>
                </div>
                <div className="flex flex-col items-start md:items-end justify-center">
                    <Button asChild variant={"secondary"} className="pl-5! mt-4">
                        <Link href={"/contact-us"}>
                            Talk to us <ArrowUpRight />
                        </Link>
                    </Button>
                    <Button asChild className="pl-5! bg-orange-600 hover:bg-orange-500 mt-4">
                        <Link href={"/contact-us"}>
                            Schedule a Callback <ArrowUpRight />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    </div>);
}

export default Solutions;