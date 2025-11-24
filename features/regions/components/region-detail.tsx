"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mountain, MapPin, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Region } from "@/lib/regions";

interface RegionDetailProps {
  region: Region;
  sectorCount: number;
}

export function RegionDetail({ region, sectorCount }: RegionDetailProps) {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 rounded-md overflow-hidden">
        <img
          src={region.imageUrl || "/placeholder.svg"}
          alt={region.name}
          className="w-full h-full object-cover"
          style={{ filter: "grayscale(10%) contrast(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="font-sans text-3xl md:text-4xl font-semibold text-[#e5e5e5] mb-2">
            {region.name}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-[#a3a3a3]">
              <MapPin className="h-4 w-4" />
              <span className="font-mono">{region.area}</span>
            </div>
            {sectorCount > 0 && (
              <Badge className="bg-[#2d4a2d] text-[#4a6f4a] border-[#4a6f4a]">
                {sectorCount} {sectorCount === 1 ? "Gebiet" : "Gebiete"}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <Card className="border-[#262626] bg-[#171717]">
        <CardContent className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <Info className="h-5 w-5 text-[#4a6f4a] mt-0.5" />
            <h2 className="font-sans text-lg font-semibold text-[#e5e5e5]">
              Über {region.name}
            </h2>
          </div>
          <p className="font-sans text-sm text-[#a3a3a3] leading-relaxed">
            {region.description}
          </p>
        </CardContent>
      </Card>

      {/* Characteristics */}
      <Card className="border-[#262626] bg-[#171717]">
        <CardContent className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <Mountain className="h-5 w-5 text-[#4a6f4a] mt-0.5" />
            <h2 className="font-sans text-lg font-semibold text-[#e5e5e5]">
              Besonderheiten
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {region.characteristics.map((char, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-sm text-[#a3a3a3] border border-[#262626] px-3 py-2 rounded"
              >
                <Mountain className="h-4 w-4 text-[#4a6f4a]" />
                <span className="font-mono">{char}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

