"use client"

import { Button } from "@/components/ui/button"
import { LucideIcon, Eye, Edit } from "lucide-react"

interface TransactionItemProps {
  name: string
  date: string
  amount: number
  icon: LucideIcon
  color: string
  category: string
}

export function TransactionItem({
  name,
  date,
  amount,
  icon: Icon,
  color,
  category
}: TransactionItemProps) {
  const isExpense = amount < 0
  
  return (
    <div className="group grid grid-cols-[auto,1fr,auto] items-center gap-4 p-4 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium">{name}</p>
          <div className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
            {category}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className={`text-right font-bold ${isExpense ? "text-red-600" : "text-green-600"}`}>
          {amount > 0 ? '+' : ''}₺{Math.abs(amount).toFixed(2)}
        </p>
        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground hover:bg-accent">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground hover:bg-accent">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
