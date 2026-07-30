import fs from 'fs';
import path from 'path';

const rootPkgPath = path.join(process.cwd(), 'package.json');
const webPkgPath = path.join(process.cwd(), 'apps/web/package.json');

const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf8'));
const webPkg = JSON.parse(fs.readFileSync(webPkgPath, 'utf8'));

// Copy dependencies (excluding react and react-dom which Next.js already pinned)
for (const [key, value] of Object.entries(rootPkg.dependencies)) {
  if (key !== 'react' && key !== 'react-dom') {
    webPkg.dependencies[key] = value;
  }
}

// Ensure supabase is included
webPkg.dependencies['@supabase/supabase-js'] = '^2.39.0';
webPkg.dependencies['@supabase/ssr'] = '^0.1.0';

fs.writeFileSync(webPkgPath, JSON.stringify(webPkg, null, 2));
console.log('Dependencies merged successfully.');
