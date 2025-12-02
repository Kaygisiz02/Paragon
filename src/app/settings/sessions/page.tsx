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
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Globe,
  MapPin,
  Clock,
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
  LogOut,
  Shield,
  ShieldCheck,
  Wifi,
  Activity,
  Fingerprint,
  UserCheck,
  Zap,
  Info,
  Settings,
  Smartphone as PhoneIcon,
  ShieldAlert
} from "lucide-react"

export default function SessionsPage() {
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const [sessions, setSessions] = useState([
    {
      id: "1",
      device: "Chrome on Windows",
      deviceType: "desktop",
      location: "Istanbul, Turkey",
      ip: "192.168.1.1",
      lastActive: "2 minutes ago",
      current: true,
      browser: "Chrome 119.0",
      os: "Windows 11",
      loginTime: "2024-01-13 09:15:00",
      trusted: true,
      activity: [
        { action: "Dashboard viewed", time: "2 minutes ago" },
        { action: "Settings updated", time: "15 minutes ago" },
        { action: "Profile edited", time: "1 hour ago" },
        { action: "Logged in", time: "2 hours ago" }
      ],
      security: {
        twoFactor: true,
        biometric: false,
        trustedNetwork: true
      }
    },
    {
      id: "2", 
      device: "Safari on iPhone",
      deviceType: "mobile",
      location: "Istanbul, Turkey", 
      ip: "192.168.1.2",
      lastActive: "1 hour ago",
      current: false,
      browser: "Safari 17.1",
      os: "iOS 17.1",
      loginTime: "2024-01-12 14:30:00",
      trusted: false,
      activity: [
        { action: "Mobile app used", time: "1 hour ago" },
        { action: "Checked notifications", time: "2 hours ago" }
      ],
      security: {
        twoFactor: false,
        biometric: true,
        trustedNetwork: false
      }
    },
    {
      id: "3",
      device: "Firefox on MacBook",
      deviceType: "laptop",
      location: "Ankara, Turkey",
      ip: "192.168.1.3",
      lastActive: "3 days ago",
      current: false,
      browser: "Firefox 120.0",
      os: "macOS Sonoma",
      loginTime: "2024-01-10 16:45:00",
      trusted: false,
      activity: [
        { action: "Last session", time: "3 days ago" }
      ],
      security: {
        twoFactor: false,
        biometric: false,
        trustedNetwork: false
      }
    },
    {
      id: "4",
      device: "Firefox on Tablet",
      deviceType: "tablet",
      location: "Izmir, Turkey",
      ip: "192.168.1.4",
      lastActive: "1 week ago",
      current: false,
      browser: "Firefox 120.0",
      os: "Android 13",
      loginTime: "2024-01-08 10:15:00",
      trusted: false,
      activity: [
        { action: "Mobile app used", time: "1 week ago" }
      ],
      security: {
        twoFactor: false,
        biometric: false,
        trustedNetwork: false
      }
    }
  ])

  const [sessionSettings, setSessionSettings] = useState({
    autoLogout: true,
    autoLogoutTimeout: "30min",
    maxConcurrentSessions: 3,
    requireReauth: false,
    reauthTimeout: "1hour",
    trustedDevicesOnly: false,
    ipWhitelist: false,
    geoRestrictions: false,
    activityLogging: true,
    securityAlerts: true,
    biometricRequired: false,
    deviceVerification: true
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

  const handleTerminateSession = (sessionId: string) => {
    if (window.confirm('Are you sure you want to terminate this session?')) {
      setSessions(prev => prev.filter(session => session.id !== sessionId))
      setHasUnsavedChanges(true)
    }
  }

  const handleTerminateAllOtherSessions = () => {
    if (window.confirm('Are you sure you want to terminate all other sessions? This will log you out from all devices except this one.')) {
      setSessions(prev => prev.filter(session => session.current))
      setHasUnsavedChanges(true)
    }
  }

  const handleToggleTrust = (sessionId: string) => {
    setSessions(prev => prev.map(session =>
      session.id === sessionId ? { ...session, trusted: !session.trusted } : session
    ))
    setHasUnsavedChanges(true)
  }

  const handleSettingsChange = (field: string, value: any) => {
    setSessionSettings(prev => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
        setHasUnsavedChanges(false)
      }
    }
  }

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'desktop': return <Monitor className="h-5 w-5" />
      case 'mobile': return <Smartphone className="h-5 w-5" />
      case 'tablet': return <Tablet className="h-5 w-5" />
      case 'laptop': return <Laptop className="h-5 w-5" />
      default: return <Monitor className="h-5 w-5" />
    }
  }

  const getSessionStatusColor = (session: any) => {
    if (session.current) return "bg-green-100 text-green-800"
    const lastActive = new Date(session.lastActive)
    const now = new Date()
    const hoursDiff = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60)
    
    if (hoursDiff < 24) return "bg-blue-100 text-blue-800"
    if (hoursDiff < 72) return "bg-yellow-100 text-yellow-800"
    return "bg-gray-100 text-gray-800"
  }

  const getSessionStatusText = (session: any) => {
    if (session.current) return "Current"
    const lastActive = new Date(session.lastActive)
    const now = new Date()
    const hoursDiff = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60)
    
    if (hoursDiff < 24) return "Active"
    if (hoursDiff < 72) return "Recent"
    return "Inactive"
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <div className="max-w-6xl mx-auto p-6">
          {/* Page Header */}
          <div className="flex flex-col gap-4 pb-8">
            <div>
              <h1 className="text-foreground text-4xl font-black leading-tight tracking-tight">
                Sessions
              </h1>
              <p className="text-muted-foreground text-base font-normal leading-normal">
                Manage your active sessions and monitor account access.
              </p>
            </div>
            {hasUnsavedChanges && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Unsaved changes</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Active Sessions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Active Sessions
                  </CardTitle>
                  <Button
                    variant="outline"
                    className="text-foreground border-border hover:bg-accent hover:text-accent-foreground"
                    onClick={handleTerminateAllOtherSessions}
                    disabled={sessions.filter(s => !s.current).length === 0}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Terminate All Others
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {sessions.map((session) => (
                  <div key={session.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full ${session.current ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {getDeviceIcon(session.deviceType)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{session.device}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${getSessionStatusColor(session)}`}>
                              {getSessionStatusText(session)}
                            </span>
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
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Globe className="h-4 w-4" />
                                <span>{session.browser}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Monitor className="h-4 w-4" />
                                <span>{session.os}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{session.location}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>Last active: {session.lastActive}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Shield className="h-4 w-4" />
                                <span>IP: {session.ip}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <LogOut className="h-4 w-4" />
                                <span>Login: {session.loginTime}</span>
                              </div>
                            </div>
                          </div>

                          {/* Recent Activity */}
                          <div className="mt-4">
                            <h4 className="font-medium text-sm mb-2">Recent Activity</h4>
                            <div className="space-y-1">
                              {session.activity.map((activity, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                                  <span>{activity.action}</span>
                                  <span className="text-xs">• {activity.time}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Security Info */}
                          <div className="mt-4">
                            <h4 className="font-medium text-sm mb-2">Security</h4>
                            <div className="flex flex-wrap gap-2">
                              {session.security.twoFactor && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                  2FA Enabled
                                </span>
                              )}
                              {session.security.biometric && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                  Biometric
                                </span>
                              )}
                              {session.security.trustedNetwork && (
                                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                  Trusted Network
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleTrust(session.id)}
                          className={session.trusted ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20" : "text-foreground border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"}
                        >
                          <ShieldCheck className="h-4 w-4 mr-2" />
                          {session.trusted ? "Trusted" : "Trust"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTerminateSession(session.id)}
                          disabled={session.current}
                          className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Terminate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Session Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Session Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Security Settings</h4>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Auto-logout</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically log out after inactivity
                        </p>
                      </div>
                      <Switch
                        checked={sessionSettings.autoLogout}
                        onCheckedChange={(checked) => handleSettingsChange("autoLogout", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Require Re-authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Ask for password for sensitive actions
                        </p>
                      </div>
                      <Switch
                        checked={sessionSettings.requireReauth}
                        onCheckedChange={(checked) => handleSettingsChange("requireReauth", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Biometric Required</Label>
                        <p className="text-sm text-muted-foreground">
                          Require biometric authentication
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fingerprint className="h-4 w-4 text-muted-foreground" />
                        <Switch
                          checked={sessionSettings.biometricRequired}
                          onCheckedChange={(checked) => handleSettingsChange("biometricRequired", checked)}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Device Verification</Label>
                        <p className="text-sm text-muted-foreground">
                          Verify new devices automatically
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                        <Switch
                          checked={sessionSettings.deviceVerification}
                          onCheckedChange={(checked) => handleSettingsChange("deviceVerification", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Access Control</h4>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Trusted Devices Only</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow only trusted devices
                        </p>
                      </div>
                      <Switch
                        checked={sessionSettings.trustedDevicesOnly}
                        onCheckedChange={(checked) => handleSettingsChange("trustedDevicesOnly", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">IP Whitelist</Label>
                        <p className="text-sm text-muted-foreground">
                          Restrict access to specific IPs
                        </p>
                      </div>
                      <Switch
                        checked={sessionSettings.ipWhitelist}
                        onCheckedChange={(checked) => handleSettingsChange("ipWhitelist", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Geo Restrictions</Label>
                        <p className="text-sm text-muted-foreground">
                          Limit access by geographic location
                        </p>
                      </div>
                      <Switch
                        checked={sessionSettings.geoRestrictions}
                        onCheckedChange={(checked) => handleSettingsChange("geoRestrictions", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Activity Logging</Label>
                        <p className="text-sm text-muted-foreground">
                          Log all session activities
                        </p>
                      </div>
                      <Switch
                        checked={sessionSettings.activityLogging}
                        onCheckedChange={(checked) => handleSettingsChange("activityLogging", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Auto-logout Timeout</Label>
                    <Select value={sessionSettings.autoLogoutTimeout} onValueChange={(value) => handleSettingsChange("autoLogoutTimeout", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15min">15 minutes</SelectItem>
                        <SelectItem value="30min">30 minutes</SelectItem>
                        <SelectItem value="1hour">1 hour</SelectItem>
                        <SelectItem value="2hours">2 hours</SelectItem>
                        <SelectItem value="4hours">4 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Re-authentication Timeout</Label>
                    <Select value={sessionSettings.reauthTimeout} onValueChange={(value) => handleSettingsChange("reauthTimeout", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30min">30 minutes</SelectItem>
                        <SelectItem value="1hour">1 hour</SelectItem>
                        <SelectItem value="2hours">2 hours</SelectItem>
                        <SelectItem value="4hours">4 hours</SelectItem>
                        <SelectItem value="8hours">8 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Max Concurrent Sessions</Label>
                    <Select value={sessionSettings.maxConcurrentSessions.toString()} onValueChange={(value) => handleSettingsChange("maxConcurrentSessions", parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 session</SelectItem>
                        <SelectItem value="3">3 sessions</SelectItem>
                        <SelectItem value="5">5 sessions</SelectItem>
                        <SelectItem value="10">10 sessions</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" />
                  Security Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sessions.filter(s => !s.trusted).length > 0 && (
                    <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <ShieldAlert className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Untrusted Devices</h4>
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          You have {sessions.filter(s => !s.trusted).length} untrusted sessions. Consider terminating them.
                        </p>
                        <Button size="sm" className="mt-2" variant="outline" onClick={handleTerminateAllOtherSessions}>
                          Terminate Untrusted
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {sessions.length > 3 && (
                    <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 dark:text-blue-100">Multiple Sessions</h4>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          You have {sessions.length} active sessions. Consider reducing for better security.
                        </p>
                        <Button size="sm" className="mt-2" variant="outline" onClick={handleTerminateAllOtherSessions}>
                          Manage Sessions
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button 
                variant="outline" 
                className="text-foreground border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                onClick={handleCancel}
              >
                İptal
              </Button>
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
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
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="font-medium">Settings saved successfully!</span>
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
