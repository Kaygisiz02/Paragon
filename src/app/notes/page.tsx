import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Search,
  Plus,
  ChevronDown,
  Delete,
  Save,
  Tag,
  Link
} from "lucide-react"

export default function NotesPage() {
  const notes = [
    {
      id: 1,
      title: "Q4 Tax Planning Ideas",
      content: "Remember to look into deductions for the home office and new equipment purchases. Also, check contribution limits for retirement accounts...",
      lastUpdated: "2 days ago",
      category: "Taxes 2024",
      linkedTo: "Budget: 'Business Expenses'",
      isActive: true
    },
    {
      id: 2,
      title: "Investment Strategy for 2025",
      content: "Research index funds vs. individual stocks. Potential to increase allocation in emerging markets. VTI, VXUS considerations...",
      lastUpdated: "1 week ago",
      category: "Investments",
      linkedTo: null,
      isActive: false
    },
    {
      id: 3,
      title: "Home Renovation Budget Notes",
      content: "Contractor quotes came in. Kitchen is over budget, need to find savings in the bathroom remodel. Materials cost breakdown...",
      lastUpdated: "3 weeks ago",
      category: "Home",
      linkedTo: null,
      isActive: false
    },
    {
      id: 4,
      title: "Vacation Savings Goal",
      content: "Target: $5,000 by June. Currently at $2,100. Automate transfers of $150 bi-weekly. Look for flight deals in March.",
      lastUpdated: "1 month ago",
      category: "Savings",
      linkedTo: null,
      isActive: false
    }
  ]

  return (
    <DashboardLayout 
      title="Financial Notes" 
      subtitle="Create and manage your financial notes and reminders"
    >
      <div className="h-full grid grid-cols-12 overflow-hidden">
        {/* Left Column: Notes List */}
        <div className="col-span-4 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h1 className="text-2xl font-bold">Financial Notes</h1>
          </div>
          
          <div className="p-4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                placeholder="Search notes..."
                className="pl-12 bg-muted border-0"
              />
            </div>
            
            {/* Filters */}
            <div className="flex gap-3">
              <Button variant="secondary" className="h-8">
                Sort: Newest
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
              <Button variant="secondary" className="h-8">
                Category: All
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
          
          {/* New Note Button */}
          <div className="px-4 pb-4">
            <Button className="w-full bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Button>
          </div>
          
          {/* Notes List */}
          <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-4">
            {notes.map((note) => (
              <Card 
                key={note.id} 
                className={`cursor-pointer transition-colors ${
                  note.isActive 
                    ? "bg-primary/20 dark:bg-primary/10 border-primary/30" 
                    : "hover:bg-muted/50"
                }`}
              >
                <CardContent className="p-4">
                  <h3 className="font-bold truncate">{note.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 truncate">{note.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">Last updated: {note.lastUpdated}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Note Detail/Editor */}
        <div className="col-span-8 flex flex-col bg-muted/30">
          {/* Editor Header */}
          <div className="p-4 flex justify-end items-center gap-4 border-b border-border">
            <p className="text-sm text-muted-foreground mr-auto">Last saved: 2 minutes ago</p>
            <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
              <Delete className="h-5 w-5" />
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
          
          {/* Editor Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              {/* Title Input */}
              <Input
                placeholder="Note Title"
                value="Q4 Tax Planning Ideas"
                className="w-full bg-transparent border-0 border-b-2 border-border rounded-none focus:ring-0 focus:border-primary px-2 py-2 text-3xl font-bold placeholder:text-muted-foreground"
              />
              
              {/* Tags and Links */}
              <div className="mt-6 flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Category:</span>
                  <span className="text-sm bg-orange-500 text-white px-2 py-0.5 rounded-full">Taxes 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Linked to:</span>
                  <span className="text-sm bg-purple-500 text-white px-2 py-0.5 rounded-full">Budget: 'Business Expenses'</span>
                </div>
              </div>
              
              {/* Content Textarea */}
              <div className="mt-8">
                <textarea
                  placeholder="Start writing your note here..."
                  className="w-full h-96 bg-transparent border-0 focus:ring-0 p-2 text-base leading-relaxed resize-none placeholder:text-muted-foreground font-mono"
                  defaultValue={`Remember to look into deductions for the home office and new equipment purchases.

- Check Section 179 for equipment depreciation.
- Calculate square footage for home office deduction.
- Max out 401(k) and IRA contributions before the deadline.

Also, check contribution limits for retirement accounts as they may have increased for this year. Schedule a meeting with the accountant in early January to review everything.`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
