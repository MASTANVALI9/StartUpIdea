"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">

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
        {loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading streams...</p>
          </div>
        )}

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
        {!loading && !error && streams.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
            {streams.map((stream) => (
              <Card key={stream.id} className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl mb-1">{stream.title}</CardTitle>
                  <CardDescription className="text-base font-medium">
                    {stream.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {stream.description}
                  </p>
                  <Button asChild className="w-full">
                    <Link href={`/streams/${stream.slug}`}>
                      Explore Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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
