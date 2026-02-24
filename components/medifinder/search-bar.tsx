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
    <div className="animate-fade-in-up stagger-4 relative mx-auto -mt-8 w-full max-w-2xl px-5">
      <div className="group relative flex items-center overflow-hidden rounded-2xl border-2 border-transparent bg-card shadow-xl transition-all duration-400 focus-within:border-primary/30 focus-within:shadow-2xl">
        <Search className="ml-5 h-5 w-5 shrink-0 text-muted-foreground transition-all duration-400 group-focus-within:scale-110 group-focus-within:text-primary" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search specialists (e.g. Cardiologist) or city..."
          className="w-full bg-transparent px-4 py-5 text-base font-medium text-card-foreground outline-none placeholder:text-muted-foreground/50"
          aria-label="Search hospitals by specialist or city"
        />
        {value && (
          <button
            onClick={() => {
              onChange("")
              inputRef.current?.focus()
            }}
            className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive transition-all duration-300 hover:scale-110 hover:bg-destructive/20"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
