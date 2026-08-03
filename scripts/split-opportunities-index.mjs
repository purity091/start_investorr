import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceCandidates = [
  path.join(root, "apps/web/public/data/opportunities_index.json"),
  path.join(root, "data-raw/opportunities_index.full.json"),
  path.join(root, "_archive_unused_not_for_git/data-raw/opportunities_index.full.json"),
];

const sourceFile = sourceCandidates.find((candidate) => {
  try {
    readFileSync(candidate, "utf8");
    return true;
  } catch {
    return false;
  }
});

if (!sourceFile) {
  console.error("No source opportunities index found.");
  process.exit(1);
}

const outputDir = path.join(root, "apps/web/public/data/opportunities");
const bySectorDir = path.join(outputDir, "by-sector");

mkdirSync(bySectorDir, { recursive: true });

for (const staleFile of ["index.json", "manifest.json"]) {
  rmSync(path.join(outputDir, staleFile), { force: true });
}

const data = JSON.parse(readFileSync(sourceFile, "utf8"));

if (!Array.isArray(data)) {
  console.error("Expected opportunities index to be a JSON array.");
  process.exit(1);
}

const bySector = new Map();

for (const item of data) {
  const sectorId = item.sectorId || "uncategorized";
  const list = bySector.get(sectorId) ?? [];
  list.push(item);
  bySector.set(sectorId, list);
}

const stripDetails = (item) => {
  const {
    globalResolution,
    roadmap,
    whyNotSolved,
    techStack,
    mainRisk,
    ...summary
  } = item;

  return summary;
};

const index = data.map(stripDetails);
const sectors = [...bySector.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([sectorId, items]) => {
    const fileName = `${sectorId}.json`;
    const relativePath = `opportunities/by-sector/${fileName}`;
    const sectorName = items.find((item) => item.sectorName)?.sectorName ?? sectorId;
    const slimItems = items.map(stripDetails);

    writeFileSync(
      path.join(bySectorDir, fileName),
      JSON.stringify(items),
    );

    writeFileSync(
      path.join(bySectorDir, `${sectorId}.index.json`),
      JSON.stringify(slimItems),
    );

    return {
      sectorId,
      sectorName,
      count: items.length,
      path: relativePath,
      indexPath: `opportunities/by-sector/${sectorId}.index.json`,
    };
  });

writeFileSync(path.join(outputDir, "index.json"), JSON.stringify(index));
writeFileSync(
  path.join(outputDir, "manifest.json"),
  JSON.stringify(
    {
      total: data.length,
      generatedAt: new Date().toISOString(),
      source: path.relative(root, sourceFile).replace(/\\/g, "/"),
      sectors,
    },
    null,
    2,
  ),
);

console.log(`Split ${data.length} opportunities into ${sectors.length} sectors.`);
console.log(`Summary index: ${path.relative(root, path.join(outputDir, "index.json"))}`);
