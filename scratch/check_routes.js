const fs = require('fs');
const path = require('path');

const mappingContent = fs.readFileSync(path.join(__dirname, '../apps/web/src/data/discovery_mapping.ts'), 'utf8');
const routerContent = fs.readFileSync(path.join(__dirname, '../apps/web/src/components/views/DashboardRouter.tsx'), 'utf8');

// Extract all sector IDs from discovery_mapping.ts
const idMatches = [...mappingContent.matchAll(/id:\s*"([^"]+)"/g)].map(m => m[1]);
console.log(`Total sector IDs in discovery_mapping: ${idMatches.length}`);

const unrouted = [];
idMatches.forEach(id => {
  if (!routerContent.includes(`case '${id}':`)) {
    unrouted.push(id);
  }
});

console.log(`Unrouted sector IDs count: ${unrouted.length}`);
console.log('Unrouted IDs:', unrouted);
