import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { transformSectorRow } from "@/lib/sectors";
import { SectorDetail } from "@/features/sectors/components/sector-detail";
import { SectorImageGallery } from "@/features/sectors/components/sector-image-gallery";
import { SectorLocationCard } from "@/features/sectors/components/sector-location-card";
import { BackButton } from "@/features/sectors/components/back-button";
import { SaveButton } from "@/features/sectors/components/save-button";
import { Button } from "@/components/ui/button";

// Mock data fallback for development
const mockSectors: Record<string, any> = {
  "1": {
    id: "1",
    landowner_id: "mock-landowner",
    name: "Sektor Alpha",
    description: "Deep forest sector with minimal access. Perfect for experienced bushcrafters seeking true wilderness isolation. No trails, no infrastructure, pure nature.",
    images: [
      "/dark-dense-forest-wilderness-tactical.jpg",
      "/pine-forest-clearing-mountains-tactical.jpg",
      "/remote-wilderness-canyon-survival-tactical.jpg",
    ],
    exact_lat: 51.5,
    exact_lng: 10.5,
    fuzzy_lat: 51.5,
    fuzzy_lng: 10.5,
    fuzzy_radius_km: 2.0,
    wilderness_level: 4,
    fire_permission: "FIRE_BOWL",
    water_availability: "NONE",
    has_toilet: false,
    byot_mandatory: true,
    max_operators: 2,
    is_active: true,
    blocked_dates: [],
    price_per_night: 25.0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  "2": {
    id: "2",
    landowner_id: "mock-landowner",
    name: "Sektor Bravo",
    description: "Extreme wilderness location. Deep woods access only. For operators with high reputation scores. Open fire permitted with proper safety measures.",
    images: [
      "/pine-forest-clearing-mountains-tactical.jpg",
      "/dark-dense-forest-wilderness-tactical.jpg",
    ],
    exact_lat: 50.8,
    exact_lng: 11.2,
    fuzzy_lat: 50.8,
    fuzzy_lng: 11.2,
    fuzzy_radius_km: 2.0,
    wilderness_level: 5,
    fire_permission: "OPEN_FIRE",
    water_availability: "NATURAL_SOURCE",
    has_toilet: false,
    byot_mandatory: true,
    max_operators: 1,
    is_active: true,
    blocked_dates: [],
    price_per_night: 35.0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  "3": {
    id: "3",
    landowner_id: "mock-landowner",
    name: "Sektor Charlie",
    description: "Moderate terrain with light trail access. Suitable for beginners. Gas stove only, natural water source nearby.",
    images: [
      "/remote-wilderness-canyon-survival-tactical.jpg",
    ],
    exact_lat: 51.2,
    exact_lng: 9.8,
    fuzzy_lat: 51.2,
    fuzzy_lng: 9.8,
    fuzzy_radius_km: 2.0,
    wilderness_level: 3,
    fire_permission: "GAS_ONLY",
    water_availability: "NATURAL_SOURCE",
    has_toilet: false,
    byot_mandatory: true,
    max_operators: 4,
    is_active: true,
    blocked_dates: [],
    price_per_night: 20.0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

interface SectorDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function SectorDetailPage({ params }: SectorDetailPageProps) {
  const { id } = await params;
  let sector;

  // Try to fetch from Supabase
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("sectors")
      .select("*")
      .eq("id", id)
      .eq("is_active", true)
      .single();

    if (!error && data) {
      sector = transformSectorRow(data);
    }
  } catch (err) {
    // Supabase not configured or error - fall back to mock data
    console.warn("Supabase fetch failed, using mock data:", err);
  }

  // Fallback to mock data if Supabase fetch failed
  if (!sector && mockSectors[id]) {
    sector = transformSectorRow(mockSectors[id] as any);
  }

  if (!sector) {
    notFound();
  }

  const handleBookClick = () => {
    // This will be handled client-side
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <BackButton />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            {sector.images.length > 0 && (
              <SectorImageGallery images={sector.images} sectorName={sector.name} />
            )}

            {/* Sector Details */}
            <SectorDetail sector={sector} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Location Card */}
              <SectorLocationCard sector={sector} />

              {/* Booking CTA Card */}
              <div className="rounded-md border border-[#262626] bg-[#171717] p-6">
                <div className="mb-4 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-3xl font-semibold text-[#4a6f4a]">
                        €{sector.pricePerNight}
                      </span>
                      <span className="font-sans text-sm text-[#a3a3a3]">per night</span>
                    </div>
                    <SaveButton sectorId={sector.id} />
                  </div>
                  <p className="font-sans text-xs text-[#666666]">
                    One-night stay only
                  </p>
                </div>

                <Button
                  asChild
                  className="w-full bg-[#2d4a2d] font-sans text-sm hover:bg-[#3d5a3d]"
                  disabled={!sector.isActive}
                >
                  <Link href={`/booking/${sector.id}`}>
                    {sector.isActive ? "Deploy" : "Sector Offline"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

