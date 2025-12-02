"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Rocket, ArrowRight, CheckCircle, Star } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-blue-950">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-blue-500/30 shadow-2xl">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 backdrop-blur-sm mb-8">
              <Rocket className="h-5 w-5 text-green-400 animate-pulse" />
              <span className="text-lg font-bold text-green-400">Ücretsiz Başlayın</span>
            </div>
            
            {/* Main Heading */}
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="block text-white mb-2">Finansal</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Özgürlüğünüz</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Ücretsiz kayıt olun, finans yönetiminizi Paragon ile kolaylaştırın
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-green-400 font-medium">30 Gün Para İade</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30">
                <Star className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-blue-400 font-medium">4.9/5 Kullanıcı Puanı</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30">
                <CheckCircle className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-purple-400 font-medium">50K+ Mutlu Kullanıcı</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link href="/auth/register">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-16 py-6 text-xl font-black shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/70 border-2 border-purple-500/30">
                  <Rocket className="h-6 w-6 mr-3 animate-bounce" />
                  Ücretsiz Kayıt Olun
                  <ArrowRight className="h-6 w-6 ml-3" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="lg" className="px-16 py-6 text-xl font-semibold border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-800/50 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
                  <Star className="h-6 w-6 mr-3" />
                  Giriş Yapın
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-black text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text mb-2">Sıfır Risk</div>
                <p className="text-sm text-gray-400">30 gün içinde memnun kalmazsanız iade</p>
              </div>
              <div>
                <div className="text-2xl font-black text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-2">Anında Başla</div>
                <p className="text-sm text-gray-400">5 dakikada kayıt olun</p>
              </div>
              <div>
                <div className="text-2xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">7/24 Destek</div>
                <p className="text-sm text-gray-400">Uzman danışman desteği</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
