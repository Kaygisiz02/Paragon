"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target, 
  DollarSign, 
  Calendar,
  PieChart,
  BarChart3,
  Zap
} from "lucide-react"
import { BudgetAnalytics as BudgetAnalyticsType } from "@/hooks/useBudgets"

interface BudgetAnalyticsProps {
  analytics: BudgetAnalyticsType
}

export function BudgetAnalytics({ analytics }: BudgetAnalyticsProps) {
  const savingsRate = analytics.totalBudgeted > 0 ? ((analytics.totalBudgeted - analytics.totalSpent) / analytics.totalBudgeted) * 100 : 0
  const budgetHealthScore = Math.max(0, 100 - (analytics.overBudgetCount * 20) - (analytics.warningCount * 10))
  const spendingEfficiency = analytics.totalBudgeted > 0 ? (analytics.totalSpent / analytics.totalBudgeted) * 100 : 0

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50"
    if (score >= 60) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-red-600 bg-red-50"
    if (efficiency >= 75) return "text-yellow-600 bg-yellow-50"
    return "text-green-600 bg-green-50"
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full -mr-12 -mt-12"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-blue-500 rounded-xl shadow-lg shadow-blue-500/30">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="text-blue-600 bg-blue-50">
                Total
              </Badge>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Total Budgeted</p>
            <p className="text-2xl font-bold tracking-tight text-blue-800">
              ₺{analytics.totalBudgeted.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Across {analytics.onTrackCount + analytics.warningCount + analytics.overBudgetCount} budgets
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full -mr-12 -mt-12"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-green-500 rounded-xl shadow-lg shadow-green-500/30">
                <TrendingDown className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="text-green-600 bg-green-50">
                Spent
              </Badge>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Total Spent</p>
            <p className="text-2xl font-bold tracking-tight text-green-800">
              ₺{analytics.totalSpent.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {spendingEfficiency.toFixed(1)}% of budget used
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full -mr-12 -mt-12"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-purple-500 rounded-xl shadow-lg shadow-purple-500/30">
                <Target className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="text-purple-600 bg-purple-50">
                Savings
              </Badge>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Savings Opportunity</p>
            <p className="text-2xl font-bold tracking-tight text-purple-800">
              ₺{analytics.savingsOpportunity.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {savingsRate.toFixed(1)}% savings rate
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full -mr-12 -mt-12"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/30">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className={getHealthColor(budgetHealthScore)}>
                Health
              </Badge>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Budget Health</p>
            <p className="text-2xl font-bold tracking-tight text-orange-800">
              {budgetHealthScore}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {analytics.atRiskBudgets.length} at risk
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-500" />
              Budget Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">On Track</span>
                  <Badge variant="outline" className="text-green-600 bg-green-50">
                    {analytics.onTrackCount}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  {analytics.onTrackCount > 0 ? Math.round((analytics.onTrackCount / (analytics.onTrackCount + analytics.warningCount + analytics.overBudgetCount)) * 100) : 0}%
                </span>
              </div>
              <Progress 
                value={analytics.onTrackCount > 0 ? (analytics.onTrackCount / (analytics.onTrackCount + analytics.warningCount + analytics.overBudgetCount)) * 100 : 0} 
                className="h-2" 
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">Warning</span>
                  <Badge variant="outline" className="text-yellow-600 bg-yellow-50">
                    {analytics.warningCount}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  {analytics.warningCount > 0 ? Math.round((analytics.warningCount / (analytics.onTrackCount + analytics.warningCount + analytics.overBudgetCount)) * 100) : 0}%
                </span>
              </div>
              <Progress 
                value={analytics.warningCount > 0 ? (analytics.warningCount / (analytics.onTrackCount + analytics.warningCount + analytics.overBudgetCount)) * 100 : 0} 
                className="h-2" 
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">Over Budget</span>
                  <Badge variant="outline" className="text-red-600 bg-red-50">
                    {analytics.overBudgetCount}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  {analytics.overBudgetCount > 0 ? Math.round((analytics.overBudgetCount / (analytics.onTrackCount + analytics.warningCount + analytics.overBudgetCount)) * 100) : 0}%
                </span>
              </div>
              <Progress 
                value={analytics.overBudgetCount > 0 ? (analytics.overBudgetCount / (analytics.onTrackCount + analytics.warningCount + analytics.overBudgetCount)) * 100 : 0} 
                className="h-2" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Spending Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              Spending Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Avg Rate</span>
                </div>
                <span className="font-bold text-lg">{analytics.averageSpendingRate.toFixed(1)}%</span>
                <p className="text-xs text-muted-foreground">spending rate</p>
              </div>
              
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Projected</span>
                </div>
                <span className="font-bold text-lg">₺{(analytics.projectedMonthlySpending / 1000).toFixed(1)}K</span>
                <p className="text-xs text-muted-foreground">monthly spend</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Spending Efficiency</span>
                <Badge variant="outline" className={getEfficiencyColor(spendingEfficiency)}>
                  {spendingEfficiency.toFixed(1)}%
                </Badge>
              </div>
              <Progress value={spendingEfficiency} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {spendingEfficiency < 75 ? "Great control over spending" : 
                 spendingEfficiency < 90 ? "Moderate spending" : 
                 "High spending - consider reducing"}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Budget Health Score</span>
                <Badge variant="outline" className={getHealthColor(budgetHealthScore)}>
                  {budgetHealthScore}/100
                </Badge>
              </div>
              <Progress value={budgetHealthScore} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {budgetHealthScore >= 80 ? "Excellent budget management" : 
                 budgetHealthScore >= 60 ? "Good budget management" : 
                 "Needs attention - review budgets"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* At Risk Budgets */}
      {analytics.atRiskBudgets.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              At Risk Budgets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.atRiskBudgets.map((budget) => (
                <div key={budget.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{budget.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {budget.percentage}% used • ₺{budget.spent.toLocaleString()} / ₺{budget.limit.toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline" className={
                    budget.status === "over-budget" ? "text-red-600 bg-red-50" : "text-yellow-600 bg-yellow-50"
                  }>
                    {budget.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
