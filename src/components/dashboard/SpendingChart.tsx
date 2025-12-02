"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, TrendingDown, Target, AlertTriangle } from "lucide-react"
import { useState } from "react"
import { useCategories } from "@/hooks/useCategories"

interface DayData {
  day: string
  height: number
  amount: string
  trend: "up" | "down"
  percentage: string
  active?: boolean
}

export function SpendingChart() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { expenseCategories, incomeCategories, loading } = useCategories()

  const weekData: DayData[] = [
    { day: "Pzt", height: 60, amount: "₺2,340", trend: "up", percentage: "+12%" },
    { day: "Sal", height: 45, amount: "₺1,850", trend: "down", percentage: "-8%" },
    { day: "Çar", height: 85, amount: "₺3,120", trend: "up", active: true, percentage: "+25%" },
    { day: "Per", height: 70, amount: "₺2,680", trend: "up", percentage: "+15%" },
    { day: "Cum", height: 55, amount: "₺1,950", trend: "down", percentage: "-5%" },
    { day: "Cmt", height: 25, amount: "₺890", trend: "down", percentage: "-18%" },
    { day: "Paz", height: 35, amount: "₺1,240", trend: "up", percentage: "+3%" },
  ]

  // Categories verisinden dinamik stats oluştur
  const getStatsFromCategories = () => {
    if (loading) return [
      { label: "Ortalama", value: "₺0", subtext: "günlük", icon: TrendingUp, color: "green" },
      { label: "En Yüksek", value: "₺0", subtext: "yükleniyor", icon: Target, color: "blue" },
      { label: "Trend", value: "+0%", subtext: "bu hafta", icon: AlertTriangle, color: "orange" },
      { label: "Volatilite", value: "±0%", subtext: "değişim", icon: BarChart3, color: "purple" },
    ]

    const totalExpenses = expenseCategories.reduce((total, cat) => total + cat.totalAmount, 0)
    const totalIncome = incomeCategories.reduce((total, cat) => total + cat.totalAmount, 0)
    const highestExpense = expenseCategories.length > 0 
      ? expenseCategories.reduce((prev, current) => (prev.totalAmount > current.totalAmount) ? prev : current)
      : null
    const averageDaily = totalExpenses / 30 // Aylık ortalama günlük

    return [
      { 
        label: "Ortalama", 
        value: `₺${Math.round(averageDaily).toLocaleString()}`, 
        subtext: "günlük", 
        icon: TrendingUp, 
        color: "green" 
      },
      { 
        label: "En Yüksek", 
        value: highestExpense ? `₺${highestExpense.totalAmount.toLocaleString()}` : "₺0", 
        subtext: highestExpense?.name || "yok", 
        icon: Target, 
        color: "blue" 
      },
      { 
        label: "Net Akış", 
        value: `₺${(totalIncome - totalExpenses).toLocaleString()}`, 
        subtext: "bu ay", 
        icon: AlertTriangle, 
        color: totalIncome > totalExpenses ? "green" : "red" 
      },
      { 
        label: "Kategori", 
        value: `${expenseCategories.length}`, 
        subtext: "harcama", 
        icon: BarChart3, 
        color: "purple" 
      },
    ]
  }

  const stats = getStatsFromCategories()

  if (loading) {
    return (
      <Card className="hover:shadow-lg transition-all duration-300 group">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Günlük Harcama Eğilimi
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Veriler yükleniyor...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-green-600" />
            Günlük Harcama Eğilimi
          </CardTitle>
          <div className="flex gap-2">
            {['Harcama', 'Gelir'].map((type) => (
              <Button
                key={type}
                variant={selectedCategory === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(selectedCategory === type ? null : type)}
                className="transition-all duration-300 hover:scale-105"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex items-end justify-around gap-4 sm:gap-8 text-center relative pt-8">
          {weekData.map((item, index) => (
            <div key={index} className="flex flex-col h-full justify-end items-center gap-2 flex-1 group cursor-pointer relative max-w-[70px]">
              <div className="relative w-full">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-300 group-hover:opacity-90 relative overflow-hidden ${
                    item.active 
                      ? "bg-gradient-to-t from-green-600 to-green-500 shadow-lg shadow-green-500/30" 
                      : item.trend === "up" 
                        ? "bg-gradient-to-t from-green-500/80 to-green-400/60 hover:from-green-500 hover:to-green-400"
                        : "bg-gradient-to-t from-red-500/80 to-red-400/60 hover:from-red-500 hover:to-red-400"
                  }`}
                  style={{ height: `${item.height}%`, minHeight: '20px' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                  
                  {item.trend === "up" && (
                    <TrendingUp className="absolute -top-2 left-1/2 transform -translate-x-1/2 h-4 w-4 text-white bg-green-600 rounded-full p-0.5 shadow-md animate-bounce" />
                  )}
                  {item.trend === "down" && (
                    <TrendingDown className="absolute -top-2 left-1/2 transform -translate-x-1/2 h-4 w-4 text-white bg-red-600 rounded-full p-0.5 shadow-md animate-bounce" />
                  )}
                  
                  <div className={`absolute top-1 right-1 text-xs font-bold px-1.5 py-0.5 rounded-full ${
                    item.trend === "up" 
                      ? "bg-green-600 text-white" 
                      : "bg-red-600 text-white"
                  }`}>
                    {item.percentage}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{item.day}</span>
                {item.active && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-600 font-medium">Bugün</span>
                  </div>
                )}
                {!item.active && (
                  <div className={`text-xs font-medium ${
                    item.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {item.percentage}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className={`text-center p-3 rounded-lg bg-${stat.color}-50 border border-${stat.color}-200 hover:bg-${stat.color}-100 transition-colors cursor-pointer group`}>
              <div className={`flex items-center justify-center gap-1 text-${stat.color}-600 mb-1`}>
                <stat.icon className={`h-3 w-3 group-hover:scale-110 transition-transform`} />
                <span className="text-xs font-medium">{stat.label}</span>
              </div>
              <span className={`font-bold text-lg group-hover:text-${stat.color}-700 transition-colors`}>{stat.value}</span>
              <span className="text-xs text-muted-foreground block">{stat.subtext}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
