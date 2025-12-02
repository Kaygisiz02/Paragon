"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Target, Calendar, AlertTriangle } from "lucide-react"

interface AddBudgetModalProps {
  isOpen: boolean
  onClose: () => void
  onAddBudget: (budgetData: {
    name: string
    description?: string
    limit: number
    spent?: number
    category: string
    period: "monthly" | "weekly" | "yearly"
    alertThreshold?: number
  }) => void
}

const categories = [
  "Food", "Transport", "Shopping", "Entertainment", "Utilities", 
  "Health", "Education", "Travel", "Insurance", "Other"
]

const periods = [
  { value: "weekly", label: "Weekly", days: 7 },
  { value: "monthly", label: "Monthly", days: 30 },
  { value: "yearly", label: "Yearly", days: 365 }
]

export function AddBudgetModal({ isOpen, onClose, onAddBudget }: AddBudgetModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [limit, setLimit] = useState("")
  const [spent, setSpent] = useState("")
  const [category, setCategory] = useState("")
  const [period, setPeriod] = useState<"monthly" | "weekly" | "yearly">("monthly")
  const [alertThreshold, setAlertThreshold] = useState("85")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (name.trim() && limit && category) {
      const budgetData = {
        name: name.trim(),
        description: description.trim() || undefined,
        limit: parseFloat(limit),
        spent: spent ? parseFloat(spent) : 0,
        category,
        period,
        alertThreshold: alertThreshold ? parseFloat(alertThreshold) : 85
      }

      onAddBudget(budgetData)
      
      // Reset form
      setName("")
      setDescription("")
      setLimit("")
      setSpent("")
      setCategory("")
      setPeriod("monthly")
      setAlertThreshold("85")
      
      onClose()
    }
  }

  const getEstimatedMonthly = () => {
    if (!limit) return 0
    const limitNum = parseFloat(limit)
    const periodData = periods.find(p => p.value === period)
    return periodData ? Math.round((limitNum / periodData.days) * 30) : 0
  }

  const getRecommendation = (categoryName: string, periodType: string) => {
    const recommendations: Record<string, Record<string, number>> = {
      "Food": { "weekly": 150, "monthly": 600, "yearly": 7200 },
      "Transport": { "weekly": 80, "monthly": 350, "yearly": 4200 },
      "Shopping": { "weekly": 100, "monthly": 400, "yearly": 4800 },
      "Entertainment": { "weekly": 60, "monthly": 250, "yearly": 3000 },
      "Utilities": { "weekly": 70, "monthly": 300, "yearly": 3600 },
      "Health": { "weekly": 40, "monthly": 180, "yearly": 2160 },
      "Education": { "weekly": 50, "monthly": 200, "yearly": 2400 },
      "Travel": { "weekly": 30, "monthly": 120, "yearly": 1440 },
      "Insurance": { "weekly": 50, "monthly": 200, "yearly": 2400 },
      "Other": { "weekly": 75, "monthly": 300, "yearly": 3600 }
    }
    
    return recommendations[categoryName]?.[periodType] || 0
  }

  const recommendation = getRecommendation(category, period)
  const isOverRecommended = limit && parseFloat(limit) > recommendation * 1.5
  const isUnderRecommended = limit && parseFloat(limit) < recommendation * 0.5

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Budget
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Budget Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Groceries & Food"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description (Optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what this budget covers..."
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={2}
                />
              </div>
            </div>

            {/* Budget Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Budget Limit *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₺</span>
                  <input
                    type="number"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    placeholder="500"
                    className="pl-8 pr-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full"
                  />
                </div>
                {recommendation > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    💡 Recommended: ₺{recommendation.toLocaleString()}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Current Spent (Optional)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₺</span>
                  <input
                    type="number"
                    value={spent}
                    onChange={(e) => setSpent(e.target.value)}
                    placeholder="0"
                    className="pl-8 pr-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full"
                  />
                </div>
              </div>
            </div>

            {/* Category and Period */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Period *</label>
                <div className="flex gap-2">
                  {periods.map((periodOption) => (
                    <Button
                      key={periodOption.value}
                      type="button"
                      variant={period === periodOption.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPeriod(periodOption.value as any)}
                      className="flex-1"
                    >
                      {periodOption.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Alert Threshold */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Alert Threshold (%)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(e.target.value)}
                  placeholder="85"
                  min="50"
                  max="100"
                  className="w-24 px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">
                  Send alert when budget reaches this percentage
                </span>
              </div>
            </div>

            {/* Budget Preview */}
            {name && limit && category && (
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Budget Preview
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium">{name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Limit</p>
                    <p className="font-medium">₺{parseFloat(limit).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Period</p>
                    <p className="font-medium capitalize">{period}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Monthly Est.</p>
                    <p className="font-medium">₺{getEstimatedMonthly().toLocaleString()}</p>
                  </div>
                </div>
                
                {/* Warnings */}
                {isOverRecommended && (
                  <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-xs text-yellow-800">
                      Budget is 50% higher than recommended amount
                    </span>
                  </div>
                )}
                
                {isUnderRecommended && (
                  <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-blue-600" />
                    <span className="text-xs text-blue-800">
                      Budget is 50% lower than recommended amount
                    </span>
                  </div>
                )}

                {spent && parseFloat(spent) > parseFloat(limit) && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-xs text-red-800">
                      Current spending exceeds budget limit
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!name.trim() || !limit || !category}
              >
                Create Budget
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
