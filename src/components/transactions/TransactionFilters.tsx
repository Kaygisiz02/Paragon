"use client"

import { useState } from "react"
import { Calendar, Filter, Search, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Transaction } from "./TransactionAnalytics"

interface TransactionFiltersProps {
  transactions: Transaction[]
  onFilterChange: (filters: TransactionFilters) => void
}

export interface TransactionFilters {
  search: string
  categories: string[]
  dateRange: {
    start: string
    end: string
  }
  amountRange: {
    min: number
    max: number
  }
  status: string[]
}

const CATEGORIES = [
  "Food & Dining",
  "Shopping", 
  "Transportation",
  "Entertainment",
  "Groceries",
  "Income",
  "Bills & Utilities",
  "Healthcare",
  "Education",
  "Other"
]

const STATUSES = ["completed", "pending", "failed"]

export function TransactionFilters({ transactions, onFilterChange }: TransactionFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<TransactionFilters>({
    search: "",
    categories: [],
    dateRange: { start: "", end: "" },
    amountRange: { min: 0, max: 10000 },
    status: []
  })

  const updateFilters = (newFilters: Partial<TransactionFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const toggleCategory = (category: string) => {
    const categories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category]
    updateFilters({ categories })
  }

  const toggleStatus = (status: string) => {
    const statusList = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status]
    updateFilters({ status: statusList })
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      search: "",
      categories: [],
      dateRange: { start: "", end: "" },
      amountRange: { min: 0, max: 10000 },
      status: []
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const activeFilterCount = [
    filters.search,
    filters.categories.length,
    filters.dateRange.start || filters.dateRange.end,
    (filters.amountRange.min > 0 || filters.amountRange.max < 10000) ? 1 : 0,
    filters.status.length
  ].filter(Boolean).length

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Filter className="h-5 w-5 text-primary" />
              {activeFilterCount > 0 && (
                <div className="absolute -top-2 -right-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">{activeFilterCount}</span>
                </div>
              )}
            </div>
            <CardTitle className="text-lg">Advanced Filters</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-muted-foreground">
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary"
            >
              {isExpanded ? "Hide" : "Show"} Filters
              <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Search Transactions</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by merchant, category, or description..."
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Categories</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Badge
                  key={category}
                  variant={filters.categories.includes(category) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => updateFilters({ 
                    dateRange: { ...filters.dateRange, start: e.target.value }
                  })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => updateFilters({ 
                    dateRange: { ...filters.dateRange, end: e.target.value }
                  })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          {/* Amount Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount Range (₺)</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Min"
                value={filters.amountRange.min || ""}
                onChange={(e) => updateFilters({ 
                  amountRange: { ...filters.amountRange, min: Number(e.target.value) || 0 }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.amountRange.max || ""}
                onChange={(e) => updateFilters({ 
                  amountRange: { ...filters.amountRange, max: Number(e.target.value) || 10000 }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((status) => (
                <Badge
                  key={status}
                  variant={filters.status.includes(status) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => toggleStatus(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
