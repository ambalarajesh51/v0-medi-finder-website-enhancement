"use client"

import { useState, useMemo, useCallback } from "react"
import { Header } from "@/components/medifinder/header"
import { SearchBar } from "@/components/medifinder/search-bar"
import { HospitalCard } from "@/components/medifinder/hospital-card"
import { HospitalDetailModal } from "@/components/medifinder/hospital-detail-modal"
import { AddHospitalModal } from "@/components/medifinder/add-hospital-modal"
import { EmptyState } from "@/components/medifinder/empty-state"
import type { Hospital, Review } from "@/lib/medifinder-types"
import { DEFAULT_HOSPITALS } from "@/lib/medifinder-types"
import {
  Hospital as HospitalIcon,
  Heart,
  Stethoscope,
  BedDouble,
  MapPin,
} from "lucide-react"

export default function MediFinderPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>(DEFAULT_HOSPITALS)
  const [reviews, setReviews] = useState<Record<number, Review[]>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)

  // Filter hospitals based on search query
  const filteredHospitals = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return hospitals
    return hospitals.filter((h) => {
      const specMatch = h.doctors.some((d) =>
        d.spec.toLowerCase().includes(query)
      )
      return (
        h.name.toLowerCase().includes(query) ||
        h.city.toLowerCase().includes(query) ||
        specMatch
      )
    })
  }, [hospitals, searchQuery])

  // Compute stats
  const totalBeds = useMemo(
    () => hospitals.reduce((sum, h) => sum + h.beds, 0),
    [hospitals]
  )
  const totalDoctors = useMemo(
    () => hospitals.reduce((sum, h) => sum + h.doctors.length, 0),
    [hospitals]
  )
  const uniqueCities = useMemo(
    () => new Set(hospitals.map((h) => h.city)).size,
    [hospitals]
  )

  // Get average rating for a hospital
  const getAverageRating = useCallback(
    (hospitalId: number): string => {
      const hospitalReviews = reviews[hospitalId] || []
      if (hospitalReviews.length === 0) return "New"
      const avg =
        hospitalReviews.reduce((a, b) => a + b.stars, 0) /
        hospitalReviews.length
      return avg.toFixed(1)
    },
    [reviews]
  )

  // Handlers
  function handleViewHospital(id: number) {
    const hospital = hospitals.find((h) => h.id === id) || null
    setSelectedHospital(hospital)
    setDetailOpen(true)
  }

  function handleDeleteHospital(id: number) {
    setHospitals((prev) => prev.filter((h) => h.id !== id))
  }

  function handleAddHospital(hospital: Hospital) {
    setHospitals((prev) => [...prev, hospital])
  }

  function handleSubmitReview(hospitalId: number, review: Review) {
    setReviews((prev) => ({
      ...prev,
      [hospitalId]: [...(prev[hospitalId] || []), review],
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onRegisterClick={() => setAddOpen(true)} />

      {/* Search */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Stats Bar */}
      <div className="animate-fade-in-up stagger-5 mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-6 px-5">
        {[
          { icon: HospitalIcon, label: "Hospitals", value: hospitals.length, color: "text-primary" },
          { icon: Stethoscope, label: "Specialists", value: totalDoctors, color: "text-secondary" },
          { icon: BedDouble, label: "Beds", value: totalBeds, color: "text-warning" },
          { icon: MapPin, label: "Areas", value: uniqueCities, color: "text-destructive" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-xl bg-card px-5 py-3 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-accent ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold tracking-tight text-foreground">{stat.value}</p>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-5 pb-20 pt-10">
        {/* Section header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-1 w-8 rounded-full bg-primary" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
            {searchQuery ? "Search Results" : "Hospital Directory"}
          </h2>
          <div className="h-px flex-1 bg-border" />
          {searchQuery && filteredHospitals.length > 0 && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              {filteredHospitals.length} Found
            </span>
          )}
        </div>

        {/* Hospital Grid */}
        {filteredHospitals.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredHospitals.map((hospital, index) => (
              <HospitalCard
                key={hospital.id}
                hospital={hospital}
                averageRating={getAverageRating(hospital.id)}
                index={index}
                onView={handleViewHospital}
                onDelete={handleDeleteHospital}
              />
            ))}
          </div>
        ) : (
          <EmptyState query={searchQuery} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <HospitalIcon className="h-4 w-4" />
            </div>
            <span className="text-base font-extrabold uppercase tracking-tight text-foreground">
              MediFinder
            </span>
          </div>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            Built with <Heart className="h-3.5 w-3.5 fill-destructive text-destructive" /> for better healthcare access in Warangal & Narsampet
          </p>
        </div>
      </footer>

      {/* Modals */}
      <HospitalDetailModal
        hospital={selectedHospital}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        reviews={selectedHospital ? reviews[selectedHospital.id] || [] : []}
        onSubmitReview={handleSubmitReview}
      />

      <AddHospitalModal
        open={addOpen}
        onOpenChange={setAddOpen}
        onSave={handleAddHospital}
      />
    </div>
  )
}
