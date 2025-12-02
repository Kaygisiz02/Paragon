"use client"

import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

interface StatsCardProps {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  trendText?: string
  href: string
  gradient: string
  iconBg: string
  iconColor: string
  borderColor: string
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  trendText,
  href,
  gradient,
  iconBg,
  iconColor,
  borderColor
}: StatsCardProps) {
  return (
    <Link href={href} className="block">
      <Card className={`relative overflow-hidden ${gradient} ${borderColor} transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group`}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2.5 ${iconBg} rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg`}>
              <Icon className={`h-6 w-6 text-white ${iconColor}`} />
            </div>
            {trend && (
              <div className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-full border ${
                trend === "up" 
                  ? "text-green-600 bg-green-600/10 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-700"
                  : "text-red-600 bg-red-600/10 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-700"
              }`}>
                {trend === "up" ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          <p className="text-sm font-semibold text-muted-foreground mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold tracking-tight group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">{value}</p>
            {subtitle && (
              <span className="text-sm text-muted-foreground group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">{subtitle}</span>
            )}
          </div>
          {trendText && (
            <div className={`mt-4 flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg ${
              trend === "up" 
                ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/50"
                : "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/50"
            }`}>
              {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span className="font-medium">{trendText}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
