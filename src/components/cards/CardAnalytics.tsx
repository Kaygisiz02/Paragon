"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target, 
  DollarSign, 
  Shield,
  Gift,
  Activity,
  Clock,
  Zap
} from "lucide-react"
import type { CardAnalytics } from "@/hooks/useCards"

interface CardAnalyticsProps {
  analytics: CardAnalytics
}

export function CardAnalytics({ analytics }: CardAnalyticsProps) {
  const getUtilizationColor = (rate: number) => {
    if (rate >= 90) return "text-red-600 bg-red-50"
    if (rate >= 70) return "text-yellow-600 bg-yellow-50"
    return "text-green-600 bg-green-50"
  }

  const getRewardsTierColor = (tier: string) => {
    switch (tier) {
      case "platinum": return "text-purple-600 bg-purple-50"
      case "gold": return "text-yellow-600 bg-yellow-50"
      case "silver": return "text-gray-600 bg-gray-50"
      default: return "text-orange-600 bg-orange-50"
    }
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full -mr-12 -mt-12"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-blue-500 rounded-xl shadow-lg shadow-blue-500/30">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="text-blue-600 bg-blue-50">
                Balance
              </Badge>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Total Balance</p>
            <p className="text-2xl font-bold tracking-tight text-blue-800">
              ₺{analytics.totalBalance.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Across {analytics.activeCards + analytics.frozenCards} cards
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full -mr-12 -mt-12"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-green-500 rounded-xl shadow-lg shadow-green-500/30">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="text-green-600 bg-green-50">
                Credit
              </Badge>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Available Credit</p>
            <p className="text-2xl font-bold tracking-tight text-green-800">
              ₺{analytics.totalAvailableCredit.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              ₺{analytics.totalCreditLimit.toLocaleString()} limit
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full -mr-12 -mt-12"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-purple-500 rounded-xl shadow-lg shadow-purple-500/30">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="text-purple-600 bg-purple-50">
                Rewards
              </Badge>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Total Points</p>
            <p className="text-2xl font-bold tracking-tight text-purple-800">
              {analytics.totalRewards.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Across all reward cards
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full -mr-12 -mt-12"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/30">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="text-orange-600 bg-orange-50">
                Spending
              </Badge>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Monthly Spending</p>
            <p className="text-2xl font-bold tracking-tight text-orange-800">
              ₺{analytics.monthlySpending.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              ₺{analytics.averageBalance.toLocaleString()} avg balance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-500" />
              Card Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Active</span>
                  <Badge variant="outline" className="text-green-600 bg-green-50">
                    {analytics.activeCards}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  {analytics.activeCards > 0 ? Math.round((analytics.activeCards / (analytics.activeCards + analytics.frozenCards + analytics.expiredCards)) * 100) : 0}%
                </span>
              </div>
              <Progress 
                value={analytics.activeCards > 0 ? (analytics.activeCards / (analytics.activeCards + analytics.frozenCards + analytics.expiredCards)) * 100 : 0} 
                className="h-2" 
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">Frozen</span>
                  <Badge variant="outline" className="text-yellow-600 bg-yellow-50">
                    {analytics.frozenCards}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  {analytics.frozenCards > 0 ? Math.round((analytics.frozenCards / (analytics.activeCards + analytics.frozenCards + analytics.expiredCards)) * 100) : 0}%
                </span>
              </div>
              <Progress 
                value={analytics.frozenCards > 0 ? (analytics.frozenCards / (analytics.activeCards + analytics.frozenCards + analytics.expiredCards)) * 100 : 0} 
                className="h-2" 
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">Expired</span>
                  <Badge variant="outline" className="text-red-600 bg-red-50">
                    {analytics.expiredCards}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  {analytics.expiredCards > 0 ? Math.round((analytics.expiredCards / (analytics.activeCards + analytics.frozenCards + analytics.expiredCards)) * 100) : 0}%
                </span>
              </div>
              <Progress 
                value={analytics.expiredCards > 0 ? (analytics.expiredCards / (analytics.activeCards + analytics.frozenCards + analytics.expiredCards)) * 100 : 0} 
                className="h-2" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Credit Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              Credit Utilization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Utilization</span>
                <Badge variant="outline" className={getUtilizationColor(analytics.utilizationRate)}>
                  {analytics.utilizationRate.toFixed(1)}%
                </Badge>
              </div>
              <Progress value={Math.min(analytics.utilizationRate, 100)} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {analytics.utilizationRate >= 90 ? "Very high utilization - consider paying down balances" : 
                 analytics.utilizationRate >= 70 ? "High utilization - monitor closely" : 
                 "Good utilization rate"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Total Limit</span>
                </div>
                <span className="font-bold text-lg">₺{(analytics.totalCreditLimit / 1000).toFixed(1)}K</span>
                <p className="text-xs text-muted-foreground">credit limit</p>
              </div>
              
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Available</span>
                </div>
                <span className="font-bold text-lg">₺{(analytics.totalAvailableCredit / 1000).toFixed(1)}K</span>
                <p className="text-xs text-muted-foreground">credit left</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts */}
      {(analytics.securityAlerts.cardsWithoutPin.length > 0 || 
        analytics.securityAlerts.cardsWithout2FA.length > 0 || 
        analytics.securityAlerts.cardsWithHighUsage.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              Security Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics.securityAlerts.cardsWithoutPin.length > 0 && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-800">
                  {analytics.securityAlerts.cardsWithoutPin.length} cards without PIN protection
                </span>
              </div>
            )}

            {analytics.securityAlerts.cardsWithout2FA.length > 0 && (
              <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">
                  {analytics.securityAlerts.cardsWithout2FA.length} cards without 2FA
                </span>
              </div>
            )}

            {analytics.securityAlerts.cardsWithHighUsage.length > 0 && (
              <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <Zap className="h-4 w-4 text-orange-600" />
                <span className="text-sm text-orange-800">
                  {analytics.securityAlerts.cardsWithHighUsage.length} cards with high usage
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Upcoming Expiries */}
      {analytics.upcomingExpiries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              Upcoming Expiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.upcomingExpiries.map((card) => (
                <div key={card.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{card.name}</p>
                    <p className="text-sm text-muted-foreground">
                      •••• {card.lastFour} • Expires {card.expiryDate}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-orange-600 bg-orange-50">
                    Soon
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Spending Card */}
      {analytics.highestSpendingCard && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Top Spending Card
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium">{analytics.highestSpendingCard.name}</p>
                <p className="text-sm text-muted-foreground">
                  {analytics.highestSpendingCard.type} • •••• {analytics.highestSpendingCard.lastFour}
                </p>
                {analytics.highestSpendingCard.rewards && (
                  <Badge variant="outline" className={getRewardsTierColor(analytics.highestSpendingCard.rewards.tier)}>
                    {analytics.highestSpendingCard.rewards.tier}
                  </Badge>
                )}
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">₺{analytics.highestSpendingCard.monthlySpending.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">monthly</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
