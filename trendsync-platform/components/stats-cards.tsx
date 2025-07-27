"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Share2, Globe, Clock } from "lucide-react"
import { useEffect, useState } from "react"

interface DashboardStats {
  articlesToday: number
  postsScheduled: number
  socialShares: number
  engagementRate: number
  dailyChanges: {
    articles: number
    posts: number
    shares: number
    engagement: number
  }
}

export function StatsCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/dashboard/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const displayStats = [
    {
      title: "Articles Today",
      value: stats ? stats.articlesToday.toString() : "0",
      change: stats ? `${stats.dailyChanges.articles > 0 ? '+' : ''}${stats.dailyChanges.articles}%` : "+0%",
      icon: Globe,
      color: "text-blue-600",
    },
    {
      title: "Posts Scheduled",
      value: stats ? stats.postsScheduled.toString() : "0",
      change: stats ? `${stats.dailyChanges.posts > 0 ? '+' : ''}${stats.dailyChanges.posts}%` : "+0%",
      icon: Clock,
      color: "text-purple-600",
    },
    {
      title: "Social Shares",
      value: stats ? stats.socialShares.toLocaleString() : "0",
      change: stats ? `${stats.dailyChanges.shares > 0 ? '+' : ''}${stats.dailyChanges.shares}%` : "+0%",
      icon: Share2,
      color: "text-green-600",
    },
    {
      title: "Engagement Rate",
      value: stats ? `${stats.engagementRate.toFixed(1)}%` : "0.0%",
      change: stats ? `${stats.dailyChanges.engagement > 0 ? '+' : ''}${stats.dailyChanges.engagement.toFixed(1)}%` : "+0.0%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayStats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs mt-1 ${stats && stat.change.startsWith('+') ? 'text-green-600' : stats && stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                {stat.change} from yesterday
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
