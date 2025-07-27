import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCards } from "@/components/stats-cards"
import { RegionSelector } from "@/components/region-selector"
import { PostHistory } from "@/components/post-history"
import { RecentNews } from "@/components/recent-news"
import { NewsScrapingPanel } from "@/components/news-scraping-panel"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <StatsCards />
            <NewsScrapingPanel />
            <RegionSelector />
            <Suspense fallback={<div>Loading recent news...</div>}>
              <RecentNews />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Suspense fallback={<div>Loading post history...</div>}>
              <PostHistory />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
