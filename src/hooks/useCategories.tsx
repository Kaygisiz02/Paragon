"use client"

import { useState, useEffect } from "react"

export interface Category {
  id: string
  name: string
  description: string
  type: "expense" | "income"
  icon: any
  color: string
  transactionCount: number
  totalAmount: number
  monthlyAverage: number
}

export function useCategories() {
  const [expenseCategories, setExpenseCategories] = useState<Category[]>([])
  const [incomeCategories, setIncomeCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simüle edilmiş veri çekimi - gerçek uygulamada API çağrısı olacak
    const mockExpenseCategories: Category[] = [
      {
        id: "1",
        name: "Food / Groceries",
        description: "Supermarket, restaurants, delivery, coffee shops",
        type: "expense",
        icon: null,
        color: "text-red-600",
        transactionCount: 156,
        totalAmount: 12580,
        monthlyAverage: 2096
      },
      {
        id: "2", 
        name: "Rent / Mortgage",
        description: "Monthly housing payments, utilities, maintenance",
        type: "expense",
        icon: null,
        color: "text-blue-600",
        transactionCount: 12,
        totalAmount: 48000,
        monthlyAverage: 4000
      },
      {
        id: "3",
        name: "Transportation", 
        description: "Gas, public transit, ride-sharing, car maintenance",
        type: "expense",
        icon: null,
        color: "text-green-600",
        transactionCount: 89,
        totalAmount: 8450,
        monthlyAverage: 1408
      },
      {
        id: "4",
        name: "Shopping",
        description: "Clothing, electronics, household items, personal care",
        type: "expense",
        icon: null,
        color: "text-purple-600",
        transactionCount: 67,
        totalAmount: 12300,
        monthlyAverage: 2050
      },
      {
        id: "5",
        name: "Entertainment",
        description: "Movies, concerts, streaming services, hobbies",
        type: "expense",
        icon: null,
        color: "text-orange-600",
        transactionCount: 45,
        totalAmount: 6800,
        monthlyAverage: 1133
      },
      {
        id: "6",
        name: "Healthcare",
        description: "Doctor visits, medications, insurance premiums",
        type: "expense",
        icon: null,
        color: "text-pink-600",
        transactionCount: 23,
        totalAmount: 9200,
        monthlyAverage: 1533
      },
      {
        id: "7",
        name: "Education",
        description: "Tuition, books, courses, training materials",
        type: "expense",
        icon: null,
        color: "text-indigo-600",
        transactionCount: 18,
        totalAmount: 7600,
        monthlyAverage: 1267
      },
      {
        id: "8",
        name: "Insurance",
        description: "Life, health, auto, home insurance premiums",
        type: "expense",
        icon: null,
        color: "text-teal-600",
        transactionCount: 12,
        totalAmount: 14400,
        monthlyAverage: 2400
      },
      {
        id: "9",
        name: "Utilities",
        description: "Electricity, water, gas, internet, phone bills",
        type: "expense",
        icon: null,
        color: "text-yellow-600",
        transactionCount: 36,
        totalAmount: 5400,
        monthlyAverage: 900
      },
      {
        id: "10",
        name: "Travel",
        description: "Flights, hotels, vacation expenses, business trips",
        type: "expense",
        icon: null,
        color: "text-cyan-600",
        transactionCount: 15,
        totalAmount: 11200,
        monthlyAverage: 1867
      },
      {
        id: "11",
        name: "Subscriptions",
        description: "Software, streaming, magazines, membership fees",
        type: "expense",
        icon: null,
        color: "text-rose-600",
        transactionCount: 24,
        totalAmount: 3600,
        monthlyAverage: 600
      },
      {
        id: "12",
        name: "Pet Care",
        description: "Food, vet visits, grooming, supplies for pets",
        type: "expense",
        icon: null,
        color: "text-amber-600",
        transactionCount: 31,
        totalAmount: 4800,
        monthlyAverage: 800
      }
    ]

    const mockIncomeCategories: Category[] = [
      {
        id: "13",
        name: "Salary",
        description: "Regular employment income, bonuses, overtime",
        type: "income",
        icon: null,
        color: "text-green-600",
        transactionCount: 12,
        totalAmount: 150000,
        monthlyAverage: 12500
      },
      {
        id: "14",
        name: "Freelance",
        description: "Income from contract work, consulting, side projects",
        type: "income", 
        icon: null,
        color: "text-blue-600",
        transactionCount: 8,
        totalAmount: 24000,
        monthlyAverage: 2000
      },
      {
        id: "15",
        name: "Investments",
        description: "Dividend income, capital gains, interest earnings",
        type: "income",
        icon: null,
        color: "text-purple-600",
        transactionCount: 15,
        totalAmount: 18000,
        monthlyAverage: 1500
      },
      {
        id: "16",
        name: "Business Income",
        description: "Revenue from small business, partnerships, ventures",
        type: "income",
        icon: null,
        color: "text-orange-600",
        transactionCount: 24,
        totalAmount: 36000,
        monthlyAverage: 3000
      },
      {
        id: "17",
        name: "Rental Income",
        description: "Property rental earnings, Airbnb, storage units",
        type: "income",
        icon: null,
        color: "text-pink-600",
        transactionCount: 12,
        totalAmount: 28800,
        monthlyAverage: 2400
      },
      {
        id: "18",
        name: "Royalties",
        description: "Book royalties, music royalties, patent income",
        type: "income",
        icon: null,
        color: "text-indigo-600",
        transactionCount: 6,
        totalAmount: 7200,
        monthlyAverage: 600
      },
      {
        id: "19",
        name: "Gifts & Inheritance",
        description: "Monetary gifts, inheritance, cash presents",
        type: "income",
        icon: null,
        color: "text-teal-600",
        transactionCount: 4,
        totalAmount: 15000,
        monthlyAverage: 1250
      },
      {
        id: "20",
        name: "Refunds & Rebates",
        description: "Tax refunds, cashback rewards, price adjustments",
        type: "income",
        icon: null,
        color: "text-yellow-600",
        transactionCount: 18,
        totalAmount: 3600,
        monthlyAverage: 300
      },
      {
        id: "21",
        name: "Side Hustle",
        description: "Gig economy work, tutoring, pet sitting, delivery",
        type: "income",
        icon: null,
        color: "text-cyan-600",
        transactionCount: 31,
        totalAmount: 12400,
        monthlyAverage: 1033
      },
      {
        id: "22",
        name: "Passive Income",
        description: "Affiliate marketing, digital products, online courses",
        type: "income",
        icon: null,
        color: "text-rose-600",
        transactionCount: 9,
        totalAmount: 9600,
        monthlyAverage: 800
      }
    ]

    // Simüle edilmiş async veri yükleme
    setTimeout(() => {
      setExpenseCategories(mockExpenseCategories)
      setIncomeCategories(mockIncomeCategories)
      setLoading(false)
    }, 100)
  }, [])

  const addCategory = (type: "expense" | "income", name: string, description: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      description,
      type,
      icon: null,
      color: type === "expense" ? "text-red-600" : "text-green-600",
      transactionCount: 0,
      totalAmount: 0,
      monthlyAverage: 0
    }

    if (type === "expense") {
      setExpenseCategories(prev => [...prev, newCategory])
    } else {
      setIncomeCategories(prev => [...prev, newCategory])
    }
  }

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setExpenseCategories(prev => 
      prev.map(cat => cat.id === id ? { ...cat, ...updates } : cat)
    )
    setIncomeCategories(prev => 
      prev.map(cat => cat.id === id ? { ...cat, ...updates } : cat)
    )
  }

  const deleteCategory = (id: string) => {
    setExpenseCategories(prev => prev.filter(cat => cat.id !== id))
    setIncomeCategories(prev => prev.filter(cat => cat.id !== id))
  }

  const getHighestIncomeCategory = () => {
    if (incomeCategories.length === 0) return null
    return incomeCategories.reduce((prev, current) => 
      (prev.totalAmount > current.totalAmount) ? prev : current
    )
  }

  const getHighestExpenseCategory = () => {
    if (expenseCategories.length === 0) return null
    return expenseCategories.reduce((prev, current) => 
      (prev.totalAmount > current.totalAmount) ? prev : current
    )
  }

  const getTotalIncome = () => {
    return incomeCategories.reduce((total, category) => total + category.totalAmount, 0)
  }

  const getTotalExpenses = () => {
    return expenseCategories.reduce((total, category) => total + category.totalAmount, 0)
  }

  return {
    expenseCategories,
    incomeCategories,
    loading,
    addCategory,
    updateCategory,
    deleteCategory,
    getHighestIncomeCategory,
    getHighestExpenseCategory,
    getTotalIncome,
    getTotalExpenses
  }
}
