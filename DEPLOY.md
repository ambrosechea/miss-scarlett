# Deploying Miss Scarlett to Cloudflare Workers

## Stack

| Layer    | Service                    |
| -------- | -------------------------- |
| Frontend | Vite + React (client bundle in `dist/`, SSR bundle in `dist-ssr/`) |
| SSR      | `src/entry-server.tsx` renders real body markup per route server-side, hydrated client-side by `src/entry-client.tsx` |
| API      | Cloudflare Worker (`worker/index.ts`), which also composes the SSR HTML per request |
| Database | Cloudflare D1 (SQLite), migrations tracked in `migrations/` |
| Fonts    | `@fontsource` packages (bundled, no CDN) |

`npm run build` runs `tsc -b` (typechecks `src/`, the Vite/Node config, **and** `worker/`), then both Vite builds (`build:client` → `dist/`, `build:server` → `dist-ssr/entry-server.js`). The Worker imports `dist-ssr/entry-server.js` directly, so both builds must exist before `wrangler deploy`/`worker:dev` — `npm run worker:deploy` and the `[build]` command in `wrangler.toml` both run the full `npm run build` first.

---

## First-time setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create the D1 database

```bash
npm run db:create
```

Copy the `database_id` printed by that command and paste it into `wrangler.toml`:

```toml
[[d1_databases]]
binding      = "DB"
database_name = "miss-scarlett"
database_id  = "PASTE-YOUR-ID-HERE"   # ← replace this
```

### 3. Apply the schema

`migrations/` contains every schema/data migration in order. Wrangler tracks which
have been applied (in a `d1_migrations` table on the database itself) and only
runs the pending ones:

```bash
# Local dev — applies every migration not yet in the local D1 simulation
npm run db:migrate:local

# Production — applies every migration not yet applied to the live database
npm run db:migrate:remote
```

Check what's pending before running against production:

```bash
wrangler d1 migrations list miss-scarlett --remote
```

---

## Local development

```bash
# Run the Vite dev server (frontend only, no Worker)
npm run dev

# Run the full Worker + SPA locally (recommended for testing API routes)
npm run build
npm run worker:dev
```

`worker:dev` runs on http://localhost:8787 with a local D1 instance.

---

## Deploy to production

```bash
npm run worker:deploy
```

This runs `npm run build` (typecheck + client build + SSR build) then `wrangler deploy`.

---

## API routes

| Method | Path                    | Description                       |
| ------ | ----------------------- | --------------------------------- |
| POST   | `/api/contact`          | General enquiry form              |
| POST   | `/api/become-stockist`  | Stockist application form         |
| POST   | `/api/book-appointment` | Appointment request form          |
| GET    | `/api/stockists`        | List active stockists (by region) |
| GET    | `/api/journal`          | List published journal posts      |
| GET    | `/api/trunk-shows`      | List upcoming trunk shows         |

---

## Adding data

Use the Cloudflare dashboard → **D1** → `miss-scarlett` → **Query** tab,
or run SQL directly:

```bash
wrangler d1 execute miss-scarlett --command "
  INSERT INTO stockists (name, city, country, region)
  VALUES ('Sample Boutique', 'Sydney', 'Australia', 'AUSTRALIA & NEW ZEALAND')
"
```
