"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Plus,
  Search,
  Filter,
  CreditCard,
  BarChart3,
  Shield,
  Gift,
  TrendingUp,
  Eye,
  EyeOff,
  Smartphone,
  Wifi,
  MoreVertical,
  X,
  Key,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Globe,
  ArrowDownLeft,
  ArrowUpRight,
  Settings,
  Trash2
} from "lucide-react"
import { useCards, Card as CardType } from "@/hooks/useCards"
import { CardAnalytics } from "@/components/cards/CardAnalytics"
import { CardSecurity } from "@/components/cards/CardSecurity"
import { CardRewards } from "@/components/cards/CardRewards"
import { CardSpending } from "@/components/cards/CardSpending"
import { AddCardModal } from "@/components/cards/AddCardModal"

export default function CardsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "frozen" | "expired" | "blocked">("all")
  const [filterType, setFilterType] = useState<"all" | "debit" | "credit" | "prepaid">("all")
  const [showCardNumbers, setShowCardNumbers] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "security" | "rewards" | "spending">("overview")
  
  const { 
    cards, 
    analytics, 
    loading, 
    addCard, 
    updateCard, 
    deleteCard,
    toggleCardStatus,
    getCardsByType,
    getCardsByStatus
  } = useCards()

  // Filter cards based on search and filters
  const filteredCards = cards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.cardHolder.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.lastFour.includes(searchTerm)
    const matchesStatus = filterStatus === "all" || card.status === filterStatus
    const matchesType = filterType === "all" || card.type === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  const handleAddCard = (cardData: any) => {
    addCard(cardData)
  }

  const handleEditCard = (card: CardType) => {
    console.log("Edit card:", card)
    // Implement edit functionality
  }

  const handleDeleteCard = (cardId: string) => {
    deleteCard(cardId)
  }

  const handleViewCard = (card: CardType) => {
    console.log("Clicked card:", card.id, card.name)
    router.push(`/cards/${card.id}`)
  }

  const handleTogglePin = (cardId: string) => {
    const card = cards.find(c => c.id === cardId)
    if (card) {
      updateCard(cardId, {
        security: {
          ...card.security,
          hasPin: !card.security.hasPin
        }
      })
    }
  }

  const handleToggle2FA = (cardId: string) => {
    const card = cards.find(c => c.id === cardId)
    if (card) {
      updateCard(cardId, {
        security: {
          ...card.security,
          has2FA: !card.security.has2FA
        }
      })
    }
  }

  const handleToggleFraudAlerts = (cardId: string) => {
    const card = cards.find(c => c.id === cardId)
    if (card) {
      updateCard(cardId, {
        security: {
          ...card.security,
          fraudAlerts: !card.security.fraudAlerts
        }
      })
    }
  }

  const handleToggleInternationalUsage = (cardId: string) => {
    const card = cards.find(c => c.id === cardId)
    if (card) {
      updateCard(cardId, {
        security: {
          ...card.security,
          internationalUsage: !card.security.internationalUsage
        }
      })
    }
  }

  const handleRedeemPoints = (cardId: string, points: number) => {
    console.log("Redeem points:", cardId, points)
    // Implement redemption logic
  }

  const handleViewRewards = (cardId: string) => {
    console.log("View rewards:", cardId)
    // Implement rewards view
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500"
      case "frozen": return "bg-yellow-500"
      case "expired": return "bg-red-500"
      case "blocked": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  const getIssuerIcon = (issuer: string) => {
    switch (issuer) {
      case "visa": return "💳"
      case "mastercard": return "💳"
      case "amex": return "💳"
      case "discover": return "💳"
      default: return "💳"
    }
  }

  if (loading) {
    return (
      <DashboardLayout 
        title="Cards" 
        subtitle="Manage your payment cards and financial instruments"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cards loading...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: CreditCard },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "security", label: "Security", icon: Shield },
    { id: "rewards", label: "Rewards", icon: Gift },
    { id: "spending", label: "Spending", icon: TrendingUp }
  ]

  return (
    <DashboardLayout 
      title="Cards" 
      subtitle="Manage your payment cards and financial instruments"
    >
      <div className="space-y-8">
        {/* Header Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="frozen">Frozen</option>
              <option value="expired">Expired</option>
              <option value="blocked">Blocked</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Types</option>
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
              <option value="prepaid">Prepaid</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCardNumbers(!showCardNumbers)}
            >
              {showCardNumbers ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
              {showCardNumbers ? "Hide" : "Show"} Numbers
            </Button>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Card
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Stats */}
            {analytics && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Total Balance</span>
                    <CreditCard className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">₺{analytics.totalBalance.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Across {cards.length} cards</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Available Credit</span>
                    <BarChart3 className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">₺{analytics.totalAvailableCredit.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">₺{analytics.totalCreditLimit.toLocaleString()} limit</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Monthly Spending</span>
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                  </div>
                  <p className="text-2xl font-bold text-orange-600">₺{analytics.monthlySpending.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Rewards Points</span>
                    <Gift className="h-4 w-4 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{analytics.totalRewards.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Available points</p>
                </Card>
              </div>
            )}

            {/* Cards Grid */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Your Cards</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {filteredCards.length} of {cards.length} cards • {cards.filter(c => c.status === 'active').length} active
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCardNumbers(!showCardNumbers)}
                    className="gap-2"
                  >
                    {showCardNumbers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showCardNumbers ? "Hide" : "Show"} Numbers
                  </Button>
                  <Button onClick={() => setShowAddModal(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Card
                  </Button>
                </div>
              </div>
              
              {filteredCards.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredCards.map((card) => (
                    <div key={card.id} className="group">
                      <Card 
                        className="relative overflow-hidden cursor-pointer border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                        onClick={() => handleViewCard(card)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <CardContent className="p-6 relative z-10">
                          <div className="space-y-6">
                            {/* Modern Card Design */}
                            <div className={`relative w-full aspect-[1.586] bg-gradient-to-br ${card.backgroundColor} rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-105`}>
                              {/* Animated Background Elements */}
                              <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                              <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse delay-75"></div>
                              
                              {/* Card Header */}
                              <div className="flex justify-between items-start relative z-10">
                                <div className="flex flex-col gap-2">
                                  <p className="font-bold text-white text-xl tracking-wide">Paragon</p>
                                  <div className="w-10 h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-sm shadow-lg"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {card.isVirtual && (
                                    <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                                      <Smartphone className="h-3 w-3 text-white" />
                                    </div>
                                  )}
                                  {card.isContactless && (
                                    <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                                      <Wifi className="h-3 w-3 text-white" />
                                    </div>
                                  )}
                                  <div className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${getStatusColor(card.status)} text-white shadow-lg`}>
                                    {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Card Number */}
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
                                  {showCardNumbers ? card.cardNumber : `**** **** **** ${card.lastFour}`}
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

                            {/* Card Details */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-foreground">{card.name}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="secondary" className="text-xs">
                                      {card.type.charAt(0).toUpperCase() + card.type.slice(1)}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {card.issuer.toUpperCase()}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">•••• {card.lastFour}</span>
                                  </div>
                                </div>
                                
                                {/* Quick Actions */}
                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 hover:bg-muted"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      // Handle card action
                                    }}
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Balance Information */}
                              <div className="bg-muted/50 rounded-xl p-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Available Balance</p>
                                    <p className="text-2xl font-bold text-foreground">
                                      ₺{card.balance.toLocaleString()}
                                    </p>
                                    {card.type === "credit" && card.creditLimit && (
                                      <div className="mt-2">
                                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                          <span>Credit Used</span>
                                          <span>{Math.round((card.balance / card.creditLimit) * 100)}%</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-2">
                                          <div 
                                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${Math.min((card.balance / card.creditLimit) * 100, 100)}%` }}
                                          ></div>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                          of ₺{card.creditLimit.toLocaleString()}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Card Type Icon */}
                                  <div className="h-12 w-12 bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center">
                                    {card.issuer === "visa" && <div className="text-blue-600 font-bold text-sm">VISA</div>}
                                    {card.issuer === "mastercard" && <div className="text-red-600 font-bold text-xs">MC</div>}
                                    {card.issuer === "amex" && <div className="text-green-600 font-bold text-xs">AMEX</div>}
                                    {card.issuer === "discover" && <div className="text-orange-600 font-bold text-xs">DISC</div>}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto space-y-6">
                    {/* Empty State Illustration */}
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
                        <CreditCard className="h-16 w-16 text-blue-600" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Plus className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-foreground">
                        {searchTerm || filterStatus !== "all" || filterType !== "all" 
                          ? "No cards found" 
                          : "Start managing your finances"
                        }
                      </h3>
                      <p className="text-muted-foreground text-lg">
                        {searchTerm || filterStatus !== "all" || filterType !== "all" 
                          ? "Try adjusting your filters or search terms to find the cards you're looking for."
                          : "Add your first card to unlock powerful financial management features and insights."
                        }
                      </p>
                    </div>
                    
                    {!searchTerm && filterStatus === "all" && filterType === "all" && (
                      <div className="space-y-4">
                        <Button 
                          onClick={() => setShowAddModal(true)}
                          size="lg"
                          className="gap-2 px-8 py-3 text-base"
                        >
                          <Plus className="h-5 w-5" />
                          Add Your First Card
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          Supports Visa, Mastercard, American Express & Discover
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "analytics" && analytics && (
          <CardAnalytics analytics={analytics} />
        )}

        {activeTab === "security" && (
          <CardSecurity 
            cards={cards}
            onTogglePin={handleTogglePin}
            onToggle2FA={handleToggle2FA}
            onToggleFraudAlerts={handleToggleFraudAlerts}
            onToggleInternationalUsage={handleToggleInternationalUsage}
          />
        )}

        {activeTab === "rewards" && (
          <CardRewards 
            cards={cards}
            onRedeemPoints={handleRedeemPoints}
            onViewRewards={handleViewRewards}
          />
        )}

        {activeTab === "spending" && (
          <CardSpending cards={cards} />
        )}

        {/* Add Card Modal */}
        <AddCardModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddCard={handleAddCard}
        />
      </div>
    </DashboardLayout>
  )
}
