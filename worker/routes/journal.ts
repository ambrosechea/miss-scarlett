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

export interface JournalPostDetail extends JournalPost {
  content: string | null
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

export async function getJournalPostBySlug(slug: string, env: Env): Promise<JournalPostDetail | null> {
  return env.DB.prepare(
    `SELECT id, title, slug, excerpt, content, image_url, category, published_at
       FROM journal_posts
      WHERE slug = ? AND published = 1`
  ).bind(slug).first<JournalPostDetail>()
}

export async function getRelatedJournalPosts(excludeSlug: string, env: Env, limit = 3): Promise<JournalPost[]> {
  const { results } = await env.DB.prepare(
    `SELECT id, title, slug, excerpt, image_url, category, published_at
       FROM journal_posts
      WHERE published = 1 AND slug != ?
      ORDER BY published_at DESC
      LIMIT ?`
  ).bind(excludeSlug, limit).all<JournalPost>()
  return results
}

export async function handleJournalPost(slug: string, env: Env): Promise<Response> {
  const post = await getJournalPostBySlug(slug, env)
  if (!post) return json({ error: 'Journal post not found' }, 404)
  return json(post)
}
