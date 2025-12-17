import { cn } from "@/lib/utils";
import { FunctionComponent } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
interface IndustrySegmentsProps {
    className?: string
    segments: {
        title: string
        howWeHelp: string
        img: {
            url: string
        }
    }[]
}

const IndustrySegments: FunctionComponent<IndustrySegmentsProps> = ({ className, segments }) => {
    return (<>
        <section className={cn("pt-20 pb-40", className)}>
            <div className="max-w-5xl mx-auto mb-10 max-sm:px-5">
                <span className="border-2 rounded-full font-medium max-sm:text-sm py-1 px-3">
                    The Client
                </span>
                <h2 className="text-4xl md:text-8xl mt-4 font-semibold">Sectors We Serve</h2>
                <div className="grid md:mt-20 mt-10 md:grid-cols-2 gap-5">
                    <div>
                        <h3 className="opacity-75 text-lg md:text-2xl">Where our experience delivers out-sized outcomes.</h3>
                    </div>
                    <div>
                        <p className="opacity-75 max-w-lg">
                            Rokad supports clients across retail, consumer products, technology, and industrial goods. Across these categories, we specialise in demand generation, growth architecture, cost and efficiency transformation, omnichannel profitability, procurement excellence, and digital enablement. Each engagement is designed to be measurable, execution-ready, and tied directly to economic value creation.
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto mt-20">
                <Carousel>
                    <CarouselContent>
                        {segments.map((item, i) => <CarouselItem key={i} className="h-[480px] !pl-0 basis-80 md:basis-96 bg-center bg-no-repeat relative rounded overflow-hidden md:first:ml-10 ml-5" style={{ backgroundImage: `url('${item.img.url}')` }}>
                            <div className="w-full p-4 md:p-8 text-white flex flex-col h-full bg-black/75">
                                <p className="text-sm opacity-75">
                                    {item.howWeHelp}
                                </p>
                                <h3 className="mt-auto text-lg font-medium mb-2">
                                    {item.title}
                                </h3>
                            </div>
                        </CarouselItem>)}
                    </CarouselContent>
                </Carousel>

            </div>
        </section>
    </>);
}

export default IndustrySegments;