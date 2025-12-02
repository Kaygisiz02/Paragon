import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3,
  Target,
  Brain,
  Trophy
} from "lucide-react"
import type { GoalsTabsProps } from "./types"

export function GoalsTabs({ activeTab, onTabChange }: GoalsTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-muted/50 p-1 rounded-lg">
        <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200">
          <BarChart3 className="h-4 w-4 mr-2" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="goals" className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200">
          <Target className="h-4 w-4 mr-2" />
          Goals
        </TabsTrigger>
        <TabsTrigger value="forecast" className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200">
          <Brain className="h-4 w-4 mr-2" />
          AI Forecast
        </TabsTrigger>
        <TabsTrigger value="achievements" className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200">
          <Trophy className="h-4 w-4 mr-2" />
          Achievements
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
