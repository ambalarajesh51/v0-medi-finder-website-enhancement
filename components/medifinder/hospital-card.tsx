"use client"

import { MapPin, Star, Trash2, Stethoscope } from "lucide-react"
import type { Hospital } from "@/lib/medifinder-types"

interface HospitalCardProps {
  hospital: Hospital
  averageRating: string
  index: number
  onView: (id: number) => void
  onDelete: (id: number) => void
}

export function HospitalCard({
  hospital,
  averageRating,
  index,
  onView,
  onDelete,
}: HospitalCardProps) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onView(hospital.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onView(hospital.id)
        }
      }}
      className={`animate-fade-in-up group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-400 hover:-translate-y-2 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 stagger-${Math.min(index + 1, 6)}`}
      aria-label={`View details for ${hospital.name}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={hospital.image || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=500&q=80"}
          alt={hospital.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Rating Badge */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-sm font-semibold shadow-md backdrop-blur-sm">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span className="text-card-foreground">{averageRating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-5">
        {/* Delete button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(hospital.id)
          }}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground/40 transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
          aria-label={`Delete ${hospital.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>

        <h3 className="pr-10 text-lg font-semibold leading-snug text-card-foreground text-pretty">
          {hospital.name}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span>{hospital.city}</span>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary">
          <Stethoscope className="h-3.5 w-3.5 shrink-0" />
          <span>
            {hospital.doctors[0]?.spec}
            {hospital.doctors.length > 1 && ` & ${hospital.doctors.length - 1} more`}
          </span>
        </div>
      </div>
    </article>
  )
}
