import { cn } from "@/lib/utils";
import { FunctionComponent } from "react";
import CaseStudies from "@/data/case-study.json"
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
interface CasesProps {
    className?: string
}

const Cases: FunctionComponent<CasesProps> = ({ className }) => {
    return (<>
        <section className={cn("min-h-96 relative bg-white py-40", className)}>
            <div className="max-w-6xl bg-white mx-auto px-5 relative">
                <div className="absolute max-w-8xl bg-gradient-to-l z- from-white via-accent to-white h-0.5 -top-10 left-0 w-full mx-auto" />
                <div className="absolute bg-gradient-to-t from-white via-accent to-white h-full -top-10 left-0 w-0.5 mx-auto" />
                <div className="absolute bg-gradient-to-t from-white via-accent to-white h-full -top-10 right-0 w-0.5 mx-auto" />
                <div className="absolute max-w-8xl bg-gradient-to-l from-white via-accent to-white h-0.5 -bottom-10 left-0 w-full mx-auto" />
                <div className="grid grid-cols-5 gap-10">
                    <div className="col-span-2">
                        <h3 className="text-7xl font-semibold">
                            Proven Impact
                        </h3>
                        <p className="text-sm mt-5">How Rokad Retail Ventures empowers product-led companies to scale across India — with strategy, access, and execution that deliver measurable results.</p>
                        <Button className="mt-5 bg-orange-600 hover:bg-orange-800 !pl-6">
                            Learn more <ChevronRight />
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 col-span-3 gap-5">
                        {CaseStudies.map((item, i) => <div key={i}>
                            <div className="h-80 flex bg-accent relative overflow-hidden rounded-xl">
                                <div className="absolute mt-auto flex flex-wrap gap-2">

                                </div>
                            </div>
                            <p className="text-xs text-orange-500 font-medium mt-4">
                                {item.client.industry}
                            </p>
                            <h3 className="font-semibold mt-1 text-xl">
                                {item.title}
                            </h3>
                            <Button className="mt-5 !pl-6">
                                Read more <ChevronRight />
                            </Button>
                        </div>)}
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default Cases;