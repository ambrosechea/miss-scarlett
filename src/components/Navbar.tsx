import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { COLLECTIONS } from '@/lib/collections'
import logoBlack from '@/assets/images/logo-black.webp'

const collectionLinks = COLLECTIONS.map(c => ({ label: c.label, to: `/category/${c.slug}` }))

const stockistLinks = [
  { label: 'Find a stockist',  to: '/find-a-stockist' },
  { label: 'Become a stockist', to: '/become-a-stockist' },
  { label: 'Stockist login',   href: 'http://portal.missscarlett.com.au/orders', external: true },
]

export default function Navbar() {
  const [menuOpen,       setMenuOpen]       = useState(false)
  const [collectionOpen, setCollectionOpen] = useState(false)
  const [stockistOpen,   setStockistOpen]   = useState(false)
  const location = useLocation()

  // Close everything on route change
  useEffect(() => {
    setMenuOpen(false)
    setCollectionOpen(false)
    setStockistOpen(false)
  }, [location.pathname])

  // Prevent body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => {
    setMenuOpen(false)
    setCollectionOpen(false)
    setStockistOpen(false)
  }

  return (
    <>
      {/* ── Sticky top bar ─────────────────────────────────────────── */}
      <div className="navbar-second">
        <div className="navbar-no-shadow-container">
          <div className="container-regular">
            <header className="navbar-wrapper">
              {/* LEFT – Hamburger + Desktop Nav Links */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  className="menu-button-3 w-nav-button"
                  onClick={() => setMenuOpen(true)}
                  aria-label="Open navigation"
                  aria-expanded={menuOpen}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    className="hamburger-svg"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
                <nav className="desktop-nav-links" aria-label="Primary">
                  <Link to="/category/all-collections" className="desktop-nav-link">Collections</Link>
                  <Link to="/about" className="desktop-nav-link">About</Link>
                  <Link to="/find-a-stockist" className="desktop-nav-link">Stockists</Link>
                  <Link to="/journal" className="desktop-nav-link">Journal</Link>
                </nav>
              </div>

              {/* CENTRE – Logo */}
              <Link to="/" className="navbar-brand w-nav-brand" onClick={close} aria-label="Miss Scarlett home">
                <img src={logoBlack} loading="lazy" width={706} height={194} alt="Miss Scarlett" className="image-12" />
              </Link>

              {/* RIGHT – Book Appointment CTA */}
              <Link
                to="/book-appointment"
                className="button-3 header-btn w-button"
                onClick={close}
              >
                Book Appointment
              </Link>
            </header>
          </div>
        </div>
      </div>

      {/* ── Full-screen overlay ────────────────────────────────────── */}
      {menuOpen && (
        <div className="nav-overlay" role="dialog" aria-modal="true" aria-label="Navigation menu">
          {/* Top bar */}
          <div className="nav-overlay-top">
            <button className="nav-overlay-close" onClick={close} aria-label="Close navigation">
              ×
            </button>
            <div className="nav-overlay-logo">
              <Link to="/" onClick={close} aria-label="Miss Scarlett home">
                <img src={logoBlack} loading="lazy" width={706} height={194} alt="Miss Scarlett" className="image-12" />
              </Link>
            </div>
            <div className="nav-overlay-spacer" />
          </div>

          {/* Nav items */}
          <nav role="navigation">
            <ul className="nav-menu-2 nav-overlay-items w-list-unstyled">
              <li>
                <Link to="/" className="nav-link-2" onClick={close}>HOME</Link>
              </li>
              <li>
                <Link to="/about" className="nav-link-2" onClick={close}>ABOUT</Link>
              </li>

              {/* Collection dropdown */}
              <li>
                <button
                  className="nav-link-2 dropdown-toggle-copy w-dropdown-toggle"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}
                  onClick={() => setCollectionOpen(!collectionOpen)}
                  aria-expanded={collectionOpen}
                >
                  COLLECTION
                  <svg
                    className={`nav-chevron${collectionOpen ? ' open' : ''}`}
                    width="11" height="7" viewBox="0 0 11 7"
                    fill="none" stroke="currentColor" strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="1,1 5.5,6 10,1" />
                  </svg>
                </button>
                {collectionOpen && (
                  <ul className="nav-overlay-sub dropdown-list-2 w--open">
                    {collectionLinks.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.to}
                          className="dropdown-link-2 w-dropdown-link"
                          onClick={close}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Stockists dropdown */}
              <li>
                <button
                  className="nav-link-2 dropdown-toggle w-dropdown-toggle"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}
                  onClick={() => setStockistOpen(!stockistOpen)}
                  aria-expanded={stockistOpen}
                >
                  STOCKISTS
                  <svg
                    className={`nav-chevron${stockistOpen ? ' open' : ''}`}
                    width="11" height="7" viewBox="0 0 11 7"
                    fill="none" stroke="currentColor" strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="1,1 5.5,6 10,1" />
                  </svg>
                </button>
                {stockistOpen && (
                  <ul className="nav-overlay-sub dropdown-list-2 w--open">
                    {stockistLinks.map((link) =>
                      link.to ? (
                        <li key={link.label}>
                          <Link
                            to={link.to}
                            className="dropdown-link-2 w-dropdown-link"
                            onClick={close}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ) : (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="dropdown-link-2 w-dropdown-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={close}
                          >
                            {link.label}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </li>

              <li>
                <Link to="/trunk-shows" className="nav-link-2" onClick={close}>TRUNK SHOWS</Link>
              </li>
              <li>
                <Link to="/contact-us" className="nav-link-2" onClick={close}>CONTACT US</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}
