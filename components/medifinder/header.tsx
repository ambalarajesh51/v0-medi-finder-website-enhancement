"use client"

import { Hospital, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onRegisterClick: () => void
}

export function Header({ onRegisterClick }: HeaderProps) {
  return (
    <header className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, currentColor 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, currentColor 1px, transparent 1px),
              radial-gradient(circle at 60% 80%, currentColor 1px, transparent 1px)`,
            backgroundSize: "60px 60px, 80px 80px, 70px 70px",
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5 py-14 text-center md:py-20">
        <div className="animate-fade-in-down flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/15 backdrop-blur-sm">
            <Hospital className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            MediFinder Pro
          </h1>
        </div>

        <p className="animate-fade-in-up stagger-2 mt-4 max-w-md text-base font-light leading-relaxed text-primary-foreground/80 text-balance">
          Verified Hospitals, Specialist Search & Patient Reviews
        </p>

        <Button
          onClick={onRegisterClick}
          variant="secondary"
          size="lg"
          className="animate-fade-in-up stagger-3 mt-6 gap-2 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <Plus className="h-4 w-4" />
          Register Your Hospital
        </Button>
      </div>
    </header>
  )
}
