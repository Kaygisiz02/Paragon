"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Plus,
  ShoppingCart,
  Home,
  Car,
  DollarSign,
  Briefcase,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  X
} from "lucide-react"

interface Category {
  id: string
  name: string
  description: string
  type: "expense" | "income"
  icon: React.ComponentType<{ className?: string }>
  color: string
  transactionCount: number
  totalAmount: number
  monthlyAverage: number
}

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "expense" | "income">("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCategoryType, setNewCategoryType] = useState<"expense" | "income">("expense")
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryDescription, setNewCategoryDescription] = useState("")
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [showAddIncome, setShowAddIncome] = useState(false)
  const [newExpenseName, setNewExpenseName] = useState("")
  const [newExpenseDescription, setNewExpenseDescription] = useState("")
  const [newIncomeName, setNewIncomeName] = useState("")
  const [newIncomeDescription, setNewIncomeDescription] = useState("")
  const [expenseCategories, setExpenseCategories] = useState([
    {
      id: "1",
      name: "Food / Groceries",
      description: "Supermarket, restaurants, delivery",
      type: "expense",
      icon: ShoppingCart,
      color: "text-red-600",
      transactionCount: 156,
      totalAmount: 12580,
      monthlyAverage: 2096
    },
    {
      id: "2", 
      name: "Rent / Mortgage",
      description: "Monthly housing payments",
      type: "expense",
      icon: Home,
      color: "text-blue-600",
      transactionCount: 12,
      totalAmount: 48000,
      monthlyAverage: 4000
    },
    {
      id: "3",
      name: "Transportation", 
      description: "Gas, public transit, ride-sharing",
      type: "expense",
      icon: Car,
      color: "text-green-600",
      transactionCount: 89,
      totalAmount: 8450,
      monthlyAverage: 1408
    }
  ])
  const [incomeCategories, setIncomeCategories] = useState([
    {
      id: "4",
      name: "Salary",
      description: "Regular employment income", 
      type: "income",
      icon: DollarSign,
      color: "text-green-600",
      transactionCount: 12,
      totalAmount: 150000,
      monthlyAverage: 12500
    },
    {
      id: "5",
      name: "Freelance",
      description: "Income from contract work",
      type: "income", 
      icon: Briefcase,
      color: "text-purple-600",
      transactionCount: 8,
      totalAmount: 24000,
      monthlyAverage: 2000
    },
    {
      id: "6",
      name: "Investments",
      description: "Dividends and capital gains",
      type: "income",
      icon: TrendingUp,
      color: "text-blue-600",
      transactionCount: 24,
      totalAmount: 18000,
      monthlyAverage: 1500
    }
  ])

  const allCategories = [...expenseCategories, ...incomeCategories]
  
  const filteredCategories = allCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || category.type === filterType
    return matchesSearch && matchesFilter
  })

  const handleAddExpense = () => {
    if (newExpenseName && newExpenseDescription) {
      const newCategory = {
        id: (expenseCategories.length + 1).toString(),
        name: newExpenseName,
        description: newExpenseDescription,
        type: "expense" as const,
        icon: ShoppingCart,
        color: "text-red-600",
        transactionCount: 0,
        totalAmount: 0,
        monthlyAverage: 0
      }
      setExpenseCategories([...expenseCategories, newCategory])
      setNewExpenseName("")
      setNewExpenseDescription("")
      setShowAddExpense(false)
    }
  }

  const handleAddIncome = () => {
    if (newIncomeName && newIncomeDescription) {
      const newCategory = {
        id: (incomeCategories.length + 1).toString(),
        name: newIncomeName,
        description: newIncomeDescription,
        type: "income" as const,
        icon: TrendingUp,
        color: "text-green-600",
        transactionCount: 0,
        totalAmount: 0,
        monthlyAverage: 0
      }
      setIncomeCategories([...incomeCategories, newCategory])
      setNewIncomeName("")
      setNewIncomeDescription("")
      setShowAddIncome(false)
    }
  }

  const deleteExpenseCategory = (categoryId: string) => {
    setExpenseCategories(expenseCategories.filter(cat => cat.id !== categoryId))
  }

  const deleteIncomeCategory = (categoryId: string) => {
    setIncomeCategories(incomeCategories.filter(cat => cat.id !== categoryId))
  }

  const handleAddCategory = () => {
    if (newCategoryName && newCategoryDescription) {
      const newCategory = {
        id: newCategoryType === "expense" 
          ? (expenseCategories.length + 1).toString()
          : (incomeCategories.length + 1).toString(),
        name: newCategoryName,
        description: newCategoryDescription,
        type: newCategoryType as "expense" | "income",
        icon: newCategoryType === "expense" ? ShoppingCart : TrendingUp,
        color: newCategoryType === "expense" ? "text-red-600" : "text-green-600",
        transactionCount: 0,
        totalAmount: 0,
        monthlyAverage: 0
      }
      
      if (newCategoryType === "expense") {
        setExpenseCategories([...expenseCategories, newCategory])
      } else {
        setIncomeCategories([...incomeCategories, newCategory])
      }
      
      setNewCategoryName("")
      setNewCategoryDescription("")
      setNewCategoryType("expense")
      setShowAddForm(false)
    }
  }

  const handleCancelAddCategory = () => {
    setNewCategoryName("")
    setNewCategoryDescription("")
    setNewCategoryType("expense")
    setShowAddForm(false)
  }

  return (
    <DashboardLayout 
      title="Category Management"
      subtitle="Organize your transactions by creating and managing your expense and income categories"
    >
      <div className="space-y-8">
        {/* Header Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-64"
              />
            </div>
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("all")}
            >
              All
            </Button>
            <Button
              variant={filterType === "expense" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("expense")}
            >
              Expenses
            </Button>
            <Button
              variant={filterType === "income" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("income")}
            >
              Income
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap lg:flex-nowrap justify-end">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button 
              size="sm"
              onClick={() => {
                console.log("Header Add Category clicked!")
                setShowAddForm(true)
              }}
              className="transition-all duration-300 hover:scale-105"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Expense Categories */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                  Expense Categories
                </CardTitle>
                <Button 
                  size="sm"
                  onClick={() => {
                    console.log("Expense Add New clicked!")
                    setShowAddExpense(!showAddExpense)
                  }}
                  className="transition-all duration-300 hover:scale-105"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add New Expense Category Form */}
              {showAddExpense && (
                <div className="p-4 border-2 border-dashed border-muted rounded-lg bg-muted/30">
                  {(() => { console.log("Expense modal showing!"); return null; })()}
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Category name"
                      value={newExpenseName}
                      onChange={(e) => setNewExpenseName(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                    <textarea
                      placeholder="Description"
                      rows={2}
                      value={newExpenseDescription}
                      onChange={(e) => setNewExpenseDescription(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={handleAddExpense}
                      >
                        Save Category
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setShowAddExpense(false)
                          setNewExpenseName("")
                          setNewExpenseDescription("")
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Expense Categories List */}
              <div className="space-y-3">
                {expenseCategories
                  .filter(cat => filterType === "all" || filterType === "expense")
                  .filter(cat => searchTerm === "" || 
                    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((category) => (
                  <div 
                    key={category.id}
                    className="group flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-md cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-muted ${category.color} transition-transform duration-300 group-hover:scale-110`}>
                        <category.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">{category.description}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {category.transactionCount} transactions
                          </span>
                          <span className="text-xs font-medium text-red-600">
                            ₺{category.totalAmount.toLocaleString('en-US')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => deleteExpenseCategory(category.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Income Categories */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Income Categories
                </CardTitle>
                <Button 
                  size="sm"
                  onClick={() => {
                    console.log("Income Add New clicked!")
                    setShowAddIncome(!showAddIncome)
                  }}
                  className="transition-all duration-300 hover:scale-105"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add New Income Category Form */}
              {showAddIncome && (
                <div className="p-4 border-2 border-dashed border-muted rounded-lg bg-muted/30">
                  {(() => { console.log("Income modal showing!"); return null; })()}
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Category name"
                      value={newIncomeName}
                      onChange={(e) => setNewIncomeName(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                    <textarea
                      placeholder="Description"
                      rows={2}
                      value={newIncomeDescription}
                      onChange={(e) => setNewIncomeDescription(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={handleAddIncome}
                      >
                        Save Category
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setShowAddIncome(false)
                          setNewIncomeName("")
                          setNewIncomeDescription("")
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Income Categories List */}
              <div className="space-y-3">
                {incomeCategories
                  .filter(cat => filterType === "all" || filterType === "income")
                  .filter(cat => searchTerm === "" || 
                    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((category) => (
                  <div 
                    key={category.id}
                    className="group flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-md cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-muted ${category.color} transition-transform duration-300 group-hover:scale-110`}>
                        <category.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">{category.description}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {category.transactionCount} transactions
                          </span>
                          <span className="text-xs font-medium text-green-600">
                            +₺{category.totalAmount.toLocaleString('en-US')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => deleteIncomeCategory(category.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Empty State for Income */}
                {incomeCategories.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">No more income categories</h3>
                    <p className="text-muted-foreground mb-4">Click 'Add New' to create one.</p>
                    <Button 
                      size="sm"
                      onClick={() => setShowAddIncome(true)}
                      className="transition-all duration-300 hover:scale-105"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Category Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-lg bg-red-50 border border-red-200">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {expenseCategories.reduce((sum, cat) => sum + cat.transactionCount, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Expense Transactions</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {incomeCategories.reduce((sum, cat) => sum + cat.transactionCount, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Income Transactions</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  ₺{expenseCategories.reduce((sum, cat) => sum + cat.monthlyAverage, 0).toLocaleString('en-US')}
                </div>
                <p className="text-sm text-muted-foreground">Monthly Expenses</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-purple-50 border border-purple-200">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  ₺{incomeCategories.reduce((sum, cat) => sum + cat.monthlyAverage, 0).toLocaleString('en-US')}
                </div>
                <p className="text-sm text-muted-foreground">Monthly Income</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Category Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            {(() => { console.log("Universal modal showing!"); return null; })()}
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Add New Category</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCancelAddCategory}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category Type</label>
                    <div className="flex gap-2">
                      <Button
                        variant={newCategoryType === "expense" ? "default" : "outline"}
                        onClick={() => setNewCategoryType("expense")}
                        className="flex-1"
                      >
                        <TrendingDown className="h-4 w-4 mr-2" />
                        Expense
                      </Button>
                      <Button
                        variant={newCategoryType === "income" ? "default" : "outline"}
                        onClick={() => setNewCategoryType("income")}
                        className="flex-1"
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Income
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Groceries"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <textarea
                      placeholder="e.g., Supermarket, restaurants, delivery"
                      rows={3}
                      value={newCategoryDescription}
                      onChange={(e) => setNewCategoryDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={handleCancelAddCategory}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddCategory}
                      className="flex-1"
                      disabled={!newCategoryName || !newCategoryDescription}
                    >
                      Add Category
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
