"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, TrendingUp, TrendingDown, MoreHorizontal, Target, Zap } from "lucide-react"
import { Category } from "@/hooks/useCategories"
import { cn } from "@/lib/utils"

interface CategoryCardProps {
  category: Category
  onEdit: (category: Category) => void
  onDelete: (categoryId: string) => void
  isHighestExpense?: boolean
  isHighestIncome?: boolean
  onOptimize?: (categoryId: string) => void
}

export function CategoryCard({ 
  category, 
  onEdit, 
  onDelete, 
  isHighestExpense = false, 
  isHighestIncome = false,
  onOptimize
}: CategoryCardProps) {
  const isExpense = category.type === "expense"
  
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer",
      "border-2 hover:border-primary/50",
      isHighestExpense || isHighestIncome 
        ? "ring-2 ring-primary ring-offset-2 border-primary/30" 
        : "border-border"
    )}>
      {/* Gradient Background */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-30",
        isExpense 
          ? "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20" 
          : "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
      )} />
      
      {/* Badge for highest */}
      {(isHighestExpense || isHighestIncome) && (
        <div className="absolute top-2 right-2 z-10">
          <div className={cn(
            "px-2 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1",
            isHighestExpense ? "bg-red-500" : "bg-green-500"
          )}>
            <Target className="h-3 w-3" />
            {isHighestExpense ? "En Yüksek Gider" : "En Yüksek Gelir"}
          </div>
        </div>
      )}
      
      <CardHeader className="relative pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg",
              isExpense 
                ? "bg-red-500 shadow-red-500/30" 
                : "bg-green-500 shadow-green-500/30"
            )}>
              {category.icon ? (
                <category.icon className="h-6 w-6 text-white" />
              ) : (
                <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {category.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-foreground dark:text-white group-hover:text-primary transition-colors">
                {category.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2">
                {category.description}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="relative pt-0">
        <div className="space-y-4">
          {/* Amount and Trend */}
          <div className="flex items-center justify-between">
            <div>
              <p className={cn(
                "text-2xl font-bold transition-colors",
                isExpense ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
              )}>
                {isExpense ? "-" : "+"}₺{category.totalAmount.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Ortalama: ₺{category.monthlyAverage.toLocaleString()}/ay
              </p>
            </div>
            <div className="flex items-center gap-1">
              {isExpense ? (
                <TrendingDown className="h-4 w-4 text-red-500 dark:text-red-400" />
              ) : (
                <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />
              )}
              <span className={cn(
                "text-sm font-medium",
                isExpense ? "text-red-500 dark:text-red-400" : "text-green-500 dark:text-green-400"
              )}>
                {category.transactionCount} işlem
              </span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground dark:text-gray-400">
              <span>Yıllık Hedef</span>
              <span>{Math.round((category.totalAmount / (category.monthlyAverage * 12)) * 100)}%</span>
            </div>
            <div className="w-full bg-secondary dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className={cn(
                  "h-2 rounded-full transition-all duration-500 ease-out",
                  isExpense ? "bg-red-500 dark:bg-red-400" : "bg-green-500 dark:bg-green-400"
                )}
                style={{ width: `${Math.min((category.totalAmount / (category.monthlyAverage * 12)) * 100, 100)}%` }}
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(category)}
              className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
            {onOptimize && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onOptimize(category.id)}
                className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
              >
                <Zap className="h-4 w-4 mr-2" />
                Optimize
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDelete(category.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-200 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
