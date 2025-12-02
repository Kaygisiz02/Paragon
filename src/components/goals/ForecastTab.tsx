import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { 
  Brain,
  Zap,
  TrendingUp,
  Calendar,
  AlertTriangle,
  Gift
} from "lucide-react"
import { ScenarioCard } from "./ScenarioCard"
import { AutomationCard } from "./AutomationCard"
import type { ForecastTabProps } from "./types"

export function ForecastTab({ scenarios, automations, onScenarioSelect }: ForecastTabProps) {
  return (
    <TabsContent value="forecast" className="space-y-6">
      {/* Scenario Simulation */}
      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Scenario Simulation</CardTitle>
              <p className="text-sm text-muted-foreground">What-if analysis for your goals</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {scenarios.map((scenario) => (
              <ScenarioCard 
                key={scenario.id} 
                scenario={scenario} 
                onSelect={onScenarioSelect}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Smart Savings Automation */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Smart Savings Automation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {automations.map((automation) => (
              <AutomationCard 
                key={automation.id} 
                automation={automation}
              />
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Total Monthly Automation Impact</p>
                <p className="text-sm text-muted-foreground">Combined smart savings potential</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  +${automations.reduce((sum, a) => sum + a.monthlyImpact, 0).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
