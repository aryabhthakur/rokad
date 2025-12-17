import { cn } from "@/lib/utils";
import { FunctionComponent } from "react";
import { Button } from "../ui/button";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { DottedMap } from "../ui/dotted-map";
import Markdown from "react-markdown";

interface HeroProps {
    className?: string
    HeroTitle: string
    HeroDesc: string
    HeroSubTitle: string
    partners: {
        logo: {
            url: string
        }
    }[]
}

const markers = [
    {
        lat: 40.7128,
        lng: -74.006,
        size: 0.3,
    }, // New York
    {
        lat: 34.0522,
        lng: -118.2437,
        size: 0.3,
    }, // Los Angeles
    {
        lat: 51.5074,
        lng: -0.1278,
        size: 0.3,
    }, // London
    {
        lat: -33.8688,
        lng: 151.2093,
        size: 0.3,
    }, // Sydney
    {
        lat: 48.8566,
        lng: 2.3522,
        size: 0.3,
    }, // Paris
    {
        lat: 35.6762,
        lng: 139.6503,
        size: 0.3,
    }, // Tokyo
    {
        lat: 55.7558,
        lng: 37.6176,
        size: 0.3,
    }, // Moscow
    {
        lat: 39.9042,
        lng: 116.4074,
        size: 0.3,
    }, // Beijing
    {
        lat: 28.6139,
        lng: 77.209,
        size: 0.3,
    }, // New Delhi
    {
        lat: -23.5505,
        lng: -46.6333,
        size: 0.3,
    }, // São Paulo
    {
        lat: 1.3521,
        lng: 103.8198,
        size: 0.3,
    }, // Singapore
    {
        lat: 25.2048,
        lng: 55.2708,
        size: 0.3,
    }, // Dubai
    {
        lat: 52.52,
        lng: 13.405,
        size: 0.3,
    }, // Berlin
    {
        lat: 19.4326,
        lng: -99.1332,
        size: 0.3,
    }, // Mexico City
    {
        lat: -26.2041,
        lng: 28.0473,
        size: 0.3,
    }, // Johannesburg
]

const Hero: FunctionComponent<HeroProps> = ({ className, HeroTitle, HeroDesc, HeroSubTitle }) => {
    return (<>
        <section className={cn("relative flex", className)}>
            <div className="border-y max-sm:hidden border-dashed h-[640px] w-full top-40 left-0 absolute border-neutral-300" />
            <div className="max-w-6xl bg-accent w-full mx-auto border-dashed border-x border-neutral-300 relative pt-40">
                <div className="h-[640px] border-y border-dashed border-neutral-300 p-1 relative">
                    <div className="bg-white rounded h-full text-center relative z-10 p-5">
                        <div className="absolute w-full z-0 h-full left-0 top-0">
                            <div className="to-white/80 absolute inset-0 bg-radial from-white to-50%" />
                            <DottedMap markers={markers} />
                        </div>
                        <div className="relative flex  flex-col justify-center h-full items-center">
                            <span className="border-2 bg-white w-fit text-xs md:text-sm rounded-full font-medium py-1 px-3">
                                Backend by Real-time Data & Multi-model AI
                            </span>
                            <h1 className="text-4xl md:text-7xl mt-5 font-semibold mb-2">
                                {HeroTitle}
                            </h1>
                            <p className="max-sm:text-sm mb-8">
                                {HeroSubTitle}
                            </p>
                            <div className="text-xs md:text-sm max-w-xl">
                                <Markdown>
                                    {HeroDesc}
                                </Markdown>
                            </div>
                            <div className="flex max-sm:flex-col max-sm:w-full mt-5 gap-2 md:gap-4">
                                <Button className="md:w-fit w-full pl-6! bg-orange-600 hover:bg-orange-800" asChild size={"lg"}>
                                    <Link href={"#hello"}>
                                        Learn more <ChevronRight />
                                    </Link>
                                </Button>
                                <Button className="md:w-fit w-full pl-6!" variant={"outline"} asChild size={"lg"}>
                                    <Link href={"/contact-us"}>
                                        Talk to us <ArrowUpRight />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default Hero;