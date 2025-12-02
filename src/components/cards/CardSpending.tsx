"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Calendar, 
  DollarSign, 
  ShoppingCart,
  Coffee,
  Car,
  Home,
  Utensils,
  Plane,
  Download,
  Filter
} from "lucide-react"
import { Card as CardType } from "@/hooks/useCards"
import { useState } from "react"

interface CardSpendingProps {
  cards: CardType[]
  period?: "week" | "month" | "quarter" | "year"
}

interface Transaction {
  id: string
  cardId: string
  amount: number
  category: string
  merchant: string
  date: string
  description: string
  isRecurring: boolean
}

interface SpendingCategory {
  name: string
  icon: any
  amount: number
  percentage: number
  trend: "up" | "down" | "stable"
  transactionCount: number
}

export function CardSpending({ cards, period = "month" }: CardSpendingProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "quarter" | "year">("month")
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  // Generate mock transaction data
  const generateTransactions = (card: CardType): Transaction[] => {
    const categories = [
      { name: "Dining", icon: Utensils, weight: 0.25 },
      { name: "Shopping", icon: ShoppingCart, weight: 0.30 },
      { name: "Transport", icon: Car, weight: 0.15 },
      { name: "Home", icon: Home, weight: 0.20 },
      { name: "Travel", icon: Plane, weight: 0.10 }
    ]

    const merchants = {
      "Dining": ["Starbucks", "McDonald's", "Local Restaurant", "Pizza Place", "Coffee Shop"],
      "Shopping": ["Amazon", "Walmart", "Target", "Best Buy", "Apple Store"],
      "Transport": ["Uber", "Gas Station", "Public Transit", "Parking", "Car Wash"],
      "Home": ["Home Depot", "IKEA", "Grocery Store", "Utility Bill", "Internet"],
      "Travel": ["Airline", "Hotel", "Rental Car", "Travel Agency", "Restaurant"]
    }

    const days = selectedPeriod === "week" ? 7 : selectedPeriod === "month" ? 30 : selectedPeriod === "quarter" ? 90 : 365
    const transactionCount = Math.floor(days / 3) // Average 1 transaction per 3 days

    return Array.from({ length: transactionCount }, (_, index) => {
      const category = categories[Math.floor(Math.random() * categories.length)]
      const merchantList = merchants[category.name as keyof typeof merchants]
      const merchant = merchantList[Math.floor(Math.random() * merchantList.length)]
      
      const daysAgo = Math.floor(Math.random() * days)
      const date = new Date()
      date.setDate(date.getDate() - daysAgo)

      return {
        id: `${card.id}-${index}`,
        cardId: card.id,
        amount: Math.round((Math.random() * 200 + 10) * 100) / 100,
        category: category.name,
        merchant,
        date: date.toISOString().split('T')[0],
        description: `Purchase at ${merchant}`,
        isRecurring: Math.random() > 0.8
      }
    })
  }

  const allTransactions = cards.flatMap(card => generateTransactions(card))
  const filteredTransactions = selectedCard 
    ? allTransactions.filter(t => t.cardId === selectedCard)
    : allTransactions

  // Calculate spending by category
  const spendingByCategory: SpendingCategory[] = [
    "Dining", "Shopping", "Transport", "Home", "Travel"
  ].map(category => {
    const categoryTransactions = filteredTransactions.filter(t => t.category === category)
    const amount = categoryTransactions.reduce((sum, t) => sum + t.amount, 0)
    const percentage = filteredTransactions.length > 0 ? (amount / filteredTransactions.reduce((sum, t) => sum + t.amount, 0)) * 100 : 0
    
    // Calculate trend (mock data)
    const randomValue = Math.random()
    let trend: "up" | "down" | "stable"
    if (randomValue > 0.66) {
      trend = "up"
    } else if (randomValue > 0.33) {
      trend = "down"
    } else {
      trend = "stable"
    }

    return {
      name: category,
      icon: category === "Dining" ? Utensils : 
             category === "Shopping" ? ShoppingCart :
             category === "Transport" ? Car :
             category === "Home" ? Home : Plane,
      amount,
      percentage,
      trend,
      transactionCount: categoryTransactions.length
    }
  }).sort((a, b) => b.amount - a.amount)

  const totalSpending = filteredTransactions.reduce((sum, t) => sum + t.amount, 0)
  const averageTransaction = filteredTransactions.length > 0 ? totalSpending / filteredTransactions.length : 0

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-3 w-3 text-green-600" />
      case "down": return <TrendingDown className="h-3 w-3 text-red-600" />
      default: return <div className="h-3 w-3 bg-gray-400 rounded-full" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-green-600"
      case "down": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case "week": return "This Week"
      case "month": return "This Month"
      case "quarter": return "This Quarter"
      case "year": return "This Year"
      default: return "This Month"
    }
  }

  return (
    <div className="space-y-6">
      {/* Spending Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full -mr-12 -mt-12"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-blue-500 rounded-xl shadow-lg shadow-blue-500/30">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="text-blue-600 bg-blue-50">
                {getPeriodLabel(selectedPeriod)}
              </Badge>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Total Spending</p>
            <p className="text-2xl font-bold tracking-tight text-blue-800">
              ₺{totalSpending.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredTransactions.length} transactions
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full -mr-12 -mt-12"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-green-500 rounded-xl shadow-lg shadow-green-500/30">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="text-green-600 bg-green-50">
                Average
              </Badge>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Avg Transaction</p>
            <p className="text-2xl font-bold tracking-tight text-green-800">
              ₺{averageTransaction.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Per transaction
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full -mr-12 -mt-12"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-purple-500 rounded-xl shadow-lg shadow-purple-500/30">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="text-purple-600 bg-purple-50">
                Daily
              </Badge>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Daily Average</p>
            <p className="text-2xl font-bold tracking-tight text-purple-800">
              ₺{(totalSpending / (selectedPeriod === "week" ? 7 : selectedPeriod === "month" ? 30 : selectedPeriod === "quarter" ? 90 : 365)).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Per day
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full -mr-12 -mt-12"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/30">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="text-orange-600 bg-orange-50">
                Top Category
              </Badge>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Highest Spending</p>
            <p className="text-2xl font-bold tracking-tight text-orange-800 truncate">
              {spendingByCategory[0]?.name || "N/A"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              ₺{spendingByCategory[0]?.amount.toFixed(0) || "0"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Period Selection and Card Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {(["week", "month", "quarter", "year"] as const).map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period === "week" ? "Week" : period === "month" ? "Month" : period === "quarter" ? "Quarter" : "Year"}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant={selectedCard === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCard(null)}
          >
            All Cards
          </Button>
          {cards.map((card) => (
            <Button
              key={card.id}
              variant={selectedCard === card.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCard(card.id)}
            >
              {card.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Spending by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Spending by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {spendingByCategory.map((category) => {
              const CategoryIcon = category.icon
              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CategoryIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({category.transactionCount} transactions)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">₺{category.amount.toFixed(2)}</span>
                      {getTrendIcon(category.trend)}
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{category.percentage.toFixed(1)}% of total</span>
                    <span className={getTrendColor(category.trend)}>
                      {category.trend === "up" ? "Increasing" : 
                       category.trend === "down" ? "Decreasing" : "Stable"}
                    </span>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-500" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredTransactions
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 8)
              .map((transaction) => {
                const card = cards.find(c => c.id === transaction.cardId)
                const CategoryIcon = spendingByCategory.find(c => c.name === transaction.category)?.icon || ShoppingCart
                
                return (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{transaction.merchant}</p>
                        <p className="text-xs text-muted-foreground">
                          {card?.name} • {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₺{transaction.amount.toFixed(2)}</p>
                      {transaction.isRecurring && (
                        <Badge variant="outline" className="text-xs">Recurring</Badge>
                      )}
                    </div>
                  </div>
                )
              })}
          </CardContent>
        </Card>
      </div>

      {/* Spending Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-purple-500" />
            Spending Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Top Merchant</h4>
              <p className="text-lg font-bold text-blue-900">
                {filteredTransactions.length > 0 
                  ? Object.entries(
                      filteredTransactions.reduce((acc, t) => {
                        acc[t.merchant] = (acc[t.merchant] || 0) + t.amount
                        return acc
                      }, {} as Record<string, number>)
                    ).sort(([,a], [,b]) => b - a)[0]?.[0] || "N/A"
                  : "N/A"
                }
              </p>
              <p className="text-sm text-blue-700">
                Most frequently visited
              </p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Largest Transaction</h4>
              <p className="text-lg font-bold text-green-900">
                ₺{filteredTransactions.length > 0 
                  ? Math.max(...filteredTransactions.map(t => t.amount)).toFixed(2)
                  : "0.00"
                }
              </p>
              <p className="text-sm text-green-700">
                Single highest expense
              </p>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">Recurring Payments</h4>
              <p className="text-lg font-bold text-purple-900">
                {filteredTransactions.filter(t => t.isRecurring).length}
              </p>
              <p className="text-sm text-purple-700">
                Automated expenses
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <div className="flex justify-end">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Spending Report
        </Button>
      </div>
    </div>
  )
}
