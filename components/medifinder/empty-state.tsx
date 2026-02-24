"use client"

import { SearchX, Hospital } from "lucide-react"

interface EmptyStateProps {
  query: string
}

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="animate-scale-in flex flex-col items-center justify-center py-24 text-center">
      <div className="animate-float relative mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-accent shadow-lg">
        {query ? (
          <SearchX className="h-10 w-10 text-primary" />
        ) : (
          <Hospital className="h-10 w-10 text-primary" />
        )}
        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-warning shadow-md" />
      </div>
      <h3 className="text-xl font-extrabold uppercase tracking-tight text-foreground">
        No Hospitals Found
      </h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {query
          ? `No results for "${query}". Try a different specialist or city name.`
          : "No hospitals in the directory yet. Register one to get started."}
      </p>
    </div>
  )
}
