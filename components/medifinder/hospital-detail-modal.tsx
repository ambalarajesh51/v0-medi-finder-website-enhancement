"use client"

import { useState } from "react"
import {
  MapPin,
  Phone,
  Navigation,
  Star,
  BedDouble,
  Stethoscope,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Hospital, Review } from "@/lib/medifinder-types"

interface HospitalDetailModalProps {
  hospital: Hospital | null
  open: boolean
  onOpenChange: (open: boolean) => void
  reviews: Review[]
  onSubmitReview: (hospitalId: number, review: Review) => void
}

export function HospitalDetailModal({
  hospital,
  open,
  onOpenChange,
  reviews,
  onSubmitReview,
}: HospitalDetailModalProps) {
  const [selectedStar, setSelectedStar] = useState(5)
  const [reviewText, setReviewText] = useState("")

  if (!hospital) return null

  const navUrl = hospital.mapsUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hospital.name + " " + hospital.address)}`

  function handleSubmitReview() {
    if (!reviewText.trim() || !hospital) return
    onSubmitReview(hospital.id, { stars: selectedStar, text: reviewText })
    setReviewText("")
    setSelectedStar(5)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto border-border bg-card p-0">
        {/* Hero Image */}
        <div className="relative h-52 overflow-hidden rounded-t-lg">
          <img
            src={hospital.image}
            alt={hospital.name}
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <DialogHeader>
              <DialogTitle className="text-left text-xl font-bold text-card">
                {hospital.name}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Details and reviews for {hospital.name} in {hospital.city}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="space-y-5 px-6 pb-6">
          {/* Address & Beds */}
          <div className="flex flex-col gap-2.5 rounded-xl bg-accent/50 p-4">
            <a
              href={navUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/addr flex items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="underline decoration-primary/30 underline-offset-2 transition-all group-hover/addr:decoration-primary">{hospital.address}</span>
            </a>
            <div className="flex items-center gap-2 text-sm">
              <BedDouble className="h-4 w-4 shrink-0 text-secondary" />
              <span className="font-medium text-muted-foreground">
                {"Beds Available: "}
              </span>
              <span className="rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-bold text-destructive">
                {hospital.beds}
              </span>
            </div>
          </div>

          {/* Specialists */}
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Stethoscope className="h-3.5 w-3.5" />
              </div>
              Specialists
            </h4>
            <div className="space-y-2">
              {hospital.doctors.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-border bg-accent/40 px-4 py-3 text-sm transition-colors hover:bg-accent"
                >
                  <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-secondary shadow-sm" />
                  <span className="font-semibold text-foreground">
                    {d.name}
                  </span>
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{d.spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              asChild
              className="gap-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <a href={`tel:${hospital.phone}`}>
                <Phone className="h-4 w-4" />
                Call
              </a>
            </Button>
            <Button asChild className="gap-2 rounded-lg">
              <a href={navUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="h-4 w-4" />
                Navigate
              </a>
            </Button>
          </div>

          {/* Reviews Section */}
          <div className="border-t border-border pt-5">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
              Leave a Review
            </h4>

            {/* Star selector */}
            <div className="mb-3 flex gap-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedStar(num)}
                  className="transition-transform duration-150 hover:scale-125"
                  aria-label={`Rate ${num} stars`}
                >
                  <Star
                    className={`h-6 w-6 transition-colors duration-200 ${
                      num <= selectedStar
                        ? "fill-warning text-warning"
                        : "fill-transparent text-border"
                    }`}
                  />
                </button>
              ))}
            </div>

            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your experience..."
              className="resize-none border-input bg-background text-foreground"
              rows={3}
            />

            <Button
              onClick={handleSubmitReview}
              disabled={!reviewText.trim()}
              className="mt-3 w-full"
            >
              Post Review
            </Button>

            {/* Existing reviews */}
            {reviews.length > 0 && (
              <div className="mt-5 space-y-3">
                {reviews.map((r, i) => (
                  <div
                    key={i}
                    className="animate-fade-in-up rounded-lg border border-border bg-muted/40 p-4"
                  >
                    <div className="mb-1 flex items-center gap-1">
                      {Array.from({ length: r.stars }).map((_, j) => (
                        <Star
                          key={j}
                          className="h-3.5 w-3.5 fill-warning text-warning"
                        />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {r.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
