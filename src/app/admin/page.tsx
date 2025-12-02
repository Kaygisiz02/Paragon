"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AdminLayout from "@/components/admin/AdminLayout"
import { 
  Users,
  Activity,
  AlertTriangle,
  TrendingUp,
  Download,
  Upload,
  RefreshCw,
  Calendar,
  Filter,
  Zap,
  Shield,
  Database,
  Server,
  HardDrive,
  Wifi,
  Battery,
  Thermometer,
  Gauge,
  PieChart,
  LineChart,
  BarChart3,
  Clock,
  ArrowUp,
  ArrowDown,
  Eye,
  Settings,
  BellRing,
  Mail,
  MessageSquare,
  Star,
  Award,
  Target,
  Rocket,
  Sparkles,
  UserPlus
} from "lucide-react"

interface DashboardStat {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ElementType
  color: string
}

export default function AdminDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const stats: DashboardStat[] = [
    {
      title: "Total Users",
      value: "8,549",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Active Sessions",
      value: "1,234",
      change: "+5.2%",
      trend: "up",
      icon: Activity,
      color: "text-green-500"
    },
    {
      title: "System Health",
      value: "98.5%",
      change: "-0.3%",
      trend: "down",
      icon: Shield,
      color: "text-purple-500"
    },
    {
      title: "Alerts",
      value: "23",
      change: "-18.2%",
      trend: "down",
      icon: AlertTriangle,
      color: "text-orange-500"
    }
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
        <RefreshCw className="h-4 w-4 mr-2" />
        Refresh
      </Button>
    </>
  )

  return (
    <AdminLayout
      title="Dashboard"
      icon={Zap}
      currentPage="/admin"
      searchPlaceholder="Search dashboard..."
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      actionButtons={actionButtons}
      isDarkMode={isDarkMode}
      onThemeToggle={toggleTheme}
    >
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between gap-3 p-4 mb-6">
        <h1 className={`text-4xl font-black leading-tight tracking-[-0.033em] min-w-72 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}>
          Dashboard
        </h1>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 7 Days
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className={`p-6 border rounded-lg ${
            isDarkMode 
              ? "bg-[#112217] border-[#326744]" 
              : "bg-white border-gray-200"
          }`}>
            <CardContent className="p-0">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className={`text-base font-medium leading-normal ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {stat.title}
                  </p>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                
                <p className={`text-2xl font-bold leading-tight ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {stat.value}
                </p>
                
                <div className="flex items-center gap-1">
                  {stat.trend === "up" ? (
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  ) : stat.trend === "down" ? (
                    <ArrowDown className="h-4 w-4 text-red-500" />
                  ) : (
                    <div className="h-4 w-4" />
                  )}
                  <p className={`text-base font-medium leading-normal ${
                    stat.trend === "up" ? "text-green-500" : 
                    stat.trend === "down" ? "text-red-500" : 
                    "text-gray-500"
                  }`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className={`p-6 border rounded-lg ${
          isDarkMode 
            ? "bg-[#112217] border-[#326744]" 
            : "bg-white border-gray-200"
        }`}>
          <CardHeader className="pb-4">
            <CardTitle className={`text-lg font-bold flex items-center gap-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              <LineChart className="h-5 w-5 text-blue-500" />
              User Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`h-64 rounded-lg flex items-center justify-center ${
              isDarkMode ? "bg-[#23482f]" : "bg-gray-100"
            }`}>
              <div className="text-center">
                <LineChart className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                <p className={`text-sm ${
                  isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                }`}>
                  Activity chart will be rendered here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`p-6 border rounded-lg ${
          isDarkMode 
            ? "bg-[#112217] border-[#326744]" 
            : "bg-white border-gray-200"
        }`}>
          <CardHeader className="pb-4">
            <CardTitle className={`text-lg font-bold flex items-center gap-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              <PieChart className="h-5 w-5 text-green-500" />
              System Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`h-64 rounded-lg flex items-center justify-center ${
              isDarkMode ? "bg-[#23482f]" : "bg-gray-100"
            }`}>
              <div className="text-center">
                <PieChart className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <p className={`text-sm ${
                  isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                }`}>
                  Resources chart will be rendered here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className={`p-6 border rounded-lg ${
        isDarkMode 
          ? "bg-[#112217] border-[#326744]" 
          : "bg-white border-gray-200"
      }`}>
        <CardHeader className="pb-4">
          <CardTitle className={`text-lg font-bold flex items-center gap-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            <Clock className="h-5 w-5 text-purple-500" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: "John Doe", action: "logged in", time: "2 minutes ago", icon: Users },
              { user: "Jane Smith", action: "updated settings", time: "15 minutes ago", icon: Settings },
              { user: "System", action: "backup completed", time: "1 hour ago", icon: Database },
              { user: "Admin", action: "created new user", time: "2 hours ago", icon: UserPlus }
            ].map((activity, index) => (
              <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
                isDarkMode ? "bg-[#23482f]" : "bg-gray-50"
              }`}>
                <activity.icon className={`h-4 w-4 ${
                  isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                }`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    <span className="font-semibold">{activity.user}</span> {activity.action}
                  </p>
                  <p className={`text-xs ${
                    isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                  }`}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
