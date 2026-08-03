const jsonCache = new Map<string, Promise<unknown>>();

export function fetchPublicJson<T>(url: string): Promise<T> {
  const cached = jsonCache.get(url);

  if (cached) {
    return cached as Promise<T>;
  }

  const request = fetch(url, { cache: "force-cache" }).then(async (response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch public JSON: ${response.status} ${url}`);
    }

    return response.json() as Promise<T>;
  });

  jsonCache.set(url, request);
  return request;
}

export function prefetchPublicJson(url: string) {
  void fetchPublicJson(url).catch(() => {
    jsonCache.delete(url);
  });
}
