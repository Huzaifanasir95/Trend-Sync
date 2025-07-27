"use client"

import { useState } from "react"
import { Globe, MapPin } from "lucide-react"

const regions = [
  { id: "all", name: "All Pakistan", icon: Globe },
  { id: "punjab", name: "Punjab", cities: ["Lahore", "Faisalabad", "Rawalpindi", "Gujranwala"] },
  { id: "sindh", name: "Sindh", cities: ["Karachi", "Hyderabad", "Sukkur", "Larkana"] },
  { id: "kpk", name: "KPK", cities: ["Peshawar", "Mardan", "Mingora", "Kohat"] },
  { id: "balochistan", name: "Balochistan", cities: ["Quetta", "Gwadar", "Turbat", "Sibi"] },
  { id: "capital", name: "Federal Capital", cities: ["Islamabad"] },
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
          const isSelected = selectedRegion === region.id
          return (
            <button
              key={region.id}
              onClick={() => {
                setSelectedRegion(region.id)
                setSelectedCity(null)
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isSelected 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              {region.name}
            </button>
          )
        })}
      </div>

      {selectedRegionData?.cities && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Filter by city:</p>
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors cursor-pointer ${
                selectedCity === null 
                  ? 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80' 
                  : 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
              onClick={() => setSelectedCity(null)}
            >
              All Cities
            </span>
            {selectedRegionData.cities.map((city) => (
              <span
                key={city}
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCity === city 
                    ? 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80' 
                    : 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
