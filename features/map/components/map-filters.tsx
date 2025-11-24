"use client";

import { useState } from "react";
import { X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useMapState } from "../hooks/use-map-state";
import { WILDERNESS_LABELS, FIRE_LABELS, WATER_LABELS, PRICING } from "@/lib/constants";
import type { WildernessLevel, FirePermission, WaterAvailability } from "@/types/sector";

export const MapFilters = () => {
  const { filters, setFilters, resetFilters } = useMapState();
  const [isOpen, setIsOpen] = useState(false);

  const wildernessLevels = [1, 2, 3, 4, 5] as WildernessLevel[];
  const firePermissions: FirePermission[] = ["NO_FIRE", "GAS_ONLY", "FIRE_BOWL", "OPEN_FIRE"];
  const waterOptions: WaterAvailability[] = ["NONE", "NATURAL_SOURCE", "PROVIDED"];

  const handleWildernessToggle = (level: WildernessLevel) => {
    const current = filters.wildernessLevel || [];
    const updated = current.includes(level)
      ? current.filter((l) => l !== level)
      : [...current, level];
    setFilters({ ...filters, wildernessLevel: updated.length > 0 ? updated : undefined });
  };

  const handleFireToggle = (permission: FirePermission) => {
    const current = filters.firePermission || [];
    const updated = current.includes(permission)
      ? current.filter((p) => p !== permission)
      : [...current, permission];
    setFilters({ ...filters, firePermission: updated.length > 0 ? updated : undefined });
  };

  const handleWaterToggle = (water: WaterAvailability) => {
    const current = filters.waterAvailability || [];
    const updated = current.includes(water)
      ? current.filter((w) => w !== water)
      : [...current, water];
    setFilters({ ...filters, waterAvailability: updated.length > 0 ? updated : undefined });
  };

  const handlePriceChange = (values: number[]) => {
    setFilters({
      ...filters,
      priceRange: [values[0], values[1]] as [number, number],
    });
  };

  const hasActiveFilters =
    (filters.wildernessLevel && filters.wildernessLevel.length > 0) ||
    (filters.firePermission && filters.firePermission.length > 0) ||
    (filters.waterAvailability && filters.waterAvailability.length > 0) ||
    filters.priceRange;

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-[9999] border-[#3a5a5a] bg-[#1a1a1a] text-[#e2e8f0] hover:bg-[#2a2a2a] shadow-lg"
        style={{ position: 'fixed', zIndex: 9999 }}
      >
        <Filter className="h-4 w-4" />
        Filter
        {hasActiveFilters && (
          <span className="ml-1 h-2 w-2 rounded-full bg-[#4a7a4a]" />
        )}
      </Button>

      {isOpen && (
        <div className="fixed top-20 left-4 z-[9999] w-80 border border-[#3a5a5a] bg-[#1a1a1a] p-4 shadow-lg" style={{ position: 'fixed', zIndex: 9999 }}>
          <div className="mb-4 flex items-center justify-between border-b border-[#2a2a2a] pb-2">
            <h3 className="font-mono text-sm font-semibold text-[#e2e8f0]">Filter</h3>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Wilderness Level */}
            <div>
              <Label className="mb-2 block font-mono text-xs text-[#a8a8a8]">
                Wildnis-Level
              </Label>
              <div className="space-y-2">
                {wildernessLevels.map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox
                      id={`wilderness-${level}`}
                      checked={filters.wildernessLevel?.includes(level) || false}
                      onCheckedChange={() => handleWildernessToggle(level)}
                      className="border-[#3a5a5a] data-[state=checked]:bg-[#4a7a4a] data-[state=checked]:border-[#4a7a4a]"
                    />
                    <Label
                      htmlFor={`wilderness-${level}`}
                      className="font-mono text-xs text-[#e2e8f0] cursor-pointer"
                    >
                      {WILDERNESS_LABELS[level]}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Fire Permission */}
            <div>
              <Label className="mb-2 block font-mono text-xs text-[#a8a8a8]">
                Feuererlaubnis
              </Label>
              <div className="space-y-2">
                {firePermissions.map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={`fire-${permission}`}
                      checked={filters.firePermission?.includes(permission) || false}
                      onCheckedChange={() => handleFireToggle(permission)}
                      className="border-[#3a5a5a] data-[state=checked]:bg-[#4a7a4a] data-[state=checked]:border-[#4a7a4a]"
                    />
                    <Label
                      htmlFor={`fire-${permission}`}
                      className="font-mono text-xs text-[#e2e8f0] cursor-pointer"
                    >
                      {FIRE_LABELS[permission]}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Water Availability */}
            <div>
              <Label className="mb-2 block font-mono text-xs text-[#a8a8a8]">
                Wasserverfügbarkeit
              </Label>
              <div className="space-y-2">
                {waterOptions.map((water) => (
                  <div key={water} className="flex items-center space-x-2">
                    <Checkbox
                      id={`water-${water}`}
                      checked={filters.waterAvailability?.includes(water) || false}
                      onCheckedChange={() => handleWaterToggle(water)}
                      className="border-[#3a5a5a] data-[state=checked]:bg-[#4a7a4a] data-[state=checked]:border-[#4a7a4a]"
                    />
                    <Label
                      htmlFor={`water-${water}`}
                      className="font-mono text-xs text-[#e2e8f0] cursor-pointer"
                    >
                      {WATER_LABELS[water]}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <Label className="mb-2 block font-mono text-xs text-[#a8a8a8]">
                Preis pro Nacht (€)
              </Label>
              <Slider
                min={PRICING.MIN_PRICE_PER_NIGHT}
                max={PRICING.MAX_PRICE_PER_NIGHT}
                value={
                  filters.priceRange || [
                    PRICING.MIN_PRICE_PER_NIGHT,
                    PRICING.MAX_PRICE_PER_NIGHT,
                  ]
                }
                onValueChange={handlePriceChange}
                step={5}
                className="my-4"
              />
              <div className="flex justify-between font-mono text-xs text-[#a8a8a8]">
                <span>€{filters.priceRange?.[0] || PRICING.MIN_PRICE_PER_NIGHT}</span>
                <span>€{filters.priceRange?.[1] || PRICING.MAX_PRICE_PER_NIGHT}</span>
              </div>
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="w-full border-[#3a5a5a] text-[#e2e8f0] hover:bg-[#2a2a2a]"
              >
                Filter zurücksetzen
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

