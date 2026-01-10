export function trackEvent(
    name: string,
    params?: Record<string, unknown>
) {
    if (!window.gtag) return;
    window.gtag("event", name, params);
}
