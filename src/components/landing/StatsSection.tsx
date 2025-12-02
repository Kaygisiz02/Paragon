"use client"

import { Users, BarChart3, Star, Shield } from "lucide-react"

export function StatsSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-blue-950">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
            Güvenilir Finans Platformu
          </h2>
          <p className="text-xl text-gray-300">Binlerce kullanıcı tarafından tercih edilen finans yönetim çözümü</p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-xl rounded-3xl p-12 border border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-400 mr-3 animate-pulse" />
                <div className="text-5xl font-black text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">50K+</div>
              </div>
              <div className="text-lg font-bold text-gray-300">Aktif Kullanıcı</div>
              <div className="text-sm text-green-400 mt-2 font-semibold">+25% bu ay 🚀</div>
            </div>
            
            <div className="text-center group">
              <div className="flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-green-400 mr-3 animate-pulse" />
                <div className="text-5xl font-black text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">98%</div>
              </div>
              <div className="text-lg font-bold text-gray-300">Memnuniyet</div>
              <div className="text-sm text-blue-400 mt-2 font-semibold">12K+ değerlendirme ⭐</div>
            </div>
            
            <div className="text-center group">
              <div className="flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-yellow-400 mr-3 animate-pulse" />
                <div className="text-5xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">4.9</div>
              </div>
              <div className="text-lg font-bold text-gray-300">Kullanıcı Puanı</div>
              <div className="text-sm text-purple-400 mt-2 font-semibold">Mükemmel ⭐</div>
            </div>
            
            <div className="text-center group">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-purple-400 mr-3 animate-pulse" />
                <div className="text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">100%</div>
              </div>
              <div className="text-lg font-bold text-gray-300">Güvenlik</div>
              <div className="text-sm text-red-400 mt-2 font-semibold">Sıfır ihlal 🔒</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
