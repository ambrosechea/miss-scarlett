import type { Env } from '../types'
import { json } from '../index'
import { verifyTurnstile } from './turnstile'

/** Parses the JSON body and runs the Turnstile spam check shared by every
 *  form-submission route. Returns the typed body on success, or a Response
 *  the caller should return as-is on failure. */
export async function parseAndVerifyTurnstile<T extends { 'cf-turnstile-response'?: string }>(
  request: Request,
  env: Env,
): Promise<{ body: T } | { error: Response }> {
  let body: T
  try {
    body = await request.json<T>()
  } catch {
    return { error: json({ error: 'Invalid JSON' }, 400) }
  }

  const ok = await verifyTurnstile(
    body['cf-turnstile-response'],
    env.TURNSTILE_SECRET_KEY,
    request.headers.get('CF-Connecting-IP'),
  )
  if (!ok) return { error: json({ error: 'Spam check failed — please try again' }, 400) }

  return { body }
}
