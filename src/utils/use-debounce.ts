// use-debounce.ts
import { useEffect, useState } from "react"

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        // Set a timer to update the value after the delay
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        // Clear the timer if the value changes (user keeps typing)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}