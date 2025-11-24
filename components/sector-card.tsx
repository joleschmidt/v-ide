import { Flame, Droplet, PackageCheck } from "lucide-react"
import { Card } from "@/components/ui/card"

interface SectorCardProps {
  title: string
  image: string
  wildernessLevel: number
  coordinates: string
  price: number
  features: string[]
  byot?: boolean
}

export function SectorCard({
  title,
  image,
  wildernessLevel,
  coordinates,
  price,
  features,
  byot = false,
}: SectorCardProps) {
  return (
    <Card className="bg-[#1a1a1a] border-[#2a2a2a] rounded-md overflow-hidden hover:border-[#4a7a4a] transition-all group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-3 left-3 bg-[#121212]/80 border border-[#3a5a3a] px-3 py-1 rounded-md">
          <span className="text-[#a8a8a8] font-mono text-sm">Level {wildernessLevel}</span>
        </div>

        <div className="absolute top-3 right-3 bg-[#121212]/80 border border-[#2a2a2a] px-3 py-1 rounded-md">
          <span className="text-[#a8a8a8] font-mono text-xs">{coordinates}</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold tracking-wide text-[#e2e8f0]">{title}</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#e2e8f0] font-mono">€{price}</div>
            <div className="text-xs text-[#666666] font-mono">/ Nacht</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {features.includes("Kein Feuer") && (
            <div className="flex items-center gap-1 text-xs text-[#666666] border border-[#2a2a2a] px-2 py-1 rounded-md">
              <Flame className="w-3 h-3 text-[#666666]" />
              <span className="font-mono">Kein Feuer</span>
            </div>
          )}
          {features.includes("Kein Wasser") && (
            <div className="flex items-center gap-1 text-xs text-[#666666] border border-[#2a2a2a] px-2 py-1 rounded-md">
              <Droplet className="w-3 h-3 text-[#666666]" />
              <span className="font-mono">Kein Wasser</span>
            </div>
          )}
          {features.includes("Quellwasser") && (
            <div className="flex items-center gap-1 text-xs text-[#4a7a4a] border border-[#4a7a4a] px-2 py-1 rounded-md">
              <Droplet className="w-3 h-3" />
              <span className="font-mono">Quellwasser</span>
            </div>
          )}
        </div>

        {byot && (
          <div className="pt-2 border-t border-[#2a2a2a]">
            <div className="flex items-center gap-2 text-[#666666]">
              <PackageCheck className="w-4 h-4" />
              <span className="text-xs font-medium tracking-wide font-mono">Eigene Ausrüstung erforderlich</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
