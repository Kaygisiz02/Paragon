"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Target, BarChart3, PieChart, TrendingUp as TrendingUpIcon, Activity, Zap, AlertTriangle } from "lucide-react"
import { Category } from "@/hooks/useCategories"
import { cn } from "@/lib/utils"

interface CategoryAnalyticsProps {
  expenseCategories: Category[]
  incomeCategories: Category[]
}

export function CategoryAnalytics({ expenseCategories, incomeCategories }: CategoryAnalyticsProps) {
  const totalExpenses = expenseCategories.reduce((sum, cat) => sum + cat.totalAmount, 0)
  const totalIncome = incomeCategories.reduce((sum, cat) => sum + cat.totalAmount, 0)
  const netFlow = totalIncome - totalExpenses

  // Calculate category distributions
  const expenseDistribution = expenseCategories.map(cat => ({
    name: cat.name,
    amount: cat.totalAmount,
    percentage: (cat.totalAmount / totalExpenses) * 100,
    color: cat.color,
    trend: cat.transactionCount > 50 ? "up" : cat.transactionCount > 20 ? "neutral" : "down",
    efficiency: cat.monthlyAverage > 0 ? (cat.totalAmount / (cat.monthlyAverage * 12)) * 100 : 0,
    risk: cat.totalAmount > totalExpenses * 0.3 ? "high" : cat.totalAmount > totalExpenses * 0.15 ? "medium" : "low",
    transactionCount: cat.transactionCount
  })).sort((a, b) => b.amount - a.amount)

  const incomeDistribution = incomeCategories.map(cat => ({
    name: cat.name,
    amount: cat.totalAmount,
    percentage: (cat.totalAmount / totalIncome) * 100,
    color: cat.color,
    trend: cat.transactionCount > 10 ? "up" : cat.transactionCount > 5 ? "neutral" : "down",
    stability: cat.transactionCount > 10 ? "stable" : cat.transactionCount > 5 ? "moderate" : "variable",
    growth: cat.monthlyAverage > 2000 ? "high" : cat.monthlyAverage > 1000 ? "moderate" : "low",
    transactionCount: cat.transactionCount
  })).sort((a, b) => b.amount - a.amount)

  // Calculate monthly trends and financial health
  const avgMonthlyExpense = totalExpenses / 12
  const avgMonthlyIncome = totalIncome / 12
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100
  const financialHealthScore = Math.min(100, Math.max(0, 
    (savingsRate * 2) + // 50% weight on savings
    (netFlow > 0 ? 20 : -10) + // 20% weight on positive cash flow
    (avgMonthlyIncome > avgMonthlyExpense * 1.5 ? 30 : 0) // 30% weight on income stability
  ))
  
  const budgetUtilization = (totalExpenses / (avgMonthlyIncome * 12)) * 100
  const investmentPotential = Math.max(0, avgMonthlyIncome - avgMonthlyExpense)

  return (
    <div className="space-y-8">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                Skor
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">{financialHealthScore.toFixed(0)}</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Finansal Sağlık Skoru</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">
                {savingsRate >= 20 ? "Mükemmel" : savingsRate >= 10 ? "İyi" : "Dikkat"}
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-green-900 dark:text-green-100">{savingsRate.toFixed(1)}%</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Tasarruf Oranı</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                Potansiyel
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100">₺{investmentPotential.toLocaleString()}</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">Yatırım Potansiyeli</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              <Badge className={cn(
                budgetUtilization > 90 ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" :
                budgetUtilization > 75 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300" :
                "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
              )}>
                {budgetUtilization > 90 ? "Kritik" : budgetUtilization > 75 ? "Yüksek" : "Normal"}
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-100">{budgetUtilization.toFixed(1)}%</h3>
            <p className="text-sm text-orange-700 dark:text-orange-300">Bütçe Kullanımı</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Distribution */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-red-500" />
              Harcama Dağılım Analizi
              <Badge variant="outline" className="ml-auto">
                {expenseCategories.length} Kategori
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {expenseDistribution.slice(0, 6).map((category, index) => (
              <div key={category.name} className="space-y-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{category.name}</span>
                      <div className="flex gap-1">
                        <Badge variant={category.trend === "up" ? "default" : category.trend === "neutral" ? "secondary" : "destructive"} className="text-xs">
                          {category.trend === "up" ? <TrendingUp className="h-3 w-3" /> : category.trend === "neutral" ? <BarChart3 className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        </Badge>
                        {category.risk === "high" && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Yüksek Risk
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold">₺{category.amount.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground ml-2">{category.percentage.toFixed(1)}%</span>
                  </div>
                </div>
                <Progress value={category.percentage} className="h-3" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Verimlilik: {category.efficiency.toFixed(0)}%</span>
                  <span>{category.transactionCount} işlem</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Finansal Özet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Net Akış</span>
                  <span className={cn(
                    "font-bold text-lg",
                    netFlow >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}>
                    {netFlow >= 0 ? "+" : ""}₺{netFlow.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Aylık Ortalama Gelir</span>
                  <span className="font-bold text-green-600 dark:text-green-400">₺{avgMonthlyIncome.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Aylık Ortalama Gider</span>
                  <span className="font-bold text-red-600 dark:text-red-400">₺{avgMonthlyExpense.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-indigo-500" />
                Performans Hedefleri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Bütçe Verimliliği</span>
                  <span className="text-sm font-semibold">{(100 - budgetUtilization).toFixed(1)}%</span>
                </div>
                <Progress value={100 - budgetUtilization} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tasarruf Hedefi</span>
                  <span className="text-sm font-semibold">{Math.min(100, savingsRate * 2).toFixed(1)}%</span>
                </div>
                <Progress value={Math.min(100, savingsRate * 2)} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Yatırım Oranı</span>
                  <span className="text-sm font-semibold">{Math.max(0, (investmentPotential / avgMonthlyIncome) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={Math.max(0, (investmentPotential / avgMonthlyIncome) * 100)} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
