"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Mountain, MapPin } from "lucide-react";
import type { Region } from "@/lib/regions";

interface RegionCardProps {
  region: Region;
}

export function RegionCard({ region }: RegionCardProps) {
  return (
    <Link href={`/gebiete/${region.id}`} className="block h-full">
      <Card className="bg-[#171717] border-[#262626] rounded-md overflow-hidden hover:border-[#3d5a3d] transition-all group cursor-pointer h-full flex flex-col p-0 gap-0">
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <img
            src={region.imageUrl || "/placeholder.svg"}
            alt={region.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            style={{ filter: "grayscale(10%) contrast(1.05)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent" />
        </div>

        <div className="p-4 flex flex-col flex-1 space-y-3">
          <div>
            <h3 className="text-lg font-semibold tracking-wide text-[#e5e5e5] mb-1">
              {region.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-[#737373] mb-2">
              <MapPin className="h-3 w-3" />
              <span className="font-mono">{region.area}</span>
            </div>
          </div>

          <p className="font-sans text-sm text-[#a3a3a3] line-clamp-3">
            {region.description}
          </p>

          <div className="mt-auto pt-2 border-t border-[#262626]">
            <div className="flex flex-wrap gap-2">
              {region.characteristics.slice(0, 3).map((char, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 text-xs text-[#737373] border border-[#262626] px-2 py-1 rounded"
                >
                  <Mountain className="w-3 h-3" />
                  <span className="font-mono">{char}</span>
                </div>
              ))}
              {region.characteristics.length > 3 && (
                <div className="text-xs text-[#737373] font-mono px-2 py-1">
                  +{region.characteristics.length - 3} mehr
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

