import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { careers } from '@/db/schema';
import { eq, like, and, desc, asc } from 'drizzle-orm';

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
    
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}