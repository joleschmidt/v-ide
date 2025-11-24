import { notFound } from "next/navigation";
import { REGIONS, getRegionById } from "@/lib/regions";
import { createClient } from "@/lib/supabase/server";
import { transformSectorPreview } from "@/lib/sectors";
import { RegionDetail } from "@/features/regions/components/region-detail";
import { SectorCard } from "@/components/sector-card";

interface RegionPageProps {
  params: Promise<{ regionId: string }>;
}

function formatCoordinates(lat: number, lng: number) {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}°${latDir} ${Math.abs(lng).toFixed(2)}°${lngDir}`;
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { regionId } = await params;
  const region = getRegionById(regionId);

  if (!region) {
    notFound();
  }

  // Fetch sectors for this region
  let sectors: any[] = [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("sectors")
      .select("*")
      .eq("is_active", true)
      .eq("region", regionId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      sectors = data.map((row) => transformSectorPreview(row));
    }
  } catch (err) {
    console.warn("Failed to fetch sectors for region:", err);
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="container mx-auto px-4 py-8">
        <RegionDetail region={region} sectorCount={sectors.length} />

        {sectors.length > 0 ? (
          <div className="mt-8">
            <h2 className="font-sans text-2xl font-semibold text-[#e5e5e5] mb-6">
              Verfügbare Gebiete in {region.name}
            </h2>
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
                    image={sector.imageUrl || "/placeholder.jpg"}
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
          </div>
        ) : (
          <div className="mt-8 rounded-md border border-[#262626] bg-[#171717] p-8 text-center">
            <p className="font-sans text-sm text-[#a3a3a3]">
              Noch keine Gebiete in {region.name} verfügbar. Schau später nochmal vorbei.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

