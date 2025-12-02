"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Shield, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  EyeOff,
  Smartphone,
  Key,
  Fingerprint,
  ShieldCheck,
  AlertCircle,
  CreditCard
} from "lucide-react"
import type { Card as CardType } from "@/hooks/useCards"

interface CardSecurityProps {
  cards: CardType[]
  onTogglePin?: (cardId: string) => void
  onToggle2FA?: (cardId: string) => void
  onToggleFraudAlerts?: (cardId: string) => void
  onToggleInternationalUsage?: (cardId: string) => void
}

export function CardSecurity({ 
  cards, 
  onTogglePin, 
  onToggle2FA, 
  onToggleFraudAlerts, 
  onToggleInternationalUsage 
}: CardSecurityProps) {
  const getSecurityScore = () => {
    if (cards.length === 0) return 0
    
    const totalScore = cards.reduce((sum, card) => {
      let cardScore = 0
      if (card.security?.hasPin) cardScore += 25
      if (card.security?.has2FA) cardScore += 25
      if (card.status === "frozen") cardScore += 25
      if (card.security?.fraudAlerts) cardScore += 25
      return sum + cardScore
    }, 0)
    
    return Math.round(totalScore / cards.length)
  }

  const getSecurityScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600 bg-green-50"
    if (score >= 50) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const getSecurityScoreLabel = (score: number) => {
    if (score >= 75) return "Excellent"
    if (score >= 50) return "Good"
    if (score >= 25) return "Fair"
    return "Poor"
  }

  const securityScore = getSecurityScore()

  return (
    <div className="space-y-6">
      {/* Security Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-500" />
            Security Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-2xl font-bold">{securityScore}</span>
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div>
                <p className="font-semibold">Average Security Score</p>
                <Badge variant="outline" className={getSecurityScoreColor(securityScore)}>
                  {getSecurityScoreLabel(securityScore)}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Across {cards.length} cards</p>
              <p className="text-lg font-bold">{securityScore}%</p>
            </div>
          </div>
          <Progress value={securityScore} className="h-2" />
        </CardContent>
      </Card>

      {/* Individual Card Security */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Individual Card Security</h3>
        <div className="grid gap-4">
          {cards.map((card) => (
            <Card key={card.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>{card.name}</span>
                    <Badge variant="outline">•••• {card.lastFour}</Badge>
                  </div>
                  <Badge variant={card.status === "frozen" ? "secondary" : "default"}>
                    {card.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* PIN Protection */}
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      <span className="text-sm font-medium">PIN Protection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {card.security?.hasPin ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onTogglePin?.(card.id)}
                      >
                        {card.security?.hasPin ? "Change" : "Set"}
                      </Button>
                    </div>
                  </div>

                  {/* 2FA */}
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      <span className="text-sm font-medium">2FA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {card.security?.has2FA ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onToggle2FA?.(card.id)}
                      >
                        {card.security?.has2FA ? "Manage" : "Enable"}
                      </Button>
                    </div>
                  </div>

                  {/* Fraud Alerts */}
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm font-medium">Fraud Alerts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {card.security?.fraudAlerts ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onToggleFraudAlerts?.(card.id)}
                      >
                        {card.security?.fraudAlerts ? "Disable" : "Enable"}
                      </Button>
                    </div>
                  </div>

                  {/* International Usage */}
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span className="text-sm font-medium">International Usage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {card.security?.internationalUsage ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onToggleInternationalUsage?.(card.id)}
                      >
                        {card.security?.internationalUsage ? "Restrict" : "Allow"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Security Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Security Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {cards.filter(card => !card.security?.hasPin).length > 0 && (
            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-800">
                  {cards.filter(card => !card.security?.hasPin).length} cards without PIN protection
                </p>
                <p className="text-sm text-red-600">Add PINs to secure these cards</p>
              </div>
            </div>
          )}
          
          {cards.filter(card => !card.security?.has2FA).length > 0 && (
            <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-orange-800">
                  {cards.filter(card => !card.security?.has2FA).length} cards without 2FA
                </p>
                <p className="text-sm text-orange-600">Enable 2FA for extra security</p>
              </div>
            </div>
          )}
          
          {cards.filter(card => !card.security?.fraudAlerts).length > 0 && (
            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-yellow-800">
                  {cards.filter(card => !card.security?.fraudAlerts).length} cards without fraud alerts
                </p>
                <p className="text-sm text-yellow-600">Enable fraud alerts for monitoring</p>
              </div>
            </div>
          )}
          
          {cards.every(card => card.security?.hasPin && card.security?.has2FA && card.security?.fraudAlerts) && (
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">Excellent security setup</p>
                <p className="text-sm text-green-600">All cards are properly secured</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
