"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, ExternalLink, Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Article {
  id: string
  title: string
  summary: string
  source: string
  publishedAt: string
  imageUrl: string
  region: string
  city: string
  slug: string
}

interface NewsCardProps {
  article: Article
}

export function NewsCard({ article }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={article.imageUrl || "/placeholder.svg"}
            alt={article.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 text-gray-800">
              {article.source}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(article.publishedAt)}</span>
          <MapPin className="h-4 w-4 ml-2" />
          <span>{article.city}</span>
        </div>

        <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{article.summary}</p>

        <Badge variant="outline" className="text-xs">
          {article.region}
        </Badge>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        <Link href={`/news/${article.slug}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            <ExternalLink className="h-4 w-4 mr-2" />
            Read More
          </Button>
        </Link>
        <Button
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={() => {
            // Handle social media sharing
            console.log("Share to social:", article.id)
          }}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </CardFooter>
    </Card>
  )
}
