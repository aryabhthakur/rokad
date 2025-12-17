"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SearchWithHighlight } from "./SearchWithHighlight" // Assuming the previous component is in this file path

/**
 * Renders the command palette as a modal dialog, triggered by Cmd+K or Ctrl+K.
 */
export function CommandPalette({ data }: { data: { title: string, slug: string, type?: string }[] }) {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        // Function to handle the keydown event
        const down = (e: KeyboardEvent) => {
            // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault() // Prevent browser default action (e.g., searching)
                setOpen((open) => !open) // Toggle the open state
            }
        }

        // Add the listener when the component mounts
        document.addEventListener("keydown", down)

        // Clean up the listener when the component unmounts
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
                <DialogHeader className="hidden">
                    <DialogTitle>
                        Search Dialog
                    </DialogTitle>
                    <DialogDescription>
                        Search Dialog Description
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full">
                    <SearchWithHighlight data={data} />
                </div>
                {/* Optional: Add a subtle shortcut hint at the bottom of the dialog */}
                <div className="flex items-center justify-between p-2 text-xs text-muted-foreground border-t bg-slate-50 dark:bg-slate-900">
                    <p>Search over {data.length} items.</p>
                    <p>
                        Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 dark:bg-slate-800">
                            <span className="text-xs">
                                {/* Check OS and display the correct key symbol */}
                                {navigator.platform.toUpperCase().includes('MAC') ? '⌘' : 'Ctrl'}
                            </span>
                            K
                        </kbd> to close.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// NOTE: You will need to remove the border/shadow from the Command component 
// within SearchWithHighlight.tsx to make it blend seamlessly with the Dialog.