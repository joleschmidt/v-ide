"use client";

import type { Sector } from "@/types/sector";
import { Card } from "@/components/ui/card";
import { MapPin, Lock, Shield } from "lucide-react";

interface SectorLocationCardProps {
  sector: Sector;
}

export const SectorLocationCard = ({ sector }: SectorLocationCardProps) => {
  return (
    <Card className="border-[#262626] bg-[#171717] p-6">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="rounded-md bg-[#262626] p-2">
            <MapPin className="h-4 w-4 text-[#4a6f4a]" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-sans text-sm font-semibold text-[#e5e5e5]">
              Standortschutz
            </h3>
            <p className="font-sans text-xs text-[#a3a3a3] leading-relaxed">
              Exakte GPS-Koordinaten sind bis zur Buchungsbestätigung geschützt.
            </p>
          </div>
        </div>

        {/* Fuzzy Location Display */}
        <div className="rounded-md border border-[#262626] bg-[#121212] p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="h-3 w-3 text-[#666666]" />
              <span className="font-sans text-xs text-[#666666]">Ungefähre Zone</span>
            </div>
            <div className="font-mono text-sm text-[#e5e5e5]">
              {sector.fuzzyLocation.center.lat.toFixed(4)}°N,{" "}
              {sector.fuzzyLocation.center.lng.toFixed(4)}°E
            </div>
            <div className="font-sans text-xs text-[#666666]">
              ±{sector.fuzzyLocation.radiusKm}km radius
            </div>
          </div>
        </div>

        {/* Lock Notice */}
        <div className="flex items-start gap-2 rounded-md border border-[#4a6f4a]/30 bg-[#4a6f4a]/5 p-3">
          <Lock className="h-4 w-4 flex-shrink-0 text-[#4a6f4a] mt-0.5" />
          <div className="space-y-1">
            <p className="font-sans text-xs font-semibold text-[#4a6f4a]">
              Exakte Koordinaten gesperrt
            </p>
            <p className="font-sans text-xs text-[#a3a3a3]">
              Werden nach Zahlungsbestätigung freigegeben, um die Privatsphäre des Grundbesitzers zu schützen.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

