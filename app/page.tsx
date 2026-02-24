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
import { Hospital as HospitalIcon, Heart } from "lucide-react"

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

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-5 pb-20 pt-10">
        {/* Results count */}
        {searchQuery && filteredHospitals.length > 0 && (
          <p className="animate-fade-in-down mb-6 text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredHospitals.length}
            </span>{" "}
            {filteredHospitals.length === 1 ? "hospital" : "hospitals"} for{" "}
            <span className="font-medium text-primary">
              {`"${searchQuery}"`}
            </span>
          </p>
        )}

        {/* Hospital Grid */}
        {filteredHospitals.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      <footer className="border-t border-border bg-card py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 text-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <HospitalIcon className="h-4 w-4 text-primary" />
            <span className="font-semibold text-foreground">
              MediFinder Pro
            </span>
          </div>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Built with <Heart className="h-3 w-3 text-destructive" /> for better healthcare access
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
