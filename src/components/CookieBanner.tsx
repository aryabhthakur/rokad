"use client";

import { useEffect, useState } from "react";
import { setCookie, getCookie } from "@/lib/cookies";
import { Cookie } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const COOKIE_NAME = "rokad_cookie_consent";

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = getCookie(COOKIE_NAME);
        if (!consent) setVisible(true);
    }, []);

    function acceptCookies() {
        setCookie(
            COOKIE_NAME,
            JSON.stringify({ analytics: true, timestamp: Date.now() }),
            180
        );
        window.dispatchEvent(new Event("analytics-consent-granted"));
        setVisible(false);
    }

    function rejectCookies() {
        setCookie(
            COOKIE_NAME,
            JSON.stringify({ analytics: false, timestamp: Date.now() }),
            180
        );
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 rounded-lg left-4 right-4 z-50 p-8 outline-2 md:outline-4 border border-neutral-300 w-96 bg-white md:left-auto md:right-4">
            <div className="flex flex-col gap-2">
                <div className="size-12 border rounded-full flex">
                    <Cookie className="m-auto" />
                </div>
                <div className="text-sm mb-8">
                    We use analytics cookies to understand website usage. No directly identifiable personal information (such as names or email addresses) is collected.
                </div>
                <div className="mb-1 text-sm">
                    Learn more about our <Link className="text-orange-600" href={"/legal/data-handling"}>
                        Data Handling Policy
                    </Link>
                </div>
                <div className="flex w-full items-center gap-1">
                    <Button
                        onClick={acceptCookies}
                        size={"lg"}
                        className="w-2/3"
                    >
                        Accept
                    </Button>
                    <Button
                        onClick={rejectCookies}
                        size={"lg"}
                        variant={"outline"}
                    >
                        Reject
                    </Button>
                </div>

            </div>
        </div>
    );
}
