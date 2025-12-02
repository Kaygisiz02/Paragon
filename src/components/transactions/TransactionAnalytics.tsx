"use client"

import { useState } from "react"
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Calendar, 
  Download, 
  Filter, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  MoreVertical 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface Transaction {
  id: string
  merchant: string
  amount: number
  date: string
  category: string
  status: "completed" | "pending" | "failed"
  type: "income" | "expense"
  description?: string
}

interface TransactionAnalyticsProps {
  transactions: Transaction[]
  selectedPeriod: "week" | "month" | "quarter" | "year"
  transactionFilter: "all" | "income" | "expense"
  onPeriodChange: (period: "week" | "month" | "quarter" | "year") => void
  onFilterChange: (filter: "all" | "income" | "expense") => void
}

export function TransactionAnalytics({
  transactions,
  selectedPeriod,
  transactionFilter,
  onPeriodChange,
  onFilterChange
}: TransactionAnalyticsProps) {
  const filteredTransactions = transactions.filter(t => {
    if (transactionFilter === "all") return true
    return t.type === transactionFilter
  })

  const totalIncome = filteredTransactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = filteredTransactions.filter(t => t.type === "expense").reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const netAmount = totalIncome - totalExpense

  return (
    <Card className="shadow-xl border-0 overflow-hidden">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border-b border-primary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-12 w-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                <ArrowDownLeft className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Transaction Analytics
              </CardTitle>
              <p className="text-sm text-muted-foreground">Advanced insights and detailed transaction history</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2 hover:bg-primary/10 border-primary/20">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" className="gap-2 hover:bg-primary/10 border-primary/20">
              <Filter className="h-4 w-4" />
              Advanced Filter
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-0">
        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 bg-gradient-to-b from-muted/30 to-transparent">
          {/* Main Stats */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-4 border border-green-200/50">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                    <ArrowDownLeft className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">Total Income</span>
                </div>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">+₺{totalIncome.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600 dark:text-green-400">+12.5% from last period</span>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 p-4 border border-red-200/50">
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-red-700 dark:text-red-300">Total Expense</span>
                </div>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">-₺{totalExpense.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingDown className="h-3 w-3 text-red-600" />
                  <span className="text-xs text-red-600 dark:text-red-400">-8.3% from last period</span>
                </div>
              </div>
            </div>

            <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${netAmount >= 0 ? 'from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200/50' : 'from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200/50'} p-4 border`}>
              <div className={`absolute top-0 right-0 w-20 h-20 ${netAmount >= 0 ? 'bg-blue-500/10' : 'bg-orange-500/10'} rounded-full blur-2xl`}></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`h-8 w-8 ${netAmount >= 0 ? 'bg-blue-500' : 'bg-orange-500'} rounded-full flex items-center justify-center`}>
                    {netAmount >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-white" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <span className={`text-sm font-medium ${netAmount >= 0 ? 'text-blue-700 dark:text-blue-300' : 'text-orange-700 dark:text-orange-300'}`}>Net Amount</span>
                </div>
                <p className={`text-2xl font-bold ${netAmount >= 0 ? 'text-blue-900 dark:text-blue-100' : 'text-orange-900 dark:text-orange-100'}`}>
                  {netAmount >= 0 ? '+' : ''}₺{netAmount.toLocaleString()}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`h-2 w-2 ${netAmount >= 0 ? 'bg-blue-500' : 'bg-orange-500'} rounded-full animate-pulse`}></div>
                  <span className={`text-xs ${netAmount >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                    {netAmount >= 0 ? 'Positive cash flow' : 'Negative cash flow'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quick Actions</h4>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 hover:bg-primary/10 border-primary/20">
                <Calendar className="h-4 w-4" />
                Date Range
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 hover:bg-primary/10 border-primary/20">
                <Filter className="h-4 w-4" />
                Categories
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 hover:bg-primary/10 border-primary/20">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Advanced Filters Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-muted/30 to-muted/20 border-y border-muted/30">
          <div className="flex flex-wrap items-center gap-6">
            {/* Period Selector */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                </div>
                <span className="text-sm font-semibold text-foreground">Time Period</span>
              </div>
              <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
                {[
                  { value: "week", label: "7 Days", icon: "📅" },
                  { value: "month", label: "30 Days", icon: "📆" },
                  { value: "quarter", label: "3 Months", icon: "📊" },
                  { value: "year", label: "1 Year", icon: "📈" }
                ].map((period) => (
                  <Button
                    key={period.value}
                    variant={selectedPeriod === period.value ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onPeriodChange(period.value as any)}
                    className={`text-xs px-3 py-2 h-8 transition-all duration-200 ${
                      selectedPeriod === period.value 
                        ? "shadow-sm bg-primary text-primary-foreground" 
                        : "hover:bg-muted/100"
                    }`}
                  >
                    <span className="mr-1">{period.icon}</span>
                    {period.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Transaction Type Selector */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-sm font-semibold text-foreground">Transaction Type</span>
              </div>
              <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
                {[
                  { value: "all", label: "All", icon: "💰", color: "bg-gray-500" },
                  { value: "income", label: "Income", icon: "📈", color: "bg-green-500" },
                  { value: "expense", label: "Expense", icon: "📉", color: "bg-red-500" }
                ].map((type) => (
                  <Button
                    key={type.value}
                    variant={transactionFilter === type.value ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onFilterChange(type.value as any)}
                    className={`text-xs px-3 py-2 h-8 transition-all duration-200 relative ${
                      transactionFilter === type.value 
                        ? "shadow-sm bg-primary text-primary-foreground" 
                        : "hover:bg-muted/100"
                    }`}
                  >
                    <span className="mr-1">{type.icon}</span>
                    {type.label}
                    {transactionFilter === type.value && (
                      <div className={`absolute -top-1 -right-1 h-2 w-2 ${type.color} rounded-full animate-pulse`}></div>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Transaction Count Badge */}
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20">
                <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-primary">
                  {filteredTransactions.length.toLocaleString()} transactions
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Transaction List */}
        <div className="max-h-[500px] overflow-y-auto">
          {filteredTransactions.length > 0 ? (
            <div className="divide-y divide-muted/20">
              {filteredTransactions.map((transaction, index) => (
                <div 
                  key={transaction.id} 
                  className={`group relative overflow-hidden transition-all duration-300 hover:bg-muted/30 ${index === 0 ? '' : ''}`}
                >
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Enhanced Icon */}
                        <div className={`relative h-14 w-14 ${transaction.type === 'income' ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-red-400 to-red-600'} rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                          {transaction.type === "income" ? (
                            <ArrowDownLeft className="h-7 w-7 text-white" />
                          ) : (
                            <ArrowUpRight className="h-7 w-7 text-white" />
                          )}
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-background rounded-full flex items-center justify-center shadow-md">
                            <div className={`h-2 w-2 ${transaction.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'} rounded-full animate-pulse`}></div>
                          </div>
                        </div>
                        
                        {/* Transaction Details */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <p className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {transaction.merchant}
                            </p>
                            <Badge 
                              variant={transaction.status === 'completed' ? 'default' : 'secondary'} 
                              className="text-xs px-2 py-1 shadow-sm"
                            >
                              {transaction.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <div className={`w-2 h-2 ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>
                              {transaction.category}
                            </span>
                            {transaction.description && (
                              <span className="text-xs bg-muted/50 px-2 py-0.5 rounded-full">
                                {transaction.description}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Amount and Date */}
                      <div className="text-right">
                        <p className={`text-xl font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'} group-hover:scale-105 transition-transform`}>
                          {transaction.type === 'income' ? '+' : '-'}₺{Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(transaction.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons (shown on hover) */}
                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="relative inline-block">
                <div className="h-20 w-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ArrowDownLeft className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
                  <AlertTriangle className="h-3 w-3 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No Transactions Found</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                {transactionFilter === "all" 
                  ? "No transactions recorded for this period. Try selecting a different time range or check back later."
                  : `No ${transactionFilter} transactions found for this period. Try viewing all transactions or adjusting your filters.`
                }
              </p>
              <div className="flex gap-3 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => onFilterChange("all")}
                  className="gap-2"
                >
                  <Filter className="h-4 w-4" />
                  View All Transactions
                </Button>
                <Button 
                  variant="default"
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Transaction
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Advanced Footer */}
        {filteredTransactions.length > 0 && (
          <div className="bg-gradient-to-r from-muted/30 to-muted/20 p-4 border-t border-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="text-sm">
                  <span className="text-muted-foreground">Showing </span>
                  <span className="font-medium">{filteredTransactions.length}</span>
                  <span className="text-muted-foreground"> of {transactions.length} transactions</span>
                </div>
                <div className="h-4 w-px bg-muted-foreground/30"></div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span>{filteredTransactions.filter(t => t.type === 'income').length} income</span>
                  <div className="h-2 w-2 bg-red-500 rounded-full ml-2"></div>
                  <span>{filteredTransactions.filter(t => t.type === 'expense').length} expenses</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  Load More
                  <ArrowDownLeft className="h-4 w-4 ml-1" />
                </Button>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  View Full Report
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
