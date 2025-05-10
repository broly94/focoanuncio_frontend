export interface Category {
  id: number
  name: string
  slug: string
  icon: string
}

export interface MarketingStrategy {
  id: number
  title: string
  description: string
  businessHours: {
    open: string
    close: string
  }
  location: {
    address: string
    coordinates: {
      lat: number
      lon: number
    }
  }
  profileImage: string
  bannerImage: string
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
  phone: string
  keywords: string[]
  website: string
  address: string
  rating: number
  reviews: Review[]
  followers: number
  category: string
}

export interface Review {
  id: number
  userId: number
  userName: string
  rating: number
  comment: string
  date: string
}

export interface User {
  id: number
  name: string
  email: string
  strategies: MarketingStrategy[]
  following: number[]
  reviews: Review[]
}

export interface Reservation {
  id: string
  strategyId: string
  userId: string
  date: string
  time: string
  name: string
  email: string
  phone: string
  message?: string
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
  strategy?: {
    id: number
    title: string
    profileImage: string
  }
}
