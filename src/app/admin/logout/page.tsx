"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  LogOut,
  CheckCircle,
  Clock,
  Shield,
  User,
  Settings,
  Home,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  Info,
  Zap,
  Lock,
  Key,
  Smartphone,
  Laptop,
  Tablet,
  Monitor,
  Wifi,
  Globe,
  Timer,
  Activity
} from "lucide-react"

export default function AdminLogout() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutComplete, setLogoutComplete] = useState(false)
  const [sessionInfo, setSessionInfo] = useState({
    duration: "2h 34m",
    lastActivity: "2 minutes ago",
    devicesActive: 3,
    sessionSecure: true
  })
  const router = useRouter()

  useEffect(() => {
    // Simulate logout process
    if (isLoggingOut) {
      const timer = setTimeout(() => {
        setLogoutComplete(true)
        setIsLoggingOut(false)
        
        // Redirect to login after 3 seconds
        const redirectTimer = setTimeout(() => {
          router.push("/login")
        }, 3000)
        
        return () => clearTimeout(redirectTimer)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [isLoggingOut, router])

  const handleLogout = () => {
    setIsLoggingOut(true)
    
    // Clear session data (simulation)
    localStorage.removeItem("admin_token")
    localStorage.removeItem("user_session")
    sessionStorage.clear()
    
    // Clear cookies (simulation)
    document.cookie.split(";").forEach(cookie => {
      document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
    })
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const activeDevices = [
    { name: "Desktop PC", type: "laptop", lastSeen: "Active now", location: "Istanbul, TR" },
    { name: "Mobile Phone", type: "smartphone", lastSeen: "5 min ago", location: "Istanbul, TR" },
    { name: "Tablet", type: "tablet", lastSeen: "2 hours ago", location: "Ankara, TR" }
  ]

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "laptop": return <Laptop className="h-4 w-4" />
      case "smartphone": return <Smartphone className="h-4 w-4" />
      case "tablet": return <Tablet className="h-4 w-4" />
      default: return <Monitor className="h-4 w-4" />
    }
  }

  if (logoutComplete) {
    return (
      <div className={`min-h-screen font-display flex items-center justify-center ${
        isDarkMode ? "dark bg-[#102216]" : "bg-[#f6f8f6]"
      }`}>
        <div className="max-w-md w-full mx-auto p-6">
          <Card className={`p-8 border rounded-lg text-center ${
            isDarkMode 
              ? "bg-[#112217] border-[#326744]" 
              : "bg-white border-gray-200"
          }`}>
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-green-500/20">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            </div>
            
            <h1 className={`text-2xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Logged Out Successfully
            </h1>
            
            <p className={`mb-6 ${
              isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
            }`}>
              You have been securely logged out of the admin panel. Redirecting to login page...
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Activity className="h-4 w-4 text-green-500" />
                <span className={`text-sm ${
                  isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                }`}>
                  Session cleared
                </span>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className={`text-sm ${
                  isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                }`}>
                  Security tokens revoked
                </span>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <Lock className="h-4 w-4 text-green-500" />
                <span className={`text-sm ${
                  isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                }`}>
                  Cache cleared
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{ width: "100%" }} />
              </div>
              <p className={`text-sm mt-2 ${
                isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
              }`}>
                Redirecting in 3 seconds...
              </p>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={() => router.push("/login")} 
                className="w-full bg-green-500 hover:bg-green-600"
              >
                Go to Login Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
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
                <LogOut className="h-5 w-5 text-white" />
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
                <Monitor className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">Analytics</p>
              </a>
              <a href="/admin/users" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode ? "hover:bg-[#23482f] text-white" : "hover:bg-gray-100 text-gray-700"
              }`}>
                <User className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">User Management</p>
              </a>
              <a href="/admin/settings" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode ? "hover:bg-[#23482f] text-white" : "hover:bg-gray-100 text-gray-700"
              }`}>
                <Settings className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">Settings</p>
              </a>
              <a href="/admin/logout" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode ? "bg-[#23482f] text-white" : "bg-green-100 text-green-700"
              }`}>
                <LogOut className="h-6 w-6" />
                <p className="text-sm font-medium leading-normal">Log out</p>
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
                  <LogOut className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Secure Logout</h2>
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
                {isDarkMode ? <Zap className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
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
                Secure Logout
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Logout Confirmation */}
              <Card className={`p-6 border rounded-lg ${
                isDarkMode 
                  ? "bg-[#112217] border-[#326744]" 
                  : "bg-white border-gray-200"
              }`}>
                <CardHeader className="pb-4">
                  <CardTitle className={`text-xl font-bold flex items-center gap-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    <LogOut className="h-5 w-5 text-red-500" />
                    Confirm Logout
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className={`${
                      isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                    }`}>
                      Are you sure you want to log out? This will end your current session and clear all temporary data.
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Shield className={`h-5 w-5 ${
                          sessionInfo.sessionSecure ? "text-green-500" : "text-red-500"
                        }`} />
                        <span className={`text-sm ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          Session is {sessionInfo.sessionSecure ? "secure" : "insecure"}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <span className={`text-sm ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          Session duration: {sessionInfo.duration}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-purple-500" />
                        <span className={`text-sm ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          Last activity: {sessionInfo.lastActivity}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-[#326744]">
                      <Button 
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full bg-red-500 hover:bg-red-600"
                      >
                        {isLoggingOut ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Logging out...
                          </>
                        ) : (
                          <>
                            <LogOut className="h-4 w-4 mr-2" />
                            Confirm Logout
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Sessions */}
              <Card className={`p-6 border rounded-lg ${
                isDarkMode 
                  ? "bg-[#112217] border-[#326744]" 
                  : "bg-white border-gray-200"
              }`}>
                <CardHeader className="pb-4">
                  <CardTitle className={`text-xl font-bold flex items-center gap-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    <Wifi className="h-5 w-5 text-blue-500" />
                    Active Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        Active devices
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400`}>
                        {sessionInfo.devicesActive}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {activeDevices.map((device, index) => (
                        <div key={index} className={`p-3 rounded-lg border ${
                          isDarkMode 
                            ? "bg-[#23482f] border-[#326744]" 
                            : "bg-gray-50 border-gray-200"
                        }`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getDeviceIcon(device.type)}
                              <div>
                                <p className={`text-sm font-medium ${
                                  isDarkMode ? "text-white" : "text-gray-900"
                                }`}>
                                  {device.name}
                                </p>
                                <p className={`text-xs ${
                                  isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                                }`}>
                                  {device.location}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`text-xs ${
                                isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                              }`}>
                                {device.lastSeen}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-[#326744]">
                      <Button variant="outline" className="w-full">
                        <Key className="h-4 w-4 mr-2" />
                        End All Sessions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Info */}
              <Card className={`p-6 border rounded-lg lg:col-span-2 ${
                isDarkMode 
                  ? "bg-[#112217] border-[#326744]" 
                  : "bg-white border-gray-200"
              }`}>
                <CardHeader className="pb-4">
                  <CardTitle className={`text-xl font-bold flex items-center gap-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    <Info className="h-5 w-5 text-blue-500" />
                    Security Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className={`p-4 rounded-lg mb-3 ${
                        isDarkMode ? "bg-[#23482f]" : "bg-gray-100"
                      }`}>
                        <Lock className="h-8 w-8 text-green-500 mx-auto" />
                      </div>
                      <h3 className={`font-semibold mb-2 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        Secure Logout
                      </h3>
                      <p className={`text-sm ${
                        isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                      }`}>
                        All session data will be securely cleared
                      </p>
                    </div>

                    <div className="text-center">
                      <div className={`p-4 rounded-lg mb-3 ${
                        isDarkMode ? "bg-[#23482f]" : "bg-gray-100"
                      }`}>
                        <Key className="h-8 w-8 text-blue-500 mx-auto" />
                      </div>
                      <h3 className={`font-semibold mb-2 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        Token Revocation
                      </h3>
                      <p className={`text-sm ${
                        isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                      }`}>
                        Authentication tokens will be invalidated
                      </p>
                    </div>

                    <div className="text-center">
                      <div className={`p-4 rounded-lg mb-3 ${
                        isDarkMode ? "bg-[#23482f]" : "bg-gray-100"
                      }`}>
                        <Globe className="h-8 w-8 text-purple-500 mx-auto" />
                      </div>
                      <h3 className={`font-semibold mb-2 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        Global Logout
                      </h3>
                      <p className={`text-sm ${
                        isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                      }`}>
                        All devices will be logged out
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
