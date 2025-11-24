"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSavedSectors } from "@/features/sectors/hooks/use-saved-sectors";
import { SectorCard } from "@/components/sector-card";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { transformSectorRow } from "@/lib/sectors";
import type { Sector } from "@/types/sector";

function formatCoordinates(lat: number, lng: number) {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}°${latDir} ${Math.abs(lng).toFixed(2)}°${lngDir}`;
}

export function SavedSectors() {
  const { savedSectorIds, loading } = useSavedSectors();
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loadingSectors, setLoadingSectors] = useState(true);

  useEffect(() => {
    const fetchSectors = async () => {
      if (savedSectorIds.size === 0) {
        setSectors([]);
        setLoadingSectors(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("sectors")
          .select("*")
          .in("id", Array.from(savedSectorIds))
          .eq("is_active", true);

        if (error) {
          console.error("Error fetching saved sectors:", error);
          setSectors([]);
        } else {
          setSectors(data?.map(transformSectorRow) || []);
        }
      } catch (error) {
        console.error("Error fetching saved sectors:", error);
        setSectors([]);
      } finally {
        setLoadingSectors(false);
      }
    };

    if (!loading) {
      fetchSectors();
    }
  }, [savedSectorIds, loading]);

  if (loading || loadingSectors) {
    return (
      <Card className="border-[#262626] bg-[#171717]">
        <CardHeader>
          <CardTitle className="font-sans text-lg font-semibold text-[#e5e5e5]">
            Gespeicherte Gebiete
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 animate-pulse bg-[#262626] rounded-md" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#262626] bg-[#171717]">
      <CardHeader>
        <CardTitle className="font-sans text-lg font-semibold text-[#e5e5e5] flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-[#4a6f4a]" />
          Gespeicherte Gebiete
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sectors.length === 0 ? (
          <p className="font-sans text-sm text-[#a3a3a3]">
            Keine gespeicherten Gebiete. Speichere Gebiete, die dich interessieren.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector) => {
              const features: string[] = [];
              if (sector.firePermission === "NO_FIRE") {
                features.push("Kein Feuer");
              }
              if (sector.waterAvailability === "NONE") {
                features.push("Kein Wasser");
              } else if (sector.waterAvailability === "NATURAL_SOURCE") {
                features.push("Quellwasser");
              }

              return (
                <SectorCard
                  key={sector.id}
                  id={sector.id}
                  title={sector.name}
                  image={sector.images[0] || "/placeholder.jpg"}
                  wildernessLevel={sector.wildernessLevel}
                  coordinates={formatCoordinates(
                    sector.fuzzyLocation.center.lat,
                    sector.fuzzyLocation.center.lng
                  )}
                  price={sector.pricePerNight}
                  features={features}
                  byot={!sector.hasToilet}
                />
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

