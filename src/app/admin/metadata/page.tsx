"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Tag,
  Database,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Plus,
  Copy,
  Save,
  X,
  Check,
  AlertTriangle,
  Info,
  Zap,
  Shield,
  Key,
  Lock,
  Globe,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Clock,
  Calendar,
  FileText,
  Folder,
  FolderOpen,
  Code,
  FileCode,
  Braces,
  Settings,
  Sun,
  Moon,
  BellRing,
  HelpCircle,
  Users,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Hash,
  Link,
  Mail,
  Phone,
  MapPin,
  Star,
  Award,
  Target,
  Rocket,
  Sparkles,
  MoreVertical,
  ChevronDown,
  ChevronUp
} from "lucide-react"

interface MetadataItem {
  id: string
  key: string
  value: string
  type: "string" | "number" | "boolean" | "json" | "array" | "object"
  category: string
  description: string
  tags: string[]
  createdAt: string
  updatedAt: string
  createdBy: string
  isRequired: boolean
  isEncrypted: boolean
  validation?: {
    min?: number
    max?: number
    pattern?: string
    options?: string[]
  }
}

interface MetadataStats {
  total: number
  categories: number
  encrypted: number
  required: number
  types: {
    string: number
    number: number
    boolean: number
    json: number
    array: number
    object: number
  }
}

export default function AdminMetadata() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "table">("table")

  const [metadata, setMetadata] = useState<MetadataItem[]>([
    {
      id: "1",
      key: "app_name",
      value: "Paragon Finance",
      type: "string",
      category: "application",
      description: "Main application name",
      tags: ["core", "branding"],
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      createdBy: "admin",
      isRequired: true,
      isEncrypted: false,
      validation: {
        min: 3,
        max: 50
      }
    },
    {
      id: "2",
      key: "max_connections",
      value: "1000",
      type: "number",
      category: "database",
      description: "Maximum database connections",
      tags: ["performance", "database"],
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-16T14:20:00Z",
      createdBy: "admin",
      isRequired: true,
      isEncrypted: false,
      validation: {
        min: 10,
        max: 10000
      }
    },
    {
      id: "3",
      key: "api_keys",
      value: '["sk_test_123", "sk_live_456"]',
      type: "array",
      category: "security",
      description: "API keys for external services",
      tags: ["security", "api"],
      createdAt: "2024-01-15T11:00:00Z",
      updatedAt: "2024-01-17T09:15:00Z",
      createdBy: "admin",
      isRequired: true,
      isEncrypted: true
    },
    {
      id: "4",
      key: "feature_flags",
      value: '{"analytics": true, "beta_features": false, "debug_mode": false}',
      type: "json",
      category: "features",
      description: "Feature toggle configuration",
      tags: ["features", "config"],
      createdAt: "2024-01-15T12:00:00Z",
      updatedAt: "2024-01-18T16:45:00Z",
      createdBy: "admin",
      isRequired: false,
      isEncrypted: false
    },
    {
      id: "5",
      key: "email_notifications",
      value: "true",
      type: "boolean",
      category: "notifications",
      description: "Enable email notifications",
      tags: ["notifications", "email"],
      createdAt: "2024-01-15T13:00:00Z",
      updatedAt: "2024-01-19T11:30:00Z",
      createdBy: "admin",
      isRequired: false,
      isEncrypted: false
    },
    {
      id: "6",
      key: "user_permissions",
      value: '{"admin": ["read", "write", "delete"], "user": ["read"]}',
      type: "json",
      category: "security",
      description: "User role permissions",
      tags: ["security", "permissions"],
      createdAt: "2024-01-15T14:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
      createdBy: "admin",
      isRequired: true,
      isEncrypted: false
    }
  ])

  const stats: MetadataStats = {
    total: metadata.length,
    categories: new Set(metadata.map(item => item.category)).size,
    encrypted: metadata.filter(item => item.isEncrypted).length,
    required: metadata.filter(item => item.isRequired).length,
    types: {
      string: metadata.filter(item => item.type === "string").length,
      number: metadata.filter(item => item.type === "number").length,
      boolean: metadata.filter(item => item.type === "boolean").length,
      json: metadata.filter(item => item.type === "json").length,
      array: metadata.filter(item => item.type === "array").length,
      object: metadata.filter(item => item.type === "object").length
    }
  }

  const categories = ["all", ...Array.from(new Set(metadata.map(item => item.category)))]
  const types = ["all", "string", "number", "boolean", "json", "array", "object"]

  const filteredMetadata = metadata.filter(item => {
    const matchesSearch = item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesType = selectedType === "all" || item.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "string": return <FileText className="h-4 w-4" />
      case "number": return <Hash className="h-4 w-4" />
      case "boolean": return <Check className="h-4 w-4" />
      case "json": return <Braces className="h-4 w-4" />
      case "array": return <FolderOpen className="h-4 w-4" />
      case "object": return <Folder className="h-4 w-4" />
      default: return <Tag className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "string": return "bg-blue-500/20 text-blue-400"
      case "number": return "bg-green-500/20 text-green-400"
      case "boolean": return "bg-purple-500/20 text-purple-400"
      case "json": return "bg-yellow-500/20 text-yellow-400"
      case "array": return "bg-orange-500/20 text-orange-400"
      case "object": return "bg-pink-500/20 text-pink-400"
      default: return "bg-gray-500/20 text-gray-400"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "application": return <Server className="h-4 w-4" />
      case "database": return <Database className="h-4 w-4" />
      case "security": return <Shield className="h-4 w-4" />
      case "features": return <Zap className="h-4 w-4" />
      case "notifications": return <BellRing className="h-4 w-4" />
      default: return <Folder className="h-4 w-4" />
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleAddMetadata = () => {
    const newItem: MetadataItem = {
      id: Date.now().toString(),
      key: "new_metadata_key",
      value: "",
      type: "string",
      category: "general",
      description: "New metadata item",
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "admin",
      isRequired: false,
      isEncrypted: false
    }
    setMetadata(prev => [newItem, ...prev])
  }

  const handleDeleteMetadata = (id: string) => {
    setMetadata(prev => prev.filter(item => item.id !== id))
  }

  const handleEditMetadata = (id: string, field: keyof MetadataItem, value: any) => {
    setMetadata(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value, updatedAt: new Date().toISOString() } : item
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
                <Tag className="h-5 w-5 text-white" />
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
              <a href="/admin/metadata" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode ? "bg-[#23482f] text-white" : "bg-green-100 text-green-700"
              }`}>
                <Tag className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">Metadata</p>
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
                  <Tag className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Metadata Management</h2>
              </div>
              
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? "text-[#92c9a4]" : "text-gray-400"
                }`} />
                <input
                  type="text"
                  placeholder="Search metadata..."
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
              
              <Button onClick={handleAddMetadata} className="bg-green-500 hover:bg-green-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Metadata
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
                Metadata Management
              </h1>
              
              <div className="flex gap-2">
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
                
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? "bg-[#23482f] border-[#23482f] text-white" 
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className={`rounded-l-lg rounded-r-none ${
                      viewMode === "table" 
                        ? "bg-green-500 hover:bg-green-600" 
                        : isDarkMode 
                          ? "text-white hover:bg-[#23482f]" 
                          : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`rounded-r-lg rounded-l-none ${
                      viewMode === "grid" 
                        ? "bg-green-500 hover:bg-green-600" 
                        : isDarkMode 
                          ? "text-white hover:bg-[#23482f]" 
                          : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Folder className="h-4 w-4" />
                  </Button>
                </div>
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
                    Total Items
                  </p>
                  <p className={`text-2xl font-bold leading-tight ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {stats.total}
                  </p>
                  <div className="flex items-center gap-1">
                    <Database className="h-4 w-4 text-blue-500" />
                    <p className="text-base font-medium leading-normal text-blue-500">
                      Active
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
                    Categories
                  </p>
                  <p className={`text-2xl font-bold leading-tight ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {stats.categories}
                  </p>
                  <div className="flex items-center gap-1">
                    <Folder className="h-4 w-4 text-purple-500" />
                    <p className="text-base font-medium leading-normal text-purple-500">
                      Groups
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
                    Encrypted
                  </p>
                  <p className={`text-2xl font-bold leading-tight ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {stats.encrypted}
                  </p>
                  <div className="flex items-center gap-1">
                    <Lock className="h-4 w-4 text-green-500" />
                    <p className="text-base font-medium leading-normal text-green-500">
                      Secure
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
                    Required
                  </p>
                  <p className={`text-2xl font-bold leading-tight ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {stats.required}
                  </p>
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <p className="text-base font-medium leading-normal text-yellow-500">
                      Essential
                    </p>
                  </div>
                </div>
              </Card>

              {Object.entries(stats.types).slice(0, 2).map(([type, count]) => (
                <Card key={type} className={`p-6 border rounded-lg ${
                  isDarkMode 
                    ? "bg-[#112217] border-[#326744]" 
                    : "bg-white border-gray-200"
                }`}>
                  <div className="flex flex-col gap-2">
                    <p className={`text-base font-medium leading-normal ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </p>
                    <p className={`text-2xl font-bold leading-tight ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {count}
                    </p>
                    <div className="flex items-center gap-1">
                      {getTypeIcon(type)}
                      <p className={`text-base font-medium leading-normal ${
                        type === "string" ? "text-blue-500" :
                        type === "number" ? "text-green-500" :
                        type === "boolean" ? "text-purple-500" :
                        type === "json" ? "text-yellow-500" :
                        type === "array" ? "text-orange-500" : "text-pink-500"
                      }`}>
                        {Math.round((count / stats.total) * 100)}%
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Metadata Content */}
            {viewMode === "table" ? (
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
                      Metadata Items ({filteredMetadata.length})
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
                          }`}>Key</th>
                          <th className={`text-left p-4 font-medium ${
                            isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                          }`}>Value</th>
                          <th className={`text-left p-4 font-medium ${
                            isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                          }`}>Type</th>
                          <th className={`text-left p-4 font-medium ${
                            isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                          }`}>Category</th>
                          <th className={`text-left p-4 font-medium ${
                            isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                          }`}>Security</th>
                          <th className={`text-left p-4 font-medium ${
                            isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                          }`}>Updated</th>
                          <th className={`text-left p-4 font-medium ${
                            isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                          }`}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMetadata.map((item) => (
                          <tr key={item.id} className={`border-b transition-colors ${
                            isDarkMode 
                              ? "border-[#326744] hover:bg-white/5" 
                              : "border-gray-200 hover:bg-gray-50"
                          }`}>
                            <td className="p-4">
                              <div>
                                <p className={`font-medium ${
                                  isDarkMode ? "text-white" : "text-gray-900"
                                }`}>
                                  {item.key}
                                </p>
                                <p className={`text-sm ${
                                  isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                                }`}>
                                  {item.description}
                                </p>
                              </div>
                            </td>
                            <td className={`p-4 text-sm ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}>
                              <div className="max-w-xs truncate font-mono">
                                {item.isEncrypted ? "••••••••" : item.value}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                {getTypeIcon(item.type)}
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                                  {item.type}
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                {getCategoryIcon(item.category)}
                                <span className={`text-sm capitalize ${
                                  isDarkMode ? "text-white" : "text-gray-900"
                                }`}>
                                  {item.category}
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                {item.isRequired && (
                                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                                    Required
                                  </span>
                                )}
                                {item.isEncrypted && (
                                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                                    Encrypted
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className={`p-4 text-sm ${
                              isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                            }`}>
                              {new Date(item.updatedAt).toLocaleDateString()}
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleDeleteMetadata(item.id)}
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
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMetadata.map((item) => (
                  <Card key={item.id} className={`p-6 border rounded-lg ${
                    isDarkMode 
                      ? "bg-[#112217] border-[#326744]" 
                      : "bg-white border-gray-200"
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(item.category)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                          {item.type}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <h3 className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {item.key}
                    </h3>
                    
                    <p className={`text-sm mb-4 ${
                      isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                    }`}>
                      {item.description}
                    </p>
                    
                    <div className={`p-3 rounded-lg mb-4 font-mono text-sm ${
                      isDarkMode ? "bg-[#23482f]" : "bg-gray-100"
                    }`}>
                      {item.isEncrypted ? "••••••••" : item.value}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, index) => (
                        <span key={index} className={`px-2 py-1 rounded text-xs ${
                          isDarkMode ? "bg-[#23482f] text-[#92c9a4]" : "bg-gray-100 text-gray-600"
                        }`}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className={`${
                        isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                      }`}>
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        {item.isRequired && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                            Required
                          </span>
                        )}
                        {item.isEncrypted && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                            Encrypted
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
