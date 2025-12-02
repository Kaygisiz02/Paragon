"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Gift, 
  TrendingUp, 
  Star, 
  Trophy, 
  Zap, 
  Target,
  CreditCard,
  DollarSign,
  Calendar,
  ShoppingBag,
  Plane,
  Coffee,
  Home
} from "lucide-react"
import { Card as CardType } from "@/hooks/useCards"

interface CardRewardsProps {
  cards: CardType[]
  onRedeemPoints?: (cardId: string, points: number) => void
  onViewRewards?: (cardId: string) => void
}

interface RewardCategory {
  name: string
  icon: any
  multiplier: number
  description: string
}

export function CardRewards({ cards, onRedeemPoints, onViewRewards }: CardRewardsProps) {
  const rewardCards = cards.filter(card => card.rewards)
  const totalPoints = rewardCards.reduce((sum, card) => sum + (card.rewards?.points || 0), 0)
  const totalCashback = rewardCards.reduce((sum, card) => sum + (card.rewards?.cashback || 0), 0)

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum": return "text-purple-600 bg-purple-50 border-purple-200"
      case "gold": return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "silver": return "text-gray-600 bg-gray-50 border-gray-200"
      default: return "text-orange-600 bg-orange-50 border-orange-200"
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "platinum": return Trophy
      case "gold": return Star
      case "silver": return Target
      default: return Gift
    }
  }

  const getTierProgress = (tier: string, points: number) => {
    const tierThresholds = {
      bronze: { min: 0, max: 5000 },
      silver: { min: 5000, max: 15000 },
      gold: { min: 15000, max: 50000 },
      platinum: { min: 50000, max: Infinity }
    }

    const threshold = tierThresholds[tier as keyof typeof tierThresholds]
    if (tier === "platinum") return 100
    
    const progress = ((points - threshold.min) / (threshold.max - threshold.min)) * 100
    return Math.min(Math.max(progress, 0), 100)
  }

  const getNextTier = (currentTier: string) => {
    const tierOrder = ["bronze", "silver", "gold", "platinum"]
    const currentIndex = tierOrder.indexOf(currentTier)
    return currentIndex < tierOrder.length - 1 ? tierOrder[currentIndex + 1] : null
  }

  const getPointsToNextTier = (tier: string, points: number) => {
    const tierThresholds = {
      bronze: 5000,
      silver: 15000,
      gold: 50000,
      platinum: Infinity
    }

    const nextTier = getNextTier(tier)
    if (!nextTier) return 0
    
    return Math.max(0, tierThresholds[nextTier as keyof typeof tierThresholds] - points)
  }

  const rewardCategories: RewardCategory[] = [
    { name: "Dining", icon: Coffee, multiplier: 3, description: "3x points on restaurants" },
    { name: "Travel", icon: Plane, multiplier: 5, description: "5x points on flights & hotels" },
    { name: "Shopping", icon: ShoppingBag, multiplier: 2, description: "2x points on retail" },
    { name: "Home", icon: Home, multiplier: 1.5, description: "1.5x points on home improvement" }
  ]

  const getMonthlyPoints = (card: CardType) => {
    // Simulate monthly points based on spending
    return Math.round(card.monthlySpending * 1.2) // 1.2 points per ₺1
  }

  return (
    <div className="space-y-6">
      {/* Rewards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full -mr-12 -mt-12"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-purple-500 rounded-xl shadow-lg shadow-purple-500/30">
                <Star className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="text-purple-600 bg-purple-50">
                Points
              </Badge>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Total Points</p>
            <p className="text-2xl font-bold tracking-tight text-purple-800">
              {totalPoints.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Across {rewardCards.length} reward cards
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full -mr-12 -mt-12"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-green-500 rounded-xl shadow-lg shadow-green-500/30">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="text-green-600 bg-green-50">
                Cashback
              </Badge>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Total Cashback</p>
            <p className="text-2xl font-bold tracking-tight text-green-800">
              ₺{totalCashback.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Available to redeem
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full -mr-12 -mt-12"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/30">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="text-orange-600 bg-orange-50">
                Monthly
              </Badge>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Monthly Points</p>
            <p className="text-2xl font-bold tracking-tight text-orange-800">
              {rewardCards.reduce((sum, card) => sum + getMonthlyPoints(card), 0).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Estimated this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reward Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Reward Cards
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewardCards.map((card) => {
            const TierIcon = getTierIcon(card.rewards!.tier)
            const nextTier = getNextTier(card.rewards!.tier)
            const pointsToNext = getPointsToNextTier(card.rewards!.tier, card.rewards!.points)
            const monthlyPoints = getMonthlyPoints(card)
            
            return (
              <Card key={card.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{card.name}</h4>
                      <p className="text-sm text-muted-foreground">•••• {card.lastFour}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <TierIcon className="h-4 w-4" />
                      <Badge variant="outline" className={getTierColor(card.rewards!.tier)}>
                        {card.rewards!.tier}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Points and Cashback */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-purple-500" />
                        <span className="text-xs text-muted-foreground">Points</span>
                      </div>
                      <span className="font-bold text-lg">{card.rewards!.points.toLocaleString()}</span>
                      <p className="text-xs text-muted-foreground">available</p>
                    </div>
                    
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-muted-foreground">Cashback</span>
                      </div>
                      <span className="font-bold text-lg">₺{card.rewards!.cashback.toFixed(0)}</span>
                      <p className="text-xs text-muted-foreground">earned</p>
                    </div>
                  </div>

                  {/* Tier Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Tier Progress</span>
                      <span className="text-xs text-muted-foreground">
                        {card.rewards!.tier} → {nextTier || "Max"}
                      </span>
                    </div>
                    <Progress value={getTierProgress(card.rewards!.tier, card.rewards!.points)} className="h-2" />
                    {nextTier && (
                      <p className="text-xs text-muted-foreground">
                        {pointsToNext.toLocaleString()} points to {nextTier}
                      </p>
                    )}
                  </div>

                  {/* Monthly Earnings */}
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Monthly Earnings</span>
                    </div>
                    <span className="font-bold text-blue-800">
                      +{monthlyPoints.toLocaleString()} pts
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewRewards?.(card.id)}
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onRedeemPoints?.(card.id, 1000)}
                      className="flex-1"
                    >
                      Redeem
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Reward Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Reward Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewardCategories.map((category) => {
              const CategoryIcon = category.icon
              return (
                <div key={category.name} className="text-center p-4 bg-muted rounded-lg">
                  <CategoryIcon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-medium mb-1">{category.name}</h4>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {category.multiplier}x
                  </div>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Redemption Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-green-500" />
            Redemption Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <h4 className="font-medium">Cash Back</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Convert points to cash</p>
              <p className="text-xs text-green-600">100 pts = ₺1.00</p>
            </div>

            <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Plane className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium">Travel</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Book flights and hotels</p>
              <p className="text-xs text-blue-600">100 pts = ₺1.50</p>
            </div>

            <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <ShoppingBag className="h-5 w-5 text-purple-600" />
                <h4 className="font-medium">Gift Cards</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Redeem for gift cards</p>
              <p className="text-xs text-purple-600">100 pts = ₺1.25</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
