"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, MapPin } from "lucide-react"

const regions = [
  { id: "all", name: "All Regions", icon: Globe },
  { id: "asia", name: "Asia", cities: ["Tokyo", "Seoul", "Singapore", "Mumbai"] },
  { id: "europe", name: "Europe", cities: ["London", "Paris", "Berlin", "Rome"] },
  { id: "americas", name: "Americas", cities: ["New York", "Los Angeles", "Toronto", "São Paulo"] },
  { id: "africa", name: "Africa", cities: ["Cairo", "Lagos", "Cape Town", "Nairobi"] },
  { id: "oceania", name: "Oceania", cities: ["Sydney", "Melbourne", "Auckland", "Perth"] },
]

export function RegionFilter() {
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  const selectedRegionData = regions.find((r) => r.id === selectedRegion)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {regions.map((region) => {
          const Icon = region.icon || MapPin
          return (
            <Button
              key={region.id}
              variant={selectedRegion === region.id ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedRegion(region.id)
                setSelectedCity(null)
              }}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {region.name}
            </Button>
          )
        })}
      </div>

      {selectedRegionData?.cities && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Filter by city:</p>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCity === null ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setSelectedCity(null)}
            >
              All Cities
            </Badge>
            {selectedRegionData.cities.map((city) => (
              <Badge
                key={city}
                variant={selectedCity === city ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
