export interface Stockist {
  id: number
  name: string
  address: string | null
  city: string
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
  title: string
  boutique_name: string
  location: string
  start_date: string
  end_date: string
  description: string | null
}
