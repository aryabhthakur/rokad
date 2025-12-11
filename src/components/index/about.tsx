import { cn } from "@/lib/utils";
import { FunctionComponent } from "react";

interface AboutProps {
    className?: string
}

const About: FunctionComponent<AboutProps> = ({ className }) => {
    return (<section className={cn("", className)}></section>);
}

export default About;