import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";

interface CapabilityServiceProps {
    className?: string
    serviceSectionTitle: string
    serviceSectionSubTitle: string
    serviceSectionDesc: string
    slug: string
    services: {
        name: string
        slug: string
    }[]
}

const CapabilityService: FunctionComponent<CapabilityServiceProps> = ({ className, serviceSectionDesc, serviceSectionSubTitle, serviceSectionTitle, services, slug }) => {
    return (<section className={cn(className, "md:px-10 mb-40")}>
        <div className="from-orange-400 bg-linear-to-bl to-orange-600 text-white py-40 md:rounded-4xl">
            <div className="max-w-5xl mx-auto mb-10 max-sm:px-5">
                <span className="border-2 rounded-full max-sm:text-sm font-medium py-1 px-3">
                    Rokad&apos;s Services
                </span>
                <h2 className="text-4xl md:text-8xl mt-4 font-semibold">{serviceSectionTitle}</h2>
                <div className="grid mt-10 md:mt-20 md:grid-cols-2 gap-5">
                    <div>
                        <h3 className="text-2xl">{serviceSectionSubTitle}</h3>
                    </div>
                    <div>
                        <p className="max-w-lg">
                            {serviceSectionDesc}
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto divide-y mt-20 max-sm:px-5">
                <div>
                    Services we offer
                </div>
                {services?.map((service: {
                    name: string, slug: string
                }) => <Link href={slug + "/" + service.slug} key={service.slug} className="font-medium hover:text-orange-900 py-2 md:py-4 w-full group flex text-lg md:text-3xl items-center">
                        <span className="flex-1">
                            {service.name}
                        </span>
                        <span className="size-12 flex rounded-full">
                            <ArrowUpRight strokeWidth={1} className="m-auto size-5 md:size-9 delay-75 duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                    </Link>)}
            </div>
        </div>
    </section>);
}

export default CapabilityService;