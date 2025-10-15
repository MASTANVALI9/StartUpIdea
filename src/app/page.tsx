"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, TrendingUp, BookOpen, Users, ArrowRight, Sparkles } from "lucide-react"
import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  const features = [
    {
      icon: BookOpen,
      title: "Explore Career Streams",
      description: "Discover 5 major career paths including Science, Commerce, Arts, Diploma, ITI, Vocational, and Government Jobs",
      link: "/streams"
    },
    {
      icon: TrendingUp,
      title: "Salary Insights",
      description: "Get real data on career salaries, growth potential, and job market trends",
      link: "/salary-insights"
    },
    {
      icon: Users,
      title: "Find Local Colleges",
      description: "Search colleges in your district with course details and admission info",
      link: "/colleges"
    }
  ]

  const popularCareers = [
    "Engineering", "Medical", "Commerce", "Arts", "ITI", "Diploma", "Government Jobs", "Law"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container px-4 py-20 md:py-32 mx-auto">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Your Future Starts Here</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Career Path
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Complete career guidance for 10th class students. Explore streams, understand salary potential, 
            and find the perfect college near you.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search careers, colleges, or courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg rounded-full border-2"
              />
              <Button size="lg" className="absolute right-1 rounded-full">
                Search
              </Button>
            </div>
            
            {/* Popular Searches */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {popularCareers.slice(0, 4).map((career) => (
                <Link
                  key={career}
                  href={`/streams`}
                  className="text-sm px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                >
                  {career}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/streams">
                Explore Career Streams
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/salary-insights">View Salary Data</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-20 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Plan Your Future
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools and information to make informed career decisions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="w-full justify-between group">
                  <Link href={feature.link}>
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-20 mx-auto">
        <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <CardContent className="p-12 md:p-16 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have found their perfect career path with our guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <Link href="/streams">Get Started Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 mt-20">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">CareerPath</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering students to make informed career decisions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/streams" className="hover:text-primary">Career Streams</Link></li>
                <li><Link href="/salary-insights" className="hover:text-primary">Salary Insights</Link></li>
                <li><Link href="/colleges" className="hover:text-primary">Find Colleges</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Study Tips</Link></li>
                <li><Link href="#" className="hover:text-primary">Exam Preparation</Link></li>
                <li><Link href="#" className="hover:text-primary">Career Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/contact" className="hover:text-primary">Get in Touch</Link></li>
                <li><Link href="#" className="hover:text-primary">Support</Link></li>
                <li><Link href="#" className="hover:text-primary">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CareerPath. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}