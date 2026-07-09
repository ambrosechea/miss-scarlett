-- Add a URL-friendly slug to each stockist so individual pages can be
-- routed as /stockists/:slug (e.g. /stockists/amante-bridal).

ALTER TABLE stockists ADD COLUMN slug TEXT;

UPDATE stockists SET slug = 'forever-you-bridal'         WHERE name = 'FOREVER YOU BRIDAL';
UPDATE stockists SET slug = 'fifi-and-edga-bridal'       WHERE name = 'FIFI & EDGA BRIDAL';
UPDATE stockists SET slug = 'amante-bridal'               WHERE name = 'AMANTE BRIDAL';
UPDATE stockists SET slug = 'barossa-bridal'              WHERE name = 'BAROSSA BRIDAL';
UPDATE stockists SET slug = 'bride-and-winter'            WHERE name = 'BRIDE & WINTER';
UPDATE stockists SET slug = 'brides-of-merivale'          WHERE name = 'BRIDES OF MERIVALE';
UPDATE stockists SET slug = 'timeless-elegance-bridal'    WHERE name = 'TIMELESS ELEGANCE BRIDAL';
UPDATE stockists SET slug = 'white-atelier-bridal'        WHERE name = 'WHITE ATELIER BRIDAL';
UPDATE stockists SET slug = 'newcastle-bridal-house'      WHERE name = 'NEWCASTLE BRIDAL HOUSE';
UPDATE stockists SET slug = 'oxford-bridal'               WHERE name = 'OXFORD BRIDAL';
UPDATE stockists SET slug = 'dearly-beloved-bridal'       WHERE name = 'DEARLY BELOVED BRIDAL';
UPDATE stockists SET slug = 'all-about-the-gown'          WHERE name = 'ALL ABOUT THE GOWN';
UPDATE stockists SET slug = 'wanderlust-bridal-boutique'  WHERE name = 'WANDERLUST BRIDAL BOUTIQUE';
UPDATE stockists SET slug = 'brick-street-bridal'         WHERE name = 'BRICK STREET BRIDAL';
UPDATE stockists SET slug = 'jenna-eden-designs'          WHERE name = 'JENNA EDEN DESIGNS';
UPDATE stockists SET slug = 'forlove-bridal'              WHERE name = 'FORLOVE BRIDAL';
UPDATE stockists SET slug = 'aisle-studio'                WHERE name = 'AISLE STUDIO';
UPDATE stockists SET slug = 'daydream-bridal'             WHERE name = 'DAYDREAM BRIDAL';
UPDATE stockists SET slug = 'wattie-rd-bridal'            WHERE name = 'WATTIE RD BRIDAL';
UPDATE stockists SET slug = 'freedom-bridal'              WHERE name = 'FREEDOM BRIDAL';
UPDATE stockists SET slug = 'dressaville'                 WHERE name = 'DRESSAVILLE';
UPDATE stockists SET slug = 'what-alice-wore-bridal'      WHERE name = 'WHAT ALICE WORE BRIDAL';
UPDATE stockists SET slug = 'grace-atelier'               WHERE name = 'GRACE ATELIER';

-- Fallback for any future/unmapped rows: derive a best-effort slug from the name
-- so the column is never left NULL for active stockists.
UPDATE stockists
   SET slug = lower(trim(replace(replace(replace(name, '&', 'and'), '  ', ' '), ' ', '-')))
 WHERE slug IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_stockists_slug ON stockists (slug);
