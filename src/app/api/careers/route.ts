import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { careers } from '@/db/schema';
import { eq, like, and, desc, asc } from 'drizzle-orm';

// Cache careers data for 5 minutes
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let cachedCareers: any[] | null = null;
let cacheTimestamp: number = 0;
let cacheKey: string = '';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Get pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Get filter parameters
    const stream = searchParams.get('stream');
    const demand = searchParams.get('demand');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'salary';
    
    // Create cache key based on parameters
    const currentCacheKey = `${stream || 'all'}-${demand || 'all'}-${search || 'all'}-${sort}-${limit}-${offset}`;
    
    const now = Date.now();
    
    // Return cached data if still valid and same parameters
    if (cachedCareers && cacheKey === currentCacheKey && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json(cachedCareers, { 
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
          'X-Cache': 'HIT'
        }
      });
    }
    
    // Build query dynamically
    let query = db.select().from(careers);
    
    // Build filter conditions
    const conditions = [];
    
    if (stream) {
      conditions.push(eq(careers.stream, stream));
    }
    
    if (demand) {
      conditions.push(eq(careers.demand, demand));
    }
    
    if (search) {
      conditions.push(like(careers.career, `%${search}%`));
    }
    
    // Apply filters if any exist
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    // Apply sorting
    if (sort === 'name') {
      query = query.orderBy(asc(careers.career));
    } else {
      // Default to salary sorting (descending)
      query = query.orderBy(desc(careers.salaryNumeric));
    }
    
    // Apply pagination
    const results = await query.limit(limit).offset(offset);
    
    // Update cache
    cachedCareers = results;
    cacheTimestamp = now;
    cacheKey = currentCacheKey;
    
    return NextResponse.json(results, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
        'X-Cache': 'MISS'
      }
    });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}