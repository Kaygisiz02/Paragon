"use client"

import { StatsCard } from "@/components/dashboard/StatsCard"
import { useCategories } from "@/hooks/useCategories"
import { ShoppingCart, TrendingUp, DollarSign, AlertTriangle } from "lucide-react"

export function QuickStatsGrid() {
  const { 
    expenseCategories, 
    incomeCategories, 
    loading, 
    getHighestIncomeCategory, 
    getHighestExpenseCategory,
    getTotalExpenses 
  } = useCategories()

  const highestIncome = getHighestIncomeCategory()
  const highestExpense = getHighestExpenseCategory()
  const totalExpenses = getTotalExpenses()

  const quickStats = [
    {
      title: "En Çok Harcama",
      value: highestExpense?.name || "Yükleniyor...",
      icon: ShoppingCart,
      trend: "neutral" as const,
      trendValue: `${Math.round((highestExpense?.totalAmount || 0) / totalExpenses * 100)}%`,
      trendText: `₺${highestExpense?.totalAmount.toLocaleString() || "0"}.00`,
      href: "/categories",
      gradient: "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20",
      iconBg: "bg-red-500",
      iconColor: "",
      borderColor: "border-red-200 dark:border-red-800"
    },
    {
      title: "En Yüksek Gelir",
      value: highestIncome?.name || "Yükleniyor...",
      icon: TrendingUp,
      trend: "up" as const,
      trendValue: "Stabil",
      trendText: `₺${highestIncome?.totalAmount.toLocaleString() || "0"}.00`,
      href: "/categories",
      gradient: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      iconBg: "bg-green-500",
      iconColor: "",
      borderColor: "border-green-200 dark:border-green-800"
    },
    {
      title: "Döviz Getirisi",
      value: "+₺450.00",
      icon: DollarSign,
      trend: "up" as const,
      trendValue: "+2.4%",
      trendText: "Bu ay",
      href: "/dashboard/assets",
      gradient: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      iconBg: "bg-blue-500",
      iconColor: "",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      title: "Bütçe Uyarısı",
      value: "2 kategori",
      icon: AlertTriangle,
      trend: "down" as const,
      trendValue: "Dikkat",
      trendText: "%80 üzeri",
      href: "/dashboard/expenses",
      gradient: "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
      iconBg: "bg-orange-500",
      iconColor: "",
      borderColor: "border-orange-200 dark:border-orange-800"
    }
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Hızli İstatistikler</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Canlı veriler</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((card, index) => (
          <div key={index} className="relative group">
            <StatsCard {...card} />
            {/* Hover indicator */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Insights Bar */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">AI İçgörüsü</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Bu ay harcamalarınız %12 azalış gösterdi
                </div>
              </div>
            </div>
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              Detaylar →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
