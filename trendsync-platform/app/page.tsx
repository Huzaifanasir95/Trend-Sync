import { Suspense } from "react"
import { NewsGrid } from "@/components/news-grid"
import { RegionFilter } from "@/components/region-filter"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroSection />
      <StatsSection />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest News</h2>
          <RegionFilter />
        </div>

        <Suspense fallback={<NewsGridSkeleton />}>
          <NewsGrid />
        </Suspense>
      </main>
    </div>
  )
}

function NewsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  )
}
