import { useState, FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import SEO from '@/components/SEO'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchParams({ q: query })
  }

  return (
    <>
      <SEO
        title="Search | Miss Scarlett Bridal"
        description="Search the Miss Scarlett bridal collection — find your dream luxury wedding gown by name, style, or collection."
      />

      <section className="section-21">
        <div className="w-layout-blockcontainer container-28 w-container">
          <h1 className="heading-5">Search</h1>
        </div>
      </section>

      <section className="section-22">
        <div className="w-layout-blockcontainer container-29 w-container">
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <input
              className="text-field w-input"
              type="search"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ flex: 1 }}
            />
            <input type="submit" className="button-3 w-button" value="Search" />
          </form>

          {searchParams.get('q') && (
            <div className="w-dyn-empty">
              <div>
                No results found for &quot;{searchParams.get('q')}&quot;. Connect a search backend to enable results.
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
