"use client"

import { StatsCard } from "@/components/dashboard/StatsCard"
import { useCategories } from "@/hooks/useCategories"
import { Wallet, DollarSign, CreditCard, TrendingDown } from "lucide-react"

export function MainStatsGrid() {
  const { 
    getTotalIncome,
    getTotalExpenses,
    loading 
  } = useCategories()

  const totalIncome = getTotalIncome()
  const totalExpenses = getTotalExpenses()

  const statsCards = [
    {
      title: "Toplam Bakiye",
      value: `₺${(totalIncome - totalExpenses).toLocaleString()}`,
      subtitle: ".00",
      icon: Wallet,
      trend: "up" as const,
      trendValue: "+3.2%",
      trendText: "Bu aydan daha iyi",
      href: "/dashboard/balance",
      gradient: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      iconBg: "bg-blue-500",
      iconColor: "",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      title: "Dolar Varlıkları",
      value: "$18,750",
      subtitle: ".00",
      icon: DollarSign,
      trend: "up" as const,
      trendValue: "+2.1%",
      trendText: "Karlı yatırım",
      href: "/dashboard/assets",
      gradient: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      iconBg: "bg-green-500",
      iconColor: "",
      borderColor: "border-green-200 dark:border-green-800"
    },
    {
      title: "Bu Ay Harcama",
      value: `₺${totalExpenses.toLocaleString()}`,
      subtitle: ".00",
      icon: CreditCard,
      trend: "neutral" as const,
      trendValue: "78%",
      trendText: "Bütçe: ₺10,000",
      href: "/dashboard/expenses",
      gradient: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      iconBg: "bg-purple-500",
      iconColor: "",
      borderColor: "border-purple-200 dark:border-purple-800"
    },
    {
      title: "Döviz Kuru",
      value: "₺33.25",
      icon: TrendingDown,
      trend: "down" as const,
      trendValue: "-0.8%",
      href: "/dashboard/exchange",
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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Finansal Özet</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Güncel veriler
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div key={index} className="relative group">
            <StatsCard {...card} />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Summary Bar */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Toplam Gelir:</span>
              <span className="ml-2 font-semibold text-green-600 dark:text-green-400">₺{totalIncome.toLocaleString()}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Toplam Gider:</span>
              <span className="ml-2 font-semibold text-red-600 dark:text-red-400">₺{totalExpenses.toLocaleString()}</span>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Net: ₺{(totalIncome - totalExpenses).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
}
