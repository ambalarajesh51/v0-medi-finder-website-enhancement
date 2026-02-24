"use client"

import { MapPin, Star, Trash2, Stethoscope, BedDouble } from "lucide-react"
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
      className={`hover-lift animate-fade-in-up group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 stagger-${Math.min(index + 1, 6)}`}
      aria-label={`View details for ${hospital.name}`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={hospital.image || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80"}
          alt={hospital.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-115"
          crossOrigin="anonymous"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-foreground/10 to-transparent" />

        {/* Rating Badge */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-card/95 px-3 py-1.5 text-sm font-bold shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <Star className="h-4 w-4 fill-warning text-warning" />
          <span className="text-card-foreground">{averageRating}</span>
        </div>

        {/* Beds Badge */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-secondary/90 px-2.5 py-1 text-xs font-semibold text-secondary-foreground shadow-lg backdrop-blur-sm">
          <BedDouble className="h-3 w-3" />
          {hospital.beds} Beds
        </div>

        {/* City on image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-sm font-medium text-primary-foreground/90 drop-shadow-lg">
          <MapPin className="h-3.5 w-3.5" />
          <span>{hospital.city}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative px-5 pb-5 pt-4">
        {/* Delete button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(hospital.id)
          }}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground/30 transition-all duration-300 hover:scale-110 hover:bg-destructive/10 hover:text-destructive"
          aria-label={`Delete ${hospital.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>

        <h3 className="pr-10 text-lg font-bold uppercase leading-snug tracking-tight text-card-foreground text-pretty">
          {hospital.name}
        </h3>

        <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-primary/8 px-3 py-2 text-sm font-semibold text-primary">
          <Stethoscope className="h-4 w-4 shrink-0" />
          <span>
            {hospital.doctors[0]?.spec}
            {hospital.doctors.length > 1 && ` & ${hospital.doctors.length - 1} More`}
          </span>
        </div>
      </div>
    </article>
  )
}
