import { FunctionComponent } from "react";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import { Asterisk, Quote } from "lucide-react";
import { Icon } from "@iconify/react";

interface IndustryHeroProps {
    className?: string
    name: string
    subtitle: string
    HeroDesc?: string
    trends: {
        icon: string
        title: string
        desc: string
    }[]
    trendSectionTitle: string
    trendSectionSubTitle: string
}

const IndustryHero: FunctionComponent<IndustryHeroProps> = ({ className, name, subtitle, HeroDesc, trendSectionTitle, trendSectionSubTitle, trends }) => {
    return (<>
        <section className={cn("relative", className)}>
            <div className="border-t border-dashed h-[630px] w-full top-40 left-0 border-neutral-300 absolute" />
            <div className="max-w-6xl pt-40 relative z-10 mx-auto border-x border-dashed border-neutral-300">
                <div className="grid gap-10 grid-cols-2 divide-x divide-dashed divide-neutral-300">
                    <div className="p-8 pt-30 pb-30">
                        <span className="border-2 w-fit text-sm rounded-full font-medium py-1 px-3">
                            Industry
                        </span>
                        <h2 className="text-8xl mt-5 font-semibold">{name}</h2>
                    </div>
                    <div className="text-sm max-w-lg space-y-5 p-8 pt-30 pb-30">
                        <h3 className="font-medium text-lg">{subtitle}</h3>
                        {HeroDesc &&
                            <Markdown>
                                {HeroDesc}
                            </Markdown>
                        }
                    </div>
                </div>
                <div className="pt-20 border-t border-dashed border-neutral-300">
                    <div className="px-8 text-center">
                        <span className="border-2 rounded-full font-medium py-1 px-3">
                            Current Trends
                        </span>
                        <h2 className="text-4xl mt-4 font-semibold ">{trendSectionTitle}</h2>
                        <h3 className="opacity-75 text-xl  mt-5">{trendSectionSubTitle}</h3>
                    </div>
                    <div className="divide-dashed border-t bg-white border-dashed mt-16 grid divide-y">
                        {trends?.map((v, i) => <div key={i} className="w-full p-5 flex items-center gap-5">
                            <div className="size-14 flex bg-neutral-100 rounded-2xl">
                                <Icon className="m-auto size-8 text-neutral-500" icon={v.icon} />
                            </div>
                            <div>
                                <h3 className="font-medium">
                                    {v.title}
                                </h3>
                                <p className="text-sm text-neutral-500">
                                    {v.desc}
                                </p>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div >
        </section >
    </>);
}

export default IndustryHero;