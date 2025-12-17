import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";
import Markdown from "react-markdown";
import { Button } from "../ui/button";

interface CapabilityCasesProps {
    className?: string
    casestudiesSectionTitle: string
    casestudiesSectionSubTitle: string
    casestudiesSectionDesc: string
    case_studies: {
        title: string, slug: string, client: string
    }[]
}

const CapabilityCases: FunctionComponent<CapabilityCasesProps> = ({ className, case_studies, casestudiesSectionDesc, casestudiesSectionSubTitle, casestudiesSectionTitle }) => {
    return (<>
        <section className={cn(className, "pb-40")}>
            <div className="max-w-5xl mx-auto mb-10 max-sm:px-5">
                <span className="border-2 max-sm:text-sm rounded-full font-medium py-1 px-3">
                    Client Stories
                </span>
                <h2 className="text-4xl md:text-8xl mt-4 font-semibold">{casestudiesSectionTitle}</h2>
                <div className="grid mt-10 md:mt-20 md:grid-cols-2 gap-5">
                    <div>
                        <h3 className="text-2xl mb-5">{casestudiesSectionSubTitle}</h3>
                        <Markdown>
                            {casestudiesSectionDesc}
                        </Markdown>
                    </div>
                    <div>
                        <div className="mb-5">
                            <span className="border-2 max-sm:text-sm rounded-full text-sm font-medium py-1 px-3">
                                Selected Stories
                            </span>
                        </div>
                        <div className="divide-y">
                            {case_studies?.map((case_study: {
                                title: string, slug: string, client: string
                            }) => <Link key={case_study.slug} href={"/case-study/" + case_study.slug} className="font-medium hover:text-orange-600 group py-3 w-full flex text-lg md:text-2xl">
                                    <span className="flex-col flex">
                                        <h3 className="flex-1">
                                            {case_study.title}
                                        </h3>
                                        <p className="text-sm text-neutral-500">{case_study.client}</p>
                                    </span>
                                    <span className="size-12 group-hover:bg-white duration-300 flex rounded-full">
                                        <ArrowUpRight size={36} strokeWidth={1} className="m-auto delay-75 duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </span>
                                </Link>)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default CapabilityCases;