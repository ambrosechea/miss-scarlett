-- Miss Scarlett D1 schema
-- Run with: npm run db:migrate:remote   (production)
--           npm run db:migrate:local    (local wrangler dev)

-- ─── Inbound contact form ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id           INTEGER  PRIMARY KEY AUTOINCREMENT,
  first_name   TEXT     NOT NULL,
  last_name    TEXT,
  email        TEXT     NOT NULL,
  phone        TEXT,
  message      TEXT     NOT NULL,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─── Become-a-stockist applications ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stockist_applications (
  id               INTEGER  PRIMARY KEY AUTOINCREMENT,
  first_name       TEXT     NOT NULL,
  last_name        TEXT,
  email            TEXT     NOT NULL,
  phone            TEXT,
  boutique_name    TEXT     NOT NULL,
  boutique_address TEXT     NOT NULL,
  country          TEXT     NOT NULL,
  website          TEXT,
  message          TEXT,
  created_at       DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─── Book-appointment requests ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS appointment_requests (
  id           INTEGER  PRIMARY KEY AUTOINCREMENT,
  first_name   TEXT     NOT NULL,
  last_name    TEXT,
  email        TEXT     NOT NULL,
  phone        TEXT,
  city         TEXT,
  state        TEXT,
  country      TEXT,
  wedding_date TEXT,
  message      TEXT,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─── Stockist directory (displayed on Find a Stockist page) ──────────────────
CREATE TABLE IF NOT EXISTS stockists (
  id         INTEGER  PRIMARY KEY AUTOINCREMENT,
  name       TEXT     NOT NULL,
  address    TEXT,
  city       TEXT     NOT NULL,
  country    TEXT     NOT NULL,
  -- One of: 'AUSTRALIA & NEW ZEALAND' | 'AMERICAS' | 'REST OF THE WORLD'
  region     TEXT     NOT NULL,
  phone      TEXT,
  email      TEXT,
  website    TEXT,
  active     INTEGER  NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_stockists_region ON stockists (region, country, name);

-- ─── Journal / blog posts ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS journal_posts (
  id           INTEGER  PRIMARY KEY AUTOINCREMENT,
  title        TEXT     NOT NULL,
  slug         TEXT     NOT NULL UNIQUE,
  excerpt      TEXT,
  content      TEXT,
  image_url    TEXT,
  category     TEXT,
  published    INTEGER  NOT NULL DEFAULT 0,
  published_at DATETIME,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_journal_published ON journal_posts (published, published_at DESC);

-- ─── Trunk shows ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trunk_shows (
  id           INTEGER  PRIMARY KEY AUTOINCREMENT,
  title        TEXT     NOT NULL,
  boutique_name TEXT    NOT NULL,
  location     TEXT     NOT NULL,
  start_date   DATE     NOT NULL,
  end_date     DATE     NOT NULL,
  description  TEXT,
  active       INTEGER  NOT NULL DEFAULT 1,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_trunk_shows_dates ON trunk_shows (active, end_date, start_date);
