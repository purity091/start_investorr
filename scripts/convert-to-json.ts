import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROVEN_PROJECTS } from '../src/data/provenProjects/index.js';
import { FAILED_PROJECTS } from '../src/data/failedProjects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DATA_DIR = path.resolve(__dirname, '../public/data');
const PROVEN_DIR = path.join(PUBLIC_DATA_DIR, 'proven-projects');
const FAILED_DIR = path.join(PUBLIC_DATA_DIR, 'failed-projects');

// Create directories
[PUBLIC_DATA_DIR, PROVEN_DIR, FAILED_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function generateIndex(projects, outputPath) {
  const indexData = projects.map(p => ({
    id: p.id || p.slug,
    slug: p.slug,
    name: p.name,
    headline: p.headline,
    category: p.category,
    company: {
      location: p.company?.location || '',
      business_model: p.company?.business_model || ''
    },
    directory_snapshot: {
      monthly_revenue: p.directory_snapshot?.monthly_revenue || '',
      monthly_traffic: p.directory_snapshot?.monthly_traffic || ''
    }
  }));

  fs.writeFileSync(outputPath, JSON.stringify(indexData, null, 2));
}

function generateDetails(projects, outputDir) {
  projects.forEach(p => {
    const filePath = path.join(outputDir, `${p.slug || p.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(p, null, 2));
  });
}

// Generate Proven Projects
generateIndex(PROVEN_PROJECTS, path.join(PROVEN_DIR, 'index.json'));
generateDetails(PROVEN_PROJECTS, PROVEN_DIR);
console.log(`Generated ${PROVEN_PROJECTS.length} proven projects JSON files.`);

// Generate Failed Projects
generateIndex(FAILED_PROJECTS, path.join(FAILED_DIR, 'index.json'));
generateDetails(FAILED_PROJECTS, FAILED_DIR);
console.log(`Generated ${FAILED_PROJECTS.length} failed projects JSON files.`);
