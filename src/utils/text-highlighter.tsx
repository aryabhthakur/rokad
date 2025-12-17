// utils/text-highlighter.ts

import { JSX } from "react";

/**
 * Splits a string by the search term and wraps the matches in a highlight span.
 * @param text The full string (e.g., "The Great Gatsby")
 * @param query The search term (e.g., "great")
 * @returns An array of string/JSX elements for rendering.
 */
export function highlightText(text: string, query: string): (string | JSX.Element)[] {
    if (!query) return [text]

    // Use a regex to perform a case-insensitive search (gi flags)
    const parts = text.split(new RegExp(`(${query})`, 'gi'));

    return parts.map((part, index) => {
        // Check if the part exactly matches the query (case-insensitive)
        if (part.toLowerCase() === query.toLowerCase()) {
            // Apply the highlighting style
            return <span key={index} className="font-bold text-primary dark:text-yellow-400">
                {part}
            </span>
        }
        return part
    })
}