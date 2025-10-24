import React from 'react';

// Performance monitoring utilities
export const performanceMonitor = {
  // Measure component render time
  measureRender: (componentName: string) => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      console.log(`${componentName} render time: ${end - start}ms`);
    };
  },

  // Measure API call performance
  measureApiCall: async (apiName: string, apiCall: () => Promise<any>) => {
    const start = performance.now();
    try {
      const result = await apiCall();
      const end = performance.now();
      console.log(`${apiName} API call time: ${end - start}ms`);
      return result;
    } catch (error) {
      const end = performance.now();
      console.error(`${apiName} API call failed after ${end - start}ms:`, error);
      throw error;
    }
  },

  // Debounce function for search inputs
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Throttle function for scroll events
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },
};

// Image optimization helper
export const optimizeImage = {
  // Generate responsive image sizes
  getResponsiveSizes: (width: number, height: number) => {
    return {
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      srcSet: [
        `${width}x${height}`,
        `${Math.floor(width * 0.75)}x${Math.floor(height * 0.75)}`,
        `${Math.floor(width * 0.5)}x${Math.floor(height * 0.5)}`,
      ].join(', '),
    };
  },
};

// Bundle size optimization
export const bundleOptimizer = {
  // Lazy load components
  lazyLoad: (importFn: () => Promise<any>) => {
    return React.lazy(importFn);
  },

  // Preload critical resources
  preloadCritical: () => {
    if (typeof window !== 'undefined') {
      // Preload critical fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      fontLink.as = 'style';
      document.head.appendChild(fontLink);
    }
  },
};

// Cache management
export const cacheManager = {
  // Simple in-memory cache
  memoryCache: new Map<string, { data: any; timestamp: number }>(),

  set: (key: string, data: any, ttl: number = 5 * 60 * 1000) => {
    cacheManager.memoryCache.set(key, {
      data,
      timestamp: Date.now() + ttl,
    });
  },

  get: (key: string) => {
    const cached = cacheManager.memoryCache.get(key);
    if (cached && cached.timestamp > Date.now()) {
      return cached.data;
    }
    cacheManager.memoryCache.delete(key);
    return null;
  },

  clear: () => {
    cacheManager.memoryCache.clear();
  },
};
