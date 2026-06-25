import { useState, useEffect, useMemo } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { apiGet } from '@/lib/api'
import { COLLECTIONS } from '@/lib/collections'
import type { Product } from '@/lib/types'
import SEO from '@/components/SEO'
import { buildCollectionSchema } from '@/lib/schema'

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

const COLLECTION_NAV = COLLECTIONS.map(c => ({ slug: c.slug, label: c.label }))

const DRESS_TYPES = ['ALL SHAPES', 'MINI', 'A-LINE', 'BALLGOWN', 'FIT & FLARE', 'SHEATH']

/** Detect silhouette from product name + description text */
function getDressType(p: Product): string {
  const text = (p.name + ' ' + p.description)
    .replace(/ﬁ/g, 'fi').replace(/ﬂ/g, 'fl').replace(/ﬀ/g, 'ff')
    .toLowerCase()
  if (text.includes('mini')) return 'MINI'
  if (text.includes('ballgown') || text.includes('ball gown')) return 'BALLGOWN'
  if (text.includes('a-line')) return 'A-LINE'
  if (text.includes('fit-and-flare') || text.includes('fit and flare')) return 'FIT & FLARE'
  if (text.includes('sheath')) return 'SHEATH'
  return ''
}

export default function CollectionPage() {
  const { slug = 'all-collections' } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const [products,    setProducts]    = useState<Product[]>([])
  const [loading,     setLoading]     = useState(true)
  const [fetchError,  setFetchError]  = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [activeSearch,setActiveSearch]= useState('')
  const [dressType,   setDressType]   = useState('ALL SHAPES')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const meta = COLLECTION_META[slug] ?? {
    title:       'Collection | Miss Scarlett Bridal',
    heading:     slug.toUpperCase().replace(/-/g, ' '),
    description: 'Explore the Miss Scarlett bridal collection.',
  }

  useEffect(() => {
    setSearchInput('')
    setActiveSearch('')
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

  const displayed = useMemo(() => {
    let list = [...products]
    if (activeSearch) list = list.filter(p => p.name.toLowerCase().includes(activeSearch.toLowerCase()))
    if (dressType !== 'ALL SHAPES') list = list.filter(p => getDressType(p) === dressType)
    return list
  }, [products, activeSearch, dressType])

  const sidebar = (
    <aside className="collection-sidebar">

      {/* Search */}
      <div className="sidebar-section">
        <p className="sidebar-label">Search</p>
        <div className="sidebar-search-row">
          <input
            type="text"
            className="sidebar-search-input"
            placeholder="Search..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') setActiveSearch(searchInput) }}
          />
          <button
            className="sidebar-search-btn"
            onClick={() => setActiveSearch(searchInput)}
          >
            Search
          </button>
        </div>
      </div>

      {/* Collection — radio style */}
      <div className="sidebar-section">
        <p className="sidebar-label">COLLECTION</p>
        <ul className="sidebar-radio-list">
          {COLLECTION_NAV.map(c => (
            <li key={c.slug}>
              <label className={`sidebar-radio-item${slug === c.slug ? ' checked' : ''}`}>
                <input
                  type="radio"
                  name="collection"
                  className="sidebar-radio-input"
                  checked={slug === c.slug}
                  onChange={() => navigate(`/category/${c.slug}`)}
                />
                <span className="sidebar-radio-dot" />
                <span className="sidebar-radio-label">{c.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Dress / skirt type — radio style */}
      <div className="sidebar-section">
        <p className="sidebar-label">DRESS/SKIRT TYPE</p>
        <ul className="sidebar-radio-list">
          {DRESS_TYPES.map(type => (
            <li key={type}>
              <label className={`sidebar-radio-item${dressType === type ? ' checked' : ''}`}>
                <input
                  type="radio"
                  name="dresstype"
                  className="sidebar-radio-input"
                  checked={dressType === type}
                  onChange={() => setDressType(type)}
                />
                <span className="sidebar-radio-dot" />
                <span className="sidebar-radio-label">{type}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

    </aside>
  )

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        schema={buildCollectionSchema(slug, meta.heading, meta.description, products.map(p => p.handle))}
      />

      {/* Hero */}
      <section className="section-2 discover-miss-scarlett">
        <div className="w-layout-blockcontainer container-6 w-container">
          <div className="collection-hero">
            <p className="heading latest-collections">THE COLLECTION</p>
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
            {sidebar}

            <div className="collection-main">
              {loading && <p className="paragraph">Loading…</p>}
              {fetchError && <p className="paragraph">{fetchError}</p>}

              {!loading && !fetchError && (
                <>
                  {displayed.length === 0 ? (
                    <div className="w-dyn-empty">
                      <div>No gowns match your filters.</div>
                      <button
                        className="sidebar-search-btn"
                        style={{ marginTop: '1rem' }}
                        onClick={() => { setActiveSearch(''); setSearchInput(''); setDressType('ALL SHAPES') }}
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
