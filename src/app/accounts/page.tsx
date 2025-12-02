import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Plus, 
  CreditCard, 
  Wallet, 
  Building, 
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Eye
} from "lucide-react"

export default function AccountsPage() {
  return (
    <DashboardLayout 
      title="Accounts" 
      subtitle="Manage your bank accounts and cards"
    >
      <div className="space-y-6">
        {/* Account Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,458.00</div>
              <p className="text-xs text-muted-foreground">
                Across all accounts
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$5,420.00</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,240.00</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                2 banks, 2 cards
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Add Account Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Accounts</h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>

        {/* Bank Accounts */}
        <div className="space-y-4">
          <h3 className="text-md font-medium text-muted-foreground">Bank Accounts</h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Building className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Chase Checking</CardTitle>
                      <CardDescription>****1234</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Available Balance</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">$8,458.00</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last updated</span>
                    <span>2 minutes ago</span>
                  </div>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-500/10 to-transparent rounded-bl-full" />
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Building className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Bank of America Savings</CardTitle>
                      <CardDescription>****5678</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Available Balance</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">$4,000.00</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last updated</span>
                    <span>1 hour ago</span>
                  </div>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-green-500/10 to-transparent rounded-bl-full" />
            </Card>
          </div>
        </div>

        {/* Credit Cards */}
        <div className="space-y-4">
          <h3 className="text-md font-medium text-muted-foreground">Credit Cards</h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Amex Platinum</CardTitle>
                      <CardDescription>****9012</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Balance</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-red-600">$1,245.50</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Available Credit</span>
                    <span className="text-green-600">$48,754.50</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Credit Limit</span>
                    <span>$50,000.00</span>
                  </div>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-purple-500/10 to-transparent rounded-bl-full" />
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Chase Freedom</CardTitle>
                      <CardDescription>****3456</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Balance</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600">$0.00</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Available Credit</span>
                    <span className="text-green-600">$15,000.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Credit Limit</span>
                    <span>$15,000.00</span>
                  </div>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-orange-500/10 to-transparent rounded-bl-full" />
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
