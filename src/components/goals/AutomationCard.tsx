import type { AutomationCardProps } from "./types"

export function AutomationCard({ automation, onToggle }: AutomationCardProps) {
  return (
    <div className={`p-4 bg-gradient-to-r ${automation.color} rounded-lg border`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="h-8 w-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          {automation.icon}
        </div>
        <div>
          <p className="font-semibold">{automation.title}</p>
          <p className="text-xs text-muted-foreground">{automation.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {automation.type === 'income-based' ? 'Monthly projection:' :
           automation.type === 'end-of-month' ? 'Avg. monthly:' :
           automation.type === 'spending-guard' ? 'Saves per month:' :
           'Last bonus:'}
        </span>
        <span className="font-bold">
          +${automation.monthlyImpact.toLocaleString()}
        </span>
      </div>
    </div>
  )
}
