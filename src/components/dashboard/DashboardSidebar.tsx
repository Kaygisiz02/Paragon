"use client"

import { QuickActions } from "./QuickActions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, Target, TrendingUp, AlertCircle, Brain, Zap } from "lucide-react"

export function DashboardSidebar() {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <QuickActions />

      {/* AI Insights */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span className="text-gray-900 dark:text-white">AI İçgörüleri</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-4 border border-purple-200/50 dark:border-purple-800/50">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  Harcama Trendi
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Gelecek ay harcamalarınız %15 düşebilir. Düzenli alışverişlerinizi gözden geçirin.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-4 border border-purple-200/50 dark:border-purple-800/50">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  Bütçe Hedefi
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Ay sonuna kadar ₺2,500 tasarruf edebilirsiniz. Düzenli takip edin.
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20">
            <Zap className="h-4 w-4 mr-2" />
            Tüm İçgörüleri Gör
          </Button>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-gray-900 dark:text-white">Yaklaşan Olaylar</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white text-sm">
                  Kredi Kartı Borcu
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  3 gün sonra - ₺3,450
                </div>
              </div>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>

            <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white text-sm">
                  Fatura Ödeme
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  5 gün sonra - ₺280
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white text-sm">
                  Maaş Girişi
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  12 gün sonra - ₺15,000
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full">
            <Calendar className="h-4 w-4 mr-2" />
            Takvimi Gör
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <span className="text-gray-900 dark:text-white">Bildirimler</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="text-sm text-gray-900 dark:text-white">
                  Yeni işlem eklendi
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Starbucks - ₺85 (2 saat önce)
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="text-sm text-gray-900 dark:text-white">
                  Bütçe hedefine ulaşıldı
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Eğitim kategorisi (Bugün)
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="text-sm text-gray-900 dark:text-white">
                  Yeni özellik eklendi
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  AI analiz paneli (Dün)
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full">
            Tümünü Gör
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
