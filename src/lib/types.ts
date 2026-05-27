export interface Stockist {
  id: number
  name: string
  address: string | null
  city: string
  state: string | null
  country: string
  region: string
  phone: string | null
  email: string | null
  website: string | null
}

export interface JournalPost {
  id: number
  title: string
  slug: string
  excerpt: string | null
  image_url: string | null
  category: string | null
  published_at: string | null
}

export interface TrunkShow {
  id: number
  name: string
  subtitle: string | null
  country_filter: string
}

export interface Product {
  id: number
  handle: string
  name: string
  description: string
  price: string
  main_image: string
}

export interface ProductDetail extends Product {
  images: string[]
  categories: string[]
}
