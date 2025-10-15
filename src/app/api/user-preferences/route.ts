import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userPreferences } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('X-User-Id');
    
    if (!userId) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    const preferences = await db.select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId))
      .limit(1);

    if (preferences.length === 0) {
      return NextResponse.json({ 
        error: 'Preferences not found',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    return NextResponse.json(preferences[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('X-User-Id');
    
    if (!userId) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    const body = await request.json();
    const { district, interested_streams, marks_percentage, career_goals } = body;

    if (!district || !district.trim()) {
      return NextResponse.json({ 
        error: 'District is required',
        code: 'MISSING_DISTRICT' 
      }, { status: 400 });
    }

    if (!interested_streams || !Array.isArray(interested_streams)) {
      return NextResponse.json({ 
        error: 'Interested streams is required and must be an array',
        code: 'MISSING_INTERESTED_STREAMS' 
      }, { status: 400 });
    }

    const existingPreferences = await db.select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId))
      .limit(1);

    if (existingPreferences.length > 0) {
      return NextResponse.json({ 
        error: 'Preferences already exist, use PUT to update',
        code: 'ALREADY_EXISTS' 
      }, { status: 400 });
    }

    const now = new Date().toISOString();
    
    const newPreferences = await db.insert(userPreferences)
      .values({
        userId,
        district: district.trim(),
        interestedStreams: interested_streams,
        marksPercentage: marks_percentage || null,
        careerGoals: career_goals ? career_goals.trim() : null,
        createdAt: now,
        updatedAt: now
      })
      .returning();

    return NextResponse.json(newPreferences[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get('X-User-Id');
    
    if (!userId) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    const body = await request.json();
    const { district, interested_streams, marks_percentage, career_goals } = body;

    const existingPreferences = await db.select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId))
      .limit(1);

    if (existingPreferences.length === 0) {
      return NextResponse.json({ 
        error: 'Preferences not found',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    const updates: any = {
      updatedAt: new Date().toISOString()
    };

    if (district !== undefined) {
      updates.district = district.trim();
    }

    if (interested_streams !== undefined) {
      if (!Array.isArray(interested_streams)) {
        return NextResponse.json({ 
          error: 'Interested streams must be an array',
          code: 'INVALID_INTERESTED_STREAMS' 
        }, { status: 400 });
      }
      updates.interestedStreams = interested_streams;
    }

    if (marks_percentage !== undefined) {
      updates.marksPercentage = marks_percentage;
    }

    if (career_goals !== undefined) {
      updates.careerGoals = career_goals ? career_goals.trim() : null;
    }

    const updatedPreferences = await db.update(userPreferences)
      .set(updates)
      .where(eq(userPreferences.userId, userId))
      .returning();

    return NextResponse.json(updatedPreferences[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}