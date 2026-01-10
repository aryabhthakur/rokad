"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GATracker() {
    const path = usePathname();

    useEffect(() => {
        if (!window.gtag) return;

        window.gtag("event", "page_view", {
            page_path: path
        });
    }, [path]);

    return null;
}
