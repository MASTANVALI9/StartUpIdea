// src/lib/cache.ts - Advanced caching system
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
  hits: number;
}

class AdvancedCache {
  private cache = new Map<string, CacheItem<any>>();
  private maxSize = 1000;
  private cleanupInterval = 5 * 60 * 1000; // 5 minutes

  constructor() {
    // Auto cleanup expired items
    setInterval(() => this.cleanup(), this.cleanupInterval);
  }

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    // Remove oldest items if cache is full
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
      hits: 0
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    // Check if expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    item.hits++;
    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private evictOldest(): void {
    let oldestKey = '';
    let oldestTime = Date.now();
    
    for (const [key, item] of this.cache.entries()) {
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }

  getStats() {
    const stats = {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: 0,
      totalHits: 0
    };

    for (const item of this.cache.values()) {
      stats.totalHits += item.hits;
    }

    return stats;
  }
}

// Global cache instance
export const globalCache = new AdvancedCache();

// Cache decorator for functions
export function cached(ttl: number = 5 * 60 * 1000) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      const cacheKey = `${propertyName}_${JSON.stringify(args)}`;
      const cached = globalCache.get(cacheKey);
      
      if (cached) {
        return Promise.resolve(cached);
      }
      
      return method.apply(this, args).then((result: any) => {
        globalCache.set(cacheKey, result, ttl);
        return result;
      });
    };
  };
}

// Cache middleware for API routes
export function withCache(ttl: number = 5 * 60 * 1000) {
  return function (handler: Function) {
    return async function (request: Request, ...args: any[]) {
      const url = new URL(request.url);
      const cacheKey = `api_${url.pathname}_${url.search}`;
      
      const cached = globalCache.get(cacheKey);
      if (cached) {
        return new Response(JSON.stringify(cached), {
          headers: {
            'Content-Type': 'application/json',
            'X-Cache': 'HIT',
            'Cache-Control': `public, max-age=${Math.floor(ttl / 1000)}`
          }
        });
      }
      
      const response = await handler(request, ...args);
      const data = await response.json();
      
      globalCache.set(cacheKey, data, ttl);
      
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'X-Cache': 'MISS',
          'Cache-Control': `public, max-age=${Math.floor(ttl / 1000)}`
        }
      });
    };
  };
}
