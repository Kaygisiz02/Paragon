"use client"

import { useState } from "react"
import { Download, FileText, Mail, Share2, Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Transaction } from "./TransactionAnalytics"

interface TransactionExportProps {
  transactions: Transaction[]
  filters?: any
}

export function TransactionExport({ transactions, filters }: TransactionExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState<"csv" | "pdf" | "excel">("csv")

  const generateCSV = () => {
    const headers = ["Date", "Merchant", "Category", "Type", "Amount", "Status", "Description"]
    const csvContent = [
      headers.join(","),
      ...transactions.map(t => [
        new Date(t.date).toLocaleDateString(),
        t.merchant,
        t.category,
        t.type,
        t.amount,
        t.status,
        t.description || ""
      ].join(","))
    ].join("\n")

    return csvContent
  }

  const generateJSON = () => {
    return JSON.stringify(transactions, null, 2)
  }

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleExport = async (format: "csv" | "pdf" | "excel") => {
    setIsExporting(true)
    
    try {
      const timestamp = new Date().toISOString().split('T')[0]
      const filename = `transactions_${timestamp}`

      switch (format) {
        case "csv":
          const csvContent = generateCSV()
          downloadFile(csvContent, `${filename}.csv`, "text/csv")
          break
        case "pdf":
          // PDF generation would require a library like jsPDF
          console.log("PDF export would be implemented here")
          break
        case "excel":
          // Excel export would require a library like xlsx
          console.log("Excel export would be implemented here")
          break
      }
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleEmailExport = () => {
    const subject = "Transaction Export"
    const body = `Please find attached ${transactions.length} transactions exported on ${new Date().toLocaleDateString()}.`
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const totalTransactions = transactions.length
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const dateRange = transactions.length > 0 ? {
    start: new Date(Math.min(...transactions.map(t => new Date(t.date).getTime()))),
    end: new Date(Math.max(...transactions.map(t => new Date(t.date).getTime())))
  } : null

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Download className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Export Transactions</CardTitle>
              <p className="text-sm text-muted-foreground">Download or share your transaction data</p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Export Summary */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-medium mb-3">Export Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Transactions</p>
              <p className="font-semibold">{totalTransactions.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Income</p>
              <p className="font-semibold text-green-600">+₺{totalIncome.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Expense</p>
              <p className="font-semibold text-red-600">-₺{totalExpense.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Period</p>
              <p className="font-semibold">
                {dateRange ? 
                  `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}` :
                  "No data"
                }
              </p>
            </div>
          </div>
        </div>

        {/* Export Format Selection */}
        <div className="space-y-3">
          <h4 className="font-medium">Export Format</h4>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "csv", label: "CSV", icon: FileText, description: "Spreadsheet compatible" },
              { value: "pdf", label: "PDF", icon: FileText, description: "Print-friendly format" },
              { value: "excel", label: "Excel", icon: FileText, description: "Advanced spreadsheet" }
            ].map((format) => (
              <Button
                key={format.value}
                variant={exportFormat === format.value ? "default" : "outline"}
                onClick={() => setExportFormat(format.value as any)}
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                <format.icon className="h-6 w-6" />
                <div className="text-center">
                  <p className="font-medium">{format.label}</p>
                  <p className="text-xs text-muted-foreground">{format.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Export Actions */}
        <div className="space-y-3">
          <h4 className="font-medium">Export Actions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              onClick={() => handleExport(exportFormat)}
              disabled={isExporting || transactions.length === 0}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {isExporting ? "Exporting..." : `Download ${exportFormat.toUpperCase()}`}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleEmailExport}
              className="gap-2"
            >
              <Mail className="h-4 w-4" />
              Email Export
            </Button>
          </div>
        </div>

        {/* Share Options */}
        <div className="space-y-3">
          <h4 className="font-medium">Share Options</h4>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share Link
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Export
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Export with Filters
            </Button>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-medium">Advanced Options</h4>
              <p className="text-sm text-muted-foreground">
                Customize your export with additional options
              </p>
            </div>
            <Button variant="ghost" size="sm">
              Configure
            </Button>
          </div>
        </div>

        {/* Quick Export Templates */}
        <div className="space-y-3">
          <h4 className="font-medium">Quick Export Templates</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { name: "Monthly Report", description: "Last 30 days summary" },
              { name: "Tax Summary", description: "Year-to-date tax data" },
              { name: "Expense Report", description: "All expenses only" },
              { name: "Income Statement", description: "All income sources" }
            ].map((template, index) => (
              <Button
                key={template.name}
                variant="ghost"
                className="h-auto p-3 justify-start flex flex-col items-start"
              >
                <p className="font-medium text-sm">{template.name}</p>
                <p className="text-xs text-muted-foreground">{template.description}</p>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
