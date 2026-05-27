-- Seed stockist data from live site (missscarlett.com.au/find-a-stockist)
-- Scraped 2026-05-27

INSERT INTO stockists (name, city, state, country, region, website, active) VALUES

-- ── AUSTRALIA & NEW ZEALAND ──────────────────────────────────────────────────
('FOREVER YOU BRIDAL',       'Adelaide',    'SA',  'Australia',   'AUSTRALIA & NEW ZEALAND', 'https://foreveryoubridal.com/',                 1),
('FIFI & EDGA BRIDAL',       'Bendigo',     'VIC', 'Australia',   'AUSTRALIA & NEW ZEALAND', 'https://www.instagram.com/fifiandedga/',        1),
('AMANTE BRIDAL',            'Warragul',    'VIC', 'Australia',   'AUSTRALIA & NEW ZEALAND', 'https://amantebridal.com.au/',                  1),
('BAROSSA BRIDAL',           'Nuriootpa',   'SA',  'Australia',   'AUSTRALIA & NEW ZEALAND', 'https://www.barossabridal.com.au/',             1),
('BRIDE & WINTER',           'Dunedin',     NULL,  'New Zealand', 'AUSTRALIA & NEW ZEALAND', 'http://brideandwinter.co.nz',                  1),
('BRIDES OF MERIVALE',       'Christchurch',NULL,  'New Zealand', 'AUSTRALIA & NEW ZEALAND', 'http://bridesofmerivale.co.nz',                1),
('TIMELESS ELEGANCE BRIDAL', 'Launceston',  'TAS', 'Australia',   'AUSTRALIA & NEW ZEALAND', 'http://timelesselegance.com.au',               1),
('WHITE ATELIER BRIDAL',     'Brisbane',    'QLD', 'Australia',   'AUSTRALIA & NEW ZEALAND', 'http://whiteatelierbridal.com',                1),
('NEWCASTLE BRIDAL HOUSE',   'Newcastle',   'NSW', 'Australia',   'AUSTRALIA & NEW ZEALAND', 'http://newcastlebridalhouse.com',              1),
('OXFORD BRIDAL',            'Leederville', 'WA',  'Australia',   'AUSTRALIA & NEW ZEALAND', 'http://oxfordbridal.com.au',                   1),

-- ── AMERICAS ────────────────────────────────────────────────────────────────
('DEARLY BELOVED BRIDAL',     'Flower Mound', 'TX', 'United States', 'AMERICAS', 'https://dearlybelovedbridalboutique.com/', 1),
('ALL ABOUT THE GOWN',        'Lake Geneva',  'WI', 'United States', 'AMERICAS', 'http://allaboutthegown.com',               1),
('WANDERLUST BRIDAL BOUTIQUE','Baytown',      'TX', 'United States', 'AMERICAS', 'http://wanderlustbridalboutique.com',      1),
('BRICK STREET BRIDAL',       'Zionsville',   'IN', 'United States', 'AMERICAS', 'https://www.brickstreetbridal.com/',       1),
('JENNA EDEN DESIGNS',        'Geneseo',      'IL', 'United States', 'AMERICAS', 'http://jennaedendesigns.com',              1),
('FORLOVE BRIDAL',            'Los Angeles',  'CA', 'United States', 'AMERICAS', 'http://forlovebride.com',                  1),
('AISLE STUDIO',              'Kansas City',  'MO', 'United States', 'AMERICAS', 'https://www.aislestudio.com/',             1),
('DAYDREAM BRIDAL',           'Ardmore',      'PA', 'United States', 'AMERICAS', 'http://daydreambridalshop.com',            1),
('WATTIE RD BRIDAL',          'Kamloops',     'BC', 'Canada',        'AMERICAS', 'http://wattierdbridal.com',                1),
('FREEDOM BRIDAL',            'Quispamsis',   'NB', 'Canada',        'AMERICAS', 'http://freedombridal.com',                 1),

-- ── REST OF THE WORLD ────────────────────────────────────────────────────────
('DRESSAVILLE',               'Kuala Lumpur', NULL, 'Malaysia',       'REST OF THE WORLD', 'https://www.dressaville.com/',          1),
('WHAT ALICE WORE BRIDAL',    'St Albans',    NULL, 'United Kingdom', 'REST OF THE WORLD', 'http://whataliceworebridal.com',        1),
('GRACE ATELIER',             'Singapore',    NULL, 'Singapore',      'REST OF THE WORLD', 'https://www.graceatelier.sg/',          1);
