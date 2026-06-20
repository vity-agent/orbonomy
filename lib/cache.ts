class LRUCache {
  private cache: Map<string, { data: unknown; timestamp: number; hits: number }>;
  private maxSize: number;
  private ttlMs: number;

  constructor(maxSize = 500, ttlMs = 15 * 60 * 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
  }

  get(key: string) {
    const entry = this.cache.get(key);
    if (!entry || Date.now() - entry.timestamp > this.ttlMs) {
      if (entry) this.cache.delete(key);
      return null;
    }
    this.cache.delete(key);
    this.cache.set(key, { ...entry, hits: entry.hits + 1 });
    return entry.data;
  }

  set(key: string, data: unknown) {
    if (this.cache.has(key)) this.cache.delete(key);
    while (this.cache.size >= this.maxSize) {
      const first = this.cache.keys().next().value;
      if (first) this.cache.delete(first);
    }
    this.cache.set(key, { data, timestamp: Date.now(), hits: 0 });
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }
}

export const llmCache = new LRUCache(500, 15 * 60 * 1000);
export const dataCache = new LRUCache(200, 60 * 60 * 1000);
