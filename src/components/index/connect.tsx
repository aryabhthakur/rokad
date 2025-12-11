import { cn } from "@/lib/utils";
import { FunctionComponent } from "react";

interface ConnectProps {
    className?: string
}

const Connect: FunctionComponent<ConnectProps> = ({ className }) => {
    return (<div className={cn("", className)}></div>);
}

export default Connect;