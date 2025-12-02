"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Target, BarChart3, PieChart, Wallet, Activity } from "lucide-react"
import { Category } from "@/hooks/useCategories"
import { cn } from "@/lib/utils"

interface CategoryStatsProps {
  expenseCategories: Category[]
  incomeCategories: Category[]
  loading?: boolean
}

export function CategoryStats({ expenseCategories, incomeCategories, loading }: CategoryStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const totalExpenses = expenseCategories.reduce((total, cat) => total + cat.totalAmount, 0)
  const totalIncome = incomeCategories.reduce((total, cat) => total + cat.totalAmount, 0)
  const netFlow = totalIncome - totalExpenses
  const highestExpense = expenseCategories.length > 0 
    ? expenseCategories.reduce((prev, current) => (prev.totalAmount > current.totalAmount) ? prev : current)
    : null
  const highestIncome = incomeCategories.length > 0 
    ? incomeCategories.reduce((prev, current) => (prev.totalAmount > current.totalAmount) ? prev : current)
    : null
  const avgExpensePerCategory = expenseCategories.length > 0 ? totalExpenses / expenseCategories.length : 0
  const avgIncomePerCategory = incomeCategories.length > 0 ? totalIncome / incomeCategories.length : 0
  const totalTransactions = expenseCategories.reduce((total, cat) => total + cat.transactionCount, 0) + 
                           incomeCategories.reduce((total, cat) => total + cat.transactionCount, 0)

  const stats = [
    {
      title: "Toplam Harcama",
      value: `₺${totalExpenses.toLocaleString()}`,
      subtitle: `${expenseCategories.length} kategori • ${totalTransactions} işlem`,
      icon: ShoppingCart,
      trend: "down" as const,
      color: "red",
      gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20"
    },
    {
      title: "Toplam Gelir",
      value: `₺${totalIncome.toLocaleString()}`,
      subtitle: `${incomeCategories.length} kategori • ${incomeCategories.reduce((sum, cat) => sum + cat.transactionCount, 0)} işlem`,
      icon: DollarSign,
      trend: "up" as const,
      color: "green",
      gradient: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
    },
    {
      title: "Net Akış",
      value: `${netFlow >= 0 ? "+" : ""}₺${Math.abs(netFlow).toLocaleString()}`,
      subtitle: netFlow >= 0 ? "Pozitif Akış" : "Negatif Akış",
      icon: TrendingUp,
      trend: netFlow >= 0 ? "up" as const : "down" as const,
      color: netFlow >= 0 ? "green" : "red",
      gradient: netFlow >= 0 
        ? "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
        : "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20"
    },
    {
      title: "En Yüksek Kategori",
      value: highestExpense ? highestExpense.name : "Yok",
      subtitle: highestExpense ? `₺${highestExpense.totalAmount.toLocaleString()} • ${highestExpense.transactionCount} işlem` : "Veri yok",
      icon: Target,
      trend: "neutral" as const,
      color: "blue",
      gradient: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
    },
    {
      title: "Ortalama Harcama",
      value: `₺${Math.round(avgExpensePerCategory).toLocaleString()}`,
      subtitle: "Kategori başına ortalama",
      icon: PieChart,
      trend: "neutral" as const,
      color: "purple",
      gradient: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20"
    },
    {
      title: "Ortalama Gelir",
      value: `₺${Math.round(avgIncomePerCategory).toLocaleString()}`,
      subtitle: "Kategori başına ortalama",
      icon: Wallet,
      trend: "neutral" as const,
      color: "orange",
      gradient: "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20"
    },
    {
      title: "Toplam İşlem",
      value: totalTransactions.toLocaleString(),
      subtitle: `${expenseCategories.length + incomeCategories.length} kategori`,
      icon: Activity,
      trend: "neutral" as const,
      color: "teal",
      gradient: "from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20"
    },
    {
      title: "En Yüksek Gelir",
      value: highestIncome ? highestIncome.name : "Yok",
      subtitle: highestIncome ? `₺${highestIncome.totalAmount.toLocaleString()} • ${highestIncome.transactionCount} işlem` : "Veri yok",
      icon: BarChart3,
      trend: "neutral" as const,
      color: "indigo",
      gradient: "from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className={cn(
          "relative overflow-hidden bg-gradient-to-br border-0 transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer",
          stat.gradient
        )}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 dark:bg-black/10" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className={cn(
                "p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg",
                stat.color === "red" && "bg-red-500 shadow-red-500/30",
                stat.color === "green" && "bg-green-500 shadow-green-500/30",
                stat.color === "blue" && "bg-blue-500 shadow-blue-500/30",
                stat.color === "purple" && "bg-purple-500 shadow-purple-500/30",
                stat.color === "orange" && "bg-orange-500 shadow-orange-500/30",
                stat.color === "teal" && "bg-teal-500 shadow-teal-500/30",
                stat.color === "indigo" && "bg-indigo-500 shadow-indigo-500/30"
              )}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              {stat.trend !== "neutral" && (
                <div className={cn(
                  "flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-full border",
                  stat.trend === "up" 
                    ? "text-green-600 bg-green-600/10 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-700"
                    : "text-red-600 bg-red-600/10 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-700"
                )}>
                  {stat.trend === "up" ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                </div>
              )}
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">{stat.title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold tracking-tight group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">{stat.value}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">{stat.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
