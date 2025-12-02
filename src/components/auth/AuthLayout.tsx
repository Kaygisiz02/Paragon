"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { TrendingUp, ArrowLeft } from "lucide-react"

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  backLink?: {
    text: string
    href: string
  }
}

export function AuthLayout({ children, title, subtitle, backLink }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-950">
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Auth Form */}
        <div className="flex flex-col justify-center items-center p-8 lg:p-12 relative">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 w-full max-w-md">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white">Paragon</span>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                {title}
              </h1>
              <p className="text-lg text-gray-300">
                {subtitle}
              </p>
            </div>

            {/* Form Content */}
            <div className="mb-8">
              {children}
            </div>

            {/* Back Link */}
            {backLink && (
              <div className="text-center">
                <Link 
                  href={backLink.href}
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {backLink.text}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Hero Section */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-8 relative">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative z-10 text-center space-y-8 max-w-lg">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-lg font-bold text-green-400">Modern Finans Yönetimi</span>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Finansal
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Geleceğiniz
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                AI destekli finans yönetimi platformu ile harcamalarınızı analiz edin, 
                tasarruf edin ve finansal hedeflerinize ulaşın.
              </p>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-300">AI destekli harcama analizi</span>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-300">Banka düzeyi güvenlik</span>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-300">Otomatik bütçe yönetimi</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-black text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">50K+</div>
                <div className="text-xs text-gray-400">Kullanıcı</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">98%</div>
                <div className="text-xs text-gray-400">Memnuniyet</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">4.9</div>
                <div className="text-xs text-gray-400">Puan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
