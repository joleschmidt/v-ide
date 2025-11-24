import { REGIONS, REGION_IDS } from "@/lib/regions";
import { RegionCard } from "@/features/regions/components/region-card";

export default function GebietePage() {
  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-sans text-3xl font-semibold text-[#e5e5e5] mb-2">
            Gebiete
          </h1>
          <p className="font-sans text-sm text-[#a3a3a3]">
            Entdecke die verschiedenen Naturregionen Deutschlands und ihre Besonderheiten
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REGION_IDS.map((regionId) => {
            const region = REGIONS[regionId];
            return <RegionCard key={regionId} region={region} />;
          })}
        </div>
      </div>
    </div>
  );
}

