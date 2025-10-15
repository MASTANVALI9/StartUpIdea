import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { streams } from '@/db/schema';
import { desc, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
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

    return NextResponse.json(allStreams, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}