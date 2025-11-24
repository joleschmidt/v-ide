import { TacticalMap } from "@/features/map/components/tactical-map";
import { TACTICAL_COPY } from "@/lib/constants";

// Mock data - will be replaced with Supabase fetch
const mockSectors = [
  {
    id: "1",
    name: "Sektor Alpha",
    wildernessLevel: 4 as const,
    firePermission: "FIRE_BOWL" as const,
    pricePerNight: 25,
    imageUrl: "/dark-dense-forest-wilderness-tactical.jpg",
    fuzzyLocation: {
      center: { lat: 51.5, lng: 10.5 },
      radiusKm: 2,
    },
  },
  {
    id: "2",
    name: "Sektor Bravo",
    wildernessLevel: 5 as const,
    firePermission: "OPEN_FIRE" as const,
    pricePerNight: 35,
    imageUrl: "/pine-forest-clearing-mountains-tactical.jpg",
    fuzzyLocation: {
      center: { lat: 50.8, lng: 11.2 },
      radiusKm: 2,
    },
  },
  {
    id: "3",
    name: "Sektor Charlie",
    wildernessLevel: 3 as const,
    firePermission: "GAS_ONLY" as const,
    pricePerNight: 20,
    imageUrl: "/remote-wilderness-canyon-survival-tactical.jpg",
    fuzzyLocation: {
      center: { lat: 51.2, lng: 9.8 },
      radiusKm: 2,
    },
  },
];

export default function SectorsPage() {
  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="border-b border-[#2a2a2a] bg-[#1a1a1a] px-6 py-4">
        <h1 className="font-mono text-sm font-semibold text-[#e2e8f0]">
          {TACTICAL_COPY.MAP_TITLE}
        </h1>
      </header>

      {/* Map */}
      <main className="flex-1">
        <TacticalMap 
          sectors={mockSectors}
          onSectorClick={(id) => console.log("Sector clicked:", id)}
        />
      </main>
    </div>
  );
}

