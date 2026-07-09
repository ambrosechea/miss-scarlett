import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App'
import { PageDataProvider, type PageDataPayload } from '@/lib/pageData'

declare global {
  interface Window {
    __INITIAL_DATA__?: PageDataPayload | null
  }
}

const initial = window.__INITIAL_DATA__ ?? null

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <PageDataProvider initial={initial}>
      <App />
    </PageDataProvider>
  </StrictMode>,
)
