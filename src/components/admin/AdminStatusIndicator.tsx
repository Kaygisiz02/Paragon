"use client"

import { LucideIcon } from "lucide-react"

type AdminStatusType = "healthy" | "warning" | "error" | "unknown"

interface AdminStatusIndicatorProps {
  status: AdminStatusType
  label: string
  description?: string
  icon?: LucideIcon
  className?: string
}

export default function AdminStatusIndicator({
  status,
  label,
  description,
  icon: Icon,
  className = ""
}: AdminStatusIndicatorProps) {
  const statusClasses = `admin-status-dot.${status}`

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`admin-status-dot ${statusClasses}`}></div>
      <div>
        <p className="text-white text-sm font-medium">{label}</p>
        {description && (
          <p className="text-gray-400 text-xs">{description}</p>
        )}
      </div>
      {Icon && <Icon className="h-4 w-4 text-gray-400" />}
    </div>
  )
}
