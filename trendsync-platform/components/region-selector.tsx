"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, MapPin, RefreshCw } from "lucide-react"

const regions = [
  {
    id: "asia",
    name: "Asia",
    cities: ["Tokyo", "Seoul", "Singapore", "Mumbai", "Bangkok"],
    articleCount: 45,
  },
  {
    id: "europe",
    name: "Europe",
    cities: ["London", "Paris", "Berlin", "Rome", "Madrid"],
    articleCount: 38,
  },
  {
    id: "americas",
    name: "Americas",
    cities: ["New York", "Los Angeles", "Toronto", "São Paulo", "Mexico City"],
    articleCount: 52,
  },
  {
    id: "africa",
    name: "Africa",
    cities: ["Cairo", "Lagos", "Cape Town", "Nairobi", "Casablanca"],
    articleCount: 23,
  },
]

export function RegionSelector() {
  const [selectedRegions, setSelectedRegions] = useState<string[]>(["americas", "europe"])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const toggleRegion = (regionId: string) => {
    setSelectedRegions((prev) => (prev.includes(regionId) ? prev.filter((id) => id !== regionId) : [...prev, regionId]))
  }

  const refreshData = async () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Region & City Selection
          </CardTitle>
          <Button variant="outline" size="sm" onClick={refreshData} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {regions.map((region) => (
            <div
              key={region.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedRegions.includes(region.id)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => toggleRegion(region.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {region.name}
                </h3>
                <Badge variant="secondary">{region.articleCount} articles</Badge>
              </div>

              <div className="flex flex-wrap gap-1">
                {region.cities.slice(0, 3).map((city) => (
                  <Badge key={city} variant="outline" className="text-xs">
                    {city}
                  </Badge>
                ))}
                {region.cities.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{region.cities.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-gray-600">{selectedRegions.length} regions selected</div>
          <Button size="sm">Update News Feed</Button>
        </div>
      </CardContent>
    </Card>
  )
}
