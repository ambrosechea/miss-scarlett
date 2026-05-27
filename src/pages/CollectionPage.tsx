import { useState, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiGet } from '@/lib/api'
import type { Product } from '@/lib/types'
import SEO from '@/components/SEO'

const COLLECTION_META: Record<string, { title: string; heading: string; description: string }> = {
  'palais': {
    title:       'Palais Collection | Miss Scarlett Bridal',
    heading:     'PALAIS',
    description: 'Discover the Palais collection — couture-inspired bridal gowns for the bride who desires architectural elegance and modern romance.',
  },
  'lumiere': {
    title:       'Lumière Collection | Miss Scarlett Bridal',
    heading:     'LUMIÈRE',
    description: 'The Lumière collection — flowing, radiant bridal gowns that celebrate light, softness, and timeless feminine beauty.',
  },
  'anniversary': {
    title:       'Anniversary Collection | Miss Scarlett Bridal',
    heading:     'ANNIVERSARY',
    description: "The Anniversary collection — Miss Scarlett's most beloved designs, timeless gowns that have captured brides' hearts since our beginning.",
  },
  'siren': {
    title:       'Siren Collection | Miss Scarlett Bridal',
    heading:     'SIREN',
    description: 'The Siren collection — sultry, figure-hugging bridal gowns designed for the bold, confident bride.',
  },
  'modern-muse': {
    title:       'Modern Muse Collection | Miss Scarlett Bridal',
    heading:     'MODERN MUSE',
    description: 'The Modern Muse collection — contemporary bridal gowns with clean lines, minimalist beauty, and effortless sophistication.',
  },
  'iconic': {
    title:       'Iconic Collection | Miss Scarlett Bridal',
    heading:     'ICONIC',
    description: 'The Iconic collection — signature Miss Scarlett designs that have defined our legacy of exquisite bridal fashion.',
  },
  'all-collections': {
    title:       'All Wedding Dresses | Miss Scarlett Bridal',
    heading:     'ALL WEDDING DRESSES',
    description: 'Explore the complete Miss Scarlett bridal collection — discover your dream gown across every style, from romantic lace to sleek modern silhouettes.',
  },
}

const COLLECTION_NAV = [
  { slug: 'all-collections', label: 'ALL COLLECTIONS' },
  { slug: 'palais',          label: 'PALAIS' },
  { slug: 'lumiere',         label: 'LUMIÈRE' },
  { slug: 'modern-muse',     label: 'MODERN MUSE' },
  { slug: 'iconic',          label: 'ICONIC' },
  { slug: 'anniversary',     label: 'ANNIVERSARY' },
  { slug: 'siren',           label: 'SIREN' },
]

const DRESS_TYPES = ['ALL SHAPES', 'A-LINE', 'BALLGOWN', 'FIT & FLARE', 'MINI', 'SHEATH']

type SortOption = 'default' | 'a-z' | 'z-a'

/** Detect silhouette from product name + description text */
function getDressType(p: Product): string {
  // Normalise: collapse typographic ligatures (ﬁ ﬂ etc.) and lower-case
  const text = (p.name + ' ' + p.description)
    .replace(/ﬁ/g, 'fi').replace(/ﬂ/g, 'fl').replace(/ﬀ/g, 'ff')
    .toLowerCase()

  if (text.includes('mini')) return 'MINI'
  if (text.includes('ballgown') || text.includes('ball gown')) return 'BALLGOWN'
  if (text.includes('a-line')) return 'A-LINE'
  if (text.includes('fit-and-flare') || text.includes('fit and flare')) return 'FIT & FLARE'
  if (text.includes('sheath')) return 'SHEATH'
  return ''   // no match — appears in ALL SHAPES but not in specific type
}

export default function CollectionPage() {
  const { slug = 'all-collections' } = useParams<{ slug: string }>()

  const [products,    setProducts]    = useState<Product[]>([])
  const [loading,     setLoading]     = useState(true)
  const [fetchError,  setFetchError]  = useState<string | null>(null)
  const [search,      setSearch]      = useState('')
  const [sortBy,      setSortBy]      = useState<SortOption>('default')
  const [dressType,   setDressType]   = useState('ALL SHAPES')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const meta = COLLECTION_META[slug] ?? {
    title:       'Collection | Miss Scarlett Bridal',
    heading:     slug.toUpperCase().replace(/-/g, ' '),
    description: 'Explore the Miss Scarlett bridal collection.',
  }

  // Reset filters when collection changes
  useEffect(() => {
    setSearch('')
    setSortBy('default')
    setDressType('ALL SHAPES')
    setLoading(true)
    setFetchError(null)
    setProducts([])

    const qs = slug === 'all-collections' ? '' : `?collection=${slug}`
    apiGet<Product[]>(`/api/products${qs}`).then(({ data, error }) => {
      if (error) setFetchError(error)
      else setProducts(data ?? [])
      setLoading(false)
    })
  }, [slug])

  // Filter + sort in memory
  const displayed = useMemo(() => {
    let list = [...products]

    // search
    const q = search.trim().toLowerCase()
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q))

    // dress type
    if (dressType !== 'ALL SHAPES') {
      list = list.filter(p => getDressType(p) === dressType)
    }

    // sort
    if (sortBy === 'a-z') list.sort((a, b) => a.name.localeCompare(b.name))
    else if (sortBy === 'z-a') list.sort((a, b) => b.name.localeCompare(a.name))

    return list
  }, [products, search, dressType, sortBy])

  const sidebar = (
    <aside className="collection-sidebar">
      {/* Search */}
      <div className="sidebar-section">
        <label className="sidebar-label" htmlFor="product-search">SEARCH</label>
        <div className="sidebar-search-wrap">
          <input
            id="product-search"
            type="search"
            className="sidebar-search-input"
            placeholder="Search gowns…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <svg className="sidebar-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>
        </div>
      </div>

      {/* Sort */}
      <div className="sidebar-section">
        <label className="sidebar-label" htmlFor="sort-select">SORT BY</label>
        <select
          id="sort-select"
          className="sidebar-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value as SortOption)}
        >
          <option value="default">Default</option>
          <option value="a-z">A – Z</option>
          <option value="z-a">Z – A</option>
        </select>
      </div>

      {/* Collections */}
      <div className="sidebar-section">
        <p className="sidebar-label">COLLECTION</p>
        <ul className="sidebar-link-list">
          {COLLECTION_NAV.map(c => (
            <li key={c.slug}>
              <Link
                to={`/category/${c.slug}`}
                className={`sidebar-collection-link${slug === c.slug ? ' active' : ''}`}
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Dress / skirt type */}
      <div className="sidebar-section">
        <p className="sidebar-label">DRESS TYPE</p>
        <div className="sidebar-tags">
          {DRESS_TYPES.map(type => (
            <button
              key={type}
              className={`sidebar-tag${dressType === type ? ' active' : ''}`}
              onClick={() => setDressType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )

  return (
    <>
      <SEO title={meta.title} description={meta.description} />

      {/* Hero */}
      <section className="section-2 discover-miss-scarlett">
        <div className="w-layout-blockcontainer container-6 w-container">
          <div className="collection-hero">
            <h6 className="heading latest-collections">THE COLLECTION</h6>
            <h1 className="heading-5">{meta.heading}</h1>
            <p className="paragraph">{meta.description}</p>
          </div>
        </div>
      </section>

      {/* Sidebar + grid */}
      <section className="section-20 collection-section">
        <div className="w-layout-blockcontainer collection-container w-container">

          {/* Mobile filter toggle */}
          <button
            className="collection-filter-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-expanded={sidebarOpen}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="20" y2="12" />
              <line x1="12" y1="18" x2="20" y2="18" />
            </svg>
            {sidebarOpen ? 'HIDE FILTERS' : 'FILTERS'}
          </button>

          <div className={`collection-layout${sidebarOpen ? ' sidebar-visible' : ''}`}>
            {/* Sidebar — always rendered but hidden on mobile until toggled */}
            {sidebar}

            {/* Main content */}
            <div className="collection-main">
              {loading && <p className="paragraph">Loading…</p>}
              {fetchError && <p className="paragraph">{fetchError}</p>}

              {!loading && !fetchError && (
                <>
                  <p className="collection-count">
                    {displayed.length} {displayed.length === 1 ? 'gown' : 'gowns'}
                  </p>
                  {displayed.length === 0 ? (
                    <div className="w-dyn-empty">
                      <div>No gowns match your filters.</div>
                      <button
                        className="sidebar-tag active"
                        style={{ marginTop: '1rem' }}
                        onClick={() => { setSearch(''); setDressType('ALL SHAPES'); setSortBy('default') }}
                      >
                        Clear filters
                      </button>
                    </div>
                  ) : (
                    <div role="list" className="product-grid">
                      {displayed.map(product => (
                        <div key={product.id} role="listitem" className="product-card">
                          <Link to={`/product/${product.handle}`} className="product-card-link">
                            <div className="product-card-image-wrap">
                              <img
                                src={product.main_image}
                                alt={`${product.name} — Miss Scarlett bridal gown`}
                                className="product-card-image"
                                loading="lazy"
                              />
                            </div>
                            <div className="product-card-info">
                              <h3 className="product-card-name">{product.name}</h3>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
