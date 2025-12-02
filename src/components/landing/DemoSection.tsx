"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Rocket, ArrowUpRight, BarChart3, Wallet, Brain } from "lucide-react"

export function DemoSection() {
  return (
    <section className="relative py-16 bg-gradient-to-br from-gray-900 via-black to-blue-950">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="block text-white mb-2">Platform</span>
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-600 bg-clip-text text-transparent">Özellikleri</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ücretsiz kayıt olun ve finans yönetiminizi kolaylaştırın
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Dashboard */}
          <Link href="/auth/register" className="group">
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-2 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Dashboard</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Finansal özet ve AI içgörüleri
              </p>
              <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                <span>Kayıt Ol</span>
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Finansal Araçlar */}
          <Link href="/auth/register" className="group">
            <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 hover:-translate-y-2 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">Finansal Araçlar</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Hesap ve bütçe yönetimi
              </p>
              <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                <span>Keşfet</span>
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* AI Özellikleri */}
          <Link href="/auth/register" className="group">
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-2 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">AI Özellikleri</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Akıllı analiz ve öneriler
              </p>
              <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
                <span>Deneyin</span>
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
            <div className="text-center">
              <div className="text-2xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">24/7</div>
              <div className="text-xs text-gray-400">Destek</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/auth/register">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-16 py-6 text-xl font-black shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/70 border-2 border-purple-500/30">
              <Rocket className="h-6 w-6 mr-3 animate-bounce" />
              Ücretsiz Başlayın
              <ArrowUpRight className="h-6 w-6 ml-3" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
