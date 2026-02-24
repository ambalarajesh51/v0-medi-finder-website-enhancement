"use client"

import { Search, X } from "lucide-react"
import { useRef } from "react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="animate-fade-in-up stagger-3 relative mx-auto -mt-7 w-full max-w-2xl px-5">
      <div className="group relative flex items-center overflow-hidden rounded-full border border-border bg-card shadow-lg transition-all duration-300 focus-within:border-primary/40 focus-within:shadow-xl">
        <Search className="ml-5 h-5 w-5 shrink-0 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search specialists (e.g. Neurologist) or city..."
          className="w-full bg-transparent px-4 py-4 text-base text-card-foreground outline-none placeholder:text-muted-foreground/60"
          aria-label="Search hospitals by specialist or city"
        />
        {value && (
          <button
            onClick={() => {
              onChange("")
              inputRef.current?.focus()
            }}
            className="mr-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}
