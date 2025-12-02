"use client"

import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  User, 
  Settings, 
  Shield, 
  Smartphone, 
  Lock,
  ChevronRight,
  Activity,
  Bell,
  Globe,
  Palette,
  Database,
  Key,
  Monitor,
  Zap,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SettingsLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  showNavigation?: boolean
}

export function SettingsLayout({ title, subtitle, children, showNavigation = true }: SettingsLayoutProps) {
  const settingsSections = [
    {
      title: "Profil",
      description: "Kişisel bilgilerinizi yönetin",
      icon: User,
      href: "/settings/profile",
      color: "text-blue-600 dark:text-blue-400",
      badge: null,
      category: "account"
    },
    {
      title: "Tercihler",
      description: "Uygulama ayarlarını özelleştirin",
      icon: Palette,
      href: "/settings/preferences",
      color: "text-green-600 dark:text-green-400",
      badge: null,
      category: "appearance"
    },
    {
      title: "Güvenlik",
      description: "Hesap güvenliğinizi güçlendirin",
      icon: Shield,
      href: "/settings/security",
      color: "text-red-600 dark:text-red-400",
      badge: "2FA önerilir",
      category: "security"
    },
    {
      title: "Oturumlar",
      description: "Aktif oturumlarınızı yönetin",
      icon: Smartphone,
      href: "/settings/sessions",
      color: "text-purple-600 dark:text-purple-400",
      badge: "2 aktif",
      category: "security"
    },
    {
      title: "Gizlilik",
      description: "Gizlilik ayarlarınızı yapılandırın",
      icon: Lock,
      href: "/settings/privacy",
      color: "text-orange-600 dark:text-orange-400",
      badge: null,
      category: "privacy"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 pb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-foreground dark:text-white text-4xl font-black leading-tight tracking-tight">
            {title}
          </h1>
          <p className="text-muted-foreground dark:text-gray-400 text-base font-normal leading-normal">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Settings Navigation */}
        {showNavigation && (
          <div className="w-80 flex-shrink-0">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Ayarlar Menüsü
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {settingsSections.map((section, index) => (
                  <Link key={index} href={section.href}>
                    <div className={cn(
                      "flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:bg-muted/50 hover:scale-105 group cursor-pointer",
                      "border border-transparent hover:border-primary/20"
                    )}>
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-lg bg-muted transition-all duration-300 group-hover:scale-110 group-hover:shadow-md",
                          section.color
                        )}>
                          <section.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm transition-colors duration-300 group-hover:text-primary">
                            {section.title}
                          </h3>
                          <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                            {section.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {section.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {section.badge}
                          </Badge>
                        )}
                        <ChevronRight className="w-4 h-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
