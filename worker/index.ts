import type { Env } from './types'
import { handleContact } from './routes/contact'
import { handleBecomeStockist } from './routes/become-stockist'
import { handleBookAppointment } from './routes/book-appointment'
import { handleStockists } from './routes/stockists'
import { handleJournal } from './routes/journal'
import { handleTrunkShows } from './routes/trunk-shows'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS pre-flight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS })
    }

    const url = new URL(request.url)

    // Route all /api/* requests through the Worker
    if (url.pathname.startsWith('/api/')) {
      const response = await routeApi(request, url, env)
      // Attach CORS headers to every API response
      const newHeaders = new Headers(response.headers)
      for (const [key, value] of Object.entries(CORS_HEADERS)) {
        newHeaders.set(key, value)
      }
      return new Response(response.body, {
        status: response.status,
        headers: newHeaders,
      })
    }

    // Everything else → serve the Vite SPA (React Router handles deep links
    // via `not_found_handling = "single-page-application"` in wrangler.toml)
    return env.ASSETS.fetch(request)
  },
}

async function routeApi(request: Request, url: URL, env: Env): Promise<Response> {
  const { pathname } = url
  const method = request.method

  if (pathname === '/api/contact' && method === 'POST') {
    return handleContact(request, env)
  }
  if (pathname === '/api/become-stockist' && method === 'POST') {
    return handleBecomeStockist(request, env)
  }
  if (pathname === '/api/book-appointment' && method === 'POST') {
    return handleBookAppointment(request, env)
  }
  if (pathname === '/api/stockists' && method === 'GET') {
    return handleStockists(request, env)
  }
  if (pathname === '/api/journal' && method === 'GET') {
    return handleJournal(request, env)
  }
  if (pathname === '/api/trunk-shows' && method === 'GET') {
    return handleTrunkShows(request, env)
  }

  return json({ error: 'Not found' }, 404)
}

/** Helper used by route handlers */
export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
