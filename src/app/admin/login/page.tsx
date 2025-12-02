"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle,
  LogIn,
  Smartphone,
  Key,
  Fingerprint,
  Clock,
  Activity,
  Globe,
  Wifi,
  Server,
  Database,
  Monitor,
  Sun,
  Moon,
  RefreshCw,
  ArrowRight,
  HelpCircle,
  Settings,
  BarChart3,
  Users
} from "lucide-react"

interface LoginMethod {
  id: string
  name: string
  description: string
  icon: React.ElementType
  available: boolean
  recommended?: boolean
}

export default function AdminLogin() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [loginMethod, setLoginMethod] = useState<string>("credentials")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    twoFactorCode: "",
    securityKey: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const loginMethods: LoginMethod[] = [
    {
      id: "credentials",
      name: "Email & Password",
      description: "Traditional login with email and password",
      icon: Mail,
      available: true,
      recommended: true
    },
    {
      id: "sso",
      name: "Single Sign-On",
      description: "Login with your organization account",
      icon: Shield,
      available: true
    },
    {
      id: "biometric",
      name: "Biometric Authentication",
      description: "Use fingerprint or face recognition",
      icon: Fingerprint,
      available: false
    },
    {
      id: "security_key",
      name: "Security Key",
      description: "Login with hardware security key",
      icon: Key,
      available: true
    },
    {
      id: "otp",
      name: "One-Time Password",
      description: "Login with time-based one-time password",
      icon: Smartphone,
      available: true
    }
  ]

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (loginMethod === "otp" && !formData.twoFactorCode) {
      newErrors.twoFactorCode = "Two-factor code is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate successful login
      localStorage.setItem("admin_token", "mock_jwt_token")
      localStorage.setItem("user_session", JSON.stringify({
        email: formData.email,
        role: "admin",
        loginTime: new Date().toISOString(),
        loginMethod: loginMethod
      }))

      router.push("/admin")
    } catch (error) {
      setErrors({ general: "Login failed. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSSOLogin = () => {
    // Simulate SSO redirect
    window.location.href = "/auth/sso"
  }

  const handleBiometricLogin = async () => {
    try {
      // Simulate WebAuthn API
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          allowCredentials: [],
          userVerification: "required"
        }
      })
      
      console.log("Biometric credential:", credential)
      router.push("/admin")
    } catch (error) {
      setErrors({ biometric: "Biometric authentication failed" })
    }
  }

  const handleSecurityKeyLogin = async () => {
    try {
      // Simulate WebAuthn security key
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          allowCredentials: [],
          userVerification: "required"
        }
      })
      
      console.log("Security key credential:", credential)
      router.push("/admin")
    } catch (error) {
      setErrors({ securityKey: "Security key authentication failed" })
    }
  }

  const renderLoginForm = () => {
    switch (loginMethod) {
      case "credentials":
        return (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? "text-[#92c9a4]" : "text-gray-400"
                }`} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : isDarkMode ? "border-[#326744]" : "border-gray-200"
                  } ${isDarkMode ? "bg-[#23482f] text-white" : "bg-white text-gray-900"} focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="admin@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? "text-[#92c9a4]" : "text-gray-400"
                }`} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                    errors.password ? "border-red-500" : isDarkMode ? "border-[#326744]" : "border-gray-200"
                  } ${isDarkMode ? "bg-[#23482f] text-white" : "bg-white text-gray-900"} focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? "text-[#92c9a4]" : "text-gray-400"
                  }`}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className={`rounded border-gray-300 text-green-500 focus:ring-green-500 ${
                    isDarkMode ? "bg-[#23482f]" : "bg-white"
                  }`}
                />
                <span className={`ml-2 text-sm ${
                  isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                }`}>
                  Remember me
                </span>
              </label>
              <a href="#" className={`text-sm text-green-500 hover:text-green-400`}>
                Forgot password?
              </a>
            </div>
          </div>
        )

      case "sso":
        return (
          <div className="text-center space-y-6">
            <div className={`p-6 rounded-lg ${
              isDarkMode ? "bg-[#23482f]" : "bg-gray-100"
            }`}>
              <Shield className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Single Sign-On
              </h3>
              <p className={`mb-4 ${
                isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
              }`}>
                Login with your organization's identity provider
              </p>
              <Button onClick={handleSSOLogin} className="w-full bg-blue-500 hover:bg-blue-600">
                Continue with SSO
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )

      case "biometric":
        return (
          <div className="text-center space-y-6">
            <div className={`p-6 rounded-lg ${
              isDarkMode ? "bg-[#23482f]" : "bg-gray-100"
            }`}>
              <Fingerprint className="h-16 w-16 text-purple-500 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Biometric Authentication
              </h3>
              <p className={`mb-4 ${
                isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
              }`}>
                Use your fingerprint or face recognition to login
              </p>
              <Button 
                onClick={handleBiometricLogin} 
                className="w-full bg-purple-500 hover:bg-purple-600"
                disabled={!window.PublicKeyCredential}
              >
                <Fingerprint className="h-4 w-4 mr-2" />
                {window.PublicKeyCredential ? "Use Biometric" : "Not Available"}
              </Button>
              {!window.PublicKeyCredential && (
                <p className="text-sm text-yellow-500 mt-2">
                  Biometric authentication is not supported on this device
                </p>
              )}
            </div>
            {errors.biometric && (
              <p className="text-red-500 text-sm">{errors.biometric}</p>
            )}
          </div>
        )

      case "security_key":
        return (
          <div className="text-center space-y-6">
            <div className={`p-6 rounded-lg ${
              isDarkMode ? "bg-[#23482f]" : "bg-gray-100"
            }`}>
              <Key className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Security Key Login
              </h3>
              <p className={`mb-4 ${
                isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
              }`}>
                Insert your security key and follow the prompts
              </p>
              <Button 
                onClick={handleSecurityKeyLogin} 
                className="w-full bg-green-500 hover:bg-green-600"
                disabled={!window.PublicKeyCredential}
              >
                <Key className="h-4 w-4 mr-2" />
                Use Security Key
              </Button>
              {!window.PublicKeyCredential && (
                <p className="text-sm text-yellow-500 mt-2">
                  Security keys are not supported on this device
                </p>
              )}
            </div>
            {errors.securityKey && (
              <p className="text-red-500 text-sm">{errors.securityKey}</p>
            )}
          </div>
        )

      case "otp":
        return (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? "text-[#92c9a4]" : "text-gray-400"
                }`} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : isDarkMode ? "border-[#326744]" : "border-gray-200"
                  } ${isDarkMode ? "bg-[#23482f] text-white" : "bg-white text-gray-900"} focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="admin@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                One-Time Password
              </label>
              <div className="relative">
                <Smartphone className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? "text-[#92c9a4]" : "text-gray-400"
                }`} />
                <input
                  type="text"
                  value={formData.twoFactorCode}
                  onChange={(e) => handleInputChange("twoFactorCode", e.target.value)}
                  maxLength={6}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.twoFactorCode ? "border-red-500" : isDarkMode ? "border-[#326744]" : "border-gray-200"
                  } ${isDarkMode ? "bg-[#23482f] text-white" : "bg-white text-gray-900"} focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="000000"
                />
              </div>
              {errors.twoFactorCode && (
                <p className="text-red-500 text-sm mt-1">{errors.twoFactorCode}</p>
              )}
              <p className={`text-sm mt-2 ${
                isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
              }`}>
                Enter the 6-digit code from your authenticator app
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen font-display flex items-center justify-center ${
      isDarkMode ? "dark bg-[#102216]" : "bg-[#f6f8f6]"
    }`}>
      <div className="max-w-6xl w-full mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-green-400 to-green-600">
                  <Zap className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className={`text-3xl font-bold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Admin Login
              </h1>
              <p className={`${
                isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
              }`}>
                Secure access to Paragon Admin Panel
              </p>
            </div>

            <Card className={`p-6 border rounded-lg ${
              isDarkMode 
                ? "bg-[#112217] border-[#326744]" 
                : "bg-white border-gray-200"
            }`}>
              <CardHeader className="pb-4">
                <CardTitle className={`text-lg font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  Choose Login Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {loginMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setLoginMethod(method.id)}
                      disabled={!method.available}
                      className={`w-full p-4 rounded-lg border text-left transition-colors ${
                        loginMethod === method.id
                          ? "border-green-500 bg-green-500/10"
                          : isDarkMode
                            ? "border-[#326744] hover:bg-[#23482f]"
                            : "border-gray-200 hover:bg-gray-50"
                      } ${!method.available ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <method.icon className={`h-5 w-5 ${
                          loginMethod === method.id ? "text-green-500" : 
                          isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className={`font-medium ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}>
                              {method.name}
                            </p>
                            {method.recommended && (
                              <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className={`text-sm ${
                            isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                          }`}>
                            {method.description}
                          </p>
                        </div>
                        {!method.available && (
                          <span className="text-xs text-yellow-500">Coming Soon</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={`p-6 border rounded-lg ${
              isDarkMode 
                ? "bg-[#112217] border-[#326744]" 
                : "bg-white border-gray-200"
            }`}>
              <CardContent className="pt-0">
                {renderLoginForm()}
                
                {errors.general && (
                  <div className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50">
                    <p className="text-red-400 text-sm">{errors.general}</p>
                  </div>
                )}

                {(loginMethod === "credentials" || loginMethod === "otp") && (
                  <Button 
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full bg-green-500 hover:bg-green-600 mt-6"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Security Info */}
          <div className="space-y-6">
            <Card className={`p-6 border rounded-lg ${
              isDarkMode 
                ? "bg-[#112217] border-[#326744]" 
                : "bg-white border-gray-200"
            }`}>
              <CardHeader className="pb-4">
                <CardTitle className={`text-lg font-bold flex items-center gap-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  <Shield className="h-5 w-5 text-green-500" />
                  Security Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        End-to-End Encryption
                      </p>
                      <p className={`text-sm ${
                        isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                      }`}>
                        All data is encrypted during transmission
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        Multi-Factor Authentication
                      </p>
                      <p className={`text-sm ${
                        isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                      }`}>
                        Additional security layer for account protection
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        Session Management
                      </p>
                      <p className={`text-sm ${
                        isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                      }`}>
                        Secure session handling and automatic timeout
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        Audit Logging
                      </p>
                      <p className={`text-sm ${
                        isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                      }`}>
                        All login attempts are logged and monitored
                      </p>
                    </div>
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
                  <Activity className="h-5 w-5 text-blue-500" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${
                      isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                    }`}>
                      Authentication Service
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                      Online
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${
                      isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                    }`}>
                      Database Connection
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                      Healthy
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${
                      isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                    }`}>
                      SSL Certificate
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                      Valid
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${
                      isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                    }`}>
                      Last Security Scan
                    </span>
                    <span className={`text-xs ${
                      isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
                    }`}>
                      2 hours ago
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
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
              <p className={`text-sm mt-2 ${
                isDarkMode ? "text-[#92c9a4]" : "text-gray-600"
              }`}>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
