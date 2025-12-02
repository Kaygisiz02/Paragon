"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
  Eye,
  ShoppingCart,
  Target,
  AlertTriangle,
  BarChart3,
  PieChart,
  Utensils,
  Car,
  Home,
  Zap
} from "lucide-react"
import { useState } from "react"

export default function ExpensesPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month')

  return (
    <DashboardLayout 
      title="Harcamalar" 
      subtitle="Bu ayki harcama detaylarınız ve bütçe analizi"
    >
      <div className="space-y-8">
        {/* Header Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {(['week', 'month', 'year'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="capitalize"
              >
                {range === 'week' ? 'Bu Hafta' : range === 'month' ? 'Bu Ay' : 'Bu Yıl'}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Rapor İndir
            </Button>
            <Button size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Yenile
            </Button>
          </div>
        </div>

        {/* Budget Overview */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Target className="h-6 w-6 text-purple-600" />
              Bütçe Durumu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Aylık Bütçe</p>
                <p className="text-4xl font-bold text-blue-600">₺10,000.00</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-muted-foreground">
                  <Target className="h-4 w-4" />
                  <span className="text-sm font-medium">Hedef</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Harcanan</p>
                <p className="text-4xl font-bold text-orange-600">₺7,850.50</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-orange-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">78.5%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Kalan Bütçe</p>
                <p className="text-4xl font-bold text-green-600">₺2,149.50</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-green-600">
                  <ArrowDownRight className="h-4 w-4" />
                  <span className="text-sm font-medium">21.5%</span>
                </div>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Bütçe Kullanımı</span>
                <span className="font-medium">78.5%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-gradient-to-r from-purple-500 to-orange-500 h-3 rounded-full" style={{ width: '78.5%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-xl">
                  <Utensils className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Gıda & Market</p>
                  <p className="text-2xl font-bold">₺2,340.00</p>
                  <p className="text-xs text-red-600">+12.3%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Ulaşım</p>
                  <p className="text-2xl font-bold">₺1,850.00</p>
                  <p className="text-xs text-green-600">-5.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Home className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Faturalar</p>
                  <p className="text-2xl font-bold">₺1,250.00</p>
                  <p className="text-xs text-green-600">-8.7%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <ShoppingCart className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Alışveriş</p>
                  <p className="text-2xl font-bold">₺2,410.50</p>
                  <p className="text-xs text-red-600">+15.8%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spending Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Harcama Trendi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-2">
              {[
                { day: "Pzt", amount: 280 },
                { day: "Sal", amount: 450 },
                { day: "Çar", amount: 320 },
                { day: "Per", amount: 510 },
                { day: "Cum", amount: 680 },
                { day: "Cmt", amount: 420 },
                { day: "Paz", amount: 190 },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                  <div 
                    className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg transition-all duration-300 hover:opacity-80"
                    style={{ height: `${(item.amount / 680) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{item.day}</span>
                  <span className="text-xs font-medium">₺{item.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Son Harcamalar
              </span>
              <Button variant="outline" size="sm">
                Tümünü Gör
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { desc: "Market Alışverişi", category: "Gıda", amount: "₺2,340.00", date: "01 Ara 2024", icon: Utensils },
                { desc: "Benzin", category: "Ulaşım", amount: "₺850.00", date: "30 Kas 2024", icon: Car },
                { desc: "Elektrik Faturası", category: "Faturalar", amount: "₺425.00", date: "29 Kas 2024", icon: Zap },
                { desc: "Giyim Alışverişi", category: "Alışveriş", amount: "₺1,250.00", date: "28 Kas 2024", icon: ShoppingCart },
                { desc: "Restoran", category: "Gıda", amount: "₺450.00", date: "27 Kas 2024", icon: Utensils },
                { desc: "Su Faturası", category: "Faturalar", amount: "₺180.00", date: "26 Kas 2024", icon: Zap },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <transaction.icon className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.desc}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{transaction.category}</span>
                        <span>•</span>
                        <span>{transaction.date}</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-red-600">
                    {transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget Alerts */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="h-5 w-5" />
              Bütçe Uyarıları
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-orange-100 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium">Alışveriş kategorisi %80'e ulaştı</span>
                </div>
                <span className="text-sm text-orange-600">₺2,410 / ₺3,000</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-100 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">Gıda harcamaları artışta</span>
                </div>
                <span className="text-sm text-yellow-600">+12.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
