
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Markdown from "react-markdown";
import { Separator } from "../ui/separator";

interface CapabillityHeroProps {
    className?: string
    name: string
    subtitle: string
    HeroDesc?: string
    featuredPartnership?: {
        name: string
        desc?: string
        logo: {
            url: string
        }
        news: string
    }[]
}

const CapabillityHero: FunctionComponent<CapabillityHeroProps> = ({ className, name, subtitle, HeroDesc, featuredPartnership }) => {
    return (<>
        <section className={cn("", className)}>
            <div className="border-t border-dashed h-[630px] w-full top-40 left-0 border-neutral-300 absolute" />
            <div className="max-w-6xl relative z-10 pt-40 border-x border-dashed border-neutral-300 mx-auto">
                <div className="grid gap-10 grid-cols-2 divide-x divide-dashed divide-neutral-300">
                    <div className="p-8 pt-30 pb-30">
                        <span className="border-2 w-fit text-sm rounded-full font-medium py-1 px-3">
                            Capability
                        </span>
                        <h2 className="text-6xl leading-20 mt-5 font-semibold">{name}</h2>
                    </div>
                    <div className="text-sm max-w-lg space-y-5 p-8 pt-20">
                        <h3 className="font-medium text-lg">{subtitle}</h3>
                        {HeroDesc &&
                            <Markdown>
                                {HeroDesc}
                            </Markdown>
                        }
                    </div>
                </div>
                {featuredPartnership && <>
                    <div className="border-t border-dashed border-neutral-300">
                        {featuredPartnership.map((partner, i) => <div key={i} className="p-8 gap-5">
                            <Image width={96} height={128} alt={partner.name} className="flex-1" src={partner.logo.url} unoptimized />
                            <Separator orientation="vertical" className="bg-orange-500" />
                            <Link href={"/press/" + partner.news} className="font-medium hover:opacity-75 duration-300 py-2 mt-8 w-full group flex text-2xl items-center">
                                <span className="flex flex-col">
                                    <span className="text-xl font-medium">
                                        {partner.name}
                                    </span>
                                    <span className="text-sm">
                                        {partner.desc}
                                    </span>
                                </span>
                                <span className="size-12 flex rounded-full ml-auto">
                                    <ArrowUpRight size={36} strokeWidth={1} className="m-auto delay-75 duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </span>
                            </Link>
                        </div>)}
                    </div>
                </>}
            </div >
        </section >
    </>);
}

export default CapabillityHero;