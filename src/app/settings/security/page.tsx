"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Shield,
  Key,
  Smartphone,
  Mail,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  RefreshCw,
  Clock,
  Fingerprint,
  Smartphone as PhoneIcon,
  Monitor,
  Tablet,
  Laptop,
  Zap,
  ShieldCheck,
  UserCheck,
  KeyRound,
  ShieldAlert,
  Activity,
  Wifi,
  Globe,
  Trash2
} from "lucide-react"

export default function SecurityPage() {
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    emailNotifications: true,
    smsNotifications: false,
    loginAlerts: true,
    sessionTimeout: "30min",
    biometricAuth: false,
    autoLock: true,
    autoLockTimeout: "5min",
    trustedDevices: [],
    securityQuestions: [],
    // Dynamic sessions with real-time updates
    activeSessions: [
      {
        id: "1",
        device: "Chrome on Windows",
        deviceType: "desktop",
        location: "Istanbul, Turkey",
        ip: "192.168.1.1",
        lastActive: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // Real-time
        current: true,
        browser: "Chrome 119.0",
        os: "Windows 11",
        loginTime: "2024-01-15 09:30:00",
        trusted: true,
        status: "active"
      },
      {
        id: "2", 
        device: "Safari on iPhone",
        deviceType: "mobile",
        location: "Istanbul, Turkey",
        ip: "192.168.1.2",
        lastActive: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // Real-time
        current: false,
        browser: "Safari 17.1",
        os: "iOS 17.1",
        loginTime: "2024-01-15 08:00:00",
        trusted: false,
        status: "recent"
      },
      {
        id: "3",
        device: "Chrome on MacBook",
        deviceType: "laptop",
        location: "Ankara, Turkey",
        ip: "192.168.1.3",
        lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // Real-time
        current: false,
        browser: "Chrome 118.0",
        os: "macOS Sonoma",
        loginTime: "2024-01-13 14:20:00",
        trusted: false,
        status: "inactive"
      }
    ],
    connectedApps: [
      {
        id: "1",
        name: "Google",
        icon: "🔍",
        connected: true,
        lastUsed: "Today",
        permissions: ["Read profile", "Email access"]
      },
      {
        id: "2",
        name: "Microsoft",
        icon: "🪟", 
        connected: true,
        lastUsed: "Yesterday",
        permissions: ["Basic profile", "Calendar"]
      },
      {
        id: "3",
        name: "Slack",
        icon: "💬",
        connected: false,
        lastUsed: "Last week",
        permissions: ["Messages", "Profile"]
      }
    ]
  })

  const [passwordStrength, setPasswordStrength] = useState<{
    score: number
    feedback: string[]
  }>({
    score: 0,
    feedback: []
  })

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [hasUnsavedChanges])

  const handleInputChange = (field: string, value: any) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)

    if (field === "newPassword") {
      calculatePasswordStrength(value)
    }
  }

  const calculatePasswordStrength = (password: string) => {
    let score = 0
    const feedback = []

    if (password.length >= 8) score++
    else feedback.push("Password should be at least 8 characters")

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
    else feedback.push("Include both uppercase and lowercase letters")

    if (/\d/.test(password)) score++
    else feedback.push("Include at least one number")

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++
    else feedback.push("Include at least one special character")

    setPasswordStrength({ score, feedback })
  }

  const handleToggleSession = (sessionId: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      activeSessions: prev.activeSessions.map(session =>
        session.id === sessionId ? { ...session, current: !session.current } : session
      )
    }))
    setHasUnsavedChanges(true)
  }

  const handleRemoveSession = (sessionId: string) => {
    if (window.confirm('Are you sure you want to remove this session?')) {
      setSecuritySettings(prev => ({
        ...prev,
        activeSessions: prev.activeSessions.filter(session => session.id !== sessionId)
      }))
      setHasUnsavedChanges(true)
    }
  }

  const handleToggleTrust = (sessionId: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      activeSessions: prev.activeSessions.map(session =>
        session.id === sessionId ? { ...session, trusted: !session.trusted } : session
      )
    }))
    setHasUnsavedChanges(true)
  }

  const handleToggleApp = (appId: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      connectedApps: prev.connectedApps.map(app =>
        app.id === appId ? { ...app, connected: !app.connected } : app
      )
    }))
    setHasUnsavedChanges(true)
  }

  const handleRemoveApp = (appId: string) => {
    if (window.confirm('Are you sure you want to remove this app connection?')) {
      setSecuritySettings(prev => ({
        ...prev,
        connectedApps: prev.connectedApps.filter(app => app.id !== appId)
      }))
      setHasUnsavedChanges(true)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate passwords
    if (securitySettings.newPassword && securitySettings.newPassword !== securitySettings.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setHasUnsavedChanges(false)
    setShowSuccessToast(true)
    
    setTimeout(() => setShowSuccessToast(false), 5000)
  }

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('Are you sure you want to discard your changes?')) {
        setSecuritySettings(prev => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        }))
        setHasUnsavedChanges(false)
      }
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 1) return "bg-red-500"
    if (passwordStrength.score === 2) return "bg-yellow-500"
    if (passwordStrength.score === 3) return "bg-blue-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength.score <= 1) return "Weak"
    if (passwordStrength.score === 2) return "Fair"
    if (passwordStrength.score === 3) return "Good"
    return "Strong"
  }

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'desktop': return <Monitor className="h-5 w-5" />
      case 'mobile': return <PhoneIcon className="h-5 w-5" />
      case 'laptop': return <Laptop className="h-5 w-5" />
      case 'tablet': return <Tablet className="h-5 w-5" />
      default: return <Monitor className="h-5 w-5" />
    }
  }

  const getSecurityScore = () => {
    let score = 0
    if (securitySettings.twoFactorEnabled) score += 25
    if (securitySettings.biometricAuth) score += 15
    if (securitySettings.emailNotifications) score += 10
    if (securitySettings.loginAlerts) score += 10
    if (securitySettings.autoLock) score += 10
    if (securitySettings.activeSessions.filter(s => s.trusted).length > 0) score += 15
    if (securitySettings.connectedApps.filter(a => a.connected).length <= 2) score += 15
    return Math.min(score, 100)
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <div className="max-w-6xl mx-auto p-6">
          {/* Page Header */}
          <div className="flex flex-col gap-4 pb-8">
            <div>
              <h1 className="text-foreground text-4xl font-black leading-tight tracking-tight">
                Security
              </h1>
              <p className="text-muted-foreground text-base font-normal leading-normal">
                Manage your security settings and protect your account.
              </p>
            </div>
            {hasUnsavedChanges && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Unsaved changes</span>
              </div>
            )}
          </div>

          {/* Security Score Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Security Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getSecurityScore() >= 80 ? 'text-green-600' : getSecurityScore() >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {getSecurityScore()}%
                  </div>
                  <p className="text-sm text-muted-foreground">Security Score</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{securitySettings.activeSessions.length}</div>
                  <p className="text-sm text-muted-foreground">Active Sessions</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{securitySettings.connectedApps.filter(a => a.connected).length}</div>
                  <p className="text-sm text-muted-foreground">Connected Apps</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{securitySettings.twoFactorEnabled ? "✓" : "✗"}</div>
                  <p className="text-sm text-muted-foreground">2FA Status</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Password Change Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        value={securitySettings.currentPassword}
                        onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={securitySettings.newPassword}
                        onChange={(e) => handleInputChange("newPassword", e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {securitySettings.newPassword && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${getPasswordStrengthColor()}`}
                              style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        {passwordStrength.feedback.length > 0 && (
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {passwordStrength.feedback.map((feedback, index) => (
                              <li key={index} className="flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {feedback}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={securitySettings.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {securitySettings.confirmPassword && securitySettings.newPassword !== securitySettings.confirmPassword && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Passwords do not match
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Two-Factor Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorEnabled}
                    onCheckedChange={(checked) => handleInputChange("twoFactorEnabled", checked)}
                  />
                </div>

                {securitySettings.twoFactorEnabled && (
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Setup Instructions</h4>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Download an authenticator app (Google Authenticator, Authy, etc.)</li>
                      <li>Scan the QR code with your app</li>
                      <li>Enter the 6-digit code to verify</li>
                    </ol>
                    <Button className="mt-4" variant="outline">
                      Generate QR Code
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Security Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Security Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Alert Channels</h4>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive security alerts via email
                        </p>
                      </div>
                      <Switch
                        checked={securitySettings.emailNotifications}
                        onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive security alerts via SMS
                        </p>
                      </div>
                      <Switch
                        checked={securitySettings.smsNotifications}
                        onCheckedChange={(checked) => handleInputChange("smsNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Login Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when someone logs into your account
                        </p>
                      </div>
                      <Switch
                        checked={securitySettings.loginAlerts}
                        onCheckedChange={(checked) => handleInputChange("loginAlerts", checked)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Session Management</h4>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Auto-Lock</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically lock account after inactivity
                        </p>
                      </div>
                      <Switch
                        checked={securitySettings.autoLock}
                        onCheckedChange={(checked) => handleInputChange("autoLock", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Biometric Auth</Label>
                        <p className="text-sm text-muted-foreground">
                          Use fingerprint or face recognition
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fingerprint className="h-4 w-4 text-muted-foreground" />
                        <Switch
                          checked={securitySettings.biometricAuth}
                          onCheckedChange={(checked) => handleInputChange("biometricAuth", checked)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Session Timeout</Label>
                      <Select value={securitySettings.sessionTimeout} onValueChange={(value) => handleInputChange("sessionTimeout", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15min">15 minutes</SelectItem>
                          <SelectItem value="30min">30 minutes</SelectItem>
                          <SelectItem value="1hour">1 hour</SelectItem>
                          <SelectItem value="4hours">4 hours</SelectItem>
                          <SelectItem value="8hours">8 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Active Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Active Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {securitySettings.activeSessions.map((session) => (
                  <div key={session.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-full ${session.current ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {getDeviceIcon(session.deviceType)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-lg">{session.device}</p>
                            {session.current && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                Current Session
                              </span>
                            )}
                            {session.trusted && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                Trusted
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{session.location} • {session.ip}</p>
                          <p className="text-sm text-muted-foreground">Last active: {session.lastActive}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Globe className="h-4 w-4" />
                          <span>{session.browser}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Monitor className="h-4 w-4" />
                          <span>{session.os}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Login: {session.loginTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Shield className="h-4 w-4" />
                          <span>IP: {session.ip}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleTrust(session.id)}
                          className={session.trusted ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-500/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20" : "text-foreground border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"}
                        >
                          <ShieldCheck className="h-4 w-4 mr-2" />
                          {session.trusted ? "Trusted" : "Trust Device"}
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveSession(session.id)}
                        disabled={session.current}
                        className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Terminate
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Connected Apps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Unlock className="h-5 w-5" />
                  Connected Apps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {securitySettings.connectedApps.map((app) => (
                  <div key={app.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{app.icon}</div>
                        <div>
                          <p className="font-semibold text-lg">{app.name}</p>
                          <p className="text-sm text-muted-foreground">Last used: {app.lastUsed}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          app.connected 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {app.connected ? 'Connected' : 'Disconnected'}
                        </span>
                      </div>
                    </div>

                    {app.permissions && (
                      <div className="mb-4">
                        <h4 className="font-medium text-sm mb-2">Permissions</h4>
                        <div className="flex flex-wrap gap-2">
                          {app.permissions.map((permission, index) => (
                            <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                              {permission}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <Switch
                        checked={app.connected}
                        onCheckedChange={() => handleToggleApp(app.id)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveApp(app.id)}
                        className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                onClick={handleCancel}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
              >
                İptal
              </Button>
              <Button 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Kaydet"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-4 bg-card border rounded-lg p-4 shadow-lg">
          <div className="p-2 bg-primary/20 rounded-full">
            <CheckCircle className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col">
            <p className="font-bold">Success</p>
            <p className="text-sm text-muted-foreground">
              Your security settings have been saved successfully.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSuccessToast(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </DashboardLayout>
  )
}
