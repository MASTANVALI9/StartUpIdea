"use client"

import Link from "next/link"
import Image from "next/image"
import { Microscope, Calculator, Palette, Wrench, Briefcase, Award, ArrowRight, Users, Clock, TrendingUp } from "lucide-react"
import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState, memo, useMemo } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { getFeaturedRoleModel } from "@/db/seeds/role-models"
import RoleModelCard from "@/components/RoleModelCard"

const iconMap: Record<string, any> = {
  FlaskConical: Microscope,
  TrendingUp: Calculator,
  BookOpen: Palette,
  GraduationCap: Award,
  Wrench: Wrench,
  Building2: Briefcase
}

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
}

// Memoized Stream Card Component
const StreamCard = memo(({ stream }: { stream: Stream }) => {
  const IconComponent = iconMap[stream.icon] || Microscope
  const featuredRoleModel = getFeaturedRoleModel(stream.title)
              
              return (
                <Card 
                  className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 overflow-hidden"
                >
                  <CardHeader className={`bg-${stream.color.split('-')[1]}-50 dark:bg-${stream.color.split('-')[1]}-950/30 pb-6`}>
                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${stream.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-1">{stream.title}</CardTitle>
                    <CardDescription className="text-base font-medium">
                      {stream.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-6 min-h-[60px]">
                      {stream.description}
                    </p>

        {/* Featured Role Model */}
        {featuredRoleModel && (
          <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-3 mb-2">
              <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted">
                <Image
                  src={featuredRoleModel.image}
                  alt={featuredRoleModel.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">${featuredRoleModel.name.split(' ').map(n => n[0]).join('')}</div>`;
                    }
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-primary">{featuredRoleModel.name}</p>
                <p className="text-xs text-muted-foreground truncate">{featuredRoleModel.currentPosition}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">"{featuredRoleModel.quote}"</p>
          </div>
        )}

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-muted/50 rounded-lg">
                      <div className="text-center">
                        <TrendingUp className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <div className="text-xs font-medium">{stream.averageSalary}</div>
                        <div className="text-xs text-muted-foreground">Salary</div>
                      </div>
                      <div className="text-center">
                        <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <div className="text-xs font-medium">{stream.duration}</div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                      <div className="text-center">
                        <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <div className="text-xs font-medium">{stream.popularity}</div>
                        <div className="text-xs text-muted-foreground">Demand</div>
                      </div>
                    </div>

                    {/* Career Paths */}
                    <div className="mb-6">
                      <div className="text-sm font-semibold mb-2">Popular Paths:</div>
                      <div className="flex flex-wrap gap-2">
                        {stream.paths.slice(0, 5).map((path) => (
                          <Badge key={path} variant="secondary" className="text-xs">
                            {path}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      asChild 
                      className="w-full group-hover:shadow-lg transition-shadow"
                    >
                      <Link href={`/streams/${stream.slug}`}>
                        Explore Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
})

StreamCard.displayName = 'StreamCard'

// Memoized Loading Skeleton
const LoadingSkeleton = memo(() => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <Card key={i} className="overflow-hidden">
        <CardHeader className="pb-6">
          <Skeleton className="h-16 w-16 rounded-2xl mb-4" />
          <Skeleton className="h-7 w-3/4 mb-2" />
          <Skeleton className="h-5 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-6" />
          <Skeleton className="h-24 w-full mb-6" />
          <Skeleton className="h-20 w-full mb-6" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    ))}
  </div>
))

LoadingSkeleton.displayName = 'LoadingSkeleton'

export default function StreamsPage() {
  const [streams, setStreams] = useState<Stream[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStreams() {
      try {
        setLoading(true)
        const response = await fetch('/api/streams')
        
        if (!response.ok) {
          throw new Error('Failed to fetch streams')
        }
        
        const data = await response.json()
        setStreams(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchStreams()
  }, [])

  // Memoize the streams grid to prevent unnecessary re-renders
  const streamsGrid = useMemo(() => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
      {streams.map((stream) => (
        <StreamCard key={stream.id} stream={stream} />
      ))}
    </div>
  ), [streams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      <div className="container px-4 py-12 md:py-20 mx-auto">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Badge className="mb-4" variant="outline">Choose Your Path</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Explore Career{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Streams
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Discover the perfect career path based on your interests, skills, and aspirations. 
            Each stream offers unique opportunities and growth potential.
          </p>
        </div>

        {/* Loading State */}
        {loading && <LoadingSkeleton />}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto text-center py-12">
            <Card className="border-destructive">
              <CardContent className="pt-6">
                <p className="text-destructive text-lg mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Career Stream Cards */}
        {!loading && !error && streams.length > 0 && streamsGrid}

        {/* Info Section */}
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Not Sure Which Stream to Choose?
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Take our career assessment test or speak with our guidance counselors to find the perfect path for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Talk to Counselor</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/salary-insights">Compare Salaries</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}