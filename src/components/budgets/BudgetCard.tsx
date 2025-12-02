"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Target,
  DollarSign
} from "lucide-react"
import { Budget } from "@/hooks/useBudgets"
import { useState } from "react"

interface BudgetCardProps {
  budget: Budget
  onEdit?: (budget: Budget) => void
  onDelete?: (budgetId: string) => void
  onView?: (budget: Budget) => void
}

export function BudgetCard({ budget, onEdit, onDelete, onView }: BudgetCardProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const remaining = budget.limit - budget.spent
  const isOverBudget = remaining < 0
  const daysLeft = Math.ceil((new Date(budget.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  
  const getStatusColor = (status: Budget["status"]) => {
    switch (status) {
      case "on-track": return "text-green-600 bg-green-50 border-green-200"
      case "warning": return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "over-budget": return "text-red-600 bg-red-50 border-red-200"
      case "exceeded": return "text-red-700 bg-red-100 border-red-300"
      default: return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-red-500"
    if (percentage >= 85) return "bg-yellow-500"
    if (percentage >= 70) return "bg-blue-500"
    return "bg-green-500"
  }

  const getSpendingRate = () => {
    const daysPassed = Math.ceil((new Date().getTime() - new Date(budget.startDate).getTime()) / (1000 * 60 * 60 * 24))
    const totalDays = Math.ceil((new Date(budget.endDate).getTime() - new Date(budget.startDate).getTime()) / (1000 * 60 * 60 * 24))
    const expectedSpent = (daysPassed / totalDays) * budget.limit
    return (budget.spent / expectedSpent) * 100
  }

  const spendingRate = getSpendingRate()
  const isSpendingFast = spendingRate > 110

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group ${isOverBudget ? 'border-red-200' : ''}`}>
      {/* Status Indicator */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${getProgressColor(budget.percentage)}`} />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{budget.name}</h3>
              <Badge variant="outline" className={getStatusColor(budget.status)}>
                {budget.status === "on-track" && <Target className="h-3 w-3 mr-1" />}
                {budget.status === "warning" && <AlertTriangle className="h-3 w-3 mr-1" />}
                {budget.status === "over-budget" && <AlertTriangle className="h-3 w-3 mr-1" />}
                {budget.status}
              </Badge>
            </div>
            {budget.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{budget.description}</p>
            )}
          </div>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-1 w-32 bg-background rounded-lg shadow-lg border z-10">
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-t-lg"
                  onClick={() => { onView?.(budget); setShowDropdown(false) }}
                >
                  <Target className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => { onEdit?.(budget); setShowDropdown(false) }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 rounded-b-lg hover:bg-red-50"
                  onClick={() => { onDelete?.(budget.id); setShowDropdown(false) }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className={`text-sm font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
              {budget.percentage}%
            </span>
          </div>
          <Progress value={Math.min(budget.percentage, 100)} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="font-medium">₺{budget.spent.toLocaleString()}</span>
            <span className="text-muted-foreground">₺{budget.limit.toLocaleString()}</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Remaining</span>
            </div>
            <span className={`font-bold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
              {isOverBudget ? '+' : ''}₺{Math.abs(remaining).toLocaleString()}
            </span>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Days Left</span>
            </div>
            <span className={`font-bold ${daysLeft <= 7 ? 'text-red-600' : 'text-green-600'}`}>
              {daysLeft}
            </span>
          </div>
        </div>

        {/* Spending Rate Alert */}
        {isSpendingFast && (
          <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <TrendingUp className="h-4 w-4 text-yellow-600" />
            <span className="text-xs text-yellow-800">
              Spending {Math.round(spendingRate)}% faster than planned
            </span>
          </div>
        )}

        {/* Over Budget Alert */}
        {isOverBudget && (
          <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <span className="text-xs text-red-800">
              Over budget by ₺{Math.abs(remaining).toLocaleString()}
            </span>
          </div>
        )}

        {/* Category and Period */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{budget.category}</span>
          <span className="capitalize">{budget.period}</span>
        </div>
      </CardContent>
    </Card>
  )
}
