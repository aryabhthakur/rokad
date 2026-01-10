export async function sendServerEvent(
    clientId: string,
    eventName: string,
    params?: Record<string, unknown>
) {
    await fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`,
        {
            method: "POST",
            body: JSON.stringify({
                client_id: clientId,
                events: [
                    {
                        name: eventName,
                        params
                    }
                ]
            })
        }
    );
}
