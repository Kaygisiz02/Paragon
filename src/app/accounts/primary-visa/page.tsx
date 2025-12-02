import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  AlertTriangle,
  RefreshCw,
  ShoppingCart,
  Utensils,
  Train
} from "lucide-react"

export default function PrimaryVisaPage() {
  const transactions = [
    {
      name: "Amazon Marketplace",
      date: "Oct 12, 2023",
      amount: -78.50,
      icon: ShoppingCart
    },
    {
      name: "The Corner Bistro",
      date: "Oct 11, 2023",
      amount: -112.30,
      icon: Utensils
    },
    {
      name: "Metro Transit",
      date: "Oct 11, 2023",
      amount: -2.75,
      icon: Train
    }
  ]

  const spendingCategories = [
    { name: "Shopping", amount: 1260.30, percentage: 40, color: "bg-chart-orange" },
    { name: "Groceries", amount: 945.22, percentage: 30, color: "bg-chart-blue" },
    { name: "Food & Dining", amount: 630.15, percentage: 20, color: "bg-chart-red" },
    { name: "Transport", amount: 315.08, percentage: 10, color: "bg-primary" }
  ]

  const warnings = [
    {
      icon: AlertTriangle,
      title: "Unusually High Transaction",
      description: "A transaction of $1,250 at \"Luxury Goods\" is higher than your average spending.",
      color: "text-red-500",
      bgColor: "bg-red-500/10 dark:bg-red-500/20 border-red-500/20"
    },
    {
      icon: RefreshCw,
      title: "Multiple Transactions",
      description: "3 transactions were made at \"Coffee Corner\" in the last hour.",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20"
    }
  ]

  return (
    <DashboardLayout 
      title="Primary VISA" 
      subtitle="View detailed insights and manage your card"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 text-sm">
          <a href="/accounts" className="text-muted-foreground hover:underline">My Cards</a>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">Primary VISA</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex min-w-72 flex-col gap-2">
            <h1 className="text-4xl font-black tracking-tight">Primary VISA</h1>
            <p className="text-muted-foreground">View detailed insights and manage your card.</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="secondary">
              Manage Card
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              Pay Bill
            </Button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Card Display & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Visual */}
              <Card className="relative aspect-[1.586] bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl p-6 flex flex-col justify-between overflow-hidden shadow-lg">
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary/20 rounded-full blur-2xl"></div>
                
                <div className="flex justify-between items-start">
                  <p className="font-bold text-white text-xl">Paragon</p>
                  <svg fill="none" height="37" viewBox="0 0 60 37" width="60" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.4431 3.51888C21.0601 1.48625 18.9103 0.25 16.5 0.25H4.5C2.18973 0.25 0.25 2.18973 0.25 4.5V32.5C0.25 34.8103 2.18973 36.75 4.5 36.75H16.5C18.9103 36.75 21.0601 35.5138 22.4431 33.4811L33.7431 18.5Z" fill="#FF5F00"></path>
                    <path d="M59.75 18.5C59.75 28.3243 51.8243 36.25 42 36.25C32.1757 36.25 24.25 28.3243 24.25 18.5C24.25 8.67568 32.1757 0.75 42 0.75C51.8243 0.75 59.75 8.67568 59.75 18.5Z" fill="#EB001B"></path>
                    <path d="M42 36.5C32.022 36.5 24 28.478 24 18.5C24 8.52203 32.022 0.5 42 0.5C51.978 0.5 60 8.52203 60 18.5C60 28.478 51.978 36.5 42 36.5ZM42 1.00001C32.2992 1.00001 24.5 8.79921 24.5 18.5C24.5 28.2008 32.2992 36 42 36C51.7008 36 59.5 28.2008 59.5 18.5C59.5 8.79921 51.7008 1.00001 42 1.00001Z" fill="#F79E1B" stroke="#F79E1B" strokeWidth="0.5"></path>
                    <path d="M37.75 18.5C37.75 16.149 39.649 14.25 42 14.25C44.351 14.25 46.25 16.149 46.25 18.5C46.25 20.851 44.351 22.75 42 22.75C39.649 22.75 37.75 20.851 37.75 18.5Z" fill="#F79E1B"></path>
                  </svg>
                </div>
                
                <div className="text-white">
                  <p className="font-mono text-2xl tracking-widest">**** **** **** 1234</p>
                  <div className="flex justify-between text-sm mt-2">
                    <p>JOHN DOE</p>
                    <p>EXP: 12/26</p>
                  </div>
                </div>
              </Card>

              {/* Card Limit/Statement Status */}
              <Card className="p-6">
                <h2 className="text-lg font-bold mb-4">Kart limiti/ekstre durumu</h2>
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>Kullanılan</span>
                  <span>$3,150.75 / $10,000.00</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "31.5%" }}></div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-muted-foreground text-sm">Güncel Ekstre</p>
                    <p className="text-xl font-bold">$1,845.20</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Son Ödeme Tarihi</p>
                    <p className="text-xl font-bold">Oct 25, 2023</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Risky Spending Warnings */}
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">Riskli harcama uyarıları</h2>
              <div className="flex flex-col gap-3">
                {warnings.map((warning, index) => (
                  <div key={index} className={`flex items-center gap-4 p-4 rounded-lg border ${warning.bgColor}`}>
                    <warning.icon className={`h-5 w-5 ${warning.color}`} />
                    <div className="flex-1">
                      <p className="font-medium">{warning.title}</p>
                      <p className="text-sm text-muted-foreground">{warning.description}</p>
                    </div>
                    <Button variant="link" className="text-sm font-bold p-0 h-auto">
                      {index === 0 ? "Review" : "Details"}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Transactions */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Recent Transactions</h2>
                <Button variant="link" className="text-sm font-bold p-0 h-auto">
                  View All
                </Button>
              </div>
              <div className="flex flex-col">
                {transactions.map((transaction, index) => (
                  <div key={index} className={`flex items-center gap-4 py-3 ${index < transactions.length - 1 ? 'border-b' : ''}`}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                      <transaction.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{transaction.name}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <p className="font-bold">-${Math.abs(transaction.amount).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h2 className="text-lg font-bold mb-6">Kart bazlı harcama kırılımı</h2>
              
              {/* Donut Chart */}
              <div className="relative flex justify-center items-center mb-6">
                <svg className="transform -rotate-90" height="200" viewBox="0 0 36 36" width="200">
                  <circle 
                    className="stroke-secondary" 
                    cx="18" 
                    cy="18" 
                    fill="transparent" 
                    r="15.91549430918954" 
                    strokeWidth="3"
                  />
                  {spendingCategories.map((category, index) => {
                    const dashOffset = index === 0 ? 0 : spendingCategories.slice(0, index).reduce((acc, cat) => acc + cat.percentage, 0)
                    return (
                      <circle
                        key={index}
                        cx="18"
                        cy="18"
                        fill="transparent"
                        r="15.91549430918954"
                        className={category.color.replace('bg-', 'stroke-')}
                        strokeDasharray={`${category.percentage}, 100`}
                        strokeDashoffset={-dashOffset}
                        strokeWidth="3.2"
                      />
                    )
                  })}
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xs text-muted-foreground">Total Spent</span>
                  <span className="text-3xl font-bold">$3,150</span>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="flex flex-col gap-3 text-sm">
                {spendingCategories.map((category, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span className="text-muted-foreground">{category.name}</span>
                    </div>
                    <span className="font-medium">
                      ${category.amount.toFixed(2)} ({category.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
