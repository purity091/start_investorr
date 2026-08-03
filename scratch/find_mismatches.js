const fs = require('fs');
const path = require('path');

const mappingContent = fs.readFileSync(path.join(__dirname, '../apps/web/src/data/discovery_mapping.ts'), 'utf8');
const routerContent = fs.readFileSync(path.join(__dirname, '../apps/web/src/components/views/DashboardRouter.tsx'), 'utf8');

const idMatches = [...mappingContent.matchAll(/id:\s*"([^"]+)"/g)].map(m => m[1]);

console.log('--- Checking all 155 discovery mapping sector IDs in DashboardRouter ---');
idMatches.forEach(id => {
  const hasExactCase = routerContent.includes(`case '${id}':`);
  if (!hasExactCase) {
    console.log(`MISSING EXACT ROUTE: ${id}`);
  }
});
