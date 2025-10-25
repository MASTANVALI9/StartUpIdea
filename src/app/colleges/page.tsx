"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, Search, Building2, Phone, Mail, ExternalLink, Star, GraduationCap, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface College {
  id: number
  name: string
  location: string
  district: string
  state: string
  stream: string
  type: string
  rating: number
  fees: string
  coursesOffered: string[]
  contact?: string
  email?: string
  website?: string
  affiliation: string
}

const collegesData = [
  {
    "id": 1,
    "name": "Govt Junior College, Kurnool (Town)",
    "district": "Kurnool",
    "state": "Andhra Pradesh",
    "type": "Government",
    "stream": "MPC, BiPC, CEC, HEC",
    "courses": ["Inter - Mathematics, Physics, Chemistry", "Inter - Botany, Zoology, Physics, Chemistry", "Inter - Civics, Economics, Commerce", "Inter - History, Economics, Civics"],
    "fees": "₹10,000–₹15,000/year",
    "rating": 3.8,
    "contact": "+91-8518-220410",
    "email": "principal.gjct.kurnool@gmail.com",
    "website": "http://bieap.gov.in/"
  },
  {
    "id": 2,
    "name": "Govt Junior College, Kurnool (Girls)",
    "district": "Kurnool",
    "state": "Andhra Pradesh",
    "type": "Government",
    "stream": "MPC, BiPC, CEC, HEC",
    "courses": ["Inter - Mathematics, Physics, Chemistry", "Inter - Botany, Zoology, Physics, Chemistry", "Inter - Civics, Economics, Commerce", "Inter - History, Economics, Civics"],
    "fees": "₹10,000–₹15,000/year",
    "rating": 3.9,
    "contact": "+91-8518-249540",
    "email": "principal.gjc.g.kurnool@gmail.com",
    "website": "http://bieap.gov.in/"
  },
  {
    "id": 3,
    "name": "Govt Junior College, Mantralayam",
    "district": "Kurnool",
    "state": "Andhra Pradesh",
    "type": "Government",
    "stream": "MPC, BiPC, CEC, HEC",
    "courses": ["Inter - Mathematics, Physics, Chemistry", "Inter - Botany, Zoology, Physics, Chemistry", "Inter - Civics, Economics, Commerce", "Inter - History, Economics, Civics"],
    "fees": "₹10,000–₹15,000/year",
    "rating": 3.7,
    "contact": "+91-8512-279555",
    "email": "principal.gjc.manthralayam@gmail.com",
    "website": "http://bieap.gov.in/"
  },
  {
    "id": 4,
    "name": "Govt Junior College, Midthur",
    "district": "Kurnool",
    "state": "Andhra Pradesh",
    "type": "Government",
    "stream": "MPC, BiPC, CEC, HEC",
    "courses": ["Inter - Mathematics, Physics, Chemistry", "Inter - Botany, Zoology, Physics, Chemistry", "Inter - Civics, Economics, Commerce", "Inter - History, Economics, Civics"],
    "fees": "₹10,000–₹15,000/year",
    "rating": 3.6,
    "contact": "+91-8513-258186",
    "email": "principal.gjc.midthur@gmail.com",
    "website": "http://bieap.gov.in/"
  },
  {
    "id": 5,
    "name": "Govt Vocational Junior College, Kurnool",
    "district": "Kurnool",
    "state": "Andhra Pradesh",
    "type": "Government",
    "stream": "Vocational",
    "courses": ["Inter - Vocational Courses in Various Streams"],
    "fees": "₹12,000–₹18,000/year",
    "rating": 4.0,
    "contact": "+91-99519-34957",
    "email": "info@govtvocationaljrcollegknl.com",
    "website": "https://govtvocationaljrcollegknl.com/"
  },
  {
    "id": 6,
    "name": "Narayana Junior College, Kurnool",
    "district": "Kurnool",
    "state": "Andhra Pradesh",
    "type": "Private",
    "stream": "MPC, BiPC, CEC, HEC",
    "courses": ["Inter - Mathematics, Physics, Chemistry", "Inter - Botany, Zoology, Physics, Chemistry", "Inter - Civics, Economics, Commerce", "Inter - History, Economics, Civics"],
    "fees": "₹45,000–₹90,000/year",
    "rating": 4.1,
    "contact": "+91-8518-234567",
    "email": "narayana.knl@college.edu",
    "website": "https://www.narayanagroup.com/"
  },
  {
    "id": 7,
    "name": "Sri Chaitanya Junior College, Kurnool",
    "district": "Kurnool",
    "state": "Andhra Pradesh",
    "type": "Private",
    "stream": "MPC, BiPC, CEC, HEC",
    "courses": ["Inter - Mathematics, Physics, Chemistry", "Inter - Botany, Zoology, Physics, Chemistry", "Inter - Civics, Economics, Commerce", "Inter - History, Economics, Civics"],
    "fees": "₹50,000–₹1,00,000/year",
    "rating": 4.2,
    "contact": "+91-8518-123456",
    "email": "srichaitanya.knl@college.edu",
    "website": "https://www.srichaitanya.net/"
  },
  {
    "id": 8,
    "name": "Masters Junior College, Kurnool",
    "district": "Kurnool",
    "state": "Andhra Pradesh",
    "type": "Private",
    "stream": "MPC, BiPC, CEC, HEC",
    "courses": ["Inter - Mathematics, Physics, Chemistry", "Inter - Botany, Zoology, Physics, Chemistry", "Inter - Civics, Economics, Commerce", "Inter - History, Economics, Civics"],
    "fees": "₹40,000–₹80,000/year",
    "rating": 4.0,
    "contact": "+91-8518-345678",
    "email": "masters.knl@college.edu",
    "website": "https://www.mastersjuniorcollege.com/"
  },
  {
    "id": 9,
    "name": "Srujana Junior College, Kurnool",
    "district": "Kurnool",
    "state": "Andhra Pradesh",
    "type": "Private",
    "stream": "MPC, BiPC, CEC, HEC",
    "courses": ["Inter - Mathematics, Physics, Chemistry", "Inter - Botany, Zoology, Physics, Chemistry", "Inter - Civics, Economics, Commerce", "Inter - History, Economics, Civics"],
    "fees": "₹35,000–₹70,000/year",
    "rating": 3.9,
    "contact": "+91-8518-456789",
    "email": "srujana.knl@college.edu",
    "website": "https://www.srujanajuniorcollege.com/"
  },
  {
    "id": 10,
    "name": "Rankridge IIT NEET & Jr College, Kurnool",
    "district": "Kurnool",
    "state": "Andhra Pradesh",
    "type": "Private",
    "stream": "MPC, BiPC, CEC, HEC",
    "courses": ["Inter - Mathematics, Physics, Chemistry", "Inter - Botany, Zoology, Physics, Chemistry", "Inter - Civics, Economics, Commerce", "Inter - History, Economics, Civics"],
    "fees": "₹60,000–₹1,20,000/year",
    "rating": 4.3,
    "contact": "+91-8518-567890",
    "email": "rankridge.knl@college.edu",
    "website": "https://www.rankridgejuniorcollege.com/"
  }
]


const states = ["All States", "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu"]
const districts = {
  "All States": ["All Districts"],
  "Maharashtra": ["All Districts", "Mumbai", "Pune"],
  "Delhi": ["All Districts", "Delhi"],
  "Karnataka": ["All Districts", "Bangalore"],
  "Tamil Nadu": ["All Districts", "Chennai", "Trichy"]
}
const streams = ["All Streams", "Engineering", "Commerce", "Arts", "Diploma", "ITI"]
const types = ["All Types", "Government", "Private"]

export default function CollegesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedState, setSelectedState] = useState("All States")
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts")
  const [selectedStream, setSelectedStream] = useState("All Streams")
  const [selectedType, setSelectedType] = useState("All Types")

  const availableDistricts = districts[selectedState as keyof typeof districts] || ["All Districts"]

  const filteredColleges = collegesData.filter((college) => {
    const matchesSearch = 
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.courses.some(course => course.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesState = selectedState === "All States" || college.state === selectedState
    const matchesDistrict = selectedDistrict === "All Districts" || college.district === selectedDistrict
    const matchesStream = selectedStream === "All Streams" || college.stream === selectedStream
    const matchesType = selectedType === "All Types" || college.type === selectedType
    
    return matchesSearch && matchesState && matchesDistrict && matchesStream && matchesType
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      
      <div className="container px-4 py-12 md:py-20 mx-auto">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Badge className="mb-4" variant="outline">
            <MapPin className="h-3 w-3 mr-1" />
            Find Colleges
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Find{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Local Colleges
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Search for colleges in your district with detailed information about courses, fees, and admission.
          </p>
        </div>

        {/* Search & Filters */}
        <Card className="mb-8 max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search Colleges
            </CardTitle>
            <CardDescription>
              Use filters to find colleges that match your preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by college name or course..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select 
                  value={selectedState} 
                  onValueChange={(value) => {
                    setSelectedState(value)
                    setSelectedDistrict("All Districts")
                  }}
                >
                  <SelectTrigger>
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger>
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDistricts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStream} onValueChange={setSelectedStream}>
                  <SelectTrigger>
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select Stream" />
                  </SelectTrigger>
                  <SelectContent>
                    {streams.map((stream) => (
                      <SelectItem key={stream} value={stream}>
                        {stream}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <Building2 className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-muted-foreground">
            Found <span className="font-semibold text-foreground">{filteredColleges.length}</span> colleges
            {selectedDistrict !== "All Districts" && ` in ${selectedDistrict}`}
          </p>
        </div>

        {/* College Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {filteredColleges.length > 0 ? (
            filteredColleges.map((college) => (
              <Card key={college.id} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{college.name}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline">
                          <MapPin className="h-3 w-3 mr-1" />
                          {college.district}, {college.state}
                        </Badge>
                        <Badge variant={college.type === "Government" ? "default" : "secondary"}>
                          {college.type}
                        </Badge>
                        <Badge variant="outline">{college.stream}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 bg-primary/10 px-2 py-1 rounded">
                      <Star className="h-4 w-4 text-primary fill-primary" />
                      <span className="font-semibold text-sm">{college.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Courses */}
                  <div>
                    <p className="text-sm font-semibold mb-2">Courses Offered:</p>
                    <div className="flex flex-wrap gap-2">
                      {college.courses.map((course, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Fees */}
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Annual Fees:</span>
                    <span className="text-lg font-bold text-primary">{college.fees}</span>
                  </div>

                  {/* Contact */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="h-4 w-4 mr-2" />
                      <a href={`tel:${college.contact}`} className="hover:text-primary">
                        {college.contact}
                      </a>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href={`mailto:${college.email}`} className="hover:text-primary truncate">
                        {college.email}
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" size="sm">
                      Contact College
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Colleges Found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search criteria
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("")
                  setSelectedState("All States")
                  setSelectedDistrict("All Districts")
                  setSelectedStream("All Streams")
                  setSelectedType("All Types")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>

        {/* Info Note */}
        <Card className="mt-12 max-w-5xl mx-auto bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <p className="text-sm text-center">
              <strong>Note:</strong> College information is regularly updated. Please contact colleges directly for the most current admission details, fees, and availability.
            </p>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="mt-12 max-w-5xl mx-auto bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Can't Find the Right College?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Get personalized college recommendations from our expert counselors
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Get Help</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href="/streams">Explore Career Streams</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
