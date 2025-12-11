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
    }, {
        name: "Ecosystem",
        slug: "/company/ecosystem"
    }, {
        name: "Brand Assets",
        slug: "/company/brand-assets"
    }, {
        name: "Media Center",
        slug: "/company/media-center"
    }, {
        name: "Career",
        slug: "/company/career"
    }]
    const sections = ["industries", "capabilities", "solutions", "legals", "about", "footerMenus"]

    return (<>
        <footer className={cn("px-10 pb-10 w-full", className)}>
            <div className="bg-white rounded-4xl p-10 pt-15">
                <div className="max-w-6xl flex items-end mb-15 mx-auto">
                    <div className="max-w-3xl">
                        <Link href={"/"} className="mb-20 block w-fit rounded py-1 bg-orange-600">
                            <Image src={"/logo-alt.svg"} width={128} height={128} alt="Rokad's Logo" unoptimized />
                        </Link>
                        <h2 className="text-5xl leading-14 font-">
                            {ctaMsg}
                        </h2>
                    </div>
                    <div className="flex ml-auto gap-2">
                        <Button size={"lg"} variant={"outline"} asChild className="ml-auto pl-4! mt-8">
                            <Link href={"/contact-us"}>
                                Schedule a callback <ArrowUpRight />
                            </Link>
                        </Button>
                        <Button size={"lg"} asChild className="ml-auto bg-orange-600 hover:bg-orange-700 pl-4! mt-8">
                            <Link href={"/contact-us"}>
                                Send us a message <ArrowUpRight />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="max-w-6xl flex flex-col mx-auto bg-neutral-100 rounded-4xl pt-14 p-8">
                    <div className="w-full grid grid-rows-2 gap-y-10 grid-cols-4">
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
                    <div className="mt-40 w-full py-3 text-xs text-neutral-500 flex items-center">
                        *Disclaimer: Images on this site are used under Creative Commons or paid licenses. All third-party logos and trademarks belong to their respective owners and are shown for representation purposes only. Rokad logos and trademarks are fully owned by Rokad and may not be reused without permission.
                    </div>
                    <div className="w-full py-3 text-sm text-neutral-500 flex items-center border-t">
                        <span>
                            &copy; Rokad Retail Ventures Private Limited
                        </span>
                        <span className="ml-auto">
                            GSTIN: 20AAPCR0279N1Z0
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    </>);
}

export default Footer;