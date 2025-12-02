"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
  Eye,
  DollarSign,
  CreditCard,
  PiggyBank,
  Target
} from "lucide-react"
import { useState } from "react"

export default function BalancePage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month')

  return (
    <DashboardLayout 
      title="Bakiye Detayları" 
      subtitle="Toplam bakiyenizin detaylı analizi"
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

        {/* Main Balance Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Wallet className="h-6 w-6 text-blue-600" />
              Toplam Bakiye
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Mevcut Bakiye</p>
                <p className="text-4xl font-bold text-blue-600">₺623,390.45</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+3.2%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Bu Ay Giriş</p>
                <p className="text-4xl font-bold text-green-600">₺45,250.00</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm font-medium">+12.5%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Bu Ay Çıkış</p>
                <p className="text-4xl font-bold text-red-600">₺18,750.00</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-red-600">
                  <ArrowDownRight className="h-4 w-4" />
                  <span className="text-sm font-medium">-5.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Vadesiz Hesap</p>
                  <p className="text-2xl font-bold">₺125,450.00</p>
                  <p className="text-xs text-green-600">+2.1%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <PiggyBank className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Birikim Hesabı</p>
                  <p className="text-2xl font-bold">₺350,000.00</p>
                  <p className="text-xs text-green-600">+4.8%</p>
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
                  <p className="text-sm text-muted-foreground">Yatırım Hesabı</p>
                  <p className="text-2xl font-bold">₺98,750.00</p>
                  <p className="text-xs text-green-600">+8.3%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Döviz Hesabı</p>
                  <p className="text-2xl font-bold">₺49,190.45</p>
                  <p className="text-xs text-red-600">-1.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Son İşlemler
              </span>
              <Button variant="outline" size="sm">
                Tümünü Gör
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { desc: "Maaş Girişi", amount: "+₺25,000.00", date: "01 Ara 2024", type: "income" },
                { desc: "Kira Ödemesi", amount: "-₺8,500.00", date: "30 Kas 2024", type: "expense" },
                { desc: "Yatırım Getirisi", amount: "+₺3,250.00", date: "29 Kas 2024", type: "income" },
                { desc: "Market Alışverişi", amount: "-₺2,340.00", date: "28 Kas 2024", type: "expense" },
                { desc: "Fatura Ödemesi", amount: "-₺1,850.00", date: "27 Kas 2024", type: "expense" },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.desc}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
