"use client"

import Link from "next/link"
import { useState, memo } from "react"
import { Menu, X, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/streams", label: "Career Streams" },
  { href: "/salary-insights", label: "Salary Insights" },
  { href: "/colleges", label: "Find Colleges" },
  { href: "/contact", label: "Contact" },
]

// Memoized Nav Link Component
const NavLink = memo(({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="text-sm font-medium transition-colors hover:text-primary"
  >
    {label}
  </Link>
))

NavLink.displayName = 'NavLink'

// Memoized Mobile Nav Link Component
const MobileNavLink = memo(({ href, label, onClick }: { href: string; label: string; onClick: () => void }) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-lg font-medium transition-colors hover:text-primary py-2"
  >
    {label}
  </Link>
))

MobileNavLink.displayName = 'MobileNavLink'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <GraduationCap className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CareerPath
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
          <Button size="sm" className="ml-4">Get Started</Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-8">
              {navLinks.map((link) => (
                <MobileNavLink 
                  key={link.href} 
                  href={link.href} 
                  label={link.label}
                  onClick={() => setIsOpen(false)}
                />
              ))}
              <Button className="mt-4">Get Started</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}