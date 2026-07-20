import { useState, useEffect, useMemo, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { apiGet } from '@/lib/api'
import { usePageDataSeed } from '@/lib/pageData'
import { trackCollectionView } from '@/lib/analytics'
import { COLLECTIONS } from '@/lib/collections'
import { COLLECTION_META } from '@/lib/collectionMeta'
import type { Product } from '@/lib/types'
import SEO from '@/components/SEO'
import { buildCollectionSchema } from '@/lib/schema'
import { stripLigatures } from '@/lib/text'

const COLLECTION_NAV = COLLECTIONS.map(c => ({ slug: c.slug, label: c.label }))

const DRESS_TYPES = ['ALL SHAPES', 'MINI', 'A-LINE', 'BALLGOWN', 'FIT & FLARE', 'SHEATH', 'LACE']

/** Curated handles for the LACE filter — not text-detected, since "lace" appears
 *  loosely in many descriptions that aren't primarily lace gowns. */
const LACE_HANDLES = new Set([
  'sorelle', 'sorelle-mini', 'seraphine', 'saskia', 'sage', 'sabine',
  'tatum', 'anna', 'amelie2', 'tory', 'saffron', 'tilly', 'tiana',
  'tessa', 'tegan', 'tallulah',
])

/** Detect silhouette from product name + description text */
function getDressType(p: Product): string {
  const text = stripLigatures(p.name + ' ' + p.description).toLowerCase()
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
  const seed = usePageDataSeed<{ products: Product[] }>(`/category/${slug}`)

  const [products,    setProducts]    = useState<Product[]>(() => seed?.products ?? [])
  const [loading,     setLoading]     = useState(() => !seed)
  const [fetchError,  setFetchError]  = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [activeSearch,setActiveSearch]= useState('')
  const [dressType,   setDressType]   = useState('ALL SHAPES')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const seededSlug = useRef(seed ? slug : null)

  const meta = COLLECTION_META[slug] ?? {
    title:       'Collection | Miss Scarlett Bridal',
    heading:     slug.toUpperCase().replace(/-/g, ' '),
    description: 'Explore the Miss Scarlett bridal collection.',
  }

  useEffect(() => {
    if (seededSlug.current === slug) {
      seededSlug.current = null // only skip the fetch once, right after the seeded mount
      return
    }

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

  useEffect(() => {
    if (loading || products.length === 0) return
    trackCollectionView(slug, meta.heading, products)
  }, [loading, products, slug, meta.heading])

  const displayed = useMemo(() => {
    let list = [...products]
    if (activeSearch) list = list.filter(p => p.name.toLowerCase().includes(activeSearch.toLowerCase()))
    if (dressType === 'LACE') list = list.filter(p => LACE_HANDLES.has(p.handle))
    else if (dressType !== 'ALL SHAPES') list = list.filter(p => getDressType(p) === dressType)
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
                              <h2 className="product-card-name">{product.name}</h2>
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
