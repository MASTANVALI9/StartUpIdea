import { NextRequest, NextResponse } from 'next/server';

// Mock careers data for development
const mockCareers = [
  {
    id: 1,
    career: "Software Engineer",
    qualification: "B.Tech Computer Science",
    stream: "Engineering",
    avgSalary: "₹8-15 LPA",
    salaryNumeric: 1200000,
    jobType: "Full-time",
    demand: "Very High",
    growthRate: "25%",
    roleModels: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 2,
    career: "Doctor",
    qualification: "MBBS",
    stream: "Medical",
    avgSalary: "₹6-20 LPA",
    salaryNumeric: 1500000,
    jobType: "Full-time",
    demand: "Very High",
    growthRate: "15%",
    roleModels: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 3,
    career: "Chartered Accountant",
    qualification: "CA",
    stream: "Commerce",
    avgSalary: "₹5-12 LPA",
    salaryNumeric: 1000000,
    jobType: "Full-time",
    demand: "High",
    growthRate: "20%",
    roleModels: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 4,
    career: "Civil Engineer",
    qualification: "B.Tech Civil Engineering",
    stream: "Engineering",
    avgSalary: "₹6-12 LPA",
    salaryNumeric: 900000,
    jobType: "Full-time",
    demand: "High",
    growthRate: "18%",
    roleModels: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 5,
    career: "Nurse",
    qualification: "B.Sc Nursing",
    stream: "Medical",
    avgSalary: "₹3-8 LPA",
    salaryNumeric: 600000,
    jobType: "Full-time",
    demand: "Very High",
    growthRate: "22%",
    roleModels: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 6,
    career: "Business Analyst",
    qualification: "MBA",
    stream: "Commerce",
    avgSalary: "₹7-15 LPA",
    salaryNumeric: 1100000,
    jobType: "Full-time",
    demand: "High",
    growthRate: "20%",
    roleModels: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 7,
    career: "Graphic Designer",
    qualification: "B.Des Graphic Design",
    stream: "Arts",
    avgSalary: "₹3-8 LPA",
    salaryNumeric: 550000,
    jobType: "Full-time",
    demand: "Medium",
    growthRate: "15%",
    roleModels: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 8,
    career: "IAS Officer",
    qualification: "Any Graduate + UPSC",
    stream: "Government Jobs",
    avgSalary: "₹8-20 LPA",
    salaryNumeric: 1400000,
    jobType: "Full-time",
    demand: "Very High",
    growthRate: "10%",
    roleModels: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  }
];

// Cache careers data for 5 minutes
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let cachedCareers: any[] | null = null;
let cacheTimestamp: number = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const stream = searchParams.get('stream') || '';
    const demand = searchParams.get('demand') || '';
    const sort = searchParams.get('sort') || 'salary';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const now = Date.now();

    // Return cached data if still valid
    if (cachedCareers && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json(cachedCareers, {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
          'X-Cache': 'HIT'
        }
      });
    }

    // Filter careers based on search, stream, and demand
    let filteredCareers = mockCareers;

    if (search) {
      filteredCareers = filteredCareers.filter(career =>
        career.career.toLowerCase().includes(search.toLowerCase()) ||
        career.qualification.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (stream && stream !== 'all') {
      filteredCareers = filteredCareers.filter(career =>
        career.stream.toLowerCase() === stream.toLowerCase()
      );
    }

    if (demand && demand !== 'all') {
      filteredCareers = filteredCareers.filter(career =>
        career.demand.toLowerCase() === demand.toLowerCase()
      );
    }

    // Sort careers
    filteredCareers.sort((a, b) => {
      if (sort === 'name') {
        return a.career.localeCompare(b.career);
      } else if (sort === 'salary') {
        return b.salaryNumeric - a.salaryNumeric;
      }
      return 0;
    });

    // Apply pagination
    const paginatedCareers = filteredCareers.slice(offset, offset + limit);

    // Update cache
    cachedCareers = paginatedCareers;
    cacheTimestamp = now;

    return NextResponse.json(paginatedCareers, {
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
