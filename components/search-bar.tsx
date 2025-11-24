"use client"

import { useState } from "react"
import { Search, MapPin, Calendar, Signal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  const [wildernessLevel, setWildernessLevel] = useState(3)

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-md p-6 shadow-2xl max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-xs tracking-wide text-[#666666] flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Region
          </label>
          <Input
            placeholder="z.B. Brandenburg"
            className="bg-[#121212] border-[#2a2a2a] text-[#e2e8f0] placeholder:text-[#666666] font-mono rounded-md focus:ring-[#4a7a4a] focus:border-[#4a7a4a]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs tracking-wide text-[#666666] flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Zeitraum
          </label>
          <Input
            type="date"
            className="bg-[#121212] border-[#2a2a2a] text-[#e2e8f0] font-mono rounded-md focus:ring-[#4a7a4a] focus:border-[#4a7a4a]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs tracking-wide text-[#666666] flex items-center gap-2">
            <Signal className="w-4 h-4" />
            Wildnis-Level
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="5"
              value={wildernessLevel}
              onChange={(e) => setWildernessLevel(Number(e.target.value))}
              className="w-full h-2 bg-[#121212] rounded-md appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#4a7a4a] [&::-webkit-slider-thumb]:rounded-md"
            />
            <span className="text-[#e2e8f0] font-mono text-xl font-bold w-8 text-center">{wildernessLevel}</span>
          </div>
        </div>

        <div className="flex items-end">
          <Button className="w-full bg-[#4a7a4a] hover:bg-[#5a8a5a] text-[#e2e8f0] font-medium tracking-wide rounded-md h-10 transition-all">
            <Search className="w-4 h-4 mr-2" />
            Suchen
          </Button>
        </div>
      </div>
    </div>
  )
}
