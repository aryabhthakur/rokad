import { cn } from "@/lib/utils";
import { FunctionComponent } from "react";
import Markdown from "react-markdown";

interface IndustryIssuesProps {
    className?: string
    IssueSectionTitle: string
    IssueSectionSubTitle: string
    IssueSectionDesc?: string
    issues: { indiaSpecificInsight: string, title: string, id: string }[]
}

const IndustryIssues: FunctionComponent<IndustryIssuesProps> = ({ className, IssueSectionSubTitle, IssueSectionTitle, IssueSectionDesc, issues }) => {
    return (<>
        <section id="issues" className={cn(className, "md:px-8 relative z-10")}>
            <div className="bg-linear-to-b from-red-600 to-transparent md:rounded-t-3xl py-20 md:py-40 text-white">
                <div className="max-w-5xl mx-auto mb-10 max-sm:px-5">
                    <span className="border-2 rounded-full font-medium max-sm:text-sm py-1 px-3">
                        The Rokad Report
                    </span>
                    <h2 className="text-4xl md:text-8xl mt-4 font-semibold">{IssueSectionTitle}</h2>
                    <div className="grid mt-10 md:mt-20 md:grid-cols-2 gap-5">
                        <div>
                            <h3 className="text-xl md:text-2xl">{IssueSectionSubTitle}</h3>
                        </div>
                        <div>
                            {IssueSectionDesc && <div className="max-w-lg">
                                <Markdown>
                                    {IssueSectionDesc}
                                </Markdown>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl grid max-sm:px-5 md:grid-cols-3 gap-2 mt-20 mx-auto">
                    {issues?.map(({ indiaSpecificInsight, title, id }) => <div key={id} className="bg-white flex flex-col rounded h-64 md:h-80 p-8 text-neutral-900">
                        <p className="text-xs opacity-50">
                            {indiaSpecificInsight}
                        </p>
                        <h2 className="text-lg md:text-2xl mt-auto font-medium">
                            {title}
                        </h2>
                    </div>)}
                </div>
            </div>
        </section>
    </>);
}

export default IndustryIssues;