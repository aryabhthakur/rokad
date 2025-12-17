import { Button } from "@/components/ui/button";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";

function Contact() {
    return (<>
        <section className="pt-40 md:pt-60 pb-20">
            <div className="max-w-5xl mx-auto mb-10 max-sm:px-5">
                <span className="border-2 rounded-full font-medium py-1 px-3">
                    Let&apos;s talk
                </span>
                <h2 className="text-4xl md:text-8xl mt-4 font-semibold">Contact us</h2>
                <div className="grid mt-10 md:mt-20 md:grid-cols-2 gap-5">
                    <div>
                        <h3 className="opacity-75 text-2xl">
                            How can we help you?
                        </h3>
                        <div className="flex flex-col md:flex-row mt-5 w-fit gap-2">
                            <Button size={"lg"} variant={"outline"} asChild className="pl-4!">
                                <Link href={"https://tally.so/r/BzaO14"}>
                                    Schedule a callback <ArrowUpRight />
                                </Link>
                            </Button>
                            <Button size={"lg"} asChild className="ml-auto bg-orange-600 hover:bg-orange-700 pl-4!">
                                <Link href={"https://tally.so/r/lbBoZW"}>
                                    Send us a message <ArrowUpRight />
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <p className="opacity-75 max-w-lg">
                            Tell us your business goal, and we&apos;ll work with you to make that possibility, a reality.
                        </p>
                    </div>
                </div>
                <div className="grid mt-10 md:mt-20 md:grid-cols-4 md:grid-rows-2 gap-2 *:rounded *:p-8">
                    <div className="md:col-span-2 bg-white">
                        <p className="uppercase text-sm font-medium text-neutral-500">
                            General Enquiries
                        </p>
                        <Link href={"mailto:sales@rokad.co"} className="font-medium text-xl hover:text-orange-600">
                            sales@rokad.co
                        </Link>
                    </div>
                    <div className="md:row-start-2 md:row-end-2 bg-white">
                        <p className="uppercase text-sm font-medium text-neutral-500">
                            Press
                        </p>
                        <Link href={"mailto:sales@rokad.co"} className="font-medium text-xl hover:text-orange-600">
                            pr@rokad.co
                        </Link>
                    </div>
                    <div className="md:row-start-2 md:row-end-2 bg-white">
                        <p className="uppercase text-sm font-medium text-neutral-500">
                            Careers
                        </p>
                        <Link href={"mailto:sales@rokad.co"} className="font-medium text-xl hover:text-orange-600">
                            hr@rokad.co
                        </Link>
                    </div>

                    <div className="h-64 flex flex-col md:col-span-2 md:row-span-2 bg-white">
                        <MapPin />
                        <p className="uppercase text-sm mt-auto font-medium text-neutral-500">
                            Mailing Address
                        </p>
                        <p className="font-medium">
                            ROKAD RETAIL VENTURES PRIVATE LIMITED, 808, Mahabir Tower, Main Road, Ranchi, JH, India - 834001
                        </p>
                    </div>
                </div>
                <div className="grid mt-20 md:grid-cols-2 gap-5">
                    <div>
                        <h3 className="opacity-75 text-xl md:text-2xl">
                            Other contact details & forms:
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
                </div>
            </div>
        </section>
    </>);
}

export default Contact;