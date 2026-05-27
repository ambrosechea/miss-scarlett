-- Rebuild trunk_shows with nullable dates + subtitle + country_filter
-- (Original schema had NOT NULL dates, but live site events have no dates)

DROP INDEX IF EXISTS idx_trunk_shows_dates;
DROP TABLE IF EXISTS trunk_shows;

CREATE TABLE trunk_shows (
  id             INTEGER  PRIMARY KEY AUTOINCREMENT,
  name           TEXT     NOT NULL,            -- boutique name shown as heading
  subtitle       TEXT,                         -- e.g. "PALAIS & MODERN MUSE | Australia"
  country_filter TEXT     NOT NULL DEFAULT '',  -- e.g. "AUSTRALIA", "UK", "USA", "SINGAPORE"
  start_date     DATE,                         -- NULL = ongoing / no specific date
  end_date       DATE,                         -- NULL = ongoing
  active         INTEGER  NOT NULL DEFAULT 1,
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_trunk_shows_active ON trunk_shows (active, name);

-- Seed from CSV export (missscarlett.com.au/trunk-shows, 2026-05-27)
INSERT INTO trunk_shows (name, subtitle, country_filter, active) VALUES
  ('BRIDES OF MERIVALE', 'New Zealand',                         'NZ',        1),
  ('GRACE ATELIER',      'MODERN MUSE | Singapore',             'SINGAPORE', 1),
  ('BAROSSA BRIDAL',     'PALAIS & MODERN MUSE | Australia',    'AUSTRALIA', 1),
  ('AISLE STUDIO',       'PALAIS (coming soon) & MODERN MUSE | US', 'USA',   1),
  ('WHAT ALICE WORE',    'PALAIS (coming soon) & MODERN MUSE | UK', 'UK',    1),
  ('OXFORD BRIDAL',      'ICONIC | Australia',                  'AUSTRALIA', 1);
