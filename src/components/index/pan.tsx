import { cn } from "@/lib/utils";
import Image from "next/image";
import { FunctionComponent } from "react";

interface PANProps {
    className?: string
}

const PAN: FunctionComponent<PANProps> = ({ className }) => {
    return (<>
        <section className={cn("flex flex-col relative overflow-hidden", className)}>
            <div className="relative z-20 max-w-6xl w-full  mx-auto py-20 border-dashed border-x border-neutral-300">
                <div className="mx-auto grid grid-cols-2 divide-x divide-dashed divide-neutral-300 *:p-20 border-dashed border-t border-neutral-300">
                    <div>
                        <Image src={"/india.svg"} alt="India Map" width={64} height={64} />
                        <h3 className="text-6xl font-semibold leading-18">Nationwide Presence</h3>
                        <h5 className="text-xl mt-4">Scale with precision — not guesswork.</h5>
                    </div>
                    <div>
                        <p className="text-neutral-500">
                            <span className="text-black">
                                Rokad doesn’t just operate in metros — we’re embedded in the fabric of India’s diverse retail ecosystem.</span> Through strategic partnerships with multi-brand outlets, specialty stores, and regional distributors, we place your product where customers actually buy: from Hyderabad malls to kirana clusters in Ranchi, e-commerce platforms to emerging Tier 2 hotspots like Patna. Combined with our logistics network and localized go-to-market playbooks, this ensures your brand achieves true pan-India presence — not just pan-India aspiration.
                        </p>
                    </div>
                </div>
                <div className="border-t border-dashed border-neutral-300">
                    <div className="text-neutral-500">
                        <div className="py-3 text-xl px-8 border-b border-dashed border-neutral-300">
                            Our presence spans:
                        </div>
                        <div className="text-black *:p-4 font-medium grid grid-cols-3 text-sm divide-x divide-dashed divide-neutral-300 *:border-b *:border-dashed *:border-neutral-300 *:flex  *:items-start *:gap-1 *:bg-white space-y-1 *:h-48 *:flex-col">
                            <div>
                                <p className="text-neutral-500">
                                    Premium multi-brand outlets & e-commerce fulfillment hubs
                                </p>
                                <h4 className="mt-auto text-2xl">
                                    Tier 1
                                </h4>
                            </div>
                            <div>
                                <p className="text-neutral-500">
                                    Regional retail chains & high-street specialty stores
                                </p>
                                <h4 className="mt-auto text-2xl">
                                    Tier 2
                                </h4>
                            </div>
                            <div>
                                <p className="text-neutral-500">
                                    Emerging clusters with high growth potential & low competition
                                </p>
                                <h4 className="mt-auto text-2xl">
                                    Tier 3
                                </h4>
                            </div>
                        </div>
                        <div className="py-3 text-center px-8 border-b border-dashed border-neutral-300">
                            Backed by real-time sell-through data and logistics partnerships, we ensure your inventory moves—not just sits.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default PAN;