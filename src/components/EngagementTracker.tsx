"use client";

import { useEffect } from "react";

export default function EngagementTracker() {
    useEffect(() => {
        let maxScroll = 0;

        function onScroll() {
            const scroll =
                (window.scrollY + window.innerHeight) /
                document.body.scrollHeight;

            const percent = Math.round(scroll * 100);

            if (percent > maxScroll && percent % 25 === 0) {
                maxScroll = percent;
                window.gtag?.("event", "scroll_depth", {
                    percent,
                });
            }
        }

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return null;
}
