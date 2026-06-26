import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { trackPageView } from '@/lib/analytics'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HomePage from '@/pages/HomePage'

const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const FindStockistPage = lazy(() => import('@/pages/FindStockistPage'))
const BecomeStockistPage = lazy(() => import('@/pages/BecomeStockistPage'))
const TrunkShowsPage = lazy(() => import('@/pages/TrunkShowsPage'))
const BookAppointmentPage = lazy(() => import('@/pages/BookAppointmentPage'))
const JournalPage = lazy(() => import('@/pages/JournalPage'))
const SearchPage = lazy(() => import('@/pages/SearchPage'))
const CollectionPage = lazy(() => import('@/pages/CollectionPage'))
const ProductPage = lazy(() => import('@/pages/ProductPage'))

function RouteTracker() {
  const location = useLocation()
  useEffect(() => {
    const t = setTimeout(() => trackPageView(location.pathname, document.title), 0)
    return () => clearTimeout(t)
  }, [location.pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteTracker />
      <Navbar />
      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/find-a-stockist" element={<FindStockistPage />} />
            <Route path="/become-a-stockist" element={<BecomeStockistPage />} />
            <Route path="/trunk-shows" element={<TrunkShowsPage />} />
            <Route path="/book-appointment" element={<BookAppointmentPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/search" element={<SearchPage />} />
            {/* Products */}
            <Route path="/category/:slug" element={<CollectionPage />} />
            <Route path="/product/:handle" element={<ProductPage />} />
            {/* Catch-all */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
