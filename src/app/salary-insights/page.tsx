"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { TrendingUp, Search, Filter, ArrowUpDown, DollarSign, Briefcase, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface Career {
  id: number
  career: string
  qualification: string
  stream: string
  avgSalary: string
  salaryNumeric: number
  jobType: string
  demand: string
  growthRate: string
}

export default function SalaryInsightsPage() {
  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStream, setSelectedStream] = useState("all")
  const [selectedDemand, setSelectedDemand] = useState("all")
  const [sortBy, setSortBy] = useState("salary")

  useEffect(() => {
    async function fetchCareers() {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (selectedStream !== "all") params.append("stream", selectedStream)
        if (selectedDemand !== "all") params.append("demand", selectedDemand)
        if (searchQuery) params.append("search", searchQuery)
        params.append("sort", sortBy === "career" ? "name" : "salary")
        
        const response = await fetch(`/api/careers?${params.toString()}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch career data')
        }
        
        const data = await response.json()
        setCareers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCareers()
  }, [selectedStream, selectedDemand, searchQuery, sortBy])

  const topCareersChart = careers
    .slice(0, 8)
    .map(career => ({
      name: career.career.split(' ')[0],
      salary: career.salaryNumeric / 100
    }))

  const chartConfig = {
    salary: { label: "Salary (LPA)", color: "hsl(var(--primary))" }
  }

  // Calculate stats
  const avgSalary = careers.length > 0 
    ? (careers.reduce((sum, c) => sum + c.salaryNumeric, 0) / careers.length / 100000).toFixed(1)
    : "0"
  
  const topGrowth = careers.length > 0
    ? Math.max(...careers.map(c => parseFloat(c.growthRate)))
    : 0

  const highDemandCount = careers.filter(c => c.demand === "High").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      
      <div className="container px-4 py-12 md:py-20 mx-auto">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Badge className="mb-4" variant="outline">
            <TrendingUp className="h-3 w-3 mr-1" />
            Career Insights
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Salary{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Explore real salary data across different career paths. Make informed decisions about your future.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg. Starting Salary
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <>
                  <div className="text-2xl font-bold">₹{avgSalary} LPA</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Across all streams
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Top Career Growth
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{topGrowth}%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Highest growth rate
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  High Demand Jobs
                </CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{highDemandCount}+</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    High demand careers
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <Card className="mb-12 max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle>Top Paying Careers</CardTitle>
            <CardDescription>
              Starting salaries comparison across popular careers
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : topCareersChart.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topCareersChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `₹${value}L`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="salary" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Filters & Table */}
        <Card className="max-w-7xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Career Salary Comparison
            </CardTitle>
            <CardDescription>
              Compare salaries across different careers, streams, and experience levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by career or education..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedStream} onValueChange={setSelectedStream}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Stream" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Streams</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="commerce">Commerce</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="iti">ITI</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDemand} onValueChange={setSelectedDemand}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Demand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Demand</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="career">Career Name</SelectItem>
                  <SelectItem value="salary">Salary (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Error State */}
            {error && (
              <div className="mb-6 p-4 border border-destructive rounded-lg bg-destructive/10">
                <p className="text-destructive text-sm">{error}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                >
                  Retry
                </Button>
              </div>
            )}

            {/* Table */}
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Career</TableHead>
                    <TableHead>Stream</TableHead>
                    <TableHead>Education</TableHead>
                    <TableHead className="text-right">Salary Range</TableHead>
                    <TableHead>Job Type</TableHead>
                    <TableHead>Demand</TableHead>
                    <TableHead className="text-right">Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    // Loading skeletons
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                      </TableRow>
                    ))
                  ) : careers.length > 0 ? (
                    careers.map((career) => (
                      <TableRow key={career.id}>
                        <TableCell className="font-medium">{career.career}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{career.stream}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {career.qualification}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {career.avgSalary}
                        </TableCell>
                        <TableCell className="text-sm">
                          {career.jobType}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              career.demand === "High" ? "default" :
                              career.demand === "Medium" ? "secondary" :
                              "outline"
                            }
                          >
                            {career.demand}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-green-600 font-medium">
                          +{career.growthRate}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No careers found matching your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-sm text-muted-foreground text-center">
              Showing {careers.length} careers
            </div>
          </CardContent>
        </Card>

        {/* Info Note */}
        <Card className="mt-12 max-w-5xl mx-auto bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <p className="text-sm text-center">
              <strong>Note:</strong> Salary figures are approximate and vary based on company, location, skills, and market conditions.
              These are average estimates for reference purposes.
            </p>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="mt-12 max-w-5xl mx-auto bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Need Personalized Career Guidance?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Talk to our expert counselors to find the best career path based on your interests and goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Book Consultation</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href="/streams">Explore Streams</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}