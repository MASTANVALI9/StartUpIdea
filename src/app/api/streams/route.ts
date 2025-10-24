import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { streams } from '@/db/schema';
import { desc, sql } from 'drizzle-orm';

// Cache streams data for 5 minutes
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let cachedStreams: any[] | null = null;
let cacheTimestamp: number = 0;

export async function GET(request: NextRequest) {
  try {
    const now = Date.now();
    
    // Return cached data if still valid
    if (cachedStreams && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json(cachedStreams, { 
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
          'X-Cache': 'HIT'
        }
      });
    }

    // Define popularity order for sorting
    const popularityOrder = sql`
      CASE ${streams.popularity}
        WHEN 'Very High' THEN 1
        WHEN 'High' THEN 2
        WHEN 'Medium' THEN 3
        ELSE 4
      END
    `;

    // Fetch all streams ordered by popularity
    const allStreams = await db
      .select()
      .from(streams)
      .orderBy(popularityOrder);

    // Update cache
    cachedStreams = allStreams;
    cacheTimestamp = now;

    return NextResponse.json(allStreams, { 
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