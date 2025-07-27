"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, AlertCircle, Instagram, Facebook, Video, MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react"

interface PostHistory {
  id: string
  title: string
  platforms: string[]
  status: 'posted' | 'scheduled' | 'failed' | 'pending'
  scheduledAt: string
  engagement?: {
    likes: number
    shares: number
    comments: number
  } | null
  error?: string
}

const platformIcons = {
  tiktok: Video,
  instagram: Instagram,
  facebook: Facebook,
}

const statusConfig = {
  posted: { color: "bg-green-100 text-green-800", icon: CheckCircle },
  scheduled: { color: "bg-blue-100 text-blue-800", icon: Clock },
  failed: { color: "bg-red-100 text-red-800", icon: AlertCircle },
  pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
}

export function PostHistory() {
  const [postHistory, setPostHistory] = useState<PostHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPostHistory() {
      try {
        const response = await fetch('/api/social/posts')
        if (!response.ok) {
          throw new Error('Failed to fetch post history')
        }
        const data = await response.json()
        setPostHistory(data.posts || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPostHistory()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Post History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 border rounded-lg animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
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
          <CardTitle className="text-lg">Post History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="text-red-600 mb-2">Error loading post history</div>
            <button 
              onClick={() => window.location.reload()} 
              className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
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
        <CardTitle className="text-lg">Post History</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {postHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="mb-2">No posts yet</div>
            <p className="text-sm text-gray-400">Social media posts will appear here once created.</p>
          </div>
        ) : (
          postHistory.map((post) => {
            const StatusIcon = statusConfig[post.status].icon

            return (
              <div key={post.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-sm line-clamp-2 flex-1">{post.title}</h4>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  {post.platforms.map((platform) => {
                    const Icon = platformIcons[platform as keyof typeof platformIcons]
                    return Icon ? <Icon key={platform} className="h-4 w-4 text-gray-600" /> : null
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={statusConfig[post.status].color}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {post.status}
                  </Badge>
                  <span className="text-xs text-gray-500">{new Date(post.scheduledAt).toLocaleString()}</span>
                </div>

                {post.engagement && (
                  <div className="flex items-center gap-4 text-xs text-gray-600 pt-2 border-t">
                    <span>👍 {post.engagement.likes}</span>
                    <span>🔄 {post.engagement.shares}</span>
                    <span>💬 {post.engagement.comments}</span>
                  </div>
                )}

                {post.error && <div className="text-xs text-red-600 bg-red-50 p-2 rounded">Error: {post.error}</div>}
              </div>
            )
          })
        )}

        <Button variant="outline" className="w-full bg-transparent" size="sm">
          View All Posts
        </Button>
      </CardContent>
    </Card>
  )
}
