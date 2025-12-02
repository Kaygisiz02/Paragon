"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Plus, CreditCard as AddCard, Target, PiggyBank } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Hızlı İşlemler
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Ana İşlemler */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Finansal İşlemler</h4>
          <Button className="w-full bg-primary text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 hover:bg-primary/90" asChild>
            <Link href="/transactions?action=add">
              <Plus className="h-4 w-4 mr-2" />
              Yeni İşlem Ekle
            </Link>
          </Button>
          <Button variant="outline" className="w-full text-foreground border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20" asChild>
            <Link href="/cards?action=add">
              <AddCard className="h-4 w-4 mr-2" />
              Kart Ekle
            </Link>
          </Button>
        </div>

        {/* Bütçe ve Hedefler */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Bütçe & Hedefler</h4>
          <Button variant="outline" className="w-full text-foreground border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20" asChild>
            <Link href="/budgets?action=add">
              <Target className="h-4 w-4 mr-2" />
              Bütçe Oluştur
            </Link>
          </Button>
          <Button variant="outline" className="w-full text-foreground border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20" asChild>
            <Link href="/goals?action=add">
              <PiggyBank className="h-4 w-4 mr-2" />
              Hedef Belirle
            </Link>
          </Button>
        </div>

        {/* Analiz ve Raporlar */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Analiz & Raporlar</h4>
          <Button variant="outline" className="w-full text-foreground border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20" asChild>
            <Link href="/dashboard/categories">
              <Target className="h-4 w-4 mr-2" />
              Kategori Analizi
            </Link>
          </Button>
          <Button variant="outline" className="w-full text-foreground border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20" asChild>
            <Link href="/dashboard/expenses">
              <Plus className="h-4 w-4 mr-2" />
              Harcama Raporu
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
