"use client";

import type { Sector } from "@/types/sector";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  WILDERNESS_LABELS,
  FIRE_LABELS,
  WATER_LABELS,
  TACTICAL_COPY,
} from "@/lib/constants";
import {
  Mountain,
  Flame,
  Droplet,
  Users,
  WifiOff,
  AlertTriangle,
} from "lucide-react";

interface SectorDetailProps {
  sector: Sector;
  onBookClick?: () => void;
}

export const SectorDetail = ({ sector, onBookClick }: SectorDetailProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="font-sans text-2xl font-semibold text-[#e5e5e5]">
            {sector.name}
          </h1>
          <p className="font-sans text-sm text-[#a3a3a3] leading-relaxed">
            {sector.description}
          </p>
        </div>
        <div className="hidden text-right lg:block">
          <div className="font-sans text-3xl font-semibold text-[#4a6f4a]">
            €{sector.pricePerNight}
          </div>
          <div className="font-sans text-xs text-[#666666]">Pro Nacht</div>
        </div>
      </div>

      {/* Characteristics Grid */}
      <Card className="border-[#262626] bg-[#171717] p-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#666666]">
              <Mountain className="h-4 w-4 text-amber-500" />
              <span className="font-mono text-xs">Wildnis</span>
            </div>
            <div className="font-sans text-sm font-semibold text-[#e5e5e5]">
              Level {sector.wildernessLevel}
            </div>
            <div className="font-sans text-xs text-[#a3a3a3]">
              {WILDERNESS_LABELS[sector.wildernessLevel]}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#666666]">
              <Flame className="h-4 w-4 text-red-400" />
              <span className="font-sans text-xs">Feuer</span>
            </div>
            <div className="font-sans text-sm font-semibold text-[#e5e5e5]">
              {FIRE_LABELS[sector.firePermission]}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#666666]">
              <Droplet className={`h-4 w-4 ${
                sector.waterAvailability === "NONE" 
                  ? "text-blue-400" 
                  : sector.waterAvailability === "NATURAL_SOURCE" 
                  ? "text-[#4a6f4a]" 
                  : "text-cyan-400"
              }`} />
              <span className="font-sans text-xs">Wasser</span>
            </div>
            <div className="font-sans text-sm font-semibold text-[#e5e5e5]">
              {WATER_LABELS[sector.waterAvailability]}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#666666]">
              <Users className="h-4 w-4 text-purple-400" />
              <span className="font-sans text-xs">Kapazität</span>
            </div>
            <div className="font-sans text-sm font-semibold text-[#e5e5e5]">
              {sector.maxOperators} {sector.maxOperators === 1 ? "Person" : "Personen"}
            </div>
          </div>
        </div>
      </Card>

      {/* Warnings */}
      <div className="space-y-3">
        <Badge variant="outline" className="border-[#4a6f4a]/30 bg-[#4a6f4a]/5 text-[#e5e5e5]">
          <WifiOff className="mr-2 h-3 w-3" />
          <span className="font-sans text-xs">Keine Infrastruktur</span>
        </Badge>

        {sector.byotMandatory && (
          <Badge variant="outline" className="border-[#4a6f4a]/30 bg-[#4a6f4a]/5 text-[#e5e5e5]">
            <AlertTriangle className="mr-2 h-3 w-3" />
            <span className="font-sans text-xs">BYOT Pflicht - Keine Toilette vorhanden</span>
          </Badge>
        )}
      </div>

      {/* CTA - Only show if onBookClick is provided (for mobile view) */}
      {onBookClick && (
        <Button
          onClick={onBookClick}
          className="w-full bg-[#2d4a2d] py-6 font-sans text-sm hover:bg-[#3d5a3d] lg:hidden"
          disabled={!sector.isActive}
        >
          {sector.isActive ? TACTICAL_COPY.BOOK_NOW : "Gebiet offline"}
        </Button>
      )}
    </div>
  );
};

