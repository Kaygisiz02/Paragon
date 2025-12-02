"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Calendar, 
  CreditCard, 
  Download, 
  Eye, 
  EyeOff, 
  Globe, 
  Key, 
  Settings, 
  Shield, 
  Smartphone, 
  TrendingDown, 
  TrendingUp, 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle, 
  ArrowLeft 
} from "lucide-react"
import { useCards, Card as CardType } from "@/hooks/useCards"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { 
  TransactionAnalytics, 
  TransactionFilters, 
  TransactionChart, 
  TransactionExport,
  Transaction,
  type TransactionFilters as TTransactionFilters
} from "@/components/transactions"

export default function CardDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { cards } = useCards()
  const [card, setCard] = useState<CardType | null>(null)
  const [showCardNumber, setShowCardNumber] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "quarter" | "year">("month")
  const [transactionFilter, setTransactionFilter] = useState<"all" | "income" | "expense">("all")
  const [activeFilters, setActiveFilters] = useState<TTransactionFilters>({
    search: "",
    categories: [],
    dateRange: { start: "", end: "" },
    amountRange: { min: 0, max: 10000 },
    status: []
  })

  // Mock transaction data - real app'de API'den gelecek
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", merchant: "Starbucks Coffee", amount: -45.50, date: "2025-12-01", category: "Food & Dining", status: "completed", type: "expense", description: "Morning coffee" },
    { id: "2", merchant: "Amazon Purchase", amount: -234.99, date: "2025-11-30", category: "Shopping", status: "completed", type: "expense", description: "Electronics order" },
    { id: "3", merchant: "Salary Deposit", amount: 3500.00, date: "2025-11-29", category: "Income", status: "completed", type: "income", description: "Monthly salary" },
    { id: "4", merchant: "Netflix Subscription", amount: -15.99, date: "2025-11-28", category: "Entertainment", status: "completed", type: "expense", description: "Monthly subscription" },
    { id: "5", merchant: "Gas Station", amount: -65.00, date: "2025-11-27", category: "Transportation", status: "pending", type: "expense", description: "Fuel purchase" },
    { id: "6", merchant: "Restaurant", amount: -120.00, date: "2025-11-26", category: "Food & Dining", status: "completed", type: "expense", description: "Dinner with friends" },
    { id: "7", merchant: "Freelance Project", amount: 850.00, date: "2025-11-25", category: "Income", status: "completed", type: "income", description: "Web design project" },
    { id: "8", merchant: "Grocery Store", amount: -156.78, date: "2025-11-24", category: "Groceries", status: "completed", type: "expense", description: "Weekly shopping" },
  ])
  
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions)

  // Calculate totals
  const totalIncome = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const netAmount = totalIncome - totalExpense

  useEffect(() => {
    // Kartlar yüklendiğinde ve cardId varsa kontrol et
    if (cards.length > 0 && params.cardId) {
      const cardId = params.cardId as string
      console.log("Card ID from params:", cardId)
      console.log("Available cards:", cards.map(c => ({ id: c.id, name: c.name })))
      
      const foundCard = cards.find(c => c.id === cardId)
      console.log("Found card:", foundCard)
      
      if (foundCard) {
        setCard(foundCard)
      } else {
        console.log("Card not found, redirecting to /cards")
        router.push("/cards")
      }
    }
  }, [params.cardId, cards, router])

  // Apply filters to transactions
  useEffect(() => {
    let filtered = transactions.filter(t => {
      if (transactionFilter === "all") return true
      return t.type === transactionFilter
    })

    // Apply advanced filters
    if (activeFilters.search) {
      filtered = filtered.filter(t => 
        t.merchant.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
        (t.description && t.description.toLowerCase().includes(activeFilters.search.toLowerCase()))
      )
    }

    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter(t => activeFilters.categories.includes(t.category))
    }

    if (activeFilters.status.length > 0) {
      filtered = filtered.filter(t => activeFilters.status.includes(t.status))
    }

    if (activeFilters.dateRange.start) {
      filtered = filtered.filter(t => new Date(t.date) >= new Date(activeFilters.dateRange.start))
    }

    if (activeFilters.dateRange.end) {
      filtered = filtered.filter(t => new Date(t.date) <= new Date(activeFilters.dateRange.end))
    }

    if (activeFilters.amountRange.min > 0 || activeFilters.amountRange.max < 10000) {
      filtered = filtered.filter(t => {
        const amount = Math.abs(t.amount)
        return amount >= activeFilters.amountRange.min && amount <= activeFilters.amountRange.max
      })
    }

    setFilteredTransactions(filtered)
  }, [transactions, transactionFilter, activeFilters])

  const handleFilterChange = (filters: TTransactionFilters) => {
    setActiveFilters(filters)
  }

  if (!card || cards.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-muted-foreground">Loading card details...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500"
      case "frozen": return "bg-blue-500"
      case "expired": return "bg-red-500"
      case "blocked": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.back()}
                className="gap-2 hover:bg-muted border-2 hover:border-primary/50 transition-all duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Cards</span>
                <span className="sm:hidden">Back</span>
              </Button>
              {/* Tooltip */}
              <div className="absolute left-0 top-full mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Return to all cards
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{card.name}</h1>
              <p className="text-muted-foreground">Card Details & Transactions</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 transform transition-all duration-300 hover:scale-105 hover:shadow-md">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-2 transform transition-all duration-300 hover:scale-105 hover:shadow-md">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Card Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card Visual */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Card Information</h3>
              
              {/* Modern Card Design */}
              <div className={`relative w-full aspect-[1.586] bg-gradient-to-br ${card.backgroundColor} rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl cursor-pointer`}>
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse delay-75"></div>
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-white text-xl tracking-wide">Paragon</p>
                    <div className="w-10 h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-sm shadow-lg"></div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${getStatusColor(card.status)} text-white shadow-lg`}>
                    {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                  </div>
                </div>
                
                <div className="text-white relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-white/60 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                  <p className="font-mono text-xl tracking-widest font-light">
                    {showCardNumber ? card.cardNumber : `**** **** **** ${card.lastFour}`}
                  </p>
                  <div className="flex justify-between text-sm mt-4">
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wider">Card Holder</p>
                      <p className="text-white/90 font-medium">{card.cardHolder}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-xs uppercase tracking-wider">Expires</p>
                      <p className="text-white/90 font-medium">{card.expiryDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCardNumber(!showCardNumber)}
                  className="w-full gap-2"
                >
                  {showCardNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showCardNumber ? "Hide" : "Show"} Card Number
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Shield className="h-4 w-4" />
                    Security
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Settings className="h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <ArrowDownLeft className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Total Income</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">+₺{totalIncome.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">This {selectedPeriod}</p>
                </CardContent>
              </Card>

              <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                      <ArrowUpRight className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Total Expense</span>
                  </div>
                  <p className="text-2xl font-bold text-red-600">-₺{totalExpense.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">This {selectedPeriod}</p>
                </CardContent>
              </Card>

              <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`h-8 w-8 ${netAmount >= 0 ? 'bg-green-100' : 'bg-red-100'} rounded-full flex items-center justify-center`}>
                      {netAmount >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Net Amount</span>
                  </div>
                  <p className={`text-2xl font-bold ${netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {netAmount >= 0 ? '+' : ''}₺{netAmount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">This {selectedPeriod}</p>
                </CardContent>
              </Card>
            </div>

            {/* Card Details */}
            <Card>
              <CardHeader>
                <CardTitle>Card Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Card Type</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="capitalize">
                        {card.type}
                      </Badge>
                      <span className="text-sm font-medium capitalize">{card.type}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Issuer</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="capitalize">
                        {card.issuer}
                      </Badge>
                      <span className="text-sm font-medium capitalize">{card.issuer}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Four</p>
                    <p className="font-mono text-sm font-medium">•••• {card.lastFour}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="text-sm font-medium">
                      {new Date(card.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Balance</p>
                    <p className="font-medium">₺{card.balance.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Spending</p>
                    <p className="font-medium">₺{card.monthlySpending.toLocaleString()}</p>
                  </div>
                  {card.creditLimit && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Credit Limit</p>
                        <p className="font-medium">₺{card.creditLimit.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Available Credit</p>
                        <p className="font-medium">₺{card.availableCredit?.toLocaleString()}</p>
                      </div>
                    </>
                  )}
                  {card.rewards && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Rewards Points</p>
                        <p className="font-medium">{card.rewards.points.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cashback</p>
                        <p className="font-medium">₺{card.rewards.cashback.toLocaleString()}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Security Status */}
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Security Status</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">PIN</span>
                      </div>
                      {card.security?.hasPin ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">2FA</span>
                      </div>
                      {card.security?.has2FA ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Fraud</span>
                      </div>
                      {card.security?.fraudAlerts ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                      )}
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Intl</span>
                      </div>
                      {card.security?.internationalUsage ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transaction Filters */}
        <TransactionFilters 
          transactions={transactions}
          onFilterChange={handleFilterChange}
        />

        {/* Transaction Chart */}
        <TransactionChart 
          transactions={filteredTransactions}
          period={selectedPeriod}
        />

        {/* Transaction Analytics */}
        <TransactionAnalytics
          transactions={filteredTransactions}
          selectedPeriod={selectedPeriod}
          transactionFilter={transactionFilter}
          onPeriodChange={setSelectedPeriod}
          onFilterChange={setTransactionFilter}
        />

        {/* Transaction Export */}
        <TransactionExport 
          transactions={filteredTransactions}
          filters={activeFilters}
        />
      </div>
    </DashboardLayout>
  )
}
