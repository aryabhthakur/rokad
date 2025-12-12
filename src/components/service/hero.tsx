
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Markdown from "react-markdown";
import { Separator } from "../ui/separator";

interface ServiceHeroProps {
    className?: string
    name: string
    subtitle: string
    herotext?: string
    featuredPartnership?: {
        name: string
        desc?: string
        logo: {
            url: string
        }
        news: string
    }[]
}

const ServiceHero: FunctionComponent<ServiceHeroProps> = ({ className, name, subtitle, herotext, featuredPartnership }) => {
    return (<>
        <section className={cn("pt-60", className)}>
            <div className="max-w-6xl pb-30 mx-auto">
                <div className="max-w-5xl mx-auto mb-10">
                    <span className="border-2 rounded-full font-medium py-1 px-3">
                        Service
                    </span>
                    <h2 className="text-8xl mt-4 font-semibold">{name}</h2>
                    <div className="grid mt-20 grid-cols-2 gap-5">
                        <div>
                            <h3 className="text-2xl">{subtitle}</h3>
                        </div>
                        <div>
                            <div className="max-w-lg">
                                {herotext &&
                                    <Markdown>
                                        {herotext}
                                    </Markdown>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {featuredPartnership && <>
                    <div className="mt-25 max-w-5xl mx-auto">
                        {featuredPartnership.map((partner, i) => <div key={i} className="border rounded-xl p-4 gap-5 ">
                            <Image width={128} height={128} alt={partner.name} className="rounded flex-1" src={partner.logo.url} unoptimized />
                            <Separator orientation="vertical" className="bg-orange-500" />
                            <Link href={partner.news} className="font-medium hover:opacity-75 duration-300 py-2 mt-20 w-full group flex text-2xl items-center">
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

export default ServiceHero;