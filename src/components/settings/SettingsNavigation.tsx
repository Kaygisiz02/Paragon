"use client"

import { useState } from "react"
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

interface SettingsNavigationProps {
  currentPath?: string
  securityStatus?: {
    twoFactorEnabled: boolean
    activeSessions: number
  }
}

export function SettingsNavigation({ 
  currentPath = "/settings",
  securityStatus = {
    twoFactorEnabled: false,
    activeSessions: 2
  }
}: SettingsNavigationProps) {
  const settingsSections = [
    {
      id: "profile",
      title: "Profil",
      description: "Kişisel bilgilerinizi yönetin",
      icon: User,
      href: "/settings/profile",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-950/30",
      borderColor: "border-blue-200 dark:border-blue-800",
      badge: null,
      category: "account",
      status: "complete"
    },
    {
      id: "preferences",
      title: "Tercihler",
      description: "Uygulama ayarlarını özelleştirin",
      icon: Palette,
      href: "/settings/preferences",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/20 hover:bg-green-100 dark:hover:bg-green-950/30",
      borderColor: "border-green-200 dark:border-green-800",
      badge: null,
      category: "appearance",
      status: "complete"
    },
    {
      id: "security",
      title: "Güvenlik",
      description: "Hesap güvenliğinizi güçlendirin",
      icon: Shield,
      href: "/settings/security",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/30",
      borderColor: "border-red-200 dark:border-red-800",
      badge: !securityStatus.twoFactorEnabled ? "2FA önerilir" : null,
      category: "security",
      status: securityStatus.twoFactorEnabled ? "complete" : "warning"
    },
    {
      id: "sessions",
      title: "Oturumlar",
      description: "Aktif oturumlarınızı yönetin",
      icon: Smartphone,
      href: "/settings/sessions",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/20 hover:bg-purple-100 dark:hover:bg-purple-950/30",
      borderColor: "border-purple-200 dark:border-purple-800",
      badge: `${securityStatus.activeSessions} aktif`,
      category: "security",
      status: "active"
    },
    {
      id: "privacy",
      title: "Gizlilik",
      description: "Gizlilik ayarlarınızı yapılandırın",
      icon: Lock,
      href: "/settings/privacy",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/20 hover:bg-orange-100 dark:hover:bg-orange-950/30",
      borderColor: "border-orange-200 dark:border-orange-800",
      badge: null,
      category: "privacy",
      status: "complete"
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
      case "warning":
        return <AlertTriangle className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
      case "active":
        return <Activity className="h-3 w-3 text-blue-600 dark:text-blue-400" />
      default:
        return null
    }
  }

  const isCurrentPath = (href: string) => {
    return currentPath === href || currentPath.startsWith(href + "/")
  }

  return (
    <Card className="sticky top-6 border-2 border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Ayarlar Menüsü
          <Badge variant="outline" className="ml-auto text-xs">
            {settingsSections.length} bölüm
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pb-6">
        {settingsSections.map((section) => {
          const isActive = isCurrentPath(section.href)
          
          return (
            <Link key={section.id} href={section.href}>
              <div className={cn(
                "relative flex items-center justify-between p-4 rounded-xl transition-all duration-300 cursor-pointer group",
                "border-2",
                isActive 
                  ? `${section.bgColor} ${section.borderColor} shadow-lg scale-105` 
                  : "border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:bg-muted/50 hover:scale-105 hover:shadow-md"
              )}>
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                )}
                
                <div className="flex items-center gap-3 flex-1">
                  <div className={cn(
                    "relative p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-md",
                    isActive ? section.bgColor : "bg-muted dark:bg-gray-700"
                  )}>
                    <section.icon className={cn(
                      "h-5 w-5 transition-all duration-300",
                      isActive ? section.color : "text-muted-foreground dark:text-gray-400 group-hover:text-primary"
                    )} />
                    
                    {/* Status icon */}
                    <div className="absolute -top-1 -right-1">
                      {getStatusIcon(section.status)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-semibold text-sm transition-colors duration-300",
                      isActive ? section.color : "text-foreground dark:text-white group-hover:text-primary"
                    )}>
                      {section.title}
                    </h3>
                    <p className={cn(
                      "text-xs transition-colors duration-300",
                      isActive ? "text-muted-foreground dark:text-gray-400" : "text-muted-foreground dark:text-gray-500 group-hover:text-foreground dark:group-hover:text-gray-300"
                    )}>
                      {section.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {section.badge && (
                    <Badge 
                      variant={isActive ? "default" : "secondary"} 
                      className="text-xs transition-all duration-300 group-hover:scale-105"
                    >
                      {section.badge}
                    </Badge>
                  )}
                  <ChevronRight className={cn(
                    "w-4 h-4 transition-all duration-300",
                    isActive ? "text-primary" : "text-muted-foreground dark:text-gray-400 group-hover:translate-x-1 group-hover:text-primary"
                  )} />
                </div>
              </div>
            </Link>
          )
        })}
        
        {/* Quick Actions */}
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start h-auto p-3 group hover:bg-muted/50 hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link href="/settings/security">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm transition-colors duration-300 group-hover:text-red-600 dark:group-hover:text-red-400">
                      Hızlı Güvenlik Kontrolü
                    </div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400 transition-colors duration-300 group-hover:text-foreground dark:group-hover:text-gray-300">
                      Güvenlik ayarlarınızı gözden geçirin
                    </div>
                  </div>
                </div>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start h-auto p-3 group hover:bg-muted/50 hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link href="/settings/profile">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      Profil Güncelleme
                    </div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400 transition-colors duration-300 group-hover:text-foreground dark:group-hover:text-gray-300">
                      Kişisel bilgilerinizi düzenleyin
                    </div>
                  </div>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
