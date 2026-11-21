export interface FetchQueryOptions {
  staleTime?: number;
  cacheTime?: number;
}

export class SimpleQueryCache {
  private cache = new Map<string, { data: unknown; timestamp: number }>();

  async fetch<T>(key: string, fetcher: () => Promise<T>, ttlMs = 30000): Promise<T> {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < ttlMs) {
      return cached.data as T;
    }

    const data = await fetcher();
    this.cache.set(key, { data, timestamp: Date.now() });
    return data;
  }

  invalidate(keyPrefix?: string) {
    if (!keyPrefix) {
      this.cache.clear();
      return;
    }
    for (const key of this.cache.keys()) {
      if (key.startsWith(keyPrefix)) {
        this.cache.delete(key);
      }
    }
  }
}

export const queryClient = new SimpleQueryCache();
