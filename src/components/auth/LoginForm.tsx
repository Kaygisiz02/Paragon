"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowRight, Lock, Mail } from "lucide-react"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    emailOrUsername: '',
    password: ''
  })

  const validateEmailOrUsername = (value: string) => {
    if (!value) return false
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailRegex.test(value)) return true
    
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
    if (usernameRegex.test(value)) return true
    
    return false
  }

  const validateForm = () => {
    const newErrors = {
      emailOrUsername: validateEmailOrUsername(formData.emailOrUsername) ? '' : 'Geçerli bir e-posta veya kullanıcı adı girin',
      password: formData.password ? '' : 'Şifre alanı zorunludur'
    }
    
    setErrors(newErrors)
    const isValid = Object.values(newErrors).every(error => error === '')
    return isValid
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }

    if (field === 'emailOrUsername') {
      if (value && !validateEmailOrUsername(value)) {
        setErrors(prev => ({ ...prev, emailOrUsername: 'Geçerli bir e-posta veya kullanıcı adı girin' }))
      } else if (value && validateEmailOrUsername(value)) {
        setErrors(prev => ({ ...prev, emailOrUsername: '' }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log("Login successful")
    }, 2000)
  }

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm">
          <Lock className="h-5 w-5 text-blue-400 animate-pulse" />
          <span className="text-lg font-bold text-blue-400">Güvenli Giriş</span>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-white">
            Hoş Geldiniz
          </h1>
          <p className="text-xl text-gray-300">
            Paragon hesabınıza erişin
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email/Username Field */}
        <div className="space-y-3">
          <Label htmlFor="email-username" className="text-gray-300 text-sm font-medium">
            E-posta veya Kullanıcı Adı
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email-username"
              type="text"
              placeholder="E-posta veya kullanıcı adı"
              value={formData.emailOrUsername}
              onChange={(e) => handleInputChange('emailOrUsername', e.target.value)}
              className="pl-12 h-14 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          {errors.emailOrUsername && (
            <p className="text-sm text-red-400">{errors.emailOrUsername}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-3">
          <Label htmlFor="password" className="text-gray-300 text-sm font-medium">
            Şifre
          </Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Şifrenizi girin"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="pl-12 pr-12 h-14 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </Button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password}</p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link 
            href="/auth/forgot-password" 
            className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
          >
            Şifrenizi mi unuttunuz?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-xl shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/70 border-2 border-purple-500/30"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Giriş yapılıyor...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <span>Giriş Yap</span>
              <ArrowRight className="h-5 w-5" />
            </div>
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="text-center">
        <p className="text-gray-400">
          Henüz hesabınız yok mu?{" "}
          <Link href="/auth/register" className="text-blue-400 font-bold hover:text-blue-300 transition-colors">
            Ücretsiz Kayıt Olun
          </Link>
        </p>
      </div>
    </div>
  )
}
