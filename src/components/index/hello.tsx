'use client'

import { cn } from "@/lib/utils";
import { FunctionComponent, useState } from "react";
import { Button } from "../ui/button";
import { ArrowUpRight, Asterisk, ChevronRight } from "lucide-react";
import Link from "next/link";

interface HelloProps {
    className?: string
}

const Hello: FunctionComponent<HelloProps> = ({ className }) => {
    const capabilities = [{
        name: 'Market Accessibility',
        href: '/capability/market-accessibility',
        preview: {
            desc: 'Rokad helps companies with great products tap into market segment and have access to already established market channels, to maximize their revenue growth.',
            image: '/market.jpg',
            points: ["Nationwide offline store access, across Tier 1, 2, and 3 cities.", "Access to Online Sales channels across multiple ecommerce/marketplaces.", "Access to our Strategic Logistic partner network for shipping and warehousing."]
        }
    }, {
        name: 'Digital Transformation',
        href: '/capability/digital-transformation',
        preview: {
            desc: 'Rokad identifies and delivers high-impact results to build companies of the future that will outperform the competition in the future.',
            image: '/dexp.jpg',
            points: ["Unified, AI-focused sales automation designed to optimize performance across every channel.", "Empower your business with a connected digital ecosystem — online stores, smart POS, and a single dashboard for everything.", "Achieve smarter, more efficient operations with our expertly developed digital strategy."]
        }
    }, {
        name: 'Customer Strategy',
        href: '/capability/customer-strategy',
        preview: {
            desc: 'Rokad helps companies to connect with right customer, to drive max results via segmentation and tap into right base.',
            image: '/customer.jpg',
            points: ["End-to-end customer acquisition strategy — integrating digital and on-ground channels for maximum reach.", "Data-driven audience segmentation that ensures precise targeting and maximized conversion rates.", "Gain real-time insights into performance, audience behavior, and brand impact — all through a unified digital dashboard."]
        }
    }, {
        name: 'GTM Strategy',
        href: '/capability/gtm-strategy',
        preview: {
            desc: 'Our experts provide detailed market strategy for companies to identify their customer and develop sales channel accordingly.',
            image: '/sales.jpg',
            points: ["Comprehensive market entry planning — combining online presence with offline activation for maximum impact.", "Strategic pricing research and development to position your brand’s market entry as truly groundbreaking.", "End-to-end sales channel development to ensure a seamless, multi-platform market entry for your brand."]
        }
    }, {
        name: 'BOM Procurement',
        href: '/capability/bom-procurement',
        preview: {
            desc: 'Building something incredible? Our experts help companies procure according to their BOM needs, sourcing components and material from all around the globe, with a steady supply-chain.',
            image: '/supply.jpg',
            points: ["End-to-end supply chain development ensuring consistent availability of every component in your BOM.", "Intelligent supplier management that automatically reallocates orders during delays, ensuring consistent component supply.", "A global supplier network — connecting you with reliable domestic and international partners for cost-efficient component sourcing."]
        }
    }]
    const [preview, setPreview] = useState<typeof capabilities[0] | null>(capabilities[0])
    const onCapabilitySelect = (val: string) => {
        const ni = capabilities.findIndex(v => v.name === val)
        setPreview(capabilities[ni])
    }
    return (
        <section id="hello" className={cn("pt-40 -mt-40  relative", className)}>
            <div className="max-w-7xl relative z-10 mx-auto from-white to-neutral-100 bg-gradient-to-br rounded overflow-hidden">
                <div className="grid grid-cols-2">
                    <div className="p-15 flex flex-col border-b border-l border-white">
                        <h3 className={cn("text-6xl font-semibold leading-20")}>
                            How can we help you today?
                        </h3>
                        <p className="mt-80">
                            Learn more about our offerings by selecting your topic of interest or let us know about your requirement.
                        </p>
                        <div className="flex flex-wrap mt-5 gap-2">
                            {capabilities.map((item, i) => <Button key={i} onClick={() => onCapabilitySelect(item.name)} variant={preview?.name === item.name ? 'default' : 'outline'} className="cursor-pointer transition-colors">{item.name}</Button>)}
                        </div>
                    </div>
                    <div className="relative overflow-hidden">
                        {capabilities.map((item) => <div key={item.name}>
                            <div style={{ backgroundImage: `url('${item?.preview.image}')` }} className="w-full h-full bg-center bg-cover absolute z-0 invisible opacity-0 duration-400 data-[active=true]:visible data-[active=true]:opacity-100 animate-[custom-scale-animation_25s_ease-in-out_infinite]" data-active={item.name === preview?.name} />
                            <div data-active={item.name === preview?.name} className="p-8 absolute z-30 invisible opacity-0 duration-500 data-[active=true]:visible h-full data-[active=true]:opacity-100 translate-y-10 data-[active=true]:translate-y-0">
                                <div className="bg-white min-h-full p-8 flex flex-col rounded">
                                    <h3 className="font-medium text-3xl">{item?.name}</h3>
                                    <p className="mt-2">{item?.preview.desc}</p>
                                    {item.preview.points && <div className="mt-5 space-y-2">
                                        {item.preview.points.map((item, i) => <div key={i} className="border flex bg-white rounded text-sm p-5 gap-2">
                                            <Asterisk color="#ff5d00" size={24} className="min-w-6" />
                                            <div className="">
                                                {item}
                                            </div>
                                        </div>)}
                                    </div>}
                                    <Button asChild size={"lg"} className="w-fit group !pl-5 mt-5">
                                        <Link href={item.href}>
                                            Learn more <ChevronRight className="group-hover:translate-x-1 duration-300" />
                                        </Link>
                                    </Button>
                                    <div className="mt-auto p-5 bg-accent items-center rounded-2xl flex">
                                        <span className="font-medium text-sm">How can we help you? Tell us your requirements.</span>
                                        <Button asChild size={"sm"} className="w-fit group bg-orange-600 hover:bg-orange-800 ml-auto !pl-5">
                                            <Link href={"/contact-us"}>
                                                Talk to us <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hello;