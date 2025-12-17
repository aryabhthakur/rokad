import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function BrandAsset() {
    return (<>
        <section className="pt-50 md:pt-60 pb-20">
            <div className="max-w-5xl mx-auto mb-10 max-sm:px-5">
                <span className="border-2 max-sm:text-sm rounded-full font-medium py-1 px-3">
                    Rokad&apos;s Digital Assets
                </span>
                <h2 className="text-4xl md:text-8xl mt-4 font-semibold">Brand Assets</h2>
                <div className="grid mt-10 md:mt-20 md:grid-cols-2 gap-5">
                    <div>
                        <h3 className="opacity-75 text-xl md:text-2xl">
                            Rokad&apos;s Brand Guidelines
                        </h3>
                        <div className="opacity-75 max-sm:text-sm space-y-3 mt-4">
                            <p>
                                When using the assets you see on this page, we ask that you keep just a few things in mind....
                            </p>
                            <p>
                                Please do not:
                            </p>
                            <ul className="list-disc *:ml-4">
                                <li>
                                    Modify our logos, icons, or graphics in any way without our written permission.
                                </li>
                                <li>
                                    Use our logos or icons as your own identity, or for your own branding purposes (print or web-based).
                                </li>
                                <li>
                                    Use our logos or icons in a way that may confuse someone that your product or service is made, run, or endorsed by Rokad.
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="grid mt-20 md:grid-cols-4 gap-2 *:rounded *:p-8">
                    <div className="md:col-span-2 bg-white">
                        <p className="uppercase text-sm font-medium text-neutral-500">
                            Colors
                        </p>
                        <div className="flex gap-2 mt-2">
                            <Button className="bg-[#ff5d00] hover:bg-[#ff5d00]">#ff5d00</Button>
                            <Button className="bg-neutral-900 hover:bg-neutral-900">#171717</Button>
                            <Button className="bg-neutral-100 text-black hover:bg-neutral-100">#f5f5f5</Button>
                        </div>
                    </div>
                    <div className="md:col-span-2 bg-white">
                        <p className="uppercase text-sm font-medium text-neutral-500">
                            Font
                        </p>
                        <div className="flex gap-2 mt-2">
                            <Button variant={"outline"} asChild>
                                <Link href={"https://fonts.google.com/specimen/Geist"}>
                                    Geist <ArrowUpRight />
                                </Link>
                            </Button>
                            <Button variant={"outline"} asChild>
                                <Link href={"https://fonts.google.com/specimen/Geist+Mono"}>
                                    Geist Mono <ArrowUpRight />
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="md:col-span-4 bg-white">
                        <p className="uppercase text-sm font-medium text-neutral-500">
                            Logos (Backgrounds are transparent)
                        </p>
                        <div className="grid md:grid-cols-4 *:h-64 mt-5 gap-2">
                            <div className="bg-black flex rounded">
                                <Image src={"/alt-logo-icon.png"} alt="Rokad Icon Logo" width={128} height={128} className="m-auto" />
                            </div>
                            <div className="bg-black flex rounded">
                                <Image src={"/alt-logo.png"} alt="Rokad Icon Logo" width={128} height={220} className="m-auto" />
                            </div>
                            <div className="flex bg-neutral-100 rounded">
                                <Image src={"/logo-icon.png"} alt="Rokad Icon Logo" width={128} height={128} className="m-auto" />
                            </div>
                            <div className="flex bg-neutral-100 rounded">
                                <Image src={"/logo.png"} alt="Rokad Icon Logo" width={128} height={220} className="m-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default BrandAsset;