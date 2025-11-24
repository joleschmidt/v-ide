"use client"

import { useState } from "react"
import { Search, MapPin, Calendar, Signal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  const [wildernessLevel, setWildernessLevel] = useState(3)

  return (
    <div className="bg-[#171717] border border-[#262626] rounded p-6 shadow-2xl max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-xs tracking-wide text-[#737373] flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Region
          </label>
          <Input
            placeholder="z.B. Brandenburg"
            className="bg-[#0a0a0a] border-[#262626] text-[#e5e5e5] placeholder:text-[#737373] font-mono rounded focus:ring-[#3d5a3d] focus:border-[#3d5a3d]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs tracking-wide text-[#737373] flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Zeitraum
          </label>
          <Input
            type="date"
            className="bg-[#0a0a0a] border-[#262626] text-[#e5e5e5] font-mono rounded focus:ring-[#3d5a3d] focus:border-[#3d5a3d]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs tracking-wide text-[#737373] flex items-center gap-2">
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
              className="w-full h-2 bg-[#0a0a0a] rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3d5a3d] [&::-webkit-slider-thumb]:rounded"
            />
            <span className="text-[#e5e5e5] font-mono text-xl font-bold w-8 text-center">{wildernessLevel}</span>
          </div>
        </div>

        <div className="flex items-end">
          <Button className="w-full bg-[#2d4a2d] hover:bg-[#3d5a3d] text-[#f5f5f5] font-medium tracking-wide rounded h-10 transition-all">
            <Search className="w-4 h-4 mr-2" />
            Suchen
          </Button>
        </div>
      </div>
    </div>
  )
}
