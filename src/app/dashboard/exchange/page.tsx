"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
  Eye,
  DollarSign,
  Target,
  BarChart3,
  AlertTriangle,
  PieChart,
  Activity,
  Clock
} from "lucide-react"
import { useState } from "react"

export default function ExchangePage() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day')

  return (
    <DashboardLayout 
      title="Döviz Kurları" 
      subtitle="Güncel döviz kurları ve piyasa analizleri"
    >
      <div className="space-y-8">
        {/* Header Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {(['day', 'week', 'month'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="capitalize"
              >
                {range === 'day' ? 'Günlük' : range === 'week' ? 'Haftalık' : 'Aylık'}
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

        {/* Current Rates */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <DollarSign className="h-6 w-6 text-orange-600" />
              Güncel Döviz Kuru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">USD/TRY</p>
                <p className="text-4xl font-bold text-orange-600">₺33.25</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-red-600">
                  <TrendingDown className="h-4 w-4" />
                  <span className="text-sm font-medium">-0.8%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Alış</p>
                <p className="text-4xl font-bold text-blue-600">₺33.15</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-blue-600">
                  <ArrowDownRight className="h-4 w-4" />
                  <span className="text-sm font-medium">-0.6%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Satış</p>
                <p className="text-4xl font-bold text-green-600">₺33.35</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm font-medium">+0.2%</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Son güncelleme: <span className="font-medium">01 Aralık 2024 14:30</span>
            </div>
          </CardContent>
        </Card>

        {/* Other Currencies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">EUR/TRY</p>
                  <p className="text-2xl font-bold">₺36.85</p>
                  <p className="text-xs text-green-600">+0.3%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">GBP/TRY</p>
                  <p className="text-2xl font-bold">₺42.15</p>
                  <p className="text-xs text-green-600">+0.8%</p>
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
                  <p className="text-sm text-muted-foreground">EUR/USD</p>
                  <p className="text-2xl font-bold">$1.108</p>
                  <p className="text-xs text-red-600">-0.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Activity className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">XAU/USD</p>
                  <p className="text-2xl font-bold">$2,145</p>
                  <p className="text-xs text-green-600">+1.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hourly Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Günlük Değişim Grafiği
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-1">
              {[
                { hour: "09:00", rate: 33.45 },
                { hour: "10:00", rate: 33.38 },
                { hour: "11:00", rate: 33.42 },
                { hour: "12:00", rate: 33.35 },
                { hour: "13:00", rate: 33.28 },
                { hour: "14:00", rate: 33.31 },
                { hour: "15:00", rate: 33.25 },
                { hour: "16:00", rate: 33.22 },
                { hour: "17:00", rate: 33.25 },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-1 flex-1">
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-300 hover:opacity-80 ${
                      item.rate <= 33.25 
                        ? 'bg-gradient-to-t from-red-500 to-red-400' 
                        : 'bg-gradient-to-t from-green-500 to-green-400'
                    }`}
                    style={{ height: `${((item.rate - 33.15) / 0.35) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{item.hour}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Piyasa Analizi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Destek Seviyesi</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">₺33.10</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium">Mevcut Seviye</span>
                  </div>
                  <span className="text-sm font-bold text-orange-600">₺33.25</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium">Direnç Seviyesi</span>
                  </div>
                  <span className="text-sm font-bold text-red-600">₺33.45</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Piyasa Uyarıları
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Volatilite Artışı</p>
                    <p className="text-xs text-yellow-600">Son saatlerde %2.5'lik dalgalanma gözlemlendi</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                  <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Merkez Bankası Duyurusu</p>
                    <p className="text-xs text-blue-600">Bugün 15:00'da faiz kararı açıklanacak</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historical Rates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Geçmiş Kurlar
              </span>
              <Button variant="outline" size="sm">
                Tümünü Gör
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 text-sm font-medium">Tarih</th>
                    <th className="text-right p-2 text-sm font-medium">Açılış</th>
                    <th className="text-right p-2 text-sm font-medium">En Yüksek</th>
                    <th className="text-right p-2 text-sm font-medium">En Düşük</th>
                    <th className="text-right p-2 text-sm font-medium">Kapanış</th>
                    <th className="text-right p-2 text-sm font-medium">Değişim</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: "01 Ara 2024", open: 33.45, high: 33.52, low: 33.22, close: 33.25, change: "-0.60%" },
                    { date: "30 Kas 2024", open: 33.38, high: 33.48, low: 33.31, close: 33.45, change: "+0.21%" },
                    { date: "29 Kas 2024", open: 33.25, high: 33.40, low: 33.18, close: 33.38, change: "+0.39%" },
                    { date: "28 Kas 2024", open: 33.15, high: 33.28, low: 33.10, close: 33.25, change: "+0.30%" },
                    { date: "27 Kas 2024", open: 33.08, high: 33.18, low: 33.02, close: 33.15, change: "+0.21%" },
                  ].map((row, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2 text-sm">{row.date}</td>
                      <td className="text-right p-2 text-sm">₺{row.open}</td>
                      <td className="text-right p-2 text-sm">₺{row.high}</td>
                      <td className="text-right p-2 text-sm">₺{row.low}</td>
                      <td className="text-right p-2 text-sm font-medium">₺{row.close}</td>
                      <td className={`text-right p-2 text-sm font-medium ${
                        row.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {row.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
