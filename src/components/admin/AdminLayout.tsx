"use client"

import { ReactNode, useState, useEffect } from "react"
import "@/styles/admin.css"
import AdminSidebar from "./AdminSidebar"
import AdminHeader from "./AdminHeader"

interface AdminLayoutProps {
  children: ReactNode
  title: string
  icon: React.ComponentType<{ className?: string }>
  currentPage: string
  searchPlaceholder?: string
  searchTerm?: string
  onSearchChange?: (value: string) => void
  actionButtons?: ReactNode
  isDarkMode?: boolean
  onThemeToggle?: () => void
}

export default function AdminLayout({
  children,
  title,
  icon: Icon,
  currentPage,
  searchPlaceholder,
  searchTerm,
  onSearchChange,
  actionButtons,
  isDarkMode = true,
  onThemeToggle
}: AdminLayoutProps) {
  const [localDarkMode, setLocalDarkMode] = useState(isDarkMode)

  const handleThemeToggle = () => {
    const newMode = !localDarkMode
    setLocalDarkMode(newMode)
    if (newMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    onThemeToggle?.()
  }

  // Initialize theme on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setLocalDarkMode(isDark)
  }, [])
  return (
    <div className={`min-h-screen font-display ${localDarkMode ? "dark bg-[#102216]" : "bg-[#f6f8f6]"}`}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className={`flex h-screen w-64 flex-col justify-between p-4 fixed left-0 top-0 ${
          localDarkMode ? "bg-[#112217]" : "bg-white border-r border-gray-200"
        }`}>
          <AdminSidebar currentPage={currentPage} isDarkMode={localDarkMode} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64">
          {/* Header */}
          <header className={`flex items-center justify-between whitespace-nowrap px-10 py-3 sticky top-0 backdrop-blur-sm z-10 border-b ${
            localDarkMode 
              ? "bg-[#112217]/80 border-[#23482f]" 
              : "bg-white/80 border-gray-200"
          }`}>
            <AdminHeader
              title={title}
              icon={Icon}
              searchPlaceholder={searchPlaceholder}
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              actionButtons={actionButtons}
              isDarkMode={localDarkMode}
              onThemeToggle={handleThemeToggle}
            />
          </header>

          {/* Page Content */}
          <div className="p-10">
            <div className="admin-fade-in max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
