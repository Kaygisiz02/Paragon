"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  Check,
  AlertTriangle,
  Info,
  Zap,
  Shield,
  Clock,
  Calendar,
  FileText,
  Folder,
  Settings,
  Sun,
  Moon,
  BellRing,
  Users,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  User,
  UserPlus,
  UserCheck,
  UserX,
  Star,
  Award,
  Target,
  Rocket,
  Sparkles,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Send,
  Paperclip,
  Image,
  Video,
  File,
  Archive,
  Link2,
  ExternalLink,
  Copy,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  MessageSquare as MessageSquareIcon
} from "lucide-react"

interface SupportTicket {
  id: string
  subject: string
  description: string
  status: "open" | "in_progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  category: "technical" | "billing" | "feature" | "bug" | "general"
  userId: string
  userName: string
  userEmail: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
  dueDate?: string
  tags: string[]
  attachments: number
  messages: number
  satisfaction?: number
}

interface SupportStats {
  total: number
  open: number
  inProgress: number
  resolved: number
  closed: number
  avgResponseTime: string
  satisfaction: number
}

export default function AdminSupport() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedPriority, setSelectedPriority] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "1",
      subject: "Login issues with mobile app",
      description: "Users reporting login failures on iOS devices",
      status: "open",
      priority: "high",
      category: "technical",
      userId: "user_123",
      userName: "John Doe",
      userEmail: "john.doe@example.com",
      assignedTo: "support_agent_1",
      createdAt: "2024-01-15T09:00:00Z",
      updatedAt: "2024-01-15T14:30:00Z",
      dueDate: "2024-01-17T09:00:00Z",
      tags: ["mobile", "login", "ios"],
      attachments: 3,
      messages: 8,
      satisfaction: undefined
    },
    {
      id: "2",
      subject: "Billing question about subscription",
      description: "Customer asking about pro plan features",
      status: "in_progress",
      priority: "medium",
      category: "billing",
      userId: "user_456",
      userName: "Jane Smith",
      userEmail: "jane.smith@example.com",
      assignedTo: "support_agent_2",
      createdAt: "2024-01-14T11:00:00Z",
      updatedAt: "2024-01-15T10:15:00Z",
      dueDate: "2024-01-16T11:00:00Z",
      tags: ["billing", "subscription"],
      attachments: 1,
      messages: 5,
      satisfaction: undefined
    },
    {
      id: "3",
      subject: "Feature request: Dark mode",
      description: "User requesting dark mode for dashboard",
      status: "resolved",
      priority: "low",
      category: "feature",
      userId: "user_789",
      userName: "Bob Johnson",
      userEmail: "bob.johnson@example.com",
      assignedTo: "support_agent_3",
      createdAt: "2024-01-13T15:00:00Z",
      updatedAt: "2024-01-15T16:45:00Z",
      tags: ["feature", "ui", "dark-mode"],
      attachments: 0,
      messages: 3,
      satisfaction: 5
    },
    {
      id: "4",
      subject: "Critical bug in payment processing",
      description: "Payment gateway returning errors",
      status: "open",
      priority: "urgent",
      category: "bug",
      userId: "user_101",
      userName: "Alice Brown",
      userEmail: "alice.brown@example.com",
      assignedTo: "support_agent_1",
      createdAt: "2024-01-15T13:00:00Z",
      updatedAt: "2024-01-15T13:00:00Z",
      dueDate: "2024-01-15T18:00:00Z",
      tags: ["critical", "payment", "bug"],
      attachments: 5,
      messages: 12,
      satisfaction: undefined
    },
    {
      id: "5",
      subject: "General inquiry about services",
      description: "Potential customer asking about features",
      status: "closed",
      priority: "low",
      category: "general",
      userId: "user_202",
      userName: "Charlie Wilson",
      userEmail: "charlie.wilson@example.com",
      createdAt: "2024-01-12T10:00:00Z",
      updatedAt: "2024-01-14T09:30:00Z",
      tags: ["inquiry", "sales"],
      attachments: 0,
      messages: 2,
      satisfaction: 4
    }
  ])

  const stats: SupportStats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === "open").length,
    inProgress: tickets.filter(t => t.status === "in_progress").length,
    resolved: tickets.filter(t => t.status === "resolved").length,
    closed: tickets.filter(t => t.status === "closed").length,
    avgResponseTime: "2.5 hours",
    satisfaction: tickets.filter(t => t.satisfaction).reduce((acc, t) => acc + (t.satisfaction || 0), 0) / tickets.filter(t => t.satisfaction).length
  }

  const statuses = ["all", "open", "in_progress", "resolved", "closed"]
  const priorities = ["all", "low", "medium", "high", "urgent"]
  const categories = ["all", "technical", "billing", "feature", "bug", "general"]

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || ticket.status === selectedStatus
    const matchesPriority = selectedPriority === "all" || ticket.priority === selectedPriority
    const matchesCategory = selectedCategory === "all" || ticket.category === selectedCategory
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-blue-500/20 text-blue-400"
      case "in_progress": return "bg-yellow-500/20 text-yellow-400"
      case "resolved": return "bg-green-500/20 text-green-400"
      case "closed": return "bg-gray-500/20 text-gray-400"
      default: return "bg-gray-500/20 text-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "bg-gray-500/20 text-gray-400"
      case "medium": return "bg-blue-500/20 text-blue-400"
      case "high": return "bg-orange-500/20 text-orange-400"
      case "urgent": return "bg-red-500/20 text-red-400"
      default: return "bg-gray-500/20 text-gray-400"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "technical": return <Zap className="h-4 w-4" />
      case "billing": return <FileText className="h-4 w-4" />
      case "feature": return <Star className="h-4 w-4" />
      case "bug": return <AlertTriangle className="h-4 w-4" />
      case "general": return <MessageSquare className="h-4 w-4" />
      default: return <HelpCircle className="h-4 w-4" />
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleCreateTicket = () => {
    const newTicket: SupportTicket = {
      id: Date.now().toString(),
      subject: "New support ticket",
      description: "Ticket description",
      status: "open",
      priority: "medium",
      category: "general",
      userId: "user_new",
      userName: "New User",
      userEmail: "newuser@example.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
      attachments: 0,
      messages: 0
    }
    setTickets(prev => [newTicket, ...prev])
  }

  const handleUpdateTicketStatus = (id: string, status: SupportTicket["status"]) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === id ? { ...ticket, status: status as SupportTicket["status"], updatedAt: new Date().toISOString() } : ticket
    ))
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
                <HelpCircle className="h-5 w-5 text-white" />
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
                <Zap className="h-6 w-6" />
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
              <a href="/admin/support" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode ? "bg-[#23482f] text-white" : "bg-green-100 text-green-700"
              }`}>
                <HelpCircle className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">Support</p>
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
                  <HelpCircle className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Support Center</h2>
              </div>
              
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? "text-[#92c9a4]" : "text-gray-400"
                }`} />
                <input
                  type="text"
                  placeholder="Search tickets..."
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
              
              <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button onClick={handleCreateTicket} className="bg-green-500 hover:bg-green-600">
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
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
                Support Center
              </h1>
              
              <div className="flex gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? "bg-[#23482f] border-[#23482f] text-white" 
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? "bg-[#23482f] border-[#23482f] text-white" 
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>
                      {priority === "all" ? "All Priority" : priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? "bg-[#23482f] border-[#23482f] text-white" 
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4 mb-6">
              <Card className={`p-6 border rounded-lg ${
                isDarkMode 
                  ? "bg-[#112217] border-[#326744]" 
                  : "bg-white border-gray-200"
              }`}>
                <div className="flex flex-col gap-2">
                  <p className={`text-base font-medium leading-normal ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    Total Tickets
                  </p>
                  <p className={`text-2xl font-bold leading-tight ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {stats.total}
                  </p>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    <p className="text-base font-medium leading-normal text-blue-500">
                      Active
                    </p>
                  </div>
                </div>
              </Card>

              {Object.entries({
                open: { icon: MessageSquare, color: "text-blue-500", label: "Open" },
                in_progress: { icon: ClockIcon, color: "text-yellow-500", label: "In Progress" },
                resolved: { icon: CheckCircle, color: "text-green-500", label: "Resolved" },
                closed: { icon: XCircle, color: "text-gray-500", label: "Closed" }
              }).map(([status, config]) => (
                <Card key={status} className={`p-6 border rounded-lg ${
                  isDarkMode 
                    ? "bg-[#112217] border-[#326744]" 
                    : "bg-white border-gray-200"
                }`}>
                  <div className="flex flex-col gap-2">
                    <p className={`text-base font-medium leading-normal ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {config.label}
                    </p>
                    <p className={`text-2xl font-bold leading-tight ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {stats[status as keyof SupportStats]}
                    </p>
                    <div className="flex items-center gap-1">
                      <config.icon className={`h-4 w-4 ${config.color}`} />
                      <p className={`text-base font-medium leading-normal ${config.color}`}>
                        {Math.round(((stats[status as keyof SupportStats] as number) / stats.total) * 100)}%
                      </p>
                    </div>
                  </div>
                </Card>
              ))}

              <Card className={`p-6 border rounded-lg ${
                isDarkMode 
                  ? "bg-[#112217] border-[#326744]" 
                  : "bg-white border-gray-200"
              }`}>
                <div className="flex flex-col gap-2">
                  <p className={`text-base font-medium leading-normal ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    Avg Response
                  </p>
                  <p className={`text-2xl font-bold leading-tight ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {stats.avgResponseTime}
                  </p>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4 text-purple-500" />
                    <p className="text-base font-medium leading-normal text-purple-500">
                      Fast
                    </p>
                  </div>
                </div>
              </Card>

              <Card className={`p-6 border rounded-lg ${
                isDarkMode 
                  ? "bg-[#112217] border-[#326744]" 
                  : "bg-white border-gray-200"
              }`}>
                <div className="flex flex-col gap-2">
                  <p className={`text-base font-medium leading-normal ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    Satisfaction
                  </p>
                  <p className={`text-2xl font-bold leading-tight ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {stats.satisfaction.toFixed(1)}
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <p className="text-base font-medium leading-normal text-yellow-500">
                      Rating
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Tickets Table */}
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
                    Support Tickets ({filteredTickets.length})
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
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
                        }`}>Ticket</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                        }`}>User</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                        }`}>Category</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                        }`}>Priority</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                        }`}>Status</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                        }`}>Created</th>
                        <th className={`text-left p-4 font-medium ${
                          isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                        }`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTickets.map((ticket) => (
                        <tr key={ticket.id} className={`border-b transition-colors ${
                          isDarkMode 
                            ? "border-[#326744] hover:bg-white/5" 
                            : "border-gray-200 hover:bg-gray-50"
                        }`}>
                          <td className="p-4">
                            <div>
                              <p className={`font-medium ${
                                isDarkMode ? "text-white" : "text-gray-900"
                              }`}>
                                {ticket.subject}
                              </p>
                              <p className={`text-sm truncate max-w-xs ${
                                isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                              }`}>
                                {ticket.description}
                              </p>
                              <div className="flex gap-2 mt-1">
                                {ticket.attachments > 0 && (
                                  <span className={`text-xs flex items-center gap-1 ${
                                    isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                                  }`}>
                                    <Paperclip className="h-3 w-3" />
                                    {ticket.attachments}
                                  </span>
                                )}
                                <span className={`text-xs ${
                                  isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                                }`}>
                                  {ticket.messages} messages
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className={`font-medium ${
                                isDarkMode ? "text-white" : "text-gray-900"
                              }`}>
                                {ticket.userName}
                              </p>
                              <p className={`text-sm ${
                                isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                              }`}>
                                {ticket.userEmail}
                              </p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(ticket.category)}
                              <span className={`text-sm capitalize ${
                                isDarkMode ? "text-white" : "text-gray-900"
                              }`}>
                                {ticket.category}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                              {ticket.status.replace("_", " ").toUpperCase()}
                            </span>
                          </td>
                          <td className={`p-4 text-sm ${
                            isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                          }`}>
                            <div>
                              <p>{new Date(ticket.createdAt).toLocaleDateString()}</p>
                              <p>{new Date(ticket.createdAt).toLocaleTimeString()}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <select
                                value={ticket.status}
                                onChange={(e) => handleUpdateTicketStatus(ticket.id, e.target.value as SupportTicket["status"])}
                                className={`px-2 py-1 rounded text-xs border ${
                                  isDarkMode 
                                    ? "bg-[#23482f] border-[#23482f] text-white" 
                                    : "bg-white border-gray-200 text-gray-900"
                                }`}
                              >
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                              </select>
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
