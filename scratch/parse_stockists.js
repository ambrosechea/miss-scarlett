import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = 'C:\\Users\\tekni\\Downloads\\Miss Scarlett - Stockists - 67a2eb848349d6a9d16089db.csv';
const outputPath = path.join(__dirname, '..', 'migrations', '0002_seed_stockists.sql');

const countryNames = {
  'usa': 'USA',
  'australia': 'Australia',
  'new-zealand': 'New Zealand',
  'canada': 'Canada',
  'singapore': 'Singapore',
  'uk': 'United Kingdom',
  'malaysia': 'Malaysia'
};

function getRegion(countrySlug) {
  if (countrySlug === 'australia' || countrySlug === 'new-zealand') {
    return 'AUSTRALIA & NEW ZEALAND';
  }
  if (countrySlug === 'usa' || countrySlug === 'canada') {
    return 'AMERICAS';
  }
  return 'REST OF THE WORLD';
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function run() {
  const content = fs.readFileSync(csvPath, 'utf8');
  const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
  
  // Parse header to get column mapping
  const headers = parseCSVLine(lines[0]);
  const nameIdx = headers.indexOf('Name');
  const locationIdx = headers.indexOf('Location');
  const websiteIdx = headers.indexOf('Website Link');
  const countrySlugIdx = headers.indexOf('Country');
  const archivedIdx = headers.indexOf('Archived');
  const draftIdx = headers.indexOf('Draft');
  
  const sqlStatements = [
    '-- Seed stockists data parsed from CSV export',
    '-- Run with: npm run db:migrate:local or npm run db:migrate:remote',
    'DELETE FROM stockists;' // Clear existing to prevent duplicate seeding
  ];
  
  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i]);
    if (fields.length <= 1) continue;
    
    const name = fields[nameIdx];
    const location = fields[locationIdx];
    const website = fields[websiteIdx];
    const countrySlug = fields[countrySlugIdx]?.toLowerCase();
    const archived = fields[archivedIdx] === 'true';
    const draft = fields[draftIdx] === 'true';
    
    // Skip archived/draft stockists
    if (archived || draft) continue;
    
    // Parse City and Country from Location
    // Location format e.g. "Kansas City, MO, United States" or "Dunedin, New Zealand"
    const locationParts = location.replace(/^"|"$/g, '').split(',').map(s => s.trim());
    let city = '';
    let country = countryNames[countrySlug] || 'Other';
    
    if (locationParts.length === 1) {
      city = locationParts[0];
    } else if (locationParts.length === 2) {
      city = locationParts[0];
    } else if (locationParts.length >= 3) {
      // e.g. "Kansas City, MO, United States" -> city is "Kansas City, MO"
      city = locationParts.slice(0, -1).join(', ');
    }
    
    const region = getRegion(countrySlug);
    
    // Escaping quotes for SQLite
    const safeName = name.replace(/'/g, "''");
    const safeCity = city.replace(/'/g, "''");
    const safeCountry = country.replace(/'/g, "''");
    const safeWebsite = (website && website !== 'VISIT WEBSITE') ? website.replace(/'/g, "''") : null;
    
    const websiteVal = safeWebsite ? `'${safeWebsite}'` : 'NULL';
    
    sqlStatements.push(
      `INSERT INTO stockists (name, city, country, region, website, active) ` +
      `VALUES ('${safeName}', '${safeCity}', '${safeCountry}', '${region}', ${websiteVal}, 1);`
    );
  }
  
  fs.writeFileSync(outputPath, sqlStatements.join('\n') + '\n', 'utf8');
  console.log(`Successfully generated SQL seed with ${sqlStatements.length - 3} stockists at ${outputPath}`);
}

run();
