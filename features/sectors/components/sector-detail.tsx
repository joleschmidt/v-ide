"use client";

import Image from "next/image";
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
      {/* Hero Image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-md">
        <Image
          src={sector.images[0] || "/placeholder.jpg"}
          alt={sector.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="font-semibold text-2xl text-[#e2e8f0]">
            {sector.name}
          </h1>
          <p className="text-sm text-[#a8a8a8]">
            {sector.description}
          </p>
        </div>
        <div className="text-right">
          <div className="font-mono text-3xl font-bold text-[#4a7a4a]">
            €{sector.pricePerNight}
          </div>
          <div className="font-mono text-xs text-[#666666]">Per Night</div>
        </div>
      </div>

      {/* Characteristics Grid */}
      <Card className="border-[#2a2a2a] bg-[#1a1a1a] p-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#666666]">
              <Mountain className="h-4 w-4" />
              <span className="font-mono text-xs">Wilderness</span>
            </div>
            <div className="font-mono text-sm text-[#e2e8f0]">
              Level {sector.wildernessLevel}
            </div>
            <div className="text-xs text-[#a8a8a8]">
              {WILDERNESS_LABELS[sector.wildernessLevel]}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#666666]">
              <Flame className="h-4 w-4" />
              <span className="font-mono text-xs">Fire</span>
            </div>
            <div className="font-mono text-sm text-[#e2e8f0]">
              {FIRE_LABELS[sector.firePermission]}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#666666]">
              <Droplet className="h-4 w-4" />
              <span className="font-mono text-xs">Water</span>
            </div>
            <div className="font-mono text-sm text-[#e2e8f0]">
              {WATER_LABELS[sector.waterAvailability]}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#666666]">
              <Users className="h-4 w-4" />
              <span className="font-mono text-xs">Capacity</span>
            </div>
            <div className="font-mono text-sm text-[#e2e8f0]">
              {sector.maxOperators} {sector.maxOperators === 1 ? "Person" : "People"}
            </div>
          </div>
        </div>
      </Card>

      {/* Warnings */}
      <div className="space-y-3">
        <Badge variant="outline" className="border-[#4a7a4a]/30 bg-[#4a7a4a]/5 text-[#e2e8f0]">
          <WifiOff className="mr-2 h-3 w-3" />
          <span className="font-mono text-xs">Zero Infrastructure</span>
        </Badge>

        {sector.byotMandatory && (
          <Badge variant="outline" className="border-[#4a7a4a]/30 bg-[#4a7a4a]/5 text-[#e2e8f0]">
            <AlertTriangle className="mr-2 h-3 w-3" />
            <span className="font-mono text-xs">BYOT Mandatory - No Toilet Provided</span>
          </Badge>
        )}
      </div>

      {/* Location Notice */}
      <Card className="border-[#2a2a2a] bg-[#1a1a1a] p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-md bg-[#2a2a2a] p-2">
            <Mountain className="h-4 w-4 text-[#4a7a4a]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-mono text-sm font-semibold text-[#e2e8f0]">
              Coordinates Confirmed After Payment
            </h3>
            <p className="text-xs text-[#a8a8a8]">
              Exact GPS location revealed upon booking confirmation to protect landowner privacy.
            </p>
          </div>
        </div>
      </Card>

      {/* CTA */}
      <Button
        onClick={onBookClick}
        className="w-full bg-[#4a7a4a] py-6 font-mono text-sm hover:bg-[#5a8a5a]"
        disabled={!sector.isActive}
      >
        {sector.isActive ? TACTICAL_COPY.BOOK_NOW : "Sector Offline"}
      </Button>
    </div>
  );
};

