import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { apiGet } from '@/lib/api'

export interface PageDataPayload<T = unknown> {
  path: string
  data: T
}

const PageDataContext = createContext<PageDataPayload | null>(null)

export function PageDataProvider({
  initial,
  children,
}: {
  initial: PageDataPayload | null
  children: ReactNode
}) {
  const [value, setValue] = useState(initial)

  // One-shot: this seed is only valid for the very first client commit
  // (matching what the server rendered). Clear it right after so any later
  // mount of the same path — including a client-side revisit — always goes
  // through the normal fetch path instead of reusing stale data. No-op
  // during SSR since effects never run there.
  useEffect(() => {
    if (value) setValue(null)
  }, [value])

  return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

/** Only safe to call inside a `useState(() => ...)` lazy initializer —
 *  never as a reactive read — since the context is cleared post-mount. */
export function usePageDataSeed<T>(pathname: string): T | undefined {
  const payload = useContext(PageDataContext)
  return payload && payload.path === pathname ? (payload.data as T) : undefined
}

/** Shared shape for a page that lists one array of items, seeded from SSR
 *  under `seedKey` and otherwise fetched once from `apiPath`. Covers pages
 *  with no further per-item route param (see usePageDataSeed's own caveat
 *  about lazy-initializer-only use, which this hook preserves internally). */
export function useSeededFetch<T>(
  pathname: string,
  apiPath: string,
  seedKey: string,
): { items: T[]; loading: boolean; error: string | null } {
  const [items, setItems] = useState<T[]>(
    () => usePageDataSeed<Record<string, T[]>>(pathname)?.[seedKey] ?? [],
  )
  const [loading, setLoading] = useState(() => items.length === 0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (items.length > 0) return // already server-rendered
    apiGet<T[]>(apiPath).then(({ data, error }) => {
      if (error) setError(error)
      else setItems(data ?? [])
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { items, loading, error }
}
