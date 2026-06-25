export interface Env {
  /** Bound to the Vite-built SPA in dist/ */
  ASSETS: Fetcher

  /** D1 database binding */
  DB: D1Database

  /** Cloudflare Email Sending binding */
  EMAIL: SendEmail

  /** Cloudflare Turnstile secret key (Worker secret) */
  TURNSTILE_SECRET_KEY: string
}
