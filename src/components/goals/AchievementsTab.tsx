import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { 
  Trophy,
  Flame,
  Star,
  Crown,
  Award,
  Activity
} from "lucide-react"
import { AchievementCard } from "./AchievementCard"
import type { AchievementsTabProps } from "./types"

export function AchievementsTab({ achievements, metrics }: AchievementsTabProps) {
  return (
    <TabsContent value="achievements" className="space-y-6">
      {/* Achievement Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-yellow-600">{achievements.length}</p>
            <p className="text-sm text-muted-foreground">Total Achievements</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-green-600">12</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-blue-600">Level 8</p>
            <p className="text-sm text-muted-foreground">Savings Master</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-purple-600">Top 5%</p>
            <p className="text-sm text-muted-foreground">All Users</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Achievement Grid */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Achievement Gallery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <AchievementCard 
                key={achievement.id} 
                achievement={achievement}
                isLocked={false}
              />
            ))}
            
            {/* Locked Achievements */}
            {[1, 2, 3].map((i) => (
              <AchievementCard 
                key={`locked-${i}`} 
                achievement={{} as any}
                isLocked={true}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Progress Heatmap */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Savings Activity Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Your daily contribution pattern over the last 90 days</p>
            
            {/* Mock Heatmap Grid */}
            <div className="space-y-2">
              {[...Array(12)].map((_, weekIndex) => (
                <div key={weekIndex} className="flex gap-1">
                  {[...Array(7)].map((_, dayIndex) => {
                    const intensity = Math.random()
                    const bgColor = intensity === 0 ? 'bg-muted/30' : 
                                   intensity < 0.3 ? 'bg-green-100' :
                                   intensity < 0.6 ? 'bg-green-300' :
                                   intensity < 0.9 ? 'bg-green-500' : 'bg-green-700'
                    
                    return (
                      <div 
                        key={dayIndex} 
                        className={`h-4 w-4 rounded-sm ${bgColor} hover:ring-2 hover:ring-primary/50 transition-all duration-200 cursor-pointer`}
                        title={`Day ${weekIndex * 7 + dayIndex + 1}: ${intensity > 0 ? '$' + (intensity * 500).toFixed(0) : 'No contribution'}`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="h-3 w-3 bg-muted/30 rounded-sm"></div>
                <div className="h-3 w-3 bg-green-100 rounded-sm"></div>
                <div className="h-3 w-3 bg-green-300 rounded-sm"></div>
                <div className="h-3 w-3 bg-green-500 rounded-sm"></div>
                <div className="h-3 w-3 bg-green-700 rounded-sm"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
