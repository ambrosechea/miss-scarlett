import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppShell from './AppShell'
import HomePage from '@/pages/HomePage'

const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const FindStockistPage = lazy(() => import('@/pages/FindStockistPage'))
const StockistDetailPage = lazy(() => import('@/pages/StockistDetailPage'))
const BecomeStockistPage = lazy(() => import('@/pages/BecomeStockistPage'))
const TrunkShowsPage = lazy(() => import('@/pages/TrunkShowsPage'))
const BookAppointmentPage = lazy(() => import('@/pages/BookAppointmentPage'))
const JournalPage = lazy(() => import('@/pages/JournalPage'))
const SearchPage = lazy(() => import('@/pages/SearchPage'))
const CollectionPage = lazy(() => import('@/pages/CollectionPage'))
const ProductPage = lazy(() => import('@/pages/ProductPage'))
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'))
const TermsPage = lazy(() => import('@/pages/TermsPage'))

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        {/* KEEP IN SYNC with src/entry-server.tsx's <Route> list */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/find-a-stockist" element={<FindStockistPage />} />
          <Route path="/stockists/:slug" element={<StockistDetailPage />} />
          <Route path="/become-a-stockist" element={<BecomeStockistPage />} />
          <Route path="/trunk-shows" element={<TrunkShowsPage />} />
          <Route path="/book-appointment" element={<BookAppointmentPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* Products */}
          <Route path="/category/:slug" element={<CollectionPage />} />
          <Route path="/product/:handle" element={<ProductPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          {/* Catch-all */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}
