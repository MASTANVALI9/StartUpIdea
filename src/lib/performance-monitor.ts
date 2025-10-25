// src/lib/performance-monitor.ts - Advanced performance monitoring
import { useState, useEffect, useCallback } from 'react';
import React from 'react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
  bundleSize: number;
  apiResponseTime: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    loadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    firstInputDelay: 0,
    cumulativeLayoutShift: 0,
    timeToInteractive: 0,
    bundleSize: 0,
    apiResponseTime: 0,
  };

  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMonitoring();
    }
  }

  private initializeMonitoring() {
    // Monitor Core Web Vitals
    this.observeWebVitals();
    
    // Monitor API performance
    this.observeAPIPerformance();
    
    // Monitor bundle size
    this.observeBundleSize();
    
    // Monitor memory usage
    this.observeMemoryUsage();
  }

  private observeWebVitals() {
    if (typeof window === 'undefined') return;

    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.firstContentfulPaint = entry.startTime;
        }
      });
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.largestContentfulPaint = lastEntry.startTime;
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        this.metrics.firstInputDelay = entry.processingStart - entry.startTime;
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.metrics.cumulativeLayoutShift = clsValue;
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    this.observers.push(fcpObserver, lcpObserver, fidObserver, clsObserver);
  }

  private observeAPIPerformance() {
    if (typeof window === 'undefined') return;

    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const response = await originalFetch(...args);
      const endTime = performance.now();
      
      this.metrics.apiResponseTime = endTime - startTime;
      
      // Log slow API calls
      if (this.metrics.apiResponseTime > 1000) {
        console.warn(`Slow API call detected: ${args[0]} took ${this.metrics.apiResponseTime}ms`);
      }
      
      return response;
    };
  }

  private observeBundleSize() {
    if (typeof window === 'undefined') return;

    // Monitor bundle size through performance entries
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name.includes('_app') || entry.name.includes('main')) {
          this.metrics.bundleSize = entry.transferSize || 0;
        }
      });
    });
    observer.observe({ entryTypes: ['resource'] });
    this.observers.push(observer);
  }

  private observeMemoryUsage() {
    if (typeof window === 'undefined') return;

    if ('memory' in performance) {
      const memory = (performance as any).memory;
      setInterval(() => {
        const memoryInfo = {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
        };
        
        // Log memory warnings
        if (memoryInfo.usedJSHeapSize > memoryInfo.jsHeapSizeLimit * 0.8) {
          console.warn('High memory usage detected:', memoryInfo);
        }
      }, 30000); // Check every 30 seconds
    }
  }

  // Measure component render time
  measureRenderTime(componentName: string, renderFn: () => void) {
    if (typeof window === 'undefined') return 0;

    const startTime = performance.now();
    renderFn();
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    if (renderTime > 16) { // More than one frame
      console.warn(`Slow render detected in ${componentName}: ${renderTime}ms`);
    }
    
    return renderTime;
  }

  // Measure function execution time
  measureFunction<T extends (...args: any[]) => any>(
    fn: T,
    functionName: string
  ): T {
    return ((...args: Parameters<T>) => {
      if (typeof window === 'undefined') return fn(...args);

      const startTime = performance.now();
      const result = fn(...args);
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      if (executionTime > 100) {
        console.warn(`Slow function detected: ${functionName} took ${executionTime}ms`);
      }
      
      return result;
    }) as T;
  }

  // Get current metrics
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Get performance score
  getPerformanceScore(): number {
    const scores = {
      fcp: this.metrics.firstContentfulPaint < 1800 ? 100 : 50,
      lcp: this.metrics.largestContentfulPaint < 2500 ? 100 : 50,
      fid: this.metrics.firstInputDelay < 100 ? 100 : 50,
      cls: this.metrics.cumulativeLayoutShift < 0.1 ? 100 : 50,
    };
    
    return Object.values(scores).reduce((sum, score) => sum + score, 0) / 4;
  }

  // Cleanup observers
  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export function usePerformanceMonitor(componentName: string) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateMetrics = () => {
      setMetrics(performanceMonitor.getMetrics());
    };
    
    // Update metrics every 5 seconds
    const interval = setInterval(updateMetrics, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const measureRender = useCallback((renderFn: () => void) => {
    return performanceMonitor.measureRenderTime(componentName, renderFn);
  }, [componentName]);
  
  return { metrics, measureRender };
}

// Performance optimization utilities
export const performanceUtils = {
  // Debounce function
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },
  
  // Throttle function
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Lazy load component
  lazyLoad<T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>
  ): React.LazyExoticComponent<T> {
    return React.lazy(importFunc);
  },
  
  // Preload critical resources
  preloadResource(href: string, as: string = 'script') {
    if (typeof window === 'undefined') return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  },
  
  // Prefetch next page
  prefetchPage(href: string) {
    if (typeof window === 'undefined') return;
    
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  },
};
