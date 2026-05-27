export interface Env {
  /** Bound to the Vite-built SPA in dist/ */
  ASSETS: Fetcher

  /** D1 database binding */
  DB: D1Database
}
