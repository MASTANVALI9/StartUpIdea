import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { streams, courses, exams } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Extract slug from URL pathname
    const pathname = request.nextUrl.pathname;
    const slug = pathname.split('/').pop();

    if (!slug) {
      return NextResponse.json({ 
        error: 'Slug parameter is required',
        code: 'MISSING_SLUG' 
      }, { status: 400 });
    }

    // Query stream by slug
    const streamResult = await db.select()
      .from(streams)
      .where(eq(streams.slug, slug))
      .limit(1);

    if (streamResult.length === 0) {
      return NextResponse.json({ 
        error: 'Stream not found' 
      }, { status: 404 });
    }

    const stream = streamResult[0];

    // Fetch related courses
    const relatedCourses = await db.select()
      .from(courses)
      .where(eq(courses.streamId, stream.id));

    // Fetch related exams
    const relatedExams = await db.select()
      .from(exams)
      .where(eq(exams.streamId, stream.id));

    return NextResponse.json({
      stream,
      courses: relatedCourses,
      exams: relatedExams
    }, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}