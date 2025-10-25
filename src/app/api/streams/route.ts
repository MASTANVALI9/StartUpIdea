import { NextRequest, NextResponse } from 'next/server';
import { globalCache, withCache } from '@/lib/cache';

// Mock streams data for development
const mockStreams = [
  {
    id: 1,
    slug: "engineering",
    title: "Engineering",
    subtitle: "Build the Future",
    description: "Engineering offers diverse career paths in technology, innovation, and problem-solving. From software development to civil engineering, explore opportunities to create and build.",
    icon: "Microscope",
    color: "from-blue-500 to-cyan-500",
    paths: ["Software Engineer", "Civil Engineer", "Mechanical Engineer", "Electrical Engineer", "Data Scientist"],
    averageSalary: "₹8-15 LPA",
    duration: "4 years",
    popularity: "Very High",
    skills: ["Problem Solving", "Mathematics", "Technical Skills", "Analytical Thinking"],
    pros: ["High salary potential", "Diverse career options", "Innovation opportunities"],
    cons: ["Competitive field", "Continuous learning required"],
    successStories: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 2,
    slug: "medical",
    title: "Medical",
    subtitle: "Heal and Serve",
    description: "Medical careers focus on healthcare, healing, and serving humanity. From doctors to nurses, make a difference in people's lives through healthcare.",
    icon: "Heart",
    color: "from-red-500 to-pink-500",
    paths: ["Doctor", "Nurse", "Pharmacist", "Physiotherapist", "Medical Researcher"],
    averageSalary: "₹6-20 LPA",
    duration: "5-7 years",
    popularity: "Very High",
    skills: ["Empathy", "Scientific Knowledge", "Communication", "Attention to Detail"],
    pros: ["Job security", "Social impact", "Respected profession"],
    cons: ["Long study period", "High stress", "Continuous learning"],
    successStories: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 3,
    slug: "commerce",
    title: "Commerce",
    subtitle: "Business & Finance",
    description: "Commerce careers focus on business, finance, and economics. From accounting to entrepreneurship, explore opportunities in the business world.",
    icon: "Calculator",
    color: "from-green-500 to-emerald-500",
    paths: ["Chartered Accountant", "Business Analyst", "Investment Banker", "Entrepreneur", "Financial Advisor"],
    averageSalary: "₹5-12 LPA",
    duration: "3-4 years",
    popularity: "High",
    skills: ["Analytical Skills", "Financial Knowledge", "Communication", "Leadership"],
    pros: ["Diverse opportunities", "Good earning potential", "Business skills"],
    cons: ["Competitive market", "Economic dependency"],
    successStories: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 4,
    slug: "arts",
    title: "Arts",
    subtitle: "Creative Expression",
    description: "Arts careers focus on creativity, expression, and cultural impact. From fine arts to performing arts, explore opportunities to express yourself.",
    icon: "Palette",
    color: "from-purple-500 to-violet-500",
    paths: ["Artist", "Writer", "Actor", "Musician", "Designer"],
    averageSalary: "₹3-10 LPA",
    duration: "3-4 years",
    popularity: "Medium",
    skills: ["Creativity", "Communication", "Cultural Awareness", "Technical Skills"],
    pros: ["Creative freedom", "Personal fulfillment", "Cultural impact"],
    cons: ["Variable income", "Competitive field"],
    successStories: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 5,
    slug: "government-jobs",
    title: "Government Jobs",
    subtitle: "Public Service",
    description: "Government careers focus on public service, administration, and policy-making. From civil services to defense, serve your nation.",
    icon: "Award",
    color: "from-orange-500 to-yellow-500",
    paths: ["IAS Officer", "IPS Officer", "Banking", "Defense", "Railways"],
    averageSalary: "₹4-15 LPA",
    duration: "1-2 years prep",
    popularity: "High",
    skills: ["Leadership", "Administration", "Public Speaking", "Decision Making"],
    pros: ["Job security", "Social prestige", "Pension benefits"],
    cons: ["Competitive exams", "Political environment"],
    successStories: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  }
];

// Enhanced caching with cache decorator
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes for streams (longer cache)

async function getStreamsData() {
  // Check cache first
  const cacheKey = 'streams_data';
  const cached = globalCache.get(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Sort by popularity
  const sortedStreams = mockStreams.sort((a, b) => {
    const popularityOrder = { 'Very High': 1, 'High': 2, 'Medium': 3, 'Low': 4 };
    return popularityOrder[a.popularity as keyof typeof popularityOrder] - 
           popularityOrder[b.popularity as keyof typeof popularityOrder];
  });
  
  // Cache the result
  globalCache.set(cacheKey, sortedStreams, CACHE_DURATION);
  
  return sortedStreams;
}

export const GET = withCache(CACHE_DURATION)(async function(request: NextRequest) {
  try {
    const startTime = performance.now();
    
    const streams = await getStreamsData();
    
    const endTime = performance.now();
    const processingTime = endTime - startTime;
    
    // Add performance headers
    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=600, stale-while-revalidate=1200',
      'X-Processing-Time': `${processingTime.toFixed(2)}ms`,
      'X-Cache-Status': globalCache.has('streams_data') ? 'HIT' : 'MISS',
      'X-Total-Count': Array.isArray(streams) ? streams.length.toString() : '0',
    };
    
    return NextResponse.json(streams, { 
      status: 200,
      headers
    });
  } catch (error) {
    console.error('GET streams error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
});
