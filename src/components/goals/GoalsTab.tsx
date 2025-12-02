import { TabsContent } from "@/components/ui/tabs"
import { GoalCard } from "./GoalCard"
import type { GoalsTabProps } from "./types"

export function GoalsTab({ goals, onGoalUpdate }: GoalsTabProps) {
  return (
    <TabsContent value="goals" className="space-y-6">
      {/* Goals Grid with Enhanced Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <GoalCard 
            key={goal.id} 
            goal={goal} 
            onGoalUpdate={onGoalUpdate}
          />
        ))}
      </div>
    </TabsContent>
  )
}
