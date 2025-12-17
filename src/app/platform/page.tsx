import Hero from "@/components/platform/hero";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


function Platform() {
    const integrations = ["/bse.png", "/nse.png", "/zoho.svg", "/Amazon.svg", "/flipkart.png", "/delhivery.png", "/razorpay.png", "/blue-dart.png"]
    return (<>
        <Hero />
        <section id="modules">
            <div className="max-w-6xl mx-auto pt-20 md:pt-40 pb-20 border-x border-neutral-300 border-dashed">
                <div className="max-w-5xl max-sm:px-5 mx-auto">
                    <span className="border-2 w-fit h-fit flex items-center text-sm rounded-full font-medium py-1 px-3">
                        <span className="size-1.5 rounded-full bg-green-500 animate-pulse mr-1" /> Backed by real-time data
                    </span>
                    <h2 className="text-4xl md:text-7xl mt-4 font-semibold">
                        <span className="font-thin italic">The</span> Product Suite
                    </h2>
                    <div className="grid mt-10 md:mt-20 md:grid-cols-2 gap-5">
                        <div>
                            <h3 className="text-xl md:text-2xl opacity-75">
                                Operate better. Decide faster. Grow smarter.
                            </h3>
                        </div>
                        <div className="opacity-75 text-sm">
                            Our platform is engineered to solve real business problems — operational inefficiency, limited visibility, and fragmented growth efforts. Each product delivers standalone value, while their combined power creates a connected system that improves profitability and scalability.
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl md:mt-20 mt-10 grid md:grid-cols-3 divide-x border-y border-dashed border-neutral-300 divide-dashed mx-auto">
                    <div className="col-span-1 p-1 h-90">
                        <div className="bg-white p-5 h-full flex flex-col">
                            <div className="size-14 flex rounded-xl bg-orange-100 text-orange-600">
                                <Icon icon={"solar:settings-minimalistic-bold-duotone"} className="size-8 m-auto" />
                            </div>
                            <h2 className="text-xl font-medium mt-auto">
                                Business Ops
                            </h2>
                            <p className="text-sm mt-2 text-neutral-500">
                                Manage multi-channel orders, cataloging, supply chain, and communications — with real-time analytics, inventory management, bookkeeping, GST filing and more — all from one platform.
                            </p>
                        </div>
                    </div>
                    <div className="col-span-2 p-1 h-90">
                        <div className="bg-white p-5 h-full flex relative flex-col">
                            <div className="size-14 flex rounded-xl bg-orange-100 text-orange-600">
                                <Icon icon={"solar:layers-bold-duotone"} className="size-8 m-auto" />
                            </div>
                            <h2 className="text-xl font-medium mt-auto">
                                Intelligence Ops
                            </h2>
                            <p className="text-sm mt-2 text-neutral-500">
                                Get real-time industry, market, and business insights — along with financial data and current news — to make informed business decisions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="integrations">
            <div className="max-w-6xl mx-auto pb-20 border-x border-neutral-300 border-dashed">
                <div className="max-w-6xl mx-auto p-8 border-y border-neutral-300 border-dashed">
                    <span className="border-2 max-sm:text-xs rounded-full font-medium py-1 px-3">
                        Integrated with Industry Leaders & Partners
                    </span>
                    <div className="grid *:h-36 mt-5 md:grid-cols-4">
                        {integrations.map((int, i) => <div key={i} className="p-1">
                            <div className="bg-white flex items-center justify-center h-full rounded" >
                                <Image alt={int} width={128} height={96} src={int} />
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </section>
        <section id="marketplace">
            <div className="max-w-6xl mx-auto pb-20 border-x border-neutral-300 border-dashed">
                <div className="max-w-6xl mx-auto border-y border-neutral-300 border-dashed">
                    <div className="p-1">
                        <div className="bg-white text-center h-96 rounded">
                            <div className="max-w-2xl flex flex-col py-10 mx-auto">
                                <div className="size-14 flex mx-auto rounded-xl bg-orange-100 text-orange-600">
                                    <Icon icon={"solar:cart-large-bold-duotone"} className="size-8 m-auto" />
                                </div>
                                <h2 className="text-2xl md:text-4xl font-semibold mt-10">
                                    The Rokad Marketplace
                                </h2>
                                <h4 className="md:text-lg text-neutral-500">
                                    Where commerce meets execution
                                </h4>
                                <p className="text-sm mt-4 text-neutral-500">
                                    Built for modern B2B trade, our marketplace connects buyers and sellers while handling shipping, fulfilment, and supply-chain coordination behind the scenes. Businesses gain access to reliable sourcing, predictable deliveries, and operational control without managing logistics themselves.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid nd:grid-cols-3 border-t border-dashed border-neutral-300 divide-x divide-dashed divide-neutral-300 *:h-56 *:flex *:flex-col font-medium *:p-5">
                        <div>
                            <div className="size-10 flex rounded-xl bg-neutral-200 text-neutral-600">
                                <Icon icon={"solar:bolt-circle-bold-duotone"} className="size-6 m-auto" />
                            </div>
                            <h2 className="mt-auto text-lg">
                                Supply Chain Robustness
                            </h2>
                            <h4 className="text-neutral-500">
                                Built to move volume reliably, even at scale.
                            </h4>
                        </div>
                        <div>
                            <div className="size-10 flex rounded-xl bg-neutral-200 text-neutral-600">
                                <Icon icon={"solar:plug-circle-bold-duotone"} className="size-6 m-auto" />
                            </div>
                            <h2 className="mt-auto text-lg">
                                Integrated with Industry Leaders
                            </h2>
                            <h4 className="text-neutral-500">
                                Connected to platforms and partners that power modern commerce.
                            </h4>
                        </div>
                        <div>
                            <div className="size-10 flex rounded-xl bg-neutral-200 text-neutral-600">
                                <Icon icon={"solar:box-bold-duotone"} className="size-6 m-auto" />
                            </div>
                            <h2 className="mt-auto text-lg">
                                Handpicked Suppliers
                            </h2>
                            <h4 className="text-neutral-500">
                                Quality, reliability, and consistency built into the network.
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="enterprise">
            <div className="max-w-6xl mx-auto pb-20 border-x border-neutral-300 border-dashed">
                <div className="grid md:grid-cols-2 mx-auto divide-x divide-dashed divide-neutral-300 border-y border-neutral-300 border-dashed">
                    <div className="p-1 min-h-[640px]">
                        <div className="bg-white h-full p-8 flex flex-col rounded">
                            <div className="size-14 flex rounded-xl bg-orange-100 text-orange-600">
                                <Icon icon={"solar:users-group-two-rounded-bold-duotone"} className="size-8 m-auto" />
                            </div>
                            <h2 className="text-2xl font-medium mt-auto">
                                Designed for Enterprise Adoption
                            </h2>
                            <h5 className="text-neutral-500">
                                Built to meet the demands of scale, security, and operational reliability.
                            </h5>
                            <p className="text-sm mt-5 text-neutral-500">
                                Our platforms are engineered for enterprise environments where performance, security, compliance, and integration are non-negotiable. From robust access controls and data governance to scalable architecture and seamless system integration, every layer is designed to support mission-critical operations with confidence.
                            </p>
                            <Button className="pl-4! md:w-fit w-full mt-8" asChild>
                                <Link href={"/contact-us"}>
                                    Talk to an expert <ChevronRight />
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="grid divide-y *:flex *:gap-5 *:items-center *:p-8 divide-dashed divide-neutral-300">
                        <div>
                            <div className="size-14 flex mx-auto rounded-xl bg-neutral-200 text-neutral-600">
                                <Icon icon={"solar:users-group-rounded-bold-duotone"} className="size-8 m-auto" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-medium">
                                    Team Collaboration
                                </h2>
                                <h4 className="text-sm text-neutral-500">
                                    Built for cross-functional teams at scale.
                                </h4>
                            </div>
                        </div>
                        <div>
                            <div className="size-14 flex mx-auto rounded-xl bg-neutral-200 text-neutral-600">
                                <Icon icon={"solar:shield-user-bold-duotone"} className="size-8 m-auto" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-medium">
                                    Role-Based Access Control
                                </h2>
                                <h4 className="text-sm text-neutral-500">
                                    The right access for the right people.
                                </h4>
                            </div>
                        </div>
                        <div>
                            <div className="size-14 flex mx-auto rounded-xl bg-neutral-200 text-neutral-600">
                                <Icon icon={"solar:shield-star-bold-duotone"} className="size-8 m-auto" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-medium">
                                    Security & Compliance
                                </h2>
                                <h4 className="text-sm text-neutral-500">
                                    Enterprise-grade protection built into the platform.
                                </h4>
                            </div>
                        </div>
                        <div>
                            <div className="size-14 flex mx-auto rounded-xl bg-neutral-200 text-neutral-600">
                                <Icon icon={"solar:verified-check-bold-duotone"} className="size-8 m-auto" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-medium">
                                    SLA-Backed Reliability
                                </h2>
                                <h4 className="text-sm text-neutral-500">
                                    Predictable performance for mission-critical operations.
                                </h4>
                            </div>
                        </div>
                        <div>
                            <div className="size-14 flex mx-auto rounded-xl bg-neutral-200 text-neutral-600">
                                <Icon icon={"solar:user-check-bold-duotone"} className="size-8 m-auto" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-medium">
                                    Auditability & Governance
                                </h2>
                                <h4 className="text-sm text-neutral-500">
                                    Transparency without operational friction.
                                </h4>
                            </div>
                        </div>
                        <div>
                            <div className="size-14 flex mx-auto rounded-xl bg-neutral-200 text-neutral-600">
                                <Icon icon={"solar:server-square-cloud-bold-duotone"} className="size-8 m-auto" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-medium">
                                    Scalable Architecture
                                </h2>
                                <h4 className="text-sm text-neutral-500">
                                    Designed to grow with your organisation.
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="developer">
            <div className="max-w-6xl mx-auto pb-20 border-x border-neutral-300 border-dashed">
                <div className="max-w-6xl grid mx-auto divide-y divide-dashed divide-neutral-300 border-y border-neutral-300 border-dashed">
                    <div className="p-8">
                        <h2 className="text-2xl font-medium mt-auto">
                            Developer Resources
                        </h2>
                        <h4 className="text-neutral-500">
                            Everything developers need to build, integrate, and scale with confidence.
                        </h4>
                    </div>
                    <div className="grid md:grid-cols-3 divide-x divide-dashed divide-neutral-300">
                        <div className="p-1">
                            <div className="bg-white p-8 h-96 rounded flex flex-col">
                                <div className="size-14 flex rounded-xl bg-neutral-100 text-neutral-600">
                                    <Icon icon={"solar:notebook-square-bold-duotone"} className="size-8 m-auto" />
                                </div>
                                <h2 className="text-lg font-medium mt-auto">
                                    Documentation
                                </h2>
                                <h4 className="text-sm font-medium text-neutral-500">
                                    Clear, structured, and built for production use.
                                </h4>
                            </div>
                        </div>
                        <div className="p-1">
                            <div className="bg-white p-8 h-96 rounded flex flex-col">
                                <div className="size-14 flex rounded-xl bg-neutral-100 text-neutral-600">
                                    <Icon icon={"solar:notebook-square-bold-duotone"} className="size-8 m-auto" />
                                </div>
                                <h2 className="text-lg font-medium mt-auto">
                                    Real-Time APIs & WebSockets
                                </h2>
                                <h4 className="text-sm font-medium text-neutral-500">
                                    Live data, instant updates, reliable delivery.
                                </h4>
                            </div>
                        </div>
                        <div className="p-1">
                            <div className="bg-white p-8 h-96 rounded flex flex-col">
                                <div className="size-14 flex rounded-xl bg-neutral-100 text-neutral-600">
                                    <Icon icon={"solar:code-square-bold-duotone"} className="size-8 m-auto" />
                                </div>
                                <h2 className="text-lg font-medium mt-auto">
                                    API References & SDKs
                                </h2>
                                <h4 className="text-sm font-medium text-neutral-500">
                                    Consistent interfaces across languages and systems.
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="cta">
            <div className="max-w-6xl mx-auto pb-20 border-x border-neutral-300 border-dashed">
                <div className="max-w-6xl mx-auto divide-x divide-dashed divide-neutral-300 border-y border-neutral-300 border-dashed p-1">
                    <div className="bg-white py-10 rounded text-center">
                        <div className="flex flex-col p-8 max-w-xl mx-auto">
                            <div className="size-14 flex rounded-xl mx-auto bg-orange-100 text-orange-600">
                                <Icon icon={"solar:plain-3-bold-duotone"} className="size-8 m-auto" />
                            </div>
                            <h1 className="text-2xl md:text-5xl font-semibold mt-8">
                                Join the Waitlist
                            </h1>
                            <h2 className="md:text-xl text-neutral-500">
                                Be among the first to access the Rokad platform.
                            </h2>
                            <p className="text-neutral-600 text-sm mt-5">
                                We’re onboarding early partners and customers in phases. Join the waitlist to get priority access, early updates, and the opportunity to shape how the platform evolves.
                            </p>
                            <div className="flex max-sm:flex-col md:justify-center w-full mt-5 gap-2 md:gap-4">
                                <Button className="pl-4! md:w-fit w-full" asChild>
                                    <Link href={"https://tally.so/r/EkK6ql"}>
                                        Join the waitlist <ArrowUpRight />
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

export default Platform;