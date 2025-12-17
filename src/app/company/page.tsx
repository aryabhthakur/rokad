import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Cpu, PenTool, Target } from "lucide-react";
import Link from "next/link";

function Company() {
    const FAQs = [
        {
            question: "What is Rokad? A platform? A Consultancy? or A Service Provider?",
            answer: "Hybrid, of all three."
        },
        {
            question: "What does Rokad Does?",
            answer: "Rokad helps product brands grow in the Indian market by giving them everything they need to sell at scale — online and offline. We combine go-to-market strategy, retail distribution, customer intelligence, digital enablement, and global hardware / procurement into one ecosystem so brands can launch, expand, and grow profitably without dealing with multiple vendors."
        },
        {
            question: "What does Rokad means?",
            answer: "Word Rokad comes from the word Rokda — which, in many of Indian Languages means or indicates Money or something equaly valuable / tradable. Indicating company core products & services which are focus toward business's growth, economically & status-wise."
        },
    ]
    return (<>
        <section className="pt-60 pb-40">
            <div className="max-w-5xl mx-auto max-sm:px-5 mb-10">
                <span className="border-2 max-sm:text-sm rounded-full font-medium py-1 px-3">
                    The Company
                </span>
                <h2 className="text-4xl md:text-8xl mt-4 font-semibold">About Rokad</h2>
                <h3 className="opacity-75 text-sm md:text-xl">
                    Legal Name: <i>Rokad Retail Ventures Private Limited</i>
                </h3>
                <h3 className="opacity-75 text-xl mt-20 mb-5">
                    Our Offerings
                </h3>
                <div className="grid md:grid-cols-3 gap-5 *:h-80 *:bg-white *:rounded *:p-5">
                    <Link href={"/platform"} className="hover:text-orange-500 duration-300 flex flex-col">
                        <Cpu size={64} strokeWidth={1} />
                        <h3 className="text-lg mt-auto font-medium ">
                            Product / Rokad Platform
                        </h3>
                        <p className="text-sm opacity-50">
                            360° Business Ops Platform
                        </p>
                    </Link>
                    <button className="hover:text-orange-500 text-left cursor-pointer duration-300 flex flex-col">
                        <Target size={64} strokeWidth={1} />
                        <h3 className="text-lg mt-auto font-medium ">
                            Services
                        </h3>
                        <p className="text-sm opacity-50">
                            Business related Services
                        </p>
                    </button>
                    <button className="hover:text-orange-500 text-left cursor-pointer duration-300 flex flex-col">
                        <PenTool size={64} strokeWidth={1} />
                        <h3 className="text-lg mt-auto font-medium ">
                            Consultancy
                        </h3>
                        <p className="text-sm opacity-50">
                            Business related Consultancy
                        </p>
                    </button>
                </div>
                <Separator className="my-10" />
                <h3 className="opacity-75 text-xl mb-5">
                    Quick Q&A
                </h3>
                <Accordion
                    type="single"
                    collapsible
                    className="w-full rounded-2xl text-left">
                    {FAQs.map((item) => (
                        <div
                            className="group mb-5"
                            key={item.question}>
                            <AccordionItem
                                value={item.question}
                                className="bg-white peer rounded-xl border-none px-7 py-1">
                                <AccordionTrigger className="cursor-pointer hover:no-underline">{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p>{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        </div>
                    ))}
                </Accordion>
                <Separator className="my-10" />
                <h3 className="opacity-75 text-xl mb-5">
                    Our Mission
                </h3>
                <div className="grid md:grid-cols-3 gap-5 *:bg-white *:rounded *:p-5">
                    <div>
                        Great products deserve a smoother path to market.
                    </div>
                    <div>
                        Bridge the gap between Retail, Data & AI Intelligence.
                    </div>
                    <div>
                        Bringing great products to life shouldn&apos;t be complicated.
                    </div>
                </div>
                <Separator className="my-10" />
                <h3 className="opacity-75 text-xl mb-5">
                    Partners
                </h3>
                <Separator className="my-10" />
                <h3 className="opacity-75 text-xl mb-5">
                    Press Releases
                </h3>
            </div>
        </section>
    </>);
}

export default Company;