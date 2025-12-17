import { cn } from "@/lib/utils";
import { FunctionComponent } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Asterisk, Check } from "lucide-react";
import Markdown from "react-markdown";

interface CapabilityOutcomeProps {
    className?: string
    outcomes: {
        desc: string
        title: string
        icon: string
    }[]
    outcomeSectionDesc: string
    outcomeSectionSubTitle: string
    outcomeSectionTitle: string
}

const CapabilityOutcome: FunctionComponent<CapabilityOutcomeProps> = ({ className, outcomeSectionDesc, outcomeSectionSubTitle, outcomeSectionTitle, outcomes }) => {
    return (<>
        <section className={cn("px-2 md:px-10", className)}>
            <div className="bg-white rounded-3xl py-20 md:py-40">
                <div className="max-w-5xl mx-auto mb-10 max-sm:px-5">
                    <span className="border-2 rounded-full font-medium py-1 px-3">
                        Outcomes
                    </span>
                    <h2 className="text-4xl md:text-7xl mt-4 font-semibold">{outcomeSectionTitle}</h2>
                    <div className="grid mt-10 md:mt-20 md:grid-cols-2 gap-5">
                        <div>
                            <h3 className="text-2xl opacity-75">{outcomeSectionSubTitle}</h3>
                        </div>
                        <div className="opacity-75">
                            <Markdown>
                                {outcomeSectionDesc}
                            </Markdown>
                        </div>
                    </div>
                </div>
                <Accordion type="single" collapsible className="max-w-5xl mx-auto max-sm:px-5">
                    {outcomes?.map((point) => <AccordionItem key={point.title} value={point.title}>
                        <AccordionTrigger className="text-lg md:text-2xl"><span className="flex gap-2 items-center"><Check className="text-green-600" /> {point.title}</span></AccordionTrigger>
                        <AccordionContent>
                            <p className="pl-7 text-base">
                                {point.desc}
                            </p>
                        </AccordionContent>
                    </AccordionItem>)}
                </Accordion>
            </div>
        </section>
    </>);
}

export default CapabilityOutcome;