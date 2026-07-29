import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SWOT_REGISTRY } from '../src/data/swotRegistry.js';
import { OPPORTUNITIES_REGISTRY } from '../src/data/opportunitiesRegistry.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DATA_DIR = path.resolve(__dirname, '../public/data');
const SWOT_DIR = path.join(PUBLIC_DATA_DIR, 'swot');
const OPP_DIR = path.join(PUBLIC_DATA_DIR, 'opportunities');

// Create directories
[PUBLIC_DATA_DIR, SWOT_DIR, OPP_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Generate SWOT JSON files
Object.entries(SWOT_REGISTRY).forEach(([sectorId, data]) => {
  fs.writeFileSync(
    path.join(SWOT_DIR, `${sectorId}.json`),
    JSON.stringify(data, null, 2)
  );
});
console.log(`Generated ${Object.keys(SWOT_REGISTRY).length} SWOT JSON files.`);

// Generate Opportunities JSON files
Object.entries(OPPORTUNITIES_REGISTRY).forEach(([sectorId, data]) => {
  fs.writeFileSync(
    path.join(OPP_DIR, `${sectorId}.json`),
    JSON.stringify(data, null, 2)
  );
});
console.log(`Generated ${Object.keys(OPPORTUNITIES_REGISTRY).length} Opportunities JSON files.`);
