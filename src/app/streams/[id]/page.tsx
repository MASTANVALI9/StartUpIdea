"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, Building2, FileText, TrendingUp, Clock, Users, Target, CheckCircle2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface Stream {
  id: number
  slug: string
  title: string
  subtitle: string
  description: string
  icon: string
  color: string
  paths: string[]
  averageSalary: string
  duration: string
  popularity: string
  skills: string[]
  pros: string[]
  cons: string[]
}

interface Course {
  id: number
  streamId: number
  name: string
  duration: string
  fees: string
  eligibility: string
  description: string
  careerRoles: string[]
}

interface Exam {
  id: number
  streamId: number
  name: string
  month: string
  difficulty: string
  eligibility: string
  description: string
  registrationLink: string | null
}

export default function StreamDetailPage() {
  const params = useParams()
  const slug = params.id as string
  
  const [stream, setStream] = useState<Stream | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStreamData() {
      try {
        setLoading(true)
        const response = await fetch(`/api/streams/${slug}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Stream not found')
          }
          throw new Error('Failed to fetch stream data')
        }
        
        const data = await response.json()
        setStream(data.stream)
        setCourses(data.courses)
        setExams(data.exams)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchStreamData()
  }, [slug])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container px-4 py-8 md:py-12 mx-auto max-w-7xl">
          <Skeleton className="h-10 w-32 mb-6" />
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-12 w-full max-w-2xl mb-4" />
          <Skeleton className="h-6 w-full max-w-3xl mb-12" />
          <Skeleton className="h-12 w-full mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !stream) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">{error || 'Stream Not Found'}</h1>
          <p className="text-muted-foreground mb-6">
            The stream you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Button asChild>
            <Link href="/streams">Back to Streams</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Generate mock salary data based on stream (for visualization)
  const salaryData = [
    { year: "Fresher", min: 300000, avg: parseInt(stream.averageSalary.split('-')[0].replace(/[^0-9]/g, '')) * 100000, max: parseInt(stream.averageSalary.split('-')[1].replace(/[^0-9]/g, '')) * 100000 },
    { year: "2 Years", min: 500000, avg: parseInt(stream.averageSalary.split('-')[0].replace(/[^0-9]/g, '')) * 100000 * 1.3, max: parseInt(stream.averageSalary.split('-')[1].replace(/[^0-9]/g, '')) * 100000 * 1.3 },
    { year: "5 Years", min: 800000, avg: parseInt(stream.averageSalary.split('-')[0].replace(/[^0-9]/g, '')) * 100000 * 1.6, max: parseInt(stream.averageSalary.split('-')[1].replace(/[^0-9]/g, '')) * 100000 * 1.6 },
    { year: "10 Years", min: 1500000, avg: parseInt(stream.averageSalary.split('-')[0].replace(/[^0-9]/g, '')) * 100000 * 2, max: parseInt(stream.averageSalary.split('-')[1].replace(/[^0-9]/g, '')) * 100000 * 2 }
  ]

  const chartConfig = {
    min: { label: "Minimum", color: "hsl(var(--chart-1))" },
    avg: { label: "Average", color: "hsl(var(--chart-2))" },
    max: { label: "Maximum", color: "hsl(var(--chart-3))" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      
      <div className="container px-4 py-8 md:py-12 mx-auto max-w-7xl">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/streams">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Streams
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-12">
          <Badge className="mb-4" variant="outline">{stream.subtitle}</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            {stream.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            {stream.description}
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="colleges">Colleges</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="salary">Salary</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Paths Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <CardTitle>Career Paths</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {stream.paths.map((path: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{path}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Skills Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <CardTitle>Required Skills</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {stream.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid sm:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Average Salary</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {stream.averageSalary}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Course Duration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {stream.duration}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Market Demand</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {stream.popularity}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pros and Cons */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-950/20">
                <CardHeader>
                  <CardTitle className="text-green-700 dark:text-green-400">Advantages</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {stream.pros.map((pro: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20">
                <CardHeader>
                  <CardTitle className="text-amber-700 dark:text-amber-400">Considerations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {stream.cons.map((con: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-amber-600 dark:text-amber-500 mr-2 mt-0.5 flex-shrink-0">⚠️</span>
                        <span className="text-sm">{con}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Courses</CardTitle>
                <CardDescription>
                  {courses.length} courses available in this stream
                </CardDescription>
              </CardHeader>
            </Card>

            {courses.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No courses available for this stream yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <Card key={course.id} className="border-2 hover:border-primary/50 transition-all">
                    <CardHeader>
                      <CardTitle className="text-xl">{course.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center text-sm text-muted-foreground mb-1">
                            <Clock className="h-4 w-4 mr-1" />
                            Duration
                          </div>
                          <p className="font-medium">{course.duration}</p>
                        </div>
                        <div>
                          <div className="flex items-center text-sm text-muted-foreground mb-1">
                            <FileText className="h-4 w-4 mr-1" />
                            Fees
                          </div>
                          <p className="font-medium">{course.fees}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Eligibility</p>
                        <Badge variant="outline">{course.eligibility}</Badge>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Career Roles:</p>
                        <div className="flex flex-wrap gap-2">
                          {course.careerRoles.slice(0, 4).map((role, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Colleges Tab */}
          <TabsContent value="colleges" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <CardTitle>Find Colleges</CardTitle>
                </div>
                <CardDescription>
                  Search for colleges offering courses in this stream
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Use our college finder to discover institutions in your area offering {stream.title} programs.
                </p>
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href={`/colleges?stream=${slug}`}>
                    Search Colleges in Your District
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle>Entrance Exams</CardTitle>
                </div>
                <CardDescription>
                  {exams.length} key competitive exams for admission
                </CardDescription>
              </CardHeader>
            </Card>

            {exams.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No entrance exams data available yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {exams.map((exam) => (
                  <Card 
                    key={exam.id}
                    className="border-2 hover:border-primary/50 transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold">{exam.name}</h3>
                            <Badge 
                              className="ml-2"
                              variant={
                                exam.difficulty === "Very High" ? "destructive" :
                                exam.difficulty === "High" ? "default" :
                                exam.difficulty === "Medium" ? "secondary" :
                                "outline"
                              }
                            >
                              {exam.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {exam.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Month: </span>
                              <span className="font-medium">{exam.month}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Eligibility: </span>
                              <span className="font-medium">{exam.eligibility}</span>
                            </div>
                          </div>
                        </div>
                        {exam.registrationLink && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={exam.registrationLink} target="_blank" rel="noopener noreferrer">
                              Registration
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-2">Need Exam Preparation Resources?</h3>
                <p className="text-muted-foreground mb-4">
                  Get study materials, mock tests, and expert guidance
                </p>
                <Button asChild size="lg">
                  <Link href="/contact">Contact for Guidance</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Salary Tab */}
          <TabsContent value="salary" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle>Salary Trends</CardTitle>
                </div>
                <CardDescription>
                  Expected salary ranges based on experience level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salaryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis 
                        tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="min" 
                        stroke="var(--color-chart-1)" 
                        strokeWidth={2}
                        name="Minimum"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="avg" 
                        stroke="var(--color-chart-2)" 
                        strokeWidth={3}
                        name="Average"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="max" 
                        stroke="var(--color-chart-3)" 
                        strokeWidth={2}
                        name="Maximum"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Salary Breakdown</CardTitle>
                <CardDescription>
                  Detailed salary information at different career stages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salaryData.map((data, index) => (
                    <div key={index} className="p-5 rounded-lg bg-muted/50 border">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-lg">{data.year}</h4>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">Minimum</p>
                          <p className="font-semibold text-chart-1">
                            ₹{(data.min / 100000).toFixed(1)} LPA
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Average</p>
                          <p className="font-semibold text-chart-2">
                            ₹{(data.avg / 100000).toFixed(1)} LPA
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Maximum</p>
                          <p className="font-semibold text-chart-3">
                            ₹{(data.max / 100000).toFixed(1)} LPA
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <p className="text-sm mb-4">
                  Want to compare salaries across different career paths?
                </p>
                <Button asChild variant="default">
                  <Link href="/salary-insights">
                    View Complete Salary Insights
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Pursue {stream.title}?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Get personalized guidance and start your journey today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Talk to Counselor</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href="/colleges">Find Colleges</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}