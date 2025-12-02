"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { 
  User, 
  Shield, 
  Bell, 
  CreditCard,
  CheckCircle,
  Upload,
  X,
  Camera,
  AlertCircle,
  Loader2,
  Save,
  RotateCcw
} from "lucide-react"

export default function ProfilePage() {
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeSection, setActiveSection] = useState("profile")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState("")
  const [toastTimeout, setToastTimeout] = useState<NodeJS.Timeout | null>(null)
  const [formData, setFormData] = useState({
    firstName: "Elif",
    lastName: "Kaya",
    username: "elif.kaya",
    birthDate: "1995-08-15",
    email: "elif.kaya@example.com",
    phone: ""
  })
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: ""
  })
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    phone: false
  })

  const profileMenuItems = [
    { id: "profile", name: "Profile", href: "#", icon: User },
    { id: "security", name: "Security", href: "#", icon: Shield },
    { id: "notifications", name: "Notifications", href: "#", icon: Bell },
    { id: "billing", name: "Billing", href: "#", icon: CreditCard },
  ]

  const validateName = (name: string) => {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim())
  }

  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9._]+$/
    return username.length >= 3 && usernameRegex.test(username)
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    if (!phone) return true // Optional field
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    return phoneRegex.test(phone) && phone.length >= 10
  }

  const validateField = (field: string, value: string) => {
    let error = ""
    
    switch (field) {
      case "firstName":
        if (!validateName(value)) {
          error = "First name must be at least 2 characters and contain only letters."
        }
        break
      case "lastName":
        if (!validateName(value)) {
          error = "Last name must be at least 2 characters and contain only letters."
        }
        break
      case "username":
        if (!validateUsername(value)) {
          error = "Username must be at least 3 characters and contain only letters, numbers, dots, and underscores."
        }
        break
      case "email":
        if (!validateEmail(value)) {
          error = "Please enter a valid email address."
        }
        break
      case "phone":
        if (value && !validatePhone(value)) {
          error = "Please enter a valid phone number."
        }
        break
    }
    
    return error
  }

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      try {
        window.removeEventListener("beforeunload", handleBeforeUnload)
      } catch (error) {
        // Ignore errors during cleanup
        console.warn("Error removing event listener:", error)
      }
    }
  }, [hasUnsavedChanges])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (toastTimeout) {
        try {
          clearTimeout(toastTimeout)
        } catch (error) {
          console.warn("Error clearing timeout:", error)
        }
      }
    }
  }, [toastTimeout])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)
    
    // Real-time validation for touched fields
    if (touched[field as keyof typeof touched]) {
      const error = validateField(field, value)
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }

  const handleInputBlur = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, value)
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      alert('File size must be less than 5MB.')
      return
    }

    setIsUploadingAvatar(true)
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setAvatarPreview(e.target?.result as string)
      setIsUploadingAvatar(false)
      setHasUnsavedChanges(true)
    }
    reader.readAsDataURL(file)

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500))
  }

  const handleRemoveAvatar = () => {
    setAvatarPreview("")
    setHasUnsavedChanges(true)
  }

  const handleSectionChange = (sectionId: string) => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        setActiveSection(sectionId)
        setHasUnsavedChanges(false)
        setTouched({ firstName: false, lastName: false, username: false, email: false, phone: false })
        setErrors({ firstName: "", lastName: "", username: "", email: "", phone: "" })
      }
    } else {
      setActiveSection(sectionId)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors = {
      firstName: validateField("firstName", formData.firstName),
      lastName: validateField("lastName", formData.lastName),
      username: validateField("username", formData.username),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone)
    }
    
    setErrors(newErrors)
    setTouched({ firstName: true, lastName: true, username: true, email: true, phone: true })
    
    if (Object.values(newErrors).every(error => error === "")) {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsLoading(false)
      setHasUnsavedChanges(false)
      setShowSuccessToast(true)
      
      // Clear existing timeout and set new one
      if (toastTimeout) {
        try {
          clearTimeout(toastTimeout)
        } catch (error) {
          console.warn("Error clearing existing timeout:", error)
        }
      }
      
      const newTimeout = setTimeout(() => {
        try {
          setShowSuccessToast(false)
        } catch (error) {
          console.warn("Error hiding toast:", error)
        }
      }, 5000)
      
      setToastTimeout(newTimeout)
    }
  }

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('Are you sure you want to discard your changes?')) {
        // Reset form to original values
        setFormData({
          firstName: "Elif",
          lastName: "Kaya",
          username: "elif.kaya",
          birthDate: "1995-08-15",
          email: "elif.kaya@example.com",
          phone: ""
        })
        setHasUnsavedChanges(false)
        setTouched({ firstName: false, lastName: false, username: false, email: false, phone: false })
        setErrors({ firstName: "", lastName: "", username: "", email: "", phone: "" })
        setAvatarPreview("")
      }
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 pb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-foreground dark:text-white text-4xl font-black leading-tight tracking-tight">
              Profil
            </h1>
            <p className="text-muted-foreground dark:text-gray-400 text-base font-normal leading-normal">
              Kişisel bilgilerinizi yönetin ve güncelleyin
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Profile Header */}
          <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="relative group">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-20 w-20 border-4 border-white dark:border-gray-800 shadow-lg"
                style={{
                  backgroundImage: avatarPreview 
                    ? `url(${avatarPreview})`
                    : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD4jA25abkQmeO38CuHYUfShaS6Vap5e5RsWpc_rMeTJyqI-hDM8y5yhkTTBZMDcuFyZoPuiJ8qzf5TL9OikwDXamXgQXX8d4cjl_1T9a5MLiocSSm65PVmP7M-HiS3RVB9kWnu88D4JvhGgCpR7VX4OnNHW0CxLPp0Q6xenUSdBNVmu-VQzv7DIbShrlGBQ_L-bu7pFOKUFz6KbrAlr0Fd4e8Zwlmp-rfjceKYTGRSGjWr_v7dm5vlF4I8rPup0SZRRO405xqJKfd5')"
                }}
              />
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                {isUploadingAvatar ? (
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                ) : (
                  <Camera className="h-6 w-6 text-white" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploadingAvatar}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground dark:text-white">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-muted-foreground dark:text-gray-400">@{formData.username}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">Premium Üye</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Shield className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Hesap Doğrulanmış</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm"
                variant="outline"
                disabled={isUploadingAvatar}
              >
                {isUploadingAvatar ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Yükleniyor...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Fotoğraf Değiştir
                  </>
                )}
              </Button>
              <Button 
                size="sm"
                variant="outline"
                onClick={handleRemoveAvatar}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Kişisel Bilgiler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">Adı</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    onBlur={(e) => handleInputBlur("firstName", e.target.value)}
                    className={`h-11 ${errors.firstName ? "border-red-500" : "focus:border-primary"}`}
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">Soyadı</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    onBlur={(e) => handleInputBlur("lastName", e.target.value)}
                    className={`h-11 ${errors.lastName ? "border-red-500" : "focus:border-primary"}`}
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Kullanıcı adı <span className="text-muted-foreground">(isteğe bağlı)</span>
                  </Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    onBlur={(e) => handleInputBlur("username", e.target.value)}
                    className={`h-11 ${errors.username ? "border-red-500" : "focus:border-primary"}`}
                  />
                  {touched.username && errors.username && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.username}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-sm font-medium">
                    Doğum tarihi <span className="text-muted-foreground">(isteğe bağlı)</span>
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                İletişim Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">E-posta adresi</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      onBlur={(e) => handleInputBlur("email", e.target.value)}
                      className={`h-11 pr-20 ${errors.email ? "border-red-500" : "focus:border-primary"}`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs font-semibold text-green-600 dark:text-green-400">
                        <CheckCircle className="h-3 w-3" />
                        Doğrulanmış
                      </span>
                    </div>
                  </div>
                  {touched.email && errors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Telefon numarası <span className="text-muted-foreground">(isteğe bağlı)</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+90 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    onBlur={(e) => handleInputBlur("phone", e.target.value)}
                    className={`h-11 ${errors.phone ? "border-red-500" : "focus:border-primary"}`}
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col gap-2" asChild>
              <Link href="/settings/security">
                <Shield className="h-6 w-6" />
                <span>Güvenlik Ayarları</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2" asChild>
              <Link href="/settings/preferences">
                <Bell className="h-6 w-6" />
                <span>Bildirimler</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2" asChild>
              <Link href="/settings/privacy">
                <Shield className="h-6 w-6" />
                <span>Gizlilik</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2" asChild>
              <Link href="/settings/sessions">
                <CreditCard className="h-6 w-6" />
                <span>Oturumlar</span>
              </Link>
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 p-6 bg-muted/30 dark:bg-gray-800/30 rounded-xl border border-gray-200 dark:border-gray-700">
            <Button 
              variant="outline" 
              className="hover:bg-muted/50"
              onClick={handleCancel}
              disabled={isLoading}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              İptal
            </Button>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSubmit}
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
                  Değişiklikleri Kaydet
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-4 bg-card border rounded-lg p-4 shadow-lg z-50">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-foreground dark:text-white">Başarılı</p>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              Değişiklikleriniz başarıyla kaydedildi.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              try {
                // Clear the timeout when manually closing
                if (toastTimeout) {
                  clearTimeout(toastTimeout)
                  setToastTimeout(null)
                }
                setShowSuccessToast(false)
              } catch (error) {
                console.warn("Error closing toast:", error)
              }
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </DashboardLayout>
  )
}
