"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users,
  Activity,
  AlertTriangle,
  TrendingUp,
  Search,
  Bell,
  HelpCircle,
  LayoutDashboard,
  Group,
  ClipboardList,
  Tag,
  Monitor,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Sun,
  Moon,
  Settings,
  LogOut,
  UserPlus,
  Shield,
  Database,
  Zap,
  Server,
  HardDrive,
  Wifi,
  Battery,
  Thermometer,
  Gauge,
  PieChart,
  LineChart,
  BarChart3,
  Calendar,
  Filter,
  BellRing,
  Mail,
  MessageSquare,
  Star,
  Award,
  Target,
  Rocket,
  Sparkles,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  lastActive: string
  avatar?: string
}

interface SystemStat {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  color: string
  icon: React.ElementType
  description?: string
  progress?: number
}

export default function ModernAdminDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "active",
      lastActive: "2 hours ago",
      avatar: "https://ui-avatars.com/api/?name=John+Doe&background=13ec5b&color=fff"
    },
    {
      id: "2", 
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "active",
      lastActive: "5 minutes ago",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=13ec5b&color=fff"
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com", 
      role: "User",
      status: "inactive",
      lastActive: "2 days ago",
      avatar: "https://ui-avatars.com/api/?name=Bob+Johnson&background=fa5538&color=fff"
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Moderator",
      status: "pending",
      lastActive: "1 day ago",
      avatar: "https://ui-avatars.com/api/?name=Alice+Brown&background=13ec5b&color=fff"
    }
  ])

  const stats: SystemStat[] = [
    {
      title: "Total Users",
      value: "1,482",
      change: "+2.5%",
      trend: "up",
      color: "text-green-400",
      icon: Users,
      description: "Active registered users",
      progress: 75
    },
    {
      title: "Active Users (24h)",
      value: "309", 
      change: "+5.1%",
      trend: "up",
      color: "text-green-400",
      icon: Activity,
      description: "Users active in last 24 hours",
      progress: 82
    },
    {
      title: "System Status",
      value: "All Systems Go",
      change: "Operational",
      trend: "up",
      color: "text-green-400",
      icon: Shield,
      description: "All services running normally"
    },
    {
      title: "Errors Logged (24h)",
      value: "3",
      change: "-10%",
      trend: "down", 
      color: "text-red-400",
      icon: AlertTriangle,
      description: "Critical errors in last 24 hours",
      progress: 32
    },
    {
      title: "Server Load",
      value: "42%",
      change: "Stable",
      trend: "neutral",
      color: "text-blue-400",
      icon: Server,
      description: "Average CPU utilization",
      progress: 42
    },
    {
      title: "Storage Used",
      value: "68%",
      change: "+2.1%",
      trend: "up",
      color: "text-yellow-400",
      icon: HardDrive,
      description: "Disk space utilization",
      progress: 68
    }
  ]

  const weeklyData = [
    { day: "Mon", signups: 20, active: 45 },
    { day: "Tue", signups: 60, active: 85 },
    { day: "Wed", signups: 80, active: 120 },
    { day: "Thu", signups: 50, active: 95 },
    { day: "Fri", signups: 90, active: 140 },
    { day: "Sat", signups: 10, active: 65 },
    { day: "Sun", signups: 40, active: 80 }
  ]

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "User Management", href: "/admin/users", icon: Group },
    { name: "System Logs", href: "/admin/logs", icon: ClipboardList },
    { name: "Metadata", href: "/admin/metadata", icon: Tag },
    { name: "Telemetry", href: "/admin/telemetry", icon: Monitor },
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Support", href: "/admin/support", icon: HelpCircle },
    { name: "Log out", href: "/logout", icon: LogOut }
  ]

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleDeleteUsers = () => {
    setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)))
    setSelectedUsers([])
  }

  const handleAddUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name: "New User",
      email: "newuser@example.com",
      role: "User",
      status: "pending",
      lastActive: "Just now",
      avatar: `https://ui-avatars.com/api/?name=New+User&background=13ec5b&color=fff`
    }
    setUsers(prev => [newUser, ...prev])
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
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
                <UserPlus className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className={`text-base font-medium leading-normal ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Admin Name</h1>
                <p className={`text-sm font-normal leading-normal ${isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'}`}>Administrator</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    item.href === "/admin" 
                      ? isDarkMode ? 'bg-[#23482f]' : 'bg-green-100 text-green-700'
                      : isDarkMode ? 'hover:bg-[#23482f]' : 'hover:bg-gray-100'
                  } ${isDarkMode ? 'text-white' : 'text-gray-700'}`}
                >
                  <item.icon className="h-6 w-6" />
                  <p className="text-sm font-medium leading-normal">{item.name}</p>
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <Button 
              onClick={handleAddUser}
              className="bg-green-500 hover:bg-green-600 text-[#112217] font-bold tracking-[0.015em]"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              New User
            </Button>
            
            {selectedUsers.length > 0 && (
              <Button 
                onClick={handleDeleteUsers}
                variant="destructive"
                className="bg-red-500 hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected ({selectedUsers.length})
              </Button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex-col">
          {/* Top Navigation */}
          <header className={`flex items-center justify-between whitespace-nowrap px-10 py-3 sticky top-0 backdrop-blur-sm z-10 border-b ${
            isDarkMode 
              ? 'bg-[#112217]/80 border-[#23482f]' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <div className="flex items-center gap-8">
              <div className={`flex items-center gap-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <div className="size-6 text-green-500">
                  <Zap className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Paragon Admin Dashboard</h2>
              </div>
              
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? 'text-[#92c9a4]' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search"
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
              
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-gradient-to-br from-green-400 to-green-600" />
            </div>
          </header>

          {/* Page Content */}
          <div className="p-10">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between gap-3 p-4 mb-6">
              <h1 className={`text-4xl font-black leading-tight tracking-[-0.033em] min-w-72 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Dashboard
              </h1>
              
              <div className="flex gap-2">
                <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button className="bg-green-500 hover:bg-green-600">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
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
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* New Signups Chart */}
              <Card className={`p-6 border rounded-lg ${
                isDarkMode 
                  ? 'bg-[#112217] border-[#326744]' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="flex flex-col gap-2 mb-4">
                  <p className={`text-base font-medium leading-normal ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    New Signups This Week
                  </p>
                  <p className={`text-2xl font-bold leading-tight ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    112
                  </p>
                  <div className="flex gap-1">
                    <p className={`text-base font-normal leading-normal ${
                      isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                    }`}>
                      Last 7 Days
                    </p>
                    <p className="text-green-500 text-base font-medium leading-normal">+15.2%</p>
                  </div>
                </div>
                
                <div className="h-[200px] flex items-end justify-between gap-2">
                  {weeklyData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1">
                      <div 
                        className="w-full bg-green-500/30 border-t-2 border-green-500 rounded-t-sm transition-all duration-300 hover:bg-green-500/50"
                        style={{ height: `${(data.signups / 90) * 100}%` }}
                      />
                      <p className={`text-xs font-bold leading-normal ${
                        isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                      }`}>
                        {data.day}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Active Users Chart */}
              <Card className={`p-6 border rounded-lg ${
                isDarkMode 
                  ? 'bg-[#112217] border-[#326744]' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="flex flex-col gap-2 mb-4">
                  <p className={`text-base font-medium leading-normal ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Daily Active Users
                  </p>
                  <p className={`text-2xl font-bold leading-tight ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    309
                  </p>
                  <div className="flex gap-1">
                    <p className={`text-base font-normal leading-normal ${
                      isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                    }`}>
                      Last 7 Days
                    </p>
                    <p className="text-green-500 text-base font-medium leading-normal">+5.1%</p>
                  </div>
                </div>
                
                <div className="h-[200px] flex items-end justify-between gap-2">
                  {weeklyData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1">
                      <div 
                        className="w-full bg-blue-500/30 border-t-2 border-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-500/50"
                        style={{ height: `${(data.active / 140) * 100}%` }}
                      />
                      <p className={`text-xs font-bold leading-normal ${
                        isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                      }`}>
                        {data.day}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Users Table */}
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
                    User Management
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
                        <th className="text-left p-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.length === users.length}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers(users.map(u => u.id))
                              } else {
                                setSelectedUsers([])
                              }
                            }}
                            className="rounded"
                          />
                        </th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                        }`}>User</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                        }`}>Role</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                        }`}>Status</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                        }`}>Last Active</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                        }`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className={`border-b transition-colors hover:bg-opacity-10 ${
                          isDarkMode 
                            ? 'border-[#326744] hover:bg-white/5' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}>
                          <td className="p-4">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => handleUserSelect(user.id)}
                              className="rounded"
                            />
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                <UserPlus className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <p className={`font-medium ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {user.name}
                                </p>
                                <p className={`text-sm ${
                                  isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                                }`}>
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === 'Admin' ? 'bg-purple-500/20 text-purple-400' :
                              user.role === 'Moderator' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.status === 'active' ? 'bg-green-500/20 text-green-400' :
                              user.status === 'inactive' ? 'bg-red-500/20 text-red-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className={`p-4 text-sm ${
                            isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                          }`}>
                            {user.lastActive}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setUsers(prev => prev.filter(u => u.id !== user.id))}
                                className="text-red-400 hover:text-red-300"
                              >
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
