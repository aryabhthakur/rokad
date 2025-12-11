import { cn } from "@/lib/utils";
import { FunctionComponent } from "react";
import { InfiniteSlider } from "./ui/infinite-slider";
import Link from "next/link";
import Image from "next/image";

interface PartnerProps {
    className?: string
    partners: {
        name: string
        logo: {
            url: string
        }
        press_release: {
            slug: string
        }
    }[]
}

const Partner: FunctionComponent<PartnerProps> = ({ className, partners }) => {
    return (
        <section className={cn(className, "pb-40")}>
            <div className="max-w-6xl border border-neutral-300 border-dashed py-15 px-5 rounded bg-white  mx-auto">
                <div className="max-w-5xl grid grid-cols-2 gap-5 mx-auto">
                    <div>
                        <span className="border-2 rounded-full font-medium py-1 px-3">
                            Rokad&apos;s Partners
                        </span>
                        <h2 className="text-4xl mt-4 font-semibold">Our Strategic Partnerships</h2>
                        <h3 className="text-xl mt-4 font-medium">
                            Part of India&apos;s Fastest-Growing Business Ecosystem
                        </h3>
                        <p className="text-sm">We collaborate with mission-critical technology, financing, and commerce partners to remove growth constraints for businesses.</p>
                    </div>
                    <div>
                        <InfiniteSlider speed={40} gap={48}>
                            {partners.map(partner => <Link key={partner.press_release.slug} href={"/press/" + partner.press_release.slug} className="h-40 flex grayscale items-center justify-center">
                                <Image alt={partner.name} width={84} height={96} src={process.env.NEXT_CMS_URL + partner.logo.url} />
                            </Link>)}
                        </InfiniteSlider>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Partner;