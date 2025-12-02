import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TabsContent } from "@/components/ui/tabs"
import { 
  Brain,
  Sparkles,
  Calendar,
  Activity,
  PieChart,
  Heart,
  Users,
  Trophy,
  Shield
} from "lucide-react"
import type { OverviewTabProps } from "./types"

export function OverviewTab({ goals, forecastData, metrics }: OverviewTabProps) {
  return (
    <TabsContent value="overview" className="space-y-6">
      {/* AI Insights Card */}
      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">AI Insights & Recommendations</CardTitle>
              <p className="text-sm text-muted-foreground">Personalized suggestions based on your spending patterns</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {forecastData.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-transparent rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-relaxed text-foreground dark:text-white">{rec}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">AI Suggestion</Badge>
                    <span className="text-xs text-muted-foreground dark:text-purple-300">{forecastData.confidence}% confidence</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Forecast Summary */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-foreground dark:text-white">Estimated Completion</p>
                  <p className="text-sm text-muted-foreground dark:text-blue-300">Based on current saving patterns</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{forecastData.estimatedCompletion}</p>
                <p className="text-xs text-muted-foreground dark:text-blue-300">{forecastData.confidence}% confidence</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Goal Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {goals.slice(0, 4).map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${
                        goal.completed ? 'bg-green-500' : 
                        goal.priority === 'urgent' ? 'bg-red-500' :
                        goal.priority === 'high' ? 'bg-orange-500' :
                        goal.priority === 'medium' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}></div>
                      <span className="text-sm font-medium">{goal.title}</span>
                    </div>
                    <span className="text-sm font-bold">{goal.percentage}%</span>
                  </div>
                  <Progress value={goal.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Goal Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['personal', 'family', 'business', 'emergency'].map((category) => {
                const categoryGoals = goals.filter(g => g.category === category)
                const totalSaved = categoryGoals.reduce((sum, g) => sum + g.saved, 0)
                const totalTarget = categoryGoals.reduce((sum, g) => sum + g.target, 0)
                const percentage = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0
                
                return (
                  <div key={category} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        category === 'personal' ? 'bg-blue-100' :
                        category === 'family' ? 'bg-green-100' :
                        category === 'business' ? 'bg-purple-100' :
                        'bg-red-100'
                      }`}>
                        {category === 'personal' && <Heart className="h-4 w-4 text-blue-600" />}
                        {category === 'family' && <Users className="h-4 w-4 text-green-600" />}
                        {category === 'business' && <Trophy className="h-4 w-4 text-purple-600" />}
                        {category === 'emergency' && <Shield className="h-4 w-4 text-red-600" />}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{category}</p>
                        <p className="text-xs text-muted-foreground">{categoryGoals.length} goals</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${totalSaved.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{percentage.toFixed(0)}% of ${totalTarget.toLocaleString()}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  )
}
