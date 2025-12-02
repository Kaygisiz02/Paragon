"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Filter, BarChart3, TrendingUp, Calendar, Zap, Target } from "lucide-react"
import { useCategories, Category } from "@/hooks/useCategories"
import { getAutoDescription } from "@/hooks/useAutoDescription"
import { CategoryCard } from "@/components/categories/CategoryCard"
import { CategoryStats } from "@/components/categories/CategoryStats"
import { AddCategoryModal } from "@/components/categories/AddCategoryModal"
import { CategoryAnalytics } from "@/components/categories/CategoryAnalytics"
import { CategoryInsights } from "@/components/categories/CategoryInsights"
import { CategoryComparison } from "@/components/categories/CategoryComparison"
import { CategoryTrends } from "@/components/categories/CategoryTrends"

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "expense" | "income">("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "insights" | "comparison" | "trends">("overview")
  
  const { 
    expenseCategories, 
    incomeCategories, 
    loading, 
    addCategory,
    updateCategory,
    deleteCategory,
    getHighestExpenseCategory, 
    getHighestIncomeCategory 
  } = useCategories()

  const highestExpense = getHighestExpenseCategory()
  const highestIncome = getHighestIncomeCategory()

  // Filter categories based on search and type
  const filteredExpenseCategories = expenseCategories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === "all" || filterType === "expense")
  )

  const filteredIncomeCategories = incomeCategories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === "all" || filterType === "income")
  )

  const handleAddCategory = (type: "expense" | "income", name: string, description: string) => {
    // Use the addCategory function from useCategories hook
    addCategory(type, name, description)
  }

  const handleEditCategory = (category: Category) => {
    console.log("Edit category:", category)
    // Implement edit logic using updateCategory
    // updateCategory(category.id, { name: newName, description: newDescription })
  }

  const handleDeleteCategory = (categoryId: string) => {
    console.log("Delete category:", categoryId)
    // Use the deleteCategory function from useCategories hook
    deleteCategory(categoryId)
  }

  const handleOptimizeCategory = (categoryId: string) => {
    console.log("Optimize category:", categoryId)
    // Implement optimization logic - AI-powered category optimization
    // Could suggest budget limits, spending patterns, etc.
  }

  if (loading) {
    return (
      <DashboardLayout 
        title="Kategoriler" 
        subtitle="Finansal kategorilerinizi yönetin"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Kategoriler yükleniyor...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const tabs = [
    { id: "overview", label: "Genel Bakış", icon: BarChart3 },
    { id: "analytics", label: "Analitik", icon: Target },
    { id: "insights", label: "Akıllı Analiz", icon: Zap },
    { id: "comparison", label: "Karşılaştırma", icon: Filter },
    { id: "trends", label: "Trendler", icon: Calendar }
  ]

  return (
    <DashboardLayout 
      title="Kategoriler" 
      subtitle="Finansal kategorilerinizi yönetin"
    >
      <div className="space-y-8">
        {/* Header Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Kategori ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
              />
            </div>
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("all")}
            >
              Tümü
            </Button>
            <Button
              variant={filterType === "expense" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("expense")}
            >
              Harcamalar
            </Button>
            <Button
              variant={filterType === "income" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("income")}
            >
              Gelirler
            </Button>
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Kategori
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
            {/* Category Stats */}
            <CategoryStats 
              expenseCategories={expenseCategories}
              incomeCategories={incomeCategories}
              loading={loading}
            />

            {/* Categories Grid */}
            <div className="space-y-8">
              {/* Expense Categories */}
              {(filterType === "all" || filterType === "expense") && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">Harcama Kategorileri</h2>
                    <span className="text-sm text-muted-foreground">
                      ({filteredExpenseCategories.length} kategori)
                    </span>
                  </div>
                  
                  {filteredExpenseCategories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredExpenseCategories.map((category) => (
                        <CategoryCard
                          key={category.id}
                          category={category}
                          onEdit={handleEditCategory}
                          onDelete={handleDeleteCategory}
                          onOptimize={handleOptimizeCategory}
                          isHighestExpense={highestExpense?.id === category.id}
                        />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <p className="text-muted-foreground">Harcama kategorisi bulunamadı.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Income Categories */}
              {(filterType === "all" || filterType === "income") && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">Gelir Kategorileri</h2>
                    <span className="text-sm text-muted-foreground">
                      ({filteredIncomeCategories.length} kategori)
                    </span>
                  </div>
                  
                  {filteredIncomeCategories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredIncomeCategories.map((category) => (
                        <CategoryCard
                          key={category.id}
                          category={category}
                          onEdit={handleEditCategory}
                          onDelete={handleDeleteCategory}
                          onOptimize={handleOptimizeCategory}
                          isHighestIncome={highestIncome?.id === category.id}
                        />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <p className="text-muted-foreground">Gelir kategorisi bulunamadı.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <CategoryAnalytics 
            expenseCategories={expenseCategories}
            incomeCategories={incomeCategories}
          />
        )}

        {activeTab === "insights" && (
          <CategoryInsights 
            expenseCategories={expenseCategories}
            incomeCategories={incomeCategories}
            onOptimizeCategory={handleOptimizeCategory}
          />
        )}

        {activeTab === "comparison" && (
          <CategoryComparison 
            categories={[...expenseCategories, ...incomeCategories]}
          />
        )}

        {activeTab === "trends" && (
          <CategoryTrends 
            categories={[...expenseCategories, ...incomeCategories]}
          />
        )}

        {/* Add Category Modal */}
        <AddCategoryModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddCategory={handleAddCategory}
        />
      </div>
    </DashboardLayout>
  )
}
