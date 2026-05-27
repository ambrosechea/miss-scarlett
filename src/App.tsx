import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import FindStockistPage from '@/pages/FindStockistPage'
import BecomeStockistPage from '@/pages/BecomeStockistPage'
import TrunkShowsPage from '@/pages/TrunkShowsPage'
import BookAppointmentPage from '@/pages/BookAppointmentPage'
import JournalPage from '@/pages/JournalPage'
import SearchPage from '@/pages/SearchPage'
import CollectionPage from '@/pages/CollectionPage'
import ProductPage from '@/pages/ProductPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
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
      </main>
      <Footer />
    </BrowserRouter>
  )
}
