import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const sourceDir = path.join(repoRoot, "apps/web/public/data/new-proven");
const targetDir = path.join(repoRoot, "apps/web/public/data/proven-projects");
const sourceIndexPath = path.join(sourceDir, "index_professional_v2.json");
const targetIndexPath = path.join(targetDir, "index.json");

const slugAliases = new Map([
  ["kit-convertkit", "convertkit"],
]);

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));
const writeJson = (filePath, value) => {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

const normalizeSlug = (slug) => slugAliases.get(slug) || slug;

const toDisplayText = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(toDisplayText).filter(Boolean).join("، ");
  if (typeof value !== "object") return String(value);

  const preferredKeys = [
    "value",
    "status",
    "conclusion",
    "note",
    "monthly_revenue_note",
    "monthly_traffic_note",
    "metric",
    "scope",
  ];

  for (const key of preferredKeys) {
    const text = toDisplayText(value[key]);
    if (text) return text;
  }

  return Object.values(value).map(toDisplayText).find(Boolean) || "";
};

const toIndexEntry = (project) => ({
  id: project.id,
  slug: project.slug,
  name: project.name,
  headline: project.headline,
  category: project.category,
  company: {
    location: project.company?.location || "غير مذكور",
    business_model: project.company?.business_model || "غير مذكور",
  },
  directory_snapshot: {
    monthly_revenue: toDisplayText(
      project.directory_snapshot?.monthly_revenue ||
      project.directory_snapshot?.monthly_revenue_note ||
      "غير معلن",
    ),
    monthly_traffic: toDisplayText(
      project.directory_snapshot?.monthly_traffic ||
      project.directory_snapshot?.monthly_traffic_note ||
      project.directory_snapshot?.monthly_active_users?.value ||
      "غير معلن",
    ),
  },
});

if (!fs.existsSync(sourceDir)) {
  throw new Error(`Missing source directory: ${sourceDir}`);
}

const currentIndex = readJson(targetIndexPath);
const sourceIndex = readJson(sourceIndexPath);
const indexBySlug = new Map();

for (const entry of currentIndex) {
  const slug = normalizeSlug(entry.slug || entry.id);
  indexBySlug.set(slug, { ...entry, id: slug, slug });
}

for (const entry of sourceIndex) {
  const slug = normalizeSlug(entry.slug || entry.id);
  indexBySlug.set(slug, { ...entry, id: slug, slug });
}

const detailFiles = fs
  .readdirSync(sourceDir)
  .filter((fileName) => fileName.endsWith(".json") && !fileName.startsWith("index"));

const writtenDetails = [];
for (const fileName of detailFiles) {
  const sourcePath = path.join(sourceDir, fileName);
  const project = readJson(sourcePath);
  const sourceSlug = project.slug || project.id;
  const slug = normalizeSlug(sourceSlug);
  const normalizedProject = { ...project, id: slug, slug };

  writeJson(path.join(targetDir, `${slug}.json`), normalizedProject);
  indexBySlug.set(slug, toIndexEntry(normalizedProject));
  writtenDetails.push(slug);
}

const sourceOrder = sourceIndex.map((entry) => normalizeSlug(entry.slug || entry.id));
const currentOrder = currentIndex.map((entry) => normalizeSlug(entry.slug || entry.id));
const orderedSlugs = [...new Set([...sourceOrder, ...currentOrder, ...writtenDetails])];
const mergedIndex = orderedSlugs
  .map((slug) => indexBySlug.get(slug))
  .filter(Boolean);

writeJson(targetIndexPath, mergedIndex);

console.log(
  JSON.stringify(
    {
      sourceDetails: detailFiles.length,
      writtenDetails: writtenDetails.length,
      indexCount: mergedIndex.length,
      aliases: Object.fromEntries(slugAliases),
    },
    null,
    2,
  ),
);
