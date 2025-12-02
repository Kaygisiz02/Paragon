"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AdminLayout from "@/components/admin/AdminLayout"
import { 
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  Download,
  Filter,
  DollarSign,
  ShoppingCart,
  Target,
  Activity,
  PieChart,
  LineChart,
  Eye,
  Users,
  CreditCard,
  ArrowUp,
  ArrowDown,
  Minus,
  Sun,
  Moon,
  Search,
  BellRing,
  HelpCircle,
  Zap,
  RefreshCw,
  Gauge,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon
} from "lucide-react"

interface AnalyticsStat {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  color: string
  icon: React.ElementType
  description?: string
  progress?: number
}

export default function AdminAnalytics() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const stats: AnalyticsStat[] = [
    {
      title: "Total Revenue",
      value: "₺124,500",
      change: "+12.5%",
      trend: "up",
      color: "text-green-400",
      icon: DollarSign,
      description: "Monthly revenue growth",
      progress: 75
    },
    {
      title: "Active Users",
      value: "1,482",
      change: "+8.2%",
      trend: "up",
      color: "text-green-400",
      icon: Users,
      description: "Monthly active users",
      progress: 82
    },
    {
      title: "Transactions",
      value: "8,426",
      change: "+15.3%",
      trend: "up",
      color: "text-green-400",
      icon: ShoppingCart,
      description: "Total transactions this month",
      progress: 68
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.4%",
      trend: "up",
      color: "text-green-400",
      icon: Target,
      description: "User conversion rate",
      progress: 45
    },
    {
      title: "Avg. Order Value",
      value: "₺245",
      change: "-2.1%",
      trend: "down",
      color: "text-red-400",
      icon: CreditCard,
      description: "Average order value",
      progress: 58
    },
    {
      title: "Bounce Rate",
      value: "32%",
      change: "-5.2%",
      trend: "down",
      color: "text-green-400",
      icon: Activity,
      description: "Website bounce rate",
      progress: 32
    }
  ]

  const weeklyData = [
    { day: "Mon", revenue: 12000, users: 180, transactions: 45 },
    { day: "Tue", revenue: 15000, users: 220, transactions: 52 },
    { day: "Wed", revenue: 18000, users: 260, transactions: 61 },
    { day: "Thu", revenue: 14000, users: 190, transactions: 48 },
    { day: "Fri", revenue: 22000, users: 310, transactions: 78 },
    { day: "Sat", revenue: 16000, users: 230, transactions: 55 },
    { day: "Sun", revenue: 13000, users: 170, transactions: 42 }
  ]

  const monthlyData = [
    { month: "Jan", revenue: 85000, users: 1200, transactions: 320 },
    { month: "Feb", revenue: 92000, users: 1350, transactions: 345 },
    { month: "Mar", revenue: 78000, users: 1180, transactions: 298 },
    { month: "Apr", revenue: 105000, users: 1520, transactions: 412 },
    { month: "May", revenue: 98000, users: 1420, transactions: 387 },
    { month: "Jun", revenue: 124500, users: 1680, transactions: 456 }
  ]

  const categories = [
    { name: "Electronics", value: 45000, percentage: 36, color: "bg-blue-500" },
    { name: "Clothing", value: 32000, percentage: 26, color: "bg-green-500" },
    { name: "Food", value: 25000, percentage: 20, color: "bg-yellow-500" },
    { name: "Transport", value: 18000, percentage: 14, color: "bg-purple-500" },
    { name: "Other", value: 5500, percentage: 4, color: "bg-gray-500" }
  ]

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const actionButtons = (
    <>
      <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
      <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
    </>
  )

  return (
    <AdminLayout
      title="Analytics"
      icon={BarChart3}
      currentPage="/admin/analytics"
      searchPlaceholder="Search analytics..."
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      actionButtons={actionButtons}
      isDarkMode={isDarkMode}
      onThemeToggle={toggleTheme}
    >
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between gap-3 p-4 mb-6">
        <h1 className={`text-4xl font-black leading-tight tracking-[-0.033em] min-w-72 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Analytics
        </h1>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className={`p-6 border rounded-lg ${
            isDarkMode 
              ? 'bg-[#112217] border-[#326744]' 
              : 'bg-white border-gray-200'
          }`}>
            <CardContent className="p-0">
              <div className="flex flex-col gap-2">
                <p className={`text-base font-medium leading-normal ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.title}
                </p>
                <p className={`text-2xl font-bold leading-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </p>
                <div className="flex items-center gap-1">
                  {stat.trend === "up" && <ArrowUp className="h-4 w-4 text-green-500" />}
                  {stat.trend === "down" && <ArrowDown className="h-4 w-4 text-red-500" />}
                  {stat.trend === "neutral" && <Minus className="h-4 w-4 text-gray-500" />}
                  <p className={`text-base font-medium leading-normal ${
                    stat.trend === "up" ? "text-green-500" : 
                    stat.trend === "down" ? "text-red-500" : "text-gray-500"
                  }`}>
                    {stat.change}
                  </p>
                </div>
                {stat.progress !== undefined && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${stat.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <Card className={`p-6 border rounded-lg ${
          isDarkMode 
            ? 'bg-[#112217] border-[#326744]' 
            : 'bg-white border-gray-200'
        }`}>
          <CardHeader className="pb-4">
            <CardTitle className={`text-xl font-bold flex items-center gap-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <DollarSign className="h-5 w-5 text-green-500" />
              Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end justify-between gap-2">
              {weeklyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-2 flex-1 group">
                  <div 
                    className="w-full bg-green-500/30 border-t-2 border-green-500 rounded-t-sm transition-all duration-500 ease-out hover:bg-green-500/60 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 cursor-pointer"
                    style={{ height: `${(data.revenue / 22000) * 100}%` }}
                  />
                  <p className={`text-xs font-bold leading-normal transition-all duration-300 group-hover:scale-110 ${
                    isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                  }`}>
                    {data.day}
                  </p>
                  <p className={`text-xs font-bold transition-all duration-300 group-hover:text-green-500 group-hover:scale-110 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    ₺{(data.revenue / 1000).toFixed(1)}k
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Activity Chart */}
        <Card className={`p-6 border rounded-lg ${
          isDarkMode 
            ? 'bg-[#112217] border-[#326744]' 
            : 'bg-white border-gray-200'
        }`}>
          <CardHeader className="pb-4">
            <CardTitle className={`text-xl font-bold flex items-center gap-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <Users className="h-5 w-5 text-blue-500" />
              User Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end justify-between gap-2">
              {weeklyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-2 flex-1 group">
                  <div 
                    className="w-full bg-blue-500/30 border-t-2 border-blue-500 rounded-t-sm transition-all duration-500 ease-out hover:bg-blue-500/60 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer"
                    style={{ height: `${(data.users / 310) * 100}%` }}
                  />
                  <p className={`text-xs font-bold leading-normal transition-all duration-300 group-hover:scale-110 ${
                    isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                  }`}>
                    {data.day}
                  </p>
                  <p className={`text-xs font-bold transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {data.users}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Distribution */}
      <Card className={`p-6 border rounded-lg ${
        isDarkMode 
          ? 'bg-[#112217] border-[#326744]' 
          : 'bg-white border-gray-200'
      }`}>
        <CardHeader className="pb-4">
          <CardTitle className={`text-xl font-bold flex items-center gap-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <PieChartIcon className="h-5 w-5 text-purple-500" />
            Revenue by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Chart Visualization */}
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-green-500 via-yellow-500 via-purple-500 to-gray-500"></div>
                <div className="absolute inset-4 rounded-full bg-[#112217] flex items-center justify-center">
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      ₺125k
                    </p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                    }`}>
                      Total Revenue
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Category List */}
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                    <div>
                      <p className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {category.name}
                      </p>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                      }`}>
                        ₺{category.value.toLocaleString('en-US')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {category.percentage}%
                    </p>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${category.color}`}
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
