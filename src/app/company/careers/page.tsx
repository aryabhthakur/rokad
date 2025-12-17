import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { ArrowUpRight, Frown } from "lucide-react";
import Link from "next/link";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"

function Careers() {
    const benifits = ["Health Insurance", "Overtime Allowance", "Data & Communication Reimbursements", "Travel Reimbursements", "Meal Allowance", ""]
    const jobs = []
    return (<>
        <section className="pt-50 md:pt-60 pb-40">
            <div className="max-w-5xl mx-auto mb-10 max-sm:px-5">
                <span className="border-2 rounded-full font-medium py-1 max-sm:text-sm px-3">
                    Work with us
                </span>
                <h2 className="text-4xl md:text-8xl mt-4 font-semibold">Careers</h2>
                <div className="grid md:mt-20 mt-10 md:grid-cols-2 gap-5">
                    <div>
                        <h3 className="opacity-75 text-lg md:text-2xl">Build What Moves Businesses Forward, Join the Rokad Team.</h3>
                        <Button className="mt-5" asChild variant={"outline"}>
                            <Link href={"https://www.linkedin.com/company/rokadhq/jobs/"} target="_blank">
                                <Icon icon={"logos:linkedin-icon"} /> LinkedIn <ArrowUpRight />
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <p className="opacity-75 max-w-lg">
                            Rokad is where strategy, technology, and execution come together. You&apos;ll work on challenging problems, learn continuously, and contribute to solutions used by real businesses every day.
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto mt-10 max-sm:px-5">
                <h3 className="text-lg font-medium mb-4">
                    Job Openings
                </h3>
                {jobs.length > 0 ? <></> : <>
                    <div className="h-96 border-2 w-full rounded-lg">
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <Frown />
                                </EmptyMedia>
                                <EmptyTitle>No Job Openings Yet</EmptyTitle>
                                <EmptyDescription>
                                    We currently don’t have any open positions. Subscribe to our newsletter or follow us on LinkedIn to stay updated on future openings.
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <div className="flex gap-2">
                                    <Button asChild className="pl-5!">
                                        <Link href={"https://tally.so/r/VLjpKy"}>
                                            Newsletter <ArrowUpRight />
                                        </Link>
                                    </Button>
                                    <Button asChild variant={"outline"}>
                                        <Link href={"https://www.linkedin.com/company/rokadhq/jobs/"} target="_blank">
                                            <Icon icon={"logos:linkedin-icon"} /> LinkedIn <ArrowUpRight />
                                        </Link>
                                    </Button>
                                </div>
                            </EmptyContent>
                        </Empty>
                    </div>
                </>}
            </div>
        </section>
    </>);
}

export default Careers;