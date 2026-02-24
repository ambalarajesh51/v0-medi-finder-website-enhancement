export interface Doctor {
  name: string
  spec: string
}

export interface Hospital {
  id: number
  name: string
  city: string
  image: string
  phone: string
  address: string
  beds: number
  doctors: Doctor[]
}

export interface Review {
  stars: number
  text: string
}

export const DEFAULT_HOSPITALS: Hospital[] = [
  {
    id: 1,
    name: "City Heart Institute",
    city: "Hyderabad",
    image: "https://images.unsplash.com/photo-1587350859728-117622bb73ef?auto=format&fit=crop&w=500&q=80",
    phone: "04099998888",
    address: "Banjara Hills, Hyderabad",
    beds: 14,
    doctors: [{ name: "Dr. Rao", spec: "Cardiologist" }],
  },
  {
    id: 2,
    name: "Apollo Hospitals",
    city: "Chennai",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=500&q=80",
    phone: "04422345678",
    address: "Greams Road, Chennai",
    beds: 32,
    doctors: [
      { name: "Dr. Sharma", spec: "Neurologist" },
      { name: "Dr. Patel", spec: "Orthopedic" },
    ],
  },
  {
    id: 3,
    name: "Fortis Memorial",
    city: "Delhi",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=500&q=80",
    phone: "01144567890",
    address: "Sector 44, Gurgaon",
    beds: 8,
    doctors: [
      { name: "Dr. Kumar", spec: "Oncologist" },
      { name: "Dr. Mehta", spec: "Dermatologist" },
    ],
  },
  {
    id: 4,
    name: "KIMS Hospital",
    city: "Hyderabad",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=500&q=80",
    phone: "04033446677",
    address: "Secunderabad, Hyderabad",
    beds: 21,
    doctors: [
      { name: "Dr. Reddy", spec: "Pediatrician" },
      { name: "Dr. Singh", spec: "Cardiologist" },
    ],
  },
]
