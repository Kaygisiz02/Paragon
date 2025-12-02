"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
  Eye,
  Wallet,
  Target,
  BarChart3,
  AlertTriangle,
  PieChart
} from "lucide-react"
import { useState } from "react"

export default function AssetsPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month')

  return (
    <DashboardLayout 
      title="Varlıklar" 
      subtitle="Yabancı para ve yatırım varlıklarınız"
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

        {/* Total Assets Card */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <DollarSign className="h-6 w-6 text-green-600" />
              Toplam Dolar Varlıkları
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Mevcut Değer</p>
                <p className="text-4xl font-bold text-green-600">$18,750.00</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+2.1%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">TL Karşılığı</p>
                <p className="text-4xl font-bold text-blue-600">₺623,437.50</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm font-medium">+2.1%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Bu Ay Getiri</p>
                <p className="text-4xl font-bold text-purple-600">$387.50</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+2.1%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Asset Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Dolar Mevduat</p>
                  <p className="text-2xl font-bold">$10,000.00</p>
                  <p className="text-xs text-green-600">+2.1%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Euro Mevduat</p>
                  <p className="text-2xl font-bold">€5,000.00</p>
                  <p className="text-xs text-green-600">+1.8%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Dolar Tahvil</p>
                  <p className="text-2xl font-bold">$2,500.00</p>
                  <p className="text-xs text-green-600">+3.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <PieChart className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Yabancı Hisse</p>
                  <p className="text-2xl font-bold">$1,250.00</p>
                  <p className="text-xs text-green-600">+4.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performans Grafiği
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-2">
              {[
                { month: "Tem", value: 65 },
                { month: "Ağu", value: 72 },
                { month: "Eyl", value: 68 },
                { month: "Eki", value: 78 },
                { month: "Kas", value: 85 },
                { month: "Ara", value: 92 },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                  <div 
                    className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-300 hover:opacity-80"
                    style={{ height: `${item.value}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{item.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Asset Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Varlık Dağılımı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Dolar Mevduat</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$10,000.00</p>
                    <p className="text-xs text-muted-foreground">53.3%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Euro Mevduat</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$5,500.00</p>
                    <p className="text-xs text-muted-foreground">29.3%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Dolar Tahvil</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$2,500.00</p>
                    <p className="text-xs text-muted-foreground">13.3%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Yabancı Hisse</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$750.00</p>
                    <p className="text-xs text-muted-foreground">4.1%</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500 via-blue-500 via-purple-500 to-orange-500"></div>
                  <div className="absolute inset-4 rounded-full bg-background flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold">$18,750</p>
                      <p className="text-xs text-muted-foreground">Toplam</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
