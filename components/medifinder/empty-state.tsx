"use client"

import { SearchX } from "lucide-react"

interface EmptyStateProps {
  query: string
}

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="animate-fade-in-up flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">
        No Hospitals Found
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {query
          ? `No results for "${query}". Try a different specialist or city name.`
          : "No hospitals in the directory yet. Register one to get started."}
      </p>
    </div>
  )
}
