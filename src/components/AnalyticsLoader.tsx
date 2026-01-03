"use client";

import { useEffect } from "react";
import { getCookie } from "@/lib/cookies";
import type { CookieConsent } from "@/types/consent";

const COOKIE_NAME = "rokad_cookie_consent";
const GA_ID = "G-QHZHT1VL0E";
const GA_SCRIPT_ID = "ga-script";

/**
 * Safely parses consent cookie
 */
function parseConsent(value: string | undefined): CookieConsent | null {
    if (!value) return null;

    try {
        const decoded = decodeURIComponent(value);
        const parsed = JSON.parse(decoded) as unknown;

        if (
            typeof parsed === "object" &&
            parsed !== null &&
            "analytics" in parsed &&
            "timestamp" in parsed &&
            typeof (parsed as CookieConsent).analytics === "boolean" &&
            typeof (parsed as CookieConsent).timestamp === "number"
        ) {
            return parsed as CookieConsent;
        }

        return null;
    } catch {
        return null;
    }
}

/**
 * Loads Google Analytics safely
 */
function loadGoogleAnalytics(): void {
    if (document.getElementById(GA_SCRIPT_ID)) return;

    const script: HTMLScriptElement = document.createElement("script");
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

    document.head.appendChild(script);

    window.dataLayer = window.dataLayer ?? [];

    window.gtag = function gtag(...args: unknown[]): void {
        window.dataLayer?.push(args);
    };

    window.gtag("js", new Date());
    window.gtag("config", GA_ID, {
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
    });
}

export default function AnalyticsLoader(): null {
    useEffect(() => {
        const consent = parseConsent(getCookie(COOKIE_NAME));

        if (consent?.analytics === true) {
            loadGoogleAnalytics();
        }

        const handleConsentGranted = (): void => {
            loadGoogleAnalytics();
        };

        window.addEventListener(
            "analytics-consent-granted",
            handleConsentGranted
        );

        return () => {
            window.removeEventListener(
                "analytics-consent-granted",
                handleConsentGranted
            );
        };
    }, []);

    return null;
}
