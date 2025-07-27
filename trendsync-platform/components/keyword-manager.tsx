"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Search, Tag, TrendingUp } from "lucide-react"

interface Keywords {
  [key: string]: string[]
}

export function KeywordManager() {
  const [keywords, setKeywords] = useState<Keywords>({})
  const [priorityKeywords, setPriorityKeywords] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [newKeyword, setNewKeyword] = useState("")
  const [newPriorityKeyword, setNewPriorityKeyword] = useState("")
  const [loading, setLoading] = useState(false)

  // Load existing keywords
  useEffect(() => {
    fetchKeywords()
  }, [])

  const fetchKeywords = async () => {
    try {
      const response = await fetch('/api/news-keywords')
      const data = await response.json()
      if (data.success) {
        setKeywords(data.keywords)
        setPriorityKeywords(data.priorityKeywords)
      }
    } catch (error) {
      console.error('Failed to fetch keywords:', error)
    }
  }

  const addKeyword = async () => {
    if (!newKeyword || !selectedCategory) return

    setLoading(true)
    try {
      const response = await fetch('/api/news-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory,
          keywords: [newKeyword.toLowerCase()]
        })
      })

      const data = await response.json()
      if (data.success) {
        // Update local state
        setKeywords(prev => ({
          ...prev,
          [selectedCategory]: [...(prev[selectedCategory] || []), newKeyword.toLowerCase()]
        }))
        setNewKeyword("")
      }
    } catch (error) {
      console.error('Failed to add keyword:', error)
    } finally {
      setLoading(false)
    }
  }

  const addPriorityKeyword = async () => {
    if (!newPriorityKeyword) return

    setLoading(true)
    try {
      const response = await fetch('/api/news-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'priority',
          keywords: [newPriorityKeyword.toLowerCase()],
          priority: true
        })
      })

      const data = await response.json()
      if (data.success) {
        setPriorityKeywords(prev => [...prev, newPriorityKeyword.toLowerCase()])
        setNewPriorityKeyword("")
      }
    } catch (error) {
      console.error('Failed to add priority keyword:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeKeyword = (category: string, keyword: string) => {
    setKeywords(prev => ({
      ...prev,
      [category]: prev[category]?.filter(k => k !== keyword) || []
    }))
  }

  const removePriorityKeyword = (keyword: string) => {
    setPriorityKeywords(prev => prev.filter(k => k !== keyword))
  }

  const triggerKeywordBasedScraping = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/news-keywords', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          n8nWebhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/news-scraping',
          keywords: keywords
        })
      })

      const data = await response.json()
      if (data.success) {
        alert('Keyword-based news scraping triggered successfully!')
      }
    } catch (error) {
      console.error('Failed to trigger scraping:', error)
      alert('Failed to trigger news scraping')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Pakistani News Keywords Manager
        </CardTitle>
        <CardDescription>
          Manage keywords to filter and prioritize Pakistani news content from Express Tribune
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="categories" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="priority">Priority</TabsTrigger>
            <TabsTrigger value="trigger">Trigger Scraping</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-4">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(keywords).map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Enter new keyword"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={addKeyword} disabled={loading}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {Object.entries(keywords).map(([category, categoryKeywords]) => (
                  <div key={category} className="space-y-2">
                    <Label className="text-sm font-medium">
                      {category.charAt(0).toUpperCase() + category.slice(1)} ({categoryKeywords?.length || 0})
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {categoryKeywords?.map((keyword, index) => (
                        <span key={index} className="inline-flex items-center gap-1 rounded-full border border-gray-300 bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
                          {keyword}
                          <button
                            onClick={() => removeKeyword(category, keyword)}
                            className="ml-1 hover:text-red-500"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </span>
                      )) || <span className="text-sm text-gray-500">No keywords</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="priority" className="space-y-4">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter priority keyword (breaking, urgent, etc.)"
                  value={newPriorityKeyword}
                  onChange={(e) => setNewPriorityKeyword(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={addPriorityKeyword} disabled={loading}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Priority Keywords ({priorityKeywords.length})
                </Label>
                <div className="flex flex-wrap gap-2">
                  {priorityKeywords.map((keyword, index) => (
                    <span key={index} className="inline-flex items-center gap-1 rounded-full border border-blue-300 bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                      {keyword}
                      <button
                        onClick={() => removePriorityKeyword(keyword)}
                        className="ml-1 hover:text-red-500"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  Articles with these keywords get higher priority in scraping results
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trigger" className="space-y-4">
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Current Keyword Stats:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Total Categories: </span>
                    <span className="font-medium">{Object.keys(keywords).length}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Total Keywords: </span>
                    <span className="font-medium">{Object.values(keywords).flat().length}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Priority Keywords: </span>
                    <span className="font-medium">{priorityKeywords.length}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Source: </span>
                    <span className="font-medium">Express Tribune</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={triggerKeywordBasedScraping} 
                disabled={loading}
                className="w-full h-12 text-base"
              >
                <Search className="mr-2 h-4 w-4" />
                {loading ? 'Triggering...' : 'Trigger Keyword-Based News Scraping'}
              </Button>

              <div className="text-xs text-gray-600 space-y-1">
                <p>• Uses current keywords to filter Pakistani news</p>
                <p>• Prioritizes articles with priority keywords</p>
                <p>• Categorizes articles automatically</p>
                <p>• AI summarizes content with Pakistani context</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
