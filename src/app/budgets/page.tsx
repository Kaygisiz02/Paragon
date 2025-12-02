"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Plus,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  Calendar,
  Zap,
  Target,
  AlertTriangle
} from "lucide-react"
import { useBudgets, Budget } from "@/hooks/useBudgets"
import { BudgetCard } from "@/components/budgets/BudgetCard"
import { BudgetAnalytics } from "@/components/budgets/BudgetAnalytics"
import { BudgetInsights } from "@/components/budgets/BudgetInsights"
import { BudgetTrends } from "@/components/budgets/BudgetTrends"
import { AddBudgetModal } from "@/components/budgets/AddBudgetModal"

export default function BudgetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "on-track" | "warning" | "over-budget">("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "insights" | "trends">("overview")
  
  const { 
    budgets, 
    analytics, 
    loading, 
    addBudget, 
    updateBudget, 
    deleteBudget,
    getBudgetsByStatus,
    getBudgetsByCategory
  } = useBudgets()

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(budgets.map(b => b.category).filter(Boolean)))]

  // Filter budgets based on search and filters
  const filteredBudgets = budgets.filter(budget => {
    const matchesSearch = budget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         budget.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || budget.status === filterStatus
    const matchesCategory = filterCategory === "all" || budget.category === filterCategory
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleAddBudget = (budgetData: {
    name: string
    description?: string
    limit: number
    spent?: number
    category: string
    period: "monthly" | "weekly" | "yearly"
    alertThreshold?: number
  }) => {
    // Calculate dates based on period
    const startDate = new Date()
    const endDate = new Date()
    
    if (budgetData.period === "weekly") {
      endDate.setDate(startDate.getDate() + 7)
    } else if (budgetData.period === "monthly") {
      endDate.setMonth(startDate.getMonth() + 1)
    } else {
      endDate.setFullYear(startDate.getFullYear() + 1)
    }

    addBudget({
      ...budgetData,
      spent: budgetData.spent || 0,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      isActive: true
    })
  }

  const handleEditBudget = (budget: Budget) => {
    console.log("Edit budget:", budget)
    // Implement edit functionality
  }

  const handleDeleteBudget = (budgetId: string) => {
    deleteBudget(budgetId)
  }

  const handleViewBudget = (budget: Budget) => {
    console.log("View budget:", budget)
    // Implement view functionality
  }

  const handleOptimizeBudget = (budgetId: string) => {
    console.log("Optimize budget:", budgetId)
    // Implement optimization logic
  }

  const handleAdjustBudget = (budgetId: string) => {
    console.log("Adjust budget:", budgetId)
    // Implement adjustment logic
  }

  if (loading) {
    return (
      <DashboardLayout 
        title="Budgets" 
        subtitle="Create, view, and manage your financial budgets"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Budgets loading...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "analytics", label: "Analytics", icon: Target },
    { id: "insights", label: "Insights", icon: Zap },
    { id: "trends", label: "Trends", icon: Calendar }
  ]

  return (
    <DashboardLayout 
      title="Budgets" 
      subtitle="Create, view, and manage your financial budgets"
    >
      <div className="space-y-8">
        {/* Header Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search budgets..."
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
              <option value="on-track">On Track</option>
              <option value="warning">Warning</option>
              <option value="over-budget">Over Budget</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
          
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Budget
          </Button>
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
                    <span className="text-sm font-medium text-muted-foreground">Total Budgeted</span>
                    <BarChart3 className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">₺{analytics.totalBudgeted.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Across {budgets.length} budgets</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Total Spent</span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">₺{analytics.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{((analytics.totalSpent / analytics.totalBudgeted) * 100).toFixed(1)}% used</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Remaining</span>
                    <Target className="h-4 w-4 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold text-purple-600">₺{analytics.remainingBudget.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Available to spend</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">At Risk</span>
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </div>
                  <p className="text-2xl font-bold text-red-600">{analytics.atRiskBudgets.length}</p>
                  <p className="text-xs text-muted-foreground">Budgets need attention</p>
                </Card>
              </div>
            )}

            {/* Budgets Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Budgets</h2>
                <span className="text-sm text-muted-foreground">
                  {filteredBudgets.length} of {budgets.length} budgets
                </span>
              </div>
              
              {filteredBudgets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBudgets.map((budget) => (
                    <BudgetCard
                      key={budget.id}
                      budget={budget}
                      onEdit={handleEditBudget}
                      onDelete={handleDeleteBudget}
                      onView={handleViewBudget}
                    />
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <Target className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">No budgets found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchTerm || filterStatus !== "all" || filterCategory !== "all" 
                          ? "Try adjusting your filters or search terms"
                          : "Create your first budget to start tracking your expenses"
                        }
                      </p>
                      {!searchTerm && filterStatus === "all" && filterCategory === "all" && (
                        <Button onClick={() => setShowAddModal(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Your First Budget
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}

        {activeTab === "analytics" && analytics && (
          <BudgetAnalytics analytics={analytics} />
        )}

        {activeTab === "insights" && (
          <BudgetInsights 
            budgets={budgets}
            onOptimizeBudget={handleOptimizeBudget}
            onAdjustBudget={handleAdjustBudget}
          />
        )}

        {activeTab === "trends" && (
          <BudgetTrends budgets={budgets} />
        )}

        {/* Add Budget Modal */}
        <AddBudgetModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddBudget={handleAddBudget}
        />
      </div>
    </DashboardLayout>
  )
}
