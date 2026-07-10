import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Routes, Route } from 'react-router-dom'
import AppShell from './AppShell'
import { PageDataProvider, type PageDataPayload } from '@/lib/pageData'

import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import FindStockistPage from '@/pages/FindStockistPage'
import StockistDetailPage from '@/pages/StockistDetailPage'
import BecomeStockistPage from '@/pages/BecomeStockistPage'
import TrunkShowsPage from '@/pages/TrunkShowsPage'
import BookAppointmentPage from '@/pages/BookAppointmentPage'
import JournalPage from '@/pages/JournalPage'
import SearchPage from '@/pages/SearchPage'
import CollectionPage from '@/pages/CollectionPage'
import ProductPage from '@/pages/ProductPage'
import PrivacyPage from '@/pages/PrivacyPage'
import TermsPage from '@/pages/TermsPage'
import NotFoundPage from '@/pages/NotFoundPage'

export function render(url: string, initial: PageDataPayload | null): string {
  return renderToString(
    <StaticRouter location={url}>
      <PageDataProvider initial={initial}>
        <AppShell>
          {/* KEEP IN SYNC with src/App.tsx's <Route> list */}
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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppShell>
      </PageDataProvider>
    </StaticRouter>,
  )
}
