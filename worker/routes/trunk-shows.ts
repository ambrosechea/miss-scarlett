import type { Env } from '../types'
import { json } from '../index'

interface TrunkShowRow {
  id: number
  name: string
  subtitle: string | null
  country_filter: string
}

export async function handleTrunkShows(_request: Request, env: Env): Promise<Response> {
  const { results } = await env.DB.prepare(
    `SELECT id, name, subtitle, country_filter
       FROM trunk_shows
      WHERE active = 1
      ORDER BY name ASC`
  ).all<TrunkShowRow>()

  return json(results)
}
