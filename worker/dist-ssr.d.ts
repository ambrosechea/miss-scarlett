// `dist-ssr/entry-server.js` is a build artifact (produced by `vite build --ssr`)
// that may not exist yet when `tsc -b` runs, and ships no type declarations of
// its own — this ambient shim keeps worker/index.ts's import type-checked
// against the real signature in src/entry-server.tsx.
declare module '*/entry-server.js' {
  import type { PageDataPayload } from '../src/lib/pageData'
  export function render(url: string, initial: PageDataPayload | null): string
}
