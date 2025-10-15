import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { feedback } from '@/db/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, district, message, email, user_id } = body;

    // Validate required fields
    const trimmedName = name?.trim();
    const trimmedDistrict = district?.trim();
    const trimmedMessage = message?.trim();
    const trimmedEmail = email?.trim();

    if (!trimmedName) {
      return NextResponse.json(
        { 
          error: "Name is required and cannot be empty",
          code: "VALIDATION_ERROR" 
        },
        { status: 400 }
      );
    }

    if (!trimmedDistrict) {
      return NextResponse.json(
        { 
          error: "District is required and cannot be empty",
          code: "VALIDATION_ERROR" 
        },
        { status: 400 }
      );
    }

    if (!trimmedMessage) {
      return NextResponse.json(
        { 
          error: "Message is required and cannot be empty",
          code: "VALIDATION_ERROR" 
        },
        { status: 400 }
      );
    }

    if (!trimmedEmail) {
      return NextResponse.json(
        { 
          error: "Email is required and cannot be empty",
          code: "VALIDATION_ERROR" 
        },
        { status: 400 }
      );
    }

    // Validate email format (basic check for @ symbol)
    if (!trimmedEmail.includes('@')) {
      return NextResponse.json(
        { 
          error: "Invalid email format. Email must contain @ symbol",
          code: "VALIDATION_ERROR" 
        },
        { status: 400 }
      );
    }

    // Prepare insert data
    const insertData = {
      name: trimmedName,
      district: trimmedDistrict,
      message: trimmedMessage,
      email: trimmedEmail.toLowerCase(),
      userId: user_id || null,
      createdAt: new Date().toISOString(),
    };

    // Insert feedback into database
    const newFeedback = await db.insert(feedback)
      .values(insertData)
      .returning();

    return NextResponse.json(newFeedback[0], { status: 201 });

  } catch (error) {
    console.error('POST feedback error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}