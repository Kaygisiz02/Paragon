"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus, ShoppingCart, TrendingUp } from "lucide-react"

interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onAddCategory: (type: "expense" | "income", name: string, description: string) => void
}

export function AddCategoryModal({ isOpen, onClose, onAddCategory }: AddCategoryModalProps) {
  const [type, setType] = useState<"expense" | "income">("expense")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onAddCategory(type, name.trim(), description.trim())
      setName("")
      setDescription("")
      setType("expense")
      onClose()
    }
  }

  const getAutoDescription = (categoryName: string, categoryType: "expense" | "income") => {
    const name = categoryName.toLowerCase()
    
    if (categoryType === "expense") {
      if (name.includes("food") || name.includes("grocer") || name.includes("restaurant") || name.includes("yemek")) {
        return "Food and grocery expenses including restaurants, supermarkets, and delivery"
      } else if (name.includes("rent") || name.includes("mortgage") || name.includes("kira")) {
        return "Monthly housing payments including rent, mortgage, and property fees"
      } else if (name.includes("transport") || name.includes("gas") || name.includes("car") || name.includes("ulaşım")) {
        return "Transportation expenses including gas, public transit, ride-sharing, and vehicle maintenance"
      } else if (name.includes("shop") || name.includes("clothes") || name.includes("shopping") || name.includes("alışveriş")) {
        return "Shopping expenses including clothing, electronics, and personal items"
      } else if (name.includes("health") || name.includes("doctor") || name.includes("medicine") || name.includes("sağlık")) {
        return "Healthcare expenses including doctor visits, medications, and medical supplies"
      } else if (name.includes("entertainment") || name.includes("movie") || name.includes("game") || name.includes("eğlence")) {
        return "Entertainment expenses including movies, games, concerts, and hobbies"
      } else if (name.includes("bill") || name.includes("utility") || name.includes("electric") || name.includes("fatura")) {
        return "Monthly bills and utilities including electricity, water, internet, and phone"
      } else if (name.includes("education") || name.includes("course") || name.includes("book") || name.includes("eğitim")) {
        return "Education expenses including courses, books, tuition fees, and learning materials"
      } else if (name.includes("travel") || name.includes("hotel") || name.includes("vacation") || name.includes("seyahat")) {
        return "Travel expenses including flights, hotels, accommodation, and vacation costs"
      } else if (name.includes("insurance") || name.includes("sigorta")) {
        return "Insurance premiums and coverage including health, auto, and life insurance"
      } else if (name.includes("pet") || name.includes("animal") || name.includes("evcil")) {
        return "Pet-related expenses including food, veterinary care, and supplies"
      } else {
        return `General expense category for ${categoryName}`
      }
    } else {
      // Income kategorileri
      if (name.includes("salary") || name.includes("wage") || name.includes("maaş")) {
        return "Regular employment income including salary, wages, and base compensation"
      } else if (name.includes("freelance") || name.includes("contract") || name.includes("consult")) {
        return "Income from freelance work, consulting, and independent contract projects"
      } else if (name.includes("invest") || name.includes("dividend") || name.includes("stock") || name.includes("yatırım")) {
        return "Investment income including dividends, capital gains, and portfolio returns"
      } else if (name.includes("business") || name.includes("company") || name.includes("own") || name.includes("iş")) {
        return "Business income from self-employment, entrepreneurship, and business operations"
      } else if (name.includes("rental") || name.includes("property") || name.includes("real") || name.includes("kira")) {
        return "Rental income from real estate properties, apartments, and rental investments"
      } else if (name.includes("bonus") || name.includes("reward") || name.includes("prim")) {
        return "Bonus and reward income including performance bonuses, incentives, and extra compensation"
      } else if (name.includes("gift") || name.includes("present") || name.includes("hediye")) {
        return "Gift income including monetary gifts, presents, and financial gifts from others"
      } else if (name.includes("interest") || name.includes("saving") || name.includes("faiz")) {
        return "Interest income from savings accounts, CDs, and interest-bearing investments"
      } else if (name.includes("royalty") || name.includes("copyright") || name.includes("creative")) {
        return "Royalty income from creative works, intellectual property, and licensing agreements"
      } else if (name.includes("pension") || name.includes("retirement") || name.includes("emekli")) {
        return "Retirement and pension income including social security, retirement plans, and annuities"
      } else if (name.includes("side") || name.includes("extra") || name.includes("additional") || name.includes("ek")) {
        return "Side hustle and additional income from part-time work, gig economy, and extra jobs"
      } else if (name.includes("online") || name.includes("digital") || name.includes("internet")) {
        return "Online and digital income including e-commerce, digital products, and online services"
      } else {
        return `General income category for ${categoryName}`
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Yeni Kategori Ekle
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type Selection */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant={type === "expense" ? "default" : "outline"}
                onClick={() => setType("expense")}
                className="flex-1"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Harcama
              </Button>
              <Button
                type="button"
                variant={type === "income" ? "default" : "outline"}
                onClick={() => setType("income")}
                className="flex-1"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Gelir
              </Button>
            </div>

            {/* Name Input */}
            <div>
              <label className="text-sm font-medium mb-2 block">Kategori Adı</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Kategori adını girin..."
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="text-sm font-medium mb-2 block">Açıklama (İsteğe Bağlı)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Açıklama girin veya otomatik oluşturulmasını bekleyin..."
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                💡 İpucu: Açıklama boş bırakılırsa otomatik olarak oluşturulur
              </p>
            </div>

            {/* Auto Description Preview */}
            {name && !description && (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-xs font-medium text-muted-foreground mb-1">Otomatik Açıklama:</p>
                <p className="text-sm">{getAutoDescription(name, type)}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                İptal
              </Button>
              <Button type="submit" className="flex-1" disabled={!name.trim()}>
                Ekle
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
