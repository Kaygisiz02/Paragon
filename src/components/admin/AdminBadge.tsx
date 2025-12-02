"use client"

import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

type AdminBadgeType = "error" | "warning" | "success" | "info" | "primary" | "secondary"

interface AdminBadgeProps {
  children: ReactNode
  type?: AdminBadgeType
  icon?: LucideIcon
  className?: string
}

export default function AdminBadge({
  children,
  type = "secondary",
  icon: Icon,
  className = ""
}: AdminBadgeProps) {
  const baseClasses = "admin-badge"
  const typeClasses = `admin-badge.${type}`
  const iconClasses = Icon ? "flex items-center gap-1" : ""

  return (
    <span className={`${baseClasses} ${typeClasses} ${iconClasses} ${className}`}>
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </span>
  )
}
