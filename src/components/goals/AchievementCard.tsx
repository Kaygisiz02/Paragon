import { Badge } from "@/components/ui/badge"
import { Lock } from "lucide-react"
import type { AchievementCardProps } from "./types"

export function AchievementCard({ achievement, isLocked = false }: AchievementCardProps) {
  if (isLocked) {
    return (
      <div className="relative overflow-hidden rounded-lg border border-dashed border-muted/50 bg-muted/20 p-4 opacity-60">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 bg-muted/50 rounded-full flex items-center justify-center flex-shrink-0">
            <Lock className="h-6 w-6 text-muted-400" />
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold text-muted-400 mb-1">Locked Achievement</h4>
            <p className="text-sm text-muted-500 mb-2">Complete more goals to unlock</p>
            
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
                Locked
              </Badge>
              <span className="text-xs text-muted-400">???</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-muted/30 to-muted/10 p-4 hover:shadow-md transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">{achievement.icon}</span>
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold mb-1">{achievement.title}</h4>
            <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
            
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs capitalize">
                {achievement.category}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(achievement.unlockedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
