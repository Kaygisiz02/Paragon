"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      setError("Geçerli bir e-posta adresi girin")
      return
    }

    setIsLoading(true)
    setError("")
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setEmail("")
    }, 2000)
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (error) setError("")
    if (isSubmitted) setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md space-y-8">
        {/* Success Message */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 backdrop-blur-sm">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Bağlantı Gönderildi
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              E-posta adresinize şifre sıfırlama bağlantısı gönderdik. 
              Lütfen gelen kutunuzu kontrol edin.
            </p>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <AlertCircle className="h-4 w-4 text-yellow-400" />
              <span>
                E-posta göremiyorsanız spam klasörünü kontrol edin.
              </span>
            </div>
          </div>

          {/* Resend Link */}
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              E-posta almadınız mı?
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-300 hover:text-white"
            >
              Tekrar Gönder
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-500/30 backdrop-blur-sm">
          <Mail className="h-5 w-5 text-orange-400 animate-pulse" />
          <span className="text-lg font-bold text-orange-400">Şifre Sıfırlama</span>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-white">
            Şifrenizi mi Unuttunuz?
          </h1>
          <p className="text-xl text-gray-300">
            E-posta adresinizi girin, size sıfırlama bağlantısı gönderelim
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
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
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={`pl-12 h-14 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500/20 ${
                error ? 'border-red-500 focus:border-red-500' : ''
              }`}
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-400 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-14 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-700 hover:via-red-700 hover:to-pink-700 text-white font-bold text-lg rounded-xl shadow-2xl shadow-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/70 border-2 border-orange-500/30"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Gönderiliyor...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <span>Sıfırlama Bağlantısı Gönder</span>
              <ArrowRight className="h-5 w-5" />
            </div>
          )}
        </Button>
      </form>

      {/* Help Text */}
      <div className="text-center space-y-4">
        <p className="text-gray-400 text-sm">
          E-posta adresinize şifre sıfırlama bağlantısı göndereceğiz.
          <br />
          Bağlantı 24 saat geçerli olacaktır.
        </p>
        
        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <AlertCircle className="h-4 w-4 text-yellow-400" />
            <span>
              Eğer hesabınız bulunamazsa, size bildirim gönderilmeyecektir.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
