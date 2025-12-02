"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Lightbulb, 
  Target, 
  Zap,
  DollarSign,
  Calendar,
  Settings
} from "lucide-react"
import { Budget } from "@/hooks/useBudgets"

interface BudgetInsightsProps {
  budgets: Budget[]
  onOptimizeBudget?: (budgetId: string) => void
  onAdjustBudget?: (budgetId: string) => void
}

interface Insight {
  id: string
  type: "warning" | "opportunity" | "success" | "tip"
  title: string
  description: string
  budget?: Budget
  impact: "high" | "medium" | "low"
  action: string
  recommendation?: string
}

export function BudgetInsights({ budgets, onOptimizeBudget, onAdjustBudget }: BudgetInsightsProps) {
  const insights: Insight[] = []

  // Generate insights based on budget data
  budgets.forEach(budget => {
    // Over budget warnings
    if (budget.status === "over-budget") {
      insights.push({
        id: `over-${budget.id}`,
        type: "warning",
        title: "Budget Exceeded",
        description: `${budget.name} is ₺${(budget.spent - budget.limit).toLocaleString()} over budget with ${Math.ceil((new Date(budget.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining`,
        budget,
        impact: "high",
        action: "Adjust",
        recommendation: "Consider increasing the budget limit or reducing spending in this category"
      })
    }

    // Warning alerts
    if (budget.status === "warning") {
      insights.push({
        id: `warning-${budget.id}`,
        type: "warning",
        title: "Approaching Limit",
        description: `${budget.name} has used ${budget.percentage}% of budget and may exceed limit soon`,
        budget,
        impact: "medium",
        action: "Review",
        recommendation: "Monitor spending closely or consider adjusting the budget"
      })
    }

    // Spending too fast
    const daysPassed = Math.ceil((new Date().getTime() - new Date(budget.startDate).getTime()) / (1000 * 60 * 60 * 24))
    const totalDays = Math.ceil((new Date(budget.endDate).getTime() - new Date(budget.startDate).getTime()) / (1000 * 60 * 60 * 24))
    const expectedSpent = (daysPassed / totalDays) * budget.limit
    const spendingRate = (budget.spent / expectedSpent) * 100

    if (spendingRate > 120 && budget.status !== "over-budget") {
      insights.push({
        id: `fast-${budget.id}`,
        type: "warning",
        title: "Spending Too Fast",
        description: `${budget.name} spending is ${Math.round(spendingRate)}% faster than planned`,
        budget,
        impact: "medium",
        action: "Optimize",
        recommendation: "Reduce spending or adjust budget to avoid overspending"
      })
    }

    // Underutilized budgets (opportunity)
    if (budget.percentage < 50 && daysPassed > totalDays * 0.5) {
      insights.push({
        id: `underutilized-${budget.id}`,
        type: "opportunity",
        title: "Underutilized Budget",
        description: `${budget.name} has only used ${budget.percentage}% of budget with significant time remaining`,
        budget,
        impact: "medium",
        action: "Optimize",
        recommendation: "Consider reallocating funds to other categories or saving the difference"
      })
    }

    // Well-managed budgets (success)
    if (budget.status === "on-track" && budget.percentage >= 60 && budget.percentage <= 85) {
      insights.push({
        id: `success-${budget.id}`,
        type: "success",
        title: "Well Managed",
        description: `${budget.name} is on track with optimal spending patterns`,
        budget,
        impact: "low",
        action: "Maintain",
        recommendation: "Continue current spending habits for consistent results"
      })
    }
  })

  // Add general tips
  if (budgets.filter(b => b.status === "over-budget").length > 0) {
    insights.push({
      id: "general-tip-1",
      type: "tip",
      title: "Budget Review Needed",
      description: `${budgets.filter(b => b.status === "over-budget").length} budgets exceeded limits. Consider reviewing spending patterns.`,
      impact: "high",
      action: "Review All",
      recommendation: "Schedule a weekly budget review to stay on track"
    })
  }

  // Sort insights by impact and type
  insights.sort((a, b) => {
    const impactOrder = { high: 3, medium: 2, low: 1 }
    const typeOrder = { warning: 4, opportunity: 3, success: 2, tip: 1 }
    
    if (impactOrder[a.impact] !== impactOrder[b.impact]) {
      return impactOrder[b.impact] - impactOrder[a.impact]
    }
    
    return typeOrder[b.type] - typeOrder[a.type]
  })

  const getInsightColor = (type: string) => {
    switch (type) {
      case "warning": return "text-red-600 bg-red-50 border-red-200"
      case "opportunity": return "text-blue-600 bg-blue-50 border-blue-200"
      case "success": return "text-green-600 bg-green-50 border-green-200"
      case "tip": return "text-purple-600 bg-purple-50 border-purple-200"
      default: return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high": return <Badge variant="destructive">High Impact</Badge>
      case "medium": return <Badge variant="secondary">Medium Impact</Badge>
      case "low": return <Badge variant="outline">Low Impact</Badge>
      default: return null
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning": return AlertTriangle
      case "opportunity": return TrendingUp
      case "success": return Target
      case "tip": return Lightbulb
      default: return Zap
    }
  }

  const handleAction = (insight: Insight) => {
    if (insight.budget) {
      switch (insight.action) {
        case "Adjust":
          onAdjustBudget?.(insight.budget.id)
          break
        case "Optimize":
          onOptimizeBudget?.(insight.budget.id)
          break
        case "Review":
          // Handle review action
          break
        default:
          break
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          Budget Insights & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.length > 0 ? (
          <div className="space-y-4">
            {insights.map((insight) => {
              const Icon = getInsightIcon(insight.type)
              
              return (
                <div key={insight.id} className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{insight.title}</h4>
                          {getImpactBadge(insight.impact)}
                        </div>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                        
                        {insight.budget && (
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {insight.budget.category}
                            </Badge>
                            <span className="text-xs font-medium">
                              ₺{insight.budget.spent.toLocaleString()} / ₺{insight.budget.limit.toLocaleString()}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({insight.budget.percentage}%)
                            </span>
                          </div>
                        )}
                        
                        {insight.recommendation && (
                          <div className="p-2 bg-white/50 rounded text-xs">
                            <strong>Recommendation:</strong> {insight.recommendation}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction(insight)}
                      className="ml-2"
                    >
                      {insight.action}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No insights available at the moment</p>
            <p className="text-sm">Check back after more budget activity</p>
          </div>
        )}

        {/* Summary Stats */}
        {insights.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-xs text-muted-foreground">Warnings</span>
              </div>
              <span className="font-bold text-lg">
                {insights.filter(i => i.type === "warning").length}
              </span>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span className="text-xs text-muted-foreground">Opportunities</span>
              </div>
              <span className="font-bold text-lg">
                {insights.filter(i => i.type === "opportunity").length}
              </span>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target className="h-4 w-4 text-green-500" />
                <span className="text-xs text-muted-foreground">Success</span>
              </div>
              <span className="font-bold text-lg">
                {insights.filter(i => i.type === "success").length}
              </span>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Lightbulb className="h-4 w-4 text-purple-500" />
                <span className="text-xs text-muted-foreground">Tips</span>
              </div>
              <span className="font-bold text-lg">
                {insights.filter(i => i.type === "tip").length}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
