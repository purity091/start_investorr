import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_TTL_MS = 60 * 60 * 1000;

type CacheEntry<T> = {
  expiresAt: number;
  value: T;
};

const memoryCache = new Map<string, CacheEntry<unknown>>();

export async function readPublicJson<T>(relativePath: string, ttlMs = DEFAULT_TTL_MS): Promise<T> {
  const normalizedPath = relativePath.replace(/^[/\\]+/, "");
  const cached = memoryCache.get(normalizedPath) as CacheEntry<T> | undefined;
  const now = Date.now();

  if (cached && cached.expiresAt > now) {
    return cached.value;
  }

  const absolutePath = path.join(process.cwd(), "public", "data", normalizedPath);
  const raw = await readFile(absolutePath, "utf8");
  const value = JSON.parse(raw) as T;

  memoryCache.set(normalizedPath, {
    value,
    expiresAt: now + ttlMs,
  });

  return value;
}

export function publicJsonHeaders(ttlSeconds = 3600): HeadersInit {
  return {
    "Cache-Control": `public, s-maxage=${ttlSeconds}, stale-while-revalidate=86400`,
    "Content-Type": "application/json; charset=utf-8",
  };
}
