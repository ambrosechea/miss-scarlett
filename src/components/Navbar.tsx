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

interface NavLinkItem {
  label: string
  to?: string
  href?: string
}

function NavDropdown({
  label,
  items,
  open,
  onToggle,
  onLinkClick,
  toggleClassName,
}: {
  label: string
  items: NavLinkItem[]
  open: boolean
  onToggle: () => void
  onLinkClick: () => void
  toggleClassName: string
}) {
  return (
    <li>
      <button
        className={`nav-link-2 ${toggleClassName} w-dropdown-toggle`}
        style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}
        onClick={onToggle}
        aria-expanded={open}
      >
        {label}
        <svg
          className={`nav-chevron${open ? ' open' : ''}`}
          width="11" height="7" viewBox="0 0 11 7"
          fill="none" stroke="currentColor" strokeWidth="1.2"
          strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="1,1 5.5,6 10,1" />
        </svg>
      </button>
      {open && (
        <ul className="nav-overlay-sub dropdown-list-2 w--open">
          {items.map((link) =>
            link.to ? (
              <li key={link.label}>
                <Link to={link.to} className="dropdown-link-2 w-dropdown-link" onClick={onLinkClick}>
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
                  onClick={onLinkClick}
                >
                  {link.label}
                </a>
              </li>
            )
          )}
        </ul>
      )}
    </li>
  )
}

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
              {/* LEFT – Hamburger */}
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

              <NavDropdown
                label="COLLECTION"
                items={collectionLinks}
                open={collectionOpen}
                onToggle={() => setCollectionOpen(!collectionOpen)}
                onLinkClick={close}
                toggleClassName="dropdown-toggle-copy"
              />

              <NavDropdown
                label="STOCKISTS"
                items={stockistLinks}
                open={stockistOpen}
                onToggle={() => setStockistOpen(!stockistOpen)}
                onLinkClick={close}
                toggleClassName="dropdown-toggle"
              />

              <li>
                <Link to="/trunk-shows" className="nav-link-2" onClick={close}>TRUNK SHOWS</Link>
              </li>
              <li>
                <Link to="/journal" className="nav-link-2" onClick={close}>JOURNAL</Link>
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
