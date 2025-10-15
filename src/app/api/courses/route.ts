import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { courses } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const streamId = searchParams.get('stream_id');

    let query = db.select().from(courses).orderBy(asc(courses.name));

    if (streamId) {
      const streamIdInt = parseInt(streamId);
      if (isNaN(streamIdInt)) {
        return NextResponse.json(
          { 
            error: 'Invalid stream_id parameter',
            code: 'INVALID_STREAM_ID'
          },
          { status: 400 }
        );
      }
      query = query.where(eq(courses.streamId, streamIdInt));
    }

    const results = await query;

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}