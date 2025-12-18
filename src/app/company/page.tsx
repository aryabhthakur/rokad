import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getServerApollo } from "@/lib/apollo-server";
import { gql } from "@apollo/client";
import { ArrowUpRight, Cpu, PenTool, Quote, Target } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const QUERY = gql`
query Query {
  mediaCenters {
    title
    slug
    public_on
  }
  services {
    name
  }
  partners {
    logo {
      url
    }
  }
}
`
export const metadata: Metadata = {
    title: 'The Company',
    description: "Know all about Rokad as a Company",
}

async function Company() {
    const client = getServerApollo();
    const { data } = await client.query({
        query: QUERY,
    });
    const consulatancies = ["GTM Strategy", "Communication Strategy", "Customer Strategy", "Pricing Strategy"]
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
            question: 'What does "Rokad" word means?',
            answer: "Word Rokad comes from the word Rokda — which, in many of Indian Languages means or indicates Money or something equaly valuable / tradable. Indicating company core products & services which are focus toward business's growth, economically & status-wise."
        },
    ]
    const returnDate = (v: string) => new Date(v).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short', // "Nov"
        day: 'numeric'  // "26"
    });
    // @ts-expect-error type err
    const partners = data.partners
    // @ts-expect-error type err
    const press = data.mediaCenters
    // @ts-expect-error type err
    const services = data.services
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
                <div className="gap-y-5 mt-5 text-sm grid  md:grid-cols-2 gap-x-10">
                    <p>
                        Rokad is a business solutions company focused on helping organisations operate better, scale faster, and grow with clarity. We work at the intersection of strategy, technology, and execution, enabling businesses to improve market access, strengthen operations, and build sustainable growth engines.
                    </p>
                    <p>
                        Founded with the belief that growth should be structured and repeatable, Rokad brings together deep industry understanding with modern digital systems to solve real commercial challenges. Our approach is grounded in practical execution, data-backed decision-making, and long-term value creation.
                    </p>
                    <p>
                        With regional offices in Ranchi and Hyderabad, we support businesses across India in sectors such as retail, consumer products, technology, and industrial goods. Whether it’s enabling market expansion, redesigning supply chains, modernising operations, or unlocking access to capital, Rokad partners closely with leadership teams to deliver measurable outcomes.
                    </p>
                </div>
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
                    <Link href={"#services"} className="hover:text-orange-500 text-left cursor-pointer duration-300 flex flex-col">
                        <Target size={64} strokeWidth={1} />
                        <h3 className="text-lg mt-auto font-medium ">
                            Services
                        </h3>
                        <p className="text-sm opacity-50">
                            Business related Services
                        </p>
                    </Link>
                    <Link href={"#consultancy"} className="hover:text-orange-500 text-left cursor-pointer duration-300 flex flex-col">
                        <PenTool size={64} strokeWidth={1} />
                        <h3 className="text-lg mt-auto font-medium ">
                            Consultancy
                        </h3>
                        <p className="text-sm opacity-50">
                            Business related Consultancy
                        </p>
                    </Link>
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
                <div className="grid md:grid-cols-3 gap-5 *:bg-white *:rounded-lg *:p-5 *:h-64 *:flex *:flex-col">
                    <div>
                        <Quote />
                        <h3 className="mt-auto text-xl font-medium">
                            Great products deserve a smoother path to market.
                        </h3>
                    </div>
                    <div>
                        <Quote />
                        <h3 className="mt-auto text-xl font-medium">
                            Bridge the gap between Retail, Data & AI Intelligence.
                        </h3>
                    </div>
                    <div>
                        <Quote />
                        <h3 className="mt-auto text-xl font-medium">
                            Bringing great products to life shouldn&apos;t be complicated.
                        </h3>
                    </div>
                </div>
                <Separator className="my-10" />
                <h3 className="opacity-75 text-xl mb-5">
                    Partners
                </h3>
                <div className="grid *:h-36 mt-5 md:grid-cols-4">
                    {partners.map((partner: { logo: { url: string } }) => <div key={partner.logo.url} className="p-1">
                        <div className="bg-white flex items-center justify-center h-full rounded" >
                            <Image alt={partner.logo.url} width={128} height={96} src={partner.logo.url} />
                        </div>
                    </div>)}
                </div>
                <Separator className="my-10" id="services" />
                <h3 className="opacity-75 text-xl mb-5">
                    Services
                </h3>
                <div className="grid  md:grid-cols-3 gap-4 *:bg-white *:rounded-lg *:p-5 *:font-medium *:text-sm">
                    {services.map((service: { name: string }) => <div key={service.name}>
                        {service.name}
                    </div>)}
                </div>
                <p className="mt-5 max-w-lg text-neutral-500">
                    Need something else? We provide custom tailored solutions for our customer&apos;s business. Tell us about your requirement, let&apos;s talk.
                    <Button asChild className="mt-2 pl-4!" size={"sm"}>
                        <Link href={"/contact-us"}>
                            Contact us <ArrowUpRight />
                        </Link>
                    </Button>
                </p>
                <Separator className="my-10" id="consultancy" />
                <h3 className="opacity-75 text-xl mb-5">
                    Consulatancy
                </h3>
                <div className="grid  md:grid-cols-3 gap-4 *:bg-white *:rounded-lg *:p-5 *:font-medium *:text-sm">
                    {consulatancies.map((c) => <div key={c}>
                        {c}
                    </div>)}
                </div>
                <Separator className="my-10" />
                <h3 className="opacity-75 text-xl mb-5">
                    Press Releases
                </h3>
                <div className="max-w-5xl mx-auto divide-y">
                    {press?.map((press: {
                        title: string, slug: string, public_on: string, FeaturedImage: {
                            url: string
                        }
                    }) => <Link key={press.slug} href={"/press/" + press.slug} className={"font-medium hover:text-orange-600 group flex flex-col text- md:text-2xl py-3 w-full"}>
                            <span className="text-sm uppercase opacity-50 flex items-center">
                                PUBLISHED ON {returnDate(press.public_on)}
                            </span>
                            <h3 className="mt-1">
                                {press.title}
                            </h3>
                        </Link>)}
                </div>
                <Separator className="my-10" />
                <h3 className="opacity-75 text-xl mb-5">
                    Important Links
                </h3>
                <div className="flex md:flex-row flex-col *:w-fit gap-2 mt-5">
                    <Button size={"lg"} asChild className="pl-4! bg-transparent" variant={"outline"}>
                        <Link href={"https://tally.so/r/KYp1JD"}>
                            Become our Supplier <ArrowUpRight />
                        </Link>
                    </Button>
                    <Button size={"lg"} asChild className="pl-4! bg-transparent" variant={"outline"}>
                        <Link href={"https://tally.so/r/kdlQZr"}>
                            Become our Retailer <ArrowUpRight />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    </>);
}

export default Company;