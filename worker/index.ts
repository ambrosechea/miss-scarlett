import type { Env } from './types'
import { handleContact } from './routes/contact'
import { handleBecomeStockist } from './routes/become-stockist'
import { handleBookAppointment } from './routes/book-appointment'
import { handleStockists, handleStockistDetail } from './routes/stockists'
import { handleJournal, handleJournalPost } from './routes/journal'
import { handleTrunkShows } from './routes/trunk-shows'
import { handleProductsList, handleProductDetail } from './routes/products'
import { handleSitemap } from './routes/sitemap'
import { handleMerchantFeed } from './routes/merchant-feed'
import { handleMetaFeed } from './routes/meta-feed'
import { getMetaForPath, injectPageMeta, isKnownRoute, NOT_FOUND_META } from './seo'
import { loadPageData } from './ssrData'
import { render } from '../dist-ssr/entry-server.js'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000',
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS pre-flight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS })
    }

    const url = new URL(request.url)

    // Redirect apex to www
    if (url.hostname === 'missscarlett.com.au') {
      url.hostname = 'www.missscarlett.com.au'
      return Response.redirect(url.toString(), 301)
    }

    // Collapse trailing-slash duplicates (e.g. /about/ -> /about) so they don't
    // exist as separate crawlable/indexable URLs alongside the canonical form.
    if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
      url.pathname = url.pathname.replace(/\/+$/, '')
      return Response.redirect(url.toString(), 301)
    }

    // Legacy Webflow-era URLs Google still has indexed/discovered from before the
    // React migration — 301 them to today's equivalent instead of 404ing, so the
    // existing backlink/index equity carries over rather than being dropped.
    // (Search Console flagged these as "Duplicate, Google chose different canonical
    // than user" and growing — Google is already trying to fold them into the new
    // URLs; this makes that explicit instead of leaving it to guesswork.)
    const legacyStockistMatch = url.pathname.match(/^\/stockist\/([^/]+)$/)
    if (legacyStockistMatch) {
      url.pathname = `/stockists/${legacyStockistMatch[1]}`
      return Response.redirect(url.toString(), 301)
    }
    if (url.pathname.startsWith('/tag/')) {
      url.pathname = '/journal'
      return Response.redirect(url.toString(), 301)
    }

    // robots.txt
    if (url.pathname === '/robots.txt') {
      return new Response(
        'User-agent: *\nAllow: /\n\nSitemap: https://www.missscarlett.com.au/sitemap.xml\n',
        { headers: { 'Content-Type': 'text/plain' } },
      )
    }

    // sitemap.xml
    if (url.pathname === '/sitemap.xml') {
      return handleSitemap(env)
    }

    // Google Merchant product feed
    if (url.pathname === '/feed/google-merchant.xml') {
      return handleMerchantFeed(env)
    }

    // Meta product catalog feed
    if (url.pathname === '/feed/meta-catalog.xml') {
      return handleMetaFeed(env)
    }

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

    // Everything else → serve the Vite SPA with security headers
    const assetResponse = await env.ASSETS.fetch(request)
    let response = new Response(assetResponse.body, assetResponse)
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      response.headers.set(key, value)
    }

    // Server-render <title>/meta/OG/canonical/JSON-LD per route so crawlers that
    // don't execute JS (most AI bots) still see real content, not an empty shell.
    // NB: only text/html responses reach here — real static assets (JS/CSS/fonts/
    // images) keep whatever status env.ASSETS.fetch gave them, untouched below.
    if ((response.headers.get('content-type') ?? '').includes('text/html')) {
      const knownRoute = isKnownRoute(url.pathname)
      if (!knownRoute) {
        // Path doesn't match any route the app actually renders (typo, dead
        // backlink, old Webflow URL) — don't serve the homepage as a 200.
        response = new Response(response.body, { status: 404, headers: response.headers })
      }
      const meta = knownRoute ? await getMetaForPath(url.pathname, env) : NOT_FOUND_META
      if (meta) {
        response = injectPageMeta(response, meta, `https://www.missscarlett.com.au${url.pathname}`)
      }

      // Full React SSR: render real body markup into #root and seed the same
      // data into window.__INITIAL_DATA__ so client hydration doesn't refetch.
      const pageData = await loadPageData(url.pathname, env)
      const payload = pageData ? { path: url.pathname, data: pageData } : null
      const bodyHtml = render(url.pathname, payload)
      const dataScript = `<script>window.__INITIAL_DATA__=${JSON.stringify(payload).replace(/</g, '\\u003c')}</script>`

      response = new HTMLRewriter()
        .on('#root', {
          element(el) {
            el.setInnerContent(bodyHtml, { html: true })
          },
        })
        .on('script[type="module"]', {
          element(el) {
            el.before(dataScript, { html: true })
          },
        })
        .transform(response)
    }

    return response
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
  // /api/stockists/:slug
  const stockistMatch = pathname.match(/^\/api\/stockists\/([^/]+)$/)
  if (stockistMatch && method === 'GET') {
    return handleStockistDetail(stockistMatch[1], env)
  }
  if (pathname === '/api/journal' && method === 'GET') {
    return handleJournal(request, env)
  }
  // /api/journal/:slug
  const journalMatch = pathname.match(/^\/api\/journal\/([^/]+)$/)
  if (journalMatch && method === 'GET') {
    return handleJournalPost(journalMatch[1], env)
  }
  if (pathname === '/api/trunk-shows' && method === 'GET') {
    return handleTrunkShows(request, env)
  }
  if (pathname === '/api/products' && method === 'GET') {
    return handleProductsList(request, env)
  }
  // /api/products/:handle
  const productMatch = pathname.match(/^\/api\/products\/([^/]+)$/)
  if (productMatch && method === 'GET') {
    return handleProductDetail(productMatch[1], env)
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
