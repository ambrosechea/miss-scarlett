export const COLLECTIONS = [
  { slug: 'palais',          label: 'PALAIS',              category: 'PALAIS' },
  { slug: 'modern-muse',     label: 'MODERN MUSE',         category: 'MODERN MUSE' },
  { slug: 'iconic',          label: 'ICONIC',              category: 'ICONIC' },
  { slug: 'anniversary',     label: 'ANNIVERSARY',          category: 'ANNIVERSARY' },
  { slug: 'lumiere',         label: 'LUMIÈRE',             category: 'LUMIÈRE' },
  { slug: 'siren',           label: 'SIREN',               category: 'SIREN' },
  { slug: 'all-collections', label: 'ALL WEDDING DRESSES', category: 'ALL COLLECTIONS' },
] as const

export const COLLECTION_SLUGS = COLLECTIONS.map(c => c.slug)

export const SLUG_TO_CATEGORY: Record<string, string> = Object.fromEntries(
  COLLECTIONS.map(c => [c.slug, c.category])
)
