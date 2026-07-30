import fs from 'fs';
import path from 'path';

const webPkgPath = path.join(process.cwd(), 'apps/web/package.json');
const webPkg = JSON.parse(fs.readFileSync(webPkgPath, 'utf8'));

const deps = {
  "@fontsource-variable/geist": "^5.3.0",
  "@google/genai": "^1.49.0",
  "@tanstack/react-table": "^8.21.3",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "framer-motion": "^12.38.0",
  "html2canvas": "^1.4.1",
  "jspdf": "^4.2.1",
  "jspdf-autotable": "^5.0.8",
  "lucide-react": "^0.561.0",
  "radix-ui": "^1.6.7",
  "recharts": "^3.8.1",
  "shadcn": "^4.15.0",
  "tailwind-merge": "^3.6.0",
  "tw-animate-css": "^1.4.0",
  "@supabase/supabase-js": "^2.39.0",
  "@supabase/ssr": "^0.1.0",
  ...webPkg.dependencies
};

webPkg.dependencies = deps;

fs.writeFileSync(webPkgPath, JSON.stringify(webPkg, null, 2));
console.log('Dependencies hard-merged successfully.');
