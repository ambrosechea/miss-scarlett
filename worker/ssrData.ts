import type { Env } from './types'
import { handleStockists, handleStockistDetail } from './routes/stockists'
import { handleJournal } from './routes/journal'
import { handleTrunkShows } from './routes/trunk-shows'
import { handleProductsList, handleProductDetail } from './routes/products'
import { COLLECTIONS } from '../src/lib/collections'
import type { Stockist, Product, ProductDetail } from '../src/lib/types'

function internalRequest(path: string): Request {
  return new Request(`https://internal${path}`)
}

async function bodyOf<T>(res: Response): Promise<T | null> {
  if (!res.ok) return null
  return res.json() as Promise<T>
}

function categoryToSlug(category: string): string {
  return COLLECTIONS.find(c => c.category === category)?.slug ?? category.toLowerCase().replace(/\s+/g, '-')
}

/** Server-side data for the route the client would otherwise fetch via useEffect,
 *  so entry-server.tsx can render real content instead of an empty shell. */
export async function loadPageData(pathname: string, env: Env): Promise<unknown | null> {
  if (pathname === '/') {
    const latestPosts = await bodyOf(await handleJournal(internalRequest('/api/journal?limit=3'), env)) ?? []
    return { latestPosts }
  }

  if (pathname === '/find-a-stockist') {
    const stockists = await bodyOf(await handleStockists(internalRequest('/api/stockists'), env)) ?? []
    return { stockists }
  }

  if (pathname === '/journal') {
    const posts = await bodyOf(await handleJournal(internalRequest('/api/journal'), env)) ?? []
    return { posts }
  }

  if (pathname === '/trunk-shows') {
    const shows = await bodyOf(await handleTrunkShows(internalRequest('/api/trunk-shows'), env)) ?? []
    return { shows }
  }

  const stockistMatch = pathname.match(/^\/stockists\/([^/]+)$/)
  if (stockistMatch) {
    const stockist = await bodyOf<Stockist>(await handleStockistDetail(stockistMatch[1], env))
    if (!stockist) return null
    const allProducts = await bodyOf<Product[]>(await handleProductsList(internalRequest('/api/products'), env)) ?? []
    const dresses = [...allProducts].sort(() => Math.random() - 0.5).slice(0, 8)
    return { stockist, dresses }
  }

  const categoryMatch = pathname.match(/^\/category\/([^/]+)$/)
  if (categoryMatch) {
    const slug = categoryMatch[1]
    const qs = slug === 'all-collections' ? '' : `?collection=${slug}`
    const products = await bodyOf<Product[]>(await handleProductsList(internalRequest(`/api/products${qs}`), env)) ?? []
    return { products }
  }

  const productMatch = pathname.match(/^\/product\/([^/]+)$/)
  if (productMatch) {
    const handle = productMatch[1]
    const product = await bodyOf<ProductDetail>(await handleProductDetail(handle, env))
    if (!product) return null

    let similarProducts: Product[] = []
    const primary = product.categories.find(c => c !== 'ALL COLLECTIONS')
    if (primary) {
      const slug = categoryToSlug(primary)
      const collectionProducts = await bodyOf<Product[]>(await handleProductsList(internalRequest(`/api/products?collection=${slug}`), env)) ?? []
      similarProducts = collectionProducts.filter(p => p.handle !== handle).sort(() => Math.random() - 0.5).slice(0, 4)
    }
    return { product, similarProducts }
  }

  return null
}
