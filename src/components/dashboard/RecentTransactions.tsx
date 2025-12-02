"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { TransactionItem } from "./TransactionItem"
import { ShoppingCart, DollarSign, CreditCard } from "lucide-react"

const transactions = [
  { name: "Market Alışverişi", date: "Bugün, 14:32", amount: -342.75, icon: ShoppingCart, color: "text-red-600", category: "Gıda" },
  { name: "Restoran", date: "Dün, 19:54", amount: -480.00, icon: ShoppingCart, color: "text-red-600", category: "Yeme-İçme" },
  { name: "Maaş Yatırıldı", date: "2 gün önce", amount: 12500.00, icon: DollarSign, color: "text-green-600", category: "Gelir" },
  { name: "Elektrik Faturası", date: "3 gün önce", amount: -560.10, icon: CreditCard, color: "text-red-600", category: "Faturalar" },
  { name: "Streaming Aboneliği", date: "4 gün önce", amount: -99.99, icon: CreditCard, color: "text-red-600", category: "Abonelikler" },
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Son İşlemler</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" className="text-primary hover:text-primary/80" asChild>
              <Link href="/transactions">
                Tümünü Gör
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {transactions.map((transaction, index) => (
            <TransactionItem key={index} {...transaction} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
