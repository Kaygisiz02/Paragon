"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Calendar, 
  Download, 
  BarChart3,
  Target,
  DollarSign,
  Activity
} from "lucide-react"
import { useState } from "react"
import { Budget } from "@/hooks/useBudgets"

interface BudgetTrendsProps {
  budgets: Budget[]
  period?: "3months" | "6months" | "1year"
}

interface TrendData {
  month: string
  spent: number
  budgeted: number
  savings: number
  change: number
  trend: "up" | "down" | "stable"
}

export function BudgetTrends({ budgets, period = "6months" }: BudgetTrendsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<"3months" | "6months" | "1year">("6months")
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null)

  // Generate mock trend data - gerçek uygulamada API'den gelir
  const generateTrendData = (budgetId: string): TrendData[] => {
    const budget = budgets.find(b => b.id === budgetId)
    if (!budget) return []

    const months = selectedPeriod === "3months" ? 3 : selectedPeriod === "6months" ? 6 : 12
    const monthNames = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"]
    const baseSpent = budget.spent / (new Date().getDate() / 30) // Aylık ortalama
    
    return Array.from({ length: months }, (_, index) => {
      const monthIndex = (12 - months + index) % 12
      
      // Rastgele ama tutarlı trend oluştur
      const randomFactor = Math.sin(index * 0.3) * 0.2 + Math.random() * 0.15
      const spent = baseSpent * (1 + randomFactor)
      const budgeted = budget.limit
      const savings = Math.max(0, budgeted - spent)
      
      const prevSpent = index > 0 ? baseSpent * (1 + Math.sin((index - 1) * 0.3) * 0.2) : spent
      const change = ((spent - prevSpent) / prevSpent) * 100
      const trend = change > 5 ? "up" : change < -5 ? "down" : "stable"

      return {
        month: monthNames[monthIndex],
        spent: Math.round(spent),
        budgeted,
        savings: Math.round(savings),
        change: Math.round(change * 10) / 10,
        trend
      }
    })
  }

  const trendData = selectedBudget ? generateTrendData(selectedBudget) : []
  const selectedBudgetData = budgets.find(b => b.id === selectedBudget)

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-3 w-3 text-green-600" />
      case "down": return <TrendingDown className="h-3 w-3 text-red-600" />
      default: return <Minus className="h-3 w-3 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string, value: number) => {
    if (trend === "up") return "text-green-600"
    if (trend === "down") return "text-red-600"
    return "text-gray-600"
  }

  const maxAmount = Math.max(...trendData.map(d => Math.max(d.spent, d.budgeted)), 1)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-500" />
            Budget Trends & Analysis
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={selectedPeriod === "3months" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("3months")}
            >
              3 Ay
            </Button>
            <Button
              variant={selectedPeriod === "6months" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("6months")}
            >
              6 Ay
            </Button>
            <Button
              variant={selectedPeriod === "1year" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("1year")}
            >
              1 Yıl
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Budget Selection */}
        <div className="flex flex-wrap gap-2">
          {budgets.slice(0, 6).map((budget) => (
            <Button
              key={budget.id}
              variant={selectedBudget === budget.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedBudget(budget.id)}
            >
              {budget.name}
            </Button>
          ))}
        </div>

        {selectedBudget && trendData.length > 0 && (
          <div className="space-y-6">
            {/* Budget Info */}
            {selectedBudgetData && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{selectedBudgetData.name}</h3>
                  <Badge variant="outline">
                    {selectedBudgetData.category}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Current</p>
                    <p className="font-semibold">₺{selectedBudgetData.spent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Limit</p>
                    <p className="font-semibold">₺{selectedBudgetData.limit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <p className="font-semibold">{selectedBudgetData.status}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Trend Chart */}
            <div className="space-y-4">
              <h4 className="font-medium">Spending vs Budget Analysis</h4>
              <div className="relative h-64">
                <div className="absolute inset-0 flex items-end justify-between gap-2">
                  {trendData.map((data, index) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                      <div className="relative w-full flex flex-col items-center">
                        {/* Budget Bar */}
                        <div 
                          className="w-full bg-blue-200 rounded-t-sm"
                          style={{ 
                            height: `${(data.budgeted / maxAmount) * 100}%`,
                            minHeight: '2px'
                          }}
                        />
                        
                        {/* Spent Bar */}
                        <div 
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm"
                          style={{ 
                            height: `${(data.spent / maxAmount) * 100}%`,
                            minHeight: '4px'
                          }}
                        />
                        
                        {/* Value Labels */}
                        <div className="absolute -top-8 text-xs font-medium whitespace-nowrap">
                          ₺{(data.spent / 1000).toFixed(1)}K
                        </div>
                      </div>
                      
                      {/* Month Label */}
                      <span className="text-xs text-muted-foreground">{data.month}</span>
                      
                      {/* Trend Indicator */}
                      <div className="flex items-center gap-1">
                        {getTrendIcon(data.trend)}
                        <span className={`text-xs font-medium ${getTrendColor(data.trend, data.change)}`}>
                          {data.change > 0 ? "+" : ""}{data.change}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Spending Analysis */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Spending Analysis
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Spending</span>
                    <span className="font-semibold">
                      ₺{Math.round(trendData.reduce((sum, d) => sum + d.spent, 0) / trendData.length).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Highest Month</span>
                    <span className="font-semibold">
                      ₺{Math.max(...trendData.map(d => d.spent)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Lowest Month</span>
                    <span className="font-semibold">
                      ₺{Math.min(...trendData.map(d => d.spent)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Saved</span>
                    <span className="font-semibold text-green-600">
                      ₺{trendData.reduce((sum, d) => sum + d.savings, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Budget Performance */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Budget Performance
                </h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Budget Utilization</span>
                      <span className="font-medium">
                        {Math.round((trendData.reduce((sum, d) => sum + d.spent, 0) / trendData.reduce((sum, d) => sum + d.budgeted, 0)) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={Math.min((trendData.reduce((sum, d) => sum + d.spent, 0) / trendData.reduce((sum, d) => sum + d.budgeted, 0)) * 100, 100)} 
                      className="h-2" 
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Months Under Budget</span>
                    <span className="font-semibold text-green-600">
                      {trendData.filter(d => d.spent < d.budgeted).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Months Over Budget</span>
                    <span className="font-semibold text-red-600">
                      {trendData.filter(d => d.spent > d.budgeted).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Overall Trend</span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(trendData[trendData.length - 1]?.trend || "stable")}
                      <span className="font-semibold">
                        {trendData[trendData.length - 1]?.change > 0 ? "+" : ""}{trendData[trendData.length - 1]?.change}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">AI Recommendations</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Consider setting a monthly alert at 80% budget utilization</li>
                <li>• Your spending pattern shows seasonal variations - plan accordingly</li>
                <li>• Average monthly spending is {Math.round((trendData.reduce((sum, d) => sum + d.spent, 0) / trendData.length) / selectedBudgetData!.limit * 100)}% of budget</li>
                <li>• {trendData.filter(d => d.spent > d.budgeted).length > 0 ? `${trendData.filter(d => d.spent > d.budgeted).length} months exceeded budget - review spending patterns` : "Great job staying within budget limits!"}</li>
              </ul>
            </div>
          </div>
        )}

        {!selectedBudget && (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Select a budget to view detailed trends and analysis</p>
          </div>
        )}

        {/* Export Options */}
        {selectedBudget && (
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
