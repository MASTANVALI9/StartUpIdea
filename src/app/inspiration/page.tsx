"use client"

import { useState, useMemo, memo } from "react"
import Link from "next/link"
import { Search, Filter, Star, Users, Clock, GraduationCap, Quote } from "lucide-react"
import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RoleModelCard from "@/components/RoleModelCard"
import { roleModels, getRoleModelsByStream, type RoleModel } from "@/db/seeds/role-models"

// Memoized filter component for performance
const FilterSection = memo(({ 
  searchQuery, 
  setSearchQuery, 
  selectedStream, 
  setSelectedStream, 
  selectedBackground, 
  setSelectedBackground 
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStream: string;
  setSelectedStream: (stream: string) => void;
  selectedBackground: string;
  setSelectedBackground: (background: string) => void;
}) => {
  const streams = useMemo(() => Array.from(new Set(roleModels.map(rm => rm.stream))), []);
  const backgrounds = useMemo(() => Array.from(new Set(roleModels.map(rm => rm.background))), []);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Find Your Role Model
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or achievement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedStream} onValueChange={setSelectedStream}>
            <SelectTrigger>
              <SelectValue placeholder="All Streams" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Streams</SelectItem>
              {streams.map(stream => (
                <SelectItem key={stream} value={stream}>{stream}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedBackground} onValueChange={setSelectedBackground}>
            <SelectTrigger>
              <SelectValue placeholder="All Backgrounds" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Backgrounds</SelectItem>
              {backgrounds.map(background => (
                <SelectItem key={background} value={background}>{background}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
});

FilterSection.displayName = 'FilterSection';

// Memoized role model grid
const RoleModelGrid = memo(({ roleModels }: { roleModels: RoleModel[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {roleModels.map((roleModel) => (
      <RoleModelCard 
        key={roleModel.id} 
        roleModel={roleModel} 
        variant="detailed"
      />
    ))}
  </div>
));

RoleModelGrid.displayName = 'RoleModelGrid';

// Memoized stats component
const StatsSection = memo(({ count }: { count: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
    <Card>
      <CardContent className="p-4 text-center">
        <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
        <div className="text-2xl font-bold">{count}</div>
        <div className="text-sm text-muted-foreground">Role Models</div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4 text-center">
        <GraduationCap className="h-8 w-8 mx-auto mb-2 text-primary" />
        <div className="text-2xl font-bold">5</div>
        <div className="text-sm text-muted-foreground">Career Streams</div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4 text-center">
        <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
        <div className="text-2xl font-bold">15+</div>
        <div className="text-sm text-muted-foreground">Years Avg. to Success</div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4 text-center">
        <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
        <div className="text-2xl font-bold">18</div>
        <div className="text-sm text-muted-foreground">Avg. Starting Age</div>
      </CardContent>
    </Card>
  </div>
));

StatsSection.displayName = 'StatsSection';

export default function InspirationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStream, setSelectedStream] = useState("all");
  const [selectedBackground, setSelectedBackground] = useState("all");

  // Memoized filtered role models for performance
  const filteredRoleModels = useMemo(() => {
    return roleModels.filter(roleModel => {
      const matchesSearch = searchQuery === "" || 
        roleModel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roleModel.achievement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roleModel.currentPosition.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStream = selectedStream === "all" || roleModel.stream === selectedStream;
      const matchesBackground = selectedBackground === "all" || roleModel.background === selectedBackground;
      
      return matchesSearch && matchesStream && matchesBackground;
    });
  }, [searchQuery, selectedStream, selectedBackground]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      <div className="container px-4 py-12 md:py-20 mx-auto">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Badge className="mb-4" variant="outline">Get Inspired</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Success{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Stories
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Discover how ordinary people achieved extraordinary success. 
            Find your role model and start your journey to greatness.
          </p>
        </div>

        {/* Stats */}
        <StatsSection count={filteredRoleModels.length} />

        {/* Filters */}
        <FilterSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedStream={selectedStream}
          setSelectedStream={setSelectedStream}
          selectedBackground={selectedBackground}
          setSelectedBackground={setSelectedBackground}
        />

        {/* Results */}
        {filteredRoleModels.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {filteredRoleModels.length} Inspiring {filteredRoleModels.length === 1 ? 'Story' : 'Stories'}
              </h2>
              <p className="text-muted-foreground">
                Learn from their journeys and find the motivation to pursue your dreams.
              </p>
            </div>
            <RoleModelGrid roleModels={filteredRoleModels} />
          </>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No role models found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or browse all role models.
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedStream("all");
                setSelectedBackground("all");
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <Card className="mt-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2">
          <CardContent className="p-8 md:p-12 text-center">
            <Quote className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Success Story?
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Every successful person started somewhere. Your journey begins with a single step. 
              Explore career streams and find your path to greatness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/streams">Explore Career Streams</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get Guidance</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

