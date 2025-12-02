"use client"

import { ReactNode } from "react"

interface AdminTableColumn {
  key: string
  label: string
  render?: (value: any, row: any) => ReactNode
  className?: string
}

interface AdminTableProps {
  data: any[]
  columns: AdminTableColumn[]
  loading?: boolean
  emptyMessage?: string
  className?: string
}

export default function AdminTable({
  data,
  columns,
  loading = false,
  emptyMessage = "No data available",
  className = ""
}: AdminTableProps) {
  if (loading) {
    return (
      <div className={`admin-table-container ${className}`}>
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={column.className}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key}>
                    <div className="admin-loading-skeleton h-4 w-full rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className={`admin-table-container ${className}`}>
        <div className="text-center py-12">
          <p className="text-gray-400">{emptyMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`admin-table-container ${className}`}>
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={column.className}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="admin-transition-colors">
              {columns.map((column) => (
                <td key={column.key} className={column.className}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
