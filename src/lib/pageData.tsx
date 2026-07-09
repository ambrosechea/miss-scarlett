import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

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
