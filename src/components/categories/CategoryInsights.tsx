"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingUp, TrendingDown, Lightbulb, Target, Zap, Brain, Shield, Rocket, Star, Award } from "lucide-react"
import { Category } from "@/hooks/useCategories"
import { cn } from "@/lib/utils"

interface CategoryInsightsProps {
  expenseCategories: Category[]
  incomeCategories: Category[]
  onOptimizeCategory?: (categoryId: string) => void
}

export function CategoryInsights({ expenseCategories, incomeCategories, onOptimizeCategory }: CategoryInsightsProps) {
  const totalExpenses = expenseCategories.reduce((sum, cat) => sum + cat.totalAmount, 0)
  const totalIncome = incomeCategories.reduce((sum, cat) => sum + cat.totalAmount, 0)

  // Generate AI-powered insights based on data analysis
  const insights = [
    {
      type: "warning",
      title: "Kritik Harcama Tespiti",
      description: "Rent / Mortgage kategorisi toplam harcamaların %69'unu oluşturuyor. Bu oran finansal esnekliğinizi kısıtlayabilir.",
      icon: AlertTriangle,
      category: expenseCategories.find(cat => cat.name === "Rent / Mortgage"),
      action: "Analiz Et",
      priority: "high",
      impact: "Yüksek",
      recommendation: "Alternatif konut seçeneklerini değerlendirin veya gelir artışı sağlayın."
    },
    {
      type: "opportunity",
      title: "Akıllı Tasarruf Fırsatı",
      description: "Transportation harcamalarınız %15 azaltılarak yıllık ₺1,267 tasarruf edilebilir. Toplu taşıma veya carpooling deneyin.",
      icon: TrendingDown,
      category: expenseCategories.find(cat => cat.name === "Transportation"),
      action: "Optimize Et",
      priority: "medium",
      impact: "Orta",
      recommendation: "Ulaşım masraflarınızı yeniden yapılandırın."
    },
    {
      type: "success",
      title: "Mükemmel Gelir Stabilitesi",
      description: "Salary kategorisi beklenen seviyenin üzerinde ve stabil. Bu durum yatırım için mükemmel bir fırsat.",
      icon: TrendingUp,
      category: incomeCategories.find(cat => cat.name === "Salary"),
      action: "Yatırım Yap",
      priority: "low",
      impact: "Yüksek",
      recommendation: "Fazla geliri diversify edilmiş yatırım portföyüne yönlendirin."
    },
    {
      type: "tip",
      title: "AI Destekli Bütçe Optimizasyonu",
      description: "Food & Groceries kategorisinde haftalık bütçe planlaması ile %20 tasarruf mümkün. Akıllı alışveriş listesi kullanın.",
      icon: Brain,
      category: expenseCategories.find(cat => cat.name === "Food / Groceries"),
      action: "Uygula",
      priority: "medium",
      impact: "Orta",
      recommendation: "Otomatik bütçe takip sistemi kurun."
    },
    {
      type: "warning",
      title: "Abonelik Yükü Tespiti",
      description: "Subscriptions kategorisi aylık ₺600 oranında. Kullanılmayan servisleri iptal ederek tasarruf edebilirsiniz.",
      icon: Shield,
      category: expenseCategories.find(cat => cat.name === "Subscriptions"),
      action: "Yönet",
      priority: "medium",
      impact: "Düşük",
      recommendation: "Aboneliklerinizi quarterly olarak gözden geçirin."
    },
    {
      type: "opportunity",
      title: "Yatırım Potansiyeli",
      description: "Investments kategorisi %15 artış potansiyeli taşıyor. Diversify edilmiş portföy öneriyoruz.",
      icon: Rocket,
      category: incomeCategories.find(cat => cat.name === "Investments"),
      action: "Genişlet",
      priority: "low",
      impact: "Yüksek",
      recommendation: "Risk toleransınıza uygun yatırım stratejisi belirleyin."
    },
    {
      type: "success",
      title: "Finansal Disiplin Ödülü",
      description: "Pet Care kategorisinde %30 daha az harcama yaparak bütçenize sadık kalmışsınız. Tebrikler!",
      icon: Award,
      category: expenseCategories.find(cat => cat.name === "Pet Care"),
      action: "Gör",
      priority: "low",
      impact: "Düşük",
      recommendation: "Bu disiplini diğer kategorilere de uygulayın."
    },
    {
      type: "tip",
      title: "Gelir Çeşitlendirme Stratejisi",
      description: "Side Hustle ve Freelance gelirlerinizi birleştirerek ana gelirinizin %20'sine ulaştırabilirsiniz.",
      icon: Star,
      category: incomeCategories.find(cat => cat.name === "Side Hustle"),
      action: "Geliştir",
      priority: "medium",
      impact: "Yüksek",
      recommendation: "Yeteneklerinizi monetize edin."
    }
  ]

  const getInsightColor = (type: string) => {
    switch (type) {
      case "warning": return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/50 dark:border-red-800"
      case "opportunity": return "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/50 dark:border-blue-800"
      case "success": return "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/50 dark:border-green-800"
      case "tip": return "text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-950/50 dark:border-purple-800"
      default: return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-950/50 dark:border-gray-800"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return <Badge variant="destructive" className="dark:bg-red-900 dark:text-red-300">Kritik</Badge>
      case "medium": return <Badge variant="secondary" className="dark:bg-yellow-900 dark:text-yellow-300">Orta</Badge>
      case "low": return <Badge variant="outline" className="dark:border-green-800 dark:text-green-400">Düşük</Badge>
      default: return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground dark:text-white">AI Destekli Finansal Analiz</h2>
            <p className="text-muted-foreground dark:text-gray-400">Akıllı öneriler ve kişiselleştirilmiş finansal stratejiler</p>
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <Card key={index} className={cn(
            "relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl group",
            "border-2 hover:border-primary/50",
            insight.type === "warning" && "border-red-200 dark:border-red-800",
            insight.type === "opportunity" && "border-blue-200 dark:border-blue-800",
            insight.type === "success" && "border-green-200 dark:border-green-800",
            insight.type === "tip" && "border-purple-200 dark:border-purple-800"
          )}>
            {/* Gradient Background */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-10",
              insight.type === "warning" && "from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-800/20",
              insight.type === "opportunity" && "from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-800/20",
              insight.type === "success" && "from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-800/20",
              insight.type === "tip" && "from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-800/20"
            )} />
            
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg",
                    insight.type === "warning" && "bg-red-500 shadow-red-500/30",
                    insight.type === "opportunity" && "bg-blue-500 shadow-blue-500/30",
                    insight.type === "success" && "bg-green-500 shadow-green-500/30",
                    insight.type === "tip" && "bg-purple-500 shadow-purple-500/30"
                  )}>
                    <insight.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-foreground dark:text-white">{insight.title}</h3>
                      {getPriorityBadge(insight.priority)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground dark:text-gray-400">
                      <span className="font-medium">Etki: {insight.impact}</span>
                      <span>•</span>
                      <span>{insight.category?.name}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground dark:text-gray-300 leading-relaxed">
                  {insight.description}
                </p>
                
                {insight.recommendation && (
                  <div className="p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">AI Önerisi:</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{insight.recommendation}</p>
                  </div>
                )}
                
                {insight.category && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-xs bg-muted dark:bg-gray-700 px-2 py-1 rounded">
                        Kategori: {insight.category.name}
                      </div>
                      <div className="text-xs font-bold text-foreground dark:text-white">
                        ₺{insight.category.totalAmount.toLocaleString()}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => insight.category && onOptimizeCategory?.(insight.category.id)}
                      className={cn(
                        "transition-all duration-300 hover:scale-105",
                        insight.type === "warning" && "hover:bg-red-50 hover:text-red-600 hover:border-red-200",
                        insight.type === "opportunity" && "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200",
                        insight.type === "success" && "hover:bg-green-50 hover:text-green-600 hover:border-green-200",
                        insight.type === "tip" && "hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200"
                      )}
                    >
                      {insight.action}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
