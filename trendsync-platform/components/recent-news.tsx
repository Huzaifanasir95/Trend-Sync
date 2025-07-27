"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Share2, ExternalLink } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Article {
  id: string
  title: string
  summary: string
  source: string
  publishedAt: string
  imageUrl?: string
  region: string
}

export function RecentNews() {
  const [recentArticles, setRecentArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRecentNews() {
      try {
        const response = await fetch('/api/news?limit=3&sort=recent')
        if (!response.ok) {
          throw new Error('Failed to fetch recent news')
        }
        const data = await response.json()
        setRecentArticles(data.articles || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchRecentNews()
  }, [])

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Less than an hour ago'
    if (diffInHours === 1) return '1 hour ago'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return '1 day ago'
    return `${diffInDays} days ago`
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent News
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4 p-4 border rounded-lg animate-pulse">
              <div className="w-[120px] h-[80px] bg-gray-200 rounded-lg flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="flex gap-2">
                  <div className="h-7 bg-gray-200 rounded w-16"></div>
                  <div className="h-7 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent News
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-red-600 mb-4">Error loading recent news: {error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent News
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {recentArticles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="mb-2">No recent articles</div>
            <p className="text-sm text-gray-400">Recent news articles will appear here once scraped.</p>
          </div>
        ) : (
          recentArticles.map((article) => (
            <div key={article.id} className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <Image
                src={article.imageUrl || "/placeholder.svg"}
                alt={article.title}
                width={120}
                height={80}
                className="rounded-lg object-cover flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {article.source}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {article.region}
                  </Badge>
                  <span className="text-xs text-gray-500">{formatTimeAgo(article.publishedAt)}</span>
                </div>

                <h4 className="font-medium text-sm mb-2 line-clamp-2">{article.title}</h4>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{article.summary}</p>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs h-7 bg-transparent">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Read
                  </Button>
                  <Button size="sm" className="text-xs h-7 bg-blue-600 hover:bg-blue-700">
                    <Share2 className="h-3 w-3 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
