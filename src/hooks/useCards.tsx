"use client"

import { useState, useEffect } from "react"

export interface Card {
  id: string
  name: string
  type: "debit" | "credit" | "prepaid"
  cardNumber: string
  lastFour: string
  expiryDate: string
  cvv: string
  cardHolder: string
  balance: number
  availableCredit?: number
  creditLimit?: number
  status: "active" | "frozen" | "expired" | "blocked"
  issuer: "visa" | "mastercard" | "amex" | "discover"
  backgroundColor: string
  textColor: string
  isVirtual: boolean
  isContactless: boolean
  createdAt: string
  updatedAt: string
  lastUsed?: string
  spendingLimit?: number
  monthlySpending: number
  rewards?: {
    points: number
    cashback: number
    tier: "bronze" | "silver" | "gold" | "platinum"
  }
  security: {
    hasPin: boolean
    has2FA: boolean
    fraudAlerts: boolean
    internationalUsage: boolean
  }
}

export interface CardAnalytics {
  totalBalance: number
  totalAvailableCredit: number
  totalCreditLimit: number
  utilizationRate: number
  monthlySpending: number
  totalRewards: number
  activeCards: number
  frozenCards: number
  expiredCards: number
  averageBalance: number
  highestSpendingCard: Card | null
  upcomingExpiries: Card[]
  securityAlerts: {
    cardsWithoutPin: Card[]
    cardsWithout2FA: Card[]
    cardsWithHighUsage: Card[]
  }
}

export function useCards() {
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<CardAnalytics | null>(null)

  useEffect(() => {
    // Simüle edilmiş veri çekimi
    const mockCards: Card[] = [
      {
        id: "1",
        name: "Primary Checking",
        type: "debit",
        cardNumber: "4532 1234 5678 1234",
        lastFour: "1234",
        expiryDate: "12/26",
        cvv: "123",
        cardHolder: "JOHN DOE",
        balance: 2450.11,
        status: "active",
        issuer: "visa",
        backgroundColor: "from-blue-600 to-blue-800",
        textColor: "text-white",
        isVirtual: false,
        isContactless: true,
        createdAt: "2023-01-15T00:00:00Z",
        updatedAt: "2025-12-01T15:30:00Z",
        lastUsed: "2025-12-01T14:20:00Z",
        monthlySpending: 1250.00,
        security: {
          hasPin: true,
          has2FA: true,
          fraudAlerts: true,
          internationalUsage: true
        }
      },
      {
        id: "2",
        name: "Travel Rewards",
        type: "credit",
        cardNumber: "5212 3456 7890 5678",
        lastFour: "5678",
        expiryDate: "09/25",
        cvv: "456",
        cardHolder: "JOHN DOE",
        balance: 8912.50,
        availableCredit: 1087.50,
        creditLimit: 10000.00,
        status: "active",
        issuer: "mastercard",
        backgroundColor: "from-purple-600 to-purple-800",
        textColor: "text-white",
        isVirtual: false,
        isContactless: true,
        createdAt: "2023-03-20T00:00:00Z",
        updatedAt: "2025-12-01T12:15:00Z",
        lastUsed: "2025-11-30T18:45:00Z",
        monthlySpending: 3200.00,
        spendingLimit: 5000.00,
        rewards: {
          points: 15420,
          cashback: 245.80,
          tier: "gold"
        },
        security: {
          hasPin: true,
          has2FA: true,
          fraudAlerts: true,
          internationalUsage: true
        }
      },
      {
        id: "3",
        name: "Business Platinum",
        type: "credit",
        cardNumber: "3782 8901 2345 9012",
        lastFour: "9012",
        expiryDate: "03/24",
        cvv: "789",
        cardHolder: "JOHN DOE",
        balance: 15680.00,
        availableCredit: 4320.00,
        creditLimit: 20000.00,
        status: "frozen",
        issuer: "amex",
        backgroundColor: "from-gray-600 to-gray-800",
        textColor: "text-white",
        isVirtual: false,
        isContactless: true,
        createdAt: "2022-06-10T00:00:00Z",
        updatedAt: "2025-11-15T09:30:00Z",
        lastUsed: "2025-11-10T16:20:00Z",
        monthlySpending: 8900.00,
        spendingLimit: 10000.00,
        rewards: {
          points: 45680,
          cashback: 680.50,
          tier: "platinum"
        },
        security: {
          hasPin: true,
          has2FA: false,
          fraudAlerts: true,
          internationalUsage: false
        }
      },
      {
        id: "4",
        name: "Digital Wallet Card",
        type: "prepaid",
        cardNumber: "6011 1111 2222 3333",
        lastFour: "3333",
        expiryDate: "06/27",
        cvv: "012",
        cardHolder: "JOHN DOE",
        balance: 500.00,
        status: "active",
        issuer: "discover",
        backgroundColor: "from-green-600 to-green-800",
        textColor: "text-white",
        isVirtual: true,
        isContactless: true,
        createdAt: "2024-09-01T00:00:00Z",
        updatedAt: "2025-12-01T10:00:00Z",
        lastUsed: "2025-11-28T12:30:00Z",
        monthlySpending: 200.00,
        spendingLimit: 1000.00,
        security: {
          hasPin: true,
          has2FA: true,
          fraudAlerts: false,
          internationalUsage: true
        }
      },
      {
        id: "5",
        name: "Student Debit",
        type: "debit",
        cardNumber: "4123 4567 8901 2345",
        lastFour: "2345",
        expiryDate: "08/26",
        cvv: "345",
        cardHolder: "JOHN DOE",
        balance: 1250.75,
        status: "active",
        issuer: "visa",
        backgroundColor: "from-orange-600 to-orange-800",
        textColor: "text-white",
        isVirtual: false,
        isContactless: true,
        createdAt: "2024-01-10T00:00:00Z",
        updatedAt: "2025-12-01T11:45:00Z",
        lastUsed: "2025-12-01T09:15:00Z",
        monthlySpending: 450.00,
        security: {
          hasPin: true,
          has2FA: false,
          fraudAlerts: true,
          internationalUsage: false
        }
      }
    ]

    setTimeout(() => {
      setCards(mockCards)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (cards.length > 0) {
      const analyticsData: CardAnalytics = {
        totalBalance: cards.reduce((sum, card) => sum + card.balance, 0),
        totalAvailableCredit: cards.reduce((sum, card) => sum + (card.availableCredit || 0), 0),
        totalCreditLimit: cards.reduce((sum, card) => sum + (card.creditLimit || 0), 0),
        utilizationRate: cards.reduce((sum, card) => sum + ((card.creditLimit ? (card.balance / card.creditLimit) * 100 : 0)), 0) / cards.filter(c => c.creditLimit).length || 0,
        monthlySpending: cards.reduce((sum, card) => sum + card.monthlySpending, 0),
        totalRewards: cards.reduce((sum, card) => sum + (card.rewards?.points || 0), 0),
        activeCards: cards.filter(card => card.status === "active").length,
        frozenCards: cards.filter(card => card.status === "frozen").length,
        expiredCards: cards.filter(card => card.status === "expired").length,
        averageBalance: cards.reduce((sum, card) => sum + card.balance, 0) / cards.length,
        highestSpendingCard: cards.reduce((highest, card) => card.monthlySpending > (highest?.monthlySpending || 0) ? card : highest, null as Card | null),
        upcomingExpiries: cards.filter(card => {
          const expiry = new Date(card.expiryDate.split('/').map((part, index) => index === 0 ? `20${part}` : part).join('/'))
          const threeMonthsFromNow = new Date()
          threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
          return expiry <= threeMonthsFromNow
        }),
        securityAlerts: {
          cardsWithoutPin: cards.filter(card => !card.security.hasPin),
          cardsWithout2FA: cards.filter(card => !card.security.has2FA),
          cardsWithHighUsage: cards.filter(card => card.spendingLimit && card.monthlySpending > card.spendingLimit * 0.8)
        }
      }
      setAnalytics(analyticsData)
    }
  }, [cards])

  const addCard = (cardData: Omit<Card, "id" | "createdAt" | "updatedAt">) => {
    const newCard: Card = {
      ...cardData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setCards(prev => [...prev, newCard])
  }

  const updateCard = (id: string, updates: Partial<Card>) => {
    setCards(prev => prev.map(card => 
      card.id === id 
        ? { ...card, ...updates, updatedAt: new Date().toISOString() }
        : card
    ))
  }

  const deleteCard = (id: string) => {
    setCards(prev => prev.filter(card => card.id !== id))
  }

  const toggleCardStatus = (id: string) => {
    setCards(prev => prev.map(card => {
      if (card.id === id) {
        const newStatus = card.status === "active" ? "frozen" : "active"
        return { ...card, status: newStatus, updatedAt: new Date().toISOString() }
      }
      return card
    }))
  }

  const getCardById = (id: string) => {
    return cards.find(card => card.id === id)
  }

  const getCardsByType = (type: Card["type"]) => {
    return cards.filter(card => card.type === type)
  }

  const getCardsByStatus = (status: Card["status"]) => {
    return cards.filter(card => card.status === status)
  }

  const getCardsByIssuer = (issuer: Card["issuer"]) => {
    return cards.filter(card => card.issuer === issuer)
  }

  const getVirtualCards = () => {
    return cards.filter(card => card.isVirtual)
  }

  const getPhysicalCards = () => {
    return cards.filter(card => !card.isVirtual)
  }

  return {
    cards,
    analytics,
    loading,
    addCard,
    updateCard,
    deleteCard,
    toggleCardStatus,
    getCardById,
    getCardsByType,
    getCardsByStatus,
    getCardsByIssuer,
    getVirtualCards,
    getPhysicalCards
  }
}
