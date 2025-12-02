"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Monitor,
  Activity,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  Thermometer,
  Zap,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Sun,
  Moon,
  Search,
  BellRing,
  HelpCircle,
  RefreshCw,
  Download,
  Filter,
  Eye,
  Settings,
  Users,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Info,
  Database,
  Globe,
  Smartphone,
  Laptop,
  Tablet,
  Monitor as MonitorIcon,
  Router,
  Cloud,
  Shield,
  Lock,
  Key,
  BarChart3,
  LineChart,
  PieChart,
  Gauge
} from "lucide-react"

interface TelemetryData {
  id: string
  name: string
  type: "server" | "database" | "network" | "storage" | "application"
  status: "healthy" | "warning" | "error" | "offline"
  cpu: number
  memory: number
  disk: number
  network: number
  temperature?: number
  uptime: string
  lastUpdate: string
  location?: string
  version?: string
}

interface MetricCard {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  color: string
  icon: React.ElementType
  description?: string
  progress?: number
}

export default function AdminTelemetry() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")

  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([
    {
      id: "1",
      name: "Main Server",
      type: "server",
      status: "healthy",
      cpu: 42,
      memory: 68,
      disk: 35,
      network: 25,
      temperature: 45,
      uptime: "15d 8h 32m",
      lastUpdate: "2 minutes ago",
      location: "Istanbul, TR",
      version: "v2.4.1"
    },
    {
      id: "2",
      name: "Database Server",
      type: "database",
      status: "healthy",
      cpu: 28,
      memory: 82,
      disk: 67,
      network: 15,
      temperature: 38,
      uptime: "45d 12h 15m",
      lastUpdate: "1 minute ago",
      location: "Istanbul, TR",
      version: "PostgreSQL 14.2"
    },
    {
      id: "3",
      name: "API Gateway",
      type: "server",
      status: "warning",
      cpu: 78,
      memory: 45,
      disk: 22,
      network: 85,
      temperature: 62,
      uptime: "8d 3h 45m",
      lastUpdate: "30 seconds ago",
      location: "Frankfurt, DE",
      version: "v1.8.3"
    },
    {
      id: "4",
      name: "Redis Cache",
      type: "database",
      status: "healthy",
      cpu: 15,
      memory: 34,
      disk: 12,
      network: 45,
      uptime: "30d 18h 22m",
      lastUpdate: "5 minutes ago",
      location: "Istanbul, TR",
      version: "Redis 7.0"
    },
    {
      id: "5",
      name: "Storage Server",
      type: "storage",
      status: "warning",
      cpu: 22,
      memory: 18,
      disk: 89,
      network: 12,
      temperature: 35,
      uptime: "60d 5h 10m",
      lastUpdate: "3 minutes ago",
      location: "Amsterdam, NL",
      version: "v3.1.0"
    },
    {
      id: "6",
      name: "Load Balancer",
      type: "network",
      status: "healthy",
      cpu: 18,
      memory: 25,
      disk: 8,
      network: 92,
      uptime: "90d 0h 0m",
      lastUpdate: "1 minute ago",
      location: "London, UK",
      version: "v2.0.5"
    }
  ])

  const metrics: MetricCard[] = [
    {
      title: "Total Systems",
      value: telemetryData.length.toString(),
      change: "+2",
      trend: "up",
      color: "text-green-400",
      icon: Monitor,
      description: "Active systems monitored"
    },
    {
      title: "Healthy Systems",
      value: telemetryData.filter(d => d.status === "healthy").length.toString(),
      change: "+1",
      trend: "up",
      color: "text-green-400",
      icon: CheckCircle,
      description: "Systems running normally"
    },
    {
      title: "Warning Systems",
      value: telemetryData.filter(d => d.status === "warning").length.toString(),
      change: "+1",
      trend: "up",
      color: "text-yellow-400",
      icon: AlertTriangle,
      description: "Systems requiring attention"
    },
    {
      title: "Error Systems",
      value: telemetryData.filter(d => d.status === "error").length.toString(),
      change: "0",
      trend: "neutral",
      color: "text-red-400",
      icon: AlertTriangle,
      description: "Systems with critical issues"
    },
    {
      title: "Avg CPU Usage",
      value: `${Math.round(telemetryData.reduce((acc, d) => acc + d.cpu, 0) / telemetryData.length)}%`,
      change: "+5.2%",
      trend: "up",
      color: "text-blue-400",
      icon: Cpu,
      description: "Average CPU utilization",
      progress: Math.round(telemetryData.reduce((acc, d) => acc + d.cpu, 0) / telemetryData.length)
    },
    {
      title: "Avg Memory Usage",
      value: `${Math.round(telemetryData.reduce((acc, d) => acc + d.memory, 0) / telemetryData.length)}%`,
      change: "+2.1%",
      trend: "up",
      color: "text-purple-400",
      icon: HardDrive,
      description: "Average memory utilization",
      progress: Math.round(telemetryData.reduce((acc, d) => acc + d.memory, 0) / telemetryData.length)
    }
  ]

  const typeDistribution = [
    { type: "server", count: telemetryData.filter(d => d.type === "server").length, color: "bg-blue-500" },
    { type: "database", count: telemetryData.filter(d => d.type === "database").length, color: "bg-green-500" },
    { type: "network", count: telemetryData.filter(d => d.type === "network").length, color: "bg-purple-500" },
    { type: "storage", count: telemetryData.filter(d => d.type === "storage").length, color: "bg-yellow-500" },
    { type: "application", count: telemetryData.filter(d => d.type === "application").length, color: "bg-red-500" }
  ]

  const filteredData = telemetryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || item.type === selectedType
    return matchesSearch && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-green-500/20 text-green-400"
      case "warning": return "bg-yellow-500/20 text-yellow-400"
      case "error": return "bg-red-500/20 text-red-400"
      case "offline": return "bg-gray-500/20 text-gray-400"
      default: return "bg-gray-500/20 text-gray-400"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "server": return <Server className="h-4 w-4" />
      case "database": return <Database className="h-4 w-4" />
      case "network": return <Wifi className="h-4 w-4" />
      case "storage": return <HardDrive className="h-4 w-4" />
      case "application": return <MonitorIcon className="h-4 w-4" />
      default: return <Monitor className="h-4 w-4" />
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleRefreshData = () => {
    console.log("Refreshing telemetry data...")
    // Simulate data refresh
  }

  return (
    <div className={`min-h-screen font-display ${isDarkMode ? 'dark bg-[#102216]' : 'bg-[#f6f8f6]'}`}>
      <div className="flex h-full flex-1">
        {/* Sidebar */}
        <aside className={`flex h-screen min-h-[700px] w-64 flex-col justify-between p-4 sticky top-0 ${
          isDarkMode ? 'bg-[#112217]' : 'bg-white border-r border-gray-200'
        }`}>
          <div className="flex flex-col gap-4">
            {/* User Profile */}
            <div className="flex gap-3">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <Monitor className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className={`text-base font-medium leading-normal ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Admin Name</h1>
                <p className={`text-sm font-normal leading-normal ${isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'}`}>Administrator</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
              <a href="/admin" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-[#23482f] text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}>
                <Zap className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">Dashboard</p>
              </a>
              <a href="/admin/analytics" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-[#23482f] text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}>
                <BarChart3 className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">Analytics</p>
              </a>
              <a href="/admin/users" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-[#23482f] text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}>
                <Users className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">User Management</p>
              </a>
              <a href="/admin/settings" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-[#23482f] text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}>
                <Settings className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">Settings</p>
              </a>
              <a href="/admin/telemetry" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode ? 'bg-[#23482f] text-white' : 'bg-green-100 text-green-700'
              }`}>
                <Monitor className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">Telemetry</p>
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Top Navigation */}
          <header className={`flex items-center justify-between whitespace-nowrap px-10 py-3 sticky top-0 backdrop-blur-sm z-10 border-b ${
            isDarkMode 
              ? 'bg-[#112217]/80 border-[#23482f]' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <div className="flex items-center gap-8">
              <div className={`flex items-center gap-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <div className="size-6 text-green-500">
                  <Monitor className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">System Telemetry</h2>
              </div>
              
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? 'text-[#92c9a4]' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search systems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg border w-64 ${
                    isDarkMode 
                      ? 'bg-[#23482f] border-[#23482f] text-white placeholder-[#92c9a4]' 
                      : 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={toggleTheme}
                variant="ghost"
                className={`p-2 rounded-lg ${
                  isDarkMode 
                    ? 'hover:bg-[#23482f] text-white' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button onClick={handleRefreshData} className="bg-green-500 hover:bg-green-600">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-10">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between gap-3 p-4 mb-6">
              <h1 className={`text-4xl font-black leading-tight tracking-[-0.033em] min-w-72 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                System Telemetry
              </h1>
              
              <div className="flex gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-[#23482f] border-[#23482f] text-white' 
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                >
                  <option value="all">All Types</option>
                  <option value="server">Servers</option>
                  <option value="database">Databases</option>
                  <option value="network">Network</option>
                  <option value="storage">Storage</option>
                  <option value="application">Applications</option>
                </select>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
              {metrics.map((metric, index) => (
                <Card key={index} className={`p-6 border rounded-lg ${
                  isDarkMode 
                    ? 'bg-[#112217] border-[#326744]' 
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="flex flex-col gap-2">
                    <p className={`text-base font-medium leading-normal ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {metric.title}
                    </p>
                    <p className={`text-2xl font-bold leading-tight ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {metric.value}
                    </p>
                    <div className="flex items-center gap-1">
                      {metric.trend === "up" && <ArrowUp className="h-4 w-4 text-green-500" />}
                      {metric.trend === "down" && <ArrowDown className="h-4 w-4 text-red-500" />}
                      <p className={`text-base font-medium leading-normal ${
                        metric.trend === "up" ? "text-green-500" : 
                        metric.trend === "down" ? "text-red-500" : "text-gray-500"
                      }`}>
                        {metric.change}
                      </p>
                    </div>
                    {metric.progress !== undefined && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${metric.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Type Distribution */}
            <Card className={`p-6 border rounded-lg mb-6 ${
              isDarkMode 
                ? 'bg-[#112217] border-[#326744]' 
                : 'bg-white border-gray-200'
            }`}>
              <CardHeader className="pb-4">
                <CardTitle className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  System Type Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {typeDistribution.map((type, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-16 h-16 rounded-lg ${type.color} flex items-center justify-center mx-auto mb-2`}>
                        {getTypeIcon(type.type)}
                      </div>
                      <p className={`font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {type.count}
                      </p>
                      <p className={`text-sm capitalize ${
                        isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                      }`}>
                        {type.type}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Telemetry Data Table */}
            <Card className={`border rounded-lg ${
              isDarkMode 
                ? 'bg-[#112217] border-[#326744]' 
                : 'bg-white border-gray-200'
            }`}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Systems ({filteredData.length})
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${
                        isDarkMode ? 'border-[#326744]' : 'border-gray-200'
                      }`}>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                        }`}>System</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                        }`}>Type</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                        }`}>Status</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                        }`}>CPU</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                        }`}>Memory</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                        }`}>Disk</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                        }`}>Network</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                        }`}>Uptime</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                        }`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((system) => (
                        <tr key={system.id} className={`border-b transition-colors ${
                          isDarkMode 
                            ? 'border-[#326744] hover:bg-white/5' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}>
                          <td className="p-4">
                            <div>
                              <p className={`font-medium ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {system.name}
                              </p>
                              <p className={`text-sm ${
                                isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                              }`}>
                                {system.location}
                              </p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(system.type)}
                              <span className={`text-sm capitalize ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {system.type}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(system.status)}`}>
                              {system.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    system.cpu > 80 ? 'bg-red-500' : 
                                    system.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${system.cpu}%` }}
                                />
                              </div>
                              <span className={`text-sm ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {system.cpu}%
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    system.memory > 80 ? 'bg-red-500' : 
                                    system.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${system.memory}%` }}
                                />
                              </div>
                              <span className={`text-sm ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {system.memory}%
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    system.disk > 80 ? 'bg-red-500' : 
                                    system.disk > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${system.disk}%` }}
                                />
                              </div>
                              <span className={`text-sm ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {system.disk}%
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    system.network > 80 ? 'bg-red-500' : 
                                    system.network > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${system.network}%` }}
                                />
                              </div>
                              <span className={`text-sm ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {system.network}%
                              </span>
                            </div>
                          </td>
                          <td className={`p-4 text-sm ${
                            isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                          }`}>
                            {system.uptime}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
