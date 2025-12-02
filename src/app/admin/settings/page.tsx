"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Settings,
  User,
  Shield,
  Bell,
  Mail,
  Globe,
  Palette,
  Database,
  Save,
  RefreshCw,
  Download,
  Upload,
  Eye,
  EyeOff,
  Check,
  X,
  AlertTriangle,
  Info,
  Sun,
  Moon,
  Search,
  BellRing,
  HelpCircle,
  Zap,
  Lock,
  Key,
  Wifi,
  HardDrive,
  Server,
  Monitor,
  Cpu,
  Battery,
  Thermometer,
  Users,
  LogOut,
  Smartphone,
  Laptop,
  Tablet,
  Clock,
  Calendar,
  FileText,
  Trash2,
  Edit,
  Plus,
  Minus
} from "lucide-react"

interface SettingItem {
  id: string
  category: string
  title: string
  description: string
  type: "toggle" | "text" | "select" | "number" | "password" | "color"
  value: string | number | boolean
  options?: string[]
  icon?: React.ElementType
}

export default function AdminSettings() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("general")

  const [settings, setSettings] = useState<SettingItem[]>([
    // General Settings
    {
      id: "site-name",
      category: "general",
      title: "Site Name",
      description: "The name of your application",
      type: "text",
      value: "Paragon Admin",
      icon: Globe
    },
    {
      id: "site-url",
      category: "general", 
      title: "Site URL",
      description: "The base URL of your application",
      type: "text",
      value: "https://paragon.example.com",
      icon: Globe
    },
    {
      id: "default-language",
      category: "general",
      title: "Default Language",
      description: "Default language for the application",
      type: "select",
      value: "en",
      options: ["en", "tr", "es", "fr", "de"],
      icon: Globe
    },
    {
      id: "timezone",
      category: "general",
      title: "Timezone",
      description: "Default timezone for the application",
      type: "select",
      value: "UTC",
      options: ["UTC", "EST", "PST", "CET", "GMT"],
      icon: Clock
    },

    // Appearance Settings
    {
      id: "theme",
      category: "appearance",
      title: "Theme",
      description: "Choose the application theme",
      type: "select",
      value: "dark",
      options: ["dark", "light", "auto"],
      icon: Palette
    },
    {
      id: "primary-color",
      category: "appearance",
      title: "Primary Color",
      description: "Primary color for the application",
      type: "color",
      value: "#13ec5b",
      icon: Palette
    },
    {
      id: "sidebar-collapsed",
      category: "appearance",
      title: "Sidebar Collapsed",
      description: "Collapse sidebar by default",
      type: "toggle",
      value: false,
      icon: Monitor
    },

    // Security Settings
    {
      id: "2fa-enabled",
      category: "security",
      title: "Two-Factor Authentication",
      description: "Enable 2FA for admin accounts",
      type: "toggle",
      value: true,
      icon: Shield
    },
    {
      id: "session-timeout",
      category: "security",
      title: "Session Timeout",
      description: "Session timeout in minutes",
      type: "number",
      value: 30,
      icon: Clock
    },
    {
      id: "max-login-attempts",
      category: "security",
      title: "Max Login Attempts",
      description: "Maximum failed login attempts before lockout",
      type: "number",
      value: 5,
      icon: Lock
    },
    {
      id: "password-min-length",
      category: "security",
      title: "Minimum Password Length",
      description: "Minimum required password length",
      type: "number",
      value: 8,
      icon: Key
    },

    // Notification Settings
    {
      id: "email-notifications",
      category: "notifications",
      title: "Email Notifications",
      description: "Enable email notifications",
      type: "toggle",
      value: true,
      icon: Mail
    },
    {
      id: "push-notifications",
      category: "notifications",
      title: "Push Notifications",
      description: "Enable push notifications",
      type: "toggle",
      value: false,
      icon: Bell
    },
    {
      id: "admin-alerts",
      category: "notifications",
      title: "Admin Alerts",
      description: "Receive critical system alerts",
      type: "toggle",
      value: true,
      icon: AlertTriangle
    },

    // Database Settings
    {
      id: "backup-frequency",
      category: "database",
      title: "Backup Frequency",
      description: "How often to backup the database",
      type: "select",
      value: "daily",
      options: ["hourly", "daily", "weekly", "monthly"],
      icon: Database
    },
    {
      id: "backup-retention",
      category: "database",
      title: "Backup Retention",
      description: "How many backups to keep",
      type: "number",
      value: 30,
      icon: HardDrive
    },
    {
      id: "cache-ttl",
      category: "database",
      title: "Cache TTL",
      description: "Cache time-to-live in seconds",
      type: "number",
      value: 3600,
      icon: Zap
    }
  ])

  const categories = [
    { id: "general", name: "General", icon: Settings },
    { id: "appearance", name: "Appearance", icon: Palette },
    { id: "security", name: "Security", icon: Shield },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "database", name: "Database", icon: Database }
  ]

  const filteredSettings = settings.filter(setting => 
    setting.category === activeTab &&
    (setting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     setting.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleSettingChange = (id: string, value: string | number | boolean) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, value } : setting
    ))
  }

  const handleSaveSettings = () => {
    console.log("Settings saved:", settings)
    // Show success message
  }

  const handleResetSettings = () => {
    console.log("Settings reset to defaults")
    // Reset to default values
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const renderSettingInput = (setting: SettingItem) => {
    switch (setting.type) {
      case "toggle":
        return (
          <button
            onClick={() => handleSettingChange(setting.id, !setting.value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              setting.value ? 'bg-green-500' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                setting.value ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        )
      
      case "text":
        return (
          <input
            type="text"
            value={setting.value as string}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border ${
              isDarkMode 
                ? 'bg-[#23482f] border-[#23482f] text-white' 
                : 'bg-gray-100 border-gray-200 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-green-500`}
          />
        )
      
      case "password":
        return (
          <div className="relative">
            <input
              type="password"
              value={setting.value as string}
              onChange={(e) => handleSettingChange(setting.id, e.target.value)}
              className={`w-full px-3 py-2 pr-10 rounded-lg border ${
                isDarkMode 
                  ? 'bg-[#23482f] border-[#23482f] text-white' 
                  : 'bg-gray-100 border-gray-200 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        )
      
      case "number":
        return (
          <input
            type="number"
            value={setting.value as number}
            onChange={(e) => handleSettingChange(setting.id, parseInt(e.target.value) || 0)}
            className={`w-full px-3 py-2 rounded-lg border ${
              isDarkMode 
                ? 'bg-[#23482f] border-[#23482f] text-white' 
                : 'bg-gray-100 border-gray-200 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-green-500`}
          />
        )
      
      case "select":
        return (
          <select
            value={setting.value as string}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border ${
              isDarkMode 
                ? 'bg-[#23482f] border-[#23482f] text-white' 
                : 'bg-gray-100 border-gray-200 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            {setting.options?.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
      
      case "color":
        return (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={setting.value as string}
              onChange={(e) => handleSettingChange(setting.id, e.target.value)}
              className="h-10 w-20 rounded border border-gray-300"
            />
            <span className={`text-sm ${
              isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
            }`}>
              {setting.value}
            </span>
          </div>
        )
      
      default:
        return null
    }
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
                <Settings className="h-5 w-5 text-white" />
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
                <Monitor className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">Analytics</p>
              </a>
              <a href="/admin/users" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-[#23482f] text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}>
                <Users className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">User Management</p>
              </a>
              <a href="/admin/settings" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode ? 'bg-[#23482f] text-white' : 'bg-green-100 text-green-700'
              }`}>
                <Settings className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">Settings</p>
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
                  <Settings className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">System Settings</h2>
              </div>
              
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? 'text-[#92c9a4]' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search settings..."
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
                Export Config
              </Button>
              
              <Button onClick={handleSaveSettings} className="bg-green-500 hover:bg-green-600">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
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
                System Settings
              </h1>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleResetSettings}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset to Defaults
                </Button>
                <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Config
                </Button>
              </div>
            </div>

            {/* Settings Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeTab === category.id ? "default" : "outline"}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center gap-2 ${
                    activeTab === category.id 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : isDarkMode 
                        ? 'border-[#326744] text-white hover:bg-[#23482f]' 
                        : 'border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Settings Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSettings.map((setting) => (
                <Card key={setting.id} className={`p-6 border rounded-lg ${
                  isDarkMode 
                    ? 'bg-[#112217] border-[#326744]' 
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="flex items-start gap-4">
                    {setting.icon && (
                      <div className={`p-2 rounded-lg ${
                        isDarkMode ? 'bg-[#23482f]' : 'bg-gray-100'
                      }`}>
                        <setting.icon className={`h-5 w-5 ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`} />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-lg font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {setting.title}
                        </h3>
                        {setting.type === "toggle" && renderSettingInput(setting)}
                      </div>
                      
                      <p className={`text-sm mb-4 ${
                        isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                      }`}>
                        {setting.description}
                      </p>
                      
                      {setting.type !== "toggle" && renderSettingInput(setting)}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* System Information */}
            <Card className={`mt-6 p-6 border rounded-lg ${
              isDarkMode 
                ? 'bg-[#112217] border-[#326744]' 
                : 'bg-white border-gray-200'
            }`}>
              <CardHeader className="pb-4">
                <CardTitle className={`text-xl font-bold flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <Server className="h-5 w-5 text-blue-500" />
                  System Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-[#23482f]' : 'bg-gray-100'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="h-4 w-4 text-blue-400" />
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                      }`}>
                        CPU Usage
                      </span>
                    </div>
                    <p className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      42%
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-[#23482f]' : 'bg-gray-100'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <HardDrive className="h-4 w-4 text-green-400" />
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                      }`}>
                        Memory
                      </span>
                    </div>
                    <p className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      8.2GB
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-[#23482f]' : 'bg-gray-100'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="h-4 w-4 text-purple-400" />
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                      }`}>
                        Database
                      </span>
                    </div>
                    <p className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      2.4GB
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-[#23482f]' : 'bg-gray-100'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Wifi className="h-4 w-4 text-yellow-400" />
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-[#92c9a4]' : 'text-gray-600'
                      }`}>
                        Network
                      </span>
                    </div>
                    <p className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      125Mbps
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
