import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
import Markdown from "react-markdown";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";

interface IndustryUcProps {
    className?: string
    ucSectionTitle: string
    ucSectionSubTitle: string
    ucSectionFooterNote: string
    ucSectionDesc?: string
    usecases: { desc: string, title: string, icon: string }[]
}

const IndustryUc: FunctionComponent<IndustryUcProps> = ({ className, ucSectionTitle, ucSectionFooterNote, ucSectionSubTitle, ucSectionDesc, usecases }) => {
    return (<>
        <section id="usecases" className={cn(className, "z-10")}>
            <div className="py-40">
                <div className="max-w-5xl mx-auto mb-10">
                    <span className="border-2 rounded-full font-medium py-1 px-3">
                        The Use-case
                    </span>
                    <h2 className="text-8xl mt-4 font-semibold">{ucSectionTitle}</h2>
                    <div className="grid mt-20 grid-cols-2 gap-5">
                        <div>
                            <h3 className="text-2xl">{ucSectionSubTitle}</h3>
                        </div>
                        <div>
                            {ucSectionDesc && <div className="max-w-lg">
                                <Markdown>
                                    {ucSectionDesc}
                                </Markdown>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="max-w-5xl divide-y divide-dashed border border-dashed border-neutral-300 rounded-lg overflow-hidden divide-neutral-300 mt-20 mx-auto">
                    {usecases?.map(({ desc, title, icon }) => <div key={title} className="font-medium bg-white px-5 py-4 w-full group flex items-center gap-5">
                        <div className="size-14 flex bg-neutral-100 rounded-2xl">
                            <Icon className="m-auto size-8 text-neutral-500" icon={icon} />
                        </div>
                        <div>
                            <h2 className="font-medium">
                                {title}
                            </h2>
                            <p className="text-sm text-neutral-500">
                                {desc}
                            </p>
                        </div>
                    </div>)}
                </div>
                <div className="max-w-5xl mx-auto mt-10">
                    <p>
                        {ucSectionFooterNote} Talk to an expert to know more about it, schedule a session with us and let&apos;s figure-out how we can help you.
                    </p>
                    <Button className="mt-4 !pl-4">
                        Schedule now <ArrowUpRight />
                    </Button>
                </div>
            </div>
        </section>
    </>);
}

export default IndustryUc;