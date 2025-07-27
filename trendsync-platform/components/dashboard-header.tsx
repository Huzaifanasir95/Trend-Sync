import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Settings, User, TrendingUp } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">TrendSync Dashboard</h1>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Active
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
