/**
 * Lightweight fetch helpers that talk to the Worker API routes.
 * All requests go to the same origin so no base URL is needed.
 */

export async function apiPost<TBody>(
  path: string,
  body: TBody
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({})) as { error?: string }
      return { ok: false, error: data.error ?? 'Something went wrong' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Network error — please try again' }
  }
}

export async function apiGet<T>(path: string): Promise<{ data: T; error: null } | { data: null; error: string }> {
  try {
    const res = await fetch(path)
    if (!res.ok) {
      return { data: null, error: 'Failed to load data' }
    }
    const data = await res.json() as T
    return { data, error: null }
  } catch {
    return { data: null, error: 'Network error — please try again' }
  }
}
