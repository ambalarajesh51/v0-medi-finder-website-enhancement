"use client"

import { Hospital, Plus, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onRegisterClick: () => void
}

export function Header({ onRegisterClick }: HeaderProps) {
  return (
    <header className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, oklch(0.60 0.18 165 / 0.4), transparent),
            radial-gradient(ellipse 60% 40% at 80% 60%, oklch(0.50 0.16 220 / 0.3), transparent)
          `,
        }}
      />

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1.2px, transparent 1.2px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Floating decorative shapes */}
      <div className="animate-float absolute left-[10%] top-[20%] h-24 w-24 rounded-full bg-primary-foreground/5" />
      <div className="animate-float absolute right-[15%] bottom-[15%] h-16 w-16 rounded-full bg-primary-foreground/5" style={{ animationDelay: "1s" }} />
      <div className="animate-float absolute right-[30%] top-[10%] h-10 w-10 rounded-full bg-primary-foreground/5" style={{ animationDelay: "2s" }} />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5 py-16 text-center md:py-24">
        {/* Logo and Title */}
        <div className="animate-fade-in-down flex items-center gap-3">
          <div className="animate-icon-pop flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/15 shadow-lg backdrop-blur-sm">
            <Hospital className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
            MediFinder
          </h1>
        </div>

        {/* Location badge */}
        <div className="animate-scale-in stagger-2 mt-4 flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary-foreground/90 backdrop-blur-sm">
          <MapPin className="h-3 w-3" />
          Warangal & Narsampet
        </div>

        <p className="animate-fade-in-up stagger-3 mt-5 max-w-lg text-lg font-light leading-relaxed text-primary-foreground/85 text-balance">
          Verified Hospitals, Specialist Search & Patient Reviews
        </p>

        <Button
          onClick={onRegisterClick}
          variant="secondary"
          size="lg"
          className="animate-fade-in-up stagger-4 mt-8 gap-2 rounded-full px-8 text-base font-bold uppercase tracking-wide shadow-xl transition-all duration-400 hover:scale-110 hover:shadow-2xl"
        >
          <Plus className="h-5 w-5" />
          Register Your Hospital
        </Button>
      </div>
    </header>
  )
}
