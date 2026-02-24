"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Hospital } from "@/lib/medifinder-types"

interface AddHospitalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (hospital: Hospital) => void
}

export function AddHospitalModal({
  open,
  onOpenChange,
  onSave,
}: AddHospitalModalProps) {
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [mapsUrl, setMapsUrl] = useState("")
  const [image, setImage] = useState("")
  const [beds, setBeds] = useState("")
  const [docs, setDocs] = useState("")

  function handleSave() {
    if (!name || !city) return
    const doctors = docs
      .split(",")
      .filter(Boolean)
      .map((d) => {
        const parts = d.split("-")
        return { name: parts[0]?.trim() || "", spec: parts[1]?.trim() || "" }
      })

    onSave({
      id: Date.now(),
      name,
      city,
      image,
      phone,
      address,
      mapsUrl: mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " " + address)}`,
      beds: Number(beds) || 0,
      doctors:
        doctors.length > 0 && doctors[0].name
          ? doctors
          : [{ name: "General", spec: "General Medicine" }],
    })

    // Reset form
    setName("")
    setCity("")
    setPhone("")
    setAddress("")
    setMapsUrl("")
    setImage("")
    setBeds("")
    setDocs("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto border-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Add Hospital to Directory
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Fill in the details below to register a new hospital.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hospital-name" className="text-sm font-medium text-foreground">
              Hospital Name
            </Label>
            <Input
              id="hospital-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Apollo Hospitals"
              className="border-input bg-background text-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="hospital-city" className="text-sm font-medium text-foreground">
                City
              </Label>
              <Input
                id="hospital-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Mumbai"
                className="border-input bg-background text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hospital-phone" className="text-sm font-medium text-foreground">
                Phone Number
              </Label>
              <Input
                id="hospital-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 04012345678"
                className="border-input bg-background text-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospital-address" className="text-sm font-medium text-foreground">
              Full Address
            </Label>
            <Input
              id="hospital-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. MG Road, Bengaluru"
              className="border-input bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospital-maps" className="text-sm font-medium text-foreground">
              Google Maps Link
            </Label>
            <Input
              id="hospital-maps"
              value={mapsUrl}
              onChange={(e) => setMapsUrl(e.target.value)}
              placeholder="https://www.google.com/maps/place/..."
              className="border-input bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospital-image" className="text-sm font-medium text-foreground">
              Hospital Image URL
            </Label>
            <Input
              id="hospital-image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="border-input bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospital-beds" className="text-sm font-medium text-foreground">
              Available Beds
            </Label>
            <Input
              id="hospital-beds"
              type="number"
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
              placeholder="e.g. 25"
              className="border-input bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospital-doctors" className="text-sm font-medium text-foreground">
              Doctors
            </Label>
            <Textarea
              id="hospital-doctors"
              value={docs}
              onChange={(e) => setDocs(e.target.value)}
              placeholder="Dr. Name - Specialty, Dr. Name - Specialty"
              className="resize-none border-input bg-background text-foreground"
              rows={3}
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={!name || !city}
            className="w-full font-semibold"
            size="lg"
          >
            Submit Hospital
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
