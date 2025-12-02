"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  FileText,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Trash2,
  Calendar,
  Server,
  Database,
  Wifi,
  WifiOff,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Lock,
  Key,
  User,
  Users,
  Monitor,
  Cpu,
  HardDrive,
  Thermometer,
  Battery,
  Globe,
  Smartphone,
  Laptop,
  Tablet,
  Router,
  Cloud,
  Sun,
  Moon,
  BellRing,
  HelpCircle,
  Settings,
  LogOut,
  BarChart3,
  LineChart,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Info,
  X,
  Check,
  Zap as ZapIcon
} from "lucide-react"

interface LogEntry {
  id: string
  timestamp: string
  level: "info" | "warning" | "error" | "debug" | "critical"
  source: string
  message: string
  details?: string
  userId?: string
  sessionId?: string
  ip?: string
  userAgent?: string
  duration?: number
  status?: number
  method?: string
  endpoint?: string
}

interface LogStats {
  total: number
  info: number
  warning: number
  error: number
  debug: number
  critical: number
}

export default function AdminLogs() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<string>("all")
  const [selectedSource, setSelectedSource] = useState<string>("all")
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("24h")

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "1",
      timestamp: "2024-01-15T14:32:25Z",
      level: "info",
      source: "auth",
      message: "User login successful",
      details: "User john.doe@example.com logged in from 192.168.1.100",
      userId: "user_123",
      sessionId: "sess_456",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    },
    {
      id: "2",
      timestamp: "2024-01-15T14:31:18Z",
      level: "warning",
      source: "api",
      message: "High memory usage detected",
      details: "Memory usage at 85% threshold",
      duration: 1250,
      status: 200,
      method: "GET",
      endpoint: "/api/users"
    },
    {
      id: "3",
      timestamp: "2024-01-15T14:30:45Z",
      level: "error",
      source: "database",
      message: "Connection timeout",
      details: "Failed to connect to PostgreSQL server after 30 seconds",
      ip: "192.168.1.10"
    },
    {
      id: "4",
      timestamp: "2024-01-15T14:29:12Z",
      level: "critical",
      source: "security",
      message: "Multiple failed login attempts",
      details: "5 failed attempts from IP 192.168.1.200",
      userId: "user_789",
      ip: "192.168.1.200"
    },
    {
      id: "5",
      timestamp: "2024-01-15T14:28:33Z",
      level: "info",
      source: "system",
      message: "Backup completed successfully",
      details: "Database backup completed in 2.5 minutes",
      duration: 150000
    },
    {
      id: "6",
      timestamp: "2024-01-15T14:27:15Z",
      level: "debug",
      source: "api",
      message: "Request processed",
      details: "GET /api/analytics processed successfully",
      method: "GET",
      endpoint: "/api/analytics",
      status: 200,
      duration: 450
    }
  ])

  const stats: LogStats = {
    total: logs.length,
    info: logs.filter(l => l.level === "info").length,
    warning: logs.filter(l => l.level === "warning").length,
    error: logs.filter(l => l.level === "error").length,
    debug: logs.filter(l => l.level === "debug").length,
    critical: logs.filter(l => l.level === "critical").length
  }

  const sources = ["all", "auth", "api", "database", "security", "system", "frontend", "backend"]
  const levels = ["all", "info", "warning", "error", "debug", "critical"]
  const timeRanges = ["1h", "6h", "24h", "7d", "30d"]

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesLevel = selectedLevel === "all" || log.level === selectedLevel
    const matchesSource = selectedSource === "all" || log.source === selectedSource
    return matchesSearch && matchesLevel && matchesSource
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "info": return "bg-blue-500/20 text-blue-400"
      case "warning": return "bg-yellow-500/20 text-yellow-400"
      case "error": return "bg-red-500/20 text-red-400"
      case "critical": return "bg-red-600/20 text-red-500"
      case "debug": return "bg-gray-500/20 text-gray-400"
      default: return "bg-gray-500/20 text-gray-400"
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "auth": return <Shield className="h-4 w-4" />
      case "api": return <ZapIcon className="h-4 w-4" />
      case "database": return <Database className="h-4 w-4" />
      case "security": return <Lock className="h-4 w-4" />
      case "system": return <Server className="h-4 w-4" />
      case "frontend": return <Monitor className="h-4 w-4" />
      case "backend": return <Cpu className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleRefreshLogs = () => {
    console.log("Refreshing logs...")
    // Simulate log refresh
  }

  const handleExportLogs = () => {
    console.log("Exporting logs...")
    // Simulate log export
  }

  const handleClearLogs = () => {
    setLogs([])
  }

  return (
    <div className={`min-h-screen font-display ${isDarkMode ? "dark bg-[#102216]" : "bg-[#f6f8f6]"}`}>
      <div className="flex h-full flex-1">
        {/* Sidebar */}
        <aside className={`flex h-screen min-h-[700px] w-64 flex-col justify-between p-4 sticky top-0 ${
          isDarkMode ? "bg-[#112217]" : "bg-white border-r border-gray-200"
        }`}>
          <div className="flex flex-col gap-4">
            {/* User Profile */}
            <div className="flex gap-3">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className={`text-base font-medium leading-normal ${isDarkMode ? "text-white" : "text-gray-900"}`}>Admin Name</h1>
                <p className={`text-sm font-normal leading-normal ${isDarkMode ? "text-[#92c9a4]" : "text-gray-600"}`}>Administrator</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
              <a href="/admin" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode ? "hover:bg-[#23482f] text-white" : "hover:bg-gray-100 text-gray-700"
              }`}>
                <ZapIcon className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">Dashboard</p>
              </a>
              <a href="/admin/analytics" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode ? "hover:bg-[#23482f] text-white" : "hover:bg-gray-100 text-gray-700"
              }`}>
                <BarChart3 className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">Analytics</p>
              </a>
              <a href="/admin/users" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode ? "hover:bg-[#23482f] text-white" : "hover:bg-gray-100 text-gray-700"
              }`}>
                <Users className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">User Management</p>
              </a>
              <a href="/admin/settings" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode ? "hover:bg-[#23482f] text-white" : "hover:bg-gray-100 text-gray-700"
              }`}>
                <Settings className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">Settings</p>
              </a>
              <a href="/admin/logs" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode ? "bg-[#23482f] text-white" : "bg-green-100 text-green-700"
              }`}>
                <FileText className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">System Logs</p>
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Top Navigation */}
          <header className={`flex items-center justify-between whitespace-nowrap px-10 py-3 sticky top-0 backdrop-blur-sm z-10 border-b ${
            isDarkMode 
              ? "bg-[#112217]/80 border-[#23482f]" 
              : "bg-white/80 border-gray-200"
          }`}>
            <div className="flex items-center gap-8">
              <div className={`flex items-center gap-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <div className="size-6 text-green-500">
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">System Logs</h2>
              </div>
              
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? "text-[#92c9a4]" : "text-gray-400"
                }`} />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg border w-64 ${
                    isDarkMode 
                      ? "bg-[#23482f] border-[#23482f] text-white placeholder-[#92c9a4]" 
                      : "bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-400"
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
                    ? "hover:bg-[#23482f] text-white" 
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              <Button variant="outline" onClick={handleExportLogs} className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button onClick={handleRefreshLogs} className="bg-green-500 hover:bg-green-600">
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
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                System Logs
              </h1>
              
              <div className="flex gap-2">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? "bg-[#23482f] border-[#23482f] text-white" 
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                >
                  {levels.map(level => (
                    <option key={level} value={level}>
                      {level === "all" ? "All Levels" : level.toUpperCase()}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? "bg-[#23482f] border-[#23482f] text-white" 
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                >
                  {sources.map(source => (
                    <option key={source} value={source}>
                      {source === "all" ? "All Sources" : source.charAt(0).toUpperCase() + source.slice(1)}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? "bg-[#23482f] border-[#23482f] text-white" 
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                >
                  {timeRanges.map(range => (
                    <option key={range} value={range}>
                      Last {range}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
              <Card className={`p-6 border rounded-lg ${
                isDarkMode 
                  ? "bg-[#112217] border-[#326744]" 
                  : "bg-white border-gray-200"
              }`}>
                <div className="flex flex-col gap-2">
                  <p className={`text-base font-medium leading-normal ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    Total Logs
                  </p>
                  <p className={`text-2xl font-bold leading-tight ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {stats.total}
                  </p>
                  <div className="flex items-center gap-1">
                    <Activity className="h-4 w-4 text-blue-500" />
                    <p className="text-base font-medium leading-normal text-blue-500">
                      Active
                    </p>
                  </div>
                </div>
              </Card>

              {Object.entries(stats).filter(([key]) => key !== "total").map(([level, count]) => (
                <Card key={level} className={`p-6 border rounded-lg ${
                  isDarkMode 
                    ? "bg-[#112217] border-[#326744]" 
                    : "bg-white border-gray-200"
                }`}>
                  <div className="flex flex-col gap-2">
                    <p className={`text-base font-medium leading-normal ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </p>
                    <p className={`text-2xl font-bold leading-tight ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {count}
                    </p>
                    <div className="flex items-center gap-1">
                      {level === "info" && <CheckCircle className="h-4 w-4 text-blue-500" />}
                      {level === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                      {level === "error" && <X className="h-4 w-4 text-red-500" />}
                      {level === "critical" && <AlertTriangle className="h-4 w-4 text-red-600" />}
                      {level === "debug" && <Info className="h-4 w-4 text-gray-500" />}
                      <p className={`text-base font-medium leading-normal ${
                        level === "info" ? "text-blue-500" :
                        level === "warning" ? "text-yellow-500" :
                        level === "error" ? "text-red-500" :
                        level === "critical" ? "text-red-600" : "text-gray-500"
                      }`}>
                        {Math.round((count / stats.total) * 100)}%
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Logs Table */}
            <Card className={`border rounded-lg ${
              isDarkMode 
                ? "bg-[#112217] border-[#326744]" 
                : "bg-white border-gray-200"
            }`}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    Recent Logs ({filteredLogs.length})
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleClearLogs}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${
                        isDarkMode ? "border-[#326744]" : "border-gray-200"
                      }`}>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                        }`}>Timestamp</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                        }`}>Level</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                        }`}>Source</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                        }`}>Message</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                        }`}>Details</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                        }`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.map((log) => (
                        <tr key={log.id} className={`border-b transition-colors ${
                          isDarkMode 
                            ? "border-[#326744] hover:bg-white/5" 
                            : "border-gray-200 hover:bg-gray-50"
                        }`}>
                          <td className={`p-4 text-sm ${
                            isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                          }`}>
                            <div>
                              <p>{new Date(log.timestamp).toLocaleDateString()}</p>
                              <p>{new Date(log.timestamp).toLocaleTimeString()}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(log.level)}`}>
                              {log.level.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {getSourceIcon(log.source)}
                              <span className={`text-sm capitalize ${
                                isDarkMode ? "text-white" : "text-gray-900"
                              }`}>
                                {log.source}
                              </span>
                            </div>
                          </td>
                          <td className={`p-4 text-sm ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}>
                            {log.message}
                          </td>
                          <td className={`p-4 text-sm ${
                            isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                          }`}>
                            <div className="max-w-xs truncate">
                              {log.details}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                <Trash2 className="h-4 w-4" />
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
