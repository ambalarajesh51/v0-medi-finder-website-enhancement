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
  mapsUrl: string
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
    name: "MGM Hospital",
    city: "Warangal",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80",
    phone: "08702453300",
    address: "M.G. Road, Warangal H.O., Warangal, Telangana 506002",
    mapsUrl: "https://www.google.com/maps/place/MGM+Hospital,+Warangal/@17.9784,79.5941,17z",
    beds: 60,
    doctors: [
      { name: "Dr. Ramesh Babu", spec: "General Medicine" },
      { name: "Dr. Suresh Kumar", spec: "Orthopedic Surgeon" },
      { name: "Dr. Lakshmi Devi", spec: "Gynecologist" },
    ],
  },
  {
    id: 2,
    name: "ESIC Hospital",
    city: "Warangal",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
    phone: "08702456789",
    address: "Labour Colony, Narsampet Road, Warangal, Telangana 506013",
    mapsUrl: "https://www.google.com/maps/place/ESIC+Hospital+Warangal/@17.9612,79.5862,17z",
    beds: 30,
    doctors: [
      { name: "Dr. Venkat Rao", spec: "General Physician" },
      { name: "Dr. Padma", spec: "ENT Specialist" },
    ],
  },
  {
    id: 3,
    name: "Warangal Hospitals Diagnostic & Research Center",
    city: "Warangal",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80",
    phone: "08702578900",
    address: "11-23-890, Narsampet Road, Beside Swarna Palace, Charbowli, LB Nagar, Warangal, Telangana 506002",
    mapsUrl: "https://www.google.com/maps/place/Warangal+Hospitals+Diagnostic+%26+Research+Center/@17.9690,79.5880,17z",
    beds: 25,
    doctors: [
      { name: "Dr. Srinivas", spec: "Cardiologist" },
      { name: "Dr. Rajesh", spec: "Neurologist" },
      { name: "Dr. Anitha", spec: "Dermatologist" },
    ],
  },
  {
    id: 4,
    name: "Mallika Hospital",
    city: "Narsampet",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=600&q=80",
    phone: "08706234567",
    address: "Main Road, Narsampet, Warangal District, Telangana 506132",
    mapsUrl: "https://www.google.com/maps/place/Mallika+Hospital+Narsampet/@17.9276,79.8890,17z",
    beds: 15,
    doctors: [
      { name: "Dr. Mallika", spec: "General Medicine" },
      { name: "Dr. Ravi Teja", spec: "Pediatrician" },
    ],
  },
  {
    id: 5,
    name: "Government Hospital Narsampet",
    city: "Narsampet",
    image: "https://images.unsplash.com/photo-1587350859728-117622bb73ef?auto=format&fit=crop&w=600&q=80",
    phone: "08706245678",
    address: "Government Hospital Road, Narsampet, Warangal District, Telangana 506132",
    mapsUrl: "https://www.google.com/maps/place/Government+Hospital+Narsampet/@17.9307,79.8924,17z",
    beds: 40,
    doctors: [
      { name: "Dr. Nagaraju", spec: "General Surgeon" },
      { name: "Dr. Swathi", spec: "Gynecologist" },
      { name: "Dr. Krishna", spec: "Orthopedic" },
    ],
  },
  {
    id: 6,
    name: "Sri Sai Hospital",
    city: "Narsampet",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
    phone: "08706256789",
    address: "Near Bus Stand, Narsampet, Warangal District, Telangana 506132",
    mapsUrl: "https://www.google.com/maps/place/Sri+Sai+Hospital+Narsampet/@17.9285,79.8895,17z",
    beds: 12,
    doctors: [
      { name: "Dr. Sai Prasad", spec: "General Physician" },
      { name: "Dr. Kavitha", spec: "Pediatrician" },
    ],
  },
]
