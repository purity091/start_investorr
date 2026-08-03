const fs = require('fs');
const path = require('path');

const root = 'e:/start-investor/nnew-ui';
const dataRaw = path.join(root, '_archive_unused_not_for_git', 'data-raw');
const docs = path.join(root, 'docs');

const toDataRaw = ['file', 'fileText', 'new'];
const toDocs = ['stetch', 'problem_intelligence_system.html', 'sector_matrix.txt', 'context.txt', 'DESIGN_GUIDELINES.md'];

toDataRaw.forEach(item => {
    const oldPath = path.join(root, item);
    const newPath = path.join(dataRaw, item);
    if (fs.existsSync(oldPath)) {
        console.log(`Moving ${item} to data-raw/`);
        fs.renameSync(oldPath, newPath);
    }
});

toDocs.forEach(item => {
    const oldPath = path.join(root, item);
    let newPath = path.join(docs, item);
    
    // Special case for stetch -> sketches
    if (item === 'stetch') newPath = path.join(docs, 'sketches');
    
    if (fs.existsSync(oldPath)) {
        console.log(`Moving ${item} to docs/`);
        fs.renameSync(oldPath, newPath);
    }
});
