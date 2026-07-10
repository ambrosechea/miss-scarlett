import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found | Miss Scarlett"
        description="The page you're looking for doesn't exist. Explore Miss Scarlett's luxury bridal collections, find a stockist, or return to the homepage."
        noindex
      />

      <section className="section-2 discover-miss-scarlett">
        <div className="w-layout-blockcontainer container-6 w-container" style={{ textAlign: 'center' }}>
          <p className="heading latest-collections">404</p>
          <h1 className="heading-5">Page not found</h1>
          <p className="paragraph">The page you're looking for doesn't exist or may have moved.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/" className="button-3 w-button">RETURN HOME</Link>
            <Link to="/category/all-collections" className="button-3 lovce-btn w-button">EXPLORE COLLECTIONS</Link>
          </div>
        </div>
      </section>
    </>
  )
}
