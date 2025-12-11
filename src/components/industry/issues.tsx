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
        <section id="issues" className={cn(className, "px-8 relative z-10")}>
            <div className="bg-linear-to-b from-red-600 to-transparent rounded-t-3xl py-40 text-white">
                <div className="max-w-5xl mx-auto mb-10">
                    <span className="border-2 rounded-full font-medium py-1 px-3">
                        The Rokad Report
                    </span>
                    <h2 className="text-8xl mt-4 font-semibold">{IssueSectionTitle}</h2>
                    <div className="grid mt-20 grid-cols-2 gap-5">
                        <div>
                            <h3 className="text-2xl">{IssueSectionSubTitle}</h3>
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
                <div className="max-w-6xl grid grid-cols-3 gap-2 mt-20 mx-auto">
                    {issues?.map(({ indiaSpecificInsight, title, id }) => <div key={id} className="bg-white flex flex-col rounded h-80 p-8 text-neutral-900">
                        <p className="text-xs opacity-50">
                            {indiaSpecificInsight}
                        </p>
                        <h2 className="text-2xl mt-auto font-medium">
                            {title}
                        </h2>
                    </div>)}
                </div>
            </div>
        </section>
    </>);
}

export default IndustryIssues;