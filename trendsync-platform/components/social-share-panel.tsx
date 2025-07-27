"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Instagram, Facebook, Video, Sparkles, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface Article {
  id: string
  title: string
  summary: string
  tags: string[]
}

interface SocialSharePanelProps {
  article: Article
}

export function SocialSharePanel({ article }: SocialSharePanelProps) {
  const [platforms, setPlatforms] = useState({
    tiktok: true,
    instagram: true,
    facebook: true,
  })

  const [captions, setCaptions] = useState({
    tiktok: "",
    instagram: "",
    facebook: "",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [isScheduling, setIsScheduling] = useState(false)

  const generateCaptions = async () => {
    setIsGenerating(true)

    // Simulate AI caption generation
    setTimeout(() => {
      setCaptions({
        tiktok: `🔥 ${article.title.slice(0, 50)}... #AI #Healthcare #TechNews #Innovation #FYP`,
        instagram: `${article.summary}\n\n#AI #Healthcare #Technology #Innovation #MedicalBreakthrough #TechNews`,
        facebook: `${article.title}\n\n${article.summary}\n\nWhat are your thoughts on AI in healthcare? Share your opinions below! 👇\n\n#AI #Healthcare #Technology`,
      })
      setIsGenerating(false)
    }, 2000)
  }

  const schedulePost = async () => {
    setIsScheduling(true)

    // Simulate scheduling
    setTimeout(() => {
      setIsScheduling(false)
      // Show success message
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          Social Media Crossposting
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Platform Selection */}
        <div>
          <h4 className="font-medium mb-4">Select Platforms</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Switch
                id="tiktok"
                checked={platforms.tiktok}
                onCheckedChange={(checked) => setPlatforms((prev) => ({ ...prev, tiktok: checked }))}
              />
              <Video className="h-5 w-5 text-black" />
              <Label htmlFor="tiktok" className="font-medium">
                TikTok
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Switch
                id="instagram"
                checked={platforms.instagram}
                onCheckedChange={(checked) => setPlatforms((prev) => ({ ...prev, instagram: checked }))}
              />
              <Instagram className="h-5 w-5 text-pink-600" />
              <Label htmlFor="instagram" className="font-medium">
                Instagram
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Switch
                id="facebook"
                checked={platforms.facebook}
                onCheckedChange={(checked) => setPlatforms((prev) => ({ ...prev, facebook: checked }))}
              />
              <Facebook className="h-5 w-5 text-blue-600" />
              <Label htmlFor="facebook" className="font-medium">
                Facebook
              </Label>
            </div>
          </div>
        </div>

        {/* AI Caption Generation */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">AI-Generated Captions</h4>
            <Button onClick={generateCaptions} disabled={isGenerating} size="sm" variant="outline">
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Captions
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4">
            {platforms.tiktok && (
              <div>
                <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Video className="h-4 w-4" />
                  TikTok Caption
                </Label>
                <Textarea
                  placeholder="AI will generate an engaging TikTok caption with trending hashtags..."
                  value={captions.tiktok}
                  onChange={(e) => setCaptions((prev) => ({ ...prev, tiktok: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>
            )}

            {platforms.instagram && (
              <div>
                <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Instagram className="h-4 w-4" />
                  Instagram Caption
                </Label>
                <Textarea
                  placeholder="AI will generate an Instagram caption with relevant hashtags..."
                  value={captions.instagram}
                  onChange={(e) => setCaptions((prev) => ({ ...prev, instagram: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>
            )}

            {platforms.facebook && (
              <div>
                <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Facebook className="h-4 w-4" />
                  Facebook Post
                </Label>
                <Textarea
                  placeholder="AI will generate a Facebook post with engaging questions..."
                  value={captions.facebook}
                  onChange={(e) => setCaptions((prev) => ({ ...prev, facebook: e.target.value }))}
                  className="min-h-[120px]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Suggested Hashtags */}
        <div>
          <h4 className="font-medium mb-3">Suggested Hashtags</h4>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-blue-100">
                #{tag.toLowerCase().replace(/\s+/g, "")}
              </Badge>
            ))}
            <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">
              #trending
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">
              #news
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">
              #viral
            </Badge>
          </div>
        </div>

        {/* Schedule Options */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Schedule Posts
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Posts will be optimized for each platform's best engagement times
              </p>
            </div>

            <Button
              onClick={schedulePost}
              disabled={isScheduling || Object.values(platforms).every((p) => !p)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isScheduling ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Scheduling...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Schedule Posts
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Status Messages */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span>TikTok: Ready to post</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-yellow-600">
            <AlertCircle className="h-4 w-4" />
            <span>Instagram: Pending approval</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span>Facebook: Scheduled for optimal time</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
