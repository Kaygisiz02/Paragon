"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  X, 
  Plus, 
  CreditCard, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react"

interface AddCardModalProps {
  isOpen: boolean
  onClose: () => void
  onAddCard: (cardData: {
    name: string
    type: "debit" | "credit" | "prepaid"
    cardNumber: string
    lastFour: string
    expiryDate: string
    cvv: string
    cardHolder: string
    balance: number
    availableCredit?: number
    creditLimit?: number
    issuer: "visa" | "mastercard" | "amex" | "discover"
    backgroundColor: string
    textColor: string
    isVirtual: boolean
    isContactless: boolean
    spendingLimit?: number
    security: {
      hasPin: boolean
      has2FA: boolean
      fraudAlerts: boolean
      internationalUsage: boolean
    }
  }) => void
}

const cardTypes = [
  { value: "debit", label: "Debit Card", icon: "💳", description: "Direct from your bank account" },
  { value: "credit", label: "Credit Card", icon: "💳", description: "Buy now, pay later" },
  { value: "prepaid", label: "Prepaid Card", icon: "💳", description: "Load and spend" }
]

const issuers = [
  { value: "visa", label: "Visa", color: "from-blue-600 to-blue-800" },
  { value: "mastercard", label: "Mastercard", color: "from-red-600 to-red-800" },
  { value: "amex", label: "American Express", color: "from-purple-600 to-purple-800" },
  { value: "discover", label: "Discover", color: "from-orange-600 to-orange-800" }
]

const securityFeatures = [
  { key: "hasPin", label: "PIN Protection", icon: Shield, description: "Secure with PIN" },
  { key: "has2FA", label: "Two-Factor Auth", icon: Shield, description: "Extra security layer" },
  { key: "fraudAlerts", label: "Fraud Alerts", icon: AlertTriangle, description: "Real-time monitoring" },
  { key: "internationalUsage", label: "International Usage", icon: Eye, description: "Use abroad" }
]

export function AddCardModal({ isOpen, onClose, onAddCard }: AddCardModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "debit" as "debit" | "credit" | "prepaid",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
    balance: "",
    availableCredit: "",
    creditLimit: "",
    issuer: "visa" as "visa" | "mastercard" | "amex" | "discover",
    isVirtual: false,
    isContactless: true,
    spendingLimit: "",
    security: {
      hasPin: true,
      has2FA: false,
      fraudAlerts: true,
      internationalUsage: true
    }
  })

  const [showCardNumber, setShowCardNumber] = useState(false)
  const [showCVV, setShowCVV] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Card name is required"
    if (!formData.cardNumber.replace(/\s/g, "").length || formData.cardNumber.replace(/\s/g, "").length < 13) {
      newErrors.cardNumber = "Valid card number is required"
    }
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Valid expiry date (MM/YY) is required"
    }
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "Valid CVV is required"
    }
    if (!formData.cardHolder.trim()) newErrors.cardHolder = "Cardholder name is required"
    if (!formData.balance || parseFloat(formData.balance) < 0) {
      newErrors.balance = "Valid initial balance is required"
    }
    if (formData.type === "credit" && (!formData.creditLimit || parseFloat(formData.creditLimit) <= 0)) {
      newErrors.creditLimit = "Credit limit is required for credit cards"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const issuer = issuers.find(i => i.value === formData.issuer)
    const backgroundColor = issuer?.color || "from-gray-600 to-gray-800"

    const cardData = {
      name: formData.name.trim(),
      type: formData.type,
      cardNumber: formData.cardNumber,
      lastFour: formData.cardNumber.replace(/\s/g, "").slice(-4),
      expiryDate: formData.expiryDate,
      cvv: formData.cvv,
      cardHolder: formData.cardHolder.toUpperCase(),
      balance: parseFloat(formData.balance),
      availableCredit: formData.type === "credit" ? parseFloat(formData.creditLimit || "0") - parseFloat(formData.balance) : undefined,
      creditLimit: formData.type === "credit" ? parseFloat(formData.creditLimit || "0") : undefined,
      issuer: formData.issuer,
      backgroundColor,
      textColor: "text-white",
      isVirtual: formData.isVirtual,
      isContactless: formData.isContactless,
      spendingLimit: formData.spendingLimit ? parseFloat(formData.spendingLimit) : undefined,
      security: formData.security
    }

    onAddCard(cardData)
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      name: "",
      type: "debit",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardHolder: "",
      balance: "",
      availableCredit: "",
      creditLimit: "",
      issuer: "visa",
      isVirtual: false,
      isContactless: true,
      spendingLimit: "",
      security: {
        hasPin: true,
        has2FA: false,
        fraudAlerts: true,
        internationalUsage: true
      }
    })
    setErrors({})
    setShowCardNumber(false)
    setShowCVV(false)
    onClose()
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ')
    return formatted.slice(0, 19)
  }

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4)
    }
    return cleaned
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Add New Card
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Card Type Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Card Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cardTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.type === type.value 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setFormData({ ...formData, type: type.value as any })}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{type.icon}</span>
                      <div>
                        <h4 className="font-medium">{type.label}</h4>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Card Information</h3>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Card Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Primary Checking"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Card Number *</label>
                  <div className="relative">
                    <input
                      type={showCardNumber ? "text" : "password"}
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 pr-10 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowCardNumber(!showCardNumber)}
                    >
                      {showCardNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {errors.cardNumber && <p className="text-sm text-red-600 mt-1">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Expiry Date *</label>
                    <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: formatExpiryDate(e.target.value) })}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.expiryDate && <p className="text-sm text-red-600 mt-1">{errors.expiryDate}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">CVV *</label>
                    <div className="relative">
                      <input
                        type={showCVV ? "text" : "password"}
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3 py-2 pr-10 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowCVV(!showCVV)}
                      >
                        {showCVV ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.cvv && <p className="text-sm text-red-600 mt-1">{errors.cvv}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Cardholder Name *</label>
                  <input
                    type="text"
                    value={formData.cardHolder}
                    onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
                    placeholder="JOHN DOE"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.cardHolder && <p className="text-sm text-red-600 mt-1">{errors.cardHolder}</p>}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Financial Details</h3>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Initial Balance * (₺)
                  </label>
                  <input
                    type="number"
                    value={formData.balance}
                    onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.balance && <p className="text-sm text-red-600 mt-1">{errors.balance}</p>}
                </div>

                {formData.type === "credit" && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Credit Limit * (₺)
                    </label>
                    <input
                      type="number"
                      value={formData.creditLimit}
                      onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                      placeholder="10000.00"
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.creditLimit && <p className="text-sm text-red-600 mt-1">{errors.creditLimit}</p>}
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium mb-2 block">Card Issuer</label>
                  <select
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value as any })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {issuers.map((issuer) => (
                      <option key={issuer.value} value={issuer.value}>
                        {issuer.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Monthly Spending Limit (₺)
                  </label>
                  <input
                    type="number"
                    value={formData.spendingLimit}
                    onChange={(e) => setFormData({ ...formData, spendingLimit: e.target.value })}
                    placeholder="5000.00"
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Card Features</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.isVirtual}
                        onChange={(e) => setFormData({ ...formData, isVirtual: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm">Virtual Card</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.isContactless}
                        onChange={(e) => setFormData({ ...formData, isContactless: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm">Contactless Payment</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Security Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {securityFeatures.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <div key={feature.key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{feature.label}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.security[feature.key as keyof typeof formData.security]}
                        onChange={(e) => setFormData({
                          ...formData,
                          security: {
                            ...formData.security,
                            [feature.key]: e.target.checked
                          }
                        })}
                        className="rounded"
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Card Preview */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Card Preview</h3>
              <div className={`relative w-full max-w-md mx-auto aspect-[1.586] bg-gradient-to-br ${issuers.find(i => i.value === formData.issuer)?.color || "from-gray-600 to-gray-800"} rounded-xl p-6 flex flex-col justify-between overflow-hidden shadow-lg`}>
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-white text-lg">Paragon</p>
                    <div className="w-8 h-5 bg-yellow-400 rounded-sm"></div>
                  </div>
                  <Badge variant="outline" className="text-white bg-white/20 border-white/30">
                    {formData.type}
                  </Badge>
                </div>
                
                <div className="text-white relative z-10">
                  <p className="font-mono text-lg tracking-widest">
                    {showCardNumber ? formData.cardNumber || "•••• •••• •••• ••••" : `•••• •••• •••• ${formData.cardNumber.slice(-4) || "••••"}`}
                  </p>
                  <div className="flex justify-between text-sm mt-3">
                    <p className="text-white/80">{formData.cardHolder || "CARD HOLDER"}</p>
                    <p className="text-white/80">EXP: {formData.expiryDate || "••/••"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Card
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
