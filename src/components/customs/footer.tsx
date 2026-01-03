/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { gql } from '@apollo/client';
import { getServerApollo } from "@/lib/apollo-server";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";

interface FooterProps {
    className?: string
    ctaMsg?: string
}


const QUERY = gql`
        query FooterData {
                industries {
                    name
                    slug
                }
                capabilities {
                    name
                    slug
                }
                solutions {
                    name
                    slug
                }
                legals {
                    name
                    slug
                }
                footerMenus {
                    name
                    slug
                    external
                    link
                }
            }
        `


const Footer: FunctionComponent<FooterProps> = async ({ className, ctaMsg = "Let’s build measurable growth — together." }) => {
    const client = getServerApollo();
    const { data } = await client.query({
        query: QUERY,
    })

    const aboutLinks = [{
        name: "Company",
        slug: "/company"
    },
    // {
    // name: "Ecosystem",
    // slug: "/company/ecosystem"
    // },
    {
        name: "Brand Assets",
        slug: "/company/brand-assets"
    }, {
        name: "Media Center",
        slug: "/company/media-center"
    }, {
        name: "Career",
        slug: "/company/career"
    }]
    const sections = ["industries", "capabilities", "legals", "about", "footerMenus"]

    return (<>
        <footer className={cn("md:px-10 md:pb-10 w-full", className)}>
            <div className="bg-white rounded-4xl p-5 md:p-10 pt-15">
                <div className="max-w-6xl flex flex-wrap md:items-end mb-15 mx-auto">
                    <div className="max-w-3xl">
                        <Link href={"/"} className="mb-10 md:mb-20 block w-fit rounded py-1 bg-orange-600">
                            <img src={"/logo-alt.svg"} className="size-16 md:size-32" alt="Rokad's Logo" />
                        </Link>
                        <h2 className="text-2xl md:text-5xl md:leading-14 font-">
                            {ctaMsg}
                        </h2>
                    </div>
                    <div className="flex flex-wrap md:ml-auto max-sm:mt-5 gap-2">
                        <Button size={"lg"} variant={"outline"} asChild className="pl-4!">
                            <Link href={"https://tally.so/r/BzaO14"}>
                                Schedule a callback <ArrowUpRight />
                            </Link>
                        </Button>
                        <Button size={"lg"} asChild className=" bg-orange-600 hover:bg-orange-700 pl-4!">
                            <Link href={"https://tally.so/r/lbBoZW"}>
                                Send us a message <ArrowUpRight />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="max-w-6xl flex flex-col mx-auto bg-neutral-100 rounded-4xl pt-14 p-8">
                    <div className="w-full grid gap-y-10 md:grid-cols-4">
                        {sections.map((section, i) => <div key={i}>
                            <h3 className="capitalize font-medium text-lg">{section === "footerMenus" ? "Important Links" : section}</h3>
                            <div className="flex flex-col gap-y-2 text-sm mt-2 **:duration-300 **:underline-offset-4 **:hover:underline **:w-fit **:hover:text-orange-600">
                                {
                                    section === "about" ? aboutLinks.map((item) => <Link href={item.slug} key={item.slug}>
                                        {item.name}
                                    </Link>) :
                                        // @ts-expect-error type err
                                        data[sections[i]]?.map((item) => <Link target={item.external ? "_blank" : "_self"} href={item.external ? item.link : section === "industries" ? `/industry/${item.slug}` : section === "legals" ? `/legal/${item.slug}` : section === "solutions" ? `/solution/${item.slug}` : section === "capabilities" ? `/capability/${item.slug}` : "/" + item.slug} className="flex items-center" key={item.slug}>
                                            {item.name} {item.external && <ArrowUpRight size={20} className="ml-0.5" strokeWidth={1} />}
                                        </Link>)
                                }
                            </div>
                        </div>)}
                    </div>
                    <div className="grid h-40 mt-5 md:grid-cols-6 *:flex *:items-center">
                        <Link href={"https://www.designrush.com/"}>
                            <Image width={128} height={128} alt="Designrush" src={"/Designrush-Top-AI-Company.png"} />
                        </Link>
                        <Link href={"https://www.goodfirms.co/company/rokad"}>
                            <Image width={128} height={128} alt="Goodfirms" src={"/goodfirm-badge.svg"} unoptimized />
                        </Link>
                    </div>
                    <div className="mt-5 w-full py-3 text-xs text-neutral-500 flex items-center">
                        *Disclaimer: Images on this site are used under Creative Commons or paid licenses. All third-party logos and trademarks belong to their respective owners and are shown for representation purposes only. Rokad logos and trademarks are fully owned by Rokad and may not be reused without permission.
                    </div>
                    <div className="w-full py-3 text-sm text-neutral-500 flex items-center flex-wrap border-t">
                        <span>
                            &copy; Rokad Retail Ventures Private Limited
                        </span>
                        <span className="md:ml-auto">
                            GSTIN: 20AAPCR0279N1Z0
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    </>);
}

export default Footer;