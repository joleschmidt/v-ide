"use client";

import Image from "next/image";
import type { SectorPreview } from "@/types/sector";
import { WILDERNESS_LABELS, FIRE_LABELS } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { Flame, Mountain } from "lucide-react";

interface SectorPreviewCardProps {
  sector: SectorPreview;
}

export const SectorPreviewCard = ({ sector }: SectorPreviewCardProps) => {
  return (
    <Card className="w-72 overflow-hidden border-[#2a2a2a] bg-[#1a1a1a]">
      <div className="relative h-32 w-full">
        <Image
          src={sector.imageUrl || "/placeholder.jpg"}
          alt={sector.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
      </div>
      
      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-sm text-[#e2e8f0] truncate">
          {sector.name}
        </h3>
        
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1 text-[#a8a8a8]">
            <Mountain className="h-3 w-3" />
            <span className="font-mono">
              {WILDERNESS_LABELS[sector.wildernessLevel]}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-[#a8a8a8]">
            <Flame className="h-3 w-3" />
            <span className="font-mono">
              {FIRE_LABELS[sector.firePermission]}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-1 border-t border-[#2a2a2a]">
          <span className="font-mono text-xs text-[#666666]">
            Per Night
          </span>
          <span className="font-mono text-sm font-semibold text-[#4a7a4a]">
            €{sector.pricePerNight}
          </span>
        </div>
      </div>
    </Card>
  );
};

