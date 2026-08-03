import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const envFiles = [".env", ".env.local", "apps/web/.env", "apps/web/.env.local"];

for (const envFile of envFiles) {
  const path = resolve(process.cwd(), envFile);
  if (!existsSync(path)) {
    continue;
  }

  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^['"]|['"]$/g, "");

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
];

const productionRequired = ["SUPABASE_JWT_SECRET"];
const isProduction = process.env.NODE_ENV === "production" || process.argv.includes("--production");
const missing = [];

for (const key of required) {
  if (!process.env[key]) {
    missing.push(key);
  }
}

if (isProduction) {
  for (const key of productionRequired) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }
}

if (missing.length > 0) {
  console.error("Missing required environment variables:");
  for (const key of missing) {
    console.error(`- ${key}`);
  }
  process.exit(1);
}

const recommended = ["SUPABASE_JWT_SECRET", "NEXT_PUBLIC_APP_VERSION"];
const warnings = recommended.filter((key) => !process.env[key]);

console.log("Environment check passed.");
if (warnings.length > 0) {
  console.log("Recommended variables not set:");
  for (const key of warnings) {
    console.log(`- ${key}`);
  }
}
