"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { 
  TransactionAnalytics, 
  TransactionFilters, 
  TransactionChart, 
  TransactionExport,
  Transaction,
  type TransactionFilters as TTransactionFilters
} from "@/components/transactions"

export default function TransactionsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "quarter" | "year">("month")
  const [transactionFilter, setTransactionFilter] = useState<"all" | "income" | "expense">("all")
  const [activeFilters, setActiveFilters] = useState<TTransactionFilters>({
    search: "",
    categories: [],
    dateRange: { start: "", end: "" },
    amountRange: { min: 0, max: 10000 },
    status: []
  })
  const [showAddForm, setShowAddForm] = useState(false)

  // Mock transaction data - real app'de API'den gelecek
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", merchant: "Spotify Subscription", amount: -10.99, date: "2023-10-15", category: "Entertainment", status: "completed", type: "expense", description: "Monthly subscription" },
    { id: "2", merchant: "Grocery Store", amount: -78.22, date: "2023-10-14", category: "Food & Dining", status: "completed", type: "expense", description: "Weekly shopping" },
    { id: "3", merchant: "Monthly Salary", amount: 3500.00, date: "2023-10-13", category: "Income", status: "completed", type: "income", description: "Monthly salary" },
    { id: "4", merchant: "Shell Gas Station", amount: -45.00, date: "2023-10-13", category: "Transportation", status: "completed", type: "expense", description: "Fuel purchase" },
    { id: "5", merchant: "Netflix Subscription", amount: -15.99, date: "2023-10-12", category: "Entertainment", status: "completed", type: "expense", description: "Monthly subscription" },
    { id: "6", merchant: "Freelance Project", amount: 850.00, date: "2023-10-11", category: "Income", status: "completed", type: "income", description: "Web design project" },
    { id: "7", merchant: "Restaurant", amount: -120.00, date: "2023-10-10", category: "Food & Dining", status: "pending", type: "expense", description: "Dinner with friends" },
    { id: "8", merchant: "Coffee Shop", amount: -4.50, date: "2023-10-09", category: "Food & Dining", status: "completed", type: "expense", description: "Morning coffee" },
  ])
  
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions)

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

  return (
    <DashboardLayout 
      title="Transactions" 
      subtitle="Advanced analytics, filtering, and management of your financial transactions"
    >
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black tracking-tight">Transactions</h1>
            <p className="text-muted-foreground">Advanced analytics, filtering, and management of your financial transactions.</p>
          </div>
          <Button 
            className="bg-primary text-primary-foreground flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 hover:bg-primary/90"
            onClick={() => setShowAddForm(true)}
          >
            <PlusCircle className="h-4 w-4" />
            Add Transaction
          </Button>
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
