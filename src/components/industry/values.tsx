import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
import Markdown from "react-markdown";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";

interface IndustryValuesProps {
    className?: string
    valueSectionTitle: string
    valueSectionSubTitle: string
    valueSectionDesc?: string
    valueSectionFooterNote?: string
    values: { title: string, desc: string, icon: string }[]
}

const IndustryValues: FunctionComponent<IndustryValuesProps> = ({ className, valueSectionTitle, valueSectionSubTitle, valueSectionDesc, values, valueSectionFooterNote }) => {
    return (<>
        <section id="Values" className={cn(className, "relative z-10")}>
            <div className="py-40">
                <div className="max-w-5xl mx-auto mb-10 max-sm:px-5">
                    <span className="border-2 rounded-full font-medium max-sm:text-sm py-1 px-3">
                        The Solution
                    </span>
                    <h2 className="text-4xl md:text-8xl mt-4 font-semibold">{valueSectionTitle}</h2>
                    <div className="grid mt-10 md:mt-20 md:grid-cols-2 gap-5">
                        <div>
                            <h3 className="opacity-75 text-lg md:text-2xl">{valueSectionSubTitle}</h3>
                        </div>
                        <div>
                            {valueSectionDesc && <div className="opacity-75 max-w-lg">
                                <Markdown>
                                    {valueSectionDesc}
                                </Markdown>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto mt-10 max-sm:px-5 md:mt-20 grid md:grid-cols-3 gap-2">
                    {values?.map(v => <div key={v.title} className="w-full p-5 h-64 flex flex-col border border-dashed border-neutral-300 rounded-lg bg-white">
                        <div className="size-14 flex bg-neutral-100 rounded-2xl">
                            <Icon icon={v.icon} className="size-8 text-neutral-500 m-auto" />
                        </div>
                        <h3 className="text-l font-medium mt-auto">
                            {v.title}
                        </h3>
                        <p className="text-sm text-neutral-500">
                            {v.desc}
                        </p>
                    </div>)}
                </div>
                <div className="max-w-5xl mx-auto mt-5 md:mt-10 max-sm:px-5">
                    <p className="max-sm:text-sm">
                        {valueSectionFooterNote} Talk to an expert to know more about it, schedule a session with us and let&apos;s figure-out how we can help you.
                    </p>
                    <Button className="mt-4 !pl-4">
                        Schedule now <ArrowUpRight />
                    </Button>
                </div>
            </div>
        </section>
    </>);
}

export default IndustryValues;