import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { HeroSection } from "@/components/landing/HeroSection"
import { FeaturesGrid } from "@/components/landing/FeaturesGrid"
import { StatsSection } from "@/components/landing/StatsSection"
import { DemoSection } from "@/components/landing/DemoSection"
import { TrustSection } from "@/components/landing/TrustSection"
import { CTASection } from "@/components/landing/CTASection"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-display overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-950">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/50 group-hover:scale-110 transition-all duration-300 group-hover:rotate-3">
            <Sparkles className="h-7 w-7 text-white animate-pulse" />
          </div>
          <div>
            <span className="text-3xl font-black text-white tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Paragon</span>
            <p className="text-sm text-gray-400 font-medium">AI Finance Revolution</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105">
              Giriş Yap
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/70 font-semibold">
              Kayıt Ol
            </Button>
          </Link>
        </div>
      </nav>

      {/* Page Sections */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Features Grid */}
        <FeaturesGrid />

        {/* 3. Stats Section */}
        <StatsSection />

        {/* 4. Demo Section */}
        <DemoSection />

        {/* 5. Trust Section */}
        <TrustSection />

        {/* 6. CTA Section */}
        <CTASection />
      </main>

      {/* Enhanced Footer */}
      <footer className="relative z-10 border-t border-gray-800 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl shadow-purple-500/50">
                <Sparkles className="h-7 w-7 text-white animate-pulse" />
              </div>
              <div>
                <span className="text-2xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Paragon</span>
                <p className="text-sm text-gray-400">AI Finance Revolution</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 text-gray-400">
              <div className="flex items-center gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors font-medium">Gizlilik Politikası</Link>
                <Link href="/terms" className="hover:text-white transition-colors font-medium">Kullanım Şartları</Link>
                <Link href="/support" className="hover:text-white transition-colors font-medium">Destek</Link>
              </div>
              <div className="flex items-center gap-2">
                <span>© 2024 Paragon.</span>
                <span>Tüm hakları saklıdır.</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
