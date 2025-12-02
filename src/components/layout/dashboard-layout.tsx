"use client"

import { Navigation } from "./navigation"
import { Header } from "./header"

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar - Fixed Position */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 z-40">
        <Navigation />
      </div>
      
      {/* Main Content Area */}
      <div className="lg:ml-64">
        <Header title={title} subtitle={subtitle} />
        <main className="p-4 lg:p-8 pt-20 lg:pt-8">
          {children}
        </main>
      </div>
      
      {/* Mobile Navigation - Overlay */}
      <div className="lg:hidden">
        <Navigation />
      </div>
    </div>
  )
}
