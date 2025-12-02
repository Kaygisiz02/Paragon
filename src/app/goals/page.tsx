"use client"

import { useState, useEffect, useMemo } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { 
  Plus,
  X
} from "lucide-react"

// Import goal components
import {
  GoalsHeader,
  GoalsTabs,
  OverviewTab,
  GoalsTab,
  ForecastTab,
  AchievementsTab,
  type Goal,
  type Milestone,
  type Achievement,
  type ForecastData,
  type Scenario,
  type AutomationRule,
  type GoalMetrics
} from "@/components/goals"

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Dream Vacation to Japan",
      description: "2-week cultural experience with traditional ryokans",
      saved: 6500,
      target: 8000,
      percentage: 81,
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=400&fit=crop",
      completed: false,
      category: 'personal',
      priority: 'high',
      deadline: "2024-06-01",
      monthlyContribution: 750,
      milestones: [
        { id: "m1", title: "First 25%", percentage: 25, achieved: true, achievedAt: "2023-09-15", reward: "Sushi dinner" },
        { id: "m2", title: "Halfway There", percentage: 50, achieved: true, achievedAt: "2023-11-20", reward: "Travel guide book" },
        { id: "m3", title: "Final Stretch", percentage: 75, achieved: true, achievedAt: "2024-01-10", reward: "Japanese language course" },
        { id: "m4", title: "Goal Complete!", percentage: 100, achieved: false }
      ],
      createdAt: "2023-08-01",
      lastUpdated: "2024-01-15",
      tags: ['travel', 'culture', 'experience']
    },
    {
      id: "2",
      title: "Emergency Fund",
      description: "6 months of expenses for financial security",
      saved: 3200,
      target: 5000,
      percentage: 64,
      image: "https://images.unsplash.com/photo-1554224154-260325c054f6?w=800&h=400&fit=crop",
      completed: false,
      category: 'emergency',
      priority: 'urgent',
      deadline: "2024-03-01",
      monthlyContribution: 450,
      milestones: [
        { id: "m1", title: "Base Coverage", percentage: 25, achieved: true, achievedAt: "2023-10-01", reward: "Peace of mind" },
        { id: "m2", title: "3 Months Expenses", percentage: 50, achieved: false },
        { id: "m3", title: "5 Months Expenses", percentage: 83, achieved: false },
        { id: "m4", title: "Full Security", percentage: 100, achieved: false }
      ],
      createdAt: "2023-09-01",
      lastUpdated: "2024-01-10",
      tags: ['security', 'essential', 'protection']
    },
    {
      id: "3",
      title: "New MacBook Pro",
      description: "M3 Max for professional development",
      saved: 2000,
      target: 2000,
      percentage: 100,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=400&fit=crop",
      completed: true,
      category: 'business',
      priority: 'medium',
      deadline: "2023-12-31",
      monthlyContribution: 500,
      milestones: [
        { id: "m1", title: "Research Phase", percentage: 25, achieved: true, achievedAt: "2023-09-15", reward: "Spec comparison" },
        { id: "m2", title: "Halfway There", percentage: 50, achieved: true, achievedAt: "2023-10-30", reward: "Accessories budget" },
        { id: "m3", title: "Final Push", percentage: 75, achieved: true, achievedAt: "2023-11-20", reward: "Software setup" },
        { id: "m4", title: "Purchase Complete!", percentage: 100, achieved: true, achievedAt: "2023-12-15", reward: "New productivity tools" }
      ],
      createdAt: "2023-08-15",
      lastUpdated: "2023-12-15",
      tags: ['technology', 'work', 'investment']
    },
    {
      id: "4",
      title: "Family Car Fund",
      description: "Reliable vehicle for family transportation",
      saved: 8000,
      target: 15000,
      percentage: 53,
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=400&fit=crop",
      completed: false,
      category: 'family',
      priority: 'high',
      deadline: "2024-12-01",
      monthlyContribution: 700,
      milestones: [
        { id: "m1", title: "Down Payment", percentage: 33, achieved: true, achievedAt: "2023-11-01", reward: "Car research weekend" },
        { id: "m2", title: "Insurance Ready", percentage: 67, achieved: false },
        { id: "m3", title: "Full Purchase", percentage: 100, achieved: false }
      ],
      sharedWith: ['partner', 'family'],
      createdAt: "2023-07-01",
      lastUpdated: "2024-01-20",
      tags: ['family', 'transportation', 'essential']
    }
  ])

  // Premium States
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [showScenarioModal, setShowScenarioModal] = useState(false)
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "a1", title: "First Goal", description: "Created your first savings goal", icon: "🎯", unlockedAt: "2023-08-01", category: "savings" },
    { id: "a2", title: "Consistent Saver", description: "Saved for 3 consecutive months", icon: "🔥", unlockedAt: "2023-10-15", category: "consistency" },
    { id: "a3", title: "Speed Demon", description: "Completed a goal 2 months early", icon: "⚡", unlockedAt: "2023-12-15", category: "speed" },
    { id: "a4", title: "Team Player", description: "Created a shared goal", icon: "👥", unlockedAt: "2024-01-01", category: "social" }
  ])

  // Event listener for goal dialog
  useEffect(() => {
    const handleOpenGoalDialog = () => {
      setShowAddForm(true)
    }

    window.addEventListener('openGoalDialog', handleOpenGoalDialog)
    return () => window.removeEventListener('openGoalDialog', handleOpenGoalDialog)
  }, [])

  // Mock data for premium features
  const forecastData: ForecastData = {
    estimatedCompletion: "2024-04-15",
    confidence: 87,
    factors: ["Current saving rate", "Seasonal spending patterns", "Income stability"],
    recommendations: [
      "Increase monthly contribution by $150 to complete 2 months earlier",
      "Reduce dining expenses by 20% to accelerate timeline",
      "Consider automated transfers for consistency"
    ]
  }

  const scenarios: Scenario[] = [
    {
      id: "s1",
      title: "+20% Monthly Contribution",
      description: "Increase your monthly savings by 20%",
      impact: { timeline: "-2 months", amount: 1200, percentage: 15 },
      probability: 85,
      category: "income"
    },
    {
      id: "s2",
      title: "Reduce Spending by 10%",
      description: "Cut discretionary expenses by 10%",
      impact: { timeline: "-1.5 months", amount: 800, percentage: 10 },
      probability: 70,
      category: "spending"
    },
    {
      id: "s3",
      title: "Bonus Allocation",
      description: "Apply 50% of year-end bonus to goals",
      impact: { timeline: "-3 months", amount: 2000, percentage: 25 },
      probability: 60,
      category: "bonus"
    }
  ]

  // Automation rules with Lucide icons
  const automations: AutomationRule[] = [
    {
      id: "auto1",
      title: "Income-Based Transfers",
      description: "Automatically transfer 15% of income to goals",
      type: "income-based",
      monthlyImpact: 1200,
      enabled: true,
      icon: <div className="h-4 w-4">💰</div>,
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      id: "auto2", 
      title: "End-of-Month Sweep",
      description: "Transfer remaining balance to top priority goal",
      type: "end-of-month",
      monthlyImpact: 450,
      enabled: true,
      icon: <div className="h-4 w-4">📅</div>,
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      id: "auto3",
      title: "Spending Guard",
      description: "Reduce transfers when spending increases",
      type: "spending-guard", 
      monthlyImpact: 280,
      enabled: false,
      icon: <div className="h-4 w-4">🛡️</div>,
      color: "from-yellow-500/20 to-orange-500/20"
    },
    {
      id: "auto4",
      title: "Bonus Allocation",
      description: "Apply 50% of bonuses to goals",
      type: "bonus-allocation",
      monthlyImpact: 1500,
      enabled: true,
      icon: <div className="h-4 w-4">🎁</div>,
      color: "from-purple-500/20 to-pink-500/20"
    }
  ]

  // Calculated metrics
  const metrics: GoalMetrics = useMemo(() => {
    const totalSaved = goals.reduce((sum, goal) => sum + goal.saved, 0)
    const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0)
    const completedGoals = goals.filter(goal => goal.completed).length
    const monthlyTotal = goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0)
    
    return {
      totalSaved,
      totalTarget,
      completedGoals,
      monthlyTotal,
      overallProgress: totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0,
      activeGoals: goals.length
    }
  }, [goals])

  // Event handlers
  const handleAddGoal = () => setShowAddForm(false)
  const handleShowForecast = () => setActiveTab("forecast")
  const handleShowAchievements = () => setActiveTab("achievements")
  const handleTabChange = (value: string) => setActiveTab(value)
  const handleScenarioSelect = (scenario: Scenario) => console.log('Applying scenario:', scenario)
  const handleGoalUpdate = (goalId: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, ...updates, lastUpdated: new Date().toISOString() } : goal
    ))
  }

  return (
    <DashboardLayout 
      title="Paragon Goals" 
      subtitle="AI-powered goal tracking with smart insights and automation"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Goals Header with Metrics */}
        <GoalsHeader 
          metrics={metrics}
        />

        {/* Goals Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <GoalsTabs activeTab={activeTab} onTabChange={handleTabChange} />
          {/* Overview Tab */}
          <OverviewTab 
            goals={goals}
            forecastData={forecastData}
            metrics={metrics}
          />
          
          {/* Goals Tab */}
          <GoalsTab 
            goals={goals}
            onGoalUpdate={handleGoalUpdate}
          />
          
          {/* AI Forecast Tab */}
          <ForecastTab 
            scenarios={scenarios}
            automations={automations}
            onScenarioSelect={handleScenarioSelect}
          />
          
          {/* Achievements Tab */}
          <AchievementsTab 
            achievements={achievements}
            metrics={metrics}
          />
        </Tabs>

        {/* Add Goal Dialog */}
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Create New Goal</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Basic Information</h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium">Goal Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Dream Vacation to Japan"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                    <textarea
                      id="description"
                      placeholder="Describe your goal and why it matters to you..."
                      className="mt-1 w-full min-h-[80px] px-3 py-2 text-sm ring-offset-background border border-input bg-background rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Financial Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="target" className="text-sm font-medium">Target Amount ($)</Label>
                    <Input
                      id="target"
                      type="number"
                      placeholder="10000"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="monthly" className="text-sm font-medium">Monthly Contribution ($)</Label>
                    <Input
                      id="monthly"
                      type="number"
                      placeholder="500"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Goal Settings */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Goal Settings</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                  <select
                    id="category"
                    className="mt-1 w-full px-3 py-2 text-sm ring-offset-background border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="">Select category</option>
                    <option value="personal">Personal</option>
                    <option value="family">Family</option>
                    <option value="business">Business</option>
                    <option value="emergency">Emergency</option>
                    <option value="education">Education</option>
                    <option value="health">Health & Fitness</option>
                    <option value="travel">Travel</option>
                    <option value="home">Home & Property</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="priority" className="text-sm font-medium">Priority</Label>
                  <select
                    id="priority"
                    className="mt-1 w-full px-3 py-2 text-sm ring-offset-background border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="">Select priority</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deadline" className="text-sm font-medium">Target Date</Label>
                  <Input
                    id="deadline"
                    type="date"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="image" className="text-sm font-medium">Goal Image URL (optional)</Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Advanced Options</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="shared"
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <Label htmlFor="shared" className="text-sm">Share with family/partner</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="automated"
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <Label htmlFor="automated" className="text-sm">Enable automated transfers</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="milestones"
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <Label htmlFor="milestones" className="text-sm">Create milestone rewards</Label>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label htmlFor="tags" className="text-sm font-medium">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="e.g., travel, culture, experience"
                className="mt-1"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-xs text-muted-foreground">
              All fields marked with * are required
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGoal} className="bg-primary hover:bg-primary/90">
                Create Goal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  </DashboardLayout>
)}