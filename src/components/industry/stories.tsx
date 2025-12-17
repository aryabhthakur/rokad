import { FunctionComponent } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface IndustryStoriesProps {
    className?: string
    CasesSectionTitle: string
    CasesSectionSubTitle: string
    CaseSectionDesc?: string
    cases?: {
        slug: string
        title: string
        client: string
    }[]
}

const IndustryStories: FunctionComponent<IndustryStoriesProps> = ({ className, CasesSectionSubTitle, CasesSectionTitle, CaseSectionDesc, cases }) => {
    return (<>
        <section id="growth" className={cn(className, "md:p-8 p-2 relative z-10")}>
            <div className="bg-linear-to-b from-emerald-900 to-emerald-700 rounded-xl md:rounded-3xl py-20 md:py-40 text-white">
                <div className="max-w-5xl max-sm:px-5 mx-auto mb-10">
                    <span className="border-2 max-sm:text-sm rounded-full font-medium py-1 px-3">
                        The Result
                    </span>
                    <h2 className="text-4xl md:text-8xl mt-4 font-semibold">{CasesSectionTitle}</h2>
                    <div className="grid md:mt-20 mt-10 md:grid-cols-2 gap-y-20 md:gap-x-20">
                        <div>
                            <h3 className="opacity-75 text-2xl mb-5">{CasesSectionSubTitle}</h3>
                            {CaseSectionDesc && <p className="opacity-75 max-w-lg">
                                {CaseSectionDesc}
                            </p>}
                            <Button asChild className="mt-5 group text-black md:flex hidden" variant={"outline"}>
                                <Link href={"/insights?cat=casestudies"}>
                                    Case Studies <ArrowUpRight className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-200" />
                                </Link>
                            </Button>
                        </div>
                        {cases && <div className="grid grid-cols-1">
                            <div className="mb-5">
                                <span className="border-2 rounded-full text-sm font-medium py-1 px-3 opacity-50">
                                    Featured Stories
                                </span>
                            </div>
                            {cases.map((c) => <Link href={`/case-study/${c.slug}`} key={c.slug} className="group mb-5 hover:opacity-75 duration-200">
                                <h2 className="text-2xl font-medium underline underline-offset-8 duration-300">
                                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />  {c.title}
                                </h2>
                                <p className="text-sm opacity-75 mt-2">
                                    — {c.client}
                                </p>
                            </Link>)}
                        </div>}
                    </div>
                </div>

            </div>
        </section>
    </>);
}

export default IndustryStories;