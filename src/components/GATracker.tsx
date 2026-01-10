"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GATracker() {
    const pathname = usePathname();
    const utm = sessionStorage.getItem("rokad_utm");

    useEffect(() => {
        if (!window.gtag) return;

        window.gtag("event", "page_view", {
            page_path: pathname,
            ...(utm ? JSON.parse(utm) : {})
        });
    }, [pathname]);

    return null;
}
