"use client"

import { CheckCircle, Zap, Shield, Award } from "lucide-react"

export function TrustSection() {
  const trustFeatures = [
    {
      icon: Shield,
      title: "Banka Düzeyi Güvenlik",
      description: "256-bit şifreleme ve Two-Factor Authentication",
      color: "from-green-400 to-emerald-400"
    },
    {
      icon: Zap,
      title: "Anlık Senkronizasyon",
      description: "Banka hesaplarınızı gerçek zamanlı senkronize edin",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: Award,
      title: "GDPR Uyumlu",
      description: "KVKK ve GDPR standartlarına tam uyumlu koruma",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: CheckCircle,
      title: "AI Destekli Analiz",
      description: "Kişiselleştirilmiş finansal içgörüler",
      color: "from-yellow-400 to-orange-400"
    }
  ]

  return (
    <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-blue-950">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="block text-white mb-2">Neden</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Paragon?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Enterprise güvenlik, akıllı otomasyon ve 7/24 destek
          </p>
        </div>

        {/* Trust Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="group relative bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 hover:shadow-2xl hover:shadow-gray-500/20 transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-white text-lg">{feature.title}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="text-2xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-2">
                500+ Kurumsal Müşteri
              </div>
              <p className="text-gray-400">Türkiye'nin lider şirketleri Paragon'u tercih ediyor</p>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-black text-green-400">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-blue-400">&lt;100ms</div>
                <div className="text-sm text-gray-400">Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-purple-400">ISO 27001</div>
                <div className="text-sm text-gray-400">Certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
