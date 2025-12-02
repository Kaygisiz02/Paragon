"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Plus,
  Target,
  DollarSign,
  Trophy,
  TrendingUp,
  Activity
} from "lucide-react"

export function GoalsHeader({ 
  metrics
}: { metrics: any }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const formatNumber = (num: number) => {
    if (!isMounted) return num.toString()
    return num.toLocaleString()
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 p-6 group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">Paragon Goals</h1>
                <p className="text-sm text-muted-foreground">AI-powered goal tracking with smart insights</p>
              </div>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 hover:bg-background/80 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-green-600 group-hover:text-green-500 transition-colors duration-300" />
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">Total Saved</span>
                </div>
                <p className="text-xl font-bold text-green-600 group-hover:text-green-500 transition-colors duration-300">${formatNumber(metrics.totalSaved)}</p>
                <p className="text-xs text-muted-foreground">of ${formatNumber(metrics.totalTarget)}</p>
              </div>
              
              <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 hover:bg-background/80 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-4 w-4 text-primary group-hover:text-primary/80 transition-colors duration-300" />
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">Completed</span>
                </div>
                <p className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300">{metrics.completedGoals}</p>
                <p className="text-xs text-muted-foreground">goals achieved</p>
              </div>
              
              <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 hover:bg-background/80 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-blue-600 group-hover:text-blue-500 transition-colors duration-300" />
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">Monthly</span>
                </div>
                <p className="text-xl font-bold text-blue-600 group-hover:text-blue-500 transition-colors duration-300">${formatNumber(metrics.monthlyTotal)}</p>
                <p className="text-xs text-muted-foreground">auto-saved</p>
              </div>
              
              <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 hover:bg-background/80 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-purple-600 group-hover:text-purple-500 transition-colors duration-300" />
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">Progress</span>
                </div>
                <p className="text-xl font-bold text-purple-600 group-hover:text-purple-500 transition-colors duration-300">{metrics.overallProgress.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">overall completion</p>
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="flex lg:justify-end">
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-primary/30 px-6 group"
              onClick={() => {
                // Create goal functionality - open dialog
                const event = new CustomEvent('openGoalDialog', { bubbles: true })
                window.dispatchEvent(event)
              }}
            >
              <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Create Goal
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
