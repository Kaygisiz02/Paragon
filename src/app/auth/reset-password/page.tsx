"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, CheckCircle, Circle } from "lucide-react"

export default function PasswordResetPage() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: ""
  })

  // Password validation requirements
  const [requirements, setRequirements] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false
  })

  useEffect(() => {
    // Check password requirements
    setRequirements({
      minLength: newPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(newPassword),
      hasLowercase: /[a-z]/.test(newPassword),
      hasNumber: /\d/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)
    })
  }, [newPassword])

  const validateForm = () => {
    const newErrors = {
      newPassword: "",
      confirmPassword: ""
    }

    if (!newPassword) {
      newErrors.newPassword = "Şifre alanı zorunludur"
    } else if (!Object.values(requirements).every(req => req)) {
      newErrors.newPassword = "Tüm şifre gereksinimlerini karşılayın"
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Şifre onayı zorunludur"
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor"
    }

    setErrors(newErrors)
    return Object.values(newErrors).every(error => error === "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to login or show success message
      console.log("Password reset successful")
    }, 2000)
  }

  const RequirementItem = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center gap-3">
      {met ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <Circle className="h-4 w-4 text-muted-foreground" />
      )}
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 h-6 bg-primary rounded-sm"></div>
              <h2 className="text-2xl font-bold">Paragon</h2>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Title */}
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight mb-3">Şifre Sıfırla</h1>
              <p className="text-muted-foreground">
                Güvenliğiniz için yeni, güçlü bir şifre belirleyin.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-base font-medium">
                  Yeni Şifre
                </Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Yeni şifrenizi girin"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pr-12 h-14"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.newPassword && (
                  <p className="text-sm text-red-500">{errors.newPassword}</p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
                <RequirementItem met={requirements.minLength} text="En az 8 karakter içermeli" />
                <RequirementItem met={requirements.hasUppercase} text="Büyük harf içermeli" />
                <RequirementItem met={requirements.hasLowercase} text="Küçük harf içermeli" />
                <RequirementItem met={requirements.hasNumber} text="Rakam içermeli" />
                <RequirementItem met={requirements.hasSpecialChar} text="Özel karakter içermeli" />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-base font-medium">
                  Yeni Şifreyi Onayla
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Yeni şifrenizi tekrar girin"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-14"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-bold"
                  disabled={isLoading}
                >
                  {isLoading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
