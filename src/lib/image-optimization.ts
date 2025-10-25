// src/lib/image-optimization.ts - Advanced image optimization
import { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallback?: string;
  quality?: number;
  priority?: boolean;
  sizes?: string;
}

export class ImageOptimizer {
  private static readonly CLOUDINARY_BASE = 'https://res.cloudinary.com/demo/image/fetch';
  private static readonly PLACEHOLDER_BASE = 'https://picsum.photos';
  
  static optimize(src: string, width: number, height: number, quality: number = 75): string {
    // Use Cloudinary for optimization if available
    if (src.startsWith('http')) {
      return `${this.CLOUDINARY_BASE}/w_${width},h_${height},q_${quality},f_auto/${src}`;
    }
    
    return src;
  }
  
  static generatePlaceholder(width: number, height: number, seed?: string): string {
    const seedParam = seed ? `?random=${seed}` : '';
    return `${this.PLACEHOLDER_BASE}/${width}/${height}${seedParam}`;
  }
  
  static getResponsiveSizes(breakpoints: number[] = [640, 768, 1024, 1280]): string {
    return breakpoints.map(bp => `(max-width: ${bp}px) ${bp}px`).join(', ') + ', 100vw';
  }
  
  static preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  }
  
  static async preloadImages(urls: string[]): Promise<void> {
    await Promise.all(urls.map(url => this.preloadImage(url)));
  }
}

// Optimized Image Component
export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  quality = 75, 
  priority = false,
  fallback,
  sizes,
  ...props 
}: OptimizedImageProps) {
  const optimizedSrc = ImageOptimizer.optimize(src, width, height, quality);
  const placeholderSrc = fallback || ImageOptimizer.generatePlaceholder(width, height);
  const responsiveSizes = sizes || ImageOptimizer.getResponsiveSizes();
  
  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      sizes={responsiveSizes}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (target.src !== placeholderSrc) {
          target.src = placeholderSrc;
        }
      }}
      {...props}
    />
  );
}

// Image Gallery with lazy loading
export function LazyImageGallery({ images }: { images: string[] }) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setLoadedImages(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const imageElements = document.querySelectorAll('[data-lazy-image]');
    imageElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((src, index) => (
        <div
          key={index}
          data-lazy-image
          data-index={index}
          className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
        >
          {loadedImages.has(index) ? (
            <OptimizedImage
              src={src}
              alt={`Image ${index + 1}`}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 animate-pulse" />
          )}
        </div>
      ))}
    </div>
  );
}
