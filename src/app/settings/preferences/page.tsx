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
  Palette,
  Globe,
  Bell,
  Shield,
  AlertCircle,
  Loader2,
  CheckCircle,
  X,
  Moon,
  Sun,
  Monitor,
  Eye,
  EyeOff,
  Volume2,
  Wifi,
  Smartphone,
  Monitor as DesktopIcon,
  Save,
  RotateCcw,
  Zap,
  ChevronDown
} from "lucide-react"

export default function PreferencesPage() {
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    appearance: true,
    notifications: false,
    performance: false,
    connectivity: false,
    privacy: false
  })

  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "tr",
    timezone: "Europe/Istanbul",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    currency: "TRY",
    numberFormat: "1,234.56",
    notifications: {
      email: true,
      push: true,
      sms: false,
      desktop: true,
      sound: true,
      vibration: true,
      led: false
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
      allowDirectMessages: true,
      twoFactorAuth: false
    },
    performance: {
      animations: true,
      reducedMotion: false,
      highContrast: false,
      largeText: false
    },
    connectivity: {
      offlineMode: false,
      autoSync: true,
      lowDataMode: false,
      backgroundSync: true
    }
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
    setPreferences(prev => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)
  }

  const handleNestedInputChange = (category: string, field: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof typeof prev] as any),
        [field]: value
      }
    }))
    setHasUnsavedChanges(true)
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
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
        // Reset to original values
        setPreferences({
          theme: "system",
          language: "tr",
          timezone: "Europe/Istanbul",
          dateFormat: "DD/MM/YYYY",
          timeFormat: "24h",
          currency: "TRY",
          numberFormat: "1,234.56",
          notifications: {
            email: true,
            push: true,
            sms: false,
            desktop: true,
            sound: true,
            vibration: true,
            led: false
          },
          privacy: {
            profileVisibility: "public",
            showEmail: false,
            showPhone: false,
            allowDirectMessages: true,
            twoFactorAuth: false
          },
          performance: {
            animations: true,
            reducedMotion: false,
            highContrast: false,
            largeText: false
          },
          connectivity: {
            offlineMode: false,
            autoSync: true,
            lowDataMode: false,
            backgroundSync: true
          }
        })
        setHasUnsavedChanges(false)
      }
    }
  }

  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 pb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-foreground dark:text-white text-4xl font-black leading-tight tracking-tight">
              Tercihler
            </h1>
            <p className="text-muted-foreground dark:text-gray-400 text-base font-normal leading-normal">
              Uygulama ayarlarını özelleştirin ve tercihlerinizi yönetin.
            </p>
          </div>
          {hasUnsavedChanges && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Kaydedilmemiş değişiklikler</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Appearance Section */}
          <Card className={expandedSections.appearance ? "ring-2 ring-primary/20" : ""}>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection("appearance")}
            >
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Görünüm
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSections.appearance ? "rotate-180" : ""}`} />
              </CardTitle>
            </CardHeader>
            {expandedSections.appearance && (
              <CardContent className="space-y-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <Select value={preferences.theme} onValueChange={(value) => handleInputChange("theme", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            Light
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            Dark
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4" />
                            System
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Dil</Label>
                    <Select value={preferences.language} onValueChange={(value) => handleInputChange("language", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tr">Türkçe</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Saat Dilimi</Label>
                    <Select value={preferences.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Istanbul">Europe/Istanbul (GMT+3)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                        <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Tarih Formatı</Label>
                    <Select value={preferences.dateFormat} onValueChange={(value) => handleInputChange("dateFormat", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Saat Formatı</Label>
                    <Select value={preferences.timeFormat} onValueChange={(value) => handleInputChange("timeFormat", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">24-hour</SelectItem>
                        <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Para Birimi</Label>
                    <Select value={preferences.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TRY">TRY - Turkish Lira</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Enhanced Notifications Section */}
          <Card className={expandedSections.notifications ? "ring-2 ring-primary/20" : ""}>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection("notifications")}
            >
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Bildirimler
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSections.notifications ? "rotate-180" : ""}`} />
              </CardTitle>
            </CardHeader>
            {expandedSections.notifications && (
              <CardContent className="space-y-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Bildirim Kanalları</h4>
                    {Object.entries(preferences.notifications).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                        <div className="space-y-0.5">
                          <Label className="text-base capitalize">{key}</Label>
                          <p className="text-sm text-muted-foreground">
                            {key} üzerinden bildirim alın
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => handleNestedInputChange("notifications", key, checked)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Cihaz Ayarları</h4>
                    {Object.entries(preferences.notifications).slice(4).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                        <div className="space-y-0.5">
                          <Label className="text-base capitalize">{key}</Label>
                          <p className="text-sm text-muted-foreground">
                            {key === 'sound' ? 'Bildirimler için ses çal' :
                             key === 'vibration' ? 'Mobil cihazlarda titreşim' :
                             key === 'led' ? 'LED bildirim göstergesi' : ''}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {key === 'sound' && <Volume2 className="h-4 w-4 text-muted-foreground" />}
                          {key === 'vibration' && <Smartphone className="h-4 w-4 text-muted-foreground" />}
                          {key === 'led' && <Zap className="h-4 w-4 text-muted-foreground" />}
                          <Switch
                            checked={value}
                            onCheckedChange={(checked) => handleNestedInputChange("notifications", key, checked)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Performance Section */}
          <Card className={expandedSections.performance ? "ring-2 ring-primary/20" : ""}>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection("performance")}
            >
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Performans & Erişilebilirlik
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSections.performance ? "rotate-180" : ""}`} />
              </CardTitle>
            </CardHeader>
            {expandedSections.performance && (
              <CardContent className="space-y-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Performans</h4>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Animasyonlar</Label>
                        <p className="text-sm text-muted-foreground">
                          UI animasyonlarını ve geçişleri etkinleştir
                        </p>
                      </div>
                      <Switch
                        checked={preferences.performance.animations}
                        onCheckedChange={(checked) => handleNestedInputChange("performance", "animations", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Hareketi Azalt</Label>
                        <p className="text-sm text-muted-foreground">
                          Erişilebilirlik için animasyonları en aza indir
                        </p>
                      </div>
                      <Switch
                        checked={preferences.performance.reducedMotion}
                        onCheckedChange={(checked) => handleNestedInputChange("performance", "reducedMotion", checked)}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Erişilebilirlik</h4>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Yüksek Kontrast</Label>
                        <p className="text-sm text-muted-foreground">
                          Daha iyi görünürlük için kontrastı artır
                        </p>
                      </div>
                      <Switch
                        checked={preferences.performance.highContrast}
                        onCheckedChange={(checked) => handleNestedInputChange("performance", "highContrast", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Büyük Metin</Label>
                        <p className="text-sm text-muted-foreground">
                          Okunabilirlik için yazı boyutunu artır
                        </p>
                      </div>
                      <Switch
                        checked={preferences.performance.largeText}
                        onCheckedChange={(checked) => handleNestedInputChange("performance", "largeText", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Connectivity Section */}
          <Card className={expandedSections.connectivity ? "ring-2 ring-primary/20" : ""}>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection("connectivity")}
            >
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  Bağlantı & Senkronizasyon
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSections.connectivity ? "rotate-180" : ""}`} />
              </CardTitle>
            </CardHeader>
            {expandedSections.connectivity && (
              <CardContent className="space-y-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Bağlantı</h4>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Çevrimdışı Mod</Label>
                        <p className="text-sm text-muted-foreground">
                          İnternet bağlantısı olmadan çalış
                        </p>
                      </div>
                      <Switch
                        checked={preferences.connectivity.offlineMode}
                        onCheckedChange={(checked) => handleNestedInputChange("connectivity", "offlineMode", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Düşük Veri Modu</Label>
                        <p className="text-sm text-muted-foreground">
                          Mobil ağlarda veri kullanımını azalt
                        </p>
                      </div>
                      <Switch
                        checked={preferences.connectivity.lowDataMode}
                        onCheckedChange={(checked) => handleNestedInputChange("connectivity", "lowDataMode", checked)}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Senkronizasyon</h4>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Otomatik Senk</Label>
                        <p className="text-sm text-muted-foreground">
                          Verileri otomatik olarak cihazlar arasında senkronize et
                        </p>
                      </div>
                      <Switch
                        checked={preferences.connectivity.autoSync}
                        onCheckedChange={(checked) => handleNestedInputChange("connectivity", "autoSync", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Arka Plan Senk</Label>
                        <p className="text-sm text-muted-foreground">
                          Uygulama arka plandayken verileri senkronize et
                        </p>
                      </div>
                      <Switch
                        checked={preferences.connectivity.backgroundSync}
                        onCheckedChange={(checked) => handleNestedInputChange("connectivity", "backgroundSync", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Privacy Section */}
          <Card className={expandedSections.privacy ? "ring-2 ring-primary/20" : ""}>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection("privacy")}
            >
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Gizlilik
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSections.privacy ? "rotate-180" : ""}`} />
              </CardTitle>
            </CardHeader>
            {expandedSections.privacy && (
              <CardContent className="space-y-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Profil Görünürlüğü</Label>
                    <Select value={preferences.privacy.profileVisibility} onValueChange={(value) => handleNestedInputChange("privacy", "profileVisibility", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Herkese Açık</SelectItem>
                        <SelectItem value="friends">Sadece Arkadaşlar</SelectItem>
                        <SelectItem value="private">Özel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label>E-postayı Göster</Label>
                      <p className="text-sm text-muted-foreground">
                        E-posta adresinizi profilinizde gösterin
                      </p>
                    </div>
                    <Switch
                      checked={preferences.privacy.showEmail}
                      onCheckedChange={(checked) => handleNestedInputChange("privacy", "showEmail", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label>Telefonu Göster</Label>
                      <p className="text-sm text-muted-foreground">
                        Telefon numaranızı profilinizde gösterin
                      </p>
                    </div>
                    <Switch
                      checked={preferences.privacy.showPhone}
                      onCheckedChange={(checked) => handleNestedInputChange("privacy", "showPhone", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label>Direkt Mesajlara İzin Ver</Label>
                      <p className="text-sm text-muted-foreground">
                        Diğer kullanıcıların size mesaj göndermesine izin verin
                      </p>
                    </div>
                    <Switch
                      checked={preferences.privacy.allowDirectMessages}
                      onCheckedChange={(checked) => handleNestedInputChange("privacy", "allowDirectMessages", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="space-y-0.5">
                      <Label>İki Faktörlü Kimlik Doğrulama</Label>
                      <p className="text-sm text-muted-foreground">
                        Hesabınıza ekstra güvenlik katmanı ekleyin
                      </p>
                    </div>
                    <Switch
                      checked={preferences.privacy.twoFactorAuth}
                      onCheckedChange={(checked) => handleNestedInputChange("privacy", "twoFactorAuth", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Enhanced Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="text-foreground border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                onClick={handleCancel}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                İptal
              </Button>
              <Button 
                variant="outline"
                className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 border-blue-200 dark:border-blue-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                onClick={() => {
                  if (window.confirm('Tüm tercihleri varsayılan değerlere sıfırlamak istediğinizden emin misiniz?')) {
                    setPreferences({
                      theme: "system",
                      language: "tr",
                      timezone: "Europe/Istanbul",
                      dateFormat: "DD/MM/YYYY",
                      timeFormat: "24h",
                      currency: "TRY",
                      numberFormat: "1,234.56",
                      notifications: {
                        email: true,
                        push: true,
                        sms: false,
                        desktop: true,
                        sound: true,
                        vibration: true,
                        led: false
                      },
                      privacy: {
                        profileVisibility: "public",
                        showEmail: false,
                        showPhone: false,
                        allowDirectMessages: true,
                        twoFactorAuth: false
                      },
                      performance: {
                        animations: true,
                        reducedMotion: false,
                        highContrast: false,
                        largeText: false
                      },
                      connectivity: {
                        offlineMode: false,
                        autoSync: true,
                        lowDataMode: false,
                        backgroundSync: true
                      }
                    })
                    setHasUnsavedChanges(true)
                  }
                }}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Varsayılana Sıfırla
              </Button>
            </div>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Kaydet
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-4 bg-card border rounded-lg p-4 shadow-lg">
          <div className="p-2 bg-primary/20 rounded-full">
            <CheckCircle className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-foreground dark:text-white">Başarılı</p>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              Tercihleriniz başarıyla kaydedildi.
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
