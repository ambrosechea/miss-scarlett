-- Add state/province column to stockists
-- (needed for display format: "City, STATE, Country")
ALTER TABLE stockists ADD COLUMN state TEXT;
