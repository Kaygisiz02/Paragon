"use client"

import { Button } from "@/components/ui/button"
import { Download, Eye, Calendar, TrendingUp, Filter, Settings } from "lucide-react"

interface DashboardHeaderProps {
  timeRange: 'week' | 'month' | 'year'
  setTimeRange: (range: 'week' | 'month' | 'year') => void
}

export function DashboardHeader({ timeRange, setTimeRange }: DashboardHeaderProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Sol Taraf - Time Range Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <span className="font-semibold text-gray-900 dark:text-white">Zaman Aralığı:</span>
          </div>
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {(['week', 'month', 'year'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className={`transition-all duration-200 ${
                  timeRange === range 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {range === 'week' ? 'Bu Hafta' : range === 'month' ? 'Bu Ay' : 'Bu Yıl'}
              </Button>
            ))}
          </div>
        </div>

        {/* Sağ Taraf - Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
            <Filter className="h-4 w-4 mr-2" />
            Filtrele
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
            <Download className="h-4 w-4 mr-2" />
            Rapor İndir
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200">
            <Eye className="h-4 w-4 mr-2" />
            Detaylı Görünüm
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-gray-600 dark:text-gray-400">Bu ay:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">+12.5% büyüme</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Aktif hesap:</span>
              <span className="font-semibold text-gray-900 dark:text-white">8 hesap</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">İşlem:</span>
              <span className="font-semibold text-gray-900 dark:text-white">247 işlem</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Son güncelleme: 2 dakika önce
          </div>
        </div>
      </div>
    </div>
  )
}
