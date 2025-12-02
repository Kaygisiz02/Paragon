"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Rocket, ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 max-w-7xl mx-auto">
      {/* Animated Badge */}
      <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm animate-bounce">
        <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
        <span className="text-lg font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">Akıllı Finans Yönetimi</span>
      </div>
      
      {/* Main Heading */}
      <div className="text-center space-y-8 max-w-6xl mt-8">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1]">
          <span className="block text-white mb-2">Finansal</span>
          <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-600 bg-clip-text text-transparent">Geleceğiniz</span>
          <span className="block text-white">Paragon ile</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
          Yapay zeka destekli finans yönetimi. Harcamalarınızı analiz edin, 
          tasarruf edin ve finansal hedeflerinize ulaşın.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
          <Link href="/auth/register">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-black shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-110 hover:shadow-purple-500/70 border-2 border-purple-500/30">
              <Rocket className="h-6 w-6 mr-3 animate-bounce" />
              Ücretsiz Başlayın
              <ArrowRight className="h-6 w-6 ml-3" />
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" size="lg" className="px-12 py-6 text-xl font-semibold border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-800/50 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
              <Play className="h-6 w-6 mr-3" />
              Giriş Yapın
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-gray-400" />
      </div>
    </section>
  )
}
