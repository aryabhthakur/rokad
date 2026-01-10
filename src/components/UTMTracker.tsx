"use client";

import { useEffect } from "react";
import { getUTMParams } from "@/lib/utm";

export default function UTMTracker() {
    useEffect(() => {
        const utm = getUTMParams();

        // Only store if at least one UTM exists
        if (Object.values(utm).some(Boolean)) {
            sessionStorage.setItem("rokad_utm", JSON.stringify(utm));
        }
    }, []);

    return null;
}
