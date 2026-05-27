import type { Env } from '../types'
import { json } from '../index'

export interface TrunkShow {
  id: number
  title: string
  boutique_name: string
  location: string
  start_date: string
  end_date: string
  description: string | null
}

export async function handleTrunkShows(_request: Request, env: Env): Promise<Response> {
  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

  const { results } = await env.DB.prepare(
    `SELECT id, title, boutique_name, location, start_date, end_date, description
       FROM trunk_shows
      WHERE active = 1
        AND end_date >= ?
      ORDER BY start_date ASC`
  )
    .bind(today)
    .all<TrunkShow>()

  return json(results)
}
