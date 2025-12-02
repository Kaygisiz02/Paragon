"use client"

import { useMemo, useState, useEffect } from "react"
import { TrendingUp, TrendingDown, BarChart3, PieChart, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Transaction } from "./TransactionAnalytics"

interface TransactionChartProps {
  transactions: Transaction[]
  period: "week" | "month" | "quarter" | "year"
}

interface ChartData {
  name: string
  income: number
  expense: number
  net: number
}

interface CategoryData {
  category: string
  amount: number
  percentage: number
  color: string
}

export function TransactionChart({ transactions, period }: TransactionChartProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const chartData = useMemo(() => {
    // Group transactions by date/period
    const grouped: { [key: string]: ChartData } = {}
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date)
      let key = ""
      
      switch (period) {
        case "week":
          // Use consistent week names instead of locale-dependent
          const dayIndex = date.getDay()
          const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
          key = weekDays[dayIndex]
          break
        case "month":
          // Use consistent month/day format
          key = `${date.getMonth() + 1}/${date.getDate()}`
          break
        case "quarter":
          key = `Week ${Math.ceil((date.getDate() / 7))}`
          break
        case "year":
          // Use month numbers instead of locale names
          key = `${date.getMonth() + 1}/${date.getDate()}`
          break
      }
      
      if (!grouped[key]) {
        grouped[key] = { name: key, income: 0, expense: 0, net: 0 }
      }
      
      if (transaction.type === 'income') {
        grouped[key].income += transaction.amount
      } else {
        grouped[key].expense += Math.abs(transaction.amount)
      }
      
      grouped[key].net = grouped[key].income - grouped[key].expense
    })
    
    return Object.values(grouped).slice(-7) // Last 7 periods
  }, [transactions, period])

  const categoryData = useMemo(() => {
    const categoryTotals: { [key: string]: number } = {}
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + Math.abs(transaction.amount)
      })
    
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500'
    ]
    
    return Object.entries(categoryTotals)
      .map(([category, amount], index) => ({
        category,
        amount,
        percentage: totalExpense > 0 ? (amount / totalExpense) * 100 : 0,
        color: colors[index % colors.length]
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)
  }, [transactions])

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  
  const netAmount = totalIncome - totalExpense
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="space-y-6">
        {/* Summary Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-muted rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-20 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-muted rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-32 animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-muted rounded w-16 animate-pulse"></div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2 animate-pulse"></div>
                      <div className="flex-1 bg-muted rounded-full h-2 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-32 animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-muted rounded w-24 animate-pulse"></div>
                    <div className="h-2 bg-muted rounded-full animate-pulse"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-lg font-semibold text-green-600">+₺{totalIncome.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Expense</p>
              <p className="text-lg font-semibold text-red-600">-₺{totalExpense.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 ${netAmount >= 0 ? 'bg-blue-100' : 'bg-orange-100'} rounded-full flex items-center justify-center`}>
              {netAmount >= 0 ? (
                <BarChart3 className="h-5 w-5 text-blue-600" />
              ) : (
                <TrendingDown className="h-5 w-5 text-orange-600" />
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Net Amount</p>
              <p className={`text-lg font-semibold ${netAmount >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                {netAmount >= 0 ? '+' : ''}₺{netAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 ${savingsRate >= 20 ? 'bg-green-100' : 'bg-yellow-100'} rounded-full flex items-center justify-center`}>
              <PieChart className={`h-5 w-5 ${savingsRate >= 20 ? 'text-green-600' : 'text-yellow-600'}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Savings Rate</p>
              <p className={`text-lg font-semibold ${savingsRate >= 20 ? 'text-green-600' : 'text-yellow-600'}`}>
                {savingsRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Cash Flow Trend</CardTitle>
              <Badge variant="outline" className="gap-1">
                <Calendar className="h-3 w-3" />
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chartData.map((item, index) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className={`font-semibold ${item.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.net >= 0 ? '+' : ''}₺{item.net.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-green-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((item.income / Math.max(...chartData.map(d => d.income))) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-red-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((item.expense / Math.max(...chartData.map(d => d.expense))) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Income: ₺{item.income.toLocaleString()}</span>
                    <span>Expense: ₺{item.expense.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Expense</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Top Categories</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((item, index) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                      <span className="font-medium text-sm">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">₺{item.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{item.percentage.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className={`${item.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {categoryData.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <PieChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No expense data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
