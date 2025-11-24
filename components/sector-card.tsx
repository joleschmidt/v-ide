import Link from "next/link"
import { Flame, Droplet, PackageCheck } from "lucide-react"
import { Card } from "@/components/ui/card"

interface SectorCardProps {
  id: string
  title: string
  image: string
  wildernessLevel: number
  coordinates: string
  price: number
  features: string[]
  byot?: boolean
}

export function SectorCard({
  id,
  title,
  image,
  wildernessLevel,
  coordinates,
  price,
  features,
  byot = false,
}: SectorCardProps) {
  return (
    <Link href={`/sectors/${id}`} className="block">
      <Card className="bg-[#171717] border-[#262626] rounded overflow-hidden hover:border-[#3d5a3d] transition-all group cursor-pointer">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          style={{ filter: "grayscale(10%) contrast(1.05)" }}
        />

        <div className="absolute top-3 left-3 bg-[#0a0a0a]/80 border border-[#3d5a3d] px-3 py-1 rounded">
          <span className="text-[#a3a3a3] font-mono text-sm">Level {wildernessLevel}</span>
        </div>

        <div className="absolute top-3 right-3 bg-[#0a0a0a]/80 border border-[#262626] px-3 py-1 rounded">
          <span className="text-[#a3a3a3] font-mono text-xs">{coordinates}</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold tracking-wide text-[#e5e5e5]">{title}</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#e5e5e5] font-mono">€{price}</div>
            <div className="text-xs text-[#737373] font-mono">/ Nacht</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {features.includes("Kein Feuer") && (
            <div className="flex items-center gap-1 text-xs text-[#737373] border border-[#262626] px-2 py-1 rounded">
              <Flame className="w-3 h-3 text-red-400" />
              <span className="font-mono">Kein Feuer</span>
            </div>
          )}
          {features.includes("Kein Wasser") && (
            <div className="flex items-center gap-1 text-xs text-[#737373] border border-[#262626] px-2 py-1 rounded">
              <Droplet className="w-3 h-3 text-blue-400" />
              <span className="font-mono">Kein Wasser</span>
            </div>
          )}
          {features.includes("Quellwasser") && (
            <div className="flex items-center gap-1 text-xs text-[#4a6f4a] border border-[#4a6f4a] px-2 py-1 rounded">
              <Droplet className="w-3 h-3" />
              <span className="font-mono">Quellwasser</span>
            </div>
          )}
        </div>

        {byot && (
          <div className="pt-2 border-t border-[#262626]">
            <div className="flex items-center gap-2 text-[#737373]">
              <PackageCheck className="w-4 h-4" />
              <span className="text-xs font-medium tracking-wide font-mono">Eigene Ausrüstung erforderlich</span>
            </div>
          </div>
        )}
      </div>
    </Card>
    </Link>
  )
}
