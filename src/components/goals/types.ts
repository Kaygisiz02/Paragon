import { LucideIcon } from "lucide-react"

// Goal Types
export interface Goal {
  id: string
  title: string
  description: string
  saved: number
  target: number
  percentage: number
  image: string
  completed: boolean
  category: 'personal' | 'family' | 'business' | 'emergency'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  deadline: string
  monthlyContribution: number
  milestones: Milestone[]
  sharedWith?: string[]
  createdAt: string
  lastUpdated: string
  tags: string[]
}

export interface Milestone {
  id: string
  title: string
  target?: number
  achieved: boolean
  achievedAt?: string
  reward?: string
  percentage?: number
}

// Achievement Types
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: 'savings' | 'consistency' | 'speed' | 'social'
  unlockedAt: string
  progress?: number
  maxProgress?: number
}

// Forecast Types
export interface ForecastData {
  estimatedCompletion: string
  confidence: number
  recommendations: string[]
  scenarios?: Scenario[]
  factors?: string[]
}

export interface Scenario {
  id: string
  title: string
  description: string
  probability: number
  impact: {
    timeline: string
    amount: number
    percentage: number
  }
  category: 'income' | 'spending' | 'bonus' | 'optimization'
}

// Automation Types
export interface AutomationRule {
  id: string
  title: string
  description: string
  type: 'income-based' | 'end-of-month' | 'spending-guard' | 'bonus-allocation'
  monthlyImpact: number
  enabled: boolean
  icon: React.ReactNode
  color: string
}

// Metrics Types
export interface GoalMetrics {
  totalSaved: number
  totalTarget: number
  completedGoals: number
  monthlyTotal: number
  overallProgress: number
  activeGoals: number
}

// Component Props Types
export interface GoalsHeaderProps {
  metrics: GoalMetrics
  onAddGoal: () => void
  onShowForecast: () => void
  onShowAchievements: () => void
}

export interface GoalsTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
}

export interface GoalCardProps {
  goal: Goal
  onGoalUpdate: (goalId: string, updates: Partial<Goal>) => void
}

export interface AchievementCardProps {
  achievement: Achievement
  isLocked?: boolean
}

export interface ScenarioCardProps {
  scenario: Scenario
  onSelect: (scenario: Scenario) => void
}

export interface AutomationCardProps {
  automation: AutomationRule
  onToggle?: (id: string) => void
}

// Tab Component Props
export interface OverviewTabProps {
  goals: Goal[]
  forecastData: ForecastData
  metrics: GoalMetrics
}

export interface GoalsTabProps {
  goals: Goal[]
  onGoalUpdate: (goalId: string, updates: Partial<Goal>) => void
}

export interface ForecastTabProps {
  scenarios: Scenario[]
  automations: AutomationRule[]
  onScenarioSelect: (scenario: Scenario) => void
  onAutomationToggle?: (id: string) => void
}

export interface AchievementsTabProps {
  achievements: Achievement[]
  metrics: GoalMetrics
}
