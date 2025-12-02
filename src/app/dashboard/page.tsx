"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState } from "react"
import { useCategories } from "@/hooks/useCategories"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { MainStatsGrid } from "@/components/dashboard/MainStatsGrid"
import { SpendingChart } from "@/components/dashboard/SpendingChart"
import { QuickStatsGrid } from "@/components/dashboard/QuickStatsGrid"
import { RecentTransactions } from "@/components/dashboard/RecentTransactions"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month')
  const { loading } = useCategories()

  if (loading) {
    return (
      <DashboardLayout 
        title="Paragon Dashboard" 
        subtitle="Finansal özetiniz yükleniyor..."
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Veriler yükleniyor...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="Paragon Dashboard" 
      subtitle="Finansal özetiniz"
    >
      <div className="space-y-8">
        {/* Dashboard Header */}
        <DashboardHeader timeRange={timeRange} setTimeRange={setTimeRange} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {/* Main Content Area */}
          <div className="col-span-12 xl:col-span-8 space-y-6 lg:space-y-8">
            {/* Main Stats Grid */}
            <MainStatsGrid />

            {/* Spending Chart */}
            <SpendingChart />

            {/* Quick Stats Grid */}
            <QuickStatsGrid />

            {/* Recent Transactions */}
            <RecentTransactions />
          </div>

          {/* Sidebar */}
          <div className="col-span-12 xl:col-span-4">
            <div className="sticky top-24">
              <DashboardSidebar />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
