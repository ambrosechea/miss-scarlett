import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoBlack from '@/assets/images/logo-black.webp'
import crosseImg from '@/assets/images/crose-img.webp'

const collectionLinks = [
  { label: 'PALAIS', href: 'https://www.missscarlett.com.au/category/palais' },
  { label: 'MODERN MUSE', href: 'https://www.missscarlett.com.au/category/modern-muse' },
  { label: 'ICONIC', href: 'https://www.missscarlett.com.au/category/iconic' },
  { label: 'ALL WEDDING DRESSES', href: 'https://www.missscarlett.com.au/category/all-collections' },
]

const stockistLinks = [
  { label: 'Find a stockist', to: '/find-a-stockist' },
  { label: 'Become a stockist', to: '/become-a-stockist' },
  { label: 'Stockist login', href: 'http://portal.missscarlett.com.au/orders', external: true },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [collectionOpen, setCollectionOpen] = useState(false)
  const [stockistOpen, setStockistOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  useEffect(() => {
    setMenuOpen(false)
    setCollectionOpen(false)
    setStockistOpen(false)
  }, [location.pathname])

  return (
    <div className="navbar-second">
      <div className="navbar-no-shadow-container w-nav" role="banner" data-collapse="all">
        <div className="container-regular">
          {/* Top bar: always visible */}
          <header className="navbar-wrapper">
            <Link
              to="/book-appointment"
              className={`button-3 header-btn black-headerbtn w-button${isActive('/book-appointment') ? ' w--current' : ''}`}
            >
              Book Appointment
            </Link>

            <Link to="/" className="navbar-brand w-nav-brand">
              <img src={logoBlack} loading="lazy" alt="Miss Scarlett" className="image-12" />
            </Link>

            <button
              className={`menu-button-3 w-nav-button${menuOpen ? ' w--open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              <div className="icon-6 w-icon-nav-menu" style={{ opacity: menuOpen ? 0 : 1 }} />
              <img
                src={crosseImg}
                loading="lazy"
                alt=""
                className="image-13 crosse-img-menu"
                style={{ opacity: menuOpen ? 1 : 0, position: 'absolute', top: 15 }}
              />
            </button>
          </header>
        </div>

        {/* Dropdown menu — sits below the top bar, flows in layout (no absolute) */}
        {menuOpen && (
          <nav
            role="navigation"
            style={{
              backgroundColor: '#f4f2ef',
              width: '100%',
              paddingBottom: '2rem',
            }}
          >
            <ul role="list" className="nav-menu-2 w-list-unstyled" style={{ paddingTop: '1rem', height: 'auto' }}>
              <li className="list-item">
                <Link to="/" className={`nav-link-2${isActive('/') ? ' w--current' : ''}`}>
                  HOME
                </Link>

                <Link to="/about" className={`nav-link-2${isActive('/about') ? ' w--current' : ''}`}>
                  ABOUT
                </Link>

                {/* Collection accordion */}
                <div className="dropdown w-dropdown">
                  <button
                    className="dropdown-toggle-copy w-dropdown-toggle"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: '100%' }}
                    onClick={() => setCollectionOpen(!collectionOpen)}
                  >
                    <div className="nav-link-2">Collection {collectionOpen ? '▲' : '▼'}</div>
                  </button>
                  {collectionOpen && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', paddingTop: '0.5rem' }}>
                      {collectionLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="dropdown-link-2 w-dropdown-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stockists accordion */}
                <div className="dropdown w-dropdown">
                  <button
                    className="dropdown-toggle w-dropdown-toggle"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: '100%' }}
                    onClick={() => setStockistOpen(!stockistOpen)}
                  >
                    <div className="nav-link-2">Stockists {stockistOpen ? '▲' : '▼'}</div>
                  </button>
                  {stockistOpen && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', paddingTop: '0.5rem' }}>
                      {stockistLinks.map((link) =>
                        link.to ? (
                          <Link
                            key={link.label}
                            to={link.to}
                            className="dropdown-link-2 w-dropdown-link"
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            key={link.label}
                            href={link.href}
                            className="dropdown-link-2 w-dropdown-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.label}
                          </a>
                        )
                      )}
                    </div>
                  )}
                </div>

                <Link to="/trunk-shows" className={`nav-link-2${isActive('/trunk-shows') ? ' w--current' : ''}`}>
                  Trunk Shows
                </Link>

                <Link to="/contact-us" className={`nav-link-2${isActive('/contact-us') ? ' w--current' : ''}`}>
                  Contact US
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  )
}
