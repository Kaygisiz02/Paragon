"use client"

import { useState, useEffect } from "react"

export interface Budget {
  id: string
  name: string
  description?: string
  limit: number
  spent: number
  percentage: number
  status: "on-track" | "warning" | "over-budget" | "exceeded"
  category?: string
  period: "monthly" | "weekly" | "yearly"
  startDate: string
  endDate: string
  alertThreshold?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface BudgetAnalytics {
  totalBudgeted: number
  totalSpent: number
  remainingBudget: number
  averageSpendingRate: number
  projectedMonthlySpending: number
  savingsOpportunity: number
  atRiskBudgets: Budget[]
  overBudgetCount: number
  onTrackCount: number
  warningCount: number
}

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<BudgetAnalytics | null>(null)

  useEffect(() => {
    // Simüle edilmiş veri çekimi
    const mockBudgets: Budget[] = [
      {
        id: "1",
        name: "Groceries & Food",
        description: "Weekly groceries, restaurants, and food delivery",
        limit: 800,
        spent: 567,
        percentage: 71,
        status: "on-track",
        category: "Food",
        period: "monthly",
        startDate: "2025-12-01",
        endDate: "2025-12-31",
        alertThreshold: 80,
        isActive: true,
        createdAt: "2025-12-01T00:00:00Z",
        updatedAt: "2025-12-08T15:30:00Z"
      },
      {
        id: "2",
        name: "Entertainment & Leisure",
        description: "Movies, games, concerts, and hobbies",
        limit: 300,
        spent: 285,
        percentage: 95,
        status: "warning",
        category: "Entertainment",
        period: "monthly",
        startDate: "2025-12-01",
        endDate: "2025-12-31",
        alertThreshold: 85,
        isActive: true,
        createdAt: "2025-12-01T00:00:00Z",
        updatedAt: "2025-12-08T20:15:00Z"
      },
      {
        id: "3",
        name: "Shopping & Retail",
        description: "Clothing, electronics, and personal items",
        limit: 500,
        spent: 523,
        percentage: 105,
        status: "over-budget",
        category: "Shopping",
        period: "monthly",
        startDate: "2025-12-01",
        endDate: "2025-12-31",
        alertThreshold: 90,
        isActive: true,
        createdAt: "2025-12-01T00:00:00Z",
        updatedAt: "2025-12-08T12:45:00Z"
      },
      {
        id: "4",
        name: "Transportation",
        description: "Gas, public transit, and ride-sharing",
        limit: 400,
        spent: 234,
        percentage: 59,
        status: "on-track",
        category: "Transport",
        period: "monthly",
        startDate: "2025-12-01",
        endDate: "2025-12-31",
        alertThreshold: 80,
        isActive: true,
        createdAt: "2025-12-01T00:00:00Z",
        updatedAt: "2025-12-08T09:20:00Z"
      },
      {
        id: "5",
        name: "Utilities & Bills",
        description: "Electricity, water, internet, and phone bills",
        limit: 350,
        spent: 312,
        percentage: 89,
        status: "warning",
        category: "Utilities",
        period: "monthly",
        startDate: "2025-12-01",
        endDate: "2025-12-31",
        alertThreshold: 85,
        isActive: true,
        createdAt: "2025-12-01T00:00:00Z",
        updatedAt: "2025-12-08T16:30:00Z"
      },
      {
        id: "6",
        name: "Health & Wellness",
        description: "Gym membership, supplements, and medical expenses",
        limit: 200,
        spent: 145,
        percentage: 73,
        status: "on-track",
        category: "Health",
        period: "monthly",
        startDate: "2025-12-01",
        endDate: "2025-12-31",
        alertThreshold: 85,
        isActive: true,
        createdAt: "2025-12-01T00:00:00Z",
        updatedAt: "2025-12-08T11:10:00Z"
      }
    ]

    setTimeout(() => {
      setBudgets(mockBudgets)
      setLoading(false)
    }, 100)
  }, [])

  useEffect(() => {
    if (budgets.length > 0) {
      const analyticsData: BudgetAnalytics = {
        totalBudgeted: budgets.reduce((sum, budget) => sum + budget.limit, 0),
        totalSpent: budgets.reduce((sum, budget) => sum + budget.spent, 0),
        remainingBudget: budgets.reduce((sum, budget) => sum + (budget.limit - budget.spent), 0),
        averageSpendingRate: budgets.reduce((sum, budget) => sum + budget.percentage, 0) / budgets.length,
        projectedMonthlySpending: budgets.reduce((sum, budget) => sum + budget.spent, 0) * (30 / 8), // 8 gün geçti
        savingsOpportunity: budgets.reduce((sum, budget) => sum + Math.max(0, budget.limit - budget.spent), 0),
        atRiskBudgets: budgets.filter(budget => budget.status === "warning" || budget.status === "over-budget"),
        overBudgetCount: budgets.filter(budget => budget.status === "over-budget").length,
        onTrackCount: budgets.filter(budget => budget.status === "on-track").length,
        warningCount: budgets.filter(budget => budget.status === "warning").length
      }
      setAnalytics(analyticsData)
    }
  }, [budgets])

  const addBudget = (budgetData: Omit<Budget, "id" | "percentage" | "status" | "createdAt" | "updatedAt">) => {
    const percentage = Math.round((budgetData.spent / budgetData.limit) * 100)
    let status: Budget["status"] = "on-track"
    
    if (percentage >= 100) {
      status = "over-budget"
    } else if (percentage >= (budgetData.alertThreshold ?? 85) || percentage >= 85) {
      status = "warning"
    }

    const newBudget: Budget = {
      ...budgetData,
      id: Date.now().toString(),
      percentage,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setBudgets(prev => [...prev, newBudget])
  }

  const updateBudget = (id: string, updates: Partial<Budget>) => {
    setBudgets(prev => prev.map(budget => {
      if (budget.id === id) {
        const updatedBudget = { ...budget, ...updates, updatedAt: new Date().toISOString() }
        
        // Recalculate percentage and status if spent or limit changed
        if (updates.spent !== undefined || updates.limit !== undefined) {
          const newSpent = updates.spent !== undefined ? updates.spent : budget.spent
          const newLimit = updates.limit !== undefined ? updates.limit : budget.limit
          const percentage = Math.round((newSpent / newLimit) * 100)
          
          let status: Budget["status"] = "on-track"
          if (percentage >= 100) {
            status = "over-budget"
          } else if (percentage >= (updates.alertThreshold || budget.alertThreshold || 85)) {
            status = "warning"
          }
          
          updatedBudget.percentage = percentage
          updatedBudget.status = status
        }
        
        return updatedBudget
      }
      return budget
    }))
  }

  const deleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(budget => budget.id !== id))
  }

  const getBudgetById = (id: string) => {
    return budgets.find(budget => budget.id === id)
  }

  const getBudgetsByCategory = (category: string) => {
    return budgets.filter(budget => budget.category === category)
  }

  const getBudgetsByStatus = (status: Budget["status"]) => {
    return budgets.filter(budget => budget.status === status)
  }

  return {
    budgets,
    analytics,
    loading,
    addBudget,
    updateBudget,
    deleteBudget,
    getBudgetById,
    getBudgetsByCategory,
    getBudgetsByStatus
  }
}
