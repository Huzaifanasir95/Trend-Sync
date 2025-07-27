"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, PlayCircle, CheckCircle, AlertCircle } from "lucide-react"

export function NewsScrapingPanel() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; jobId?: string } | null>(null)

  const handleTriggerScraping = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/news/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          region: "Pakistan",
          sources: ["Tribune", "Dawn"]
        })
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: 'Failed to trigger Pakistani news scraping'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlayCircle className="h-5 w-5" />
          Pakistani News Scraping Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">News Sources</h3>
          <div className="flex items-center gap-4 text-sm text-blue-800">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>The Express Tribune (tribune.com.pk)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span>Dawn (dawn.com)</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleTriggerScraping} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Scraping Pakistani News...
            </>
          ) : (
            <>
              <PlayCircle className="h-4 w-4 mr-2" />
              Scrape Latest Pakistani News
            </>
          )}
        </Button>

        {result && (
          <div className={`p-4 rounded-lg border ${
            result.success 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {result.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <span className="font-medium">
                {result.success ? 'Success' : 'Error'}
              </span>
            </div>
            <p className="text-sm">{result.message}</p>
            {result.jobId && (
              <p className="text-xs mt-1 opacity-75">Job ID: {result.jobId}</p>
            )}
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• This will scrape latest news from Tribune and Dawn websites</p>
          <p>• Articles will be processed with AI and stored in the database</p>
          <p>• Focus on Pakistani politics, economy, sports, and current affairs</p>
          <p>• Refresh the page after a few minutes to see new articles</p>
        </div>
      </CardContent>
    </Card>
  )
}
