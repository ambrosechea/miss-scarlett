import { Suspense, useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '@/lib/analytics'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function RouteTracker() {
  const location = useLocation()
  useEffect(() => {
    const t = setTimeout(() => trackPageView(location.pathname, document.title), 0)
    return () => clearTimeout(t)
  }, [location.pathname])
  return null
}

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <RouteTracker />
      <Navbar />
      <main>
        <Suspense fallback={null}>{children}</Suspense>
      </main>
      <Footer />
    </>
  )
}
