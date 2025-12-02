"use client"

import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Zap,
  TrendingUp,
  TrendingDown
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SettingsCardProps {
  title: string
  description?: string
  icon?: React.ReactNode
  badge?: string | React.ReactNode
  status?: "complete" | "warning" | "error" | "info" | "neutral"
  progress?: number
  children?: ReactNode
  action?: {
    label: string
    href?: string
    onClick?: () => void
    variant?: "default" | "outline" | "secondary" | "ghost" | "destructive"
  }
  className?: string
  hoverable?: boolean
  gradient?: boolean
}

export function SettingsCard({
  title,
  description,
  icon,
  badge,
  status = "neutral",
  progress,
  children,
  action,
  className,
  hoverable = true,
  gradient = false
}: SettingsCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return {
          bg: "bg-green-50 dark:bg-green-950/20",
          border: "border-green-200 dark:border-green-800",
          text: "text-green-600 dark:text-green-400",
          icon: <CheckCircle className="h-4 w-4" />
        }
      case "warning":
        return {
          bg: "bg-yellow-50 dark:bg-yellow-950/20",
          border: "border-yellow-200 dark:border-yellow-800",
          text: "text-yellow-600 dark:text-yellow-400",
          icon: <AlertTriangle className="h-4 w-4" />
        }
      case "error":
        return {
          bg: "bg-red-50 dark:bg-red-950/20",
          border: "border-red-200 dark:border-red-800",
          text: "text-red-600 dark:text-red-400",
          icon: <AlertTriangle className="h-4 w-4" />
        }
      case "info":
        return {
          bg: "bg-blue-50 dark:bg-blue-950/20",
          border: "border-blue-200 dark:border-blue-800",
          text: "text-blue-600 dark:text-blue-400",
          icon: <Info className="h-4 w-4" />
        }
      default:
        return {
          bg: "bg-gray-50 dark:bg-gray-900/20",
          border: "border-gray-200 dark:border-gray-700",
          text: "text-gray-600 dark:text-gray-400",
          icon: null
        }
    }
  }

  const statusColors = getStatusColor(status)

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300",
      hoverable && "hover:scale-105 hover:shadow-lg cursor-pointer",
      gradient && "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20",
      status !== "neutral" && `${statusColors.bg} ${statusColors.border} border-2`,
      className
    )}>
      {/* Status indicator */}
      {status !== "neutral" && (
        <div className="absolute top-4 right-4">
          <div className={cn(
            "p-1.5 rounded-full border-2",
            statusColors.bg,
            statusColors.border
          )}>
            <div className={statusColors.text}>
              {statusColors.icon}
            </div>
          </div>
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            {icon && (
              <div className={cn(
                "p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-md",
                statusColors.bg,
                statusColors.text
              )}>
                {icon}
              </div>
            )}
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2 text-lg">
                {title}
                {badge && (
                  typeof badge === "string" ? (
                    <Badge variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ) : (
                    badge
                  )
                )}
              </CardTitle>
              {description && (
                <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground dark:text-gray-400">
              <span>İlerleme</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {children}

        {action && (
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            {action.href ? (
              <Button 
                variant={action.variant || "outline"} 
                size="sm" 
                className="w-full group"
                asChild
              >
                <Link href={action.href}>
                  <div className="flex items-center justify-center gap-2">
                    <span>{action.label}</span>
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </Button>
            ) : (
              <Button 
                variant={action.variant || "outline"} 
                size="sm" 
                className="w-full"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface SettingsQuickActionProps {
  title: string
  description: string
  icon: React.ReactNode
  href?: string
  onClick?: () => void
  priority?: "high" | "medium" | "low"
  badge?: string
  color?: string
}

export function SettingsQuickAction({
  title,
  description,
  icon,
  href,
  onClick,
  priority = "medium",
  badge,
  color = "primary"
}: SettingsQuickActionProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return {
          bg: "bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50",
          text: "text-red-600 dark:text-red-400",
          border: "border-red-200 dark:border-red-800"
        }
      case "medium":
        return {
          bg: "bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-900/50",
          text: "text-yellow-600 dark:text-yellow-400",
          border: "border-yellow-200 dark:border-yellow-800"
        }
      case "low":
        return {
          bg: "bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50",
          text: "text-green-600 dark:text-green-400",
          border: "border-green-200 dark:border-green-800"
        }
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-900/30 hover:bg-gray-200 dark:hover:bg-gray-900/50",
          text: "text-gray-600 dark:text-gray-400",
          border: "border-gray-200 dark:border-gray-700"
        }
    }
  }

  const priorityColors = getPriorityColor(priority)

  return (
    <Button
      variant="outline"
      className={cn(
        "w-full justify-start h-auto p-4 group transition-all duration-300 hover:scale-105 hover:shadow-md",
        priorityColors.bg,
        priorityColors.border
      )}
      asChild={!!href}
      onClick={onClick}
    >
      {href ? (
        <Link href={href}>
          <div className="flex items-center gap-3 w-full">
            <div className={cn(
              "p-2 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-md",
              priorityColors.bg
            )}>
              <div className={priorityColors.text}>
                {icon}
              </div>
            </div>
            <div className="text-left flex-1">
              <div className="font-medium text-sm transition-colors duration-300 group-hover:text-primary">
                {title}
              </div>
              <div className="text-xs text-muted-foreground dark:text-gray-400 transition-colors duration-300 group-hover:text-foreground dark:group-hover:text-gray-300">
                {description}
              </div>
            </div>
            {badge && (
              <Badge variant="secondary" className="text-xs">
                {badge}
              </Badge>
            )}
            <ChevronRight className="w-4 h-4 text-muted-foreground dark:text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
          </div>
        </Link>
      ) : (
        <div className="flex items-center gap-3 w-full">
          <div className={cn(
            "p-2 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-md",
            priorityColors.bg
          )}>
            <div className={priorityColors.text}>
              {icon}
            </div>
          </div>
          <div className="text-left flex-1">
            <div className="font-medium text-sm transition-colors duration-300 group-hover:text-primary">
              {title}
            </div>
            <div className="text-xs text-muted-foreground dark:text-gray-400 transition-colors duration-300 group-hover:text-foreground dark:group-hover:text-gray-300">
              {description}
            </div>
          </div>
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
      )}
    </Button>
  )
}

interface SettingsMetricProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  trend?: "up" | "down" | "neutral"
  color?: string
  bgColor?: string
}

export function SettingsMetric({
  title,
  value,
  subtitle,
  icon,
  trend = "neutral",
  color = "text-primary",
  bgColor = "bg-muted"
}: SettingsMetricProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />
      default:
        return null
    }
  }

  return (
    <div className={cn(
      "p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg",
      bgColor,
      "border-gray-200 dark:border-gray-700"
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className={cn("p-2 rounded-lg", bgColor)}>
          <div className={color}>
            {icon}
          </div>
        </div>
        {getTrendIcon(trend)}
      </div>
      <div className="text-2xl font-bold text-foreground dark:text-white mb-1">
        {value}
      </div>
      <div className="text-sm text-muted-foreground dark:text-gray-400">
        {title}
      </div>
      {subtitle && (
        <div className="text-xs text-muted-foreground dark:text-gray-500 mt-1">
          {subtitle}
        </div>
      )}
    </div>
  )
}
