"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowRight, Lock, Mail, User, CheckCircle, Circle } from "lucide-react"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    uppercase: false,
    number: false,
    special: false
  })
  const [isFormValid, setIsFormValid] = useState(false)

  const validateFullName = (fullName: string) => {
    const nameRegex = /^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]{2,50}$/
    return nameRegex.test(fullName.trim())
  }

  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
    return usernameRegex.test(username)
  }

  const validatePassword = (password: string) => {
    const requirements = {
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    }
    setPasswordRequirements(requirements)
    return Object.values(requirements).every(req => req === true)
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = {
      fullName: validateFullName(formData.fullName) ? '' : 'Adınız ve soyadınızı girin (2-50 karakter)',
      username: validateUsername(formData.username) ? '' : 'Kullanıcı adı 3-20 karakter olmalıdır (sadece harf, rakam, _)',
      email: validateEmail(formData.email) ? '' : 'Geçerli bir e-posta adresi girin',
      password: validatePassword(formData.password) ? '' : 'Şifre tüm gereklilikleri karşılamalıdır',
      confirmPassword: formData.password === formData.confirmPassword && formData.confirmPassword ? '' : 'Şifreler eşleşmiyor'
    }
    
    setErrors(newErrors)
    const isValid = Object.values(newErrors).every(error => error === '')
    setIsFormValid(isValid)
    return isValid
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }

    if (field === 'fullName') {
      if (value && !validateFullName(value)) {
        setErrors(prev => ({ ...prev, fullName: 'Adınız ve soyadınızı girin (2-50 karakter)' }))
      } else if (value && validateFullName(value)) {
        setErrors(prev => ({ ...prev, fullName: '' }))
      }
    }

    if (field === 'username') {
      if (value && !validateUsername(value)) {
        setErrors(prev => ({ ...prev, username: 'Kullanıcı adı 3-20 karakter olmalıdır (sadece harf, rakam, _)' }))
      } else if (value && validateUsername(value)) {
        setErrors(prev => ({ ...prev, username: '' }))
      }
    }

    if (field === 'email') {
      if (value && !validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Geçerli bir e-posta adresi girin' }))
      } else if (value && validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: '' }))
      }
    }

    if (field === 'password') {
      validatePassword(value)
    }

    if (field === 'confirmPassword' && formData.password) {
      if (value !== formData.password) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Şifreler eşleşmiyor' }))
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: '' }))
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
      setFormData({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      setPasswordRequirements({
        minLength: false,
        uppercase: false,
        number: false,
        special: false
      })
    }, 2000)
  }

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 backdrop-blur-sm">
          <User className="h-5 w-5 text-green-400 animate-pulse" />
          <span className="text-lg font-bold text-green-400">Ücretsiz Kayıt</span>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-white">
            Hesap Oluşturun
          </h1>
          <p className="text-xl text-gray-300">
            Finansal yolculuğunuza başlayın
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name Field */}
        <div className="space-y-3">
          <Label htmlFor="fullName" className="text-gray-300 text-sm font-medium">
            Ad Soyad
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="fullName"
              placeholder="Adınızı ve soyadınızı girin"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="pl-12 h-14 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20"
            />
          </div>
          {errors.fullName && (
            <p className="text-sm text-red-400">{errors.fullName}</p>
          )}
        </div>

        {/* Username Field */}
        <div className="space-y-3">
          <Label htmlFor="username" className="text-gray-300 text-sm font-medium">
            Kullanıcı Adı
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="username"
              placeholder="Kullanıcı adınızı girin"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="pl-12 h-14 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20"
            />
          </div>
          {errors.username && (
            <p className="text-sm text-red-400">{errors.username}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-3">
          <Label htmlFor="email" className="text-gray-300 text-sm font-medium">
            E-posta Adresi
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="E-posta adresinizi girin"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="pl-12 h-14 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email}</p>
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
              placeholder="Şifrenizi oluşturun"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="pl-12 pr-12 h-14 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20"
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
          
          {/* Password Requirements */}
          <div className="bg-gray-800/30 rounded-lg p-4 space-y-2">
            <p className="text-xs text-gray-400 font-medium">Şifre gereklilikleri:</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                {passwordRequirements.minLength ? (
                  <CheckCircle className="h-3 w-3 text-green-400" />
                ) : (
                  <Circle className="h-3 w-3 text-gray-500" />
                )}
                <span className={`text-xs ${passwordRequirements.minLength ? 'text-green-400' : 'text-gray-400'}`}>
                  Minimum 8 karakter
                </span>
              </div>
              <div className="flex items-center gap-2">
                {passwordRequirements.uppercase ? (
                  <CheckCircle className="h-3 w-3 text-green-400" />
                ) : (
                  <Circle className="h-3 w-3 text-gray-500" />
                )}
                <span className={`text-xs ${passwordRequirements.uppercase ? 'text-green-400' : 'text-gray-400'}`}>
                  Büyük harf
                </span>
              </div>
              <div className="flex items-center gap-2">
                {passwordRequirements.number ? (
                  <CheckCircle className="h-3 w-3 text-green-400" />
                ) : (
                  <Circle className="h-3 w-3 text-gray-500" />
                )}
                <span className={`text-xs ${passwordRequirements.number ? 'text-green-400' : 'text-gray-400'}`}>
                  Rakam
                </span>
              </div>
              <div className="flex items-center gap-2">
                {passwordRequirements.special ? (
                  <CheckCircle className="h-3 w-3 text-green-400" />
                ) : (
                  <Circle className="h-3 w-3 text-gray-500" />
                )}
                <span className={`text-xs ${passwordRequirements.special ? 'text-green-400' : 'text-gray-400'}`}>
                  Özel karakter
                </span>
              </div>
            </div>
          </div>
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-3">
          <Label htmlFor="confirmPassword" className="text-gray-300 text-sm font-medium">
            Şifreyi Onayla
          </Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Şifrenizi tekrar girin"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="pl-12 pr-12 h-14 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </Button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-400">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className={`w-full h-14 font-bold text-lg rounded-xl transition-all duration-300 border-2 ${
            isFormValid && !isLoading 
              ? 'bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white shadow-2xl shadow-green-500/50 hover:scale-105 hover:shadow-green-500/70 border-green-500/30' 
              : 'bg-gray-700 text-gray-400 cursor-not-allowed border-gray-600'
          }`}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Kayıt oluşturuluyor...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <span>Ücretsiz Kayıt Ol</span>
              <ArrowRight className="h-5 w-5" />
            </div>
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="text-center space-y-4">
        <p className="text-gray-400">
          Zaten hesabınız var mı?{" "}
          <Link href="/auth/login" className="text-green-400 font-bold hover:text-green-300 transition-colors">
            Giriş Yapın
          </Link>
        </p>
        
        <p className="text-xs text-gray-500">
          Kayıt olarak{" "}
          <Link href="/terms" className="underline hover:text-green-400">
            Hizmet Şartları
          </Link>{" "}
          ve{" "}
          <Link href="/privacy" className="underline hover:text-green-400">
            Gizlilik Politikası
          </Link>{" "}
          kabul edersiniz.
        </p>
      </div>
    </div>
  )
}
