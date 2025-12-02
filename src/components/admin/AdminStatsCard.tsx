"use client"

import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, Sparkles, ArrowUp, ArrowDown } from "lucide-react"

interface AdminStatsCardProps {
  title: string
  value: string
  change?: string
  trend?: "up" | "down" | "neutral"
  color?: string
  icon: LucideIcon
  loading?: boolean
  description?: string
  progress?: number
  subtitle?: string
}

export default function AdminStatsCard({
  title,
  value,
  change,
  trend = "neutral",
  color = "text-gray-400",
  icon: Icon,
  loading = false,
  description,
  progress,
  subtitle
}: AdminStatsCardProps) {
  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700 rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="space-y-4">
              <div className="h-4 bg-gray-700 rounded w-20"></div>
              <div className="h-8 bg-gray-700 rounded w-16"></div>
              <div className="h-4 bg-gray-700 rounded w-24"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-3 w-3" />
      case "down":
        return <ArrowDown className="h-3 w-3" />
      default:
        return <Minus className="h-3 w-3" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-400 bg-green-400/10"
      case "down":
        return "text-red-400 bg-red-400/10"
      default:
        return "text-gray-400 bg-gray-400/10"
    }
  }

  return (
    <Card className="bg-slate-700 border-slate-600 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-slate-500 group relative">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
            {subtitle && (
              <p className="text-slate-500 text-xs mb-2">{subtitle}</p>
            )}
            <div className="flex items-baseline gap-2">
              <p className="text-white text-2xl font-bold">{value}</p>
              {change && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTrendColor()}`}>
                  {getTrendIcon()}
                  <span>{change}</span>
                </div>
              )}
            </div>
            {description && (
              <p className="text-slate-500 text-xs mt-2">{description}</p>
            )}
          </div>
          
          {/* Icon Container */}
          <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
            trend === "up" ? "bg-green-500/10 text-green-400" :
            trend === "down" ? "bg-red-500/10 text-red-400" :
            "bg-slate-600 text-slate-400"
          }`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>

        {/* Progress Bar */}
        {progress !== undefined && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-400">Progress</span>
              <span className="text-xs text-slate-400">{progress}%</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-blue-600"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Sparkle Effect */}
        {trend === "up" && (
          <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Sparkles className="h-4 w-4 text-yellow-400" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
