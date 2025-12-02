"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Shield, 
  Activity, 
  Bell, 
  Key, 
  Monitor, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  TrendingUp,
  Users,
  Smartphone
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SettingsOverviewProps {
  securityStatus?: {
    twoFactorEnabled: boolean
    lastPasswordChange: string
    activeSessions: number
    securityScore: number
  }
  recentActivity?: Array<{
    action: string
    time: string
    icon: any
  }>
}

export function SettingsOverview({ 
  securityStatus = {
    twoFactorEnabled: false,
    lastPasswordChange: "30 gün önce",
    activeSessions: 2,
    securityScore: 75
  },
  recentActivity = [
    { action: "Profil güncellendi", time: "2 saat önce", icon: Users },
    { action: "Parola değiştirildi", time: "1 gün önce", icon: Key },
    { action: "Yeni oturum açıldı", time: "3 gün önce", icon: Monitor }
  ]
}: SettingsOverviewProps) {
  const getSecurityScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400"
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getSecurityScoreText = (score: number) => {
    if (score >= 80) return "Güvenli"
    if (score >= 60) return "Orta"
    return "Riskli"
  }

  const getSecurityScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
    if (score >= 60) return "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800"
    return "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
  }

  const quickStats = [
    {
      title: "Güvenlik Skoru",
      value: `${securityStatus.securityScore}%`,
      subtitle: getSecurityScoreText(securityStatus.securityScore),
      icon: Shield,
      color: getSecurityScoreColor(securityStatus.securityScore),
      trend: securityStatus.securityScore >= 80 ? "up" : securityStatus.securityScore >= 60 ? "neutral" : "down"
    },
    {
      title: "Aktif Oturumlar",
      value: securityStatus.activeSessions.toString(),
      subtitle: "Cihaz bağlı",
      icon: Smartphone,
      color: "text-blue-600 dark:text-blue-400",
      trend: "neutral"
    },
    {
      title: "2FA Durumu",
      value: securityStatus.twoFactorEnabled ? "✓" : "✗",
      subtitle: securityStatus.twoFactorEnabled ? "Etkin" : "Etkin değil",
      icon: Key,
      color: securityStatus.twoFactorEnabled ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
      trend: securityStatus.twoFactorEnabled ? "up" : "down"
    },
    {
      title: "Son Parola",
      value: securityStatus.lastPasswordChange,
      subtitle: "Güncellendi",
      icon: Activity,
      color: "text-purple-600 dark:text-purple-400",
      trend: "neutral"
    }
  ]

  const securityRecommendations = [
    {
      id: "2fa",
      title: "2FA Etkinleştirin",
      description: "Hesabınızı korumak için iki faktörlü kimlik doğrulamayı etkinleştirin.",
      priority: "high",
      icon: Shield,
      action: "/settings/security",
      condition: !securityStatus.twoFactorEnabled
    },
    {
      id: "password",
      title: "Parola Güçlendirmesi",
      description: "Parolanızı daha güvenli hale getirmek için güncelleyin.",
      priority: "medium",
      icon: Key,
      action: "/settings/security",
      condition: securityStatus.securityScore < 80
    },
    {
      id: "sessions",
      title: "Oturumları İnceleyin",
      description: "Aktif oturumlarınızı kontrol edip gereksiz olanları kapatın.",
      priority: "low",
      icon: Monitor,
      action: "/settings/sessions",
      condition: securityStatus.activeSessions > 3
    }
  ]

  const filteredRecommendations = securityRecommendations.filter(rec => rec.condition)

  return (
    <div className="space-y-8">
      {/* Security Overview */}
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Güvenlik Genel Bakış
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <div key={index} className="relative">
                <div className={cn(
                  "p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg",
                  getSecurityScoreBg(securityStatus.securityScore)
                )}>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("p-2 rounded-lg", stat.color === "text-green-600" && "bg-green-100 dark:bg-green-900/30", stat.color === "text-yellow-600" && "bg-yellow-100 dark:bg-yellow-900/30", stat.color === "text-red-600" && "bg-red-100 dark:bg-red-900/30", stat.color === "text-blue-600" && "bg-blue-100 dark:bg-blue-900/30", stat.color === "text-purple-600" && "bg-purple-100 dark:bg-purple-900/30")}>
                      <stat.icon className="h-4 w-4" />
                    </div>
                    {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-green-600" />}
                    {stat.trend === "down" && <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />}
                  </div>
                  <div className="text-2xl font-bold text-foreground dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    {stat.title}
                  </div>
                  <div className="text-xs text-muted-foreground dark:text-gray-500 mt-1">
                    {stat.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Score Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Güvenlik Skoru Detayı
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Mevcut Skor</span>
              <span className={cn("text-sm font-bold", getSecurityScoreColor(securityStatus.securityScore))}>
                {securityStatus.securityScore}%
              </span>
            </div>
            <Progress 
              value={securityStatus.securityScore} 
              className="h-3"
            />
            <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground dark:text-gray-400">
              <div className="text-center">
                <div className="font-medium text-green-600 dark:text-green-400">80-100%</div>
                <div>Güvenli</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-yellow-600 dark:text-yellow-400">60-79%</div>
                <div>Orta</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-red-600 dark:text-red-400">0-59%</div>
                <div>Riskli</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Recommendations */}
      {filteredRecommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Güvenlik Önerileri
              <Badge variant="secondary" className="ml-auto">
                {filteredRecommendations.length} öneri
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredRecommendations.map((recommendation) => (
              <div key={recommendation.id} className={cn(
                "flex items-start gap-3 p-4 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-md",
                recommendation.priority === "high" && "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
                recommendation.priority === "medium" && "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800",
                recommendation.priority === "low" && "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
              )}>
                <div className={cn(
                  "p-2 rounded-lg mt-0.5",
                  recommendation.priority === "high" && "bg-red-100 dark:bg-red-900/30",
                  recommendation.priority === "medium" && "bg-yellow-100 dark:bg-yellow-900/30",
                  recommendation.priority === "low" && "bg-blue-100 dark:bg-blue-900/30"
                )}>
                  <recommendation.icon className={cn(
                    "h-4 w-4",
                    recommendation.priority === "high" && "text-red-600 dark:text-red-400",
                    recommendation.priority === "medium" && "text-yellow-600 dark:text-yellow-400",
                    recommendation.priority === "low" && "text-blue-600 dark:text-blue-400"
                  )} />
                </div>
                <div className="flex-1">
                  <h4 className={cn(
                    "font-medium mb-1",
                    recommendation.priority === "high" && "text-red-900 dark:text-red-100",
                    recommendation.priority === "medium" && "text-yellow-900 dark:text-yellow-100",
                    recommendation.priority === "low" && "text-blue-900 dark:text-blue-100"
                  )}>
                    {recommendation.title}
                  </h4>
                  <p className={cn(
                    "text-sm mb-3",
                    recommendation.priority === "high" && "text-red-800 dark:text-red-200",
                    recommendation.priority === "medium" && "text-yellow-800 dark:text-yellow-200",
                    recommendation.priority === "low" && "text-blue-800 dark:text-blue-200"
                  )}>
                    {recommendation.description}
                  </p>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={recommendation.action}>
                      Şimdi Yap
                    </Link>
                  </Button>
                </div>
                <Badge variant={recommendation.priority === "high" ? "destructive" : recommendation.priority === "medium" ? "secondary" : "outline"}>
                  {recommendation.priority === "high" ? "Kritik" : recommendation.priority === "medium" ? "Önemli" : "Tavsiye"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Son Aktiviteler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 dark:bg-gray-800/30 hover:bg-muted/50 dark:hover:bg-gray-800/50 transition-all duration-300 group hover:scale-105 hover:shadow-md">
                <div className="p-2 rounded-full bg-muted dark:bg-gray-700 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                  <activity.icon className="h-4 w-4 text-muted-foreground dark:text-gray-400 transition-all duration-300 group-hover:scale-110 group-hover:text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground dark:text-white transition-colors duration-300 group-hover:text-primary">
                    {activity.action}
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 transition-colors duration-300 group-hover:text-foreground">
                    {activity.time}
                  </p>
                </div>
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
