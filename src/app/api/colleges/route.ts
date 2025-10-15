import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { colleges } from '@/db/schema';
import { eq, and, desc, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Get optional filter parameters
    const state = searchParams.get('state');
    const district = searchParams.get('district');
    const stream = searchParams.get('stream');
    const type = searchParams.get('type');

    // Build dynamic query with filters
    let query = db.select().from(colleges);

    // Build conditions array for filters
    const conditions = [];

    if (state) {
      conditions.push(eq(colleges.state, state));
    }

    if (district) {
      conditions.push(eq(colleges.district, district));
    }

    if (stream) {
      conditions.push(eq(colleges.stream, stream));
    }

    if (type) {
      conditions.push(eq(colleges.type, type));
    }

    // Apply filters if any conditions exist
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Order by rating descending, then by name ascending
    const results = await query
      .orderBy(desc(colleges.rating), asc(colleges.name));

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}