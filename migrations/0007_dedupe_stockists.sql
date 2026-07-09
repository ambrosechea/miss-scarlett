-- Remove duplicate stockists left over from the 0002 seed (superseded by 0003's
-- cleaner reseed, which never deleted the originals). Old rows have city/state
-- baked into a single "City, ST" string; keep the 0003 rows with state split out.
DELETE FROM stockists WHERE id BETWEEN 1 AND 23;
