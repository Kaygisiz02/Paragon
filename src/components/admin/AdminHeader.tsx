"use client"

import { Search, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface AdminHeaderProps {
  title: string
  icon: React.ComponentType<{ className?: string }>
  searchPlaceholder?: string
  searchTerm?: string
  onSearchChange?: (value: string) => void
  actionButtons?: React.ReactNode
  isDarkMode?: boolean
  onThemeToggle?: () => void
}

export default function AdminHeader({ 
  title, 
  icon: Icon, 
  searchPlaceholder = "Search...", 
  searchTerm = "", 
  onSearchChange,
  actionButtons,
  isDarkMode = true,
  onThemeToggle
}: AdminHeaderProps) {
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
    <div className="flex items-center gap-8">
      <div className={`flex items-center gap-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        <div className="size-6 text-green-500 transition-transform duration-300 hover:scale-110 hover:rotate-12">
          <Icon className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] transition-colors duration-300">{title}</h2>
      </div>
      
      {/* Search */}
      {onSearchChange && (
        <div className="relative group">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-all duration-300 group-hover:scale-110 ${
            isDarkMode ? "text-[#92c9a4]" : "text-gray-400"
          }`} />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`pl-10 pr-4 py-2 rounded-lg border w-64 transition-all duration-300 focus:scale-105 focus:shadow-lg focus:shadow-green-500/20 ${
              isDarkMode 
                ? "bg-[#23482f] border-[#23482f] text-white placeholder-[#92c9a4] focus:border-green-500" 
                : "bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-green-500"
            } focus:outline-none`}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        {actionButtons}
        
        {/* Theme Toggle */}
        {onThemeToggle && (
          <Button
            onClick={handleThemeToggle}
            variant="ghost"
            className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-12 ${
              localDarkMode 
                ? "hover:bg-[#23482f] text-white hover:shadow-md hover:shadow-green-500/20" 
                : "hover:bg-gray-100 text-gray-700 hover:shadow-md hover:shadow-gray-300/30"
            }`}
          >
            <div className="transition-transform duration-500">
              {localDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </div>
          </Button>
        )}
      </div>
    </div>
  )
}
