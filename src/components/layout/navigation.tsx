"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  CreditCard, 
  PieChart, 
  User, 
  Menu, 
  X,
  TrendingUp,
  Wallet,
  FileText,
  Layers,
  Settings,
  ChevronDown,
  ChevronRight,
  User as UserIcon,
  Shield,
  Bell,
  CreditCard as CreditCardIcon,
  Lock
} from "lucide-react"

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Cards", href: "/cards", icon: CreditCard },
  { name: "Transactions", href: "/transactions", icon: FileText },
  { name: "Goals", href: "/goals", icon: PieChart },
  { name: "Budgets", href: "/budgets", icon: Wallet },
  { name: "Categories", href: "/categories", icon: Layers },
]

const settingsSubmenu = [
  { name: "Profil", href: "/settings/profile", icon: UserIcon },
  { name: "Tercihler", href: "/settings/preferences", icon: Bell },
  { name: "Güvenlik", href: "/settings/security", icon: Shield },
  { name: "Oturumlar", href: "/settings/sessions", icon: CreditCardIcon },
  { name: "Gizlilik", href: "/settings/privacy", icon: Lock },
]

export function Navigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const pathname = usePathname()

  const isSettingsPage = pathname.startsWith("/settings")
  const isSettingsSubmenuActive = settingsSubmenu.some(item => pathname === item.href)

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex lg:flex-col lg:h-screen",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Paragon</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md",
                    isActive
                      ? "bg-green-500 text-white shadow-lg shadow-green-500/20 dark:bg-green-600 dark:text-white dark:shadow-green-600/20"
                      : "text-muted-foreground hover:bg-green-50 hover:text-green-600 hover:shadow-green-100/50 dark:text-gray-400 dark:hover:bg-green-950/50 dark:hover:text-green-400"
                  )}
                >
                  <item.icon className="h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:text-green-600 dark:group-hover:text-green-400" />
                  <span className="transition-colors duration-300 group-hover:text-green-600 dark:group-hover:text-green-400">{item.name}</span>
                </Link>
              )
            })}

            {/* Settings with submenu */}
            <div className="space-y-1">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className={cn(
                  "group flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md",
                  isSettingsPage || settingsOpen
                    ? "bg-green-500 text-white shadow-lg shadow-green-500/20 dark:bg-green-600 dark:text-white dark:shadow-green-600/20"
                    : "text-muted-foreground hover:bg-green-50 hover:text-green-600 hover:shadow-green-100/50 dark:text-gray-400 dark:hover:bg-green-950/50 dark:hover:text-green-400"
                )}
              >
                <div className="flex items-center space-x-3">
                  <Settings className={cn(
                    "h-5 w-5 transition-all duration-300",
                    isSettingsPage || settingsOpen
                      ? "text-white"
                      : "group-hover:scale-110 group-hover:text-green-600 dark:group-hover:text-green-400"
                  )} />
                  <span className={cn(
                    "transition-colors duration-300",
                    isSettingsPage || settingsOpen
                      ? "text-white"
                      : "group-hover:text-green-600 dark:group-hover:text-green-400"
                  )}>Settings</span>
                </div>
                {settingsOpen ? (
                  <ChevronDown className="h-4 w-4 text-white transition-transform duration-300" />
                ) : (
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    isSettingsPage || settingsOpen
                      ? "text-white"
                      : "group-hover:text-green-600 dark:group-hover:text-green-400"
                  )} />
                )}
              </button>

              {/* Settings Submenu */}
              <div className={cn(
                "ml-4 space-y-1 overflow-hidden transition-all duration-300",
                settingsOpen || isSettingsPage ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}>
                {settingsSubmenu.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md",
                        isActive
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "text-muted-foreground hover:bg-green-50 hover:text-green-600 dark:text-gray-400 dark:hover:bg-green-950/50 dark:hover:text-green-400"
                      )}
                    >
                      <item.icon className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:text-green-600 dark:group-hover:text-green-400" />
                      <span className="transition-colors duration-300 group-hover:text-green-600 dark:group-hover:text-green-400">{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>

          {/* User section */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <User className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-foreground dark:text-white">John Doe</p>
                <p className="text-xs text-muted-foreground truncate dark:text-gray-400">john@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </>
  )
}
