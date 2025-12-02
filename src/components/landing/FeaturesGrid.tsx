"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Brain, BarChart3, Shield, Zap, PieChart, Lock, CheckCircle, Clock } from "lucide-react"

export function FeaturesGrid() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-blue-950">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="block text-white mb-2">Akıllı</span>
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-600 bg-clip-text text-transparent">Finans Çözümleri</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            AI destekli analiz, güvenli veri koruması ve otomatik yönetim
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* AI Analiz */}
          <Link href="/auth/register" className="group">
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:-translate-y-4 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl shadow-cyan-500/50">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">AI Analiz</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Harcama alışkanlıklarınızı analiz edin ve tasarruf potansiyelinizi keşfedin.
              </p>
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg cursor-pointer group-hover:text-cyan-300 transition-colors">
                <span>Ücretsiz Deneyin</span>
                <ArrowUpRight className="h-5 w-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Güvenli Koruma */}
          <Link href="/auth/register" className="group">
            <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-xl border border-green-500/30 rounded-3xl p-8 hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-500 hover:-translate-y-4 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl shadow-green-500/50">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">Güvenli Koruma</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                256-bit şifreleme ve Two-Factor Authentication ile verileriniz güvende.
              </p>
              <div className="flex items-center gap-2 text-green-400 font-bold text-lg cursor-pointer group-hover:text-green-300 transition-colors">
                <span>Hemen Başlayın</span>
                <ArrowUpRight className="h-5 w-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Otomatik Yönetim */}
          <Link href="/auth/register" className="group">
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-4 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl shadow-purple-500/50">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Otomatik Yönetim</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Hesaplarınızı otomatik senkronize edin ve bütçenizi akıllıca yönetin.
              </p>
              <div className="flex items-center gap-2 text-purple-400 font-bold text-lg cursor-pointer group-hover:text-purple-300 transition-colors">
                <span>Keşfedin</span>
                <ArrowUpRight className="h-5 w-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link href="/auth/register">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-16 py-6 text-xl font-black shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/70 border-2 border-purple-500/30">
              <Zap className="h-6 w-6 mr-3 animate-bounce" />
              Ücretsiz Kayıt Olun
              <ArrowUpRight className="h-6 w-6 ml-3" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
