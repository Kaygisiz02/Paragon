import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  CheckCircle2,
  Users,
  Timer,
  DollarSign
} from "lucide-react"
import type { GoalCardProps } from "./types"

export function GoalCard({ goal, onGoalUpdate }: GoalCardProps) {
  return (
    <Card className={`overflow-hidden group transition-all duration-300 hover:shadow-xl hover:scale-105 ${
      goal.completed ? "border-2 border-primary/80 bg-gradient-to-br from-primary/5 to-transparent" : ""
    }`}>
      <div className="relative">
        {/* Goal Image */}
        <div 
          className="w-full aspect-video bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundImage: `url(${goal.image})` }}
        />
        
        {/* Priority Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={goal.priority === 'urgent' ? 'destructive' : goal.priority === 'high' ? 'default' : 'secondary'} className="text-xs">
            {goal.priority.toUpperCase()}
          </Badge>
        </div>
        
        {/* Shared Goal Indicator */}
        {goal.sharedWith && (
          <div className="absolute top-3 right-3">
            <div className="h-8 w-8 bg-blue-500/90 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
          </div>
        )}
        
        {/* Completed Overlay */}
        {goal.completed && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/30 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center text-white">
              <CheckCircle2 className="h-16 w-16 mx-auto mb-2 animate-pulse" />
              <p className="font-bold text-2xl">Goal Achieved!</p>
              <p className="text-sm opacity-90">Completed on {new Date(goal.lastUpdated).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Goal Details */}
      <CardContent className="p-5">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold tracking-tight mb-2">{goal.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{goal.description}</p>
          </div>
          
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm font-bold text-primary">{goal.percentage}%</span>
            </div>
            <Progress value={goal.percentage} className="h-3" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">${goal.saved.toLocaleString()}</span> / ${goal.target.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">
                ${(goal.target - goal.saved).toLocaleString()} left
              </span>
            </div>
          </div>
          
          {/* Milestones */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Milestones</p>
            <div className="flex gap-1">
              {goal.milestones.map((milestone) => (
                <div key={milestone.id} className={`h-6 w-6 rounded-full flex items-center justify-center ${
                  milestone.achieved ? 'bg-green-500' : 'bg-muted'
                }`} title={milestone.title}>
                  {milestone.achieved && <CheckCircle2 className="h-3 w-3 text-white" />}
                </div>
              ))}
            </div>
          </div>
          
          {/* Tags */}
          {goal.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {goal.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Timer className="h-3 w-3 mr-1" />
              Details
            </Button>
            <Button size="sm" className="flex-1">
              <DollarSign className="h-3 w-3 mr-1" />
              Add Funds
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
