"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AdminLayout from "@/components/admin/AdminLayout"
import { 
  Users,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Sun,
  Moon,
  BellRing,
  HelpCircle,
  Shield,
  Mail,
  Calendar,
  MoreVertical,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Zap,
  Settings,
  Lock,
  Key,
  UserCheck,
  UserX,
  Crown,
  Star,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Ban
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Moderator" | "User" | "VIP"
  status: "active" | "inactive" | "pending" | "suspended"
  lastActive: string
  joinDate: string
  avatar?: string
  permissions: string[]
  revenue?: number
  transactions?: number
}

export default function AdminUsers() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [filterRole, setFilterRole] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  // Client-side only formatting to avoid hydration issues
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const formatCurrency = (value: number) => {
    if (!mounted) return `₺${value}`
    return `₺${value.toLocaleString('en-US')}`
  }

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "active",
      lastActive: "2 minutes ago",
      joinDate: "2023-01-15",
      avatar: "https://ui-avatars.com/api/?name=John+Doe&background=13ec5b&color=fff",
      permissions: ["all"],
      revenue: 125000,
      transactions: 342
    },
    {
      id: "2", 
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Moderator",
      status: "active",
      lastActive: "5 minutes ago",
      joinDate: "2023-03-20",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=3b82f6&color=fff",
      permissions: ["moderate", "view", "edit"],
      revenue: 85000,
      transactions: 256
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob.johnson@example.com", 
      role: "User",
      status: "inactive",
      lastActive: "2 days ago",
      joinDate: "2023-06-10",
      avatar: "https://ui-avatars.com/api/?name=Bob+Johnson&background=fa5538&color=fff",
      permissions: ["view"],
      revenue: 45000,
      transactions: 128
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice.brown@example.com",
      role: "VIP",
      status: "active",
      lastActive: "1 hour ago",
      joinDate: "2023-02-28",
      avatar: "https://ui-avatars.com/api/?name=Alice+Brown&background=f59e0b&color=fff",
      permissions: ["view", "priority"],
      revenue: 250000,
      transactions: 567
    },
    {
      id: "5",
      name: "Charlie Wilson",
      email: "charlie.wilson@example.com",
      role: "User",
      status: "pending",
      lastActive: "Never",
      joinDate: "2023-11-15",
      avatar: "https://ui-avatars.com/api/?name=Charlie+Wilson&background=6b7280&color=fff",
      permissions: ["view"],
      revenue: 0,
      transactions: 0
    },
    {
      id: "6",
      name: "Diana Martinez",
      email: "diana.martinez@example.com",
      role: "Moderator",
      status: "suspended",
      lastActive: "3 days ago",
      joinDate: "2023-04-05",
      avatar: "https://ui-avatars.com/api/?name=Diana+Martinez&background=ef4444&color=fff",
      permissions: ["moderate", "view"],
      revenue: 32000,
      transactions: 89
    }
  ])

  const stats = [
    {
      title: "Total Users",
      value: users.length.toString(),
      change: "+12.5%",
      trend: "up" as const,
      color: "text-green-400",
      icon: Users
    },
    {
      title: "Active Users",
      value: users.filter(u => u.status === "active").length.toString(),
      change: "+8.2%",
      trend: "up" as const,
      color: "text-green-400",
      icon: UserCheck
    },
    {
      title: "Pending",
      value: users.filter(u => u.status === "pending").length.toString(),
      change: "-2.1%",
      trend: "down" as const,
      color: "text-yellow-400",
      icon: Clock
    },
    {
      title: "Suspended",
      value: users.filter(u => u.status === "suspended").length.toString(),
      change: "+1",
      trend: "up" as const,
      color: "text-red-400",
      icon: Ban
    }
  ]

  const roleDistribution = [
    { role: "Admin", count: users.filter(u => u.role === "Admin").length, color: "bg-purple-500" },
    { role: "Moderator", count: users.filter(u => u.role === "Moderator").length, color: "bg-blue-500" },
    { role: "VIP", count: users.filter(u => u.role === "VIP").length, color: "bg-yellow-500" },
    { role: "User", count: users.filter(u => u.role === "User").length, color: "bg-green-500" }
  ]

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id))
    }
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
      joinDate: new Date().toISOString().split('T')[0],
      avatar: `https://ui-avatars.com/api/?name=New+User&background=13ec5b&color=fff`,
      permissions: ["view"],
      revenue: 0,
      transactions: 0
    }
    setUsers(prev => [newUser, ...prev])
  }

  const handleToggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === "active" ? "inactive" : "active"
        return { ...user, status: newStatus }
      }
      return user
    }))
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin": return <Crown className="h-4 w-4" />
      case "Moderator": return <Shield className="h-4 w-4" />
      case "VIP": return <Star className="h-4 w-4" />
      default: return <Users className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/20 text-green-400"
      case "inactive": return "bg-gray-500/20 text-gray-400"
      case "pending": return "bg-yellow-500/20 text-yellow-400"
      case "suspended": return "bg-red-500/20 text-red-400"
      default: return "bg-gray-500/20 text-gray-400"
    }
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
      <Button onClick={handleAddUser} className="bg-green-500 hover:bg-green-600">
        <UserPlus className="h-4 w-4 mr-2" />
        Add User
      </Button>
    </>
  )

  return (
    <AdminLayout
      title="User Management"
      icon={Users}
      currentPage="/admin/users"
      searchPlaceholder="Search users..."
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      actionButtons={actionButtons}
      isDarkMode={isDarkMode}
      onThemeToggle={toggleTheme}
    >
      <div className="flex flex-wrap justify-between gap-3 p-4 mb-6">
        <h1 className={`text-4xl font-black leading-tight tracking-[-0.033em] min-w-72 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          User Management
        </h1>
        <div className="flex gap-2">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className={`px-3 py-2 rounded-lg border ${
              isDarkMode 
                ? 'bg-[#23482f] border-[#23482f] text-white' 
                : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="VIP">VIP</option>
            <option value="User">User</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-3 py-2 rounded-lg border ${
              isDarkMode 
                ? 'bg-[#23482f] border-[#23482f] text-white' 
                : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                <p className={`text-base font-medium leading-normal ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Role Distribution */}
      <Card className={`p-6 border rounded-lg mb-6 ${
        isDarkMode 
          ? 'bg-[#112217] border-[#326744]' 
          : 'bg-white border-gray-200'
      }`}>
        <CardHeader className="pb-4">
          <CardTitle className={`text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Role Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {roleDistribution.map((role, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-lg ${role.color} flex items-center justify-center mx-auto mb-2`}>
                  <Users className="h-8 w-8 text-white" />
                </div>
                <p className={`font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {role.count}
                </p>
                <p className={`text-sm ${
                  isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                }`}>
                  {role.role}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
              Users ({filteredUsers.length})
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
                      checked={selectedUsers.length === filteredUsers.length}
                      onChange={handleSelectAll}
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
                  }`}>Revenue</th>
                  <th className={`text-left p-4 font-medium ${
                    isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                  }`}>Last Active</th>
                  <th className={`text-left p-4 font-medium ${
                    isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                  }`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className={`border-b transition-all duration-300 hover:scale-[1.01] hover:shadow-md ${
                    isDarkMode 
                      ? 'border-[#326744] hover:bg-white/5 hover:shadow-green-500/10' 
                      : 'border-gray-200 hover:bg-gray-50 hover:shadow-gray-300/30'
                  }`}>
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleUserSelect(user.id)}
                        className="rounded transition-all duration-300 hover:scale-110"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-500/30">
                          <UserPlus className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className={`font-medium transition-colors duration-300 group-hover:text-green-500 ${
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
                      <div className="flex items-center gap-2 group">
                        {getRoleIcon(user.role)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 group-hover:scale-105 ${
                          user.role === 'Admin' ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' :
                          user.role === 'Moderator' ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' :
                          user.role === 'VIP' ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' :
                          'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className={`p-4 font-medium transition-colors duration-300 hover:text-green-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {formatCurrency(user.revenue || 0)}
                    </td>
                    <td className={`p-4 text-sm ${
                      isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                    }`}>
                      {user.lastActive}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-110 hover:bg-blue-500/20 hover:text-blue-500">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-110 hover:bg-green-500/20 hover:text-green-500">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleToggleUserStatus(user.id)}
                          className={`transition-all duration-300 hover:scale-110 ${
                            user.status === "active" ? "text-yellow-400 hover:bg-yellow-500/20" : "text-green-400 hover:bg-green-500/20"
                          }`}
                        >
                          {user.status === "active" ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setUsers(prev => prev.filter(u => u.id !== user.id))}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-300 hover:scale-110"
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
    </AdminLayout>
  )
}
