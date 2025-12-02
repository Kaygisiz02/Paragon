import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Rocket } from "lucide-react"
import type { ScenarioCardProps } from "./types"

export function ScenarioCard({ scenario, onSelect }: ScenarioCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-all duration-300 cursor-pointer group"
         onClick={() => onSelect(scenario)}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">{scenario.title}</h4>
        <Badge variant="outline" className="text-xs">
          {scenario.probability}% likely
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{scenario.description}</p>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Timeline Impact:</span>
          <span className="font-bold text-green-600">{scenario.impact.timeline}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Amount Impact:</span>
          <span className="font-bold">${scenario.impact.amount.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress Boost:</span>
          <span className="font-bold text-blue-600">+{scenario.impact.percentage}%</span>
        </div>
      </div>
      
      <Button className="w-full mt-4 group-hover:bg-primary/90 transition-colors">
        <Rocket className="h-4 w-4 mr-2" />
        Apply Scenario
      </Button>
    </div>
  )
}
