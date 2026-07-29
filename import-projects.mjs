import fs from 'fs';
import path from 'path';

const newFolderDir = path.join(process.cwd(), 'New folder');
const outputDir = path.join(process.cwd(), 'src', 'data', 'provenProjects');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(newFolderDir).filter(f => f.endsWith('.html'));
const exportedProjects = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(newFolderDir, file), 'utf-8');
  
  const startTag = '<script id="entry-data" type="application/json">';
  const endTag = '</script>';
  const startIndex = content.indexOf(startTag);
  
  if (startIndex === -1) {
    console.log(`No JSON found in ${file}`);
    continue;
  }
  
  const jsonStr = content.substring(startIndex + startTag.length, content.indexOf(endTag, startIndex));
  
  try {
    const data = JSON.parse(jsonStr);
    const slug = data.slug.replace(/-/g, '_'); // Convert dashes to underscores just in case for variable names
    const exportName = slug.split('_').map((word, i) => i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Project';
    
    data.id = data.slug;
    
    const fileContent = `export const ${exportName} = ${JSON.stringify(data, null, 2)};\n`;
    
    const outFilename = `${data.slug}.ts`;
    fs.writeFileSync(path.join(outputDir, outFilename), fileContent, 'utf-8');
    
    exportedProjects.push({ name: exportName, file: data.slug });
    console.log(`Processed ${file} -> ${outFilename}`);
  } catch (err) {
    console.error(`Error parsing JSON in ${file}:`, err);
  }
}

// Generate index.ts
let indexContent = '';
for (const proj of exportedProjects) {
  indexContent += `import { ${proj.name} } from './${proj.file}';\n`;
}
indexContent += `\nexport const PROVEN_PROJECTS = [\n`;
for (const proj of exportedProjects) {
  indexContent += `  ${proj.name},\n`;
}
indexContent += `];\n`;

fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent, 'utf-8');
console.log('Generated index.ts');
