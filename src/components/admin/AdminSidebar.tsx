"use client"

import { 
  LayoutDashboard,
  Group,
  ClipboardList,
  Tag,
  Monitor,
  Settings,
  HelpCircle,
  LogOut,
  Zap,
  BarChart3,
  Users
} from "lucide-react"
import { useRouter } from "next/navigation"

interface AdminSidebarProps {
  currentPage: string
  isDarkMode?: boolean
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "User Management", href: "/admin/users", icon: Group },
  { name: "System Logs", href: "/admin/logs", icon: ClipboardList },
  { name: "Metadata", href: "/admin/metadata", icon: Tag },
  { name: "Telemetry", href: "/admin/telemetry", icon: Monitor },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Support", href: "/admin/support", icon: HelpCircle },
  { name: "Log out", href: "/admin/logout", icon: LogOut }
]

export default function AdminSidebar({ currentPage, isDarkMode = true }: AdminSidebarProps) {
  const router = useRouter()

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* User Profile */}
      <div className="flex gap-3">
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <h1 className={`text-base font-medium leading-normal ${isDarkMode ? "text-white" : "text-gray-900"}`}>Admin Name</h1>
          <p className={`text-sm font-normal leading-normal ${isDarkMode ? "text-[#92c9a4]" : "text-gray-600"}`}>Administrator</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
              item.href === currentPage 
                ? isDarkMode 
                  ? "bg-[#23482f] text-white shadow-lg shadow-green-500/20" 
                  : "bg-green-100 text-green-700 shadow-lg shadow-green-500/20"
                : isDarkMode 
                  ? "hover:bg-[#23482f] text-white hover:shadow-md hover:shadow-green-500/10" 
                  : "hover:bg-gray-100 text-gray-700 hover:shadow-md hover:shadow-gray-300/30"
            }`}
          >
            <item.icon className="h-6 w-6 transition-all duration-300 group-hover:scale-110 group-hover:text-green-500" />
            <p className="text-sm font-medium leading-normal transition-colors duration-300 group-hover:text-green-600">{item.name}</p>
          </a>
        ))}
      </nav>
    </div>
  )
}
