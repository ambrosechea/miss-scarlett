import type { Env } from '../types'
import { json } from '../index'

export interface JournalPost {
  id: number
  title: string
  slug: string
  excerpt: string | null
  image_url: string | null
  category: string | null
  published_at: string | null
}

export async function handleJournal(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const limit = Math.min(Number(url.searchParams.get('limit') ?? '20'), 50)
  const offset = Number(url.searchParams.get('offset') ?? '0')

  const { results } = await env.DB.prepare(
    `SELECT id, title, slug, excerpt, image_url, category, published_at
       FROM journal_posts
      WHERE published = 1
      ORDER BY published_at DESC
      LIMIT ? OFFSET ?`
  )
    .bind(limit, offset)
    .all<JournalPost>()

  return json(results)
}
