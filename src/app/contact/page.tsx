"use client"

import { useState } from "react"
import Link from "next/link"
import { Send, Mail, Phone, MapPin, Clock, MessageSquare, User, School } from "lucide-react"
import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    stream: "",
    message: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("https://formspree.io/f/movkkokd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        console.log("Form submitted successfully:", formData)
        setIsSubmitted(true)

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            name: "",
            email: "",
            phone: "",
            class: "",
            stream: "",
            message: ""
          })
        }, 3000)
      } else {
        console.error("Form submission failed:", response.statusText)
        alert("Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to send message. Please try again.")
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "mastanvali9339@gmail.com",
      link: "mailto:mastanvali9339@gmail.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91-9392245739",
      link: "tel:+919392245739"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Kurnool, Andhra Pradesh, India",
      link: "#"
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Mon-Sat: 9:00 AM - 6:00 PM",
      link: "#"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      <div className="container px-4 py-12 md:py-20 mx-auto">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Badge className="mb-4" variant="outline">
            <MessageSquare className="h-3 w-3 mr-1" />
            Get In Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Contact{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Our Team
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Have questions about your career path? Our expert counselors are here to help you make the right decision.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="h-16 w-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We'll contact you soon.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Full Name <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email Address <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Phone Number <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91-9876543210"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      {/* Class */}
                      <div className="space-y-2">
                        <Label htmlFor="class">
                          Current Class <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                          <School className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                          <Select 
                            value={formData.class} 
                            onValueChange={(value) => handleChange("class", value)}
                            required
                          >
                            <SelectTrigger className="pl-10">
                              <SelectValue placeholder="Select your class" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="class-9">Class 9</SelectItem>
                              <SelectItem value="class-10">Class 10</SelectItem>
                              <SelectItem value="class-11">Class 11</SelectItem>
                              <SelectItem value="class-12">Class 12</SelectItem>
                              <SelectItem value="passed-10">Passed 10th</SelectItem>
                              <SelectItem value="passed-12">Passed 12th</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Stream Interest */}
                    <div className="space-y-2">
                      <Label htmlFor="stream">
                        Interested Stream <span className="text-destructive">*</span>
                      </Label>
                      <Select 
                        value={formData.stream} 
                        onValueChange={(value) => handleChange("stream", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select stream you're interested in" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="science">Science (PCM/PCB)</SelectItem>
                          <SelectItem value="commerce">Commerce</SelectItem>
                          <SelectItem value="arts">Arts/Humanities</SelectItem>
                          <SelectItem value="diploma">Diploma Courses</SelectItem>
                          <SelectItem value="iti">ITI Courses</SelectItem>
                          <SelectItem value="government">Government Jobs</SelectItem>
                          <SelectItem value="undecided">Not Sure Yet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Your Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your questions, concerns, or what guidance you need..."
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        className="min-h-[150px] resize-none"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" size="lg" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Info Cards */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Reach out through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">{info.title}</p>
                      <p className="text-sm text-muted-foreground">{info.content}</p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Quick Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/streams">
                    <School className="mr-2 h-4 w-4" />
                    Explore Career Streams
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/salary-insights">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Salary Insights
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/colleges">
                    <MapPin className="mr-2 h-4 w-4" />
                    Find Colleges
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* FAQ Teaser */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-sm font-medium">When should I choose my stream?</p>
                  <p className="text-sm text-muted-foreground">
                    After 10th class, based on your interests and career goals.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Is counseling free?</p>
                  <p className="text-sm text-muted-foreground">
                    Yes! Our initial career guidance consultation is completely free.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="mt-12 max-w-5xl mx-auto bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Prefer to Chat Directly?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Schedule a one-on-one video consultation with our career counselors
            </p>
            <Button size="lg" variant="secondary">
              Book Video Consultation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
