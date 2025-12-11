'use client'

import { FunctionComponent } from "react";
import { ArrowUpRight, ChevronRight, Info } from "lucide-react";
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart } from "recharts"
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
} satisfies ChartConfig

interface HeroProps {
    className?: string
}

const Hero: FunctionComponent<HeroProps> = ({ className }) => {
    return (<section className={cn(className, "h-screen mb-30")}>
        <div className="max-w-7xl h-full pt-60 pb-30 relative mx-auto">
            <div className="max-w-6xl w-full mx-auto h-[720px] absolute top-45 left-15 border border-dashed border-neutral-300 z-0" />
            <div className="bg-white z-10 absolute top-54 left-0 w-64 rounded p-5">
                <div className="flex text-sm items-center gap-1 font-medium text-neutral-300">
                    <Info size={14} /> Industry Insight
                </div>
                <h2 className="font-medium">E-Commerce</h2>
                <ChartContainer config={chartConfig} className="h-18 w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </div>
            <div className="bg-white z-10 w-64 font-medium absolute top-72 p-5 right-0 rounded">
                <div className="flex text-sm items-center gap-1 text-neutral-300">
                    <Info size={14} /> Business Insight
                </div>
                <h2 className="mb-4">ABC Colthing</h2>
                <p className="text-xs">
                    Est. Since Aug. 2001
                </p>
                <Separator className="my-2" />
                <p className="text-xs">
                    <span className="text-neutral-500">Key People:</span> Ajay Bhatia & AB Kumar
                </p>
                <Separator className="my-2" />
                <p className="text-xs">
                    <span className="text-neutral-500">Industry:</span> Textile Manufacturing
                </p>
                <Separator className="my-2" />
                <p className="text-xs">
                    <span className="text-neutral-500">Rev. 2024:</span> 24Cr INR
                </p>
            </div>
            <div className="bg-white z-10 w-64 h-48 p-5 absolute bottom-2 right-10 rounded">
                <div className="flex text-sm items-center gap-1 font-medium text-neutral-300">
                    <Info size={14} /> Market Insight
                </div>
                <h2 className="font-medium">ABC Colthing</h2>
            </div>
            <div className="bg-white z-10 w-80 h-20 absolute bottom-5 left-[37.5%] rounded-xl p-5">

            </div>
            <div className="bg-white z-10 w-64 h-48 absolute bottom-20 p-5 left-5 rounded">
                <div className="flex text-sm items-center gap-1 font-medium text-neutral-300">
                    <Info size={14} /> Financial Insight
                </div>
                <h2 className="font-medium">TMPV (Tata Motors)</h2>
            </div>
            <div className="relative z-10 max-w-5xl mx-auto bg-radial from-neutral-100/50 to-transparent from-25% to-70% h-full">
                <div className="px-20 py-40 text-center">
                    <span className="border-2 w-fit h-fit flex items-center mx-auto text-sm rounded-full font-medium py-1 px-3">
                        <span className="size-1.5 rounded-full bg-green-500 animate-pulse mr-1" /> Backed by Real-time data
                    </span>
                    <h3 className="text-7xl font-semibold mt-5"><i className="font-thin">The</i> AI Platform</h3>
                    <p className="mt-3 text-sm mb-6 max-w-xl mx-auto text-neutral-500">A real-time, AI-powered cloud platform that helps businesses understand the market, sell through omnichannel, manage payments, and more — combined with Rokad’s Managed Services to support every stage of the product lifecycle.</p>
                    <div className="flex gap-2 justify-center">
                        <Button className="pl-4!" asChild>
                            <Link href={"https://tally.so/r/EkK6ql"} target="_blank">
                                Join the Waitlist <ArrowUpRight />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </section>);
}

export default Hero;