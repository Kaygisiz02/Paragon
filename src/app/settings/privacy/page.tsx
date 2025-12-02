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
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Globe,
  Users,
  Search,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  FileText,
  Database,
  Cookie,
  Camera,
  MapPin,
  CreditCard,
  Settings,
  ShieldCheck,
  UserCheck,
  Activity,
  Wifi,
  Fingerprint,
  Smartphone,
  Monitor,
  Tablet,
  Zap,
  Info,
  Bell,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  History,
  ShieldAlert,
  KeyRound,
  Globe2,
  UserX,
  Ban
} from "lucide-react"

export default function PrivacyPage() {
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showDataExport, setShowDataExport] = useState(false)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    contactInfoVisibility: "private",
    activityVisibility: "friends",
    searchIndexing: true,
    dataCollection: true,
    analyticsTracking: true,
    marketingEmails: false,
    thirdPartySharing: false,
    cookieConsent: "necessary",
    locationServices: false,
    cameraAccess: false,
    microphoneAccess: false,
    biometricData: false,
    socialMediaIntegration: false,
    publicProfile: true,
    showEmail: false,
    showPhone: false,
    showBirthday: false,
    showLocation: false,
    allowTagging: true,
    allowMessages: "friends",
    allowFriendRequests: true,
    dataRetention: "1year",
    autoDeleteData: false,
    emergencyAccess: false,
    twoFactorPrivacy: false,
    encryptedBackup: true,
    shareUsageStats: false,
    crashReporting: true,
    personalizedAds: false,
    crossDeviceTracking: false,
    voiceData: false,
    facialRecognition: false,
    behavioralTracking: false,
    interestBasedAds: false
  })

  const [dataRequests, setDataRequests] = useState([
    {
      id: "1",
      type: "data_export",
      status: "completed",
      requestedDate: "2024-01-10",
      completedDate: "2024-01-12",
      downloadUrl: "/exports/data_2024-01-12.zip"
    },
    {
      id: "2", 
      type: "data_deletion",
      status: "pending",
      requestedDate: "2024-01-15",
      completedDate: null
    }
  ])

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

  const handleSettingsChange = (field: string, value: any) => {
    setPrivacySettings(prev => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)
  }

  const handleDataExport = async () => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newRequest = {
      id: Date.now().toString(),
      type: "data_export",
      status: "processing",
      requestedDate: new Date().toISOString().split('T')[0],
      completedDate: null
    }
    
    setDataRequests(prev => [newRequest, ...prev])
    setIsLoading(false)
    setShowDataExport(false)
    setShowSuccessToast(true)
    
    setTimeout(() => setShowSuccessToast(false), 5000)
  }

  const handleDeleteAccount = async () => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newRequest = {
      id: Date.now().toString(),
      type: "data_deletion",
      status: "processing",
      requestedDate: new Date().toISOString().split('T')[0],
      completedDate: null
    }
    
    setDataRequests(prev => [newRequest, ...prev])
    setIsLoading(false)
    setShowDeleteAccount(false)
    setShowSuccessToast(true)
    
    setTimeout(() => setShowSuccessToast(false), 5000)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRequestIcon = (type: string) => {
    switch (type) {
      case 'data_export': return <Download className="h-4 w-4" />
      case 'data_deletion': return <Trash2 className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <div className="max-w-6xl mx-auto p-6">
          {/* Page Header */}
          <div className="flex flex-col gap-4 pb-8">
            <div>
              <h1 className="text-foreground text-4xl font-black leading-tight tracking-tight">
                Privacy
              </h1>
              <p className="text-muted-foreground text-base font-normal leading-normal">
                Control your privacy settings and manage your personal data.
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
            {/* Profile Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Profile Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <Select value={privacySettings.profileVisibility} onValueChange={(value) => handleSettingsChange("profileVisibility", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Public - Everyone can see
                          </div>
                        </SelectItem>
                        <SelectItem value="friends">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Friends - Only connections
                          </div>
                        </SelectItem>
                        <SelectItem value="private">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Private - Only you
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Contact Information</Label>
                    <Select value={privacySettings.contactInfoVisibility} onValueChange={(value) => handleSettingsChange("contactInfoVisibility", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Activity Visibility</Label>
                    <Select value={privacySettings.activityVisibility} onValueChange={(value) => handleSettingsChange("activityVisibility", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base">Search Engine Indexing</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow search engines to index your profile
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.searchIndexing}
                      onCheckedChange={(checked) => handleSettingsChange("searchIndexing", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data & Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data & Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base">Data Collection</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to collect usage data for service improvement
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.dataCollection}
                      onCheckedChange={(checked) => handleSettingsChange("dataCollection", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base">Analytics Tracking</Label>
                      <p className="text-sm text-muted-foreground">
                        Help us understand how you use our service
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.analyticsTracking}
                      onCheckedChange={(checked) => handleSettingsChange("analyticsTracking", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive promotional emails and updates
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.marketingEmails}
                      onCheckedChange={(checked) => handleSettingsChange("marketingEmails", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Third-party Sharing</Label>
                      <p className="text-sm text-muted-foreground">
                        Share anonymized data with trusted partners
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.thirdPartySharing}
                      onCheckedChange={(checked) => handleSettingsChange("thirdPartySharing", checked)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Cookie Consent</Label>
                  <Select value={privacySettings.cookieConsent} onValueChange={(value) => handleSettingsChange("cookieConsent", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Accept All Cookies</SelectItem>
                      <SelectItem value="necessary">Only Necessary Cookies</SelectItem>
                      <SelectItem value="custom">Custom Selection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Device Permissions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Device Permissions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Location Sharing</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow access to your location for better services
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <Switch
                        checked={privacySettings.locationServices}
                        onCheckedChange={(checked) => handleSettingsChange("locationServices", checked)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Camera Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow camera access for video features
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-muted-foreground" />
                      <Switch
                        checked={privacySettings.cameraAccess}
                        onCheckedChange={(checked) => handleSettingsChange("cameraAccess", checked)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Microphone Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow microphone access for voice features
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <Switch
                        checked={privacySettings.microphoneAccess}
                        onCheckedChange={(checked) => handleSettingsChange("microphoneAccess", checked)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Biometric Data</Label>
                      <p className="text-sm text-muted-foreground">
                        Use fingerprint or face recognition for authentication
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <Switch
                        checked={privacySettings.biometricData}
                        onCheckedChange={(checked) => handleSettingsChange("biometricData", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 text-foreground border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                    onClick={() => setShowDataExport(true)}
                  >
                    <Download className="h-6 w-6" />
                    <span>Export My Data</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
                    onClick={() => setShowDeleteAccount(true)}
                  >
                    <Trash2 className="h-6 w-6" />
                    <span>Delete Account</span>
                  </Button>
                </div>

                {/* Data Requests History */}
                <div className="space-y-4">
                  <h3 className="font-medium">Data Requests History</h3>
                  <div className="space-y-2">
                    {dataRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-full">
                            {getRequestIcon(request.type)}
                          </div>
                          <div>
                            <p className="font-medium capitalize">
                              {request.type.replace('_', ' ')}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Requested: {request.requestedDate}
                              {request.completedDate && ` • Completed: ${request.completedDate}`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                          {request.status === 'completed' && request.downloadUrl && (
                            <Button variant="outline" size="sm" className="text-foreground border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                className="text-foreground border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                onClick={handleCancel}
              >
                İptal
              </Button>
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
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

      {/* Data Export Modal */}
      {showDataExport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Export Your Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We'll prepare a downloadable file containing all your personal data, including profile information, activity logs, and settings.
              </p>
              <p className="text-sm text-muted-foreground">
                This process may take up to 24 hours. You'll receive an email when your data is ready for download.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDataExport(false)} className="text-foreground border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                  Cancel
                </Button>
                <Button onClick={handleDataExport} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Request Export"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteAccount && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-red-600">Delete Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto" />
              <p className="text-sm text-muted-foreground text-center">
                This action cannot be undone. Deleting your account will permanently remove:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>All personal data and information</li>
                <li>Transaction history and records</li>
                <li>Connected accounts and services</li>
                <li>Preferences and settings</li>
              </ul>
              <div className="space-y-2">
                <Label htmlFor="confirmation">Type "DELETE" to confirm</Label>
                <Input
                  id="confirmation"
                  placeholder="DELETE"
                  className="text-center"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDeleteAccount(false)} className="text-foreground border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Delete Account"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-4 bg-card border rounded-lg p-4 shadow-lg">
          <div className="p-2 bg-primary/20 rounded-full">
            <CheckCircle className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col">
            <p className="font-bold">Success</p>
            <p className="text-sm text-muted-foreground">
              Your privacy settings have been saved successfully.
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
