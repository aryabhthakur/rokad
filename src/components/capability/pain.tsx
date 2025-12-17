import { cn } from "@/lib/utils";
import { FunctionComponent } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Asterisk } from "lucide-react";
import Markdown from "react-markdown";

interface CapabilityPainProps {
    className?: string
    painpoints: {
        desc: string
        title: string
        icon: string
    }[]
    painSectionDesc: string
    painSectionSubTitle: string
    painSectionTitle: string
}

const CapabilityPain: FunctionComponent<CapabilityPainProps> = ({ className, painSectionDesc, painSectionSubTitle, painSectionTitle, painpoints }) => {
    return (<>
        <section className={cn("pt-40 pb-40 from-white to-transparent bg-linear-to-b border-t border-dashed border-neutral-300", className)}>
            <div className="max-w-5xl mx-auto mb-10 max-sm:px-5">
                <span className="border-2 rounded-full max-sm:text-sm font-medium py-1 px-3">
                    Pain Points
                </span>
                <h2 className="text-3xl md:text-7xl mt-4 font-semibold">{painSectionTitle}</h2>
                <div className="grid mt-10 md:mt-20 md:grid-cols-2 gap-5">
                    <div>
                        <h3 className="text-2xl opacity-75">{painSectionSubTitle}</h3>
                    </div>
                    <div className="opacity-75">
                        <Markdown>
                            {painSectionDesc}
                        </Markdown>
                    </div>
                </div>
            </div>
            <Accordion type="single" collapsible className="max-w-5xl mx-auto max-sm:px-5">
                {painpoints?.map((point) => <AccordionItem key={point.title} value={point.title}>
                    <AccordionTrigger className="text-lg md:text-2xl"><span className="flex gap-1"><Asterisk className="text-red-600" /> {point.title}</span></AccordionTrigger>
                    <AccordionContent>
                        <p className="pl-7 text-base">
                            {point.desc}
                        </p>
                    </AccordionContent>
                </AccordionItem>)}
            </Accordion>
        </section>
    </>);
}

export default CapabilityPain;