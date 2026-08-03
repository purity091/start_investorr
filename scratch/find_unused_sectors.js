const fs = require('fs');
const path = require('path');

const sectorsDir = path.join(__dirname, '../apps/web/src/components/sectors');
const srcDir = path.join(__dirname, '../apps/web/src');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

const sectorFiles = getAllFiles(sectorsDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));
const allSrcFiles = getAllFiles(srcDir);

const unusedSectors = [];

sectorFiles.forEach(sFile => {
  const basename = path.basename(sFile, path.extname(sFile));
  if (basename === 'index' || basename === 'types') return;

  let isImported = false;
  for (const file of allSrcFiles) {
    if (file === sFile) continue;
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(basename)) {
      isImported = true;
      break;
    }
  }

  if (!isImported) {
    unusedSectors.push(sFile);
  }
});

console.log(`Found ${unusedSectors.length} unused sector files:`);
unusedSectors.forEach(f => console.log(path.relative(sectorsDir, f)));
