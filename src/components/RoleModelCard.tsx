"use client"

import { memo, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Quote, Star, Clock, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

export interface RoleModel {
  id: string;
  name: string;
  image: string;
  currentPosition: string;
  achievement: string;
  education: string;
  journeyHighlights: string[];
  quote: string;
  ageWhenStarted: number;
  yearsToSuccess: number;
  background: string;
  stream: string;
}

interface RoleModelCardProps {
  roleModel: RoleModel;
  variant?: 'compact' | 'detailed';
  className?: string;
}

// Memoized compact card for performance
const CompactRoleModelCard = memo(({ roleModel, className }: RoleModelCardProps) => (
  <Card className={cn("group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50", className)}>
    <CardHeader className="pb-3">
      <div className="flex items-center space-x-3">
        <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
          <Image
            src={roleModel.image}
            alt={roleModel.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform"
            sizes="48px"
            loading="lazy"
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<div class="w-full h-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">${roleModel.name.split(' ').map(n => n[0]).join('')}</div>`;
              }
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <CardTitle className="text-sm font-semibold truncate">{roleModel.name}</CardTitle>
          <p className="text-xs text-muted-foreground truncate">{roleModel.currentPosition}</p>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{roleModel.achievement}</p>
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="text-xs">
          {roleModel.stream}
        </Badge>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {roleModel.yearsToSuccess}y
        </div>
      </div>
    </CardContent>
  </Card>
))

CompactRoleModelCard.displayName = 'CompactRoleModelCard'

// Memoized detailed card with expandable content
const DetailedRoleModelCard = memo(({ roleModel, className }: RoleModelCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className={cn("group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={roleModel.image}
              alt={roleModel.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform"
              sizes="64px"
              loading="lazy"
              onError={(e) => {
                // Fallback to initials if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<div class="w-full h-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">${roleModel.name.split(' ').map(n => n[0]).join('')}</div>`;
                }
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-bold mb-1">{roleModel.name}</CardTitle>
            <p className="text-sm text-primary font-medium mb-2">{roleModel.currentPosition}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">{roleModel.achievement}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 p-3 bg-muted/50 rounded-lg">
          <div className="text-center">
            <GraduationCap className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
            <div className="text-xs font-medium">{roleModel.ageWhenStarted}</div>
            <div className="text-xs text-muted-foreground">Started</div>
          </div>
          <div className="text-center">
            <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
            <div className="text-xs font-medium">{roleModel.yearsToSuccess}y</div>
            <div className="text-xs text-muted-foreground">To Success</div>
          </div>
          <div className="text-center">
            <Star className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
            <div className="text-xs font-medium">{roleModel.background}</div>
            <div className="text-xs text-muted-foreground">Background</div>
          </div>
        </div>

        {/* Quote */}
        <div className="p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
          <Quote className="h-4 w-4 text-primary mb-2" />
          <p className="text-sm italic text-muted-foreground">"{roleModel.quote}"</p>
        </div>

        {/* Expandable Journey */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full justify-between"
          >
            <span>Their Journey</span>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {isExpanded && (
            <div className="mt-3 space-y-2">
              <div className="text-sm font-medium mb-2">Education:</div>
              <p className="text-sm text-muted-foreground mb-3">{roleModel.education}</p>
              
              <div className="text-sm font-medium mb-2">Key Milestones:</div>
              <ul className="space-y-1">
                {roleModel.journeyHighlights.map((highlight, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
})

DetailedRoleModelCard.displayName = 'DetailedRoleModelCard'

// Main component with performance optimization
const RoleModelCard = memo(({ roleModel, variant = 'detailed', className }: RoleModelCardProps) => {
  if (variant === 'compact') {
    return <CompactRoleModelCard roleModel={roleModel} className={className} />
  }
  
  return <DetailedRoleModelCard roleModel={roleModel} className={className} />
})

RoleModelCard.displayName = 'RoleModelCard'

export default RoleModelCard
