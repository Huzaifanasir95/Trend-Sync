"use client"

import { useEffect, useState } from "react"

interface Stats {
  articlesProcessed: number
  socialPosts: number
  regionsCovered: number
  activeUsers: number
}

export function StatsSection() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const displayStats = [
    { label: "Articles Processed", value: stats ? `${stats.articlesProcessed.toLocaleString()}+` : "0" },
    { label: "Social Posts Created", value: stats ? `${stats.socialPosts.toLocaleString()}+` : "0" },
    { label: "Regions Covered", value: stats ? `${stats.regionsCovered}+` : "0" },
    { label: "Active Users", value: stats ? `${stats.activeUsers.toLocaleString()}+` : "0" },
  ]

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center animate-pulse">
                <div className="h-10 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {displayStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
