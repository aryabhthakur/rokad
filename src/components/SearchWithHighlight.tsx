"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { useRouter } from 'next/navigation'

// Assume these imports are correct based on the previous steps
import { useDebounce } from "@/utils/use-debounce"
import { highlightText } from "@/utils/text-highlighter" // Your new utility
import { SearchData } from "@/app/layout"

export function SearchWithHighlight({ data }: { data: { title: string, slug: string, type?: string }[] }) {
    const [query, setQuery] = React.useState("")
    const router = useRouter()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [results, setResults] = React.useState<SearchData[]>([])
    const [isSearching, setIsSearching] = React.useState(false)

    const debouncedQuery = useDebounce(query, 300)

    React.useEffect(() => {
        if (debouncedQuery.length > 3) {
            setIsSearching(true)

            // Simulating delay
            setTimeout(() => {
                const filtered = data.filter((item) =>
                    item.title.toLowerCase().includes(debouncedQuery.toLowerCase())
                )
                //@ts-expect-error type err
                setResults(filtered)
                setIsSearching(false)
            }, 500)

        } else {
            setResults([])
            setIsSearching(false)
        }
    }, [debouncedQuery])

    return (
        <div className="w-full">
            <Command shouldFilter={false}>
                <CommandInput
                    placeholder="Type at least 4 chars..."
                    value={query}
                    className="w-full"
                    onValueChange={(val) => {
                        setQuery(val)
                        if (val.length > 3) setIsSearching(true)
                    }}
                />

                <CommandList>
                    {/* ... (Loading and Helper State rendering remains the same) ... */}
                    {isSearching && (
                        <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Searching...
                        </div>
                    )}

                    {!isSearching && (
                        <>
                            {query.length > 0 && query.length <= 3 && (
                                <div className="py-6 text-center text-sm text-muted-foreground">
                                    Keep typing...
                                </div>
                            )}

                            {debouncedQuery.length > 3 && results.length === 0 && (
                                <CommandEmpty>No results found.</CommandEmpty>
                            )}

                            {/* RENDER RESULTS WITH HIGHLIGHTING */}
                            {results.length > 0 && (
                                <CommandGroup heading="Suggestions">
                                    {results.map((item) => (
                                        <CommandItem key={item.slug} value={item.title} onSelect={() => {
                                            router.push("/" + item.type + "/" + item.slug);
                                        }}>
                                            <div className="flex flex-col">
                                                {/* Apply the highlighting utility here */}
                                                <span className="font-medium">
                                                    {highlightText(item.title, debouncedQuery)}
                                                </span>

                                                <span className="text-xs text-muted-foreground">
                                                    {item.type}
                                                </span>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                        </>
                    )}
                </CommandList>
            </Command>
        </div>
    )
}