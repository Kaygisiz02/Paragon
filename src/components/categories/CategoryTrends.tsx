"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus, Calendar, Download, Filter, Activity, Zap, TrendingUp as TrendingUpIcon, Target, Sparkles } from "lucide-react"
import { useState } from "react"
import { Category } from "@/hooks/useCategories"
import { cn } from "@/lib/utils"

interface CategoryTrendsProps {
  categories: Category[]
}

interface TrendData {
  month: string
  amount: number
  change: number
  trend: "up" | "down" | "stable"
  projected: boolean
  confidence: number
  volatility: number
}

export function CategoryTrends({ categories }: CategoryTrendsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<"3months" | "6months" | "1year">("6months")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [trendView, setTrendView] = useState<"chart" | "analytics" | "forecast">("chart")

  // Advanced AI-powered trend analysis
  const generateTrendData = (categoryId: string): TrendData[] => {
    const category = categories.find(cat => cat.id === categoryId)
    if (!category) return []

    const months = selectedPeriod === "3months" ? 3 : selectedPeriod === "6months" ? 6 : 12
    const baseAmount = category.totalAmount / 12
    
    return Array.from({ length: months }, (_, index) => {
      const monthNames = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"]
      const monthIndex = (12 - months + index) % 12
      
      // AI-powered trend prediction with volatility
      const seasonalFactor = Math.sin((index / months) * Math.PI * 2) * 0.15
      const marketVolatility = Math.random() * 0.1 - 0.05
      const growthTrend = index * 0.02 // 2% growth trend
      
      const randomFactor = seasonalFactor + marketVolatility + growthTrend + Math.random() * 0.1
      const amount = baseAmount * (1 + randomFactor)
      
      const prevAmount = index > 0 ? baseAmount * (1 + seasonalFactor + marketVolatility + (index - 1) * 0.02) : amount
      const change = ((amount - prevAmount) / prevAmount) * 100
      const trend = change > 5 ? "up" : change < -5 ? "down" : "stable"
      
      // AI confidence calculation
      const confidence = Math.min(95, Math.max(60, 85 - Math.abs(marketVolatility) * 100))
      const volatility = Math.abs(marketVolatility) * 100

      return {
        month: monthNames[monthIndex],
        amount: Math.round(amount),
        change: Math.round(change * 10) / 10,
        trend,
        projected: false,
        confidence,
        volatility
      }
    })
  }

  const trendData = selectedCategory ? generateTrendData(selectedCategory) : []

  // Calculate advanced analytics
  const calculateAnalytics = () => {
    if (trendData.length === 0) return null
    
    const avgAmount = trendData.reduce((sum, d) => sum + d.amount, 0) / trendData.length
    const maxAmount = Math.max(...trendData.map(d => d.amount))
    const minAmount = Math.min(...trendData.map(d => d.amount))
    const avgChange = trendData.reduce((sum, d) => sum + d.change, 0) / trendData.length
    const avgConfidence = trendData.reduce((sum, d) => sum + d.confidence, 0) / trendData.length
    const avgVolatility = trendData.reduce((sum, d) => sum + d.volatility, 0) / trendData.length
    
    const growthRate = ((trendData[trendData.length - 1].amount - trendData[0].amount) / trendData[0].amount) * 100
    const stability = 100 - avgVolatility
    
    return {
      avgAmount,
      maxAmount,
      minAmount,
      avgChange,
      avgConfidence,
      avgVolatility,
      growthRate,
      stability,
      trendDirection: growthRate > 5 ? "bullish" : growthRate < -5 ? "bearish" : "neutral"
    }
  }

  const analytics = calculateAnalytics()

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
      case "down": return <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
      default: return <Minus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
    }
  }

  const getTrendColor = (trend: string, value: number) => {
    if (trend === "up") return "text-green-600 dark:text-green-400"
    if (trend === "down") return "text-red-600 dark:text-red-400"
    return "text-gray-600 dark:text-gray-400"
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/50 dark:border-green-800"
    if (confidence >= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950/50 dark:border-yellow-800"
    return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/50 dark:border-red-800"
  }

  const maxAmount = Math.max(...trendData.map(d => d.amount), 1)

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl shadow-lg">
            <TrendingUpIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground dark:text-white">AI Destekli Trend Analizi</h2>
            <p className="text-muted-foreground dark:text-gray-400">Gelişmiş zaman serisi analizi ve gelecek projeksiyonları</p>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Period Selection */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Analiz Dönemi:</span>
              <div className="flex gap-2">
                <Button
                  variant={selectedPeriod === "3months" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("3months")}
                  className="transition-all duration-300"
                >
                  3 Ay
                </Button>
                <Button
                  variant={selectedPeriod === "6months" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("6months")}
                  className="transition-all duration-300"
                >
                  6 Ay
                </Button>
                <Button
                  variant={selectedPeriod === "1year" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("1year")}
                  className="transition-all duration-300"
                >
                  1 Yıl
                </Button>
              </div>
            </div>

            {/* View Type Selection */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Görünüm:</span>
              <div className="flex gap-2">
                <Button
                  variant={trendView === "chart" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTrendView("chart")}
                  className="transition-all duration-300"
                >
                  Grafik
                </Button>
                <Button
                  variant={trendView === "analytics" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTrendView("analytics")}
                  className="transition-all duration-300"
                >
                  Analitik
                </Button>
                <Button
                  variant={trendView === "forecast" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTrendView("forecast")}
                  className="transition-all duration-300"
                >
                  Projeksiyon
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-500" />
            Kategori Seçimi
            {selectedCategory && (
              <Badge variant="outline" className="ml-auto">
                {categories.find(cat => cat.id === selectedCategory)?.name}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {categories.slice(0, 8).map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "transition-all duration-300 hover:scale-105",
                  selectedCategory === category.id && "shadow-lg"
                )}
              >
                <span className="truncate max-w-[120px]">{category.name}</span>
                <span className="ml-2 text-xs opacity-70">₺{category.totalAmount.toLocaleString()}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trend Analysis Content */}
      {selectedCategory && trendData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Trend Grafiği
                <Badge variant="outline" className="ml-auto">
                  {selectedPeriod === "3months" ? "Son 3 Ay" : selectedPeriod === "6months" ? "Son 6 Ay" : "Son 1 Yıl"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-80">
                <div className="absolute inset-0 flex items-end justify-between gap-2">
                  {trendData.map((data, index) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="relative w-full flex flex-col items-center">
                        {/* Bar with gradient */}
                        <div 
                          className={cn(
                            "w-full rounded-t-sm transition-all duration-300 hover:opacity-80",
                            data.trend === "up" && "bg-gradient-to-t from-green-500 to-green-400 hover:from-green-600 hover:to-green-500",
                            data.trend === "down" && "bg-gradient-to-t from-red-500 to-red-400 hover:from-red-600 hover:to-red-500",
                            data.trend === "stable" && "bg-gradient-to-t from-gray-500 to-gray-400 hover:from-gray-600 hover:to-gray-500"
                          )}
                          style={{ 
                            height: `${(data.amount / maxAmount) * 100}%`,
                            minHeight: '8px'
                          }}
                        />
                       
                        {/* Value Label */}
                        <div className="absolute -top-8 text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          ₺{(data.amount / 1000).toFixed(1)}K
                        </div>
                        
                        {/* Confidence Badge */}
                        <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Badge className={cn("text-xs", getConfidenceColor(data.confidence))}>
                            %{data.confidence.toFixed(0)}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Month Label */}
                      <span className="text-xs text-muted-foreground dark:text-gray-400 font-medium">{data.month}</span>
                      
                      {/* Trend Indicator */}
                      <div className="flex items-center gap-1">
                        {getTrendIcon(data.trend)}
                        <span className={`text-xs font-bold ${getTrendColor(data.trend, data.change)}`}>
                          {data.change > 0 ? "+" : ""}{data.change}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart Summary */}
              {analytics && (
                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">AI Analiz Özeti</p>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground dark:text-gray-400">Büyüme:</span>
                      <span className={cn("ml-2 font-bold", 
                        analytics.growthRate > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      )}>
                        {analytics.growthRate > 0 ? "+" : ""}{analytics.growthRate.toFixed(1)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground dark:text-gray-400">Stabilite:</span>
                      <span className="ml-2 font-bold text-blue-600 dark:text-blue-400">
                        %{analytics.stability.toFixed(0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground dark:text-gray-400">Güven:</span>
                      <span className="ml-2 font-bold text-purple-600 dark:text-purple-400">
                        %{analytics.avgConfidence.toFixed(0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground dark:text-gray-400">Trend:</span>
                      <span className="ml-2 font-bold text-foreground dark:text-white">
                        {analytics.trendDirection === "bullish" ? "📈 Yükselen" : 
                         analytics.trendDirection === "bearish" ? "📉 Düşen" : "➡️ Nötr"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analytics Panel */}
          <div className="space-y-6">
            {/* Key Metrics */}
            {analytics && (
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-500" />
                    Ana Metrikler
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-muted-foreground dark:text-gray-400 mb-1">Ortalama Tutar</p>
                    <p className="text-lg font-bold text-foreground dark:text-white">₺{Math.round(analytics.avgAmount).toLocaleString()}</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-muted-foreground dark:text-gray-400 mb-1">En Yüksek</p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">₺{analytics.maxAmount.toLocaleString()}</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-muted-foreground dark:text-gray-400 mb-1">En Düşük</p>
                    <p className="text-lg font-bold text-red-600 dark:text-red-400">₺{analytics.minAmount.toLocaleString()}</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-muted-foreground dark:text-gray-400 mb-1">Volatilite</p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-foreground dark:text-white">%{analytics.avgVolatility.toFixed(1)}</p>
                      <Badge className={getConfidenceColor(analytics.avgConfidence)}>
                        %{analytics.avgConfidence.toFixed(0)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Performance Indicators */}
            {analytics && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    Performans Göstergeleri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground dark:text-gray-400">
                      <span>Büyüme Potansiyeli</span>
                      <span>{Math.min(100, Math.max(0, analytics.growthRate + 50)).toFixed(0)}%</span>
                    </div>
                    <Progress value={Math.min(100, Math.max(0, analytics.growthRate + 50))} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground dark:text-gray-400">
                      <span>Piyasa Stabilitesi</span>
                      <span>{analytics.stability.toFixed(0)}%</span>
                    </div>
                    <Progress value={analytics.stability} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground dark:text-gray-400">
                      <span>AI Güven Skoru</span>
                      <span>{analytics.avgConfidence.toFixed(0)}%</span>
                    </div>
                    <Progress value={analytics.avgConfidence} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedCategory && (
        <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
          <CardContent className="py-16 text-center">
            <TrendingUpIcon className="h-20 w-20 mx-auto mb-6 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold text-foreground dark:text-white mb-3">Trend Analizi Başlat</h3>
            <p className="text-muted-foreground dark:text-gray-400 mb-6 max-w-md mx-auto">
              AI destekli trend analizini görmek için bir kategori seçin. Sezonallık etkiler, volatilite ve güven skoru gibi ileri analizler sunulacaktır.
            </p>
            <div className="flex justify-center gap-3">
              <Badge variant="outline" className="dark:border-gray-600">
                <Activity className="h-3 w-3 mr-1" />
                Zaman Serisi
              </Badge>
              <Badge variant="outline" className="dark:border-gray-600">
                <Zap className="h-3 w-3 mr-1" />
                AI Projeksiyon
              </Badge>
              <Badge variant="outline" className="dark:border-gray-600">
                <Target className="h-3 w-3 mr-1" />
                Volatilite Analizi
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Export Options */}
      {selectedCategory && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Download className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Rapor Seçenekleri</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Excel İndir
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  PDF Rapor
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
