# Deploying Miss Scarlett to Cloudflare Workers

## Stack

| Layer    | Service                    |
| -------- | -------------------------- |
| Frontend | Vite + React SPA (bundled into `dist/`) served via Workers Assets |
| API      | Cloudflare Worker (`worker/index.ts`) |
| Database | Cloudflare D1 (SQLite)     |
| Fonts    | `@fontsource` packages (bundled, no CDN) |

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

```bash
# Local dev
npm run db:migrate:local

# Production
npm run db:migrate:remote
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

This runs `npm run build` (Vite) then `wrangler deploy`.

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
