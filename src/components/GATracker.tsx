"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GATracker() {
    const pathname = usePathname();

    useEffect(() => {
        if (!window.gtag) return;
        const utm = sessionStorage.getItem("rokad_utm");

        window.gtag("event", "page_view", {
            page_path: pathname,
            ...(utm ? JSON.parse(utm) : {})
        });
    }, [pathname]);

    return null;
}
