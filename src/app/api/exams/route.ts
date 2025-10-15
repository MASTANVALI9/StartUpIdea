import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { exams } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const streamId = searchParams.get('stream_id');

    let query = db.select().from(exams).orderBy(asc(exams.name));

    if (streamId) {
      const parsedStreamId = parseInt(streamId);
      if (isNaN(parsedStreamId)) {
        return NextResponse.json(
          { 
            error: 'Invalid stream_id parameter',
            code: 'INVALID_STREAM_ID'
          },
          { status: 400 }
        );
      }
      query = query.where(eq(exams.streamId, parsedStreamId));
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